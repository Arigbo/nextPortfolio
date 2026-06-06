"use client";

import React, { useState } from "react";
import Link from "next/link";
import { allProjects } from "@/lib/projectsData";
import { useOnScreen } from "@/hooks/useOnScreen";
import "@/styles/projects.scss";

const CATEGORIES = ["All", "Full-Stack", "Frontend"];

function ProjectCard({ project, index }) {
  const [ref, isVisible] = useOnScreen(0.05);

  return (
    <Link
      ref={ref}
      href={`/projects/${project.id}`}
      className={`proj-card-link reveal-on-screen ${isVisible ? "revealed" : ""}`}
    >
      <article className="proj-card">
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

      {/* ── Page Hero ── */}
      <div className="projects-hero">
        <p className="projects-hero-label">Portfolio</p>
        <h1 className="projects-hero-title">My Projects</h1>
        <p className="projects-hero-sub">
          A curated collection of web applications, platforms, and client tools I've engineered.
          Click any card to explore the full case study.
        </p>
        <div className="projects-hero-badge">
          <i className="fa-solid fa-layer-group" />
          {allProjects.length} Projects
        </div>
      </div>

      {/* ── Filter & Search bar ── */}
      <div className="projects-controls">
        {/* Search */}
        <div className="search-wrap">
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
        <div className="filter-chips" role="group" aria-label="Filter by category">
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

      {/* Result count */}
      <p className="projects-count">
        Showing <strong>{filtered.length}</strong> of {allProjects.length} projects
        {search && <> matching "<em>{search}</em>"</>}
      </p>

      {/* ── Grid ── */}
      {filtered.length > 0 ? (
        <div className="projects-grid-full">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      ) : (
        <div className="projects-empty">
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
