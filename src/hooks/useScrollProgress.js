"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollProgress — returns a 0→1 progress value for how far
 * an element has been scrolled through the viewport.
 * Great for hero "scroll-away" effects (fade/scale/blur as you scroll past).
 */
export function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);
  const stRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    stRef.current = ScrollTrigger.create({
      trigger: ref.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      stRef.current?.kill();
    };
  }, [ref]);

  return progress;
}

/**
 * useHeroScrollAway — applies a cinematic scroll-away effect to hero content.
 * As the user scrolls, content fades up, scales slightly, and blurs.
 * @param {React.RefObject} heroRef — the hero section container
 * @param {React.RefObject} contentRef — the hero content to animate away
 * @param {React.RefObject} bgRef — the hero background to zoom
 */
export function useHeroScrollAway(heroRef, contentRef, bgRef) {
  useEffect(() => {
    if (typeof window === "undefined" || !heroRef.current) return;

    const ctx = gsap.context(() => {
      // Content fades up + scales
      if (contentRef?.current) {
        gsap.to(contentRef.current, {
          y: -80,
          opacity: 0,
          scale: 0.97,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "60% top",
            scrub: 1.2,
          },
        });
      }

      // Background zooms + dims
      if (bgRef?.current) {
        gsap.to(bgRef.current, {
          scale: 1.15,
          filter: "brightness(0.3) blur(4px)",
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [heroRef, contentRef, bgRef]);
}
