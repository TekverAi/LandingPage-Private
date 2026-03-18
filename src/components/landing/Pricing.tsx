/* LANDING PAGE COMPONENT */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Zap, Building2, Sparkles, Check } from "lucide-react";
import { useState } from "react";

/* ─── Data ───────────────────────────────────────────────────────────────── */
const PLANS = [
  {
    icon: Zap,
    name: "Starter",
    tagline: "For individuals & small teams",
    color: "#94a3b8",
    glowColor: "rgba(148,163,184,0.08)",
    monthly: 39,
    yearly: 31,
    badge: null,
    features: [
      "Up to 3 Git repositories",
      "500 files per scan",
      "Vulnerability scanning",
      "Basic PDF reports",
      "Community support",
    ],
    cta: "Get Started",
    ctaFilled: false,
    monthlyLink: "https://buy.stripe.com/test_5kQ8wQcZm8Bn4YocOl0oM05",
    yearlyLink: "https://buy.stripe.com/test_9B63cw9NabNz1McaGd0oM02",
  },
  {
    icon: Sparkles,
    name: "Pro",
    tagline: "For fast-growing engineering teams",
    color: "#22d3ee",
    glowColor: "rgba(34,211,238,0.1)",
    monthly: 89,
    yearly: 71,
    badge: "Recommended",
    features: [
      "Everything in Starter",
      "25 Git repositories",
      "Unlimited scans",
      "REST API & webhook access",
      "CI/CD pipeline integration",
      "Priority email support",
    ],
    cta: "Start Pro Trial",
    ctaFilled: true,
    monthlyLink: "https://buy.stripe.com/test_00w5kEbViaJveyYbKh0oM04",
    yearlyLink: "https://buy.stripe.com/test_14AfZi8J65pbgH6cOl0oM01",
  },
  {
    icon: Building2,
    name: "Enterprise",
    tagline: "For security-first organizations",
    color: "#818cf8",
    glowColor: "rgba(129,140,248,0.08)",
    monthly: 138,
    yearly: 110,
    badge: null,
    features: [
      "Everything in Pro",
      "Unlimited repositories",
      "SSO / SAML & RBAC",
      "Custom SLAs",
      "SOC 2 & ISO 27001 reports",
      "Dedicated success manager",
    ],
    cta: "Contact Sales",
    ctaFilled: false,
    monthlyLink: "https://buy.stripe.com/test_cNi28sgby3h3duU01z0oM03",
    yearlyLink: "https://buy.stripe.com/test_5kQbJ25wUdVH76wg0x0oM00",
  },
] as const;

/* ─── Corner bracket border ──────────────────────────────────────────────── */
function CornerBrackets({ color, featured }: { color: string; featured: boolean }) {
  const arm = 16; // Reduced from 22 for better mobile display
  const thickness = featured ? 2 : 1.5;
  const alpha = featured ? "cc" : "66";
  const edgeAlpha = featured ? "44" : "1a";
  const c = color + alpha;
  const e = color + edgeAlpha;

  const corner = (pos: React.CSSProperties) => (
    <div style={{ position: "absolute", width: arm, height: arm, ...pos }} />
  );

  return (
    <>
      {/* TL */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: arm, height: arm,
        borderTop: `${thickness}px solid ${c}`, borderLeft: `${thickness}px solid ${c}`,
        borderTopLeftRadius: 5, pointerEvents: "none"
      }} />
      {/* TR */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: arm, height: arm,
        borderTop: `${thickness}px solid ${c}`, borderRight: `${thickness}px solid ${c}`,
        borderTopRightRadius: 5, pointerEvents: "none"
      }} />
      {/* BL */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, width: arm, height: arm,
        borderBottom: `${thickness}px solid ${c}`, borderLeft: `${thickness}px solid ${c}`,
        borderBottomLeftRadius: 5, pointerEvents: "none"
      }} />
      {/* BR */}
      <div style={{
        position: "absolute", bottom: 0, right: 0, width: arm, height: arm,
        borderBottom: `${thickness}px solid ${c}`, borderRight: `${thickness}px solid ${c}`,
        borderBottomRightRadius: 5, pointerEvents: "none"
      }} />
      {/* Top edge line */}
      <div style={{
        position: "absolute", top: 0, left: arm, right: arm, height: thickness,
        background: `linear-gradient(90deg, ${e}, ${color}33, ${e})`,
        pointerEvents: "none"
      }} />
      {/* Bottom edge line */}
      <div style={{
        position: "absolute", bottom: 0, left: arm, right: arm, height: thickness,
        background: `linear-gradient(90deg, ${e}, ${color}33, ${e})`,
        pointerEvents: "none"
      }} />
    </>
  );
}

