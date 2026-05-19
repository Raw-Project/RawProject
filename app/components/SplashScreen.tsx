"use client";
import { useMemo } from "react";
import { motion } from "motion/react";

export default function SplashScreen({ onEnter }: { onEnter: () => void }) {
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
        maxOpacity: Math.random() * 0.7 + 0.15,
      })),
    []
  );

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
      transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      className="fixed inset-0 z-[100] bg-charcoal flex flex-col items-center justify-center p-4 overflow-hidden"
    >
      {/* Star field */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-cream"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: 0,
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
              animationFillMode: "both",
              filter: `opacity(${star.maxOpacity})`,
            }}
          />
        ))}
      </div>

      {/* Soft radial glow — very subtle, no visible shape */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-terracotta/[0.05] blur-[250px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
        className="relative text-center flex flex-col items-center"
      >
        <motion.img
          src="/logo-white.png"
          alt="RAW"
          className="w-[85vw] md:w-[35vw] max-w-[600px] mb-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
        />

        <motion.p
          className="text-cream/40 text-[10px] uppercase tracking-[0.3em] mb-8 -mt-16 font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Consultoría Creativa de Élite
        </motion.p>

        <motion.button
          onClick={onEnter}
          className="magnetic-btn group relative rounded-full bg-cream text-charcoal px-5 py-3 md:px-8 md:py-4 flex items-center gap-3 md:gap-4 text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold font-body"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.32, 0.72, 0, 1] }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span>Entrar a la Experiencia</span>
          <span className="w-8 h-8 rounded-full bg-charcoal/10 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-110">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
