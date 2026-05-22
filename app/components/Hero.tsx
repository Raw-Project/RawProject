"use client";
import { motion } from "motion/react";

const words = ["¿Quiéres", "que", "tu", "marca", "sea", "RELEVANTE?"];

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center px-4 md:px-12 lg:px-20 max-w-[1400px] mx-auto pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-gradient-to-br from-terracotta/8 via-muted-gold/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-terracotta/5 to-transparent blur-[100px] pointer-events-none" />

      <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left: Typography */}
        <div className="lg:col-span-6 xl:col-span-6">
          <h1 className="mb-8 leading-[0.88] lg:leading-[0.82] tracking-tighter">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 + i * 0.12, ease: [0.32, 0.72, 0, 1] }}
                className={`inline-block mr-[0.3em] tracking-tighter leading-[0.88] lg:leading-[0.82] ${
                  word.includes("RELEVANTE")
                    ? "text-terracotta font-black font-[family-name:var(--font-accent)]"
                    : "text-charcoal font-light font-display"
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
            <strong className="font-semibold text-charcoal">No</strong> es lo mismo <strong className="font-semibold text-charcoal">&quot;subir videitos&quot;</strong> de tu negocio a <strong className="font-semibold text-charcoal">redes sociales</strong> a una <strong className="font-semibold text-charcoal">estrategia</strong> que posicione tu <strong className="font-semibold text-charcoal">marca</strong> por <strong className="font-semibold text-charcoal">encima</strong> de los <strong className="font-semibold text-charcoal">demás</strong>.
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

        {/* Right: Premium video showcase without frame, balanced layout */}
        <motion.div
          className="lg:col-span-6 xl:col-span-6 flex items-center justify-center relative w-full mt-12 lg:mt-0 px-4 sm:px-8 lg:px-0"
          initial={{ opacity: 0, y: 50, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="relative group max-h-[50vh] sm:max-h-[55vh] lg:max-h-[65vh] w-fit mx-auto">
            <video
              src="/video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="max-h-[50vh] sm:max-h-[55vh] lg:max-h-[65vh] w-auto h-auto rounded-[2rem] shadow-[0_20px_50px_rgba(10,10,11,0.08)] object-contain transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.01]"
            />
            {/* Subtle glass reflection overlay on the video element */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-transparent via-cream/5 to-cream/10 pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
