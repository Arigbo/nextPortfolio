"use client";

import React, { useState } from "react";
import Reveal from "@/components/Reveal";
import { SITE, SOCIALS } from "@/lib/site";
import "@/styles/contact.scss";

const EMPTY = { name: "", email: "", subject: "", message: "" };
const MAX_MESSAGE = 1000;

export default function ClientContact() {
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  // No backend: compose the message in the visitor's own email app
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = form.subject || `Hello from ${form.name}`;
    const body = `${form.message}\n\n— ${form.name}\n${form.email}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="page container contact">
      <Reveal className="cmd-head">
        <div>
          <p className="cmd-line"><span className="tk-prompt">❯</span>./contact.sh</p>
          <h1>Let's build something.</h1>
          <p className="cmd-sub">
            Open for projects, collaborations and friendly chats. I usually reply within 24 hours.
          </p>
        </div>
      </Reveal>

      <div className="contact-grid">
        {/* ── Details ── */}
        <aside className="contact-side">
          <Reveal className="window">
            <div className="window-bar">
              <i className="fa-regular fa-file-lines tone-blue" aria-hidden="true" />
              <span className="window-title" style={{ textAlign: "left" }}>contact.txt</span>
            </div>
            <div className="window-body contact-info">
              <p className="status live pulse contact-avail">available for new projects</p>

              <div className="info-row">
                <span className="tk-key">email</span>
                <div className="info-val">
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                  <button className="copy-btn" onClick={copyEmail} aria-label="Copy email address">
                    <i className={copied ? "fa-solid fa-check" : "fa-regular fa-copy"} />
                  </button>
                </div>
              </div>
              <div className="info-row">
                <span className="tk-key">whatsapp</span>
                <div className="info-val">
                  <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">{SITE.phone}</a>
                </div>
              </div>
              <div className="info-row">
                <span className="tk-key">location</span>
                <div className="info-val"><span className="tk-str">{SITE.location}</span></div>
              </div>
              <div className="info-row">
                <span className="tk-key">response</span>
                <div className="info-val"><span className="tk-str">~24 hours</span></div>
              </div>
            </div>
          </Reveal>

          <Reveal className="socials" delay={80}>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social">
                <i className={s.icon} aria-hidden="true" />
                <span className="social-label">{s.label}</span>
                <span className="social-handle">{s.handle}</span>
                <i className="fa-solid fa-arrow-up-right-from-square social-arrow" aria-hidden="true" />
              </a>
            ))}
          </Reveal>
        </aside>

        {/* ── Form ── */}
        <Reveal className="window contact-form-window" delay={120}>
          <div className="window-bar">
            <span className="dots"><i /><i /><i /></span>
            <span className="window-title">new-message — zsh</span>
          </div>

          <div className="window-body">
            {sent ? (
              <div className="sent">
                <p className="code">
                  <span className="tk-prompt">❯</span> ./send --message{"\n"}
                  <span className="accent">✓ opening your email app with the message ready to send…</span>
                </p>
                <p className="sent-note">
                  Nothing opened? Email me directly at{" "}
                  <a href={`mailto:${SITE.email}`} className="fact-link">{SITE.email}</a>{" "}
                  or reach me on <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="fact-link">WhatsApp</a>.
                </p>
                <div className="sent-actions">
                  <button className="btn" onClick={copyEmail}>
                    <i className={copied ? "fa-solid fa-check" : "fa-regular fa-copy"} /> {copied ? "copied" : "copy email"}
                  </button>
                  <button className="btn btn-ghost" onClick={() => { setSent(false); setForm(EMPTY); }}>
                    <i className="fa-solid fa-rotate-left" /> new message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="term-form">
                <div className="term-row">
                  <label className="term-field">
                    <span className="term-label"><span className="tk-prompt">?</span> name:</span>
                    <input value={form.name} onChange={update("name")} placeholder="Ada Lovelace" autoComplete="name" required />
                  </label>
                  <label className="term-field">
                    <span className="term-label"><span className="tk-prompt">?</span> email:</span>
                    <input type="email" value={form.email} onChange={update("email")} placeholder="ada@example.com" autoComplete="email" required />
                  </label>
                </div>

                <label className="term-field">
                  <span className="term-label"><span className="tk-prompt">?</span> subject:</span>
                  <input value={form.subject} onChange={update("subject")} placeholder="Project inquiry" />
                </label>

                <label className="term-field">
                  <span className="term-label">
                    <span className="tk-prompt">?</span> message:
                    <span className="term-count">{form.message.length}/{MAX_MESSAGE}</span>
                  </span>
                  <textarea
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Hey Jesse, I'd like to collaborate on…"
                    rows={7}
                    maxLength={MAX_MESSAGE}
                    required
                  />
                </label>

                <div className="term-submit">
                  <button type="submit" className="btn btn-primary">
                    <i className="fa-solid fa-paper-plane" /> ./send --message
                  </button>
                  <span className="term-hint">opens in your email app</span>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
