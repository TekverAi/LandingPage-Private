"use client";

import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useState, useRef } from "react";
import { Lightbulb, Settings, Home, Clock, BarChart2, X } from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────────────────────── */
const STEPS = [
  {
    icon: Lightbulb,
    num: "01",
    title: "Developer Code",
    desc: "Your team pushes code to repositories. TekverAI integrates with GitHub, GitLab, and Bitbucket seamlessly.",
    cardRight: true,
  },
  {
    icon: Settings,
    num: "02",
    title: "Upload Repository",
    desc: "Connect your repository or upload your source code archive. TekverAI ingests the full codebase.",
    cardRight: false,
  },
  {
    icon: Home,
    num: "03",
    title: "AI Verification Engine",
    desc: "Our GPU-accelerated AI engine processes your codebase, building a complete semantic model.",
    cardRight: true,
  },
  {
    icon: Clock,
    num: "04",
    title: "Security Analysis",
    desc: "Multi-layer security analysis identifies vulnerabilities, misconfigurations and attack surfaces.",
    cardRight: false,
  },
  {
    icon: BarChart2,
    num: "05",
    title: "Verification Report",
    desc: "A comprehensive report is generated with risk scores, actionable fixes and remediation steps.",
    cardRight: true,
  },
];

/* ─── Layout constants ─────────────────────────────────────────────────────── */
const L = 37;
const R = 63;
const ROW_H = 160; // Increased from 128
const NODE = 84;  // Increased from 72
const PAD = NODE / 2;

const nodePos = STEPS.map((s, i) => ({
  x: s.cardRight ? L : R,
  y: PAD + i * ROW_H + ROW_H / 2,
}));

const totalH = 2 * PAD + STEPS.length * ROW_H;

/* ─── Animated stroke along the zigzag path ───────────────────────────────── */
// We animate a "comet" along the polyline using strokeDashoffset
// The polyline points string (in viewBox units where x=%, y=px-in-viewBox)
const pathPoints = nodePos.map((p) => `${p.x},${p.y}`).join(" ");

