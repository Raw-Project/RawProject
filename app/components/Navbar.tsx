"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const LOGO_BLACK = "/logo-black.png";

const NAV_LINKS = [
  { label: "Trabajo", href: "#proyectos" },
  { label: "Servicios", href: "#servicios" },
  { label: "Filosofía", href: "#filosofia" },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 50);
    setHidden(y > 200 && !menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      if (y > lastY && y > 200) setHidden(true);
      else setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-auto md:min-w-[720px] lg:min-w-[800px] rounded-full px-4 md:px-6 py-3 flex items-center justify-between transition-colors duration-500 ${
          scrolled
            ? "bg-cream/80 backdrop-blur-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)] border border-charcoal/[0.06]"
            : "bg-cream/40 backdrop-blur-xl border border-charcoal/[0.04]"
        }`}
      >
        <img
          src={LOGO_BLACK}
          alt="RAW"
          className="h-16 md:h-20 opacity-80 hover:opacity-100 transition-opacity duration-500"
        />

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] font-medium text-charcoal/60 hover:text-charcoal uppercase tracking-[0.18em] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#contacto"
            className="magnetic-btn hidden md:flex items-center gap-2.5 rounded-full bg-charcoal text-cream px-5 py-2.5 text-[10px] uppercase tracking-[0.18em] font-semibold group"
          >
            <span>Hablemos</span>
            <span className="w-6 h-6 rounded-full bg-cream/10 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-[1px] group-hover:scale-110">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
            </span>
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[6px]"
            aria-label="Menu"
          >
            <span className={`hamburger-line ${menuOpen ? "translate-y-[3.75px] rotate-45" : ""}`} />
            <span className={`hamburger-line ${menuOpen ? "-translate-y-[3.75px] -rotate-45" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 bg-charcoal/90 backdrop-blur-3xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.32, 0.72, 0, 1] }}
                  className="text-cream text-3xl font-display font-semibold tracking-tight"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contacto"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
                className="mt-8 rounded-full bg-cream text-charcoal px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold"
              >
                Hablemos
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
