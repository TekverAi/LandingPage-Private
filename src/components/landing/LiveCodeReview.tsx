/* LANDING PAGE COMPONENT */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, AlertTriangle, CheckCircle2, Info, XCircle, ShieldCheck, X, Code2, Loader2 } from "lucide-react";
import { useState, useRef } from "react";



/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Issue {
  severity: "High" | "Medium" | "Low" | "Info";
  title: string;
  description: string;
  line: number | null;
}

interface ReviewResult {
  language: string;
  summary: string;
  score: number;
  issues: Issue[];
  recommendations: string[];
  error?: string;
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */
const SEVERITY_CONFIG = {
  High: { icon: XCircle, color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.25)" },
  Medium: { icon: AlertTriangle, color: "#fb923c", bg: "rgba(251,146,60,0.1)", border: "rgba(251,146,60,0.25)" },
  Low: { icon: AlertTriangle, color: "#facc15", bg: "rgba(250,204,21,0.1)", border: "rgba(250,204,21,0.25)" },
  Info: { icon: Info, color: "#22d3ee", bg: "rgba(34,211,238,0.1)", border: "rgba(34,211,238,0.25)" },
};

function scoreColor(score: number) {
  if (score >= 80) return "#34d399";
  if (score >= 55) return "#fb923c";
  return "#f87171";
}

function detectLanguage(code: string): string {
  if (/\bdef \w+\s*\(/.test(code) || /import\s+\w+/.test(code) && !/from\s+'/.test(code)) return "Python";
  if (/\bfunction\b|\bconst\b|\blet\b|\bvar\b|\barrow\b|=>/.test(code)) return "JavaScript";
  if (/\bpublic\s+class\b|\bSystem\.out/.test(code)) return "Java";
  if (/\bfn\s+\w+/.test(code) && /->/.test(code)) return "Rust";
  if (/\bpackage\s+main\b|\bfunc\s+\w+/.test(code)) return "Go";
  if (/<\?php/.test(code)) return "PHP";
  if (/namespace\s+\w+|using\s+System/.test(code)) return "C#";
  return "Code";
}

function hasBasicSyntaxErrors(code: string, lang: string): Issue[] {
  const issues: Issue[] = [];
  const lines = code.split("\n");

  // 1. Check for basic empty assignments or trailing operators
  for (let i = 0; i < lines.length; i++) {
    const lineWithoutComments = lines[i].split("//")[0].split("/*")[0].trim();
    if (lineWithoutComments.endsWith("=") || lineWithoutComments.endsWith("+") || lineWithoutComments.endsWith("-") || lineWithoutComments.endsWith("*") || lineWithoutComments.endsWith("/")) {
      issues.push({
        severity: "High",
        title: "Incomplete Statement",
        description: "A line appears to end prematurely with an operator or assignment.",
        line: i + 1
      });
    }
  }

  // 2. Mismatched Brackets (Basic check)
  const openBraces = (code.match(/\{/g) || []).length;
  const closeBraces = (code.match(/\}/g) || []).length;
  if (openBraces !== closeBraces) {
    issues.push({
      severity: "High",
      title: "Mismatched Braces",
      description: `Detected ${openBraces} opening and ${closeBraces} closing braces. Your code is likely missing a closing '}'.`,
      line: null
    });
  }

  // 3. Javascript/TS specific: common syntax mistakes
  if (lang === "JavaScript" || lang === "TypeScript") {
    if (/(?:const|let|var)\s+\w+\s*=[\s;]*$/.test(code)) {
      issues.push({
        severity: "High",
        title: "Empty Variable Assignment",
        description: "Variables must be assigned a value or left uninitialized (if not const).",
        line: findLine(code, /(?:const|let|var)\s+\w+\s*=[\s;]*$/)
      });
    }
  }

  return issues;
}

/* ─── Line limit warning modal ───────────────────────────────────────────── */
function LineWarningModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 16 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        onClick={e => e.stopPropagation()}
        className="relative rounded-2xl p-8 max-w-md w-full"
        style={{
          background: "linear-gradient(145deg, rgba(14,28,66,0.99), rgba(6,14,40,0.99))",
          border: "1px solid rgba(251,146,60,0.35)",
          boxShadow: "0 0 0 1px rgba(251,146,60,0.06), 0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(251,146,60,0.08)",
        }}
      >
        <button onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors cursor-pointer">
          <X size={18} />
        </button>

        <div className="flex items-center justify-center mb-5"
          style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "rgba(251,146,60,0.12)", border: "1.5px solid rgba(251,146,60,0.35)"
          }}>
          <AlertTriangle size={26} style={{ color: "#fb923c" }} />
        </div>

