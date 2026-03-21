/* LANDING PAGE COMPONENT */
"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { ShieldCheck, Play, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth - 0.5) * 20);
    mouseY.set((clientY / innerHeight - 0.5) * 20);
  };

  const bgX = useTransform(mouseX, (v) => v * -1);
  const bgY = useTransform(mouseY, (v) => v * -1);
  const agentX = useTransform(mouseX, (v) => v * 1.5);
  const agentY = useTransform(mouseY, (v) => v * 1.5);

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 md:px-10 lg:px-12 py-12 md:py-8 lg:py-0"
    >
      {/* Background Image - Mobile & Tablet */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full bg-[url('/Mobile_hero.webp')] bg-cover bg-center block lg:hidden"
      />

      {/* Background Image - Desktop */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full bg-[url('/Hero_Image.webp')] bg-cover bg-center hidden lg:block"
      />

      {/* Dark Overlay - Responsive */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/30 lg:bg-black/25" />

      {/* AI Dots Effect */}
      <div className="pointer-events-none absolute inset-0 z-[2]">
        {/* Animated Dots */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[3px] w-[3px] rounded-full bg-[var(--color-accent)]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.4,
            }}
            animate={{
              y: [0, -30 - Math.random() * 40, 0],
              x: [0, (Math.random() - 0.5) * 20, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Larger Glowing Dots */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`glow-${i}`}
            className="absolute h-[5px] w-[5px] rounded-full bg-[var(--color-accent)] blur-[2px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container-xl relative z-10 w-full py-0 md:py-0 lg:py-0">
        <div className="grid items-center gap-8 md:gap-6 lg:gap-16 xl:gap-20 grid-cols-1 lg:grid-cols-2">
          {/* Left Content: High-Impact Typography */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left lg:mt-14 xl:mt-0"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 md:mb-8 hidden xxl:flex justify-center lg:justify-start"
            >
              <div className="section-label bg-[rgba(34,211,238,0.03)] border border-[rgba(34,211,238,0.15)] text-[var(--color-accent)] px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs backdrop-blur-[10px] m-0">
                <ShieldCheck size={14} className="mr-2 md:mr-2.5" />
                ELITE AI SYSTEM VERIFICATION
              </div>
            </motion.div>

            <h1 className="mt-10 mb-5 md:mb-5 lg:mb-8 text-[clamp(42px,10vw,88px)] font-[800] leading-[0.95] tracking-[-0.05em] text-white [text-shadow:0_10px_30px_rgba(0,0,0,0.5)]">
              Eliminate Vulnerabilities <br />
              <span className="relative inline-block text-[var(--color-accent)]">
                Before Deployment.
                <div className="absolute bottom-1 md:bottom-2 left-0 h-[2px] w-full bg-gradient-to-r from-[var(--color-accent)] to-transparent opacity-50" />
              </span>
            </h1>

            <p className="mb-7 md:mb-8 lg:mb-14 max-w-[540px] mx-auto lg:ml-0 text-[clamp(16px,1.4vw,21px)] font-[300] leading-[1.6] text-white/70">
              Detect every security flaw, logic error, and system risk, before your code goes live.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6">
              <Link href="/product" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-3 md:gap-3.5 rounded-full px-8 md:px-10 py-3.5 md:py-4 text-[15px] md:text-[17px] shadow-[0_20px_40px_rgba(34,211,238,0.15)]">
                Explore the Platform <ArrowRight size={22} />
              </Link>
              <Link href="#live-review" className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-3 md:gap-3.5 rounded-full bg-white/2 px-8 md:px-10 py-3.5 md:py-4 text-[15px] md:text-[17px] backdrop-blur-[12px]">
                Try Live Demo <Play size={20} fill="currentColor" />
              </Link>
            </div>
          </motion.div>

          {/* Right Content: Robot Agent Composition with Parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ x: agentX, y: agentY }}
            className="relative flex justify-center mt-12 lg:mt-0"
          >
            <div className="hidden relative w-full max-w-[320px] md:max-w-[480px] lg:max-w-[620px]">
              {/* Agent image - Now AI Core with Blending */}

              {/* Data Floating Elements */}
              <motion.div
                className="absolute top-[10%] -right-[5%] md:right-[-2%] z-[3] rounded-2xl md:rounded-[1.25rem] border border-[rgba(34,211,238,0.4)] bg-[rgba(2,6,23,0.8)] px-4 py-2.5 md:px-6 md:py-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-[20px] scale-75 md:scale-100"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="mb-0.5 md:mb-1 text-xs md:text-[15px] font-[800] text-[var(--color-accent)]">Logic Engine</div>
                <div className="text-[10px] md:text-xs font-[500] text-white/60">Purity: 99.992%</div>
              </motion.div>

              <motion.div
                className="absolute bottom-[5%] -left-[10%] md:left-[-5%] z-[3] rounded-2xl md:rounded-[1.25rem] border border-white/15 bg-[rgba(2,6,23,0.8)] px-4 py-2.5 md:px-6 md:py-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-[20px] scale-75 md:scale-100"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="mb-0.5 md:mb-1 text-xs md:text-[15px] font-[800] text-white">System Integrity</div>
                <div className="text-[10px] md:text-xs font-[600] text-[var(--color-accent)]">Status: Verified</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
