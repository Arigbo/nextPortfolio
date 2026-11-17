"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, MQ } from "@/lib/gsap";

/**
 * Site-wide declarative scroll motion. Mark elements and they move with the scroll:
 *   data-parallax="0.2"   → drifts against the scroll; bigger = faster, negative = opposite
 *   data-parallax-img     → an image that pans and slightly zooms inside its (clipped) frame
 * Re-scans after every navigation. Off with reduced motion.
 * Don't put these on .reveal / .tilt elements — those already own `transform`.
 */
export default function ScrollScenes() {
  const pathname = usePathname();

  useEffect(() => {
    const mm = gsap.matchMedia();
    // let the new page render (and fonts settle) before measuring
    const t = setTimeout(() => {
      mm.add(MQ.motion, () => {
        gsap.utils.toArray("[data-parallax]").forEach((el) => {
          const speed = parseFloat(el.dataset.parallax) || 0.15;
          gsap.fromTo(
            el,
            { yPercent: speed * 40 },
            {
              yPercent: -speed * 40,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });

        gsap.utils.toArray("[data-parallax-img]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -7, scale: 1.14 },
            {
              yPercent: 7,
              scale: 1.14,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });
      });
      ScrollTrigger.refresh();
    }, 80);

    return () => {
      clearTimeout(t);
      mm.revert();
    };
  }, [pathname]);

  return null;
}
