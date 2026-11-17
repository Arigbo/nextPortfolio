"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { projectPath } from "@/lib/projectsData";
import { useFinePointerMotion, lerp, clamp } from "@/lib/motion";

/**
 * A 3D fan of real project screenshots. The whole scene leans toward the cursor
 * (eased, so it feels weighty); each card bobs on its own rhythm, and the hovered
 * card slides forward. On touch / reduced motion it renders as a still, angled stack.
 */
export default function HeroStack({ projects }) {
  const scene = useRef(null);
  const enabled = useFinePointerMotion();

  useEffect(() => {
    if (!enabled) return;
    const el = scene.current;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;

    const tick = () => {
      cur.x = lerp(cur.x, target.x, 0.07);
      cur.y = lerp(cur.y, target.y, 0.07);
      el.style.setProperty("--tilt-x", `${cur.y * -9}deg`);
      el.style.setProperty("--tilt-y", `${cur.x * 13}deg`);
      el.style.setProperty("--shift-x", `${cur.x * 10}px`);
      const settled = Math.abs(cur.x - target.x) < 0.001 && Math.abs(cur.y - target.y) < 0.001;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    // Track the pointer anywhere in the viewport, relative to the scene's centre
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      target.x = clamp((e.clientX - (r.left + r.width / 2)) / (innerWidth / 2), -1, 1);
      target.y = clamp((e.clientY - (r.top + r.height / 2)) / (innerHeight / 2), -1, 1);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [enabled]);

  return (
    <div className={`stack3d ${enabled ? "is-live" : ""}`} ref={scene} aria-label="Recent projects">
      <div className="stack3d-floor" aria-hidden="true" />
      <div className="stack3d-scene">
        {projects.map((p, i) => (
          <Link
            key={p.id}
            href={projectPath(p)}
            className="stack3d-card"
            style={{ "--i": i, "--n": projects.length }}
            data-cursor="View"
            aria-label={`${p.title} — open project`}
          >
            <span className="stack3d-bar" aria-hidden="true">
              <i /><i /><i />
              <span className="stack3d-url">{p.link.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
            </span>
            <span className="stack3d-shot">
              <Image
                src={p.imageUrl}
                alt=""
                width={p.imageSize.width}
                height={p.imageSize.height}
                sizes="(min-width: 1000px) 460px, 70vw"
                priority={i < 2}
              />
            </span>
            <span className="stack3d-label">{p.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
