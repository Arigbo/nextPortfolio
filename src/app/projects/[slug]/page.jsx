import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { NoPreview } from "@/components/ProjectCard";
import { allProjects, techMap, projectPath } from "@/lib/projectsData";
import { SITE } from "@/lib/site";
import { pageMetadata, absoluteUrl, jsonLdScript } from "@/lib/seo";
import "@/styles/project-detail.scss";

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

/** Trim to ~155 chars on a word boundary so search results don't cut mid-word */
const metaDescription = (text, max = 155) =>
  text.length <= max ? text : `${text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,;:—–-]\s*$/, "")}…`;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return pageMetadata({
    title: project.title,
    description: metaDescription(project.description),
    path: projectPath(project),
    type: "article",
    ...(project.imageUrl && { image: { url: project.imageUrl, alt: `${project.title} screenshot` } }),
  });
}

/** JSON-LD for a project page: the work itself + its breadcrumb trail */
function projectJsonLd(project) {
  const url = absoluteUrl(projectPath(project));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        name: project.title,
        description: project.description,
        url,
        ...(project.imageUrl && { image: absoluteUrl(project.imageUrl) }),
        ...(project.link && { sameAs: project.link }),
        ...(project.github && { codeRepository: project.github }),
        keywords: project.techStack.join(", "),
        author: { "@id": `${SITE.url}/#person` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Projects", item: absoluteUrl("/projects") },
          { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
      },
    ],
  };
}

export default async function ProjectDetailsPage({ params }) {
  const { slug } = await params;
  const index = allProjects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = allProjects[index];
  const prev = allProjects[index - 1];
  const next = allProjects[index + 1];
  const live = Boolean(project.link);
  const host = project.link ? project.link.replace(/^https?:\/\//, "").replace(/\/$/, "") : null;

  return (
    <div className="page container detail">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(projectJsonLd(project)) }} />

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
              <Image src={project.imageUrl} alt={`${project.title} screenshot`} width={project.imageSize.width} height={project.imageSize.height} sizes="(min-width: 1180px) 1140px, 100vw" priority />
            </a>
          ) : (
            <div className="browser-view">
              <Image src={project.imageUrl} alt={`${project.title} screenshot`} width={project.imageSize.width} height={project.imageSize.height} sizes="(min-width: 1180px) 1140px, 100vw" priority />
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
          <Link href={projectPath(prev)} className="pager-link">
            <span className="pager-cmd mono"><i className="fa-solid fa-arrow-left" /> cd ../{prev.slug}</span>
            <span className="pager-title">{prev.title}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={projectPath(next)} className="pager-link next">
            <span className="pager-cmd mono">cd ../{next.slug} <i className="fa-solid fa-arrow-right" /></span>
            <span className="pager-title">{next.title}</span>
          </Link>
        ) : <span />}
      </nav>
    </div>
  );
}
