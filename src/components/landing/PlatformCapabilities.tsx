/* LANDING PAGE COMPONENT */
"use client";

import { motion } from "framer-motion";
import { ShieldAlert, GitMerge, Layers, Zap, BarChart3 } from "lucide-react";


/* ─── Capability Data ────────────────────────────────────────────────────── */
const CAPS = [
  {
    icon: ShieldAlert,
    label: "Security",
    title: "Vulnerability Detection",
    desc: "AI-powered deep scanning for SQL injection, XSS, CSRF, authentication flaws, and secrets exposure across your entire codebase.",
  },
  {
    icon: GitMerge,
    label: "Dependencies",
    title: "Supply Chain Analysis",
    desc: "Full visibility into third-party risks, outdated packages, CVE cross-referencing, and license compliance checks.",
  },
  {
    icon: Layers,
    label: "Architecture",
    title: "System Architecture Review",
    desc: "Continuously validate microservice boundaries, API exposure, data flows, encryption, and access control policies.",
  },
  {
    icon: Zap,
    label: "Performance",
    title: "Performance Risk Detection",
    desc: "Identify memory leaks, N+1 queries, blocking I/O, and resource contention before they hit production.",
  },
];

/* ─── Layout constants ───────────────────────────────────────────────────── */
const PILL_H = 88;
const PILL_GAP = 22;
const ICON_D = PILL_H;
const N = CAPS.length;
const TOTAL_H = N * PILL_H + (N - 1) * PILL_GAP;

const CR = 118;
const CX = CR + 4;
const CY = TOTAL_H / 2;
const SVG_W = CX + CR + 40;

const pillIconCx = SVG_W;
const connectionPts = CAPS.map((_, i) => {
  const pcy = i * (PILL_H + PILL_GAP) + PILL_H / 2;
  const dx = pillIconCx - CX;
  const dy = pcy - CY;
  const angle = Math.atan2(dy, dx);
  return {
    ex: CX + CR * Math.cos(angle),
    ey: CY + CR * Math.sin(angle),
    pcy,
    lineLen: Math.sqrt(dx * dx + dy * dy),
  };
});

