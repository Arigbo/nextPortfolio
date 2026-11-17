"use client";

import { useEffect, useRef } from "react";
import { useFinePointerMotion, lerp } from "@/lib/motion";

/**
 * The page's ambient layer, fixed behind all content:
 * - two soft lights that drift slowly (CSS), so no page ever sits completely still
 * - a spotlight that follows the cursor and brightens the dot grid beneath it
 * The spotlight only runs with a precise pointer and without reduced motion.
 */
export default function Ambient() {
  const spot = useRef(null);
  const enabled = useFinePointerMotion();

  useEffect(() => {
    if (!enabled) return;
    const el = spot.current;
    const target = { x: innerWidth / 2, y: innerHeight / 3 };
    const cur = { ...target };
    let raf = 0;

    const tick = () => {
      cur.x = lerp(cur.x, target.x, 0.12);
      cur.y = lerp(cur.y, target.y, 0.12);
      el.style.setProperty("--mx", `${cur.x}px`);
      el.style.setProperty("--my", `${cur.y}px`);
      raf = Math.abs(cur.x - target.x) + Math.abs(cur.y - target.y) > 0.3 ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      el.classList.add("is-on");
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => el.classList.remove("is-on");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-light ambient-light-a" />
      <div className="ambient-light ambient-light-b" />
      <div className="ambient-spot" ref={spot} />
    </div>
  );
}
