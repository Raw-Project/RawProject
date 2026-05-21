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

/* ── Atmospheric particle system ──
   Full-width ethereal mist at the bottom of the viewport.
   Blurred, low-res particles drift downward like wisps of air.
   Cursor proximity warps the flow — particles accelerate and
   spread around the pointer, creating a living atmosphere. */

interface Particle {
  x: number;
  y: number;
  baseX: number;
  vx: number;
  vy: number;
  size: number;
  blur: number;
  opacity: number;
  maxOpacity: number;
  life: number;
  maxLife: number;
  drift: number;
}

function createParticle(canvasW: number, zoneTop: number, zoneH: number): Particle {
  const x = Math.random() * canvasW;
  const y = zoneTop + Math.random() * zoneH * 0.3; // spawn in upper portion of zone
  const size = Math.random() * 18 + 4;             // 4–22px — mixed granularity
  const blur = Math.random() * 12 + 3;             // heavy blur for "air" feel
  const maxOpacity = Math.random() * 0.12 + 0.03;  // very subtle: 0.03–0.15
  const maxLife = Math.random() * 240 + 120;        // 2–6s at 60fps
  return {
    x, y, baseX: x,
    vx: (Math.random() - 0.5) * 0.3,
    vy: Math.random() * 0.6 + 0.15,  // gentle downward drift
    size, blur, opacity: 0, maxOpacity,
    life: 0, maxLife,
    drift: (Math.random() - 0.5) * 0.4,
  };
}

function AirField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    // Zone: bottom 28% of viewport
    const W = () => window.innerWidth;
    const H = () => window.innerHeight;
    const zoneTop = () => H() * 0.72;
    const zoneH = () => H() * 0.28;

    // Initial population
    const PARTICLE_COUNT = 65;
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(W(), zoneTop(), zoneH())
    );
    // Randomize initial life so they don't all appear at once
    particlesRef.current.forEach(p => {
      p.life = Math.random() * p.maxLife;
    });

    const animate = () => {
      const w = W();
      const h = H();
      const zt = zoneTop();
      const zh = zoneH();
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        p.life++;

        // Lifecycle opacity: fade in → sustain → fade out
        const lifeRatio = p.life / p.maxLife;
        if (lifeRatio < 0.15) {
          p.opacity = (lifeRatio / 0.15) * p.maxOpacity;
        } else if (lifeRatio > 0.75) {
          p.opacity = ((1 - lifeRatio) / 0.25) * p.maxOpacity;
        } else {
          p.opacity = p.maxOpacity;
        }

        // Cursor influence — particles within ~200px of cursor get gently pushed
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const cursorRadius = 200;

        if (dist < cursorRadius && dist > 0) {
          const force = (1 - dist / cursorRadius) * 1.2;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 0.15;
          p.vy += Math.sin(angle) * force * 0.08;
          // Boost opacity near cursor for a luminous glow trail
          p.opacity = Math.min(p.opacity * 1.6, 0.25);
        }

        // Horizontal sine drift for organic movement
        p.x += p.vx + Math.sin(p.life * 0.015 + p.drift * 10) * p.drift;
        p.y += p.vy;

        // Dampen velocity
        p.vx *= 0.97;
        p.vy *= 0.985;
        // Restore baseline downward drift
        p.vy += 0.005;

        // Recycle if out of life or out of bounds
        if (p.life >= p.maxLife || p.y > h + 30 || p.x < -40 || p.x > w + 40) {
          const fresh = createParticle(w, zt, zh);
          particlesRef.current[i] = fresh;
          continue;
        }

        // Draw — blurred radial gradient circles
        ctx.save();
        ctx.filter = `blur(${p.blur}px)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(253, 251, 247, ${p.opacity})`;
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-20"
      aria-hidden="true"
    />
  );
}

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

      {/* Atmospheric air field — desktop only */}
      <div className="hidden md:block">
        <AirField />
      </div>

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
    </motion.div>
  );
}