/* ─── Animated comet on a line ───────────────────────────────────────────── */
function CometLine({
  x1, y1, x2, y2, len, delay,
}: {
  x1: number; y1: number; x2: number; y2: number;
  len: number; delay: number;
}) {
  return (
    <>
      {/* Static base line */}
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="rgba(34,211,238,0.2)" strokeWidth="1.5" />
      {/* Comet glow */}
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="rgba(34,211,238,0.85)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={`12 ${len}`}
        strokeDashoffset={len + 12}
        animate={{ strokeDashoffset: -(len + 12) }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay }}
        style={{ filter: "drop-shadow(0 0 4px rgba(34,211,238,0.9))" }}
      />
    </>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function PlatformCapabilities() {
  return (
    <section
      id="capabilities"
      className="relative py-12 md:py-20 lg:py-24 xl:py-32 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 90% 80% at 10% 50%, rgba(6,28,58,0.95), transparent), rgba(2,6,23,1)",
      }}
    >
      {/* Dot-grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(rgba(34,211,238,0.055) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      {/* Slow ambient scanning beam */}
      <motion.div
        className="absolute left-0 right-0 pointer-events-none"
        style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(34,211,238,0.08),transparent)" }}
        animate={{ top: ["15%", "85%", "15%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <div className="container relative mx-auto max-w-6xl px-4 md:px-6">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10 md:mb-14 lg:mb-16"
        >
          <div className="section-label">Platform Capabilities</div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight px-4">
            Everything your team needs to <br className="hidden md:block" />{" "}
            <span className="text-cyan-400 uppercase tracking-wider">ship secure software</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed opacity-80 px-4">
            TekverAI covers the full spectrum of code security from dependency
            risks and architecture flaws to real-time scans and compliance reports.
          </p>
        </motion.div>

        {/* ══ INFOGRAPHIC ══ */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center lg:justify-start" style={{ minHeight: "auto" }}>

          {/* ── Left: Hub circle + SVG lines ── */}
          <div className="relative flex-shrink-0 hidden lg:block lg:scale-90 xl:scale-100" style={{ width: SVG_W, height: TOTAL_H }}>
            <svg width={SVG_W} height={TOTAL_H} viewBox={`0 0 ${SVG_W} ${TOTAL_H}`}
              fill="none" className="absolute inset-0">
              <defs>
                <radialGradient id="hubFill" cx="38%" cy="30%" r="75%">
                  <stop offset="0%" stopColor="#0a3d52" />
                  <stop offset="100%" stopColor="#03111e" />
                </radialGradient>
                <clipPath id="rightHalf">
                  <rect x={CX} y={CY - CR} width={CR + 50} height={CR * 2} />
                </clipPath>
              </defs>

              {/* Outer ambient glow ring (slow pulse) */}
              <motion.circle
                cx={CX} cy={CY} r={CR + 22}
                stroke="rgba(34,211,238,0.07)" strokeWidth="1" fill="none"
                animate={{ r: [CR + 22, CR + 28, CR + 22], opacity: [0.07, 0.14, 0.07] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Rotating dashed ring */}
              <motion.circle
                cx={CX} cy={CY} r={CR + 10}
                stroke="rgba(34,211,238,0.15)" strokeWidth="1"
                strokeDasharray="6 7" fill="none"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              />

              {/* Main hub circle */}
              <motion.circle
                cx={CX} cy={CY} r={CR}
                fill="url(#hubFill)"
                stroke="rgba(34,211,238,0.25)" strokeWidth="1.5"
                initial={{ scale: 0.7, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              />

              {/* White arc reflection on circle right */}
              <path
                d={`M ${CX} ${CY - CR + 22} A ${CR - 22} ${CR - 22} 0 0 1 ${CX} ${CY + CR - 22}`}
                stroke="rgba(255,255,255,0.07)" strokeWidth="14" fill="none"
                clipPath="url(#rightHalf)"
              />

              {/* Connecting lines — comet anmiation per line */}
              {connectionPts.map(({ ex, ey, pcy, lineLen }, i) => (
                <CometLine
                  key={i}
                  x1={ex} y1={ey} x2={SVG_W} y2={pcy}
                  len={lineLen}
                  delay={i * 0.45}
                />
              ))}

              {/* Edge node dots — pulsing */}
              {connectionPts.map(({ ex, ey }, i) => (
                <g key={i}>
                  {/* Ping ring */}
                  <motion.circle cx={ex} cy={ey} r={8}
                    stroke="rgba(34,211,238,0.3)" strokeWidth="1" fill="none"
                    animate={{ r: [8, 13, 8], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: i * 0.5 }}
                  />
                  {/* Solid dot */}
                  <motion.circle cx={ex} cy={ey} r={5}
                    fill="#03111e" stroke="rgba(34,211,238,0.7)" strokeWidth="1.5"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.14 }}
                  />
                </g>
              ))}
            </svg>

            {/* Hub circle text — HTML for crispness */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute flex flex-col items-center justify-center pointer-events-none"
              style={{
                left: CX - CR, top: CY - CR,
                width: CR * 2, height: CR * 2,
                borderRadius: "50%",
              }}
            >
              {/* Icon wrapper — inner pulse */}
              <motion.div
                className="flex items-center justify-center rounded-full mb-2 md:mb-3"
                style={{
                  width: 44, height: 44,
                  background: "rgba(34,211,238,0.1)",
                  border: "1.5px solid rgba(34,211,238,0.3)",
                }}
                animate={{ boxShadow: ["0 0 10px rgba(34,211,238,0.15)", "0 0 24px rgba(34,211,238,0.35)", "0 0 10px rgba(34,211,238,0.15)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <BarChart3 size={20} strokeWidth={1.6} className="md:w-6 md:h-6 text-cyan-400" />
              </motion.div>
              <p className="text-[7px] md:text-[8.5px] font-bold uppercase tracking-[0.22em] text-cyan-400/50">Platform</p>
              <p className="text-[15px] md:text-[18px] font-black text-white leading-tight mt-0.5">TekverAI</p>
              <p className="text-[9px] md:text-[10px] font-semibold text-cyan-400/60 mt-0.5">Capabilities</p>
            </motion.div>
          </div>

          {/* ── Right: Pill cards ── */}
          <div className="flex flex-col flex-1 min-w-0 w-full lg:w-auto mt-0 md:mt-8 lg:mt-0 gap-3 md:gap-4 lg:gap-[22px]">
            {CAPS.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 36 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.35 + i * 0.13, ease: "easeOut" }}
                  className="group relative flex items-center w-full h-[76px] md:h-[82px] lg:h-[88px]"
                >
                  {/* Pill body */}
                  <div
                    className="absolute inset-0 rounded-full overflow-hidden transition-all duration-300 group-hover:-translate-y-px pl-[88px] md:pl-[94px] lg:pl-[100px] pr-3 md:pr-4 lg:pr-4 flex items-center"
                    style={{
                      background: "linear-gradient(120deg, rgba(12,28,58,0.95) 0%, rgba(6,16,38,0.98) 100%)",
                      border: "1px solid rgba(34,211,238,0.15)",
                      boxShadow: "0 4px 28px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
                    }}
                  >
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                      style={{ background: "radial-gradient(ellipse 55% 80% at 15% 50%, rgba(34,211,238,0.08), transparent)" }}
                    />
                    {/* Animated top-edge shimmer on hover */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(90deg,transparent,rgba(34,211,238,0.5),transparent)" }}
                    />
                    <div className="relative flex flex-col gap-0.5">
                      <span className="text-[7px] md:text-[8.5px] font-bold uppercase tracking-[0.22em] text-cyan-400/55">{cap.label}</span>
                      <h3 className="text-[12px] md:text-[13px] lg:text-[14.5px] font-bold text-white leading-tight tracking-tight">{cap.title}</h3>
                      <p className="text-[10px] md:text-[10.5px] lg:text-[11.5px] leading-relaxed text-slate-400 mt-0.5 line-clamp-2">{cap.desc}</p>
                    </div>
                  </div>

                  {/* Icon circle — left rounded cap */}
                  <motion.div
                    className="absolute flex items-center justify-center rounded-full z-10 w-[76px] h-[76px] md:w-[82px] md:h-[82px] lg:w-[88px] lg:h-[88px]"
                    style={{
                      left: 0, top: 0,
                      background: "radial-gradient(circle at 38% 32%, #0f3f55, #031520)",
                      border: "2px solid rgba(34,211,238,0.35)",
                      flexShrink: 0,
                    }}
                    animate={{
                      boxShadow: [
                        "0 0 10px rgba(34,211,238,0.1), 0 4px 16px rgba(0,0,0,0.5)",
                        "0 0 22px rgba(34,211,238,0.28), 0 4px 16px rgba(0,0,0,0.5)",
                        "0 0 10px rgba(34,211,238,0.1), 0 4px 16px rgba(0,0,0,0.5)",
                      ]
                    }}
                    transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                    whileHover={{ scale: 1.06 }}
                  >
                    <Icon size={24} strokeWidth={1.5} className="md:w-7 md:h-7 text-cyan-400"
                      style={{ filter: "drop-shadow(0 0 5px rgba(34,211,238,0.5))" }} />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
