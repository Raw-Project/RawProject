"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import SplashScreen from "./components/SplashScreen";
import LogoTransition from "./components/LogoTransition";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Projects from "./components/Projects";
import Manifesto from "./components/Manifesto";
import Services from "./components/Services";
import Metrics from "./components/Metrics";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

type Stage = "splash" | "transition" | "main";

export default function Home() {
  const [stage, setStage] = useState<Stage>("splash");
  const isMainVisible = stage === "main";

  return (
    <div className="bg-cream min-h-screen text-charcoal">
      <AnimatePresence mode="wait">
        {stage === "splash" && (
          <SplashScreen key="splash" onEnter={() => setStage("transition")} />
        )}
        {stage === "transition" && (
          <LogoTransition
            key="transition"
            onFinish={() => setStage("main")}
          />
        )}
      </AnimatePresence>

      <div
        className={`${
          isMainVisible
            ? "opacity-100"
            : "opacity-0 h-screen overflow-hidden"
        } transition-opacity duration-700 delay-200`}
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
