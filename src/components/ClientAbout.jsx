"use client";

import React from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ClientToolkit from "@/components/ClientToolkit";
import { communityCategories } from "@/lib/communityData";
import { SITE, SOCIALS, yearsExp } from "@/lib/site";
import "@/styles/about.scss";

const communities = [
  { name: "GDG Community", social: [{ platform: "whatsapp", url: "#" }, { platform: "X", url: "#" }, { platform: "facebook", url: "#" }, { platform: "linkedin", url: "#" }, { platform: "instagram", url: "#" }, { platform: "Discord", url: "#" }] },
  { name: "Ancients",      social: [{ platform: "whatsapp", url: "#" }, { platform: "X", url: "#" }, { platform: "linkedin", url: "#" }, { platform: "Discord", url: "#" }] },
  { name: "Sui",           social: [{ platform: "whatsapp", url: "#" }, { platform: "X", url: "#" }, { platform: "linkedin", url: "#" }, { platform: "Discord", url: "#" }, { platform: "Telegram", url: "#" }] },
  { name: "Codex",         social: [{ platform: "whatsapp", url: "#" }, { platform: "X", url: "#" }, { platform: "facebook", url: "#" }, { platform: "linkedin", url: "#" }, { platform: "instagram", url: "#" }, { platform: "Discord", url: "#" }] },
];

const collaborators = [
  { name: "John Doe",    handle: "@johndoe",   collaboration: "Worked on E-commerce Platform, handled backend API development." },
  { name: "Jane Smith",  handle: "@janesmith", collaboration: "Collaborated on Data Dashboard, focused on data visualization." },
  { name: "Sam Wilson",  handle: "@samw",      collaboration: "Team member for Task Management Tool, implemented real-time features." },
  { name: "Emily Clark", handle: "@emilyc",    collaboration: "Assisted in frontend design for multiple projects." },
  { name: "David Lee",   handle: "@davidl",    collaboration: "Contributed to database optimization in E-commerce Platform." },
  { name: "Alice Brown", handle: "@aliceb",    collaboration: "Worked on Python scripts for Data Dashboard analytics." },
];

const timelineEvents = [
  { year: "2022", title: "First Production App", desc: "Shipped my first real-world full-stack application — a school management system handling 400+ students." },
  { year: "2023", title: "Firebase & Cloud", desc: "Dived deep into Firebase ecosystem — Firestore, Auth, Cloud Functions — building SaaS dashboards for clients." },
  { year: "2024", title: "Open Source & Payments", desc: "Contributed to open source, integrated Stripe and Paystack pipelines, adopted Redis caching for high-traffic APIs." },
  { year: "2025", title: "Senior Engineer", desc: "Leading architecture decisions, mentoring junior devs, and delivering large-scale platforms for startups." },
];

const toolkit = [
  "Next.js", "React", "Node.js", "Firebase", "Supabase", "PostgreSQL",
  "MongoDB", "Redis", "TypeScript", "Stripe", "Paystack", "Resend",
  "Tailwind CSS", "SCSS", "Docker", "Git", "REST APIs", "GraphQL",
];

const SOCIAL_ICONS = { x: "fa-brands fa-x-twitter", linkedin: "fa-brands fa-linkedin-in", facebook: "fa-brands fa-facebook-f", whatsapp: "fa-brands fa-whatsapp", instagram: "fa-brands fa-instagram", discord: "fa-brands fa-discord", telegram: "fa-brands fa-telegram" };

const FACTS = [
  { key: "location", value: SITE.location },
  { key: "experience", value: `${yearsExp}+ years` },
  { key: "education", value: "B.S. Computer Science" },
  { key: "focus", value: "Next.js · Node.js · Cloud" },
  { key: "github", value: "github.com/Arigbo", href: SOCIALS[0].href },
  { key: "email", value: SITE.email, href: `mailto:${SITE.email}` },
];

const initials = (name) => name.split(" ").map((w) => w[0]).join("").slice(0, 2);
const shortHash = (year, i) => `${(parseInt(year, 10) * 7919 + i * 104729).toString(16).slice(-7)}`;

