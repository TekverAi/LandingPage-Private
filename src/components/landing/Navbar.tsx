/* LANDING PAGE COMPONENT */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Platform", href: "/#platform" },
  { label: "Workflow", href: "/#workflow" },
  { label: "Demo", href: "/#live-review" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);

    // Intersection Observer for Active Section
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ["platform", "workflow", "live-review", "pricing", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        className={`fixed left-0 right-0 z-1000 flex justify-center transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? "top-4 px-0 md:px-6" : "top-0 px-0"
          }`}
      >
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`flex w-[calc(100%-2rem)] items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled
            ? "max-w-[1320px] bg-[rgba(2,6,23,0.8)] backdrop-blur-md border border-white/8 rounded-[40px] h-[56px] md:h-[60px] px-6 md:px-8"
            : "max-w-full bg-transparent border-transparent rounded-none h-[72px] md:h-[80px] px-6 md:px-8"
            }`}
        >
          <div className="flex w-full max-w-[1400px] items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center gap-2 md:gap-2.5 no-underline">
              
              <img src="/LogoNew.png" alt="Logo" className="w-auto h-8 object-center object-cover" />
           
            </Link>

            {/* Desktop Nav - Middle */}
            <AnimatePresence>
              {scrolled && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="hidden items-center gap-1 md:gap-1.5 rounded-[30px] border border-white/5 bg-white/3 p-1 md:flex"
                >
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href.replace("/#", "");
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        className={`rounded-[20px] px-3 md:px-3.5 py-1.5 md:py-2 text-xs md:text-[13px] no-underline transition-all duration-200 ${isActive
                          ? "bg-[rgba(34,211,238,0.1)] font-[600] text-[var(--color-text-primary)]"
                          : "font-[500] text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white"
                          }`}
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA Buttons */}
            <div className="flex shrink-0 items-center gap-3">
              <AnimatePresence>
                {scrolled && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a
                      href="https://app.tekverai.com/"
                      className="btn-primary hidden md:flex items-center gap-2 rounded-[30px] px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-[13px]"
                      target="_blank"
                    >
                      Start Verification
                      <ChevronRight size={14} className="shrink-0" />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile Menu Button icons */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-1 text-[var(--color-text-primary)] md:hidden"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed left-4 right-4 md:left-6 md:right-6 z-[999] flex flex-col gap-1 rounded-2xl md:rounded-[20px] border border-[var(--color-border-subtle)] bg-[rgba(11,15,25,0.98)] p-4 md:p-5 backdrop-blur-[20px] ${scrolled ? "top-[75px] md:top-[85px]" : "top-[72px] md:top-[80px]"
              }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 md:py-3.5 text-sm md:text-[15px] font-[500] text-[var(--color-text-secondary)] no-underline transition-all duration-200 hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
