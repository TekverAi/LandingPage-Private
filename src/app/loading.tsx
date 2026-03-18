/* SYSTEM PAGE — Works for both landing and dashboard */
"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-bg-primary)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
      }}
    >
      {/* Animated Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #00E5FF, #7C3AED)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
            fontWeight: "700",
            color: "#fff",
          }}
        >
          T
        </div>

        <div
          style={{
            fontSize: "22px",
            fontWeight: "700",
            color: "var(--color-text-primary)",
          }}
        >
          Tekver<span style={{ color: "var(--color-accent)" }}>AI</span>
        </div>
      </motion.div>

      {/* Loading spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "3px solid var(--color-border)",
          borderTopColor: "var(--color-accent)",
        }}
      />

      <p
        style={{
          color: "var(--color-text-secondary)",
          fontSize: "14px",
        }}
      >
        Initializing AI verification systems...
      </p>
    </div>
  );
}
