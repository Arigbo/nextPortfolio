import React from "react";
import Link from "next/link";
import { allProjects, techMap } from "@/lib/projectsData";
import "@/styles/project-detail.scss";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = allProjects.find((p) => p.id === id);
  if (!project) return { title: "Project Not Found", description: "The requested project could not be located." };
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      type: "article",
      title: `${project.title} | Arigbo Jesse Portfolio`,
      description: project.description,
      url: `https://arigbo-jesse.vercel.app/projects/${id}`,
      images: [{ url: project.imageUrl, alt: project.title }]
    },
    twitter: { card: "summary_large_image", title: `${project.title} | Arigbo Jesse Portfolio`, description: project.description, images: [project.imageUrl] }
  };
}

export default async function ProjectDetailsPage({ params }) {
  const { id } = await params;
  const project = allProjects.find((p) => p.id === id);
  const allProjectIds = allProjects.map((p) => p.id);
  const currentIndex = allProjectIds.indexOf(id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  if (!project) {
    return (
      <div className="proj-detail-page">
        <div className="proj-not-found">
          <i className="fa-solid fa-triangle-exclamation" />
          <h2>Project Not Found</h2>
          <p>The project you are looking for does not exist or has been moved.</p>
          <Link href="/projects">
            <button className="gradient-button">Back to Projects</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="proj-detail-page">

      {/* ════════════════════════════════════════
          FULL-BLEED HERO BANNER
      ════════════════════════════════════════ */}
      <div className="proj-detail-hero">
        <div
          className="proj-detail-hero-bg"
          style={{ backgroundImage: `url(${project.imageUrl})` }}
        />
        <div className="proj-detail-hero-overlay" />

        {/* Top breadcrumb */}
        <nav className="proj-breadcrumb" aria-label="Breadcrumb">
          <Link href="/projects">Projects</Link>
          <i className="fa-solid fa-chevron-right" />
          <span>{project.title}</span>
        </nav>

        {/* Bottom glass title panel */}
        <div className="proj-detail-title-panel">
          <span className="proj-detail-category">{project.category}</span>
          <h1 className="proj-detail-title">{project.title}</h1>
          <div className="proj-detail-actions-hero">
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="hero-action-btn primary">
                <i className="fas fa-external-link-alt" />
                View Live
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="hero-action-btn secondary">
                <i className="fab fa-github" />
                Source Code
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          CONTENT GRID
      ════════════════════════════════════════ */}
      <div className="proj-detail-body">

        {/* Left — main content */}
        <div className="proj-detail-left">

          {/* Overview */}
          <div className="proj-detail-card">
            <h2 className="proj-detail-card-title">
              <i className="fa-solid fa-file-lines" />
              Project Overview
            </h2>
            <p className="proj-detail-overview">{project.description}</p>
          </div>

          {/* Key features */}
          <div className="proj-detail-card">
            <h2 className="proj-detail-card-title">
              <i className="fa-solid fa-star" />
              Key Features & Accomplishments
            </h2>
            <ul className="proj-features-list">
              {project.features.map((f, i) => (
                <li key={i} className="proj-feature-item">
                  <span className="proj-feature-check">
                    <i className="fa-solid fa-check" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Right — sticky sidebar */}
        <aside className="proj-detail-sidebar">

          {/* Tech stack */}
          <div className="proj-sidebar-card">
            <h3 className="proj-sidebar-title">
              <i className="fa-solid fa-microchip" />
              Tech Stack
            </h3>
            <div className="proj-tech-grid">
              {project.techStack.map((t, i) => (
                <div key={i} className="proj-tech-chip">
                  {techMap?.[t.toLowerCase()] && (
                    <img src={techMap[t.toLowerCase()]} alt={t} width={18} height={18} />
                  )}
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project links */}
          <div className="proj-sidebar-card">
            <h3 className="proj-sidebar-title">
              <i className="fa-solid fa-link" />
              Project Links
            </h3>
            <div className="proj-link-btns">
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="proj-link-btn gradient-button">
                  <i className="fas fa-external-link-alt" />
                  View Live Site
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="proj-link-btn github-btn">
                  <i className="fab fa-github" />
                  Source Code
                </a>
              )}
              {project.docs && (
                <a href={project.docs} target="_blank" rel="noopener noreferrer" className="proj-link-btn docs-btn">
                  <i className="fas fa-book" />
                  Documentation
                </a>
              )}
            </div>
          </div>

        </aside>
      </div>

      {/* ════════════════════════════════════════
          PREV / NEXT NAV
      ════════════════════════════════════════ */}
      <div className="proj-nav-row">
        {prevProject ? (
          <Link href={`/projects/${prevProject.id}`} className="proj-nav-btn prev">
            <i className="fa-solid fa-arrow-left" />
            <div>
              <span className="proj-nav-label">Previous</span>
              <span className="proj-nav-name">{prevProject.title}</span>
            </div>
          </Link>
        ) : <div />}

        {nextProject ? (
          <Link href={`/projects/${nextProject.id}`} className="proj-nav-btn next">
            <div style={{ textAlign: "right" }}>
              <span className="proj-nav-label">Next</span>
              <span className="proj-nav-name">{nextProject.title}</span>
            </div>
            <i className="fa-solid fa-arrow-right" />
          </Link>
        ) : <div />}
      </div>

    </div>
  );
}
