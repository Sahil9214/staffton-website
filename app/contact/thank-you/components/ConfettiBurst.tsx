"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

/**
 * One-shot confetti celebration on mount.
 * Skipped when the user prefers reduced motion.
 */
const ConfettiBurst = () => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const end = Date.now() + 1800;
    const brandColors = ["#0d9488", "#5eead4", "#0f9d94", "#86f2e4", "#0f172a"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: brandColors,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: brandColors,
        disableForReducedMotion: true,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    const timeoutId = window.setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.55 },
        colors: brandColors,
        disableForReducedMotion: true,
      });
      frame();
    }, 200);

    return () => {
      window.clearTimeout(timeoutId);
      confetti.reset();
    };
  }, []);

  return null;
};

export default ConfettiBurst;
