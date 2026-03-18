"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ShieldAlert, Activity, Zap, ShieldCheck } from "lucide-react";

const bottomStats = [
  { 
    value: 2.3, 
    suffix: "M+",
    label: "Vulnerabilities Detected", 
    icon: ShieldAlert 
  },
  { 
    value: 99.9, 
    suffix: "%",
    label: "System Uptime", 
    icon: Activity 
  },
  { 
    value: 10, 
    suffix: "x",
    label: "Faster Reviews", 
    icon: Zap 
  },
  { 
    value: 500, 
    suffix: "+",
    label: "Enterprises Secured", 
    icon: ShieldCheck 
  },
];

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          // Keep 1 decimal place if the original value has one, otherwise round it
          setCount(Number.isInteger(value) ? Math.floor(latest) : Number(latest.toFixed(1)));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function HeroStats() {
  return (
    <section className="relative border-b border-white/5 bg-[#020617] py-16 md:py-20 lg:py-24 xl:py-32 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Bottom Tier: Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          {bottomStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-cyan-400 mb-4 md:mb-6 transition-all duration-300 group-hover:bg-cyan-500 group-hover:text-black group-hover:scale-110">
                <stat.icon size={20} className="md:hidden" />
                <stat.icon size={24} className="hidden md:block" />
              </div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-slate-500 text-xs md:text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
