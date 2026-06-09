"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { communityCategories } from "@/lib/communityData";
import ClientToolkit from "@/components/ClientToolkit";
import { useOnScreen } from "@/hooks/useOnScreen";
import "@/styles/about.scss";

const communities = [
  { name: "GDG Community", social: [{ platform: "whatsapp", url: "#" }, { platform: "X", url: "#" }, { platform: "facebook", url: "#" }, { platform: "linkedin", url: "#" }, { platform: "instagram", url: "#" }, { platform: "Discord", url: "#" }] },
  { name: "Ancients",      social: [{ platform: "whatsapp", url: "#" }, { platform: "X", url: "#" }, { platform: "linkedin", url: "#" }, { platform: "Discord", url: "#" }] },
  { name: "Sui",           social: [{ platform: "whatsapp", url: "#" }, { platform: "X", url: "#" }, { platform: "linkedin", url: "#" }, { platform: "Discord", url: "#" }, { platform: "Telegram", url: "#" }] },
  { name: "Codex",         social: [{ platform: "whatsapp", url: "#" }, { platform: "X", url: "#" }, { platform: "facebook", url: "#" }, { platform: "linkedin", url: "#" }, { platform: "instagram", url: "#" }, { platform: "Discord", url: "#" }] },
];

const collaborators = [
  { name: "John Doe",    handle: "@johndoe", photo: "https://placehold.co/200x200/1E293B/a855f7?text=JD", collaboration: "Worked on E-commerce Platform, handled backend API development." },
  { name: "Jane Smith",  handle: "@janesmith", photo: "https://placehold.co/200x200/1E293B/06b6d4?text=JS", collaboration: "Collaborated on Data Dashboard, focused on data visualization." },
  { name: "Sam Wilson",  handle: "@samw", photo: "https://placehold.co/200x200/1E293B/34d399?text=SW", collaboration: "Team member for Task Management Tool, implemented real-time features." },
  { name: "Emily Clark", handle: "@emilyc", photo: "https://placehold.co/200x200/1E293B/f97316?text=EC", collaboration: "Assisted in frontend design for multiple projects." },
  { name: "David Lee",   handle: "@davidl", photo: "https://placehold.co/200x200/1E293B/60a5fa?text=DL", collaboration: "Contributed to database optimization in E-commerce Platform." },
  { name: "Alice Brown", handle: "@aliceb", photo: "https://placehold.co/200x200/1E293B/d946ef?text=AB", collaboration: "Worked on Python scripts for Data Dashboard analytics." },
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

function getSocialIcon(platform) {
  const icons = { x: "fab fa-twitter", linkedin: "fab fa-linkedin-in", facebook: "fab fa-facebook-f", whatsapp: "fab fa-whatsapp", instagram: "fab fa-instagram", discord: "fab fa-discord", telegram: "fab fa-telegram-plane" };
  return <i className={icons[platform.toLowerCase()] ?? "fas fa-link"} />;
}

function getCommunityIcon(name) {
  const map = { "gdg community": "fas fa-users", ancients: "fas fa-university", sui: "fas fa-seedling", codex: "fas fa-book-open" };
  return <i className={map[name.toLowerCase()] ?? "fas fa-globe"} />;
}

const yearsExp = (() => { const y = new Date().getFullYear() - 2022; return y > 0 ? y : 1; })();

export default function ClientAbout() {
  const [heroRef, heroVisible] = useOnScreen(0.01);
  const heroBgRef = useRef(null);
  const [introRef, introVisible] = useOnScreen(0.08);
  const [toolkitRef, toolkitVisible] = useOnScreen(0.08);
  const [collabRef, collabVisible] = useOnScreen(0.08);
  const [commRef, commVisible] = useOnScreen(0.08);
  const [memberRef, memberVisible] = useOnScreen(0.08);

  /* Parallax + mouse parallax */
  useEffect(() => {
    const handleScroll = () => {
      if (!heroBgRef.current) return;
      const scrolled = window.scrollY;
      heroBgRef.current.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0) scale(${1 + scrolled * 0.0003})`;
    };
    const handleMouse = (e) => {
      if (!heroBgRef.current || !heroRef.current) return;
      const xOff = (e.clientX / window.innerWidth - 0.5);
      const yOff = (e.clientY / window.innerHeight - 0.5);
      const s = window.scrollY;
      heroBgRef.current.style.transform = `translate3d(${xOff * -25}px, ${yOff * -25 + s * 0.3}px, 0) scale(1.04)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    heroRef.current?.addEventListener("mousemove", handleMouse);
    const hero = heroRef.current;
    return () => {
      window.removeEventListener("scroll", handleScroll);
      hero?.removeEventListener("mousemove", handleMouse);
    };
  }, [heroRef]);

  return (
    <div className="about-page">

      {/* ══════════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════════ */}
      <div
        ref={heroRef}
        className={`about-hero reveal-on-screen ${heroVisible ? "revealed" : ""}`}
      >
        <div ref={heroBgRef} className="about-hero-bg" />
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <p className="about-hero-label">The Human Behind the Code</p>
          <h1 className="about-hero-title">More About Me</h1>
          <p className="about-hero-sub">
            Full-Stack Engineer · Cloud Architect · Community Builder · {yearsExp}+ years crafting scalable systems
          </p>
        </div>
        {/* Floating avatar */}
        <div className="about-avatar-wrap">
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80"
            alt="Developer at work"
            className="about-avatar"
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════
          INTRO + BIO
      ══════════════════════════════════════════ */}
      <section
        ref={introRef}
        className={`about-section about-intro-grid reveal-on-screen ${introVisible ? "revealed" : ""}`}
      >
        <div className="about-bio">
          <h2 className="about-section-title">Who I Am</h2>
          <p>
            I am a passionate and results-driven full-stack software developer dedicated to crafting exceptional
            user experiences and robust, scalable backend systems. With a background in computer science, I've
            spent the last {yearsExp} years building and maintaining web applications for both startups and
            established companies — focusing on clean architecture, performance optimisation, and seamless UX.
          </p>

          {/* Quick facts */}
          <div className="bio-facts">
            {[
              { icon: "fa-solid fa-map-pin",        label: "Location",   value: "RS, Nigeria" },
              { icon: "fa-solid fa-briefcase",       label: "Experience", value: `${yearsExp}+ Years` },
              { icon: "fa-solid fa-graduation-cap",  label: "Education",  value: "B.S. in Computer Science" },
              { icon: "fa-brands fa-github",         label: "GitHub",     value: "github.com/Arigbo",   href: "https://github.com/Arigbo" },
              { icon: "fa-brands fa-linkedin",       label: "LinkedIn",   value: "ArigboJesse",          href: "https://linkedin.com/in/ArigboJesse" },
              { icon: "far fa-envelope",             label: "Email",      value: "arigbojesse@gmail.com", href: "mailto:arigbojesse@gmail.com" },
            ].map((fact) => (
              <div key={fact.label} className="bio-fact-row">
                <span className="bio-fact-icon">
                  <i className={fact.icon} />
                </span>
                <div>
                  <p className="bio-fact-label">{fact.label}</p>
                  {fact.href
                    ? <a href={fact.href} className="bio-fact-value link">{fact.value}</a>
                    : <p className="bio-fact-value">{fact.value}</p>
                  }
                </div>
              </div>
            ))}
          </div>

          <a href="/Resume.pdf" download className="cv-download-btn">
            <i className="fa-solid fa-file-arrow-down" />
            Download CV
          </a>
        </div>

        {/* Right — Timeline */}
        <div className="about-timeline">
          <h2 className="about-section-title">My Journey</h2>
          <div className="timeline">
            {timelineEvents.map((ev, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-year">{ev.year}</div>
                <div className="timeline-body">
                  <h4 className="timeline-title">{ev.title}</h4>
                  <p className="timeline-desc">{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TOOLKIT
      ══════════════════════════════════════════ */}
      <section
        ref={toolkitRef}
        className={`about-section about-toolkit reveal-on-screen ${toolkitVisible ? "revealed" : ""}`}
      >
        <h2 className="about-section-title centered">My Toolkit & Engineering Philosophy</h2>
        <p className="about-section-sub centered">
          I specialise in a modern, comprehensive tech stack — building end-to-end full-stack systems
          with clean architecture, transactional pipelines, and performance-first thinking.
        </p>
        <ClientToolkit toolkit={toolkit} />
      </section>

      {/* ══════════════════════════════════════════
          COLLABORATORS
      ══════════════════════════════════════════ */}
      <section
        ref={collabRef}
        className={`about-section reveal-on-screen ${collabVisible ? "revealed" : ""}`}
      >
        <h2 className="about-section-title centered">People I've Collaborated With</h2>
        <div className="collab-scroll-track">
          {collaborators.map((c, i) => (
            <div key={i} className="collab-card">
              <img src={c.photo} alt={c.name} className="collab-photo" />
              <div className="collab-info">
                <p className="collab-name">{c.name}</p>
                <p className="collab-handle">{c.handle}</p>
                <p className="collab-note">{c.collaboration}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COMMUNITY GALLERIES
      ══════════════════════════════════════════ */}
      <section
        ref={commRef}
        id="community"
        className={`about-section reveal-on-screen ${commVisible ? "revealed" : ""}`}
        style={{ scrollMarginTop: "5rem" }}
      >
        <h2 className="about-section-title centered">Connecting With Communities</h2>
        <p className="about-section-sub centered">
          My journey isn't just about code — it's about people. Explore galleries from meetups,
          hackathons, workshops, and virtual gatherings I've attended.
        </p>
        <div className="community-cat-grid">
          {communityCategories.map((cat) => (
            <Link key={cat.id} href={`/community/${cat.id}`} className="cat-card-link">
              <div className="cat-card">
                <div className="cat-card-img-wrap">
                  <img src={cat.coverImage} alt={cat.title} className="cat-card-img" loading="lazy" />
                  <div className="cat-card-overlay">
                    <i className={cat.icon} />
                  </div>
                </div>
                <div className="cat-card-body">
                  <h3 className="cat-card-title">{cat.title}</h3>
                  <p className="cat-card-desc">{cat.description}</p>
                  <span className="cat-card-cta">
                    Explore Gallery <i className="fas fa-arrow-right" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MEMBERSHIPS
      ══════════════════════════════════════════ */}
      <section
        ref={memberRef}
        className={`about-section reveal-on-screen ${memberVisible ? "revealed" : ""}`}
      >
        <h2 className="about-section-title centered">Active Memberships & Networks</h2>
        <div className="membership-grid">
          {communities.map((c, i) => (
            <div key={i} className="membership-card">
              <div className="membership-icon">{getCommunityIcon(c.name)}</div>
              <h4 className="membership-name">{c.name}</h4>
              <div className="membership-socials">
                {c.social.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="membership-social-btn"
                    aria-label={`${c.name} on ${s.platform}`}
                  >
                    {getSocialIcon(s.platform)}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
