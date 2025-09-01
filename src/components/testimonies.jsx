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
      <button onClick={() => swiper.slideNext()}>
        Slide to the next slide
      </button>
    );
  }
    function SlidePrevButton() {
    const swiper = useSwiper();

    return (
      <button onClick={() => swiper.slidePrev()}>
        Slide to the previous slide
      </button>
    );
  }
  const testimonials = [
    {
      text: "Working with [Your Name] was an absolute pleasure. They took our vague ideas and transformed them into a beautiful, functional design that perfectly captured our brand. Their attention to detail and commitment to quality are truly impressive.",
      author: "Jane Doe",
      title: "CEO, Creative Solutions",
    },
    {
      text: "I highly recommend [Your Name] for any project that requires a meticulous and skilled developer. They handled complex integrations with ease and delivered a robust, clean solution ahead of schedule. An absolute professional.",
      author: "John Smith",
      title: "Founder, Innovate Tech",
    },
    {
      text: "The entire process was seamless. [Your Name] is an excellent communicator and made sure I was informed every step of the way. The final result for my website exceeded my expectations, and I've already received so many compliments on the design.",
      author: "Alex Chen",
      title: "Owner, Local Bakery",
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
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25 0V50H0V0H25ZM100 0V50H75V0H100Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                <p className="testimonial-text">{testimonial.text}</p>

                <div className="author-info">
                  <p className="author-name">{testimonial.author}</p>
                  <p className="author-title">{testimonial.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          {/* <SlidePrevButton></SlidePrevButton>
           <SlideNextButton></SlideNextButton> */}
        </Swiper>
       
      </section>
    </>
  );
};

export default TestimonialCarousel;
