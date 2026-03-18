/* LANDING PAGE COMPONENT */
"use client";

import { motion } from "framer-motion";
import { Code2, ScanSearch, BrainCircuit, Lock, BarChart2, FileCheck, QrCode } from "lucide-react";
import { LucideIcon } from "lucide-react";
import Image from "next/image";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  code: string;
  bgImage: string;
  highlightLine?: number;
}

const features: Feature[] = [
  {
    icon: Code2,
    title: "Codebase Scanning",
    description: "Deep analysis of your entire application codebase, detecting issues across all files, modules, and dependencies.",
    code: `# Pattern match init\nfind_pattern(src/**/*.js)\nfor file in files:\n  if (analyze(file)) {\n    report(issue);\n  }`,
    highlightLine: 4,
    bgImage: "/features/Codebase_Scanning.webp",
  },
  {
    icon: ScanSearch,
    title: "Vulnerability Detection",
    description: "AI-powered identification of security vulnerabilities, injection points, and exposed attack surfaces.",
    code: `# Checking for SQL injection\ndef query_db(user_input):\n  input = '$tream'\n  if (isVulnerable(nod)) {\n    location = ***_input;\n    remediate(node);\n  }`,
    highlightLine: 4,
    bgImage: "/features/Vulnerability_Detection.webp",
  },
  {
    icon: BrainCircuit,
    title: "Logic Error Analysis",
    description: "Intelligent analysis that finds logical inconsistencies, race conditions, and undefined behaviors.",
    code: `/* Race condition check */\nif (state.locked) {\n  return false;\n}\n// Edge case risk\nstate.locked = true;\nprocess(data);`,
    highlightLine: 6,
    bgImage: "/features/Logic_Error_ananysis.webp",
  },
  {
    icon: Lock,
    title: "Security Hardening",
    description: "Automated recommendations and remediation paths to harden your system against known threat vectors.",
    code: `// Patching CVE-224-0\napplyPatch(fix_082);\nif (!isSecure(env)) {\n  alert('Exposure');\n  lockdown();\n}`,
    highlightLine: 4,
    bgImage: "/features/Security_Hardening.webp",
  },
  {
    icon: BarChart2,
    title: "Performance Risk Profiling",
    description: "Identifies bottlenecks, memory leaks, and inefficient algorithms before they impact production.",
    code: `// Loop efficiency check\nwhile (item in list) {\n  if (node.isLeaky()) {\n    log_leak(node);\n    gc_collect();\n  }\n}`,
    highlightLine: 3,
    bgImage: "/features/Performance_Risk_Profiling.webp",
  },
  {
    icon: FileCheck,
    title: "Verification Reports",
    description: "Comprehensive reports with actionable insights, risk scores, and remediation guidance for your team.",
    code: `# Generating Summary\nscore = calc_risk()\nif (score < 80) {\n  fail_compliance();\n  send_report(ops);\n}`,
    highlightLine: 4,
    bgImage: "/features/Verification_Reports.webp",
  },
];

/* ─── Sub-Components ─────────────────────────────────────────────────────── */

function CornerBrackets() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-cyan-500/60 transition-all duration-700 group-hover:w-12 group-hover:h-12" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-cyan-500/60 transition-all duration-700 group-hover:w-12 group-hover:h-12" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-cyan-500/60 transition-all duration-700 group-hover:w-12 group-hover:h-12" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-cyan-500/60 transition-all duration-700 group-hover:w-12 group-hover:h-12" />
    </div>
  );
}

function DigitalBorder() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect 
          x="0.5" y="0.5" width="99" height="99" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="0.2"
          className="text-cyan-500/40"
          strokeDasharray="2, 5"
        />
        <circle cx="20" cy="0.5" r="0.4" className="fill-cyan-400 animate-pulse" />
        <circle cx="80" cy="0.5" r="0.4" className="fill-cyan-400 delay-75 animate-pulse" />
        <circle cx="99.5" cy="40" r="0.4" className="fill-cyan-400 delay-150 animate-pulse" />
        <circle cx="0.5" cy="70" r="0.4" className="fill-cyan-400 delay-300 animate-pulse" />
      </svg>
    </div>
  );
}

function TargetIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="absolute w-full h-full border border-cyan-500/10 rounded-full" />
        <div className="absolute w-3/4 h-3/4 border border-cyan-500/10 rounded-full" />
        <div className="absolute w-full h-px bg-cyan-500/5" />
        <div className="absolute h-full w-px bg-cyan-500/5" />
      </div>

      <div className="absolute inset-0 border border-cyan-500/20 rounded-xl group-hover:border-cyan-500/40 transition-all duration-700">
        <div className="absolute top-0 left-0 w-2 h-2 md:w-3 md:h-3 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 border-b-2 border-r-2 border-cyan-400" />
      </div>

      <div className="relative z-10 p-2.5 md:p-3 lg:p-4 bg-[#0F172A]/80 backdrop-blur-sm border border-white/5 rounded-lg group-hover:border-cyan-500/50 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
        <Icon size={24} strokeWidth={1.5} className="text-cyan-400 group-hover:text-white transition-colors duration-500 md:w-7 md:h-7 lg:w-8 lg:h-8" />
      </div>

      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 border border-cyan-400/20 rounded-full" 
      />
    </div>
  );
}

