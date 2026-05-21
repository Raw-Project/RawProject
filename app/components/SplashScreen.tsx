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

const SLOGAN_LINES = [
  { text: "NO", type: "white-huge" },
  { text: "HACEMOS SIMPLE", type: "gray" },
  { text: "MARKETING", type: "gray-space" },
  { text: "HACEMOS QUE SEA", type: "gray" },
  { text: "IMPOSIBLE", type: "white" },
  { text: "IGNORARTE", type: "accent" },
];

export default function SplashScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
      transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      className="splash-screen fixed inset-0 z-[100] bg-charcoal flex flex-col justify-between overflow-y-auto overflow-x-hidden p-8 sm:p-12 md:p-20 lg:p-24"
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

      {/* Soft radial glow — subtle and shifted left */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-terracotta/[0.05] blur-[250px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col justify-between h-full min-h-[75vh] md:min-h-[80vh] items-start text-left pl-2 sm:pl-6 md:pl-12">
        {/* Top: Asymmetric Slogan biased to the left */}
        <div className="flex flex-col text-left font-montserrat font-black tracking-tight select-none pt-4 max-w-3xl">
          {SLOGAN_LINES.map((line, idx) => {
            let styleClass = "";
            if (line.type === "white-huge") {
              styleClass = "text-cream text-[clamp(3.5rem,9vw,8rem)] font-black leading-none mb-1 md:mb-2";
            } else if (line.type === "gray") {
              styleClass = "text-cream/30 text-[clamp(2.2rem,5.5vw,5rem)] font-black leading-[0.9]";
            } else if (line.type === "gray-space") {
              styleClass = "text-cream/30 text-[clamp(2.2rem,5.5vw,5rem)] font-black leading-[0.9] mb-4 md:mb-6";
            } else if (line.type === "white") {
              styleClass = "text-cream text-[clamp(2.2rem,5.5vw,5rem)] font-black leading-[0.9]";
            } else if (line.type === "accent") {
              styleClass = "text-terracotta text-[clamp(2.2rem,5.5vw,5rem)] font-black leading-[0.9]";
            }

            return (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.8,
                  delay: 0.1 + idx * 0.1,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className={styleClass}
              >
                {line.text}
              </motion.span>
            );
          })}
        </div>

        {/* Bottom: Button */}
        <div className="relative flex flex-col items-start mt-12 md:mt-16">
          <motion.button
            onClick={onEnter}
            className="splash-reveal splash-action magnetic-btn group relative rounded-full bg-cream text-charcoal px-4 py-2.5 md:px-6 md:py-3.5 flex items-center gap-2 md:gap-3 text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-semibold font-body"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Entrar a la Experiencia</span>
            <span className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-charcoal/10 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-110">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5 md:w-3 md:h-3">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
