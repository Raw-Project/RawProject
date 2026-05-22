"use client";
import { type CSSProperties, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";

interface LogoTransitionProps {
  onFinish: () => void;
  duration?: number;
}

interface ShootingStar {
  id: number;
  topPct: number;
  leftPct: number;
  lengthPx: number;
  angleDeg: number;
  delay: number;
  duration: number;
  thickness: number;
}

const seeded = (seed: number) => {
  const value = Math.sin(seed * 9301 + 49297) * 233280;
  return value - Math.floor(value);
};

function buildShootingStars(): ShootingStar[] {
  const count = 6;
  return Array.from({ length: count }, (_, i) => {
    const r1 = seeded(i + 1);
    const r2 = seeded(i + 11);
    const r3 = seeded(i + 23);
    const r4 = seeded(i + 37);
    const r5 = seeded(i + 53);
    return {
      id: i,
      topPct: 5 + r1 * 55,
      leftPct: -10 + r2 * 30,
      lengthPx: 220 + Math.floor(r3 * 280),
      angleDeg: 18 + r4 * 14,
      delay: 0.15 + i * 0.32 + r5 * 0.25,
      duration: 1.1 + r3 * 0.6,
      thickness: 1.2 + r4 * 0.8,
    };
  });
}

function buildAmbientStars() {
  return Array.from({ length: 60 }, (_, i) => {
    const x = seeded(i + 101);
    const y = seeded(i + 211);
    const s = seeded(i + 311);
    const d = seeded(i + 411);
    const dur = seeded(i + 511);
    const op = seeded(i + 611);
    return {
      id: i,
      x: (x * 100).toFixed(3),
      y: (y * 100).toFixed(3),
      size: (s * 1.6 + 0.4).toFixed(3),
      delay: (d * 3).toFixed(3),
      duration: (dur * 2.5 + 1.8).toFixed(3),
      maxOpacity: (op * 0.55 + 0.12).toFixed(3),
    };
  });
}

const SHOOTING_STARS = buildShootingStars();
const AMBIENT_STARS = buildAmbientStars();

export default function LogoTransition({
  onFinish,
  duration = 2600,
}: LogoTransitionProps) {
  useEffect(() => {
    const t = window.setTimeout(onFinish, duration);
    return () => window.clearTimeout(t);
  }, [onFinish, duration]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
      className="fixed inset-0 z-[110] bg-charcoal overflow-hidden flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="absolute inset-0 pointer-events-none">
        {AMBIENT_STARS.map((star) => (
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
              "--twinkle-opacity": star.maxOpacity,
            } as CSSProperties}
          />
        ))}
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] max-w-[110vw] max-h-[110vw] rounded-full bg-terracotta/[0.06] blur-[180px] pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-cream/[0.04] blur-[120px] pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {SHOOTING_STARS.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: [0, 1, 0], x: [0, 800] }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              ease: [0.32, 0.72, 0, 1],
              times: [0, 0.25, 1],
            }}
            className="absolute"
            style={{
              top: `${s.topPct}%`,
              left: `${s.leftPct}%`,
              transform: `rotate(${s.angleDeg}deg)`,
              transformOrigin: "left center",
              willChange: "transform, opacity",
            }}
          >
            <div
              className="relative"
              style={{
                width: `${s.lengthPx}px`,
                height: `${s.thickness}px`,
              }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(253,251,247,0) 0%, rgba(253,251,247,0.15) 40%, rgba(253,251,247,0.85) 92%, rgba(253,251,247,1) 100%)",
                  filter: "blur(0.5px)",
                }}
              />
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-cream"
                style={{
                  width: `${s.thickness * 4}px`,
                  height: `${s.thickness * 4}px`,
                  boxShadow:
                    "0 0 14px rgba(253,251,247,0.95), 0 0 28px rgba(253,251,247,0.55), 0 0 60px rgba(90,122,239,0.35)",
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center w-[min(70vw,360px)] aspect-square">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1.6, opacity: [0, 0.18, 0] }}
          transition={{
            duration: 1.6,
            delay: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute inset-0 rounded-full bg-cream/30 blur-3xl pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{
            opacity: [0, 1, 1, 1],
            scale: [0.92, 1, 1.015, 1],
          }}
          transition={{
            duration: 2.0,
            delay: 0.45,
            ease: [0.32, 0.72, 0, 1],
            times: [0, 0.45, 0.75, 1],
          }}
          className="relative w-full h-full flex items-center justify-center"
          style={{ willChange: "transform, opacity" }}
        >
          <Image
            src="/logo-white.png"
            alt="RAW"
            fill
            priority
            sizes="(max-width: 640px) 70vw, 360px"
            className="object-contain select-none pointer-events-none"
          />
        </motion.div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: [0, 0.6, 0] }}
          transition={{
            duration: 1.2,
            delay: 0.35,
            ease: [0.32, 0.72, 0, 1],
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-[140%] bg-gradient-to-r from-transparent via-cream/70 to-transparent origin-center pointer-events-none"
          style={{ willChange: "transform, opacity" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: [0, 0.55, 0.55, 0], y: 0 }}
        transition={{
          duration: 2.0,
          delay: 1.0,
          ease: [0.32, 0.72, 0, 1],
          times: [0, 0.25, 0.75, 1],
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cream/60 text-[10px] uppercase tracking-[0.4em] font-body"
      >
        RAW · PROJECT
      </motion.div>
    </motion.div>
  );
}
