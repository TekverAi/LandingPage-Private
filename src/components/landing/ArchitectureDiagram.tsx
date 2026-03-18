"use client";

import { motion } from "framer-motion";
import { ChevronUp, GitBranch, Cpu, UploadCloud, ShieldCheck, Code2, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";

/* ══════════════ SVG DEFS: GLOW FILTERS + GRADIENTS ═══════════════════════ */
function SvgDefs() {
  return (
    <svg width="0" height="0" className="absolute">
      <defs>
        {/* Bloom / fiber-optic glow */}
        <filter id="bloom" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur2" />
          <feMerge><feMergeNode in="blur1" /><feMergeNode in="blur2" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Gradients */}
        <linearGradient id="cyanLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(34,211,238,0)" />
          <stop offset="40%" stopColor="rgba(34,211,238,0.9)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.7)" />
        </linearGradient>
        <linearGradient id="greenLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(74,222,128,0)" />
          <stop offset="50%" stopColor="rgba(74,222,128,0.85)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.5)" />
        </linearGradient>
        <radialGradient id="floorGrad" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgba(34,211,238,0.12)" />
          <stop offset="60%" stopColor="rgba(14,116,144,0.06)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ══════════════ HUD BACKGROUND DECORATION ════════════════════════════════ */
function HudDecoration() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Corner brackets TL */}
      <svg className="absolute top-4 left-4" width="36" height="36" fill="none">
        <path d="M0 14 L0 0 L14 0" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" />
      </svg>
      {/* Corner brackets TR */}
      <svg className="absolute top-4 right-4" width="36" height="36" fill="none">
        <path d="M36 14 L36 0 L22 0" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" />
      </svg>
      {/* Corner brackets BL */}
      <svg className="absolute bottom-4 left-4" width="36" height="36" fill="none">
        <path d="M0 22 L0 36 L14 36" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" />
      </svg>
      {/* Corner brackets BR */}
      <svg className="absolute bottom-4 right-4" width="36" height="36" fill="none">
        <path d="M36 22 L36 36 L22 36" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" />
      </svg>
      {/* Floating tiny dots */}
      {[
        { x: "15%", y: "20%" }, { x: "82%", y: "15%" },
        { x: "10%", y: "75%" }, { x: "90%", y: "80%" },
        { x: "50%", y: "8%" }, { x: "50%", y: "92%" },
      ].map((p, i) => (
        <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-cyan-400/40"
          style={{ left: p.x, top: p.y }}
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.4, 1] }}
          transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.6 }} />
      ))}
      {/* Scan line */}
      <motion.div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/12 to-transparent pointer-events-none"
        animate={{ top: ["10%", "90%", "10%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
    </div>
  );
}

/* ─── DATA NODE (sources) ─── */
function DataNode({ label, isActive, icon: Icon }: { label: string; isActive?: boolean, icon: any }) {
  return (
    <div className="flex flex-col items-center gap-3 group/node cursor-default">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center max-w-[100px] leading-tight mb-0.5">{label}</p>

      <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl border border-cyan-500/20 bg-[#0F172A]/80 backdrop-blur-md group-hover/node:border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.05)] transition-all duration-300 group-hover/node:shadow-[0_0_25px_rgba(34,211,238,0.15)] group-hover/node:-translate-y-1">

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400/40 rounded-tl-md" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400/40 rounded-br-md" />

        {/* The Icon */}
        <Icon size={26} className="text-cyan-400 opacity-80 group-hover/node:opacity-100 transition-opacity" style={{ filter: "drop-shadow(0 0 8px rgba(34,211,238,0.6))" }} />

        {/* Orbiting activity indicator when spiking */}
        {isActive && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-4px] rounded-[18px] border border-cyan-400/0 border-t-cyan-400/40 border-b-cyan-400/40 opacity-70"
          />
        )}
      </div>

      {/* Subtle Binary stream below icon */}
      <div className="flex justify-center gap-1.5 opacity-30 group-hover/node:opacity-60 transition-opacity">
        {[0, 1, 0].map((v, i) => (
          <motion.span
            key={i}
            animate={isActive ? { opacity: [0.2, 1, 0.2] } : {}}
            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
            className="text-[6.5px] font-mono text-cyan-400"
          >
            {v}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ─── CORE AI HUB ─── */
function CoreAIHub({ total }: { total: number }) {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-[190px] h-[150px] p-6 rounded-2xl border border-cyan-500/30 bg-[#0F172A]/95 backdrop-blur-2xl shadow-[0_0_50px_rgba(34,211,238,0.2)] overflow-hidden group/hub">
        {/* Box Code Borders */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-cyan-400/60" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-cyan-400/60" />
        </div>

        {/* Scanning Line */}
        <motion.div
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-px bg-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.7)] z-10"
        />

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center">
          <motion.p
            key={total}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            className="text-[36px] font-black text-white leading-none tracking-tighter mb-2"
            style={{ textShadow: "0 0 25px rgba(34,211,238,0.6)" }}
          >
            {total.toLocaleString()}
          </motion.p>
          <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-3" />
          <p className="text-[11px] font-bold text-cyan-400 tracking-[0.25em] uppercase">Core Engine</p>
          <p className="text-[8px] text-slate-500 uppercase tracking-widest mt-1">Data IQ Scanner</p>
        </div>
      </div>

      {/* Reactive wave decoration */}
      <div className="absolute right-[-18px] top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-80 group/hub:opacity-100 transition-opacity">
        {[1.0, 0.6, 0.9, 0.4, 0.8].map((v, i) => (
          <motion.div key={i}
            animate={{ width: [6, 16, 6], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}
            className="h-1 bg-cyan-400 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}

/* ══════════════ FIBER OPTIC FLOW LINES ════════════════════════════════════ */
function FiberLines({ bugs, files }: { bugs: number; files: number }) {
  const lineConfigs = [
    { w: 32, label: "Bugs Detected", val: bugs.toLocaleString(), show: true },
    { w: 48, label: null, val: null, show: false },
    { w: 48, label: null, val: null, show: false },
    { w: 32, label: "Files Scanned", val: files.toLocaleString(), show: true },
    { w: 48, label: null, val: null, show: false },
  ];
  return (
    <div className="flex flex-col gap-[9px] flex-shrink-0 mx-1">
      {lineConfigs.map((l, i) => (
        <div key={i} className="flex items-center gap-1.5">
          {/* Glowing fiber line */}
          <div className="relative" style={{ width: l.w, height: 2, background: "rgba(34,211,238,0.18)", borderRadius: 2, boxShadow: "0 0 4px rgba(34,211,238,0.25)" }}>
            <motion.div className="absolute top-0 h-full rounded"
              style={{ width: l.show ? 10 : 14, background: "linear-gradient(90deg,transparent,rgba(34,211,238,0.95),white)", boxShadow: "0 0 8px 3px rgba(34,211,238,0.7)" }}
              animate={{ left: [`-14px`, `${l.w + 2}px`] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: i * 0.24 }}
            />
          </div>
          {/* Arrowhead */}
          <div style={{ width: 0, height: 0, borderTop: "3.5px solid transparent", borderBottom: "3.5px solid transparent", borderLeft: "6px solid rgba(34,211,238,0.65)", filter: "drop-shadow(0 0 3px rgba(34,211,238,0.8))" }} />
          {/* Label */}
          {l.show && (
            <div className="flex flex-col leading-none">
              <span className="text-[6.5px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>{l.label}</span>
              <motion.span
                key={l.val}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                className="text-[12px] font-bold text-white"
                style={{ fontFamily: "'Courier New',monospace", textShadow: "0 0 8px rgba(34,211,238,0.5)" }}
              >
                {l.val}
              </motion.span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ══════════════ 3D CUBOID TABLE (ODS/DW/DM) ══════════════════════════════ */
function CuboidTable() {
  const cols = ["PARSE", "ANALYZE", "VERIFY"];
  const rows = [
    { label: "Files", vals: ["4,521", "4,521", "4,521"] },
    { label: "Issues", vals: ["2,847", "1,204", "643"] },
    { label: "Risk Score", vals: ["Critical", "High", "Resolved"] },
  ];

  return (
    <div className="relative flex-1 min-w-0">
      {/* The 3D table block */}
      <div className="relative">
        {/* ─── Top-face perspective strip (3D lid) ─── */}
        <div className="flex" style={{ marginBottom: -1 }}>
          <div style={{ width: 100 }} /> {/* label col spacer */}
          {cols.map((col, ci) => (
            <div key={col} className="flex-1 flex items-end justify-center pb-1" style={{
              height: 28,
              background: ci === 0 ? "linear-gradient(135deg,#2563eb,#1e40af)" : ci === 1 ? "linear-gradient(135deg,#1d4ed8,#1e3a8a)" : "linear-gradient(135deg,#1e3a8a,#1e2d6e)",
              borderLeft: ci === 0 ? "1px solid rgba(99,179,237,0.35)" : "none",
              borderTop: "1px solid rgba(99,179,237,0.4)",
              borderRight: "1px solid rgba(99,179,237,0.22)",
              transform: "perspective(300px) rotateX(-30deg) scaleY(0.7)",
              transformOrigin: "bottom center",
              boxShadow: "inset 0 2px 8px rgba(147,197,253,0.12)",
            }}>
              <span className="text-[12px] font-bold text-white tracking-widest" style={{ textShadow: "0 0 8px rgba(147,197,253,0.6)" }}>{col}</span>
            </div>
          ))}
        </div>

        {/* ─── Main front face (data) ─── */}
        <div className="overflow-hidden" style={{
          background: "linear-gradient(180deg,#1e3799 0%,#0c2461 55%,#060d38 100%)",
          border: "1px solid rgba(99,179,237,0.22)",
          boxShadow: "inset 0 1px 0 rgba(147,197,253,0.15), 0 0 40px rgba(14,116,144,0.2)",
          borderRadius: "0 0 10px 10px",
        }}>
          {/* Subtle interior grid lines */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)",
            backgroundSize: "33.3% 33.3%",
          }} />
          {rows.map((row, ri) => (
            <div key={ri} className={`flex ${ri < 2 ? "border-b border-white/[0.06]" : ""}`}>
              <div className="flex flex-col justify-center px-4 py-4" style={{ width: 100, borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.32)" }}>{row.label}</span>
              </div>
              {row.vals.map((val, ci) => (
                <div key={ci} className="flex-1 flex flex-col items-center justify-center py-4" style={{ borderLeft: ci > 0 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <span className="text-[17px] font-black text-white leading-tight" style={{ fontFamily: "'Inter',sans-serif", textShadow: "0 0 12px rgba(147,197,253,0.35)" }}>{val}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ─── Isometric floor platform ─── */}
        <div className="absolute left-0 right-0" style={{ bottom: -4, height: 8, background: "linear-gradient(180deg,#0a1840,#05092a)", border: "1px solid rgba(99,179,237,0.12)", borderTop: "none", borderRadius: "0 0 6px 6px" }} />
        <div className="absolute left-3 right-3" style={{ bottom: -12, height: 8, background: "#040c22", border: "1px solid rgba(99,179,237,0.07)", borderTop: "none", borderRadius: "0 0 6px 6px" }} />

        {/* ─── Floor glow reflection ─── */}
        <div className="absolute left-0 right-0 pointer-events-none" style={{
          bottom: -28, height: 20,
          background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(34,211,238,0.08), transparent)",
          filter: "blur(4px)",
        }} />
      </div>

      {/* ─── Action buttons ─── */}
      <div className="flex gap-2 mt-9">
        {[
          { label: "Code Scanner", dark: false },
          { label: "Vuln. Analysis", dark: false },
          { label: "Compliance Check", dark: false },
          { label: "Risk Report", dark: true },
        ].map((btn, i) => (
          <motion.button key={i} whileHover={{ scale: 1.05 }} transition={{ duration: 0.15 }}
            className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-colors"
            style={{
              borderColor: btn.dark ? "rgba(255,255,255,0.07)" : "rgba(34,211,238,0.25)",
              background: btn.dark ? "rgba(20,20,30,0.5)" : "rgba(10,30,70,0.65)",
              boxShadow: btn.dark ? "none" : "0 0 12px rgba(34,211,238,0.04)",
            }}>
            <div className="flex flex-col items-center" style={{ gap: 1.5 }}>
              <ChevronUp size={8} style={{ color: btn.dark ? "rgba(255,255,255,0.2)" : "rgba(34,211,238,0.45)" }} />
              <ChevronUp size={8} style={{ color: btn.dark ? "rgba(255,255,255,0.3)" : "rgba(34,211,238,0.85)", marginTop: -2 }} />
            </div>
            <span className="text-[8.5px] font-semibold whitespace-nowrap" style={{ color: btn.dark ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.55)" }}>
              {btn.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════ CURVED FIBER CONNECTORS ════════════════════════════════════ */
function CurvedFibers() {
  return (
    <svg width="70" height="310" viewBox="0 0 70 310" fill="none" className="flex-shrink-0 self-center" style={{ filter: "url(#softGlow)" }}>
      {/* → UP: dashed to Security Reports */}
      <motion.path d="M4,155 C30,155 30,46 68,46" stroke="rgba(34,211,238,0.4)" strokeWidth="1.5" fill="none"
        strokeDasharray="10"
        animate={{ strokeDashoffset: [0, -20] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
      <path d="M62,42 L68,46 L62,50" stroke="rgba(34,211,238,0.6)" strokeWidth="1.5" fill="none" />

      {/* → STRAIGHT: dashed to App Integration */}
      <motion.path d="M4,155 L68,155" stroke="rgba(34,211,238,0.7)" strokeWidth="1.5" fill="none"
        strokeDasharray="10"
        animate={{ strokeDashoffset: [0, -20] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
      <path d="M62,151 L68,155 L62,159" stroke="rgba(34,211,238,0.6)" strokeWidth="1.5" fill="none" />

      {/* → DOWN: dashed to Insights */}
      <motion.path d="M4,155 C30,155 30,264 68,264" stroke="rgba(34,211,238,0.4)" strokeWidth="1.5" fill="none"
        strokeDasharray="10"
        animate={{ strokeDashoffset: [0, -20] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
      <path d="M62,260 L68,264 L62,268" stroke="rgba(34,211,238,0.6)" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

/* ══════════════ WIREFRAME ISO CUBE (Holographic) ═════════════════════════ */
/* ══════════════ HOLOGRAPHIC ICON COMPONENT ══════════════════════════════ */
function HolographicIcon({ icon: Icon, color, size = 64 }: { icon: any; color: string; size?: number }) {
  return (
    <div className="relative flex items-center justify-center group/icon" style={{ width: size, height: size }}>
      {/* Hex-like outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-cyan-500/30 bg-[#0F172A]/80 backdrop-blur-md"
        animate={{
          boxShadow: [
            `0 0 15px ${color}22, inset 0 0 10px ${color}11`,
            `0 0 30px ${color}44, inset 0 0 15px ${color}22`,
            `0 0 15px ${color}22, inset 0 0 10px ${color}11`,
          ],
          borderColor: [`${color}33`, `${color}66`, `${color}33`]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Inner Icon */}
      <Icon size={size * 0.45} className="text-cyan-400 z-10 transition-transform duration-500 group-hover/icon:scale-110" 
        style={{ filter: `drop-shadow(0 0 12px ${color}aa)` }} />
      
      {/* Decorative scanline or holographic elements */}
      <motion.div 
        className="absolute w-full h-[1px] bg-cyan-400/30 blur-[1px] z-20 pointer-events-none"
        animate={{ top: ["20%", "80%", "20%"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-400/50 rounded-tl-lg" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-400/50 rounded-br-lg" />
    </div>
  );
}

/* ══════════════ MAIN EXPORT ════════════════════════════════════════════════ */
export default function ArchitectureDiagram() {
  const [data, setData] = useState({
    total: 520520,
    repos: 18,
    ci: 49,
    uploads: 18,
    bugs: 2847,
    files: 14523,
    active: false
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const isSpiking = Math.random() > 0.7;
        return {
          total: prev.total + Math.floor(Math.random() * 5) + (isSpiking ? 20 : 0),
          repos: prev.repos, // Repos don't change often
          ci: Math.max(40, prev.ci + Math.floor(Math.random() * 3) - 1),
          uploads: Math.max(10, prev.uploads + Math.floor(Math.random() * 3) - 1),
          bugs: prev.bugs + (Math.random() > 0.9 ? 1 : 0),
          files: prev.files + Math.floor(Math.random() * 2),
          active: isSpiking
        };
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="architecture" className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, #050f2a 0%, #020617 60%, #010410 100%)" }}>

      <SvgDefs />

      {/* Fine dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(rgba(34,211,238,0.06) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />
      {/* Center ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 50% at 50% 55%, rgba(34,211,238,0.05), transparent)",
      }} />

      <div className="container relative mx-auto max-w-[1380px] px-4">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label">System Architecture</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            How the AI verification <br /> <span className="text-cyan-400 uppercase tracking-wider">engine works</span>
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed opacity-80">
            A multi-layer pipeline that ingests, parses, and analyzes your codebase through specialized AI modules.
          </p>
        </motion.div>

        {/* ══ DASHBOARD PANEL ══ */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-x-auto overflow-y-hidden"
          style={{
            border: "1px solid rgba(34,211,238,0.1)",
            background: "rgba(2,6,22,0.88)",
            boxShadow: "0 0 0 1px rgba(34,211,238,0.05), 0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(34,211,238,0.06)",
          }}>

          {/* HUD elements */}
          <HudDecoration />

          {/* Top label bar */}
          <div className="flex items-center gap-3 px-6 py-2.5 border-b border-white/[0.04]">
            <span className="text-[9px] font-bold tracking-[0.22em] uppercase whitespace-nowrap" style={{ color: "rgba(255,255,255,0.25)" }}>
              AI Verification Data Flow
            </span>
            <div className="flex gap-1 items-center flex-1 overflow-hidden" style={{ opacity: 0.2 }}>
              {Array.from({ length: 36 }).map((_, i) => <div key={i} className="w-1 h-px bg-white rounded" />)}
              <div className="w-px h-3 bg-white ml-0.5" />
            </div>
          </div>

          {/* ══ MAIN HORIZONTAL FLOW ══ */}
          <div className="flex items-center gap-3 px-8 py-10" style={{ minWidth: 1120, minHeight: 460 }}>

            {/* ZONE 1: Sources */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="flex flex-col gap-6 flex-shrink-0">
              <DataNode label="Git Repositories" isActive={data.active} icon={GitBranch} />
              <DataNode label="CI/CD Pipelines" isActive={data.active} icon={Cpu} />
              <DataNode label="Direct Uploads" isActive={data.active} icon={UploadCloud} />
            </motion.div>

            {/* Converging glowing wires */}
            <div className="flex-shrink-0 self-stretch relative" style={{ width: 58 }}>
              <svg width="58" height="100%" viewBox="0 0 58 250" preserveAspectRatio="none" fill="none"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", filter: "url(#softGlow)" }}>
                <motion.path d="M0,32 C38,32 38,125 58,125" stroke="rgba(34,211,238,0.4)" strokeWidth="1.5" fill="none"
                  strokeDasharray="10"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.path d="M0,125 L58,125" stroke="rgba(34,211,238,0.7)" strokeWidth="1.5" fill="none"
                  strokeDasharray="10"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
                <motion.path d="M0,218 C38,218 38,125 58,125" stroke="rgba(34,211,238,0.4)" strokeWidth="1.5" fill="none"
                  strokeDasharray="10"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <text x="4" y="72" fontSize="7" fill="rgba(255,255,255,0.18)" transform="rotate(-35,4,72)">Git sync</text>
                <text x="5" y="120" fontSize="7" fill="rgba(255,255,255,0.18)">Live</text>
                <text x="3" y="176" fontSize="7" fill="rgba(255,255,255,0.18)" transform="rotate(35,3,176)">Batch</text>
              </svg>
            </div>

            {/* ZONE 2: AI Hub */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-shrink-0">
              <CoreAIHub total={data.total} />
            </motion.div>

            {/* ZONE 3: Fiber lines */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <FiberLines bugs={data.bugs} files={data.files} />
            </motion.div>

            {/* ZONE 4: 3D Cuboid Table */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.3 }}
              className="flex-1 min-w-0">
              <CuboidTable />
            </motion.div>

            {/* ZONE 5: Curved fiber connectors */}
            <CurvedFibers />

            {/* ZONE 6: Holographic services */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col justify-between flex-shrink-0 self-stretch py-2 gap-4" style={{ width: 210 }}>

              {/* Security Reports */}
              <div className="flex flex-col gap-1.5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-cyan-400">Security Reports</p>
                <div className="flex items-end gap-5">
                  <HolographicIcon color="#22d3ee" size={64} icon={ShieldCheck} />
                  <div className="flex flex-col gap-1 pb-1">
                    <HolographicIcon color="#22d3ee" size={38} icon={ShieldCheck} />
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Reports</span>
                  </div>
                </div>
              </div>

              {/* Developer API */}
              <div className="flex flex-col gap-1.5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-cyan-400">Developer API</p>
                <div className="flex items-end gap-5">
                  <HolographicIcon color="#22d3ee" size={64} icon={Code2} />
                  <div className="flex flex-col gap-1 pb-1">
                    <HolographicIcon color="#22d3ee" size={34} icon={Code2} />
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Endpoints</span>
                  </div>
                </div>
              </div>

              {/* Insights Dashboard */}
              <div className="flex flex-col gap-1.5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-cyan-400">Insights</p>
                <div className="flex items-end gap-5">
                  <HolographicIcon color="#22d3ee" size={64} icon={BarChart3} />
                  <div className="flex flex-col gap-1 pb-1">
                    <HolographicIcon color="#22d3ee" size={38} icon={BarChart3} />
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Analytics</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* NVIDIA badge */}
          <div className="flex items-center justify-center border-t border-white/[0.04] py-3">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#76b900]/22 bg-[#76b900]/05">
              <motion.div className="w-1.5 h-1.5 rounded-full bg-[#76b900]" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.5, repeat: Infinity }} />
              <span className="font-mono text-[9px] text-[#76b900] tracking-wider">NVIDIA GPU Accelerated</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
