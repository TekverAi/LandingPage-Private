/* LANDING PAGE COMPONENT */
"use client";

import { motion } from "framer-motion";
import { Code2, Lock, BrainCircuit, Play } from "lucide-react";

interface Capability {
  icon: any;
  label: string;
  desc: string;
}

const codeSnippet = `// TekverAI Developer API — Coming Soon
const tekverai = new TekverAI({
  apiKey: process.env.TEKVERAI_KEY,
  model: "verify-v2-gpu",
});

const result = await tekverai.verify({
  repository: "github.com/myorg/api",
  depth: "comprehensive",
  checks: ["security", "logic", "perf"],
});

console.log(result.score);   // 94
console.log(result.threats); // []
console.log(result.report);  // { ... }`;

export default function DeveloperAPI() {
  const handleWaitlistClick = () => {
    const section = document.getElementById('newsletter-section');
    const input = document.getElementById('newsletter-email');
    if (section && input) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Wait for scroll to finish before focusing
      setTimeout(() => {
        input.focus({ preventScroll: true });
      }, 800);
    }
  };

  return (
    <section id="api" className="relative overflow-hidden bg-[#020617] px-4 md:px-8 lg:px-12 py-12 md:py-20 lg:py-24 xl:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 md:mb-14 lg:mb-16"
      >
        <div className="section-label">DEVELOPER API - COMING SOON</div>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight px-4">
          Integrate AI verification <br className="hidden sm:block" /> <span className="text-cyan-400 uppercase tracking-wider">into your pipeline</span>
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed opacity-80 px-4">
          The TekverAI Developer API will allow you to integrate GPU-accelerated code verification directly into your CI/CD pipelines, build systems, and development workflows.
        </p>
      </motion.div>

      <div className="container mx-auto max-w-7xl">
      <div className="grid grid-cols-1 items-start gap-8 md:gap-10 lg:gap-12 lg:grid-cols-2">
        {/* Left — Terminal Code Preview */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="group relative"
        >
          {/* Visual Flair: Glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

          <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#0B0F1A]/90 backdrop-blur-xl shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-3 md:px-5 lg:px-6 py-3 md:py-4">
              <div className="flex items-center gap-2 md:gap-4">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-500/20 group-hover:bg-red-500 transition-colors" />
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-yellow-500/20 group-hover:bg-yellow-500 transition-colors" />
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-500/20 group-hover:bg-green-500 transition-colors" />
                </div>
                <div className="hidden md:flex items-center gap-2 border-l border-white/10 pl-4">
                  <Code2 size={14} className="text-cyan-400" />
                  <span className="font-mono text-[13px] text-slate-400">tekver_verify.ts</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="hidden sm:inline font-mono text-[10px] font-bold text-cyan-400 tracking-widest uppercase opacity-70">Coming Soon</span>
              </div>
            </div>

            {/* Code Content */}
            <div className="p-4 md:p-6 lg:p-8 overflow-x-auto">
              <pre className="font-mono text-[11px] md:text-[13px] lg:text-[14px] leading-relaxed text-slate-300">
                {codeSnippet.split("\n").map((line, i) => (
                  <div key={i} className="flex gap-3 md:gap-4 lg:gap-6 group/line">
                    <span className="w-4 md:w-5 text-right select-none text-slate-600 font-medium text-[10px] md:text-[13px]">{i + 1}</span>
                    <span
                      className="transition-colors duration-300 group-hover/line:text-white"
                      dangerouslySetInnerHTML={{
                        __html: line
                          .replace(/(\/\/.*)/g, '<span class="text-slate-500 italic">$1</span>')
                          .replace(
                            /(".*?"|'.*?'|`.*?`)/g,
                            '<span class="text-emerald-400">$1</span>'
                          )
                          .replace(
                            /\b(const|await|new|process|console)\b/g,
                            '<span class="text-indigo-400">$1</span>'
                          )
                          .replace(
                            /\b(tekverai|TekverAI|result)\b/g,
                            '<span class="text-cyan-400 font-bold">$1</span>'
                          ),
                      }}
                    />
                  </div>
                ))}
              </pre>
            </div>

            {/* Bottom Decoration */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </motion.div>

        {/* Right — Content & Waitlist */}
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
                icon: Code2,
                label: "RESTful & GraphQL API",
                desc: "Simple, type-safe endpoints designed for a great developer experience."
              },
              {
                icon: Lock,
                label: "Enterprise-Grade Security",
                desc: "Granular RBAC, IP allowlisting, and secure API key management."
              },
              {
                icon: BrainCircuit,
                label: "Custom Logic Training",
                desc: "Fine-tune verification models specifically for your domain's logic."
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

          {/* ── Premium Early Access Card ── */}
          <div className="relative group/waitlist overflow-hidden rounded-2xl border border-white/5 bg-[#030712] p-8 md:p-10 shadow-2xl mt-4">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] -mr-32 -mt-32 rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 blur-[80px] -ml-24 -mb-24 rounded-full pointer-events-none" />
            
            <div className="absolute top-6 right-8 opacity-5 group-hover/waitlist:opacity-10 transition-opacity duration-700">
               <BrainCircuit size={100} className="text-cyan-400" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                 <div className="h-px w-8 bg-cyan-500/50" />
                 <span className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">Early Access Program</span>
              </div>
              
              <h4 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-4">
                Be the first to build <br className="hidden sm:block" /> with <span className="text-cyan-400">TekverAI</span>.
              </h4>
              
              <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md mb-8 opacity-90">
                Join our exclusive developer preview to get early access to our high-performance code verification API and documentation.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <motion.button
                  onClick={handleWaitlistClick}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-[#020617] font-black text-sm tracking-widest overflow-hidden group/btn cursor-pointer shadow-lg shadow-cyan-500/10"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    JOIN WAITLIST <Play size={12} fill="currentColor" strokeWidth={0} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:animate-shimmer" />
                </motion.button>

                <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/5 font-mono">
                  <div className="relative size-2">
                    <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75" />
                    <div className="relative size-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-300 tracking-tighter uppercase">
                    84 Slots Remaining
                  </span>
                </div>
              </div>
            </div>
            
            {/* Corner Decorative Light */}
            <div className="absolute bottom-0 right-0 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