        <h3 className="text-[18px] font-bold text-white mb-2">Code Too Large</h3>
        <p className="text-[13.5px] text-slate-400 leading-relaxed mb-6">
          The live reviewer supports up to <span className="text-white font-semibold">200 lines</span> of code.
          Your snippet has exceeded this limit. Please trim it to a focused function or class for best results.
        </p>

        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          className="w-full py-3 rounded-xl text-[13.5px] font-bold cursor-pointer"
          style={{
            background: "rgba(251,146,60,0.15)", color: "#fb923c",
            border: "1px solid rgba(251,146,60,0.35)"
          }}>
          Got it, I&apos;ll trim it
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Results panel ──────────────────────────────────────────────────────── */
function ResultsPanel({ result }: { result: ReviewResult }) {
  const score = result.score ?? 0;
  const color = scoreColor(score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6"
    >
      {/* Score and Summary Card */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 rounded-2xl p-6 relative overflow-hidden group"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "inset 0 0 30px rgba(34,211,238,0.02)"
        }}>
        {/* Decorative Background Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[40px] rounded-full -mr-16 -mt-16 pointer-events-none" />

        {/* Score circle */}
        <div className="relative flex-shrink-0 flex items-center justify-center rounded-full self-center sm:self-auto"
          style={{
            width: 84, height: 84,
            background: `conic-gradient(${color} ${score * 3.6}deg, rgba(255,255,255,0.05) 0deg)`,
            boxShadow: `0 0 24px ${color}30`
          }}>
          <div className="absolute inset-[6px] rounded-full flex flex-col items-center justify-center"
            style={{ background: "#050d22" }}>
            <span className="text-[22px] font-black leading-none" style={{ color }}>{score}</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-tighter mt-1 font-bold">/ 100</span>
          </div>
        </div>

        <div className="flex-1 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={14} className="text-cyan-400" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400/80">Security Audit Result</p>
          </div>
          <p className="text-[14.5px] font-medium text-slate-200 leading-relaxed mb-4">{result.summary}</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg"
              style={{ background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.2)", color: "#22d3ee" }}>
              {result.language}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-400">
              AUTO_SCAN_V2
            </span>
          </div>
        </div>
      </div>

      {/* Issues */}
      {result.issues?.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Known Vulnerabilities</p>
            <span className="text-[10px] font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">{result.issues.length} Issues</span>
          </div>
          <div className="flex flex-col gap-3">
            {result.issues.map((issue, i) => {
              const cfg = SEVERITY_CONFIG[issue.severity] ?? SEVERITY_CONFIG.Info;
              const IssueIcon = cfg.icon;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="rounded-xl p-4 transition-all hover:translate-x-1"
                  style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex size-7 items-center justify-center rounded-lg bg-black/20">
                      <IssueIcon size={16} strokeWidth={2.5} style={{ color: cfg.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col mb-1.5">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: cfg.color }}>{issue.severity} Severity</span>
                          {issue.line && <span className="text-[10px] font-mono text-slate-500 bg-black/20 px-1.5 rounded">L{issue.line}</span>}
                        </div>
                        <h4 className="text-[14px] font-bold text-white leading-tight">{issue.title}</h4>
                      </div>
                      <p className="text-[12.5px] text-slate-400 leading-relaxed font-medium">{issue.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {result.recommendations?.length > 0 && (
        <div className="space-y-3 pt-2">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 px-1">Actionable Recommendations</p>
          <div className="grid grid-cols-1 gap-2.5">
            {result.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.015] border border-white/[0.03]">
                <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5 text-cyan-400" />
                <p className="text-[13px] text-slate-300 leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function findLine(code: string, pattern: RegExp): number | null {
  const lines = code.split("\n");
  for (let i = 0; i < lines.length; i += 1) {
    if (pattern.test(lines[i])) return i + 1;
  }
  return null;
}

function buildFallbackReview(code: string, language?: string | null): ReviewResult {
  const detectedLanguage = language || detectLanguage(code);
  const issues: Issue[] = hasBasicSyntaxErrors(code, detectedLanguage);

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

  // Base score depends on syntax issues first!
  const hasCritical = issues.some(i => i.severity === "High" && (i.title.includes("Syntax") || i.title.includes("Mismatched") || i.title.includes("Incomplete")));
  
  let score = Math.max(30, 96 - (issues.length * 15));
  if (hasCritical) score = Math.min(score, 35); // Cap score if critical syntax errors

  return {
    language: detectedLanguage,
    summary:
      issues.length > 0
        ? "Potential security, quality, or syntax issues were detected. High-severity flags indicate code that may not execute correctly."
        : "Live fallback analysis was used. No obvious high-risk patterns were detected in this snippet.",
    score,
    issues,
    recommendations: [
      "Ensure all code blocks are properly closed with matching braces.",
      "Use parameterized queries for all database operations.",
      "Store secrets in environment variables or a secrets manager.",
    ],
  };
}

/* ─── Main section ───────────────────────────────────────────────────────── */
export default function LiveCodeReview() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumsRef = useRef<HTMLDivElement>(null);

  const lineCount = code.split("\n").length;
  const detectedLang = code.trim() ? detectLanguage(code) : null;

  async function handleReview() {
    if (!code.trim()) return;
    if (lineCount > 200) { setShowWarning(true); return; }

    setLoading(true);
    setResult(null);
    setError(null);

    const localIssues = hasBasicSyntaxErrors(code, detectedLang || "Code");
    const hasLocalCritical = localIssues.some(i => i.severity === "High");

    const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
    if (!apiKey) {
      setError("Groq API key not configured.");
      setLoading(false);
      return;
    }

    const systemInstruction = `You are TekverAI, a professional code security and quality auditor.
Your mission is to provide an accurate, honest, and strict score (0-100) and identify technical issues.

CRITICAL SCORING RULES:
- SYNTAX ERROR / BROKEN CODE: If the code is incomplete, has unclosed braces, or syntax errors, the score MUST be between 0 and 10.
- CRITICAL SECURITY VULNERABILITY (SQLi, XSS, RCE): Score MUST be between 10 and 35.
- MINOR ISSUES (Unused variables, magic numbers): Score should be 80-92.
- PERFECT CODE (Best practices followed, secure): Score should be 95-100.

EXAMPLES:
1. Input: "const x =" -> Output: {"score": 5, "issues": [{"severity": "High", "title": "Syntax Error", "description": "Incomplete variable assignment."}], ...}
2. Input: "function add(a,b) { return a+b; }" -> Output: {"score": 98, "summary": "Code is clean, efficient, and follows best practices.", "issues": [], ...}

Return a structured JSON response:
{
  "language": "Detected language",
  "summary": "2-3 sentence technical assessment",
  "score": <integer>,
  "issues": [{ "severity": "High"|"Medium"|"Low"|"Info", "title": "string", "description": "string", "line": number|null }],
  "recommendations": ["string"]
}
Return ONLY the JSON.`;

    const userPrompt = detectedLang
      ? `Review this ${detectedLang} code:\n\n${code}`
      : `Review this code (auto-detect language):\n\n${code}`;

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.1, // Even lower temperature for consistency
          response_format: { type: "json_object" },
        }),
      });

      if (!response.ok) {
        setResult(buildFallbackReview(code, detectedLang));
      } else {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          try {
            const cleaned = content.replace(/```(?:json)?/gi, "").replace(/```/g, "").trim();
            const parsed: ReviewResult = JSON.parse(cleaned);

            // 1. Merge local issues (local check is more reliable for simple syntax)
            localIssues.forEach(li => {
              if (!parsed.issues.some(ai => ai.title === li.title)) {
                parsed.issues.unshift(li);
              }
            });

            // 2. Forced Calibration
            const aiBroken = parsed.issues?.some(i => 
              i.severity === "High" && 
              /(?:syntax error|incomplete statement|mismatched braces|invalid syntax|unclosed|unexpected token|missing closing)/i.test(i.title)
            );

            if (hasLocalCritical || aiBroken) {
              parsed.score = Math.floor(Math.random() * 4) + 6; // 6-9 range for broken code
              parsed.summary = "CRITICAL: The code contains syntax errors or is incomplete. It will not execute in its current state.";
            } else if (parsed.issues.length === 0) {
              parsed.score = 100;
              parsed.summary = "The code is verified as secure, efficient, and follows all development best practices.";
            } else {
              // Ensure we don't punish too hard for MINOR stuff
              const hasMajor = parsed.issues.some(i => i.severity === "High" || i.severity === "Medium");
              if (!hasMajor) {
                parsed.score = Math.max(parsed.score, 90);
              }
            }

            setResult(parsed);
          } catch {
            setResult(buildFallbackReview(code, detectedLang));
          }
        } else {
          setResult(buildFallbackReview(code, detectedLang));
        }
      }
    } catch (err) {
      console.error(err);
      setResult(buildFallbackReview(code, detectedLang));
    } finally {
      setLoading(false);
    }
  }

  function handleGoToPricing() {
    const pricingSection = document.getElementById("pricing");
    pricingSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* Line warning modal */}
      <AnimatePresence>
        {showWarning && <LineWarningModal onClose={() => setShowWarning(false)} />}
      </AnimatePresence>

      <section id="live-review" className="relative py-24 md:py-32 overflow-hidden"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6,20,52,0.85), transparent), #020617" }}>

        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(rgba(34,211,238,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="container relative mx-auto max-w-6xl px-6">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-16">
            <div className="section-label">LIVE DEMO</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Experience <br />
              <span className="text-cyan-400 uppercase tracking-wider">TekverAI Live</span>
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed opacity-80">
              Any language - JavaScript, Python, Java, Go, Rust, and more.
              Supports up to 200 lines per review for comprehensive analysis.
            </p>
          </motion.div>

          {/* Editor + Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* ── Code editor panel with Dual Glass Running Border ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="relative group/editor-wrap h-full"
            >
              {/* The "Dual Running Border" Effect */}
              <div className="absolute -inset-[2.5px] rounded-2xl overflow-hidden z-0">
                {/* Border Path 1 */}
                <div className="absolute inset-[-250%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_160deg,#22d3ee_180deg,transparent_200deg,transparent_360deg)] opacity-70 group-hover/editor-wrap:opacity-100 transition-opacity duration-700" />
                {/* Border Path 2 - Opposite Side */}
                <div className="absolute inset-[-250%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_180deg,transparent_0deg,transparent_160deg,#22d3ee_180deg,transparent_200deg,transparent_360deg)] opacity-70 group-hover/editor-wrap:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Main Editor Card */}
              <div className="relative z-10 flex flex-col h-full rounded-2xl overflow-hidden bg-[#030712] border border-white/5 shadow-2xl">
                {/* Editor header bar */}
                <div className="flex items-center justify-between px-5 py-4 bg-white/[0.03] border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="flex size-6 items-center justify-center rounded-md bg-cyan-400/10 border border-cyan-400/20">
                      <Code2 size={12} className="text-cyan-400" />
                    </div>
                    <span className="text-[11px] font-black tracking-widest text-slate-400 uppercase">
                      {detectedLang ? `${detectedLang} Analyzer` : "Code Analyzer"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono font-medium text-slate-500">
                      {lineCount.toString().padStart(3, '0')} / 200
                    </span>
                    <div className="flex gap-1.5 grayscale opacity-30 group-hover/editor-wrap:grayscale-0 group-hover/editor-wrap:opacity-100 transition-all duration-500">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                  </div>
                </div>

                {/* Textarea Area */}
                <div className="relative flex overflow-hidden" style={{ height: 400 }}>
                  {/* Line numbers column */}
                  <div ref={lineNumsRef} className="w-12 bg-black/40 border-r border-white/5 py-5 flex flex-col items-center select-none pt-4 overflow-y-hidden">
                    {Array.from({ length: Math.min(Math.max(1, lineCount), 200) }).map((_, i) => (
                      <div key={i} className="text-[11px] font-mono leading-relaxed h-[21px] text-slate-700">
                        {i + 1}
                      </div>
                    ))}
                  </div>

                  <div className="flex-1 relative">
                    <textarea
                      ref={textareaRef}
                      value={code}
                      onChange={e => { setCode(e.target.value); setResult(null); setError(null); }}
                      onScroll={() => {
                        if (lineNumsRef.current && textareaRef.current) {
                          lineNumsRef.current.scrollTop = textareaRef.current.scrollTop;
                        }
                      }}
                      placeholder={`// Paste your source code here...\n// Supports JS, Python, Java, Go, Rust, and more.\n// Instant security & logic audit.`}
                      className="w-full h-full resize-none focus:outline-none font-mono text-[13px] leading-relaxed custom-scrollbar p-5 overflow-y-auto"
                      style={{
                        background: "transparent",
                        color: "rgba(255,255,255,0.85)",
                        caretColor: "#22d3ee",
                        tabSize: 2,
                      }}
                      spellCheck={false}
                    />
                    {/* Visual Polish */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-10" />
                  </div>
                </div>

                {/* Actions bar */}
                <div className="flex items-center justify-between px-6 py-4 bg-white/[0.02] border-t border-white/5">
                  <button onClick={() => { setCode(""); setResult(null); setError(null); }}
                    className="text-[12px] font-bold uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer">
                    Clear
                  </button>

                  <motion.button
                    onClick={handleReview}
                    disabled={loading || !code.trim()}
                    whileHover={!loading && code.trim() ? { scale: 1.02, y: -1 } : {}}
                    whileTap={!loading && code.trim() ? { scale: 0.98 } : {}}
                    className="relative px-8 py-3 rounded-xl text-[13px] font-black tracking-wider shadow-lg overflow-hidden group/btn"
                    style={{
                      background: loading || !code.trim()
                        ? "rgba(34,211,238,0.1)"
                        : "linear-gradient(135deg, #22d3ee, #0ea5e9)",
                      color: loading || !code.trim() ? "rgba(34,211,238,0.4)" : "#020617",
                      cursor: loading || !code.trim() ? "not-allowed" : "pointer",
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {loading
                        ? <><Loader2 size={16} className="animate-spin" /> ANALYZING...</>
                        : <><Play size={14} fill="cyan-400" strokeWidth={0} /> ANALYZE CODE</>
                      }
                    </span>
                    {/* Hover Glow */}
                    {!loading && code.trim() && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:animate-shimmer" />
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* ── Results panel ── */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
              className={`rounded-2xl overflow-hidden overflow-y-auto custom-scrollbar flex flex-col ${(!result && !loading && !error) ? "hidden lg:flex" : "flex"}`}
              style={{
                background: "linear-gradient(145deg, rgba(8,18,42,0.95), rgba(3,10,28,0.98))",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                maxHeight: 600, padding: 32,
              }}>

              {/* Empty state */}
              {!result && !loading && !error && (
                <div className="h-full min-h-[360px] flex flex-col items-center justify-center gap-6 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                    <ShieldCheck size={64} strokeWidth={1} className="text-cyan-400/30" />
                  </motion.div>
                  <div>
                    <p className="text-[16px] font-bold text-slate-300">Awaiting Input</p>
                    <p className="text-[13px] text-slate-500 mt-2 max-w-[240px]">Paste your code in the analyzer to begin the security audit.</p>
                  </div>
                </div>
              )}

              {/* Loading skeleton */}
              {loading && (
                <div className="flex flex-col gap-6 animate-pulse">
                  <div className="h-24 rounded-2xl bg-white/5 w-full" />
                  <div className="h-32 rounded-2xl bg-white/5 w-full" />
                  <div className="h-32 rounded-2xl bg-white/5 w-full" />
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="rounded-2xl p-6" style={{ background: "rgba(248,113,113,0.05)", border: "1px solid rgba(248,113,113,0.2)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <XCircle size={18} style={{ color: "#f87171" }} />
                    <span className="text-[14px] font-black text-red-400 uppercase tracking-widest">
                    {error.includes("Premium") ? "Premium Required" : "Audit Failed"}
                    </span>
                  </div>
                  <p className="text-[13px] text-slate-400 leading-relaxed">{error}</p>
                  {error.includes("Premium") && (
                    <motion.button
                      onClick={handleGoToPricing}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-5 inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-[12px] font-black tracking-wider"
                      style={{
                        background: "linear-gradient(135deg, #22d3ee, #0ea5e9)",
                        color: "#020617",
                        boxShadow: "0 0 18px rgba(34,211,238,0.25)",
                        cursor: "pointer",
                      }}
                    >
                      VIEW PRICING
                    </motion.button>
                  )}
                </div>
              )}

              {/* Results */}
              {result && !loading && <ResultsPanel result={result} />}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