function AnimatedPath() {
  // Framer-motion continuous loop on the stroke dash
  return (
    <>
      {/* Static dim background path */}
      <polyline
        points={pathPoints}
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="0.45"
        fill="none"
      />

      {/* Animated glass-glow comet stroke */}
      <motion.polyline
        points={pathPoints}
        fill="none"
        stroke="url(#cometGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="8 200"
        animate={{ strokeDashoffset: [0, -280] }}
        transition={{
          duration: 3,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      />

      {/* Midpoint dots */}
      {nodePos.slice(0, -1).map((p, i) => {
        const mx = (p.x + nodePos[i + 1].x) / 2;
        const my = (p.y + nodePos[i + 1].y) / 2;
        return (
          <motion.circle
            key={i}
            cx={mx}
            cy={my}
            r="1.4"
            fill="rgba(34,211,238,0.45)"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
          />
        );
      })}
    </>
  );
}

/* ─── Hex Node ─────────────────────────────────────────────────────────────── */
function HexNode({
  num,
  delay,
  hovered,
  onHover,
  onLeave,
}: {
  num: string;
  delay: number;
  hovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 220, damping: 18, delay }}
      whileHover={{ scale: 1.18 }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      className="relative cursor-pointer"
      style={{ width: NODE, height: NODE }}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        style={{
          filter: hovered
            ? "drop-shadow(0 0 20px rgba(34,211,238,0.9))"
            : "drop-shadow(0 0 10px rgba(34,211,238,0.5))",
          transition: "filter 0.3s",
        }}
      >
        <defs>
          <linearGradient id={`hg${num}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={hovered ? "#60efff" : "#38e0f5"} />
            <stop offset="100%" stopColor={hovered ? "#1ab4d9" : "#0799be"} />
          </linearGradient>
        </defs>
        <polygon
          points="50,4 93,27.5 93,72.5 50,96 7,72.5 7,27.5"
          fill={`url(#hg${num})`}
        />
        {/* White partial arc */}
        <circle
          cx="50" cy="50" r="32"
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="3"
          strokeDasharray="134 67"
          strokeLinecap="round"
          strokeDashoffset="-17"
        />
        {/* Hover inner ring pulse */}
        {hovered && (
          <circle
            cx="50" cy="50" r="42"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
          />
        )}
      </svg>
      {/* Number */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[24px] font-black text-white leading-none tracking-tight">
          {num}
        </span>
      </div>

      {/* Pulse ring on hover */}
      {hovered && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="absolute inset-0 rounded-full border border-cyan-400 pointer-events-none"
        />
      )}
    </motion.div>
  );
}

/* ─── Hover tooltip card ───────────────────────────────────────────────────── */
function HoverTooltip({
  step,
  cardRight,
}: {
  step: (typeof STEPS)[0];
  cardRight: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute z-50 w-52 pointer-events-none"
      style={{
        bottom: "calc(100% + 12px)",
        left: cardRight ? "auto" : "50%",
        right: cardRight ? "50%" : "auto",
        transform: cardRight ? "translateX(50%)" : "translateX(-50%)",
      }}
    >
      {/* Glass card */}
      <div className="relative rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-5 shadow-[0_8px_32px_rgba(34,211,238,0.25)]">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none" />
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400 mb-1.5">
          {step.num}
        </p>
        <h4 className="text-[14px] font-extrabold uppercase text-white mb-2 leading-tight">
          {step.title}
        </h4>
        <p className="text-[12px] text-white/60 leading-relaxed">{step.desc}</p>
        {/* Arrow tip */}
        <div
          className="absolute w-3 h-3 bg-white/10 backdrop-blur-xl border-r border-b border-white/20 rotate-45"
          style={{ bottom: -6, left: "50%", transform: "translateX(-50%) rotate(45deg)" }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Side icon connector ──────────────────────────────────────────────────── */
function IconConnector({
  Icon,
  nodeDir,
  delay,
}: {
  Icon: any;
  nodeDir: "left" | "right";
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: nodeDir === "right" ? -16 : 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.38, delay }}
      className={`flex items-center ${nodeDir === "right" ? "flex-row-reverse" : "flex-row"}`}
    >
      <div className="w-12 h-12 rounded-full border border-white/18 bg-white/[0.05] flex items-center justify-center flex-shrink-0">
        <Icon size={20} strokeWidth={1.25} className="text-white/65" />
      </div>
      {nodeDir === "right" ? (
        <div className="flex items-center">
          <div className="w-8 h-px bg-white/25" />
          <div className="border-y-[3.5px] border-y-transparent border-l-[5.5px] border-l-white/40" />
        </div>
      ) : (
        <div className="flex items-center">
          <div className="border-y-[3.5px] border-y-transparent border-r-[5.5px] border-r-white/40" />
          <div className="w-8 h-px bg-white/25" />
        </div>
      )}
    </motion.div>
  );
}

/* ─── Info Card ────────────────────────────────────────────────────────────── */
function InfoCard({
  step,
  cardRight,
  delay,
  highlighted,
  onHover,
  onLeave,
}: {
  step: (typeof STEPS)[0];
  cardRight: boolean;
  delay: number;
  highlighted: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: cardRight ? 24 : -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.42, delay }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      animate={highlighted ? { borderColor: "rgba(34,211,238,0.5)", boxShadow: "0 0 30px rgba(34,211,238,0.2)" } : {}}
      className="rounded-[22px] bg-[#091228]/85 border border-white/[0.1] px-7 py-5 shadow-[0_4px_32px_rgba(0,0,0,0.55)] w-full transition-all duration-300"
    >
      <p className="text-[9px] font-bold uppercase tracking-[0.32em] text-cyan-400 mb-1.5">
        Pipeline Step
      </p>
      <h3
        className="text-[14px] md:text-[18px] font-extrabold uppercase tracking-wide leading-tight mb-2.5 transition-colors duration-300"
        style={{ color: highlighted ? "#38e0f5" : "white" }}
      >
        {step.title}
      </h3>
      <p className="text-[11px] md:text-[14px] text-white/38 leading-[1.65]">{step.desc}</p>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────────────────────────────────────── */
export default function WorkflowSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="workflow"
      className="relative bg-[#020617] py-16 md:py-20 lg:py-24 xl:py-32 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Analysis_pipline.webp"
          alt="Analysis Pipeline Background"
          fill
          className="object-cover object-center h-full w-full"
          quality={80}
        />
        {/* Dark overlay to maintain readability */}
        <div className="absolute inset-0 bg-[#020617]/75" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_45%,rgba(8,18,52,0.75),transparent)] pointer-events-none" />

      <div className="relative z-10 container mx-auto max-w-xl md:max-w-4xl lg:max-w-5xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="section-label">Verification Workflow</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight">
            Advanced <span className="text-cyan-400 uppercase tracking-wider">Analysis Pipeline</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed opacity-80">
            Discover how TekverAI transforms raw source code into comprehensive security intelligence through our advanced multi-stage verification pipeline.
          </p>
        </motion.div>

        {/* Desktop/Tablet: Infographic with SVG */}
        <div className="hidden md:block relative" style={{ height: totalH }}>

          {/* SVG layer: zigzag path + animated comet stroke */}
          <svg
            className="absolute inset-0 w-full pointer-events-none"
            style={{ height: totalH }}
            viewBox={`0 0 100 ${totalH}`}
            preserveAspectRatio="none"
          >
            <defs>
              {/* Comet gradient (glass glow effect) */}
              <linearGradient id="cometGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(34,211,238,0)" />
                <stop offset="50%" stopColor="rgba(34,211,238,0.9)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
              </linearGradient>
            </defs>
            <AnimatedPath />
          </svg>

          {/* Step rows */}
          {STEPS.map((step, i) => {
            const { x, y } = nodePos[i];
            const delay = i * 0.08;
            const isHovered = hoveredIdx === i;

            return (
              <div
                key={i}
                className="absolute left-0 right-0"
                style={{ top: y - NODE / 2, height: NODE }}
              >
                {/* Hex Node — with hover state */}
                <div
                  className="absolute"
                  style={{
                    left: `${x}%`,
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 20,
                  }}
                >
                  {/* Hover tooltip */}
                  {isHovered && (
                    <HoverTooltip step={step} cardRight={step.cardRight} />
                  )}
                  <HexNode
                    num={step.num}
                    delay={delay + 0.1}
                    hovered={isHovered}
                    onHover={() => setHoveredIdx(i)}
                    onLeave={() => setHoveredIdx(null)}
                  />
                </div>

                {step.cardRight ? (
                  <>
                    {/* Icon LEFT */}
                    <div
                      className="absolute flex items-center justify-end"
                      style={{
                        right: `${100 - x + 3}%`,
                        top: "50%",
                        transform: "translateY(-50%)",
                        left: 0,
                        paddingRight: 8,
                      }}
                    >
                      <IconConnector Icon={step.icon} nodeDir="right" delay={delay} />
                    </div>
                    {/* Card RIGHT */}
                    <div
                      className="absolute flex items-center"
                      style={{
                        left: `${x + 3}%`,
                        right: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        paddingLeft: NODE / 2 + 8,
                      }}
                    >
                      <InfoCard
                        step={step}
                        cardRight
                        delay={delay}
                        highlighted={isHovered}
                        onHover={() => setHoveredIdx(i)}
                        onLeave={() => setHoveredIdx(null)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Card LEFT */}
                    <div
                      className="absolute flex items-center justify-end"
                      style={{
                        right: `${100 - x + 3}%`,
                        top: "50%",
                        transform: "translateY(-50%)",
                        left: 0,
                        paddingRight: NODE / 2 + 8,
                      }}
                    >
                      <InfoCard
                        step={step}
                        cardRight={false}
                        delay={delay}
                        highlighted={isHovered}
                        onHover={() => setHoveredIdx(i)}
                        onLeave={() => setHoveredIdx(null)}
                      />
                    </div>
                    {/* Icon RIGHT */}
                    <div
                      className="absolute flex items-center"
                      style={{
                        left: `${x + 3}%`,
                        right: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        paddingLeft: 8,
                      }}
                    >
                      <IconConnector Icon={step.icon} nodeDir="left" delay={delay} />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile: Simplified Vertical List */}
        <div className="md:hidden space-y-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {/* Step number badge */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 text-white font-bold text-lg shadow-lg">
                    {step.num}
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-white/5">
                    <Icon size={20} className="text-cyan-400" strokeWidth={1.5} />
                  </div>
                </div>
                
                {/* Content card */}
                <div className="rounded-2xl bg-[#091228]/85 border border-white/10 p-5 shadow-lg">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-cyan-400 mb-2">
                    Pipeline Step
                  </p>
                  <h3 className="text-base font-extrabold uppercase text-white mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
                </div>
                
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="flex justify-center py-3">
                    <div className="w-0.5 h-4 bg-gradient-to-b from-cyan-500/50 to-transparent" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
