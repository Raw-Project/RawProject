"use client";
import { motion } from "motion/react";

const LOGO_WHITE = "/logo-white.png";

const footerLinks = {
  estudio: [
    { label: "Trabajo", href: "#proyectos" },
    { label: "Servicios", href: "#servicios" },
    { label: "Filosofía", href: "#filosofia" },
  ],
  social: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Behance", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-charcoal text-cream">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-terracotta/40 to-transparent" />

      <div className="px-4 md:px-12 lg:px-20 max-w-[1400px] mx-auto pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20"
        >
          {/* Brand */}
          <div className="md:col-span-5">
            <img
              src={LOGO_WHITE}
              alt="RAW"
              className="h-16 mb-6 opacity-70"
            />
            <p className="text-cream/40 text-sm font-light max-w-xs mb-8 leading-relaxed">
              Diseño de élite. Reducción hacia la esencia. Donde la
              creatividad estratégica encuentra la ejecución impecable.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="text-[10px] font-semibold text-cream/30 uppercase tracking-[0.25em] mb-6">
              Estudio
            </h4>
            <div className="flex flex-col gap-4">
              {footerLinks.estudio.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-cream/50 font-light hover:text-cream transition-colors duration-500"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-semibold text-cream/30 uppercase tracking-[0.25em] mb-6">
              Social
            </h4>
            <div className="flex flex-col gap-4">
              {footerLinks.social.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-cream/50 font-light hover:text-cream transition-colors duration-500 flex items-center gap-2 group w-max"
                >
                  {link.label}
                  <span className="opacity-0 -translate-x-2 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-semibold text-cream/30 uppercase tracking-[0.25em] mb-6">
              Contacto
            </h4>
            <a href="mailto:hola@raw.studio" className="text-sm text-cream/50 font-light hover:text-cream transition-colors duration-500 block mb-2">
              hola@raw.studio
            </a>
            <p className="text-sm text-cream/30 font-light">
              Ciudad de México, MX
            </p>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-cream/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-cream/25 uppercase tracking-[0.2em] font-medium">
            © 2024 RAW Consultancy. Precision in execution.
          </p>
          <p className="text-[10px] text-cream/25 uppercase tracking-[0.2em] font-medium">
            Crafted with obsessive attention to detail
          </p>
        </div>
      </div>
    </footer>
  );
}
