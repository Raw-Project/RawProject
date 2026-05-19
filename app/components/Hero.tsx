"use client";
import { motion } from "motion/react";

const words = ["Creatividad", "que", "Forja", "Legados"];

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center px-4 md:px-12 lg:px-20 max-w-[1400px] mx-auto pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-gradient-to-br from-terracotta/8 via-muted-gold/5 to-transparent blur-[120px] pointer-events-none animate-float" />
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-terracotta/5 to-transparent blur-[100px] pointer-events-none animate-pulse-slow" />

      <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left: Typography */}
        <div className="lg:col-span-7 xl:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="eyebrow mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
            Consultoría de Élite
          </motion.div>

          <h1 className="mb-8">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.4 + i * 0.12, ease: [0.32, 0.72, 0, 1] }}
                className={`inline-block mr-[0.3em] font-display tracking-tight leading-[1.05] ${
                  word === "Legados"
                    ? "text-terracotta italic font-light"
                    : "text-charcoal font-semibold"
                } text-[clamp(3rem,8vw,7rem)]`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: [0.32, 0.72, 0, 1] }}
            className="text-warm-gray text-lg md:text-xl max-w-xl leading-relaxed mb-12 font-light"
          >
            Elevamos marcas a través de dirección de arte meticulosa, estrategia
            de alto impacto e identidades visuales que trascienden lo ordinario.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <a
              href="#proyectos"
              className="magnetic-btn group rounded-full bg-charcoal text-cream px-8 py-4 flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] font-semibold"
            >
              <span>Explorar Proyectos</span>
              <span className="w-8 h-8 rounded-full bg-cream/10 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-110">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
              </span>
            </a>
            <a
              href="#filosofia"
              className="text-charcoal/60 text-sm font-medium hover:text-charcoal transition-colors duration-500 flex items-center gap-2 group"
            >
              Descubre nuestro proceso
              <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>

        {/* Right: Abstract visual */}
        <motion.div
          className="lg:col-span-5 xl:col-span-5 hidden lg:flex items-center justify-center relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="relative w-[380px] h-[380px] xl:w-[440px] xl:h-[440px]">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-charcoal/[0.06] animate-[spin_40s_linear_infinite]" />
            {/* Inner gradient sphere */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-charcoal via-charcoal-light to-terracotta/80 shadow-[0_0_80px_-10px_rgba(196,99,74,0.3)]" />
            {/* Highlight reflection */}
            <div className="absolute inset-12 rounded-full bg-gradient-to-t from-transparent via-cream/5 to-cream/15" />
            {/* Orbiting dot */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-terracotta animate-[spin_20s_linear_infinite] origin-[50%_240px] xl:origin-[50%_270px]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
