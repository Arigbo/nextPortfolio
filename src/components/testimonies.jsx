"use client";

import React, { useState, useEffect, useRef } from "react";

const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayTimer = useRef(null);

  const testimonials = [
    {
      text: "Working with Jesse was an absolute pleasure. He took our vague ideas and transformed them into a beautiful, functional design that perfectly captured our brand. Their attention to detail and commitment to quality are truly impressive.",
      author: "Ralonic",
      title: "CEO, Ububa",
      socials: [],
    },
    {
      text: "I highly recommend Jesse for any project that requires a meticulous and skilled developer. They handled complex integrations with ease and delivered a robust, clean solution ahead of schedule. An absolute professional.",
      author: "John Smith",
      title: "Founder, Innovate Tech",
      socials: [],
    },
    {
      text: "The entire process was seamless. Jesse is an excellent communicator and made sure I was informed every step of the way. The final result for my website exceeded my expectations, and I've already received so many compliments on the design.",
      author: "Alex Chen",
      title: "Owner, Local Bakery",
      socials: [],
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (idx) => {
    setActiveIndex(idx);
  };

  useEffect(() => {
    if (isPaused) {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
      return;
    }

    autoPlayTimer.current = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [isPaused, activeIndex]);

  return (
    <section className="testimonial-section-container">
      <div 
        className="testimonial-carousel-viewport"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className="testimonial-carousel-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`testimonial-carousel-slide ${index === activeIndex ? "active" : ""}`}
            >
              <div className="testimonial-card">
                {/* Quote Icon SVG */}
                <div className="quote-icon-wrapper">
                  <h1>"</h1>
                </div>

                <p className="testimonial-text">{testimonial.text}</p>

                <div className="author-info">
                  <p className="author-name">{testimonial.author}</p>
                  <p className="author-title">{testimonial.title}</p>
                  <p className="author-socials">
                    {testimonial.socials.length > 0 ? (
                      testimonial.socials.map((item) => {
                        return (
                          <span key={item.socialName}>
                            <strong>{item.socialName}: </strong>
                            <a href={item.link} className="info-link">
                              {item.handle}
                            </a>
                          </span>
                        );
                      })
                    ) : (
                      <span>No socials available</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controllers */}
        <div className="controllers">
          <i className="fas fa-chevron-left" onClick={prevSlide} role="button" aria-label="Previous slide"></i>
          <i className="fas fa-chevron-right" onClick={nextSlide} role="button" aria-label="Next slide"></i>
        </div>

        {/* Pagination Dots */}
        <div className="testimonial-dots" role="tablist">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`testimonial-dot ${idx === activeIndex ? "active" : ""}`}
              onClick={() => goToSlide(idx)}
              role="tab"
              aria-selected={idx === activeIndex}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
