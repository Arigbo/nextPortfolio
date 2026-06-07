"use client";

import React, { useState } from "react";
import Link from "next/link";
import { allProjects, techMap } from "@/lib/projectsData";

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

export default function ClientToolkit({ toolkit }) {
  const [activeTool, setActiveTool] = useState(null);

  // Helper to find projects using this tool
  const getUsedProjects = (toolName) => {
    return allProjects.filter((project) =>
      project.techStack.some(
        (tech) => tech.toLowerCase() === toolName.toLowerCase()
      )
    );
  };

  const currentProjects = activeTool ? getUsedProjects(activeTool) : [];
  const currentDescription = activeTool ? TOOL_DESCRIPTIONS[activeTool] : "";
  const currentCategory = activeTool ? TOOL_CATEGORIES[activeTool] : "";
  const currentLogo = activeTool ? techMap[activeTool.toLowerCase()] : null;

  return (
    <div className="toolkit-container">
      {/* Left side: Cloud of chips */}
      <div className="toolkit-left">
        <div className="toolkit-cloud">
          {toolkit.map((t) => {
            const isHovered = activeTool === t;
            const logoUrl = techMap[t.toLowerCase()];
            const hasProjects = getUsedProjects(t).length > 0;

            return (
              <button
                key={t}
                className={`toolkit-chip ${isHovered ? "active" : ""} ${
                  hasProjects ? "has-projects" : ""
                }`}
                onMouseEnter={() => setActiveTool(t)}
                onMouseLeave={() => setActiveTool(t)} // keep active or clear on leave? Let's keep the last hovered tool active for better reading, or clear.
                // Let's clear on mouse leave so it goes back to default state
                // Actually, let's keep last hovered active so user can click links easily, or keep it open unless they hover elsewhere.
                // If they hover out of the whole container we can reset it, or we can just leave it at the last hovered tool!
                // Let's reset on container mouse leave.
              >
                {logoUrl && (
                  <img
                    src={logoUrl}
                    alt={t}
                    className="chip-logo"
                    width={16}
                    height={16}
                  />
                )}
                <span className="chip-text">{t}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right side: Interactive glassmorphic details card */}
      <div className="toolkit-right">
        <div className={`toolkit-detail-card ${activeTool ? "has-content" : "empty"}`}>
          {activeTool ? (
            <div className="detail-card-content">
              <div className="detail-header">
                {currentLogo ? (
                  <div className="detail-logo-wrap">
                    <img src={currentLogo} alt={activeTool} className="detail-logo" />
                  </div>
                ) : (
                  <div className="detail-logo-wrap fallback">
                    <i className="fa-solid fa-code" />
                  </div>
                )}
                <div>
                  <span className="detail-category">{currentCategory}</span>
                  <h3 className="detail-title">{activeTool}</h3>
                </div>
              </div>

              <p className="detail-desc">{currentDescription}</p>

              <div className="detail-projects-section">
                <span className="projects-section-label">
                  <i className="fa-solid fa-diagram-project" />
                  Project Applications
                </span>
                
                {currentProjects.length > 0 ? (
                  <div className="detail-projects-list">
                    {currentProjects.map((p) => (
                      <Link key={p.id} href={`/projects/${p.id}`} className="detail-project-link">
                        <span className="project-badge">
                          <img src={p.imageUrl} alt={p.title} className="project-badge-img" />
                          <span className="project-badge-name">{p.title}</span>
                          <i className="fa-solid fa-chevron-right badge-arrow" />
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="no-projects-text">
                    Used across personal templates, custom scripting, database migrations, and general engineering tasks.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="detail-card-placeholder">
              <div className="placeholder-icon">
                <i className="fa-solid fa-hand-pointer animate-bounce" />
              </div>
              <h4>Interactive Stack Explorer</h4>
              <p>
                Hover over any tool in the cloud to discover where it was integrated, its role in the stack, and see real-world project applications.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
