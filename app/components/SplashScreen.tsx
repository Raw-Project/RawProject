"use client";
import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
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

type SloganLineDef = {
  text: string;
  className: string;
};

const MOBILE_SENTENCE_ONE: SloganLineDef[] = [
  {
    text: "NO",
    className:
      "block text-cream text-[clamp(4.5rem,min(22vw,14vh),8.5rem)] font-black leading-none md:mb-4",
  },
  {
    text: "HACEMOS",
    className:
      "block text-cream/30 text-[clamp(2.2rem,min(8.8vw,5.5vh),5.5rem)] font-black leading-none md:mb-1",
  },
  {
    text: "SIMPLE",
    className:
      "block text-cream/30 text-[clamp(2.2rem,min(8.8vw,5.5vh),5.5rem)] font-black leading-none md:mb-1",
  },
  {
    text: "MARKETING",
    className:
      "block text-cream/30 text-[clamp(2.5rem,min(10vw,6.2vh),6.2rem)] font-black leading-none md:mb-10",
  },
];

const DESKTOP_SENTENCE_ONE: SloganLineDef[] = [
  {
    text: "NO",
    className:
      "block text-cream text-[clamp(5.5rem,14vh,12rem)] font-black leading-[0.92]",
  },
  {
    text: "HACEMOS SIMPLE",
    className:
      "block text-cream/30 text-[clamp(3rem,7.5vh,7rem)] font-black leading-[0.92]",
  },
  {
    text: "MARKETING",
    className:
      "block text-cream/30 text-[clamp(3rem,7.8vh,7rem)] font-black leading-[0.92]",
  },
];

const DESKTOP_SENTENCE_TWO: SloganLineDef[] = [
  {
    text: "HACEMOS",
    className:
      "block text-cream/30 text-[clamp(3rem,7.5vh,7rem)] font-black leading-[0.92]",
  },
  {
    text: "QUE SEA",
    className:
      "block text-cream/30 text-[clamp(3rem,7.5vh,7rem)] font-black leading-[0.92]",
  },
  {
    text: "IMPOSIBLE",
    className:
      "block text-cream text-[clamp(3.25rem,8vh,7.5rem)] font-black leading-[0.92]",
  },
  {
    text: "IGNORARTE",
    className:
      "block text-terracotta text-[clamp(3.25rem,8vh,7.5rem)] font-black leading-[0.92]",
  },
];

const SLOGAN_SENTENCE_TWO: SloganLineDef[] = [
  {
    text: "HACEMOS",
    className:
      "block text-cream/30 text-[clamp(2.2rem,min(8.8vw,5.5vh),5.5rem)] font-black leading-none md:mb-1",
  },
  {
    text: "QUE SEA",
    className:
      "block text-cream/30 text-[clamp(2.2rem,min(8.8vw,5.5vh),5.5rem)] font-black leading-none md:mb-1",
  },
  {
    text: "IMPOSIBLE",
    className:
      "block text-cream text-[clamp(2.5rem,min(10.5vw,6.2vh),6.2rem)] font-black leading-none md:mb-1",
  },
  {
    text: "IGNORARTE",
    className:
      "block text-terracotta text-[clamp(2.5rem,min(10.5vw,6.2vh),6.2rem)] font-black leading-none",
  },
];

function SloganLines({
  lines,
  startIndex,
  className,
}: {
  lines: SloganLineDef[];
  startIndex: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {lines.map((line, idx) => (
        <span
          key={line.text + idx}
          className={`splash-slogan-line ${line.className}`}
          style={{
            "--slogan-delay": `${120 + (startIndex + idx) * 95}ms`,
          } as CSSProperties}
        >
          {line.text}
        </span>
      ))}
    </div>
  );
}

/* ── Atmospheric particle system ── */
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
  spriteKey: string;
}

function createParticle(canvasW: number, zoneTop: number, zoneH: number): Particle {
  const x = Math.random() * canvasW;
  const y = zoneTop + Math.random() * zoneH * 0.3;
  const size = Math.random() * 18 + 4;
  const blur = Math.random() * 12 + 3;
  const maxOpacity = Math.random() * 0.12 + 0.03;
  const maxLife = Math.random() * 240 + 120;
  const spriteKey = `${Math.round(size)}-${Math.round(blur)}`;
  return {
    x, y, baseX: x,
    vx: (Math.random() - 0.5) * 0.3,
    vy: Math.random() * 0.6 + 0.15,
    size, blur, opacity: 0, maxOpacity,
    life: 0, maxLife,
    drift: (Math.random() - 0.5) * 0.4,
    spriteKey,
  };
}

