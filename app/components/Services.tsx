"use client";
import { motion } from "motion/react";
import Image from "next/image";

const services = [
  {
    title: "Diseño de Identidad",
    desc: "Sistemas visuales rigurosos que proyectan autoridad y sofisticación en cada punto de contacto.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/><circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/><circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
    ),
    span: "md:col-span-1",
  },
  {
    title: "Posicionamiento Corporativo",
    desc: "Estrategias de penetración de mercado basadas en análisis asimétrico y ventaja competitiva.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBu5SzxU_hfOFQE7C5Jzo3dvcXbAaojGCxpZjjwiqMy-Xqq-SKYZuYDNCdFHprp-swXateYXylqh9lf0uxIn-ZdSu46li5Po7AsTxt8vRrEPuBX6FE4Gax8I6soyS6nLwU5z59NdGvWbj4DS_9opSQ8Kl9pNbEUGRhn83Hr5NwiE-RSwMg3ZAirfmQDWRYSQaq0CSH8UfpMjRtFimZ36lwTmQU6Dr3Nh4b-I9C6GMwvfxDz1VmhFOiWDrEWtF1GmyrhhE6ETp7PLH4",
    span: "md:col-span-2",
  },
  {
    title: "Optimización de Conversión",
    desc: "Refinamiento de embudos a través de datos empíricos y diseño de fricción cero.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
    ),
    span: "md:col-span-2",
    dark: true,
  },
  {
    title: "Ecosistemas Digitales",
    desc: "Plataformas integradas de alto rendimiento, optimizadas para escalas mayores.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
    ),
    span: "md:col-span-1",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="px-4 md:px-12 lg:px-20 max-w-[1400px] mx-auto py-32 md:py-48">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
        className="mb-16 md:mb-20"
      >
        <span className="eyebrow mb-6 inline-flex">
          <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
          Servicios
        </span>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-charcoal mt-6 leading-[1.1]">
          Arquitectura de{" "}
          <span className="text-terracotta italic font-light">valor</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {services.map((svc, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.32, 0.72, 0, 1] }}
            className={`${svc.span} col-span-1`}
          >
            <div className={svc.dark ? "bezel-outer-dark h-full" : "bezel-outer h-full"}>
              <div className={`${svc.dark ? "bezel-inner-dark" : "bezel-inner"} p-7 md:p-8 flex flex-col justify-between min-h-[320px] group hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)] transition-shadow duration-700`}>
                <div>
                  {svc.image && (
                    <div className="w-full h-40 relative rounded-[calc(2rem-12px)] overflow-hidden mb-8 border border-charcoal/[0.06]">
                      <Image src={svc.image} alt={svc.title} fill className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]" referrerPolicy="no-referrer" />
                    </div>
                  )}
                  {svc.icon && !svc.image && (
                    <div className={`mb-8 ${svc.dark ? "text-cream/60" : "text-charcoal/40"}`}>
                      {svc.icon}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className={`text-xl font-display font-semibold mb-3 tracking-tight ${svc.dark ? "text-cream" : "text-charcoal"}`}>
                    {svc.title}
                  </h4>
                  <p className={`text-sm leading-relaxed font-light ${svc.dark ? "text-cream/40" : "text-warm-gray"}`}>
                    {svc.desc}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