export default function ClientAbout() {
  return (
    <div className="page container about">
      {/* ═══════════ INTRO ═══════════ */}
      <Reveal className="cmd-head">
        <div>
          <p className="cmd-line"><span className="tk-prompt">❯</span>cat about.md</p>
          <h1>About me</h1>
          <p className="cmd-sub">
            {SITE.role} · Cloud Architect · Community Builder — {yearsExp}+ years crafting scalable systems.
          </p>
        </div>
      </Reveal>

      <div className="intro-grid">
        <Reveal className="window">
          <div className="window-bar">
            <i className="fa-brands fa-markdown tone-blue" aria-hidden="true" />
            <span className="window-title" style={{ textAlign: "left" }}>about.md</span>
          </div>
          <div className="window-body">
            <h2 className="md-h"><span className="md-hash">##</span> whoami</h2>
            <p className="bio">
              I am a passionate and results-driven full-stack software developer dedicated to crafting
              exceptional user experiences and robust, scalable backend systems. With a background in
              computer science, I've spent the last {yearsExp} years building and maintaining web
              applications for both startups and established companies — focusing on clean architecture,
              performance optimisation, and seamless UX.
            </p>

            <h2 className="md-h"><span className="md-hash">##</span> facts</h2>
            <dl className="facts">
              {FACTS.map((f) => (
                <div key={f.key} className="fact">
                  <dt className="tk-key">{f.key}:</dt>
                  <dd>
                    {f.href ? (
                      <a href={f.href} className="fact-link" {...(f.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        {f.value}
                      </a>
                    ) : (
                      <span className="tk-str">{f.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="intro-actions">
              <a href={SITE.resume} download className="btn btn-primary">
                <i className="fa-solid fa-file-arrow-down" /> download resume.pdf
              </a>
              <Link href="/contact" className="btn">./contact.sh</Link>
            </div>
          </div>
        </Reveal>

        <Reveal className="window photo-window" delay={100}>
          <div className="window-bar">
            <i className="fa-regular fa-image tone-purple" aria-hidden="true" />
            <span className="window-title" style={{ textAlign: "left" }}>graduation.jpg</span>
            <span className="window-meta">preview</span>
          </div>
          <div className="photo-frame">
            <img src="/graduation.jpg" alt="Arigbo Jesse in graduation cap and gown" />
          </div>
          <p className="photo-caption mono">
            <span className="tk-com">// {SITE.name}, B.S. Computer Science</span>
          </p>
        </Reveal>
      </div>

      {/* ═══════════ JOURNEY ═══════════ */}
      <section className="section" id="journey">
        <Reveal className="cmd-head">
          <div>
            <p className="cmd-line"><span className="tk-prompt">❯</span>git log --graph --reverse</p>
            <h2>My journey</h2>
          </div>
        </Reveal>

        <Reveal className="window">
          <ol className="window-body graph">
            {timelineEvents.map((ev, i) => (
              <li key={ev.year} className="graph-item">
                <span className="graph-node" aria-hidden="true" />
                <p className="graph-head mono">
                  <span className="tk-str">{shortHash(ev.year, i)}</span>{" "}
                  <span className="graph-tag">(tag: <span className="accent">{ev.year}</span>)</span>
                </p>
                <h3 className="graph-title">{ev.title}</h3>
                <p className="graph-desc">{ev.desc}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* ═══════════ TOOLKIT ═══════════ */}
      <section className="section" id="toolkit">
        <Reveal className="cmd-head">
          <div>
            <p className="cmd-line"><span className="tk-prompt">❯</span>man toolkit</p>
            <h2>Toolkit & philosophy</h2>
            <p className="cmd-sub">
              A modern, end-to-end stack — clean architecture and performance-first thinking.
              Pick a tool to see what it does and where I've used it.
            </p>
          </div>
        </Reveal>
        <ClientToolkit toolkit={toolkit} />
      </section>

      {/* ═══════════ COLLABORATORS ═══════════ */}
      <section className="section" id="collaborators">
        <Reveal className="cmd-head">
          <div>
            <p className="cmd-line"><span className="tk-prompt">❯</span>cat CONTRIBUTORS</p>
            <h2>People I've collaborated with</h2>
          </div>
        </Reveal>

        <div className="contrib-grid">
          {collaborators.map((c, i) => (
            <Reveal key={c.handle} delay={(i % 3) * 70} className="contrib">
              <span className="contrib-avatar mono" aria-hidden="true">{initials(c.name)}</span>
              <div>
                <p className="contrib-name">{c.name} <span className="dim mono">{c.handle}</span></p>
                <p className="contrib-note">{c.collaboration}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════ COMMUNITY ═══════════ */}
      <section className="section" id="community">
        <Reveal className="cmd-head">
          <div>
            <p className="cmd-line"><span className="tk-prompt">❯</span>ls ~/community</p>
            <h2>Communities</h2>
            <p className="cmd-sub">
              My journey isn't just about code — it's about people. Galleries from meetups, hackathons,
              workshops and virtual gatherings.
            </p>
          </div>
        </Reveal>

        <div className="dir-grid">
          {communityCategories.map((cat, i) => (
            <Reveal key={cat.id} delay={(i % 3) * 80} className="project-grid-item">
              <Link href={`/community/${cat.id}`} className="dir-card">
                <div className="pcard-bar">
                  <i className="fa-solid fa-folder" aria-hidden="true" />
                  <span className="pcard-path">{cat.id}/</span>
                  <span className="dim mono dir-count">{cat.photos.length.toLocaleString()} files</span>
                </div>
                <div className="dir-img">
                  <img src={cat.coverImage} alt="" loading="lazy" />
                </div>
                <div className="dir-body">
                  <h3><i className={cat.icon} aria-hidden="true" /> {cat.title}</h3>
                  <p>{cat.description}</p>
                  <span className="pcard-cta">open gallery <i className="fa-solid fa-arrow-right" aria-hidden="true" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════ MEMBERSHIPS ═══════════ */}
      <section className="section" id="memberships">
        <Reveal className="cmd-head">
          <div>
            <p className="cmd-line"><span className="tk-prompt">❯</span>cat memberships.yml</p>
            <h2>Memberships & networks</h2>
          </div>
        </Reveal>

        <div className="member-grid">
          {communities.map((c, i) => (
            <Reveal key={c.name} delay={i * 70} className="window member">
              <div className="window-body">
                <p className="code">
                  <span className="tk-punc">- </span><span className="tk-key">name</span><span className="tk-punc">: </span>
                  <span className="tk-str">{c.name}</span>
                </p>
                <p className="code member-links-label">
                  {"  "}<span className="tk-key">links</span><span className="tk-punc">:</span>
                </p>
                <div className="member-links">
                  {c.social.map((s) => (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-btn"
                      aria-label={`${c.name} on ${s.platform}`}
                    >
                      <i className={SOCIAL_ICONS[s.platform.toLowerCase()] ?? "fa-solid fa-link"} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
