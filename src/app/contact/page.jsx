"use client";
import React, { useState } from "react";
import { useOnScreen } from "@/hooks/useOnScreen";
import ThreeDCanvas from "@/components/ThreeDCanvas";
import "@/styles/contact.scss";

const SOCIALS = [
  { platform: "GitHub",    icon: "fab fa-github",      url: "https://github.com/Arigbo",           handle: "github.com/Arigbo"  },
  { platform: "LinkedIn",  icon: "fab fa-linkedin-in", url: "https://linkedin.com/in/ArigboJesse", handle: "in/ArigboJesse"     },
  { platform: "Twitter/X", icon: "fab fa-twitter",     url: "https://x.com/anc13nt2?s=09",         handle: "@anc13nt2"          },
  { platform: "WhatsApp",  icon: "fab fa-whatsapp",    url: "https://wa.me/2348109432202",          handle: "+234 810 943 2202"  },
];

export default function ContactPage() {
  const [form, setForm]           = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);
  const [focused, setFocused]     = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSending(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 4500);
  };

  const field = (name, label, type = "text", placeholder = "") => ({
    id: `contact-${name}`,
    name,
    type,
    placeholder,
    value: form[name],
    onChange:  (e) => setForm({ ...form, [name]: e.target.value }),
    onFocus:   () => setFocused(name),
    onBlur:    () => setFocused(""),
    className: `contact-input ${focused === name ? "focused" : ""} ${form[name] ? "has-value" : ""}`,
    required: true,
    "aria-label": label,
  });

  const [heroRef, heroVisible] = useOnScreen(0.01);
  const [gridRef, gridVisible] = useOnScreen(0.08);

  return (
    <div className="contact-page">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <div
        ref={heroRef}
        className={`contact-hero reveal-on-screen ${heroVisible ? "revealed" : ""}`}
        style={{ position: "relative", width: "100%", overflow: "hidden" }}
      >
        <div
          className="contact-3d-wrap"
          style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.22 }}
        >
          <ThreeDCanvas type="torus" />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <p className="contact-hero-label">
            <i className="fa-solid fa-envelope-open-text" style={{ fontSize: "0.7rem" }} />
            Get In Touch
          </p>
          <h1 className="contact-hero-title">
            Let's Build Something Incredible
          </h1>
          <p className="contact-hero-sub">
            Open for projects, collaborations, and friendly chats.
            I respond within 24 hours — let's make it happen.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════
          MAIN GRID
      ══════════════════════════════════════ */}
      <div
        ref={gridRef}
        className={`contact-grid reveal-on-screen ${gridVisible ? "revealed" : ""}`}
      >

        {/* ── Left panel ── */}
        <aside className="contact-left">

          {/* Availability badge */}
          <div className="avail-badge">
            <div className="avail-dot-wrap">
              <span className="avail-dot" />
              <span className="avail-ring" />
            </div>
            <div>
              <p className="avail-title">Currently Available</p>
              <p className="avail-sub">Response within 24 hours</p>
            </div>
          </div>

          {/* Contact pills */}
          <div className="contact-pills">
            {[
              { icon: "fas fa-envelope",       label: "Email",    value: "arigbojesse@gmail.com", href: "mailto:arigbojesse@gmail.com" },
              { icon: "fab fa-whatsapp",       label: "WhatsApp", value: "+234 810 943 2202",     href: "https://wa.me/2348109432202"   },
              { icon: "fas fa-location-dot",   label: "Location", value: "Rivers State, Nigeria", href: null                           },
            ].map((c) => (
              <div key={c.label} className="contact-pill">
                <span className="contact-pill-icon">
                  <i className={c.icon} />
                </span>
                <div>
                  <p className="contact-pill-label">{c.label}</p>
                  {c.href
                    ? <a href={c.href} className="contact-pill-value link">{c.value}</a>
                    : <p className="contact-pill-value">{c.value}</p>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* Social grid */}
          <div className="social-grid">
            {SOCIALS.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card"
                aria-label={`${s.platform} profile`}
              >
                <i className={s.icon} />
                <span className="social-name">{s.platform}</span>
                <span className="social-handle">{s.handle}</span>
              </a>
            ))}
          </div>
        </aside>

        {/* ── Right form ── */}
        <div className="contact-form-wrap">
          <div className="contact-form-header">
            <div>
              <h2 className="contact-form-heading">Send a Message</h2>
              <p className="contact-form-sub">Fill in the form and I'll get back to you.</p>
            </div>
            <div style={{ width: "52px", height: "52px", opacity: 0.55, flexShrink: 0 }}>
              <ThreeDCanvas type="sphere" />
            </div>
          </div>

          {submitted ? (
            <div className="contact-success">
              <div className="success-icon">
                <i className="fas fa-check-circle" />
              </div>
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out — I'll get back to you as soon as possible!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form" noValidate>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">Your Name</label>
                  <input {...field("name", "Your Name", "text", "John Doe")} />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">Email Address</label>
                  <input {...field("email", "Email Address", "email", "john@example.com")} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject" className="form-label">Subject</label>
                <input {...field("subject", "Subject", "text", "Project Inquiry")} />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  placeholder="Hey Jesse, I'd like to collaborate on…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused("")}
                  className={`contact-input contact-textarea ${focused === "message" ? "focused" : ""} ${form.message ? "has-value" : ""}`}
                  required
                  aria-label="Message"
                />
                <p className="char-count">{form.message.length} / 1000</p>
              </div>

              <button
                id="contact-send-btn"
                type="submit"
                className={`send-btn gradient-button ${sending ? "sending" : ""}`}
                disabled={sending}
              >
                {sending ? (
                  <>
                    <span className="send-spinner" />
                    Sending…
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
