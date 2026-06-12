"use client";

import React, { useContext, useRef, useEffect, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Context } from "@/components/context";
import TestimonialSection from "@/components/testimonies";
import { allProjects, techStackData } from "@/lib/projectsData";
import { useOnScreen } from "@/hooks/useOnScreen";
import { useHeroScrollAway } from "@/hooks/useScrollProgress";
import { useStaggerReveal } from "@/hooks/useParallax";

gsap.registerPlugin(ScrollTrigger);

/* Animated typing cursor for hero tagline */
const ROLES = ["Full-Stack Engineer", "Cloud Architect", "UI/UX Craftsman", "Open-Source Advocate"];

function useTypewriter(words, speed = 80, pause = 1800) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx % words.length];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setIsDeleting(true), pause);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setIsDeleting(false); setWordIdx((i) => i + 1); }
      }
    }, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIdx, words, speed, pause]);

  return text;
}

/* Animated counter hook */
function useCountUp(target, duration = 2, triggerRef) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!triggerRef?.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const step = (now) => {
            const elapsed = (now - start) / (duration * 1000);
            const progress = Math.min(elapsed, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(triggerRef.current);
    return () => observer.disconnect();
  }, [target, duration, triggerRef]);

  return count;
}

export default function ClientHome() {
  const { setIsContactModalOpen } = useContext(Context);
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);
  const heroBgRef = useRef(null);
  const role = useTypewriter(ROLES);

  const projectsGridRef = useRef(null);
  const stackSecRef = useRef(null);
  const testisSecRef = useRef(null);
  const statsRef = useRef(null);

  const [projectsSecRef, projectsVisible] = useOnScreen(0.08);
  const [stackVisRef, stackVisible] = useOnScreen(0.08);
  const [testisVisRef, testisVisible] = useOnScreen(0.08);

  const featuredProjects = allProjects.slice(0, 3);
  const totalProjects = allProjects.length;
  const yearsExp = new Date().getFullYear() - 2022 || 1;
  const totalTech = techStackData.frontend.length + techStackData.backend.length;

  // Animated counters
  const countProjects = useCountUp(totalProjects, 2, statsRef);
  const countYears = useCountUp(yearsExp, 1.5, statsRef);
  const countTech = useCountUp(totalTech, 2, statsRef);

  /* GSAP: Hero scroll-away effect */
  useHeroScrollAway(heroRef, heroContentRef, heroBgRef);

  /* GSAP: Staggered project card reveals */
  useStaggerReveal(projectsGridRef, ".project-card-link", {
    start: "top 85%",
    stagger: 0.12,
    y: 60,
    duration: 0.8,
  });

  /* GSAP: Section parallax depth */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Section header text reveals
      gsap.utils.toArray(".section-header").forEach((header) => {
        gsap.fromTo(
          header,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: header,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Tech ticker speed-linking to scroll velocity
      const ticker = document.querySelector(".tech-ticker-track");
      if (ticker) {
        ScrollTrigger.create({
          trigger: ".tech-ticker-wrapper",
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const velocity = Math.abs(self.getVelocity());
            const speedMultiplier = 1 + Math.min(velocity / 2000, 3);
            ticker.style.animationDuration = `${35 / speedMultiplier}s`;
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  /* GSAP: Hero entrance timeline */
  useEffect(() => {
    if (typeof window === "undefined" || !heroContentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(".avail-pill", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
        .fromTo(".hero-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.3")
        .fromTo(".hero-role", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.3")
        .fromTo(".hero-desc", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.2")
        .fromTo(".hero-buttons", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.2")
        .fromTo(".hero-stats", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.2")
        .fromTo(".code-card", { x: 40, opacity: 0, rotateY: -8 }, { x: 0, opacity: 1, rotateY: 0, duration: 0.8, ease: "power3.out" }, "-=0.5");
    }, heroContentRef);

    return () => ctx.revert();
  }, []);

  const allTech = [...techStackData.frontend, ...techStackData.backend];

  return (
    <div className="portfolio">
      <main className="home-main">

        {/* ═══════════════════════════════════════
            HERO — Split layout with animated gradient mesh
        ═══════════════════════════════════════ */}
        <section ref={heroRef} id="home" className="hero" aria-label="Introduction">
          {/* Animated gradient mesh background */}
          <div className="hero-bg-container" ref={heroBgRef}>
            <div className="gradient-mesh-bg">
              <div className="mesh-blob mesh-blob-1" />
              <div className="mesh-blob mesh-blob-2" />
              <div className="mesh-blob mesh-blob-3" />
            </div>
            <div className="hero-floating-shapes">
              <div className="shape shape-circle shape-1" />
              <div className="shape shape-hex shape-2" />
              <div className="shape shape-diamond shape-3" />
              <div className="shape shape-circle shape-4" />
              <div className="shape shape-hex shape-5" />
              <div className="shape shape-diamond shape-6" />
            </div>
            <div className="hero-dot-grid" />
            <div className="hero-mesh-overlay" />
          </div>

          <div className="hero-content" ref={heroContentRef}>
            {/* Left column */}
            <div className="hero-left">
              {/* Availability pill */}
              <div className="avail-pill">
                <span className="avail-dot" />
                Available for work
              </div>

              <h1 className="hero-title">
                Hello, I'm{" "}
                <span className="name">Arigbo Jesse</span>
              </h1>

              <p className="hero-role">
                <span className="role-text">{role}</span>
                <span className="cursor-blink" aria-hidden="true">|</span>
              </p>

              <p className="hero-desc">
                I engineer high-performance web applications and cloud architectures — combining clean scalable backends with creative, pixel-perfect frontends.
              </p>

              <div className="hero-buttons">
                <Link href="/contact">
                  <button className="gradient-button hero-cta-btn">
                    <i className="fa-solid fa-paper-plane" />
                    Let's Talk
                  </button>
                </Link>
                <Link href="/projects">
                  <button className="hero-ghost-btn">
                    View Projects
                    <i className="fa-solid fa-arrow-right" />
                  </button>
                </Link>
              </div>

              {/* Stats row — animated counters */}
              <div className="hero-stats" ref={statsRef}>
                {[
                  { value: countProjects, suffix: "+", label: "Projects Built" },
                  { value: countYears, suffix: "+", label: "Years Coding" },
                  { value: countTech, suffix: "+", label: "Technologies" },
                ].map((s) => (
                  <div key={s.label} className="stat-item">
                    <span className="stat-value">{s.value}{s.suffix}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column — decorative code block */}
            <div className="hero-right" aria-hidden="true">
              <div className="code-card">
                <div className="code-dots">
                  <span /><span /><span />
                </div>
                <pre className="code-snippet">
                  <span className="token-keyword">const</span> jesse = {"{"}
                  {"\n  "}<span className="token-property">name</span>: <span className="token-string">"Arigbo Jesse"</span>,
                  {"\n  "}<span className="token-property">role</span>: <span className="token-string">"Full-Stack Engineer"</span>,
                  {"\n  "}<span className="token-property">stack</span>: [
                  {"\n    "}<span className="token-string">"Next.js"</span>, <span className="token-string">"React"</span>,
                  {"\n    "}<span className="token-string">"Node.js"</span>, <span className="token-string">"Firebase"</span>,
                  {"\n    "}<span className="token-string">"PostgreSQL"</span>, <span className="token-string">"Redis"</span>,
                  {"\n  "}],
                  {"\n  "}<span className="token-property">passion</span>: <span className="token-string">"Clean code & great UX"</span>,
                  {"\n  "}<span className="token-property">status</span>: <span className="token-string">"Available 🚀"</span>,
                  {"\n"}{"}"};
                </pre>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <a href="#projects" className="scroll-indicator" aria-label="Scroll to projects">
            <i className="fa-solid fa-chevron-down" />
          </a>
        </section>

        {/* ═══════════════════════════════════════
            FEATURED PROJECTS
        ═══════════════════════════════════════ */}
        <section
          ref={(el) => { projectsSecRef.current = el; }}
          id="projects"
          className={`home-section parallax-section reveal-on-screen ${projectsVisible ? "revealed" : ""}`}
        >
          <div className="section-header">
            <p className="section-label">Selected Work</p>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-sub">
              A showcase of impactful web systems. Click any card for the full case study.
            </p>
          </div>

          <div className="projects-grid" ref={projectsGridRef}>
            {featuredProjects.map((project, i) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="project-card-link"
              >
                <article className="project-card">
                  <span className="card-number">0{i + 1}</span>

                  <div className="image-container">
                    <img src={project.imageUrl} alt={project.title} loading="lazy" />
                    <div className="handle-overlay">
                      <span className="detail-button">View Case Study <i className="fa-solid fa-arrow-right" /></span>
                    </div>
                  </div>

                  <div className="project-card-bottom">
                    <div>
                      <h3 className="project-name">{project.title}</h3>
                      <p className="line-clamp-3">{project.description}</p>
                    </div>
                    <div>
                      <div className="tech-tags">
                        {project.techStack.slice(0, 4).map((t, idx) => (
                          <span key={idx} className="tech-tag">{t}</span>
                        ))}
                      </div>
                      <div className="links">
                        <span className="link">
                          Read Details <i className="fas fa-chevron-right" />
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="section-cta">
            <Link href="/projects">
              <button className="gradient-button">
                Explore All Projects <i className="fas fa-arrow-right" />
              </button>
            </Link>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            TECH TICKER STRIP
        ═══════════════════════════════════════ */}
        <section
          ref={(el) => { stackVisRef.current = el; stackSecRef.current = el; }}
          id="stack"
          className={`home-section parallax-section reveal-on-screen ${stackVisible ? "revealed" : ""}`}
        >
          <div className="section-header">
            <p className="section-label">Expertise</p>
            <h2 className="section-title">My Tech Stack</h2>
            <p className="section-sub">
              The languages, frameworks, and infrastructure I build with daily.
            </p>
          </div>

          {/* Scrolling tech ticker */}
          <div className="tech-ticker-wrapper">
            <div className="tech-ticker-track">
              {[...allTech, ...allTech].map((tech, i) => (
                <div key={i} className="ticker-chip">
                  <img src={tech.logo} alt={tech.name} width={22} height={22} />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="section-cta">
            <Link href="/about">
              <button className="ghost-btn">
                View Full Toolkit & Journey
              </button>
            </Link>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            TESTIMONIALS
        ═══════════════════════════════════════ */}
        <section
          ref={(el) => { testisVisRef.current = el; testisSecRef.current = el; }}
          id="testimonials"
          className={`home-section parallax-section reveal-on-screen ${testisVisible ? "revealed" : ""}`}
        >
          <div className="section-header">
            <p className="section-label">Kind Words</p>
            <h2 className="section-title">Client Testimonials</h2>
          </div>
          <TestimonialSection />
        </section>

      </main>
    </div>
  );
}
