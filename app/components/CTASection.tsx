"use client";
import { motion } from "motion/react";

export default function CTASection() {
  return (
    <section id="contacto" className="relative bg-terracotta text-cream py-40 md:py-56 px-4 md:px-12 lg:px-20 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-16 right-16 w-32 h-32 rounded-full border border-cream/10 pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-24 left-12 w-20 h-20 rounded-full border border-cream/[0.08] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-cream/[0.04] blur-[100px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium border border-cream/15 bg-cream/5 mb-12"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cream" />
          Próximo Paso
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.05] mb-8 max-w-4xl"
        >
          ¿Listo para lo{" "}
          <span className="italic font-light">extraordinario</span>?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="text-cream/60 text-lg md:text-xl max-w-2xl mb-14 leading-relaxed font-light"
        >
          Estamos selectivamente aceptando nuevos clientes para el próximo
          trimestre. Si buscas precisión y excelencia estética, conversemos.
        </motion.p>

        <motion.a
          href="mailto:hola@raw.studio"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.32, 0.72, 0, 1] }}
          className="magnetic-btn group rounded-full bg-cream text-charcoal px-10 py-5 flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] font-semibold"
        >
          <span>Hablemos</span>
          <span className="w-9 h-9 rounded-full bg-charcoal/10 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-110">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
          </span>
        </motion.a>
      </div>
    </section>
  );
}
