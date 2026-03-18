/* LANDING PAGE COMPONENT */
"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle2, Activity, ChevronRight, GitBranch } from "lucide-react";
import Link from "next/link";

function PremiumLaunchButton() {
  return (
    <a href="https://app.tekverai.com/" target="_blank" className="group relative inline-flex items-center gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-4 rounded-xl transition-all duration-500 overflow-hidden">
      {/* Glassmorphic Background */}
      <div className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-xl border border-white/10 group-hover:border-cyan-500/50 transition-colors duration-500" />
      
      {/* Inner Glow Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10 transition-opacity duration-700" />

      {/* Tech Brackets */}
      <div className="absolute top-0 left-0 w-2 h-2 md:w-3 md:h-3 border-t border-l border-white/20 group-hover:border-cyan-400 group-hover:w-3 group-hover:h-3 md:group-hover:w-4 md:group-hover:h-4 transition-all duration-500" />
      <div className="absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 border-b border-r border-white/20 group-hover:border-cyan-400 group-hover:w-3 group-hover:h-3 md:group-hover:w-4 md:group-hover:h-4 transition-all duration-500" />

      {/* Scanning Shimmer */}
      <motion.div 
        animate={{ left: ['-100%', '200%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-[-25deg] pointer-events-none"
      />

      {/* Content */}
      <span className="relative z-10 text-sm md:text-base font-bold text-white tracking-wider group-hover:text-cyan-400 transition-colors duration-300">
        LAUNCH DASHBOARD
      </span>
      <ChevronRight size={16} className="md:w-[18px] md:h-[18px] relative z-10 text-cyan-400 group-hover:translate-x-1.5 transition-transform duration-300" />
      
      {/* Underglow on hover */}
      <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-cyan-400/0 group-hover:bg-cyan-400/40 blur-sm transition-all duration-500" />
    </a>
  );
}

export default function DashboardPreview() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-primary)] px-4 sm:px-6 md:px-12 py-16 md:py-20 lg:py-24 xl:py-32">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="section-label">COMMAND CENTER DASHBOARD</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight">
            Your security command <br /> <span className="text-cyan-400 uppercase tracking-wider">center</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed opacity-80">
            Full visibility into your codebase health, security posture, and AI verification status in one unified dashboard.
          </p>
        </motion.div>

        {/* Dashboard Mock */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden rounded-2xl md:rounded-[20px] border border-[var(--color-border-accent)] shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(34,211,238,0.05)]"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-[var(--color-border-subtle)] bg-[#0d1424] px-4 md:px-5 py-2.5 md:py-3">
            <div className="size-2 md:size-2.5 rounded-full bg-[#ef4444]" />
            <div className="size-2 md:size-2.5 rounded-full bg-[#f59e0b]" />
            <div className="size-2 md:size-2.5 rounded-full bg-[#22c55e]" />
            <div className="ml-2 md:ml-3 flex-1 rounded-md bg-white/4 px-3 md:px-3.5 py-1 md:py-1.5 font-mono text-[10px] md:text-xs text-[var(--color-text-muted)]">
              https://app.tekverai.com/dashboard
            </div>
          </div>

          {/* Dashboard content */}
          <div className="flex min-h-[300px] md:min-h-[400px] bg-[var(--color-bg-secondary)]">
            {/* Sidebar */}
            <div className="hidden w-[180px] md:w-[200px] shrink-0 border-r border-[var(--color-border-subtle)] bg-[rgba(11,15,25,0.8)] py-4 md:py-5 sm:block">
              {[
                { icon: Activity, label: "Overview", active: true },
                { icon: GitBranch, label: "Repositories" },
                { icon: Shield, label: "Security" },
                { icon: CheckCircle2, label: "Reports" },
              ].map(({ icon: Icon, label, active }, i) => (
                <div
                  key={i}
                  className={`mx-2 my-0.5 flex cursor-default items-center gap-2 md:gap-2.5 rounded-lg border-l-2 px-3 md:px-4 py-2 md:py-2.5 transition-colors ${active
                      ? "bg-[rgba(34,211,238,0.1)] border-[var(--color-accent)]"
                      : "bg-transparent border-transparent"
                    }`}
                >
                  <Icon size={14} className={`md:w-[15px] md:h-[15px] ${active ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]"}`} />
                  <span
                    className={`text-xs md:text-[13px] ${active ? "font-[600] text-[var(--color-text-primary)]" : "font-[400] text-[var(--color-text-muted)]"
                      }`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-hidden p-4 md:p-6">
              {/* Stats row */}
              <div className="mb-4 md:mb-5 grid grid-cols-3 gap-2 md:gap-3">
                {[
                  { label: "Repositories", value: "12", color: "var(--color-accent)" },
                  { label: "Vulnerabilities", value: "5", color: "var(--color-danger)" },
                  { label: "Secure Score", value: "87%", color: "var(--color-success)" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="rounded-lg md:rounded-[10px] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-3 md:p-4"
                  >
                    <div
                      className="mb-1 text-lg md:text-xl lg:text-[22px] font-[800]"
                      style={{ color: s.color }}
                    >
                      {s.value}
                    </div>
                    <div className="text-[10px] md:text-[11px] text-[var(--color-text-secondary)]">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Activity feed */}
              <div className="overflow-hidden rounded-xl md:rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
                <div className="border-b border-[var(--color-border-subtle)] px-3 md:px-4 py-2.5 md:py-3 font-mono text-[10px] md:text-xs font-[600] text-[var(--color-text-secondary)]">
                   RECENT VERIFICATIONS
                </div>
                {[
                  { repo: "api-gateway", status: "SECURE", time: "2m ago", color: "var(--color-success)" },
                  { repo: "auth-service", status: "2 ISSUES", time: "15m ago", color: "var(--color-warning)" },
                  { repo: "payment-core", status: "SCANNING", time: "now", color: "var(--color-accent)" },
                ].map((r, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-3 md:px-4 py-2 md:py-2.5 ${i < 2 ? "border-b border-[var(--color-border-subtle)]" : ""
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <GitBranch size={12} className="md:w-[13px] md:h-[13px] text-[var(--color-text-muted)]" />
                      <span className="font-mono text-xs md:text-[13px] text-[var(--color-text-primary)]">
                        {r.repo}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                      <span className="text-[10px] md:text-[11px] font-[600]" style={{ color: r.color }}>{r.status}</span>
                      <span className="text-[10px] md:text-[11px] text-[var(--color-text-muted)]">{r.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA below preview */}
        <div className="mt-12 md:mt-16 lg:mt-20 text-center">
          <PremiumLaunchButton />
        </div>
      </div>
    </section>
  );
}
