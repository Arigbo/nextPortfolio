"use client";

import { useEffect, useState } from "react";

/**
 * True when rich pointer motion is appropriate: a precise pointer (mouse/trackpad)
 * that can hover, and the visitor hasn't asked for reduced motion.
 * Touch devices and reduced-motion users get the static versions of every effect.
 */
export function useFinePointerMotion() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const pointer = matchMedia("(hover: hover) and (pointer: fine)");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(pointer.matches && !motion.matches);
    update();
    pointer.addEventListener("change", update);
    motion.addEventListener("change", update);
    return () => {
      pointer.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
  }, []);

  return enabled;
}

export const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
export const lerp = (a, b, t) => a + (b - a) * t;