/* ─── Billing toggle ─────────────────────────────────────────────────────── */
function BillingToggle({ yearly, setYearly }: { yearly: boolean; setYearly: (v: boolean) => void }) {
  return (
    <div className="inline-flex items-center gap-2 md:gap-3 rounded-full px-3 md:px-5 py-2 md:py-2.5"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <button onClick={() => setYearly(false)}
        className="text-xs md:text-sm font-semibold transition-colors duration-200 cursor-pointer"
        style={{ color: yearly ? "rgba(255,255,255,0.35)" : "white" }}>
        Monthly
      </button>

      <button onClick={() => setYearly(!yearly)}
        className="relative rounded-full transition-colors duration-200 cursor-pointer"
        style={{
          width: 40, height: 22,
          background: yearly ? "rgba(34,211,238,0.25)" : "rgba(255,255,255,0.1)",
          border: `1px solid ${yearly ? "rgba(34,211,238,0.5)" : "rgba(255,255,255,0.12)"}`
        }}>
        <motion.div className="absolute top-[2px] rounded-full"
          animate={{ left: yearly ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            width: 16, height: 16,
            background: yearly ? "linear-gradient(135deg,#22d3ee,#06b6d4)" : "rgba(255,255,255,0.6)",
            boxShadow: yearly ? "0 0 10px rgba(34,211,238,0.6)" : "none"
          }} />
      </button>

      <button onClick={() => setYearly(true)}
        className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-semibold transition-colors duration-200 cursor-pointer"
        style={{ color: yearly ? "white" : "rgba(255,255,255,0.35)" }}>
        Yearly
        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{ background: "rgba(34,211,238,0.12)", border: "1px solid rgba(34,211,238,0.3)", color: "#22d3ee" }}>
          Save 20%
        </span>
      </button>
    </div>
  );
}

