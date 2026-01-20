import React, { useEffect, useRef } from "react";
// Import Swiper React components
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useSwiper } from "swiper/react";

const TestimonialCarousel = () => {
  function SlideNextButton() {
    const swiper = useSwiper();

    return (
      <i
        className="fas fa-chevron-right"
        onClick={() => swiper.slideNext()}
      ></i>
    );
  }
  function SlidePrevButton() {
    const swiper = useSwiper();

    return (
      <i className="fas fa-chevron-left" onClick={() => swiper.slidePrev()}></i>
    );
  }
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

  return (
    <>
      <section className="testimonial-section-container">
        <h2 className="section-title">What Our Clients Say</h2>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
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
            </SwiperSlide>
          ))}
          <div className="controllers">
            {" "}
            <SlidePrevButton></SlidePrevButton>
            <SlideNextButton></SlideNextButton>
          </div>
        </Swiper>
      </section>
    </>
  );
};

export default TestimonialCarousel;