function FloatingCode({ code, highlightLine }: { code: string; highlightLine?: number }) {
  const lines = code.split('\n');
  return (
    <motion.div 
      initial={{ opacity: 0.6, y: 0 }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-4 md:top-6 lg:top-8 right-3 md:right-4 lg:right-6 w-[160px] md:w-[200px] lg:w-[230px] p-2.5 md:p-4 lg:p-5 rounded-xl font-mono text-[8px] md:text-[9px] lg:text-[10px] select-none border border-white/10 backdrop-blur-xl shadow-2xl z-10 overflow-hidden"
      style={{ background: "rgba(10, 20, 35, 0.85)" }}
    >
      <div className="absolute -top-10 -right-10 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-transparent blur-3xl rounded-full" />
      
      <div className="flex flex-col gap-1 md:gap-1.5 relative">
        {lines.map((line, idx) => {
          const isHighlighted = idx + 1 === highlightLine;
          return (
            <div key={idx} className="relative flex items-center group/line">
              <div 
                className={`w-[2px] md:w-[3px] h-2.5 md:h-3.5 rounded-full mr-2 md:mr-3 shrink-0 ${
                  isHighlighted ? 'bg-red-500 shadow-[0_0_8px_rgba(239, 68, 68, 0.8)]' : 'bg-cyan-500/20'
                }`} 
              />
              <span className="w-4 text-white/20 text-[8px] text-right mr-3">{idx + 1}</span>
              <div className={`flex-1 ${isHighlighted ? 'text-red-400 font-medium' : 'text-slate-300 opacity-70'}`}>
                {isHighlighted && (
                  <div className="absolute -inset-x-2 inset-y-0 bg-red-500/[0.08] blur-sm -z-10" />
                )}
                <span className="whitespace-pre">{line}</span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── Main Section ───────────────────────────────────────────────────────── */

export default function ProductOverview() {
  return (
    <section id="platform" className="relative bg-[#020617] py-12 md:py-16 lg:py-20 xl:py-32 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/[0.03] blur-[100px] rounded-full pointer-events-none" />

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: "radial-gradient(#22d3ee 0.5px, transparent 0.5px)", backgroundSize: "30px 30px" }} />

      <div className="container relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12 lg:mb-16"
        >
          <div className="section-label">Platform Overview</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            The Smarter Way to <br /> <span className="text-cyan-400 uppercase tracking-wider">Verify Secure Code</span>
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed opacity-80">
            One platform that keeps your codebase clean, secure, and deployment-ready
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative min-h-[440px] md:min-h-[460px] lg:min-h-[480px]"
            >
                <div
                className="relative h-full p-5 md:p-6 lg:p-8 border border-cyan-500/20 backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-cyan-500/[0.02] group-hover:border-cyan-500/40 group-hover:translate-y-[-10px] group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6),inset_0_0_60px_rgba(34,211,238,0.05),inset_0_0_30px_rgba(0,0,0,1)] overflow-hidden"
                style={{ background: "rgba(10,20,40,0.4)" }}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                  width={500}
                  height={500} 
                    src={feature.bgImage} 
                    alt="img" 
                    className="w-full h-full object-cover opacity-[0.35] group-hover:opacity-[0.5] scale-110 group-hover:scale-100 transition-all duration-1000 ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/40 via-transparent to-[#020617]/80 group-hover:from-[#020617]/20 transition-colors duration-700" />
                </div>

                <DigitalBorder />
                <CornerBrackets />
                
                <div className="absolute top-4 md:top-6 left-6 md:left-8 flex gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 rounded-full bg-red-400/40 group-hover:bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400/40 group-hover:bg-yellow-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]" />
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                  <motion.div
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                  />
                </div>

                <FloatingCode code={feature.code} highlightLine={feature.highlightLine} />

                <div className="relative mt-5 md:mt-6 lg:mt-8 mb-6 md:mb-8 lg:mb-12 flex justify-start pl-2">
                  <TargetIcon Icon={feature.icon} />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 md:gap-3 mb-2.5 md:mb-3 lg:mb-4">
                    <span className="font-mono text-[12px] text-cyan-500 font-bold">0{i + 1}</span>
                    <div className="relative flex-1">
                      <h3 className="text-base md:text-lg lg:text-xl xl:text-[24px] font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors uppercase">
                        {feature.title}
                      </h3>
                      <div className="h-0.5 w-full bg-white/10 group-hover:bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all duration-700 mt-1" />
                    </div>
                  </div>

                  <p className="text-slate-400 leading-relaxed text-xs md:text-sm lg:text-[15px] opacity-70 group-hover:opacity-100 group-hover:text-slate-200 transition-all duration-500 line-clamp-3">
                    {feature.description}
                  </p>
                </div>

                <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 flex items-center gap-2 px-2 md:px-3 py-1 md:py-1.5 border border-cyan-500/20 bg-cyan-500/5 transition-all duration-500 group-hover:border-cyan-400/40">
                  <span className="font-mono text-[9px] text-cyan-400/60 uppercase tracking-[1px]">SYS_VERIFIED_V1.0</span>
                  <QrCode size={12} className="text-cyan-400/40 group-hover:text-cyan-400 transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
