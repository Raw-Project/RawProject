"use client";
import { motion } from "motion/react";
import Image from "next/image";

const projects = [
  {
    title: "Lumina Residence",
    category: "Dirección de Arte & Identidad Espacial",
    tags: ["Branding", "Editorial"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrJOQvQMX1gAABBPplpQOH94yvE1GdiOETGu5-iNs3PmQV9CwfFsNhecXahhxqsgXJb1SwESkHTMZ-bXAli3_OPYyT3MpqgVsTJP4IVS4qC3F0bvS9b-6lPXcwVPWAxwdw3_pOknYLEUh6nwfs0Ffi_xn4qy2OVEtku2KJOUsrAXSa12-T3vtNajXM8IiCJ8VlVTflHBJ_fs4pMCBZ86wK_strFsN_Rt0CT4mzGL_A8i87_PUGp7cpm4mL3EDkED1A0O-qbABvv9M",
    span: "md:col-span-8 md:row-span-2",
    height: "h-[350px] md:h-full md:min-h-[600px]",
  },
  {
    title: "Nexus Systems",
    category: "Diseño de Interfaz & Sistemas de Diseño",
    tags: ["UI/UX", "Digital"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAV-uHuFpDCGaBPN9n-MzVRZPGmIVKChyNxBxPyPhNuwGMNEOrvY7BBSd_3M5ufpBZvzYv4dWtAbhWEpNogmLgc1Tv5I_-MhkP8oNXIPGPNPX1YYmOpy3DL45NaUsyh_u83f9JzU_Zch_PXD-G-hi9xTBmWQHAbiGinw-ZEmgM2xpguY2wCSpOXBYVad6cpHYiGI0pWHjBId9d1dZImitkodkdwaf_2G_qXtiHEpKLQl1v1CS8iLYEaDNIFlS9bF4Bwdm5llfSWwPA",
    span: "md:col-span-4",
    height: "h-[350px] md:h-[290px]",
  },
  {
    title: "Aether Cosmetics",
    category: "Estrategia de Marca & Packaging",
    tags: ["Packaging", "Estrategia"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4XgZhR4DQnS9wYCHRTdioGkXR1-UmWeclZc3rjiLFSEbbLCbiP0ByG1bLiK7klOkBdHhIejbnOtVjF0NCQh6xAGqFwejJnO5dgvPVvgqNXkhQ-bSpBZ6RJ0sKZCx1rLGeAE3kZI3OtgKkLePnKZV-UQgACpBjGcDcXO4FlBrlhewHS8FGUbBNYuO1THaWeB7ozZqh5TtTEduxmiCwW9SbuXow9auGZHRg5kWGZ1NeBEkioN2dry88l9jb34VkqjK_VZrOpA7uYg4",
    span: "md:col-span-4",
    height: "h-[350px] md:h-[290px]",
  },
  {
    title: "Klarte Studio",
    category: "Identidad Visual & Tipografía Custom",
    tags: ["Identidad", "Print"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeWgcq1amwDQclOjPEyvU9SuO0o6fnvU9E5cKQwxlwOgbmYSlSJPNmTUU4GHAeTOlPoGAix2i4HXRBgaJpxYLjne1O7Orw1ssr1SscFbThANrdGIMQYkq5QwThgpKhgk4lDtWwZOdFBBrsTSTv-c46gNaLurbTCUT3_S1xYXQiVrZypi-2bIfNft8MQ_Z6XRviLsiv7PDekvgLUoAPZxKipZso-hYqPx_yFQz0EpgALxXa1ANMXAeECS_pwXsqF3AApaVJQ5JjaBY",
    span: "md:col-span-8",
    height: "h-[350px] md:h-[340px]",
  },
];

export default function Projects() {
  return (
    <section id="proyectos" className="px-4 md:px-12 lg:px-20 max-w-[1400px] mx-auto py-32 md:py-48">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
        className="mb-16 md:mb-20"
      >
        <span className="eyebrow mb-6 inline-flex">
          <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
          Portafolio Selecto
        </span>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-6">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-charcoal leading-[1.1]">
            Obras que hablan<br />
            <span className="text-terracotta italic font-light">por sí mismas</span>
          </h2>
          <span className="text-[11px] font-semibold text-warm-gray uppercase tracking-[0.2em]">2023 — 2024</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 60, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: idx * 0.1, ease: [0.32, 0.72, 0, 1] }}
            className={`${project.span} col-span-1`}
          >
            <div className="bezel-outer h-full group cursor-pointer">
              <div className={`bezel-inner relative ${project.height} overflow-hidden`}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.06]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent opacity-40 transition-opacity duration-700 group-hover:opacity-70" />

                {/* Card Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                  <div className="bg-cream/85 backdrop-blur-xl rounded-[calc(2rem-12px)] p-5 md:p-6 border border-cream/50 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)]">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-display font-semibold text-charcoal tracking-tight">{project.title}</h3>
                      <span className="w-7 h-7 rounded-full bg-charcoal/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                      </span>
                    </div>
                    <p className="text-xs text-warm-gray font-medium mb-3">{project.category}</p>
                    <div className="flex gap-2 flex-wrap">
                      {project.tags.map(tag => (
                        <span key={tag} className="bg-charcoal/[0.04] px-3 py-1 rounded-full text-[9px] font-semibold text-charcoal uppercase tracking-[0.18em]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
