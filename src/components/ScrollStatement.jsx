"use client";

import { useEffect, useRef } from "react";
import { gsap, MQ } from "@/lib/gsap";

/**
 * A large statement whose words light up one by one as you scroll through it.
 * Fully readable without JS / with reduced motion (words start at full strength).
 */
export default function ScrollStatement({ text, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const words = ref.current.querySelectorAll(".statement-word");
      gsap.fromTo(
        words,
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 45%", scrub: true },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <p className={`statement ${className}`} ref={ref}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="statement-word">{w} </span>
      ))}
    </p>
  );
}
