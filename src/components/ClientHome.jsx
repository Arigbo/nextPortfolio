"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";
import HeroStack from "@/components/HeroStack";
import ProjectShowcase from "@/components/ProjectShowcase";
import ScrollStatement from "@/components/ScrollStatement";
import { gsap, ScrollTrigger, MQ } from "@/lib/gsap";
import { allProjects, techStackData } from "@/lib/projectsData";
import { SITE } from "@/lib/site";
import "@/styles/home.scss";

// The hero's 3D stack holds four cards, listed back to front (the last sits in front)
const HERO_STACK = ["evolve", "quickdriverscard", "carekey", "lodger"];

// What the projects on this site actually are — the hero cycles through them
const BUILDS = ["student-housing marketplaces", "patient health-record platforms", "driver verification cards", "company websites"];

function useTypewriter(words, speed = 70, pause = 1800) {
  const [text, setText] = useState(words[0]);
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  // Start with the first phrase fully typed (good for SSR), then begin cycling
  useEffect(() => {
    const t = setTimeout(() => { setStarted(true); setIsDeleting(true); }, 3200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    const current = words[wordIdx % words.length];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setIsDeleting(true), pause);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") { setIsDeleting(false); setWordIdx((i) => i + 1); }
      }
    }, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIdx, words, speed, pause, started]);

  return text;
}

export default function ClientHome() {
  const building = useTypewriter(BUILDS);
  // Projects visitors can open and see — they power the 3D hero and "featured"
  const showcase = allProjects.filter((p) => p.link && p.imageUrl);
  const totalTech = techStackData.frontend.length + techStackData.backend.length + techStackData.extra.length;
  const home = useRef(null);

  // Scroll scenes: hero exit + marquee that reacts to scroll speed
  useEffect(() => {
    const root = home.current;
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      // Leaving the hero: copy lifts and fades, the 3D stack fans apart in depth
      const hero = root.querySelector(".hero");
      const exit = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
      gsap.to(root.querySelector(".hero-copy"), { yPercent: -18, opacity: 0.15, ease: "none", scrollTrigger: exit });
      gsap.to(root.querySelector(".stack3d"), { "--spread": 1, ease: "none", scrollTrigger: exit });

      // Marquee: steady loop that speeds up (and follows direction) with scroll velocity
      root.querySelector(".marquee-wrap").classList.add("is-js");
      const loops = gsap.utils.toArray(".marquee", root).map((row, i) =>
        gsap.fromTo(row, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: i % 2 ? 56 : 48, ease: "none", repeat: -1 })
      );
      let settle;
      const speed = ScrollTrigger.create({
        trigger: root.querySelector("#stack"),
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity() / 250;
          const boost = gsap.utils.clamp(-6, 6, v) || 0;
          loops.forEach((l) => l.timeScale(1 + Math.abs(boost)));
          settle?.kill();
          settle = gsap.to(loops, { timeScale: 1, duration: 1.2, ease: "power2.out", delay: 0.05 });
        },
      });

      return () => {
        speed.kill();
        root.querySelector(".marquee-wrap")?.classList.remove("is-js");
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="home" ref={home}>
      {/* ═══════════ HERO ═══════════ */}
      <section className="hero container" aria-label="Introduction">
        <div className="hero-copy">
          <p className="hero-kicker line" style={{ "--d": 0 }}>
            <span className="status live pulse">Available for work</span>
            <span className="hero-kicker-sep" aria-hidden="true">/</span>
            <span>{SITE.location}</span>
          </p>

          <h1 className="hero-title">
            {SITE.name.split(" ").map((word, i) => (
              <React.Fragment key={word}>
                {i > 0 && " "}
                <span className="hero-word-mask">
                  <span className="hero-word" style={{ "--w": i }}>{word}</span>
                </span>
              </React.Fragment>
            ))}
          </h1>

          <p className="hero-sub line" style={{ "--d": 3 }}>
            Full-stack software engineer. I build{" "}
            <span className="hero-rotator">
              {building}<span className="cursor" aria-hidden="true" />
            </span>
          </p>

          <p className="hero-desc line" style={{ "--d": 4 }}>
            Next.js, TypeScript and Firebase, end to end — from a Stripe-powered housing marketplace
            to a patient-owned health records platform.
          </p>

          <div className="hero-actions line" style={{ "--d": 5 }}>
            <Link href="/projects" className="btn btn-primary btn-lg" data-magnetic>
              View projects <i className="fa-solid fa-arrow-right" />
            </Link>
            <Link href="/contact" className="btn btn-lg" data-magnetic>
              Get in touch
            </Link>
            <a href={SITE.resume} download className="btn btn-ghost btn-lg">
              <i className="fa-solid fa-file-arrow-down" /> Resume
            </a>
          </div>

          <dl className="hero-stats line" style={{ "--d": 6 }}>
            <div><dt>Projects</dt><dd>{allProjects.length}</dd></div>
            <div><dt>Live in production</dt><dd>{showcase.length}</dd></div>
            <div><dt>Building since</dt><dd>{SITE.startYear}</dd></div>
          </dl>
        </div>

        <div className="hero-visual line" style={{ "--d": 2 }}>
          <HeroStack projects={HERO_STACK.map((slug) => showcase.find((p) => p.slug === slug)).filter(Boolean)} />
        </div>
      </section>

      {/* ═══════════ STATEMENT ═══════════ */}
      <section className="section container statement-section" aria-label="What I do">
        <p className="cmd-line mono"><span className="tk-prompt">❯</span> cat ./intro.txt</p>
        <ScrollStatement text="I build products end to end — from the database to the last pixel — for students, patients, learners and the businesses that serve them." />
      </section>

      {/* ═══════════ FEATURED PROJECTS (pinned 3D showcase) ═══════════ */}
      <section className="section" id="projects">
        <Reveal className="cmd-head container">
          <div>
            <p className="cmd-line"><span className="tk-prompt">❯</span>ls ./projects --featured</p>
            <SplitHeading text="Featured projects" />
            <p className="cmd-sub">A few systems I've designed and shipped. Open any one for the full case study.</p>
          </div>
          <Link href="/projects" className="text-link">
            All projects <i className="fa-solid fa-arrow-right" />
          </Link>
        </Reveal>

        <ProjectShowcase projects={showcase} />
      </section>

      {/* ═══════════ STACK ═══════════ */}
      <section className="section container" id="stack">
        <Reveal className="cmd-head">
          <div>
            <p className="cmd-line"><span className="tk-prompt">❯</span>cat package.json</p>
            <SplitHeading text="My stack" />
            <p className="cmd-sub">The languages, frameworks and infrastructure I build with day to day.</p>
          </div>
          <Link href="/about#toolkit" className="text-link">
            Full toolkit <i className="fa-solid fa-arrow-right" />
          </Link>
        </Reveal>

        <div className="marquee-wrap" aria-label={`${totalTech} technologies`}>
          {[
            [...techStackData.frontend, ...techStackData.extra],
            techStackData.backend,
          ].map((row, ri) => (
            <div key={ri} className={`marquee ${ri % 2 ? "marquee-reverse" : ""}`}>
              {/* rendered twice so the loop is seamless; the copy is hidden from screen readers */}
              {[0, 1].map((copy) => (
                <ul key={copy} className="marquee-track" aria-hidden={copy === 1 || undefined}>
                  {row.map((t) => (
                    <li key={t.name} className="tech-chip">
                      {t.logo ? (
                        <img src={t.logo} alt="" width={20} height={20} loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                      ) : (
                        <i className="fa-solid fa-cube" aria-hidden="true" />
                      )}
                      <span>{t.name}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
