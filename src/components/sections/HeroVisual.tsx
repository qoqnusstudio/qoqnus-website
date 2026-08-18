"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import HeroParticles from "@/components/sections/HeroParticles";

const Hero3D = dynamic(() => import("@/components/sections/Hero3D"), {
  ssr: false,
  loading: () => null,
});

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

// Renders the 3D camera-on-tripod prototype where it's cheap and safe
// to do so, and falls back to the existing particle animation
// otherwise — low-end devices, no WebGL, or prefers-reduced-motion.
// See the roadmap doc's "3D feasibility" section for the reasoning.
export default function HeroVisual() {
  const [mode, setMode] = useState<"pending" | "3d" | "particles">("pending");

  useEffect(() => {
    // WebGL/reduced-motion detection needs `window`, so it can only run
    // client-side, after mount — computing it during render (e.g. a
    // useState lazy initializer) would run on the server too, where it's
    // unavailable, and diverge from the client's first render, triggering
    // a hydration mismatch. Deferring to an effect keeps server and
    // first-client-render output identical ("pending"), then swaps in
    // the real value once we're safely past hydration.
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(!reducedMotion && supportsWebGL() ? "3d" : "particles");
  }, []);

  if (mode === "pending") {
    // Avoid a particles-then-3D flash: render nothing for one tick
    // while capability detection runs (imperceptible, no layout shift
    // since this sits inside an already-sized absolute container).
    return null;
  }

  return mode === "3d" ? <Hero3D /> : <HeroParticles />;
}
