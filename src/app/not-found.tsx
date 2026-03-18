/* SYSTEM PAGE — Works for both landing and dashboard */
import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-bg-primary)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          fontSize: "120px",
          fontWeight: "900",
          lineHeight: "1",
          background: "linear-gradient(135deg, rgba(0,229,255,0.3), rgba(124,58,237,0.3))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          position: "relative",
          zIndex: 1,
        }}
      >
        404
      </div>

      <h1
        style={{
          fontSize: "28px",
          fontWeight: "800",
          color: "var(--color-text-primary)",
          position: "relative",
          zIndex: 1,
        }}
      >
        Page Not Found
      </h1>
      <p
        style={{
          fontSize: "15px",
          color: "var(--color-text-secondary)",
          maxWidth: "400px",
          lineHeight: "1.6",
          position: "relative",
          zIndex: 1,
        }}
      >
        The page you are looking for does not exist or has been moved.
      </p>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", position: "relative", zIndex: 1 }}>
        <Link
          href="/"
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
            textDecoration: "none",
          }}
        >
          <Home size={15} />
          Go Home
        </Link>
        <Link
          href="/dashboard"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 28px",
            background: "transparent",
            border: "1px solid rgba(0,229,255,0.3)",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "600",
            color: "var(--color-accent)",
            textDecoration: "none",
          }}
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
