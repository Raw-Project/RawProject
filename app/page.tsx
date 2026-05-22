"use client";

import { type ComponentType, useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import SplashScreen from "./components/SplashScreen";
import LogoTransition from "./components/LogoTransition";

type Stage = "splash" | "transition" | "main";

export default function Home() {
  const [stage, setStage] = useState<Stage>("splash");
  const [MainContent, setMainContent] = useState<ComponentType | null>(null);
  const isMainVisible = stage === "main";

  useEffect(() => {
    if (stage === "splash" || MainContent) return;

    let cancelled = false;
    import("./components/MainContent").then((module) => {
      if (!cancelled) setMainContent(() => module.default);
    });

    return () => {
      cancelled = true;
    };
  }, [MainContent, stage]);

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

      {isMainVisible && MainContent ? <MainContent /> : null}
    </div>
  );
}
