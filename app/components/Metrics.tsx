"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const metrics = [
  { value: 47, suffix: "+", label: "Marcas Elevadas" },
  { value: 12, suffix: "", label: "Países" },
  { value: 98, suffix: "%", label: "Retención de Clientes" },
];

export default function Metrics() {
  return (
    <section className="border-y border-charcoal/[0.06] py-24 md:py-32">
      <div className="px-4 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.32, 0.72, 0, 1] }}
              className="text-center md:text-left"
            >
              <div className="font-display text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-charcoal mb-3">
                <AnimatedCounter target={metric.value} suffix={metric.suffix} />
              </div>
              <p className="text-warm-gray text-sm uppercase tracking-[0.2em] font-medium">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
