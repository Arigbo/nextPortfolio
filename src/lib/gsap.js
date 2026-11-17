"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once, client-side only
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/** Media conditions shared by every scroll scene */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 899px) and (prefers-reduced-motion: no-preference)",
};

export { gsap, ScrollTrigger };
