"use client";

import React, { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    text: "Working with Jesse was an absolute pleasure. He took our vague ideas and transformed them into a beautiful, functional design that perfectly captured our brand. Their attention to detail and commitment to quality are truly impressive.",
    author: "Ralonic",
    title: "CEO",
    company: "Ububa",
    rating: 5,
    avatar: "RA",
    avatarColor: "#0ea5e9",
  },
  {
    text: "I highly recommend Jesse for any project that requires a meticulous and skilled developer. They handled complex integrations with ease and delivered a robust, clean solution ahead of schedule. An absolute professional.",
    author: "John Smith",
    title: "Founder",
    company: "Innovate Tech",
    rating: 5,
    avatar: "JS",
    avatarColor: "#8b5cf6",
  },
  {
    text: "The entire process was seamless. Jesse is an excellent communicator and made sure I was informed every step of the way. The final result for my website exceeded my expectations, and I've already received so many compliments on the design.",
    author: "Alex Chen",
    title: "Owner",
    company: "Local Bakery",
    rating: 5,
    avatar: "AC",
    avatarColor: "#10b981",
  },
];

function StarRating({ count = 5 }) {
  return (
    <div className="t-stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <i key={i} className="fas fa-star" />
      ))}
    </div>
  );
}

const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState("next");
  const autoPlayTimer = useRef(null);

  const goTo = (idx, dir = "next") => {
    setDirection(dir);
    setActiveIndex(idx);
  };

  const nextSlide = () => {
    const next = (activeIndex + 1) % testimonials.length;
    goTo(next, "next");
  };

  const prevSlide = () => {
    const prev = (activeIndex - 1 + testimonials.length) % testimonials.length;
    goTo(prev, "prev");
  };

  useEffect(() => {
    if (isPaused) {
      clearInterval(autoPlayTimer.current);
      return;
    }
    autoPlayTimer.current = setInterval(nextSlide, 6000);
    return () => clearInterval(autoPlayTimer.current);
  }, [isPaused, activeIndex]);

  const t = testimonials[activeIndex];

  return (
    <section className="testimonial-section-container">
      {/* Decorative background blobs */}
      <div className="t-bg-blob t-bg-blob-1" aria-hidden="true" />
      <div className="t-bg-blob t-bg-blob-2" aria-hidden="true" />

      <div
        className="t-carousel-wrap"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Large decorative quote */}
        <div className="t-bg-quote" aria-hidden="true">&ldquo;</div>

        {/* Main card */}
        <div className="t-card" key={activeIndex}>
          {/* Star rating */}
          <StarRating count={t.rating} />

          {/* Quote text */}
          <blockquote className="t-text">
            &ldquo;{t.text}&rdquo;
          </blockquote>

          {/* Author */}
          <div className="t-author-row">
            <div
              className="t-avatar"
              style={{ background: `linear-gradient(135deg, ${t.avatarColor}33, ${t.avatarColor}66)`, borderColor: `${t.avatarColor}44`, color: t.avatarColor }}
            >
              {t.avatar}
            </div>
            <div className="t-author-info">
              <p className="t-author-name">{t.author}</p>
              <p className="t-author-role">
                {t.title} <span className="t-author-company">· {t.company}</span>
              </p>
            </div>
            <div className="t-company-badge">
              <i className="fas fa-building" />
              <span>{t.company}</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="t-nav">
          {/* Prev/Next buttons */}
          <button
            className="t-nav-btn"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <i className="fas fa-arrow-left" />
          </button>

          {/* Progress dots */}
          <div className="t-dots" role="tablist">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`View testimonial ${idx + 1}`}
                className={`t-dot ${idx === activeIndex ? "active" : ""}`}
                onClick={() => goTo(idx, idx > activeIndex ? "next" : "prev")}
              />
            ))}
          </div>

          <button
            className="t-nav-btn"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <i className="fas fa-arrow-right" />
          </button>
        </div>

        {/* Slide counter */}
        <p className="t-counter" aria-live="polite">
          {activeIndex + 1} / {testimonials.length}
        </p>
      </div>

      {/* Side preview thumbnails */}
      <div className="t-thumbs" aria-label="All testimonials">
        {testimonials.map((item, idx) => (
          <button
            key={idx}
            className={`t-thumb ${idx === activeIndex ? "active" : ""}`}
            onClick={() => goTo(idx, idx > activeIndex ? "next" : "prev")}
            aria-label={`Testimonial from ${item.author}`}
          >
            <div
              className="t-thumb-avatar"
              style={{ background: `linear-gradient(135deg, ${item.avatarColor}44, ${item.avatarColor}88)`, color: item.avatarColor }}
            >
              {item.avatar}
            </div>
            <div className="t-thumb-info">
              <p className="t-thumb-name">{item.author}</p>
              <p className="t-thumb-role">{item.company}</p>
            </div>
            <i className={`fas fa-chevron-right t-thumb-arrow`} />
          </button>
        ))}
      </div>
    </section>
  );
};

export default TestimonialCarousel;
