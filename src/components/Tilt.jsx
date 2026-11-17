"use client";

import { useRef } from "react";
import { useFinePointerMotion } from "@/lib/motion";

/**
 * 3D tilt toward the cursor, with a soft light glare that follows it.
 * Writes CSS variables only (--rx, --ry, --gx, --gy, --glare) — the look lives in
 * `.tilt` in globals.scss. Static on touch devices and with reduced motion.
 */
export default function Tilt({ as: Tag = "div", max = 7, className = "", children, ...rest }) {
  const ref = useRef(null);
  const frame = useRef(0);
  const enabled = useFinePointerMotion();

  const set = (vars) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      for (const [k, v] of Object.entries(vars)) el.style.setProperty(k, v);
    });
  };

  const onMove = (e) => {
    if (!enabled) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    set({
      "--rx": `${(0.5 - py) * max * 2}deg`,
      "--ry": `${(px - 0.5) * max * 2}deg`,
      "--gx": `${px * 100}%`,
      "--gy": `${py * 100}%`,
      "--glare": "1",
    });
  };

  const onLeave = () => set({ "--rx": "0deg", "--ry": "0deg", "--glare": "0" });

  return (
    <Tag
      ref={ref}
      className={`tilt ${enabled ? "tilt-on" : ""} ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
}
