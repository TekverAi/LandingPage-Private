/* LANDING PAGE COMPONENT */
"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import { useState, useRef } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

const TURNSTILE_TEST_SITEKEY = "1x00000000000000000000AA";
const TURNSTILE_TEMP_DISABLED = false;

export default function GetInTouch() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const configuredTurnstileSiteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_SITEKEY?.trim();
  const turnstileSiteKey = configuredTurnstileSiteKey || (process.env.NODE_ENV !== "production" ? TURNSTILE_TEST_SITEKEY : "");
  const turnstileEnabled = !TURNSTILE_TEMP_DISABLED && Boolean(turnstileSiteKey);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (turnstileEnabled && !turnstileToken) {
      alert("Please complete the security check.");
      return;
    }
    setStatus("submitting");

    const endpoint =
      process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

    if (!endpoint) {
      console.error("Formspree endpoint not found");
      setStatus("error");
      return;
    }

    const payload: Record<string, string> = {
      ...form,
      _subject: "New TekverAI Contact Form Submission",
      source: "tekverai-contact-form",
    };

    if (turnstileEnabled && turnstileToken) {
      payload["cf-turnstile-response"] = turnstileToken;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get("content-type") || "";
      const responseData = contentType.includes("application/json") ? await response.json() : null;

      const hasResponseErrors =
        !!responseData &&
        typeof responseData === "object" &&
        "errors" in responseData &&
        Array.isArray((responseData as { errors?: unknown[] }).errors) &&
        ((responseData as { errors?: unknown[] }).errors?.length ?? 0) > 0;

      if (!response.ok || hasResponseErrors) {
        console.error("Contact form submission failed", {
          status: response.status,
          responseData,
        });
        setStatus("error");
        if (turnstileEnabled) {
          setTurnstileToken(null);
          turnstileRef.current?.reset();
        }
        setTimeout(() => setStatus("idle"), 5000);
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", company: "", message: "" });
      if (turnstileEnabled) {
        setTurnstileToken(null);
        turnstileRef.current?.reset();
      }
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
      if (turnstileEnabled) {
        setTurnstileToken(null);
        turnstileRef.current?.reset();
      }
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: "11px 14px",
    color: "white",
    fontSize: 13,
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const CONTACT_INFO = [
    { icon: Mail, label: "Email", value: "connect@tekverai.com" },
    { icon: Phone, label: "Phone", value: "+12246589300" },
    { icon: MapPin, label: "Location", value: "28 Geary St, Suite 650, San Francisco, CA 94108, United States" },
  ];

  const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=28+Geary+St%2C+Suite+650%2C+San+Francisco%2C+CA+94108%2C+United+States";

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(6,20,52,0.8), transparent), #020617" }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(34,211,238,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="relative mx-auto px-4 md:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label">GET IN TOUCH</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight flex flex-col items-center">
            <span>Ready to secure</span>
            <span className="text-cyan-400 uppercase tracking-wider">your codebase</span>
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed opacity-80">
            Have a question or want to learn more? Our team of security experts is here to help you secure your modern codebase.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── Left: Contact form ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="rounded-2xl p-4 md:p-7"
            style={{
              background: "linear-gradient(145deg, rgba(10,22,50,0.97), rgba(4,12,32,0.99))",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03), 0 20px 50px rgba(0,0,0,0.45)",
              backdropFilter: "blur(12px)",
            }}
          >
            <h3 className="text-[16px] font-bold text-white mb-5">Send us a message</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text" placeholder="Your name" value={form.name} required
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(34,211,238,0.4)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                />
                <input
                  type="email" placeholder="you@company.com" value={form.email} required
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(34,211,238,0.4)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                />
              </div>

              {/* Company */}
              <input
                type="text" placeholder="Company name" value={form.company}
                onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "rgba(34,211,238,0.4)")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
              />

              {/* Message */}
              <textarea
                placeholder="How can we help?" value={form.message} required rows={5}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{ ...inputStyle, resize: "vertical", minHeight: 110 }}
                onFocus={e => (e.currentTarget.style.borderColor = "rgba(34,211,238,0.4)")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
              />

              {/* Turnstile */}
              <div className="my-2 flex justify-center">
                {turnstileEnabled ? (
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={turnstileSiteKey}
                    onSuccess={(token) => setTurnstileToken(token)}
                    onExpire={() => setTurnstileToken(null)}
                    onError={() => setTurnstileToken(null)}
                    options={{ theme: "dark", size: "normal" }}
                  />
                ) : (
                  <p className="text-[11px] text-slate-500 text-center">
                    Security check is not configured in this environment.
                  </p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === "submitting"}
                whileHover={status === "idle" ? { scale: 1.02, boxShadow: "0 0 24px rgba(34,211,238,0.4)" } : {}}
                whileTap={status === "idle" ? { scale: 0.97 } : {}}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[13.5px] font-bold cursor-pointer mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
                style={
                  status === "success"
                    ? { background: "rgba(52,211,153,0.15)", color: "#34d399", border: "1px solid rgba(52,211,153,0.35)" }
                    : status === "error"
                    ? { background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.35)" }
                    : { background: "linear-gradient(135deg,#22d3ee,#06b6d4)", color: "#020617", border: "none" }
                }
              >
                {status === "submitting" ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full"
                  />
                ) : status === "success" ? (
                  <Check size={14} strokeWidth={2.5} />
                ) : status === "error" ? (
                  <Mail size={14} strokeWidth={2.5} />
                ) : (
                  <Send size={14} strokeWidth={2.5} />
                )}
                
                {status === "submitting" 
                  ? "Sending..." 
                  : status === "success" 
                  ? "Message Sent!" 
                  : status === "error" 
                  ? "Error! Try Again" 
                  : "Send Message"}
              </motion.button>
            </form>
          </motion.div>

          {/* ── Right: Contact info + map ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* Contact info card */}
            <div
              className="rounded-2xl p-4 md:p-7"
              style={{
                background: "linear-gradient(145deg, rgba(10,22,50,0.97), rgba(4,12,32,0.99))",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03), 0 16px 40px rgba(0,0,0,0.4)",
                backdropFilter: "blur(12px)",
              }}
            >
              <h3 className="text-[16px] font-bold text-white mb-5">Contact Information</h3>
              <div className="flex flex-col gap-4">
                {CONTACT_INFO.map(({ icon: Icon, label, value }) => {
                  const href =
                    label === "Email"
                      ? `https://mail.google.com/mail/?view=cm&to=${value}`
                      : label === "Phone"
                      ? `tel:${value}`
                      : MAP_LINK;
                  const isExternal = label === "Email" || label === "Location";

                  return (
                    <a
                      key={label}
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="flex items-start gap-3 rounded-xl p-2 -m-2 transition-colors hover:bg-white/[0.03] group/contact"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center rounded-lg mt-0.5 transition-colors group-hover/contact:bg-cyan-400/20"
                        style={{ width: 34, height: 34, background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)" }}>
                        <Icon size={15} strokeWidth={1.8} className="text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-0.5">{label}</p>
                        <p className="text-[13.5px] text-slate-200 font-medium leading-snug transition-colors group-hover/contact:text-cyan-400">
                          {value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Map embed — OpenStreetMap (no API key, CSP safe) */}
            <div className="rounded-2xl overflow-hidden flex-1"
              style={{ border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 16px 40px rgba(0,0,0,0.4)", minHeight: 210 }}>
              <iframe
                title="TekverAI Office Location"
                src="https://maps.google.com/maps?q=28%20Geary%20St%2C%20Suite%20650%2C%20San%20Francisco%2C%20CA%2094108%2C%20United%20States&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="210"
                style={{ display: "block", border: 0 }}
                loading="lazy"
              />
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2 text-[12px] text-cyan-400 hover:text-cyan-300 transition-colors"
                style={{ background: "rgba(2,6,23,0.85)", borderTop: "1px solid rgba(255,255,255,0.07)" }}
              >
                Open in Maps
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
