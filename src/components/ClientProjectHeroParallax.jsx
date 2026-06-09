"use client";

import { useEffect } from "react";

export default function ClientProjectHeroParallax() {
  useEffect(() => {
    const hero = document.querySelector(".proj-detail-hero");
    const bg = document.querySelector(".proj-detail-hero-bg");
    if (!hero || !bg) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      bg.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0) scale(${1 + scrolled * 0.0003})`;
    };

    const handleMouse = (e) => {
      const xOff = (e.clientX / window.innerWidth - 0.5);
      const yOff = (e.clientY / window.innerHeight - 0.5);
      const s = window.scrollY;
      bg.style.transform = `translate3d(${xOff * -25}px, ${yOff * -25 + s * 0.3}px, 0) scale(1.04)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    hero.addEventListener("mousemove", handleMouse);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      hero.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return null;
}
