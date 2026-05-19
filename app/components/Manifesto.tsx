"use client";
import { motion } from "motion/react";

const lines = [
  "No diseñamos marcas.",
  "Forjamos legados.",
];

export default function Manifesto() {
  return (
    <section
      id="filosofia"
      className="relative bg-charcoal text-cream py-40 md:py-56 px-4 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Background radial orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-terracotta/[0.06] blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-muted-gold/[0.04] blur-[150px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="eyebrow-light mb-16 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium border border-cream/10 bg-cream/5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
          Nuestra Filosofía
        </motion.div>

        <div className="max-w-5xl">
          {lines.map((line, i) => (
            <motion.h2
              key={i}
              initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: i * 0.2, ease: [0.32, 0.72, 0, 1] }}
              className={`font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[1.1] mb-4 ${
                i === 1 ? "text-terracotta italic font-light" : "font-semibold"
              }`}
            >
              {line}
            </motion.h2>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="text-cream/40 text-lg md:text-xl max-w-2xl mt-16 leading-relaxed font-light"
        >
          Cada proyecto es un ejercicio de precisión. Reducimos hasta encontrar
          la esencia — donde la forma y la función convergen en su expresión
          más pura y potente.
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="mt-20 h-px bg-gradient-to-r from-terracotta/40 via-cream/10 to-transparent origin-left"
        />
      </div>
    </section>
  );
}
