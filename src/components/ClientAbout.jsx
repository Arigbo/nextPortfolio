"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { communityCategories } from "@/lib/communityData";
import ClientToolkit from "@/components/ClientToolkit";
import { useOnScreen } from "@/hooks/useOnScreen";
import { useHeroScrollAway } from "@/hooks/useScrollProgress";
import { useStaggerReveal } from "@/hooks/useParallax";
import "@/styles/about.scss";

gsap.registerPlugin(ScrollTrigger);

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
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);
  const heroBgRef = useRef(null);
  const timelineRef = useRef(null);
  const communityGridRef = useRef(null);
  const memberGridRef = useRef(null);
  const collabTrackRef = useRef(null);

  const [introRef, introVisible] = useOnScreen(0.08);
  const [toolkitRef, toolkitVisible] = useOnScreen(0.08);
  const [collabRef, collabVisible] = useOnScreen(0.08);
  const [commRef, commVisible] = useOnScreen(0.08);
  const [memberRef, memberVisible] = useOnScreen(0.08);

  /* GSAP: Hero scroll-away */
  useHeroScrollAway(heroRef, heroContentRef, heroBgRef);

  /* GSAP: Community cards stagger */
  useStaggerReveal(communityGridRef, ".cat-card-link", {
    start: "top 85%",
    stagger: 0.1,
    y: 50,
  });

  /* GSAP: Membership cards stagger */
  useStaggerReveal(memberGridRef, ".membership-card", {
    start: "top 85%",
    stagger: 0.08,
    y: 40,
  });

  /* GSAP: Hero entrance + timeline reveals */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Hero entrance timeline
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(".about-hero-label", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" })
        .fromTo(".about-hero-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.2")
        .fromTo(".about-hero-sub", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.2")
        .fromTo(".about-avatar-wrap", { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }, "-=0.3");

      // Timeline items — staggered from alternating sides
      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll(".timeline-item");
        items.forEach((item, i) => {
          const fromX = i % 2 === 0 ? -30 : 30;
          gsap.fromTo(
            item,
            { x: fromX, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }

      // Bio facts reveal
      gsap.utils.toArray(".bio-fact-row").forEach((row, i) => {
        gsap.fromTo(
          row,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Collaborator cards — horizontal scroll linked to vertical scroll
      if (collabTrackRef.current) {
        const track = collabTrackRef.current;
        const scrollWidth = track.scrollWidth - track.clientWidth;
        if (scrollWidth > 0) {
          gsap.to(track, {
            scrollLeft: scrollWidth,
            ease: "none",
            scrollTrigger: {
              trigger: track,
              start: "top 70%",
              end: "bottom 30%",
              scrub: 1.5,
            },
          });
        }
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-page">

      {/* ══════════════════════════════════════════
          HERO BANNER — Animated Gradient Mesh
      ══════════════════════════════════════════ */}
      <div ref={heroRef} className="about-hero">
        <div ref={heroBgRef} className="about-hero-bg-wrap">
          <div className="gradient-mesh-bg">
            <div className="mesh-blob mesh-blob-1" />
            <div className="mesh-blob mesh-blob-2" />
            <div className="mesh-blob mesh-blob-3" />
          </div>
          <div className="hero-floating-shapes">
            <div className="shape shape-circle shape-1" />
            <div className="shape shape-hex shape-2" />
            <div className="shape shape-diamond shape-3" />
            <div className="shape shape-circle shape-4" />
            <div className="shape shape-hex shape-5" />
          </div>
          <div className="hero-dot-grid" />
        </div>
        <div className="about-hero-overlay" />
        <div className="about-hero-content" ref={heroContentRef}>
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
        <div className="about-timeline" ref={timelineRef}>
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
        <div className="collab-scroll-track" ref={collabTrackRef}>
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
        ref={(el) => { commRef.current = el; }}
        id="community"
        className={`about-section reveal-on-screen ${commVisible ? "revealed" : ""}`}
        style={{ scrollMarginTop: "5rem" }}
      >
        <h2 className="about-section-title centered">Connecting With Communities</h2>
        <p className="about-section-sub centered">
          My journey isn't just about code — it's about people. Explore galleries from meetups,
          hackathons, workshops, and virtual gatherings I've attended.
        </p>
        <div className="community-cat-grid" ref={communityGridRef}>
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
        ref={(el) => { memberRef.current = el; }}
        className={`about-section reveal-on-screen ${memberVisible ? "revealed" : ""}`}
      >
        <h2 className="about-section-title centered">Active Memberships & Networks</h2>
        <div className="membership-grid" ref={memberGridRef}>
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