function AirField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const spriteCacheRef = useRef<Map<string, HTMLCanvasElement>>(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const spriteCache = spriteCacheRef.current;

    const getSprite = (particle: Particle) => {
      const cached = spriteCache.get(particle.spriteKey);
      if (cached) return cached;

      const radius = Math.ceil(particle.size + particle.blur * 2);
      const diameter = radius * 2;
      const sprite = document.createElement("canvas");
      sprite.width = diameter;
      sprite.height = diameter;

      const spriteCtx = sprite.getContext("2d");
      if (spriteCtx) {
        const gradient = spriteCtx.createRadialGradient(
          radius,
          radius,
          0,
          radius,
          radius,
          radius
        );
        gradient.addColorStop(0, "rgba(253,251,247,1)");
        gradient.addColorStop(0.45, "rgba(253,251,247,0.38)");
        gradient.addColorStop(1, "rgba(253,251,247,0)");
        spriteCtx.fillStyle = gradient;
        spriteCtx.fillRect(0, 0, diameter, diameter);
      }

      spriteCache.set(particle.spriteKey, sprite);
      return sprite;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
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

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;
    const zoneTop = () => H() * 0.72;
    const zoneH = () => H() * 0.28;

    const PARTICLE_COUNT = 65;
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(W(), zoneTop(), zoneH())
    );
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
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        p.life++;

        const lifeRatio = p.life / p.maxLife;
        if (lifeRatio < 0.15) {
          p.opacity = (lifeRatio / 0.15) * p.maxOpacity;
        } else if (lifeRatio > 0.75) {
          p.opacity = ((1 - lifeRatio) / 0.25) * p.maxOpacity;
        } else {
          p.opacity = p.maxOpacity;
        }

        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const cursorRadius = 200;

        if (dist < cursorRadius && dist > 0) {
          const force = (1 - dist / cursorRadius) * 1.2;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 0.15;
          p.vy += Math.sin(angle) * force * 0.08;
          p.opacity = Math.min(p.opacity * 1.6, 0.25);
        }

        p.x += p.vx + Math.sin(p.life * 0.015 + p.drift * 10) * p.drift;
        p.y += p.vy;

        p.vx *= 0.97;
        p.vy *= 0.985;
        p.vy += 0.005;

        if (p.life >= p.maxLife || p.y > h + 30 || p.x < -40 || p.x > w + 40) {
          const fresh = createParticle(w, zt, zh);
          particlesRef.current[i] = fresh;
          continue;
        }

        const sprite = getSprite(p);
        ctx.globalAlpha = p.opacity;
        ctx.drawImage(
          sprite,
          p.x - sprite.width / 2,
          p.y - sprite.height / 2,
          sprite.width,
          sprite.height
        );
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
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
  const [sloganReady, setSloganReady] = useState(false);

  const handleScroll = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;
    onEnter();
  }, [onEnter]);

  useEffect(() => {
    let cancelled = false;
    let rafOne = 0;
    let rafTwo = 0;
    const fallback = window.setTimeout(() => {
      if (!cancelled) setSloganReady(true);
    }, 900);

    const reveal = () => {
      rafOne = window.requestAnimationFrame(() => {
        rafTwo = window.requestAnimationFrame(() => {
          if (!cancelled) {
            window.clearTimeout(fallback);
            setSloganReady(true);
          }
        });
      });
    };

    if ("fonts" in document) {
      document.fonts.ready.then(reveal, reveal);
    } else {
      reveal();
    }

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      window.cancelAnimationFrame(rafOne);
      window.cancelAnimationFrame(rafTwo);
    };
  }, []);

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
      exit={{ opacity: 0, scale: 1.035 }}
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
              "--twinkle-opacity": star.maxOpacity,
            } as CSSProperties}
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
      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col justify-between min-h-[92dvh] md:min-h-[100svh] md:max-h-[100svh] md:justify-center items-start text-left pl-2 sm:pl-6 md:pl-12 gap-5 md:gap-0 pt-2 pb-5 md:py-[3svh]">
        {/* Slogan */}
        <div
          className={`w-full flex flex-col flex-1 justify-evenly md:flex-none text-left font-montserrat font-black tracking-tight select-none max-w-3xl md:max-w-none ${
            sloganReady ? "splash-slogan-ready" : ""
          }`}
        >
          {/* Mobile */}
          <div className="md:hidden flex flex-col flex-1 justify-evenly">
            <SloganLines
              lines={MOBILE_SENTENCE_ONE}
              startIndex={0}
              className="flex flex-col gap-[0.22em]"
            />
            <SloganLines
              lines={SLOGAN_SENTENCE_TWO}
              startIndex={MOBILE_SENTENCE_ONE.length}
              className="flex flex-col gap-[0.22em] mt-6 sm:mt-8"
            />
          </div>

          {/* Desktop — fills vertical space */}
          <div className="hidden md:flex md:flex-col md:justify-between md:h-[min(88svh,920px)] md:max-h-[92svh] md:py-[1svh]">
            <SloganLines
              lines={DESKTOP_SENTENCE_ONE}
              startIndex={0}
              className="flex flex-col justify-between flex-[1.05] min-h-0"
            />
            <div aria-hidden="true" className="h-[4.5vh] shrink-0" />
            <SloganLines
              lines={DESKTOP_SENTENCE_TWO}
              startIndex={DESKTOP_SENTENCE_ONE.length}
              className="flex flex-col justify-between flex-[1.35] min-h-0"
            />
          </div>
        </div>

        {/* Mobile-only button */}
        <div className="flex md:hidden items-start w-full">
          <motion.button
            onClick={onEnter}
            className={`${sloganReady ? "splash-reveal splash-action" : "opacity-0"} magnetic-btn group relative rounded-full bg-cream text-charcoal px-5 py-3 flex items-center gap-2.5 text-[10px] uppercase tracking-[0.2em] font-semibold font-body`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>DESCUBRE CÓMO</span>
            <span className="w-6.5 h-6.5 rounded-full bg-charcoal/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
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
