"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP-powered parallax for project detail hero.
 * Replaces the old manual window.scrollY approach with smooth ScrollTrigger.
 */
export default function ClientProjectHeroParallax() {
  const hasInit = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || hasInit.current) return;
    hasInit.current = true;

    // Small delay to ensure DOM is painted
    const timer = setTimeout(() => {
      const hero = document.querySelector(".proj-detail-hero");
      const bg = document.querySelector(".proj-detail-hero-bg");
      const content = document.querySelector(".proj-detail-title-panel");

      if (!hero || !bg) return;

      const ctx = gsap.context(() => {
        // Background parallax zoom
        gsap.to(bg, {
          y: 100,
          scale: 1.12,
          filter: "brightness(0.25) blur(3px)",
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        // Content scroll-away
        if (content) {
          gsap.to(content, {
            y: -50,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "70% top",
              scrub: 1,
            },
          });
        }

        // Mouse parallax on hero
        const handleMouse = (e) => {
          if (!bg) return;
          const xOff = (e.clientX / window.innerWidth - 0.5) * -15;
          const yOff = (e.clientY / window.innerHeight - 0.5) * -15;
          gsap.to(bg, {
            x: xOff,
            duration: 0.8,
            ease: "power2.out",
          });
        };

        hero.addEventListener("mousemove", handleMouse);

        // Cleanup mousemove on ScrollTrigger kill
        ScrollTrigger.addEventListener("kill", () => {
          hero.removeEventListener("mousemove", handleMouse);
        });
      });

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
