/* LANDING PAGE COMPONENT */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { useState } from "react";

const FAQS = [
  {
    q: "How does TekverAI scan my codebase?",
    a: "TekverAI connects to your Git provider (GitHub, GitLab, Bitbucket) via OAuth or a deploy key. Once connected, it pulls your repository, runs a multi-layer static analysis powered by our AI models, and returns a detailed security report - all within minutes, with no code stored on our servers.",
  },
  {
    q: "What languages and frameworks does TekverAI support?",
    a: "TekverAI currently supports JavaScript / TypeScript, Python, Java, Go, Ruby, PHP, C#, and Rust. Framework-aware rules cover React, Next.js, Django, Spring Boot, Rails, Laravel, and more. We add new language packs quarterly.",
  },
  {
    q: "Is my source code stored or used to train models?",
    a: "No. Your source code is never persisted on our servers and is never used to train or fine-tune any model. Each scan runs in an ephemeral, isolated environment that is wiped immediately after the report is generated.",
  },
  {
    q: "Can I integrate TekverAI into my CI/CD pipeline?",
    a: "Yes. The Pro and Enterprise plans include a REST API and native GitHub Actions / GitLab CI templates. You can gate pull-request merges on a passing security score, receive webhook notifications, and pipe results into your existing SIEM or Slack channels.",
  },
  {
    q: "How accurate is the vulnerability detection?",
    a: "Our AI models achieve a false-positive rate below 4% on benchmark suites including OWASP Top 10, CWE Top 25, and SANS Top 20. Each finding includes an exploitability score, code context, and a suggested fix - so your team can triage quickly.",
  },
  {
    q: "Can I upgrade or downgrade my plan at any time?",
    a: "Yes. Plan changes take effect immediately. If you upgrade mid-cycle you are charged only the prorated difference. If you downgrade, the credit rolls over to your next billing period. Enterprise contracts are annual and handled through our sales team.",
  },
];

function FAQItem({ item, index }: { item: typeof FAQS[number]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="group"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 px-6 rounded-xl text-left cursor-pointer transition-colors duration-200"
        style={{
          background: open
            ? "linear-gradient(135deg, rgba(12,28,62,0.95), rgba(6,16,42,0.98))"
            : "rgba(255,255,255,0.025)",
          border: `1px solid ${open ? "rgba(34,211,238,0.2)" : "rgba(255,255,255,0.06)"}`,
          boxShadow: open ? "0 0 0 1px rgba(34,211,238,0.04), 0 8px 24px rgba(0,0,0,0.3)" : "none",
        }}
        aria-expanded={open}
      >
        <span
          className="text-[14.5px] font-semibold leading-snug transition-colors duration-200"
          style={{ color: open ? "white" : "rgba(255,255,255,0.75)" }}
        >
          {item.q}
        </span>

        {/* Icon */}
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          className="flex-shrink-0 flex items-center justify-center rounded-full"
          style={{
            width: 28, height: 28,
            background: open ? "rgba(34,211,238,0.15)" : "rgba(255,255,255,0.06)",
            border: `1px solid ${open ? "rgba(34,211,238,0.35)" : "rgba(255,255,255,0.08)"}`,
          }}
        >
          <Plus size={14} strokeWidth={2.5} style={{ color: open ? "#22d3ee" : "rgba(255,255,255,0.5)" }} />
        </motion.div>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pt-3 pb-5 text-[13.5px] text-slate-400 leading-relaxed">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(6,20,52,0.7), transparent), #020617" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(34,211,238,0.045) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container relative mx-auto max-w-3xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label">FAQ</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Frequently asked <br />
            <span className="text-cyan-400 uppercase tracking-wider">questions</span>
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed opacity-80">
            Everything you need to know about TekverAI. Can&apos;t find your answer?{" "}
            <a href="#contact" className="text-cyan-400 hover:underline">
              Ask us directly.
            </a>
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {FAQS.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
