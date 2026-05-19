"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Projects from "./components/Projects";
import Manifesto from "./components/Manifesto";
import Services from "./components/Services";
import Metrics from "./components/Metrics";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="bg-cream min-h-screen text-charcoal">
      <AnimatePresence mode="wait">
        {!hasEntered && (
          <SplashScreen key="splash" onEnter={() => setHasEntered(true)} />
        )}
      </AnimatePresence>

      <div
        className={`${
          !hasEntered
            ? "opacity-0 h-screen overflow-hidden"
            : "opacity-100"
        } transition-opacity duration-1000 delay-500`}
      >
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
    </div>
  );
}
