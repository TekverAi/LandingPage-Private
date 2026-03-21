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
          className="fixed bottom-5 left-1/2 z-[3000] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-white/10 shadow-2xl sm:bottom-6"
          style={{
            background: "linear-gradient(145deg, rgba(8,18,42,0.98), rgba(3,10,28,0.99))",
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(34,211,238,0.05)",
          }}
        >
          <div className="p-4 sm:p-5">
            <div className="flex items-start gap-4">
              <div
                className="flex size-10 flex-shrink-0 items-center justify-center rounded-xl"
                style={{ background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.2)" }}
              >
                <Cookie size={19} className="text-cyan-400" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[15px] font-bold text-white">Cookie Consent</h3>
                  <button onClick={() => dismiss("close")} className="text-slate-500 hover:text-white transition-colors cursor-pointer">
                    <X size={14} />
                  </button>
                </div>
                <p className="text-[12.5px] leading-relaxed text-slate-400 mb-4">
                  We use cookies to enhance your experience and analyze our traffic.
                </p>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => dismiss("allow")}
                    className="flex-1 rounded-lg py-2.5 text-[12px] font-black tracking-wide text-[#020617] cursor-pointer"
                    style={{ background: "linear-gradient(135deg, #22d3ee, #0ea5e9)" }}
                  >
                    ACCEPT ALL
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => dismiss("deny")}
                    className="flex-1 rounded-lg border border-white/10 py-2.5 text-[12px] font-black text-slate-400 hover:bg-white/5 hover:text-white cursor-pointer"
                  >
                    DECLINE
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
