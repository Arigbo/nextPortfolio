"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useParallax — applies scroll-driven Y translation to a ref element.
 * @param {React.RefObject} ref — element to parallax
 * @param {object} opts
 *   speed: multiplier (negative = opposite direction). Default 0.3
 *   scrub: GSAP scrub value (true or number). Default 1
 *   start: ScrollTrigger start. Default "top bottom"
 *   end: ScrollTrigger end. Default "bottom top"
 */
export function useParallax(ref, { speed = 0.3, scrub = 1, start = "top bottom", end = "bottom top" } = {}) {
  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    const el = ref.current;
    const yDistance = speed * 100;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -yDistance },
        {
          y: yDistance,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [ref, speed, scrub, start, end]);
}

/**
 * useParallaxBatch — staggers children of a container for a depth effect.
 * @param {React.RefObject} containerRef — parent container
 * @param {string} selector — CSS selector for children (e.g. ".card")
 * @param {object} opts
 */
export function useParallaxBatch(
  containerRef,
  selector,
  { stagger = 0.08, speed = 0.15, scrub = 1, start = "top 85%", end = "bottom 15%" } = {}
) {
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const children = containerRef.current.querySelectorAll(selector);
      if (!children.length) return;

      gsap.fromTo(
        children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            end,
            scrub,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, selector, stagger, speed, scrub, start, end]);
}

/**
 * useTextReveal — staggers a word-by-word reveal for headings.
 * The target element's text should be pre-wrapped in <span> tags.
 * @param {React.RefObject} ref — parent element containing word spans
 */
export function useTextReveal(ref, { start = "top 85%", stagger = 0.06 } = {}) {
  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    const ctx = gsap.context(() => {
      const words = ref.current.querySelectorAll(".word-reveal");
      if (!words.length) return;

      gsap.fromTo(
        words,
        { y: 40, opacity: 0, rotateX: -15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [ref, start, stagger]);
}

/**
 * useStaggerReveal — reveals children with stagger on scroll.
 */
export function useStaggerReveal(
  containerRef,
  selector,
  { start = "top 82%", stagger = 0.1, y = 50, duration = 0.7 } = {}
) {
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const els = containerRef.current.querySelectorAll(selector);
      if (!els.length) return;

      gsap.fromTo(
        els,
        { y, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, selector, start, stagger, y, duration]);
}
