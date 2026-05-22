"use client";

import Navbar from "./Navbar";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Projects from "./Projects";
import Manifesto from "./Manifesto";
import Services from "./Services";
import Metrics from "./Metrics";
import CTASection from "./CTASection";
import Footer from "./Footer";

export default function MainContent() {
  return (
    <div className="main-reveal">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Projects />
        <Manifesto />
        <Services />
        <Metrics />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
