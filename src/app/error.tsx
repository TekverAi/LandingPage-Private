/* SYSTEM PAGE — Works for both landing and dashboard */
"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
        padding: "24px",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "20px",
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <AlertTriangle size={32} style={{ color: "#EF4444" }} />
        </div>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "800",
            color: "var(--color-text-primary)",
            marginBottom: "12px",
          }}
        >
          Something went wrong
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "var(--color-text-secondary)",
            maxWidth: "400px",
            lineHeight: "1.6",
            marginBottom: "28px",
          }}
        >
          An unexpected error occurred. Our team has been notified and is working to resolve it.
        </p>
        <button
          onClick={reset}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 28px",
            background: "linear-gradient(135deg, #00E5FF, #7C3AED)",
            border: "none",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "600",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          <RefreshCw size={15} />
          Try Again
        </button>
      </motion.div>
    </div>
  );
}
