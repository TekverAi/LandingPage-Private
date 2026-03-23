/* LANDING PAGE COMPONENT */
"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export default function DashboardPreview() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-primary)] px-4 sm:px-6 md:px-12 pt-16 md:pt-20 lg:pt-24 xl:pt-32 pb-20">
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

        {/* Browser Frame */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.7),0_0_50px_rgba(34,211,238,0.05)] bg-[#05080f]"
        >
          {/* Browser Chrome */}
          <div className="flex items-center gap-2 border-b border-white/5 bg-[#0a0f1a] px-4 md:px-5 py-3">
            <div className="flex gap-1.5">
              <div className="size-2.5 rounded-full bg-[#ff5f57]" />
              <div className="size-2.5 rounded-full bg-[#febc2e]" />
              <div className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="ml-4 flex-1 rounded-md bg-white/5 px-4 py-1.5 font-mono text-[11px] text-slate-400 flex items-center justify-between">
              <span>https://app.tekverAi.com/dashboard</span>
              <Globe size={10} className="opacity-40" />
            </div>
          </div>

          {/* Image Content */}
          <div className="relative w-full overflow-hidden bg-[#05080f]">
            <img 
              src="/dashboard_preview.PNG" 
              alt="Tekver AI Dashboard" 
              className="w-full h-auto block"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
