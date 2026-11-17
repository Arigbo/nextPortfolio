"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Smooth, weighted scrolling (Lenis) driven by GSAP's ticker so scroll-scrubbed
 * scenes stay perfectly in sync. Off for reduced-motion visitors (native scroll).
 * Pauses whenever something locks the page (menu, command palette, photo viewer
 * set body overflow: hidden).
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -80 } });
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Follow scroll locks set elsewhere (they toggle body.style.overflow)
    const lockObserver = new MutationObserver(() => {
      if (document.body.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    });
    lockObserver.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    return () => {
      lockObserver.disconnect();
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // New page: start at the top (or the #hash) and re-measure every scroll scene
  useEffect(() => {
    const lenis = window.__lenis;
    if (lenis && !location.hash) lenis.scrollTo(0, { immediate: true });
    const t = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
