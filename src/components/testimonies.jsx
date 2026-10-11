"use client";

import React from "react";
import Reveal from "@/components/Reveal";

const testimonials = [
  {
    text: "Working with Jesse was an absolute pleasure. He took our vague ideas and transformed them into a beautiful, functional design that perfectly captured our brand. Their attention to detail and commitment to quality are truly impressive.",
    author: "Ralonic",
    title: "CEO",
    company: "Ububa",
    rating: 5,
  },
  {
    text: "I highly recommend Jesse for any project that requires a meticulous and skilled developer. They handled complex integrations with ease and delivered a robust, clean solution ahead of schedule. An absolute professional.",
    author: "John Smith",
    title: "Founder",
    company: "Innovate Tech",
    rating: 5,
  },
  {
    text: "The entire process was seamless. Jesse is an excellent communicator and made sure I was informed every step of the way. The final result for my website exceeded my expectations, and I've already received so many compliments on the design.",
    author: "Alex Chen",
    title: "Owner",
    company: "Local Bakery",
    rating: 5,
  },
];

/** Deterministic short "commit hash" so SSR and client agree */
function hashOf(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

/** Testimonials rendered as `git log` entries */
export default function TestimonialLog() {
  return (
    <div className="window gitlog">
      <div className="window-bar">
        <span className="dots"><i /><i /><i /></span>
        <span className="window-title">git log — {testimonials.length} commits</span>
      </div>
      <ol className="window-body gitlog-list">
        {testimonials.map((t, i) => (
          <Reveal as="li" key={t.author} delay={i * 90} className="gitlog-entry">
            <p className="gitlog-head">
              <span className="tk-str">commit {hashOf(t.text)}</span>
              {i === 0 && <span className="gitlog-ref"> (<span className="accent">HEAD -&gt; main</span>)</span>}
            </p>
            <p className="gitlog-author">
              <span className="dim">Author:</span> <strong>{t.author}</strong>{" "}
              <span className="dim">&lt;{t.title} @ {t.company}&gt;</span>
            </p>
            <p className="gitlog-rating" aria-label={`${t.rating} out of 5 stars`}>
              <span className="dim">Rating:</span> <span className="stars">{"★".repeat(t.rating)}</span>
            </p>
            <blockquote className="gitlog-msg">“{t.text}”</blockquote>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
