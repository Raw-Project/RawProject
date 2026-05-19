"use client";

const ITEMS = ["BRANDING", "IDENTIDAD", "ESTRATEGIA", "CONVERSIÓN", "DISEÑO DIGITAL", "PACKAGING", "DIRECCIÓN DE ARTE", "POSICIONAMIENTO"];
const doubled = [...ITEMS, ...ITEMS];

export default function Marquee() {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden border-y border-charcoal/[0.06]">
      <div className="flex whitespace-nowrap animate-marquee">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 md:gap-10 mx-6 md:mx-10">
            <span className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-charcoal/[0.06] select-none tracking-tight">
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-terracotta/30 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
