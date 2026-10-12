"use client";

import React, { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { allProjects, techMap } from "@/lib/projectsData";
import { slugOf } from "@/lib/site";

const TOOL_DESCRIPTIONS = {
  "Next.js": "Production-grade React framework for server-side rendering, static site generation, and building fast full-stack applications.",
  React: "Component-based declarative library for crafting high-performance, dynamic user interfaces.",
  "Node.js": "Chrome V8-powered JavaScript runtime for building scalable, async event-driven backend systems.",
  Firebase: "Google's backend-as-a-service suite, covering real-time database, OAuth, serverless functions, and hosting.",
  Supabase: "Open-source Firebase alternative leveraging PostgreSQL for relational real-time tables, auth, and storage.",
  PostgreSQL: "Advanced, enterprise-grade open-source relational database for transactional safety and complex queries.",
  MongoDB: "Document-oriented NoSQL database optimized for high-volume unstructured storage and flexibility.",
  Redis: "In-memory database used for high-speed caching, session management, and real-time message queuing.",
  TypeScript: "Strict syntactical superset of JavaScript adding compile-time type safety for robust engineering.",
  Stripe: "Universal online payment processing infrastructure for subscription billing and globally secure checkouts.",
  Paystack: "African payment gateway processing secure credit cards, mobile money, and local banking transfers.",
  Resend: "Modern transactional developer-first email platform for reliable delivery and custom component styling.",
  "Tailwind CSS": "Utility-first CSS framework for rapid UI styling with responsive utilities directly in markup.",
  SCSS: "Advanced CSS preprocessor extending styles with nested rules, mixins, variables, and module structures.",
  Docker: "Containerization platform packaging applications and environments for reliable development and shipping.",
  Git: "Distributed version control system to track source history and collaborate smoothly across development branches.",
  "REST APIs": "Architectural design pattern for client-server communication using standard stateless HTTP protocols.",
  GraphQL: "Declarative query language for APIs enabling clients to request exactly the data schemas they need.",
};

const TOOL_CATEGORIES = {
  "Next.js": "Framework",
  React: "Frontend Library",
  "Node.js": "Backend Runtime",
  Firebase: "Backend-as-a-Service",
  Supabase: "Backend-as-a-Service",
  PostgreSQL: "Database",
  MongoDB: "Database",
  Redis: "Caching / Database",
  TypeScript: "Language",
  Stripe: "Payments API",
  Paystack: "Payments API",
  Resend: "Communications API",
  "Tailwind CSS": "Styling Framework",
  SCSS: "CSS Preprocessor",
  Docker: "DevOps / Containers",
  Git: "Version Control",
  "REST APIs": "API Architecture",
  GraphQL: "Query Language",
};

const projectsUsing = (tool) =>
  allProjects.filter((p) => p.techStack.some((t) => t.toLowerCase() === tool.toLowerCase()));

/** Tool list on the left, a `man` page for the selected tool on the right. */
export default function ClientToolkit({ toolkit }) {
  const [active, setActive] = useState(toolkit[0]);
  const used = projectsUsing(active);
  const logo = techMap[active.toLowerCase()];

  return (
    <div className="toolkit">
      <Reveal className="window toolkit-list">
        <div className="window-bar">
          <i className="fa-solid fa-folder-tree tone-yellow" aria-hidden="true" />
          <span className="window-title" style={{ textAlign: "left" }}>ls ./toolkit</span>
          <span className="window-meta">{toolkit.length}</span>
        </div>
        <div className="window-body toolkit-items" role="listbox" aria-label="Tools">
          {toolkit.map((t) => {
            const count = projectsUsing(t).length;
            const src = techMap[t.toLowerCase()];
            return (
              <button
                key={t}
                role="option"
                aria-selected={active === t}
                className={`tool ${active === t ? "active" : ""}`}
                onClick={() => setActive(t)}
                onMouseEnter={() => setActive(t)}
                onFocus={() => setActive(t)}
              >
                {src ? <img src={src} alt="" width={16} height={16} onError={(e) => { e.currentTarget.style.visibility = "hidden"; }} /> : <i className="fa-solid fa-cube" aria-hidden="true" />}
                <span>{t}</span>
                {count > 0 && <span className="tool-count">{count}</span>}
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal className="window man" delay={100}>
        <div className="window-bar">
          <i className="fa-solid fa-book tone-blue" aria-hidden="true" />
          <span className="window-title" style={{ textAlign: "left" }}>man {active.toLowerCase().replace(/\s+/g, "-")}</span>
        </div>
        <div className="window-body man-body" aria-live="polite">
          <p className="man-section">NAME</p>
          <p className="man-text man-name">
            {logo && <img src={logo} alt="" width={22} height={22} />}
            <strong>{active}</strong> <span className="dim">— {TOOL_CATEGORIES[active] ?? "Tool"}</span>
          </p>

          <p className="man-section">DESCRIPTION</p>
          <p className="man-text">{TOOL_DESCRIPTIONS[active] ?? "Part of my everyday engineering toolkit."}</p>

          <p className="man-section">USED IN</p>
          {used.length > 0 ? (
            <ul className="man-text man-projects">
              {used.map((p) => (
                <li key={p.id}>
                  <Link href={`/projects/${p.id}`} className="man-project">
                    <i className="fa-solid fa-folder" aria-hidden="true" />
                    <span>{slugOf(p.title)}/</span>
                    <span className="dim">{p.title}</span>
                    <i className="fa-solid fa-arrow-right man-arrow" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="man-text dim">
              Used across personal templates, scripting, database migrations and general engineering work.
            </p>
          )}
        </div>
      </Reveal>
    </div>
  );
}
