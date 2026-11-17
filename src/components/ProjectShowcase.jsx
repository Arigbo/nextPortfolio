"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Tilt from "@/components/Tilt";
import { projectPath } from "@/lib/projectsData";
import { gsap, MQ } from "@/lib/gsap";

/**
 * Pinned 3D project showcase. On desktop the section pins while you scroll and
 * each project's screen swings out in 3D as the next swings in, with its details
 * changing alongside. On phones / reduced motion the same markup is a plain
 * stacked list, so nothing depends on the animation to be readable.
 */
export default function ProjectShowcase({ projects }) {
  const root = useRef(null);
  const bars = useRef([]);

  useEffect(() => {
    const el = root.current;
    const mm = gsap.matchMedia();

    mm.add(MQ.desktop, () => {
      el.classList.add("is-pinned");
      const slides = gsap.utils.toArray(".showcase-slide", el);
      const screens = slides.map((s) => s.querySelector(".showcase-screen"));
      const copies = slides.map((s) => s.querySelector(".showcase-copy"));
      const n = slides.length;

      // autoAlpha (opacity + visibility) so hidden slides can't catch clicks meant for the visible one
      gsap.set(screens.slice(1), { autoAlpha: 0, rotateX: 28, yPercent: 35, z: -260 });
      gsap.set(copies.slice(1), { autoAlpha: 0, y: 40 });

      const setProgress = (p) => {
        const active = Math.min(n - 1, Math.round(p * (n - 1)));
        bars.current.forEach((b, i) => b?.classList.toggle("is-active", i === active));
        el.style.setProperty("--progress", p);
      };
      setProgress(0);

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 1 },
        scrollTrigger: {
          trigger: el.querySelector(".showcase-pin"),
          pin: true,
          start: "top top",
          end: () => `+=${(n - 1) * innerHeight * 0.85}`,
          scrub: 0.7,
          snap: { snapTo: 1 / (n - 1), duration: { min: 0.25, max: 0.6 }, ease: "power2.inOut" },
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress),
        },
      });

      for (let i = 1; i < n; i++) {
        const at = i - 1;
        tl.to(screens[i - 1], { autoAlpha: 0, rotateX: -24, yPercent: -30, z: -260 }, at)
          .to(copies[i - 1], { autoAlpha: 0, y: -40, duration: 0.6 }, at)
          .to(screens[i], { autoAlpha: 1, rotateX: 0, yPercent: 0, z: 0 }, at)
          .to(copies[i], { autoAlpha: 1, y: 0, duration: 0.6 }, at + 0.4);
      }

      return () => el.classList.remove("is-pinned");
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="showcase" ref={root}>
      <div className="showcase-pin">
        <div className="container showcase-inner">
          <div className="showcase-slides">
            {projects.map((p, i) => (
              <article className="showcase-slide" key={p.id}>
                <div className="showcase-copy">
                  <p className="showcase-index mono">
                    <span className="bright">{String(i + 1).padStart(2, "0")}</span> / {String(projects.length).padStart(2, "0")}
                    <span className="showcase-cat">{p.category}</span>
                  </p>
                  <h3 className="showcase-title">{p.title}</h3>
                  <p className="showcase-desc">{p.description}</p>
                  <div className="tags">
                    {p.techStack.slice(0, 5).map((t) => <span key={t} className="tag">{t.toLowerCase()}</span>)}
                  </div>
                  <div className="showcase-actions">
                    <Link href={projectPath(p)} className="btn btn-primary" data-magnetic>
                      Case study <i className="fa-solid fa-arrow-right" />
                    </Link>
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                        <i className="fa-solid fa-arrow-up-right-from-square" /> Live site
                      </a>
                    )}
                  </div>
                </div>

                <div className="showcase-screen">
                  <Tilt as={Link} href={projectPath(p)} className="showcase-window window" max={4} data-cursor="View">
                    <span className="window-bar" aria-hidden="true">
                      <span className="dots"><i /><i /><i /></span>
                      <span className="window-title">{p.link.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                    </span>
                    <span className="showcase-shot">
                      <Image
                        src={p.imageUrl}
                        alt={`${p.title} screenshot`}
                        width={p.imageSize.width}
                        height={p.imageSize.height}
                        sizes="(min-width: 900px) 640px, 100vw"
                      />
                    </span>
                  </Tilt>
                </div>
              </article>
            ))}
          </div>

          <div className="showcase-progress" aria-hidden="true">
            {projects.map((p, i) => (
              <span key={p.id} ref={(b) => (bars.current[i] = b)} className="showcase-bar">
                <span>{p.title}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
