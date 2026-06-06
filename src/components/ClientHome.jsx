"use client";

import React, { useContext, useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Context } from "@/components/context";
import TestimonialSection from "@/components/testimonies";
import { allProjects, techStackData } from "@/lib/projectsData";
import { useOnScreen } from "@/hooks/useOnScreen";

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

export default function ClientHome() {
  const { setIsContactModalOpen } = useContext(Context);
  const heroRef = useRef(null);
  const heroBgRef = useRef(null);
  const role = useTypewriter(ROLES);

  const [projectsSecRef, projectsVisible] = useOnScreen(0.08);
  const [stackSecRef, stackVisible] = useOnScreen(0.08);
  const [testisSecRef, testisVisible] = useOnScreen(0.08);

  const featuredProjects = allProjects.slice(0, 3);
  const totalProjects = allProjects.length;
  const yearsExp = new Date().getFullYear() - 2022 || 1;
  const totalTech = techStackData.frontend.length + techStackData.backend.length;

  /* Parallax + mouse parallax */
  useEffect(() => {
    const handleScroll = () => {
      if (!heroBgRef.current) return;
      const scrolled = window.scrollY;
      heroBgRef.current.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0) scale(${1 + scrolled * 0.0003})`;
    };
    const handleMouse = (e) => {
      if (!heroBgRef.current || !heroRef.current) return;
      const xOff = (e.clientX / window.innerWidth - 0.5);
      const yOff = (e.clientY / window.innerHeight - 0.5);
      const s = window.scrollY;
      heroBgRef.current.style.transform = `translate3d(${xOff * -25}px, ${yOff * -25 + s * 0.3}px, 0) scale(1.04)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    heroRef.current?.addEventListener("mousemove", handleMouse);
    const hero = heroRef.current;
    return () => {
      window.removeEventListener("scroll", handleScroll);
      hero?.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  const allTech = [...techStackData.frontend, ...techStackData.backend];

  return (
    <div className="portfolio">
      <main className="home-main">

        {/* ═══════════════════════════════════════
            HERO — Split layout
        ═══════════════════════════════════════ */}
        <section ref={heroRef} id="home" className="hero" aria-label="Introduction">
          <div className="hero-bg-container">
            <div ref={heroBgRef} className="hero-bg-image" />
            <div className="hero-overlay" />
          </div>

          <div className="hero-content">
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

              {/* Stats row */}
              <div className="hero-stats">
                {[
                  { value: `${totalProjects}+`, label: "Projects Built" },
                  { value: `${yearsExp}+`, label: "Years Coding" },
                  { value: `${totalTech}+`, label: "Technologies" },
                ].map((s) => (
                  <div key={s.label} className="stat-item">
                    <span className="stat-value">{s.value}</span>
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
                <pre className="code-snippet">{`const jesse = {
  name: "Arigbo Jesse",
  role: "Full-Stack Engineer",
  stack: [
    "Next.js", "React",
    "Node.js", "Firebase",
    "PostgreSQL", "Redis",
  ],
  passion: "Clean code &
            great UX",
  status: "Available 🚀",
};`}</pre>
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
          ref={projectsSecRef}
          id="projects"
          className={`home-section reveal-on-screen ${projectsVisible ? "revealed" : ""}`}
        >
          <div className="section-header">
            <p className="section-label">Selected Work</p>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-sub">
              A showcase of impactful web systems. Click any card for the full case study.
            </p>
          </div>

          <div className="projects-grid">
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
          ref={stackSecRef}
          id="stack"
          className={`home-section reveal-on-screen ${stackVisible ? "revealed" : ""}`}
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
          ref={testisSecRef}
          id="testimonials"
          className={`home-section reveal-on-screen ${testisVisible ? "revealed" : ""}`}
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
