"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";
import ProjectCard from "@/components/ProjectCard";
import { allProjects } from "@/lib/projectsData";
import { gsap } from "@/lib/gsap";
import "@/styles/projects.scss";

const FILTERS = [
  { value: "All", flag: "--all" },
  { value: "Full-Stack", flag: "--full-stack" },
  { value: "Frontend", flag: "--frontend" },
];

export default function ClientProjects() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allProjects.filter((p) => {
      const matchCat = filter === "All" || p.category === filter;
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [filter, search]);

  // Three-column layout on wide screens: columns drift at different speeds while scrolling
  const grid = useRef(null);
  useEffect(() => {
    if (!grid.current) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1000px) and (prefers-reduced-motion: no-preference)", () => {
      const speeds = [0, 60, -30]; // px of travel per column across the grid's scroll range
      grid.current.querySelectorAll(".drift").forEach((el) => {
        const travel = speeds[Number(el.dataset.col)] ?? 0;
        if (!travel) return;
        gsap.fromTo(el, { y: travel / 2 }, {
          y: -travel / 2,
          ease: "none",
          scrollTrigger: { trigger: grid.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, [filter, search]);

  const countFor = (value) =>
    value === "All" ? allProjects.length : allProjects.filter((p) => p.category === value).length;

  return (
    <div className="page container projects-page">
      <Reveal className="cmd-head">
        <div>
          <p className="cmd-line"><span className="tk-prompt">❯</span>ls -la ./projects</p>
          <SplitHeading as="h1" text="Projects" />
          <p className="cmd-sub">
            Web applications, platforms and client sites I've built — from a student-housing
            marketplace to a patient–doctor portal. Open any project for the full case study.
          </p>
        </div>
        <p className="projects-total mono">
          <span className="dim">total</span> <span className="bright">{allProjects.length}</span>
        </p>
      </Reveal>

      {/* ── Controls ── */}
      <Reveal className="projects-controls" delay={80}>
        <label className="grep">
          <span className="grep-prefix" aria-hidden="true">
            <span className="tk-prompt">❯</span> grep -i
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='"title, tech or keyword"'
            aria-label="Search projects"
            spellCheck={false}
          />
          {search && (
            <button className="grep-clear" onClick={() => setSearch("")} aria-label="Clear search">
              <i className="fa-solid fa-xmark" />
            </button>
          )}
        </label>

        <div className="flags" role="group" aria-label="Filter by category">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`flag ${filter === f.value ? "active" : ""}`}
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
            >
              {f.flag} <span className="flag-count">{countFor(f.value)}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <p className="projects-result mono" aria-live="polite">
        <span className="tk-com"># {filtered.length} {filtered.length === 1 ? "result" : "results"}</span>
        {search && <span className="dim"> for "{search}"</span>}
      </p>

      {filtered.length > 0 ? (
        // keyed by the query so the matching cards animate back in after each filter/search
        <div className="project-grid" key={`${filter}|${search}`} ref={grid}>
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 80} className="project-grid-item">
              <div className="drift" data-col={i % 3}>
                <ProjectCard project={p} />
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="window empty-state">
          <div className="window-bar">
            <span className="dots"><i /><i /><i /></span>
            <span className="window-title">zsh</span>
          </div>
          <div className="window-body">
            <p className="code">
              <span className="tk-prompt">❯</span> grep -i "{search}" ./projects{"\n"}
              <span className="err">grep: no matches found</span>
            </p>
            <button className="btn" onClick={() => { setSearch(""); setFilter("All"); }}>
              <i className="fa-solid fa-rotate-left" /> Clear filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
