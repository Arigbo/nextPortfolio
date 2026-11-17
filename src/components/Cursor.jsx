"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useFinePointerMotion, lerp } from "@/lib/motion";

const INTERACTIVE = "a, button, [role='button'], label, select, summary, [data-cursor]";
const TEXT_ENTRY = "input:not([type='checkbox']):not([type='radio']):not([type='button']):not([type='submit']), textarea, [contenteditable='true']";

/**
 * Custom cursor: a precise dot plus a ring that trails it with easing.
 * - grows over links and buttons
 * - shows a label over elements with data-cursor="View" (e.g. project cards)
 * - [data-magnetic] elements lean toward the pointer
 * - hides over text fields so the native I-beam shows
 * Only on precise pointers without reduced motion; otherwise renders nothing.
 */
export default function Cursor() {
  const enabled = useFinePointerMotion();
  const pathname = usePathname();
  const dot = useRef(null);
  const ring = useRef(null);
  const [mode, setMode] = useState({ hover: false, label: "", text: false, down: false, hidden: true });

  // Reset hover state after navigation (the hovered element may be gone)
  useEffect(() => setMode((m) => ({ ...m, hover: false, label: "" })), [pathname]);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const target = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringPos = { ...target };
    let raf = 0;
    let magnet = null;

    const tick = () => {
      ringPos.x = lerp(ringPos.x, target.x, 0.18);
      ringPos.y = lerp(ringPos.y, target.y, 0.18);
      if (ring.current) ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      const settled = Math.abs(ringPos.x - target.x) < 0.1 && Math.abs(ringPos.y - target.y) < 0.1;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const releaseMagnet = () => {
      if (magnet) magnet.style.transform = "";
      magnet = null;
    };

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (!raf) raf = requestAnimationFrame(tick);

      const el = e.target instanceof Element ? e.target : null;
      const interactive = el?.closest(INTERACTIVE);
      const labelled = el?.closest("[data-cursor]");
      const text = Boolean(el?.closest(TEXT_ENTRY));
      setMode((m) => {
        const next = { ...m, hover: Boolean(interactive), label: labelled?.dataset.cursor || "", text, hidden: false };
        return next.hover === m.hover && next.label === m.label && next.text === m.text && !m.hidden ? m : next;
      });

      // Magnetic pull: the element leans a little toward the pointer
      const mag = el?.closest("[data-magnetic]");
      if (mag !== magnet) releaseMagnet();
      if (mag) {
        magnet = mag;
        const r = mag.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        mag.style.transform = `translate(${dx * 0.18}px, ${dy * 0.24}px)`;
      }
    };

    const onDown = () => setMode((m) => ({ ...m, down: true }));
    const onUp = () => setMode((m) => ({ ...m, down: false }));
    const onLeaveWindow = () => { releaseMagnet(); setMode((m) => ({ ...m, hidden: true })); };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeaveWindow);

    return () => {
      cancelAnimationFrame(raf);
      releaseMagnet();
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeaveWindow);
    };
  }, [enabled]);

  if (!enabled) return null;

  const cls = [
    mode.hover && "is-hover",
    mode.label && "is-label",
    mode.text && "is-text",
    mode.down && "is-down",
    mode.hidden && "is-hidden",
  ].filter(Boolean).join(" ");

  return (
    <div className={`cursor-layer ${cls}`} aria-hidden="true">
      <div ref={ring} className="cursor-ring">
        <span className="cursor-ring-inner">{mode.label && <span className="cursor-label">{mode.label}</span>}</span>
      </div>
      <div ref={dot} className="cursor-dot"><span /></div>
    </div>
  );
}
