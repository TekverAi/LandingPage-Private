/* LANDING PAGE COMPONENT */
"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ShieldCheck, Eye, Lock, ZapOff } from "lucide-react";

const threats = [
  { id: 1, type: "CRITICAL", label: "SQL Injection", path: "/api/users/query", icon: AlertTriangle, color: "var(--color-danger)" },
  { id: 2, type: "HIGH", label: "Exposed API Key", path: "config/env.js", icon: Eye, color: "var(--color-warning)" },
  { id: 3, type: "HIGH", label: "Weak Auth Token", path: "auth/jwt.ts", icon: Lock, color: "var(--color-warning)" },
  { id: 4, type: "MEDIUM", label: "XSS Vulnerability", path: "views/render.tsx", icon: ZapOff, color: "var(--color-accent)" },
  { id: 5, type: "LOW", label: "Outdated Library", path: "package.json", icon: ShieldCheck, color: "var(--color-success)" },
];

const metrics = [
  { label: "Threats Detected", value: "23", trend: "+3 this scan", up: false },
  { label: "Auto-Resolved", value: "18", trend: "+5 fixed", up: true },
  { label: "Risk Score", value: "42/100", trend: "8 pts better", up: true },
  { label: "Coverage", value: "98.7%", trend: "+0.3%", up: true },
];

export default function SecurityIntelligence() {
  return (
    <section id="security" className="relative bg-[var(--color-bg-primary)] px-12 py-[96px]">
      <div className="container-xl">
        <div className="grid grid-cols-1 items-center gap-[60px] lg:grid-cols-2">
          {/* Left — text + metrics */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">Security Intelligence</div>
            <h2 className="mb-[16px] text-[clamp(26px,3.2vw,42px)] font-[800] leading-[1.12] tracking-[-0.03em] text-[var(--color-text-primary)]">
              Real-time threat <span className="text-[var(--color-accent)]">detection and analysis</span>
            </h2>
            <p className="mb-[36px] text-[15px] leading-[1.65] text-[var(--color-text-secondary)]">
              TekverAI continuously monitors your codebase for security threats, providing instant alerts and detailed remediation guidance for every vulnerability found.
            </p>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 gap-[12px]">
              {metrics.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="rounded-[12px] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-[18px]"
                >
                  <div className="mb-[3px] font-mono text-[22px] font-[800] tracking-[-0.02em] text-[var(--color-text-primary)]">
                    {m.value}
                  </div>
                  <div className="mb-[5px] text-[11px] text-[var(--color-text-secondary)]">
                    {m.label}
                  </div>
                  <div className={`text-[11px] font-[500] ${m.up ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"}`}>
                    {m.trend}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — threat scanner panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-[16px] border border-[var(--color-border-subtle)] bg-[var(--color-surface)]"
          >
            {/* Panel header */}
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] px-[18px] py-[14px]">
              <div className="flex items-center gap-[9px]">
                <div className="size-[7px] animate-pulse rounded-full bg-[var(--color-danger)]" />
                <span className="font-mono text-[12px] font-[600] text-[var(--color-text-primary)]">
                  THREAT SCANNER — LIVE
                </span>
              </div>
              <span className="text-[11px] text-[var(--color-text-muted)]">
                5 issues found
              </span>
            </div>

            {/* Threat list */}
            {threats.map((threat, i) => {
              const Icon = threat.icon;
              return (
                <motion.div
                  key={threat.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.07 }}
                  className={`group flex items-center gap-[12px] px-[18px] py-[13px] transition-colors hover:bg-white/2 ${i < threats.length - 1 ? "border-b border-[var(--color-border-subtle)]" : ""
                    }`}
                >
                  <Icon size={14} className="shrink-0" style={{ color: threat.color }} strokeWidth={2} />
                  <div className="min-w-0 flex-1">
                    <div className="mb-[2px] text-[12px] font-[600] text-[var(--color-text-primary)]">
                      {threat.label}
                    </div>
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[11px] text-[var(--color-text-muted)]">
                      {threat.path}
                    </div>
                  </div>
                  <span
                    className="shrink-0 rounded-[99px] border bg-white/3 px-[7px] py-[2px] text-[10px] font-[700] tracking-[0.04em]"
                    style={{ color: threat.color, borderColor: `${threat.color}40` }}
                  >
                    {threat.type}
                  </span>
                </motion.div>
              );
            })}

            {/* Scan progress */}
            <div className="border-t border-[var(--color-border-subtle)] bg-black/15 px-[18px] py-[14px]">
              <div className="mb-[7px] flex justify-between">
                <span className="text-[11px] text-[var(--color-text-secondary)]">
                  Scanning: src/api/routes.ts
                </span>
                <span className="font-mono text-[11px] font-[600] text-[var(--color-accent)]">
                  78%
                </span>
              </div>
              <div className="h-[3px] overflow-hidden rounded-[2px] bg-[var(--color-border)]">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "78%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
                  className="h-full rounded-[2px] bg-[var(--color-accent)]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