/* ─── Pricing card ───────────────────────────────────────────────────────── */
function PricingCard({ plan, yearly, index }: {
  plan: typeof PLANS[number]; yearly: boolean; index: number;
}) {
  const Icon = plan.icon;
  const price = yearly ? plan.yearly : plan.monthly;
  const period = "mo";
  const isFeatured = !!plan.badge;
  const yearlySaving = (plan.monthly - plan.yearly) * 12;
  const checkoutLink = yearly ? plan.yearlyLink : plan.monthlyLink;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: isFeatured ? -14 : 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: isFeatured ? -18 : -4, transition: { duration: 0.25 } }}
      className="group relative flex flex-col rounded-2xl overflow-hidden md:p-8"
      style={{
        background: isFeatured
          ? "linear-gradient(145deg, rgba(14,36,76,0.98) 0%, rgba(5,18,46,0.99) 100%)"
          : "linear-gradient(145deg, rgba(10,20,46,0.96) 0%, rgba(4,10,28,0.98) 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: isFeatured
          ? "0 0 0 1px rgba(34,211,238,0.08), inset 0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px rgba(0,0,0,0.55), 0 0 80px rgba(34,211,238,0.06)"
          : "inset 0 0 0 1px rgba(255,255,255,0.03), 0 20px 50px rgba(0,0,0,0.45)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        padding: "1.5rem",
        minHeight: "auto",
      }}
    >
      {/* Corner brackets */}
      <CornerBrackets color={plan.color} featured={isFeatured} />

      {/* Glass inner highlight edge */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
      }} />

      {/* Ambient glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${plan.glowColor}, transparent)` }} />

      {/* Featured inner top glow line */}
      {isFeatured && (
        <motion.div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg,transparent,rgba(34,211,238,0.6),transparent)" }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
      )}

      {/* ── Plan header ── */}
      <div className="relative flex flex-col gap-2 sm:gap-3 lg:flex-row lg:items-start lg:justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2 md:gap-3">
          {/* Icon */}
          <motion.div
            className="flex items-center justify-center rounded-xl flex-shrink-0"
            style={{
              width: 40, height: 40,
              background: `linear-gradient(135deg, ${plan.color}20, ${plan.color}08)`,
              border: `1.5px solid ${plan.color}35`
            }}
            animate={isFeatured ? { boxShadow: [`0 0 10px ${plan.color}20`, `0 0 20px ${plan.color}40`, `0 0 10px ${plan.color}20`] } : {}}
            transition={{ duration: 2.5, repeat: Infinity }}>
            <Icon size={18} strokeWidth={1.6} className="md:w-5 md:h-5" style={{
              color: plan.color,
              filter: `drop-shadow(0 0 4px ${plan.color}80)`
            }} />
          </motion.div>
          <div>
            <p className="text-sm md:text-base font-bold leading-tight" style={{ color: plan.color }}>
              {plan.name}
            </p>
            <p className="text-[10px] md:text-[11.5px] text-slate-500 mt-0.5 leading-snug max-w-[140px]">
              {plan.tagline}
            </p>
          </div>
        </div>
        {/* Badge */}
        {plan.badge && (
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="self-start lg:self-auto text-[9px] font-bold uppercase tracking-[0.16em] px-3 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg,rgba(34,211,238,0.18),rgba(6,182,212,0.08))",
              border: "1px solid rgba(34,211,238,0.4)", color: "#22d3ee",
              boxShadow: "0 0 12px rgba(34,211,238,0.2)"
            }}>
            <Sparkles size={10} className="text-cyan-400" />
            <span className="leading-none">{plan.badge}</span>
          </motion.div>
        )}
      </div>

      {/* ── Divider ── */}
      <div className="mb-4 md:mb-5" style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />

      {/* ── Price ── */}
      <div className="relative mb-1">
        <div className="flex items-start gap-0.5 md:gap-1">
          <span className="text-sm md:text-base font-semibold text-slate-400 mt-1.5 md:mt-2">$</span>
          <AnimatePresence mode="wait">
            <motion.span key={price}
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.22 }}
              className="text-4xl md:text-5xl lg:text-[56px] font-black text-white leading-none tracking-tighter"
              style={{ fontVariantNumeric: "tabular-nums" }}>
              {price}
            </motion.span>
          </AnimatePresence>
          <span className="text-xs md:text-[13px] text-slate-500 mt-auto mb-1.5 md:mb-2 ml-0.5">/{period}</span>
        </div>
      </div>

      {/* Yearly saving note */}
      <div className="h-4 md:h-5 mb-4 md:mb-5">
        <AnimatePresence>
          {yearly && plan.monthly > 0 && (
            <motion.p key="saving"
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
              className="text-[11px] text-slate-500">
              Billed annually -{" "}
              <span style={{ color: plan.color }} className="font-semibold">
                save ${yearlySaving}/yr
              </span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ── Features ── */}
      <div className="relative flex flex-col gap-2 md:gap-3 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600 mb-1">
          {index === 0 ? "Includes:" : index === 1 ? "Everything in Starter, Plus:" : "Everything in Pro, Plus:"}
        </p>
        {plan.features.map((feat, j) => (
          <div key={j} className="flex items-center gap-2.5">
            <div className="flex-shrink-0 flex items-center justify-center rounded-full"
              style={{
                width: 18, height: 18,
                background: `${plan.color}15`, border: `1px solid ${plan.color}30`
              }}>
              <Check size={10} strokeWidth={3} style={{ color: plan.color }} />
            </div>
            <span className="text-xs md:text-[13px] text-slate-300 leading-snug">
              {j === 0 && index > 0
                ? <span className="text-slate-500">{feat}</span>
                : feat}
            </span>
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      <motion.a
        href={checkoutLink}
        target="_blank"
        rel="noopener noreferrer"
        className="relative mt-6 md:mt-8 w-full py-3 md:py-3.5 rounded-xl text-xs md:text-[13.5px] font-bold tracking-wide overflow-hidden cursor-pointer flex items-center justify-center no-underline"
        whileHover={plan.ctaFilled
          ? { scale: 1.02, boxShadow: "0 0 32px rgba(34,211,238,0.5)" }
          : { scale: 1.02, background: `${plan.color}22`, borderColor: plan.color }
        }
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.18 }}
        style={plan.ctaFilled
          ? {
            background: "linear-gradient(135deg,#22d3ee,#06b6d4)", color: "#020617",
            boxShadow: "0 0 24px rgba(34,211,238,0.35)"
          }
          : {
            background: `${plan.color}0d`, color: plan.color,
            border: `1.5px solid ${plan.color}35`, cursor: "pointer"
          }}>
        {/* Shimmer on featured */}
        {plan.ctaFilled && (
          <motion.div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.25) 50%,transparent 60%)" }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }} />
        )}
        <span className="relative">{plan.cta}</span>
      </motion.a>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="relative py-16 md:py-20 lg:py-24 xl:py-32 overflow-hidden"
      style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,20,50,0.85), transparent), #020617" }}>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(34,211,238,0.05) 1px,transparent 1px)",
          backgroundSize: "28px 28px"
        }} />

      {/* ── Glowing sphere — TOP-LEFT of section ── */}
      {/* Outer soft glow ring */}
      <div className="absolute pointer-events-none" style={{
        top: -200, left: -200,
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)",
        filter: "blur(40px)",
      }} />
      {/* Main vivid orb — center AT corner */}
      <div className="absolute pointer-events-none" style={{
        top: -120, left: -120,
        width: 350, height: 350, borderRadius: "50%",
        background: "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.7) 0%, rgba(34,211,238,0.4) 30%, rgba(34,211,238,0.1) 60%, transparent 80%)",
        boxShadow: "0 0 60px 20px rgba(34,211,238,0.15)",
        filter: "blur(20px)",
      }}>
        {/* Lens highlight */}
        <div style={{
          position: "absolute", top: "40%", left: "40%", width: 60, height: 60,
          borderRadius: "50%", filter: "blur(8px)",
          background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 80%)"
        }} />
      </div>

      {/* ── Glowing sphere — BOTTOM-RIGHT of section ── */}
      {/* Outer soft glow ring */}
      <div className="absolute pointer-events-none" style={{
        bottom: -200, right: -200,
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%)",
        filter: "blur(40px)",
      }} />
      {/* Main vivid orb — center AT corner */}
      <div className="absolute pointer-events-none" style={{
        bottom: -120, right: -120,
        width: 350, height: 350, borderRadius: "50%",
        background: "radial-gradient(circle at 50% 50%, rgba(129,140,248,0.6) 0%, rgba(129,140,248,0.3) 30%, rgba(129,140,248,0.08) 60%, transparent 80%)",
        boxShadow: "0 0 60px 20px rgba(129,140,248,0.15)",
        filter: "blur(20px)",
      }}>
        {/* Lens highlight */}
        <div style={{
          position: "absolute", top: "40%", left: "40%", width: 50, height: 50,
          borderRadius: "50%", filter: "blur(8px)",
          background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 80%)"
        }} />
      </div>

      <div className="container relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16">
          <div className="section-label">PRICING PLANS</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight">
            The perfect plan for <br />
            <span className="text-cyan-400 uppercase tracking-wider">your team&apos;s needs</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed opacity-80 mb-8 md:mb-10">
            Transparent pricing with no hidden fees, pick the plan that fits your team&apos;s scale and security requirements.
          </p>
          <BillingToggle yearly={yearly} setYearly={setYearly} />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-start">
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} yearly={yearly} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
