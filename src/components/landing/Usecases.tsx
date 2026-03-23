/* LANDING PAGE COMPONENT */
"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Search, Play, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

const useCaseReport = `// TekverAI Use Case Analysis: Enterprise CI/CD
{
  "project": "core-payment-engine",
  "environment": "production-ready",
  "usecase": "Continuous Security Verification",
  
  "results": {
    "zero_day_vulnerabilities": 0,
    "logic_flaws_detected": 4,
    "remediation_confidence": "98%",
    "status": "SECURED"
  },

  "recommendation": "Deploy with active monitoring"
}`;

export default function Usecases() {
  const handleScrollToContact = () => {
    const section = document.getElementById("contact") as HTMLElement | null;
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="usecases" className="relative overflow-hidden bg-[#020617] px-4 md:px-8 lg:px-12 py-12 md:py-20 lg:py-24 xl:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 md:mb-14 lg:mb-16"
      >
        <div className="section-label">USE CASES - ENTERPRISE READY</div>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight px-4">
          Secure your entire <br className="hidden sm:block" /> <span className="text-cyan-400 uppercase tracking-wider">digital ecosystem</span>
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed opacity-80 px-4">
          TekverAI is designed for complex, high-stakes environments where security and correctness are non-negotiable.
        </p>
      </motion.div>

      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-8 md:gap-10 lg:gap-12 lg:grid-cols-2">
          {/* Left — Report Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="group relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#0B0F1A]/90 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-3 md:px-5 lg:px-6 py-3 md:py-4">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/40" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                    <div className="w-2 h-2 rounded-full bg-green-500/40" />
                  </div>
                  <div className="hidden md:flex items-center gap-2 border-l border-white/10 pl-4">
                    <Shield size={14} className="text-cyan-400" />
                    <span className="font-mono text-[13px] text-slate-400 uppercase tracking-tighter">usecase_analysis.json</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                   <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Live Report</span>
                </div>
              </div>

              <div className="p-4 md:p-6 lg:p-8 overflow-x-auto custom-scrollbar">
                <pre className="font-mono text-[11px] md:text-[13px] lg:text-[14px] leading-relaxed text-slate-300">
                  {useCaseReport.split("\n").map((line, i) => (
                    <div key={i} className="flex gap-3 md:gap-4 lg:gap-6 group/line">
                      <span className="w-4 md:w-5 text-right select-none text-slate-600 font-medium text-[10px] md:text-[13px]">{i + 1}</span>
                      <span
                        className="transition-colors duration-300 group-hover/line:text-white"
                        dangerouslySetInnerHTML={{
                          __html: line
                            .replace(/(\/\/.*)/g, '<span class="text-slate-500 italic">$1</span>')
                            .replace(/"(.*?)"/g, '<span class="text-emerald-400">"$1"</span>')
                            .replace(/: (.*?)(,|$)/g, ': <span class="text-cyan-400">$1</span>$2')
                            .replace(/\{|\}/g, '<span class="text-slate-500">$&</span>'),
                        }}
                      />
                    </div>
                  ))}
                </pre>
              </div>

              <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            </div>
          </motion.div>

          {/* Right — Use cases list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-6 md:gap-8"
          >
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {[
                {
                  icon: ShieldCheck,
                  label: "CI/CD Security Gates",
                  desc: "Automatically verify every pull request for security vulnerabilities and logic flaws before they hit production."
                },
                {
                  icon: Zap,
                  label: "AI Logic Validation",
                  desc: "Ensure your AI-generated code is not just syntactically correct, but logically sound and free of hallucinations."
                },
                {
                  icon: Search,
                  label: "Legacy Code Modernization",
                  desc: "Quickly audit large legacy codebases to identify technical debt, security gaps, and refactoring opportunities."
                },
              ].map(({ icon: Icon, label, desc }, i) => (
                <div
                  key={i}
                  className="group/item flex gap-4 md:gap-6 p-4 md:p-6 rounded-xl md:rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all duration-500"
                >
                  <div className="flex size-12 md:size-14 shrink-0 items-center justify-center rounded-lg md:rounded-xl border border-cyan-500/10 bg-cyan-500/5 group-hover/item:border-cyan-500/40 group-hover/item:bg-cyan-500/10 transition-all duration-500">
                    <Icon size={20} className="md:w-6 md:h-6 text-cyan-400 group-hover/item:scale-110 transition-transform" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base md:text-lg font-bold text-white group-hover/item:text-cyan-400 transition-colors">
                      {label}
                    </h3>
                    <p className="text-xs md:text-sm leading-relaxed text-slate-400 opacity-80">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Card */}
            <div className="relative group/cta overflow-hidden rounded-2xl border border-white/5 bg-[#030712] p-8 md:p-10 shadow-2xl mt-4">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] -mr-32 -mt-32 rounded-full pointer-events-none" />
              
              <div className="relative z-10">
                <h4 className="text-xl md:text-2xl font-black text-white tracking-tight mb-4">
                  Tailored solutions for <br className="hidden sm:block" /> <span className="text-cyan-400">Your Enterprise</span>.
                </h4>
                
                <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md mb-8 opacity-90">
                  Ready to see how TekverAI can transform your security posture? Let's discuss your specific requirements.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <motion.button
                    onClick={handleScrollToContact}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-[#020617] font-black text-sm tracking-widest overflow-hidden group/btn cursor-pointer shadow-lg shadow-cyan-500/10"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      TALK TO AN EXPERT <Play size={12} fill="currentColor" strokeWidth={0} />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:animate-shimmer" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
