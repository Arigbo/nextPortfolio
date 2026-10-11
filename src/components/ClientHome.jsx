"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import TestimonialLog from "@/components/testimonies";
import { allProjects, techStackData } from "@/lib/projectsData";
import { SITE, yearsExp } from "@/lib/site";
import "@/styles/home.scss";

const ROLES = ["Full-Stack Engineer", "Cloud Architect", "UI/UX Craftsman", "Open-Source Advocate"];

function useTypewriter(words, speed = 70, pause = 1800) {
  const [text, setText] = useState(words[0]);
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  // Start with the first role fully typed (good for SSR), then begin cycling
  useEffect(() => {
    const t = setTimeout(() => { setStarted(true); setIsDeleting(true); }, 3200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    const current = words[wordIdx % words.length];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setIsDeleting(true), pause);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") { setIsDeleting(false); setWordIdx((i) => i + 1); }
      }
    }, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIdx, words, speed, pause, started]);

  return text;
}

const STACK_GROUPS = [
  { key: "frontend", items: techStackData.frontend },
  { key: "backend", items: techStackData.backend },
  { key: "tooling", items: techStackData.extra },
];

export default function ClientHome() {
  const role = useTypewriter(ROLES);
  const featured = allProjects.slice(0, 3);
  const totalTech = techStackData.frontend.length + techStackData.backend.length + techStackData.extra.length;

  return (
    <div className="home">
      {/* ═══════════ HERO ═══════════ */}
      <section className="hero container" aria-label="Introduction">
        <div className="window hero-term">
          <div className="window-bar">
            <span className="dots"><i /><i /><i /></span>
            <span className="window-title">{SITE.handle}@portfolio: ~</span>
            <span className="window-meta status live pulse">available</span>
          </div>

          <div className="window-body hero-body">
            <p className="line" style={{ "--d": 0 }}>
              <span className="tk-prompt">❯</span> whoami
            </p>
            <h1 className="hero-name line" style={{ "--d": 1 }}>
              {SITE.name}<span className="cursor" aria-hidden="true" />
            </h1>
            <p className="hero-role line" style={{ "--d": 2 }}>
              <span className="tk-com">// currently: </span>
              <span className="hero-role-text">{role}</span>
            </p>
            <p className="hero-desc line" style={{ "--d": 3 }}>
              I engineer high-performance web applications and cloud architectures — combining clean,
              scalable backends with creative, pixel-perfect frontends.
            </p>

            <p className="line hero-cmd" style={{ "--d": 4 }}>
              <span className="tk-prompt">❯</span> cat about.json
            </p>
            <pre className="code hero-json line" style={{ "--d": 5 }}>
              <span className="tk-punc">{"{"}</span>{"\n"}
              {"  "}<span className="tk-key">"role"</span><span className="tk-punc">: </span><span className="tk-str">"{SITE.role}"</span><span className="tk-punc">,</span>{"\n"}
              {"  "}<span className="tk-key">"location"</span><span className="tk-punc">: </span><span className="tk-str">"{SITE.location}"</span><span className="tk-punc">,</span>{"\n"}
              {"  "}<span className="tk-key">"experience"</span><span className="tk-punc">: </span><span className="tk-str">"{yearsExp}+ years"</span><span className="tk-punc">,</span>{"\n"}
              {"  "}<span className="tk-key">"projects_shipped"</span><span className="tk-punc">: </span><span className="tk-num">{allProjects.length}</span><span className="tk-punc">,</span>{"\n"}
              {"  "}<span className="tk-key">"technologies"</span><span className="tk-punc">: </span><span className="tk-num">{totalTech}</span><span className="tk-punc">,</span>{"\n"}
              {"  "}<span className="tk-key">"open_to_work"</span><span className="tk-punc">: </span><span className="tk-kw">true</span>{"\n"}
              <span className="tk-punc">{"}"}</span>
            </pre>

            <div className="hero-actions line" style={{ "--d": 6 }}>
              <span className="tk-prompt" aria-hidden="true">❯</span>
              <Link href="/projects" className="btn btn-primary">
                ./view-projects <i className="fa-solid fa-arrow-right" />
              </Link>
              <Link href="/contact" className="btn">
                ./contact.sh
              </Link>
              <a href={SITE.resume} download className="btn btn-ghost">
                <i className="fa-solid fa-file-arrow-down" /> resume.pdf
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURED PROJECTS ═══════════ */}
      <section className="section container" id="projects">
        <Reveal className="cmd-head">
          <div>
            <p className="cmd-line"><span className="tk-prompt">❯</span>ls ./projects --featured</p>
            <h2>Featured projects</h2>
            <p className="cmd-sub">A few systems I've designed and shipped. Open any one for the full case study.</p>
          </div>
          <Link href="/projects" className="text-link">
            cd ./projects <i className="fa-solid fa-arrow-right" />
          </Link>
        </Reveal>

        <div className="project-grid">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 90} className="project-grid-item">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════ STACK ═══════════ */}
      <section className="section container" id="stack">
        <Reveal className="cmd-head">
          <div>
            <p className="cmd-line"><span className="tk-prompt">❯</span>cat package.json</p>
            <h2>My stack</h2>
            <p className="cmd-sub">The languages, frameworks and infrastructure I build with day to day.</p>
          </div>
          <Link href="/about#toolkit" className="text-link">
            man toolkit <i className="fa-solid fa-arrow-right" />
          </Link>
        </Reveal>

        <Reveal className="window stack-window">
          <div className="window-bar">
            <span className="dots"><i /><i /><i /></span>
            <span className="window-title">package.json</span>
            <span className="window-meta">{totalTech} entries</span>
          </div>
          <div className="window-body stack-body">
            <p className="code">
              <span className="tk-punc">{"{"}</span>
            </p>
            <p className="code stack-name">
              {"  "}<span className="tk-key">"name"</span><span className="tk-punc">: </span><span className="tk-str">"{SITE.handle}"</span><span className="tk-punc">,</span>
            </p>
            {STACK_GROUPS.map((group, gi) => (
              <div key={group.key} className="stack-group">
                <p className="code">
                  {"  "}<span className="tk-key">"{group.key}"</span><span className="tk-punc">: [</span>
                </p>
                <div className="stack-items">
                  {group.items.map((t) => (
                    <span key={t.name} className="stack-item">
                      <img src={t.logo} alt="" width={16} height={16} loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                      <span className="tk-str">"{t.name}"</span>
                    </span>
                  ))}
                </div>
                <p className="code">
                  {"  "}<span className="tk-punc">]{gi < STACK_GROUPS.length - 1 ? "," : ""}</span>
                </p>
              </div>
            ))}
            <p className="code">
              <span className="tk-punc">{"}"}</span>
            </p>
          </div>
        </Reveal>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="section container" id="testimonials">
        <Reveal className="cmd-head">
          <div>
            <p className="cmd-line"><span className="tk-prompt">❯</span>git log --author=clients</p>
            <h2>What people say</h2>
            <p className="cmd-sub">Feedback from partners and clients I've shipped with.</p>
          </div>
        </Reveal>
        <TestimonialLog />
      </section>
    </div>
  );
}
