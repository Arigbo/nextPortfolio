import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { NoPreview } from "@/components/ProjectCard";
import { allProjects, techMap } from "@/lib/projectsData";
import { slugOf } from "@/lib/site";
import "@/styles/project-detail.scss";

export function generateStaticParams() {
  return allProjects.map((p) => ({ id: p.id }));
}

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
      ...(project.imageUrl && { images: [{ url: project.imageUrl, alt: project.title }] })
    },
    twitter: { card: project.imageUrl ? "summary_large_image" : "summary", title: `${project.title} | Arigbo Jesse Portfolio`, description: project.description, ...(project.imageUrl && { images: [project.imageUrl] }) }
  };
}

export default async function ProjectDetailsPage({ params }) {
  const { id } = await params;
  const index = allProjects.findIndex((p) => p.id === id);
  if (index === -1) notFound();

  const project = allProjects[index];
  const prev = allProjects[index - 1];
  const next = allProjects[index + 1];
  const slug = slugOf(project.title);
  const live = Boolean(project.link);
  const host = project.link ? project.link.replace(/^https?:\/\//, "").replace(/\/$/, "") : null;

  return (
    <div className="page container detail">
      {/* ── Header ── */}
      <Reveal className="detail-head">
        <nav className="crumbs mono" aria-label="Breadcrumb">
          <span className="tk-prompt">❯</span>
          <span className="dim">cd</span>
          <Link href="/">~</Link>/<Link href="/projects">projects</Link>/<span className="bright">{slug}</span>
        </nav>

        <h1 className="detail-title">{project.title}</h1>
        <p className="detail-tagline">{project.description}</p>

        <div className="detail-meta">
          <span className={`status ${live ? "live" : "wip"}`}>{live ? "live" : "not publicly deployed"}</span>
          <span className="detail-meta-item"><i className="fa-solid fa-layer-group" /> {project.category}</span>
          <span className="detail-meta-item"><i className="fa-solid fa-cubes" /> {project.techStack.length} technologies</span>
        </div>

        <div className="detail-actions">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <i className="fa-solid fa-arrow-up-right-from-square" /> open live site
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn">
              <i className="fa-brands fa-github" /> source
            </a>
          )}
          {project.repo === "private" && (
            <span className="btn btn-ghost btn-static">
              <i className="fa-solid fa-lock" /> private repository
            </span>
          )}
        </div>
      </Reveal>

      {/* ── Real screenshot in a browser frame, or an honest placeholder ── */}
      {project.imageUrl ? (
        <Reveal as="figure" className="window browser" delay={100}>
          <div className="window-bar">
            <span className="dots"><i /><i /><i /></span>
            {host && (
              <span className="browser-url">
                <i className="fa-solid fa-lock" aria-hidden="true" />
                {host}
              </span>
            )}
          </div>
          {project.link ? (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="browser-view" aria-label={`Open ${project.title} live site`}>
              <img src={project.imageUrl} alt={`${project.title} screenshot`} />
            </a>
          ) : (
            <div className="browser-view">
              <img src={project.imageUrl} alt={`${project.title} screenshot`} />
            </div>
          )}
        </Reveal>
      ) : (
        <Reveal className="window browser" delay={100}>
          <div className="window-bar">
            <span className="dots"><i /><i /><i /></span>
            <span className="window-title">preview</span>
          </div>
          <NoPreview project={project} className="no-preview-lg" />
        </Reveal>
      )}

      {/* ── README + sidebar ── */}
      <div className="detail-grid">
        <Reveal className="window readme">
          <div className="window-bar">
            <i className="fa-brands fa-markdown tone-blue" aria-hidden="true" />
            <span className="window-title" style={{ textAlign: "left" }}>README.md</span>
          </div>
          <div className="window-body">
            <h2 className="md-h"><span className="md-hash">#</span> Overview</h2>
            <p className="md-p">{project.description}</p>

            <h2 className="md-h"><span className="md-hash">##</span> Features</h2>
            <ul className="md-checklist">
              {project.features.map((f) => (
                <li key={f}>
                  <span className="md-box" aria-hidden="true"><i className="fa-solid fa-check" /></span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <aside className="detail-side">
          <Reveal className="window" delay={80}>
            <div className="window-bar">
              <i className="fa-solid fa-cube tone-green" aria-hidden="true" />
              <span className="window-title" style={{ textAlign: "left" }}>package.json</span>
            </div>
            <div className="window-body side-body">
              <p className="code"><span className="tk-key">"dependencies"</span><span className="tk-punc">: [</span></p>
              <ul className="dep-list">
                {project.techStack.map((t) => (
                  <li key={t}>
                    {techMap?.[t.toLowerCase()] ? (
                      <img src={techMap[t.toLowerCase()]} alt="" width={16} height={16} loading="lazy" />
                    ) : (
                      <i className="fa-solid fa-cube" aria-hidden="true" />
                    )}
                    <span className="tk-str">"{t}"</span>
                  </li>
                ))}
              </ul>
              <p className="code"><span className="tk-punc">]</span></p>
            </div>
          </Reveal>

          <Reveal className="window" delay={140}>
            <div className="window-bar">
              <i className="fa-solid fa-link tone-purple" aria-hidden="true" />
              <span className="window-title" style={{ textAlign: "left" }}>links</span>
            </div>
            <div className="window-body side-body side-links">
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="side-link">
                  <span className="dim">live</span><span className="side-link-val">{host}</span><i className="fa-solid fa-arrow-up-right-from-square" />
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="side-link">
                  <span className="dim">repo</span><span className="side-link-val">{project.github.replace("https://github.com/", "")}</span><i className="fa-brands fa-github" />
                </a>
              )}
              {project.repo === "private" && (
                <span className="side-link">
                  <span className="dim">repo</span><span className="side-link-val">private</span><i className="fa-solid fa-lock" />
                </span>
              )}
              {!project.link && !project.github && project.repo !== "private" && (
                <span className="side-link">
                  <span className="dim">status</span><span className="side-link-val">no public links yet</span>
                </span>
              )}
            </div>
          </Reveal>
        </aside>
      </div>

      {/* ── Prev / next ── */}
      <nav className="detail-pager" aria-label="More projects">
        {prev ? (
          <Link href={`/projects/${prev.id}`} className="pager-link">
            <span className="pager-cmd mono"><i className="fa-solid fa-arrow-left" /> cd ../{slugOf(prev.title)}</span>
            <span className="pager-title">{prev.title}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/projects/${next.id}`} className="pager-link next">
            <span className="pager-cmd mono">cd ../{slugOf(next.title)} <i className="fa-solid fa-arrow-right" /></span>
            <span className="pager-title">{next.title}</span>
          </Link>
        ) : <span />}
      </nav>
    </div>
  );
}
