"use client";
import { useEffect, useRef, useCallback } from "react";
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

/* ── Drift particles ──
   A constellation of tiny luminous particles that
   gently drift downward from the center, like stardust
   settling — a natural, symmetrical cue to scroll. */
const DRIFT_PARTICLES = Array.from({ length: 28 }, (_, i) => {
  const spread = (seededRandom(i + 500) - 0.5) * 120;   // px from center
  const size = seededRandom(i + 600) * 2.5 + 1;          // 1–3.5px
  const delay = seededRandom(i + 700) * 4;                // 0–4s
  const duration = seededRandom(i + 800) * 3 + 3;         // 3–6s
  const drift = seededRandom(i + 900) * 50 + 40;          // 40–90px travel
  const opacity = seededRandom(i + 1000) * 0.5 + 0.15;    // 0.15–0.65
  return { id: i, spread, size, delay, duration, drift, opacity };
});

export default function SplashScreen({ onEnter }: { onEnter: () => void }) {
  const hasTriggered = useRef(false);

  const handleScroll = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;
    onEnter();
  }, [onEnter]);

  /* Desktop: listen for wheel/touch-scroll to enter */
  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) handleScroll();
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (delta > 30) handleScroll();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [handleScroll]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
      transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      className="splash-screen fixed inset-0 z-[100] bg-charcoal flex flex-col justify-center items-center overflow-hidden p-8 sm:p-12 md:p-20 lg:p-24"
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

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-start text-left pl-2 sm:pl-6 md:pl-12 gap-8">
        {/* Slogan */}
        <div className="w-full flex flex-col text-left font-montserrat font-black tracking-tight select-none max-w-3xl">
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

        {/* Mobile-only button */}
        <div className="flex md:hidden items-start mt-4">
          <motion.button
            onClick={onEnter}
            className="splash-reveal splash-action magnetic-btn group relative rounded-full bg-cream text-charcoal px-4 py-2.5 flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-semibold font-body"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>DESCUBRE CÓMO</span>
            <span className="w-6 h-6 rounded-full bg-charcoal/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </span>
          </motion.button>
        </div>
      </div>

      {/* ── Desktop scroll indicator: stardust drift ── */}
      <motion.div
        className="hidden md:flex absolute bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-3 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.2 }}
      >
        {/* Drifting particles — symmetrically centered */}
        <div className="relative w-[200px] h-[100px]">
          {DRIFT_PARTICLES.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-cream"
              style={{
                left: `calc(50% + ${p.spread}px)`,
                top: 0,
                width: `${p.size}px`,
                height: `${p.size}px`,
                opacity: 0,
                animation: `drift-down ${p.duration}s ease-in-out ${p.delay}s infinite`,
                ["--drift-distance" as string]: `${p.drift}px`,
                ["--drift-opacity" as string]: p.opacity,
              }}
            />
          ))}
        </div>

        {/* Subtle pulsing glow beneath the particles */}
        <div
          className="w-24 h-[2px] rounded-full bg-cream/20"
          style={{
            animation: "scroll-pulse 2.5s ease-in-out infinite",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
