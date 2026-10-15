import Link from "next/link";
import { slugOf } from "@/lib/site";

/** Placeholder shown where a project has no real screenshot yet */
export function NoPreview({ project, className = "" }) {
  return (
    <div className={`no-preview ${className}`} role="img" aria-label={`No preview available for ${project.title}`}>
      <span className="no-preview-code mono">
        <span className="tk-prompt">❯</span> open ./{slugOf(project.title)}{"\n"}
        <span className="tk-com">// {project.repo === "private" ? "private project — no public preview" : "preview coming soon"}</span>
      </span>
    </div>
  );
}

/** A project rendered as a folder-ish window: path bar, screenshot, summary. */
export default function ProjectCard({ project, priority = false }) {
  const live = Boolean(project.link);
  const extra = project.techStack.length - 4;

  return (
    <Link href={`/projects/${project.id}`} className="pcard">
      <div className="pcard-bar">
        <i className="fa-solid fa-folder" aria-hidden="true" />
        <span className="pcard-path">{slugOf(project.title)}/</span>
        <span className={`status ${live ? "live" : "wip"}`}>{live ? "live" : "private"}</span>
      </div>

      <div className="pcard-img">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={`${project.title} preview`}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
          />
        ) : (
          <NoPreview project={project} />
        )}
      </div>

      <div className="pcard-body">
        <div className="pcard-meta">
          <span className="pcard-cat">{project.category}</span>
        </div>
        <h3 className="pcard-title">{project.title}</h3>
        <p className="pcard-desc">{project.description}</p>
        <div className="tags">
          {project.techStack.slice(0, 4).map((t) => (
            <span key={t} className="tag">{t.toLowerCase()}</span>
          ))}
          {extra > 0 && <span className="tag plain">+{extra}</span>}
        </div>
        <span className="pcard-cta">
          open <span className="dim">--details</span> <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
