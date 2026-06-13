"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { allProjects } from "@/lib/projectsData";
import { useOnScreen } from "@/hooks/useOnScreen";
import { useHeroScrollAway } from "@/hooks/useScrollProgress";
import { useStaggerReveal } from "@/hooks/useParallax";
import ThreeDCanvas from "@/components/ThreeDCanvas";
import "@/styles/projects.scss";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["All", "Full-Stack", "Frontend"];

function ProjectCard({ project, index }) {
  const [ref, isVisible] = useOnScreen(0.05);
  const cardRef = useRef(null);

  /* 3D tilt on hover */
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-8px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(800px) rotateY(0) rotateX(0) translateY(0)";
  };

  return (
    <Link
      ref={ref}
      href={`/projects/${project.id}`}
      className={`proj-card-link reveal-on-screen ${isVisible ? "revealed" : ""}`}
    >
      <article
        className="proj-card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Number badge */}
        <span className="proj-num">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Status chip */}
        <span className={`proj-status ${project.link ? "live" : "wip"}`}>
          <span className="status-dot" />
          {project.link ? "Live" : "In Dev"}
        </span>

        {/* Cover image */}
        <div className="proj-img-wrap">
          <img src={project.imageUrl} alt={project.title} loading="lazy" />
          <div className="proj-hover-overlay">
            <span className="proj-overlay-btn">
              View Case Study <i className="fa-solid fa-arrow-right" />
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="proj-body">
          <h3 className="proj-title">{project.title}</h3>
          <p className="proj-desc">{project.description}</p>

          <div className="proj-tags">
            {project.techStack.slice(0, 5).map((t, i) => (
              <span key={i} className="proj-tag">{t}</span>
            ))}
            {project.techStack.length > 5 && (
              <span className="proj-tag-more">+{project.techStack.length - 5}</span>
            )}
          </div>

          <span className="proj-read-more">
            Read Details <i className="fas fa-chevron-right" />
          </span>
        </div>
      </article>
    </Link>
  );
}

export default function ClientProjects() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const heroRef = useRef(null);
  const heroContentRef = useRef(null);
  const heroBgRef = useRef(null);
  const gridRef = useRef(null);

  const [controlsRef, controlsVisible] = useOnScreen(0.05);

  /* GSAP: Hero scroll-away */
  useHeroScrollAway(heroRef, heroContentRef, heroBgRef);

  /* GSAP: Staggered card reveals */
  useStaggerReveal(gridRef, ".proj-card-link", {
    start: "top 88%",
    stagger: 0.08,
    y: 50,
    duration: 0.7,
  });

  /* GSAP: Hero entrance + sticky controls */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Hero entrance
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(".projects-hero-label", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" })
        .fromTo(".projects-hero-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.2")
        .fromTo(".projects-hero-sub", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.2")
        .fromTo(".projects-hero-badge", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.2");

      // Floating code bracket shapes — parallax depth
      gsap.utils.toArray(".code-shape").forEach((shape, i) => {
        gsap.to(shape, {
          y: -60 - i * 20,
          ease: "none",
          scrollTrigger: {
            trigger: ".projects-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const filtered = allProjects.filter((p) => {
    const matchCat = filter === "All" || p.category === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.techStack.some((t) => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  return (
    <div className="projects-page">

      {/* ── Page Hero — Animated Gradient Mesh ── */}
      <div ref={heroRef} className="projects-hero">
        <div ref={heroBgRef} className="projects-hero-bg-wrap">
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
          </div>
          {/* Floating code bracket shapes */}
          <div className="projects-code-shapes">
            <span className="code-shape code-shape-1">&lt;/&gt;</span>
            <span className="code-shape code-shape-2">{ "{}" }</span>
            <span className="code-shape code-shape-3">( )</span>
            <span className="code-shape code-shape-4">[ ]</span>
          </div>
          <div className="hero-dot-grid" />
          <div className="projects-3d-wrap" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.6 }}>
            <ThreeDCanvas type="cube" />
          </div>
        </div>
        <div className="projects-hero-overlay" />
        <div className="projects-hero-content" ref={heroContentRef}>
          <p className="projects-hero-label">Portfolio</p>
          <h1 className="projects-hero-title">My Projects</h1>
          <p className="projects-hero-sub">
            A curated collection of web applications, platforms, and client tools I've engineered.
            Click any card to explore the full case study.
          </p>
          <div className="projects-hero-badge">
            <i className="fa-solid fa-layer-group" />
            <span>{allProjects.length} Projects</span>
          </div>
        </div>
      </div>

      {/* ── Filter & Search bar ── */}
      <div
        ref={controlsRef}
        className={`projects-controls reveal-on-screen ${controlsVisible ? "revealed" : ""}`}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}
      >
        <div className="projects-controls-left" style={{ display: "flex", gap: "1.25rem", flex: 1, flexWrap: "wrap", alignItems: "center" }}>
          {/* Search */}
          <div className="search-wrap" style={{ flex: 1, minWidth: "240px" }}>
            <i className="fas fa-search search-icon" />
            <input
              type="search"
              className="search-input"
              placeholder="Search by title, tech, or keyword…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search projects"
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch("")} aria-label="Clear search">
                <i className="fa-solid fa-xmark" />
              </button>
            )}
          </div>

          {/* Filter chips */}
          <div className="filter-chips" role="group" aria-label="Filter by category" style={{ margin: 0 }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`filter-chip ${filter === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="controls-3d-graphic" style={{ width: "55px", height: "55px", opacity: 0.5 }}>
          <ThreeDCanvas type="torus" />
        </div>
      </div>

      {/* Result count */}
      <p className="projects-count">
        Showing <strong>{filtered.length}</strong> of {allProjects.length} projects
        {search && <> matching "<em>{search}</em>"</>}
      </p>

      {/* ── Grid ── */}
      {filtered.length > 0 ? (
        <div
          ref={gridRef}
          className="projects-grid-full"
        >
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      ) : (
        <div className="projects-empty reveal-on-screen revealed">
          <i className="fa-solid fa-magnifying-glass" />
          <h3>No projects found</h3>
          <p>Try adjusting your search or filter.</p>
          <button className="gradient-button" onClick={() => { setSearch(""); setFilter("All"); }}>
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
