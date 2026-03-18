import { NextRequest, NextResponse } from "next/server";

type GeminiModel = {
  name: string;
  supportedGenerationMethods?: string[];
};

type ReviewIssue = {
  severity: "High" | "Medium" | "Low" | "Info";
  title: string;
  description: string;
  line: number | null;
};

type ReviewResponse = {
  language: string;
  summary: string;
  score: number;
  issues: ReviewIssue[];
  recommendations: string[];
};

function detectLanguageFromCode(code: string): string {
  if (/\bdef \w+\s*\(/.test(code) || (/import\s+\w+/.test(code) && !/from\s+'/.test(code))) return "Python";
  if (/\bfunction\b|\bconst\b|\blet\b|\bvar\b|=>/.test(code)) return "JavaScript";
  if (/\bpublic\s+class\b|\bSystem\.out/.test(code)) return "Java";
  if (/\bpackage\s+main\b|\bfunc\s+\w+/.test(code)) return "Go";
  if (/\bfn\s+\w+/.test(code) && /->/.test(code)) return "Rust";
  if (/<\?php/.test(code)) return "PHP";
  if (/namespace\s+\w+|using\s+System/.test(code)) return "C#";
  return "Code";
}

function findLine(code: string, pattern: RegExp): number | null {
  const lines = code.split("\n");
  for (let i = 0; i < lines.length; i += 1) {
    if (pattern.test(lines[i])) return i + 1;
  }
  return null;
}

function buildFallbackReview(code: string, language?: string): ReviewResponse {
  const issues: ReviewIssue[] = [];

  if (/\beval\s*\(/.test(code)) {
    issues.push({
      severity: "High",
      title: "Use of eval()",
      description: "Dynamic code execution via eval() can introduce remote code execution risks.",
      line: findLine(code, /\beval\s*\(/),
    });
  }

  if (/innerHTML\s*=/.test(code)) {
    issues.push({
      severity: "High",
      title: "Unsafe innerHTML assignment",
      description: "Directly assigning to innerHTML may enable XSS if content is not sanitized.",
      line: findLine(code, /innerHTML\s*=/),
    });
  }

  if (/(SELECT|UPDATE|DELETE|INSERT)\s+.*\+|`\s*SELECT.*\$\{/.test(code)) {
    issues.push({
      severity: "Medium",
      title: "Possible SQL injection pattern",
      description: "String interpolation/concatenation in SQL queries should be replaced with parameterized queries.",
      line: findLine(code, /(SELECT|UPDATE|DELETE|INSERT)/),
    });
  }

  if (/password\s*=\s*["'][^"']+["']|api[_-]?key\s*=\s*["'][^"']+["']/i.test(code)) {
    issues.push({
      severity: "Medium",
      title: "Hardcoded secret detected",
      description: "Credentials and API keys should be loaded from secure environment variables or secret managers.",
      line: findLine(code, /password\s*=|api[_-]?key\s*=/i),
    });
  }

  if (/console\.log\(|print\(/.test(code)) {
    issues.push({
      severity: "Low",
      title: "Debug output in code",
      description: "Consider removing debug logs in production-sensitive paths to reduce information exposure.",
      line: findLine(code, /console\.log\(|print\(/),
    });
  }

  const score = Math.max(40, 96 - issues.length * 12);
  const detectedLanguage = language || detectLanguageFromCode(code);

  return {
    language: detectedLanguage,
    summary:
      issues.length > 0
        ? "Live fallback analysis was used due temporary Gemini quota limits. Potential security and quality issues were detected and should be reviewed manually."
        : "Live fallback analysis was used due temporary Gemini quota limits. No obvious high-risk patterns were detected in this snippet.",
    score,
    issues,
    recommendations: [
      "Use parameterized queries for all database operations.",
      "Store secrets in environment variables or a secrets manager.",
      "Add input validation and output encoding on untrusted data paths.",
    ],
  };
}

export async function POST(req: NextRequest) {
  const { code, language } = await req.json();

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Gemini API key not configured." }, { status: 500 });
  }

  const systemInstruction = `You are TekverAI, an expert AI code security and quality analyzer.
Analyze the provided code and return a structured JSON response with this exact shape:
{
  "language": "<detected language>",
  "summary": "<2-3 sentence overall assessment>",
  "score": <integer 0-100 security score>,
  "issues": [
    {
      "severity": "High" | "Medium" | "Low" | "Info",
      "title": "<short issue title>",
      "description": "<detailed explanation>",
      "line": <line number or null>
    }
  ],
  "recommendations": ["<recommendation 1>", "<recommendation 2>"]
}
Return ONLY the raw JSON object — no markdown fences, no extra text.`;

  const userPrompt = language
    ? `Review this ${language} code:\n\n${code}`
    : `Review this code (auto-detect language):\n\n${code}`;

  try {
    const configuredModel = process.env.GEMINI_MODEL?.trim();
    const preferredModels = [
      "models/gemini-2.0-flash",
      "models/gemini-2.0-flash-lite",
      "models/gemini-1.5-flash",
      "models/gemini-1.5-flash-8b",
    ];

    const listModelsResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`,
      { method: "GET" }
    );

    if (!listModelsResponse.ok) {
      return NextResponse.json(buildFallbackReview(code, language));
    }

    const listData = (await listModelsResponse.json()) as { models?: GeminiModel[] };
    const availableModels = (listData.models ?? []).filter((model) =>
      (model.supportedGenerationMethods ?? []).includes("generateContent")
    );

    const configuredModelNormalized = configuredModel
      ? configuredModel.startsWith("models/")
        ? configuredModel
        : `models/${configuredModel}`
      : undefined;

    const selectedModels = configuredModelNormalized
      ? [configuredModelNormalized]
      : [
          ...preferredModels.filter((candidate) => availableModels.some((model) => model.name === candidate)),
          ...availableModels.map((model) => model.name).filter((name) => !preferredModels.includes(name)),
        ];

    if (selectedModels.length === 0) {
      return NextResponse.json(buildFallbackReview(code, language));
    }

    const fullPrompt = `${systemInstruction}\n\n---\n\n${userPrompt}`;

    for (const selectedModel of selectedModels) {
      const generateResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/${selectedModel}:generateContent?key=${encodeURIComponent(apiKey)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
          }),
        }
      );

      if (!generateResponse.ok) {
        if (generateResponse.status === 404 || generateResponse.status === 429) {
          continue;
        }
        return NextResponse.json(buildFallbackReview(code, language));
      }

      const generateData = (await generateResponse.json()) as {
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      };

      const raw =
        generateData.candidates?.[0]?.content?.parts
          ?.map((part) => part.text ?? "")
          .join("")
          .trim() ?? "";

      if (!raw) {
        continue;
      }

      const cleaned = raw.replace(/```(?:json)?/gi, "").replace(/```/g, "").trim();

      try {
        return NextResponse.json(JSON.parse(cleaned));
      } catch {
        continue;
      }
    }

    return NextResponse.json(buildFallbackReview(code, language));
  } catch {
    return NextResponse.json(buildFallbackReview(code, language));
  }
}
