"use client";
import Image from "next/image";
import { motion } from "motion/react";

const seededRandom = (seed: number) => {
  const value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
};

const STARS = Array.from({ length: 80 }, (_, i) => {
  const x = (seededRandom(i + 1) * 100).toFixed(4);
  const y = (seededRandom(i + 81) * 100).toFixed(4);
  const size = (seededRandom(i + 161) * 2 + 0.5).toFixed(4);
  const delay = (seededRandom(i + 241) * 4).toFixed(4);
  const duration = (seededRandom(i + 321) * 3 + 2).toFixed(4);
  const maxOpacity = (seededRandom(i + 401) * 0.7 + 0.15).toFixed(4);
  return { id: i, x, y, size, delay, duration, maxOpacity };
});

export default function SplashScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
      transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      className="splash-screen fixed inset-0 z-[100] bg-charcoal flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Star field */}
      <div className="absolute inset-0 pointer-events-none">
        {STARS.map((star) => (
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

      <div className="relative text-center flex flex-col items-center">
        <Image
          src="/logo-white.png"
          alt="RAW"
          width={658}
          height={234}
          priority
          className="splash-reveal splash-logo w-[52vw] md:w-[21vw] max-w-[366px] mb-0"
        />

        <p className="splash-reveal splash-kicker text-cream/40 text-[10px] uppercase tracking-[0.3em] mb-8 mt-6 font-body">
          Consultoría Creativa de Élite
        </p>

        <motion.button
          onClick={onEnter}
          className="splash-reveal splash-action magnetic-btn group relative rounded-full bg-cream text-charcoal px-5 py-3 md:px-8 md:py-4 flex items-center gap-3 md:gap-4 text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold font-body"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span>Entrar a la Experiencia</span>
          <span className="w-8 h-8 rounded-full bg-charcoal/10 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-110">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
