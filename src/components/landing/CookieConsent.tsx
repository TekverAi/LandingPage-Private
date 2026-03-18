/* LANDING PAGE COMPONENT */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ShieldCheck, BarChart2 } from "lucide-react";

const COOKIE_KEY = "tekverai_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem(COOKIE_KEY)) {
      // Small delay so it doesn't flash immediately on load
      const t = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  function dismiss(choice: "allow" | "deny" | "close") {
    localStorage.setItem(COOKIE_KEY, choice);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 340, damping: 30 }}
          className="fixed bottom-5 left-1/2 z-[3000] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-2xl border border-white/10 shadow-2xl sm:bottom-6"
          style={{
            background: "linear-gradient(145deg, rgba(10,22,50,0.98), rgba(3,10,28,0.99))",
            backdropFilter: "blur(18px)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px rgba(0,0,0,0.7), 0 0 40px rgba(34,211,238,0.05)",
          }}
        >
          {/* Close button */}
          <button
            onClick={() => dismiss("close")}
            className="absolute right-3.5 top-3.5 flex size-7 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-white/8 hover:text-white cursor-pointer"
            aria-label="Close"
          >
            <X size={14} />
          </button>

          <div className="p-5 sm:p-6">
            {/* Icon + Title */}
            <div className="mb-3 flex items-center gap-3">
              <div
                className="flex size-9 flex-shrink-0 items-center justify-center rounded-xl"
                style={{ background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.22)" }}
              >
                <Cookie size={17} className="text-cyan-400" />
              </div>
              <h3 className="text-[15px] font-bold text-white">We use cookies</h3>
            </div>

            {/* Description */}
            <p className="mb-4 text-[13px] leading-relaxed text-slate-400">
              TekverAI uses cookies and local storage to remember your preferences, keep you signed in, and understand how you use our platform. Your data stays on your device we never sell it.
            </p>

            {/* Cookie types */}
            <div className="mb-5 flex flex-col gap-2">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={13} className="flex-shrink-0 text-cyan-400" />
                <span className="text-[12px] text-slate-400">
                  <span className="font-semibold text-slate-300">Essential</span> - authentication, session, security
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <BarChart2 size={13} className="flex-shrink-0 text-cyan-400" />
                <span className="text-[12px] text-slate-400">
                  <span className="font-semibold text-slate-300">Analytics</span> - anonymous usage patterns
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2.5">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => dismiss("allow")}
                className="flex-1 rounded-md py-2.5 text-[13px] font-bold tracking-wide text-[#020617] transition-all cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #22d3ee, #06b6d4)",
                  boxShadow: "0 0 20px rgba(34,211,238,0.25)",
                }}
              >
                Allow All
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => dismiss("deny")}
                className="flex-1 rounded-md border border-white/10 py-2.5 text-[13px] font-bold text-slate-300 transition-all hover:bg-white/5 hover:text-white cursor-pointer"
              >
                Deny
              </motion.button>
            </div>

            <p className="mt-3 text-center text-[11px] text-slate-600">
              You can change this preference at any time in your browser settings.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
