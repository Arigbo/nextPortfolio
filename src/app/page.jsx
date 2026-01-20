"use client";
import { Context } from "@/components/context";
import TestimonialSection from "@/components/testimonies";
import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";

// Static data for the tech stack
const techStackData = {
  frontend: [
    {
      name: "React",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "JavaScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },

    {
      name: "TypeScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "SCSS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
    },
    {
      name: "HTML5",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "CSS3",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "Aos.Js",
      logo: "https://aosjs.dev/images/logo.png",
    },
    {
      name: "Axios",
      logo: "https://axios-http.com/assets/logo.svg",
    },
    {
      name: "Material UI",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
    },
    {
      name: "Webpack",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
    },
    {
      name: "Next.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "Date-fns",
      logo: "https://date-fns.org/img/favicon-32x32.png",
    },
  ],

  backend: [
    {
      name: "Node.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Express",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    },

    {
      name: "MongoDB",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "PostgreSQL",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "Postman",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    },
    {
      name: "Docker",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    },
    {
      name: "Firebase",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    },
    {
      name: "Supabase",
      logo: "https://seeklogo.com/images/S/supabase-logo-EEA3F1A0D1-seeklogo.com.png",
    },
    {
      name: "Jotai",
      logo: "https://jotai.org/static/favicon.ico",
    },
    {
      name: "Tanstack Query",
      logo: "https://tanstack.com/query/v4/img/favicon.png",
    },
  ],
  extra: [
    {
      name: "Git",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "GitHub",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },

    {
      name: "Jest",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
    },
    {
      name: "React Testing Library",
      logo: "https://testing-library.com/img/octopus-64x64.png",
    },
    {
      name: "Vercel",
      logo: "https://cdn.worldvectorlogo.com/logos/vercel.svg",
    },
  ],
};

// Create a map for quick lookup of logos by name
const techMap = [...techStackData.frontend, ...techStackData.backend].reduce(
  (map, tech) => {
    map[tech.name.toLowerCase()] = tech.logo;
    return map;
  },
  {}
);

// Consolidated data for all projects with a status property and new links, description, features, and company logos
const allProjects = [
  {
    id: "p1",
    title: "Evolve",
    companyLogoUrl: "Evolve",
    description:
      "Evolve was born from a simple idea: to fix online education. We were tired of passive video tutorials and outdated curricula that left learners with a certificate but no practical skills. Our founders, a group of seasoned software engineers, wanted to create a platform that mimicked the real-world experience of a development team.\n Today, our courses are centered around building a single, challenging project from start to finish. We provide direct mentorship, a vibrant community, and a roadmap that prepares you for a real-world career",
    features: [
      "Custom Software Development",
      "Mobile and Web Applications",
      "IT Consultation and Strategy",
      "Data Analysis for Local Insights",
      "Cloud and Infrastructure Solutions",
      "User Experience (UX) Design",
    ],
    link: "https://evolve-fawn.vercel.app/",
    github: "https://github.com/Arigbo/evolve",
    docs: "https://github.com/Arigbo/evolve",
    imageUrl: "/evolve.png",
    techStack: ["Next.Js", "SCSS"],
    status: "finished",
  },
  {
    id: "p2",
    title: "Ralonic",
    companyLogoUrl: "https://placehold.co/100x100/1E293B/a855f7?text=D-Logo",
    description:
      "   Ralonick is a fast growing construction company rapidly                  spreading its frontiers across Nigeria, with sole interest\n                      in operation and maintenance of production facilities,\n                      local and foreign procurement of oil & gas materials and\n                      consultation. It is a registered private limited liability\n                      company under the Nigeria Law. Our operation is within the\n                      framework of commercial and industrial activities,\n                      developing and carrying out basic and detailed service in\n                      Engineering, Procurement, Construction and Equipment\n                      leasing in Land and Marine. We adopt a system of Total\n                      quality Management (TQM) at a reasonable cost and within\n                      the shortest possible time, in conjunction with our\n                      technical partners. We provide end to end service in the\n                      design, engineering, procurement, fabrication,\n                      installation, repair and support of Glass fiber Reinforced\n                      Epoxy (GRE) Polyester (GRP) and Vinylester Pipe system and\n                      products",
    features: [
      "Engineering, Procurement, and Construction (EPC).",
      "Geographic Focus.",
      "Operations & Maintenance.",
    ],
    link: "https://ralonic.vercel.app/",
    github: "https://github.com/Arigbo/ralonick",
    docs: "https://docs.data-dashboard.com",
    imageUrl: "/ralonic.png",
    techStack: ["Next.Js", "Node.Js", "TypeScript"],
    status: "finished",
  },
  // {
  //   id: "p3",
  //   title: "Harishi",
  //   companyLogoUrl: "https://placehold.co/100x100/1E293B/a855f7?text=T-Logo",
  //   description:
  //     "At our company, we're dedicated to crafting the highest\n                      quality beverages possible. We take pride in our products,\n                      and we hope that you enjoy them as much as we do. Thank\n                      you for visiting our website! If you have any questions or\n                      feedback, please don't hesitate to contact us. We're\n                      always happy to hear from our customers.",
  //   features: [
  //     "Real-time task and project updates",
  //     "Multi-user collaboration",
  //     "Task assignment and status tracking",
  //     "User notifications for project changes",
  //     "Drag-and-drop interface for task organization",
  //   ],
  //   link: "https://harishi.vercel.app/",
  //   github: "https://github.com/Arigbo/harishi",
  //   docs: "https://docs.task-management-tool.com",
  //   imageUrl: "/harishi.png",
  //   techStack: ["Aos.Js", "Node.Js", "JavaScript", "HTML5", "SCSS", "CSS"],
  //   status: "in-progress",
  // },
  {
    id: "p4",
    title: "Weather App",
    companyLogoUrl: "https://placehold.co/100x100/1E293B/a855f7?text=W-Logo",
    description:
      "A web application that provides weather updates and forecasts.",
    features: [
      "Real-time weather updates",
      "7-day weather forecasts",
      "Location-based weather information",
    ],
    link: "https://ancients-weather.vercel.app/",
    github: "https://github.com/Arigbo/weather-app",
    docs: "https://docs.weather-app.com",
    imageUrl: "/weatherap.png",
    techStack: [
      "Next.Js",
      "Node.Js",
      "TypeScript",
      "SCSS",
      "Axios",
      "openweathermapapi",
      "Jotai",
      "Date-fns",
    ],
    status: "Finished",
  },
  // {
  //   id: "p5",
  //   title: "Harishi",
  //   companyLogoUrl: "https://placehold.co/100x100/1E293B/a855f7?text=T-Logo",
  //   description:
  //     "Shop for the best beverages online. Reliable delivery. Great prices. Customer satisfaction guaranteed.",
  //   features: [
  //     "Wide selection of beverages",
  //     "Secure online ordering",
  //     "Fast and reliable delivery",
  //     "Customer reviews and ratings",
  //   ],
  //   link: "https://harishi.vercel.app/",
  //   github: "https://github.com/Arigbo/harishi",
  //   docs: "https://docs.beverage-ecommerce.com",
  //   imageUrl: "/harishi.png",
  //   techStack: ["Next.Js", "Node.Js", "TypeScript", "SCSS", "Axios"],
  //   status: "Finished",
  // },
  {
    id: "p6",
    title: "Lodger",
    companyLogoUrl: "https://placehold.co/100x100/1E293B/a855f7?text=L-Logo",
    description: "A platform for managing and booking lodgings.",
    features: [
      "Real-time availability updates",
      "Secure booking system",
      "User reviews and ratings",
      "Payment processing",
    ],
    link: "https://lodger-ancient.vercel.app/",
    github: "https://github.com/Arigbo/lodger",
    docs: "https://docs.lodger.com",
    imageUrl: "/lodger.png",
    techStack: [
      "Next.Js",
      "Node.Js",
      "TypeScript",
      "SCSS",
      "Axios",
      "Firebase",
      "Jotai",
      "Date-fns",
      "Upstash",
      "Redis",
      "Stripe",
    ],
    status: "Finished",
  },
];

const App = () => {
  const [modal, setModal] = useState({ show: false, message: "", type: "" });
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const {
    theme,
    setIsAboutModalOpen,
    isAboutModalOpen,
    isContactModalOpen,
    setIsContactModalOpen,
  } = useContext(Context);

  // [Rest of the component code remains unchanged]

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setModal({
      show: true,
      message:
        "This is a static demo. A real full-stack portfolio would have a backend to handle form submissions.",
      type: "info",
    });
    setIsContactModalOpen(false);
  };

  const handleOpenProjectModal = (project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleCloseProjectModal = () => {
    setIsProjectModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="portfolio">
      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="contact-modal-overlay">
          <div className="contact-modal-inner">
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="close-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="contact-modal-inner-inner">
              <h3 className="about-title">Get In Touch</h3>
              <p className="about-desc">
                Have a project in mind or just want to say hi? Feel free to
                reach out!
              </p>
              <form
                onSubmit={handleContactSubmit}
                className="contact-modal-form"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="form-input"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="form-input"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="6"
                  className="form-textarea"
                  required
                ></textarea>
                <button type="submit" className="gradient-button">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {isProjectModalOpen && selectedProject && (
        <div className="project-modal-overlay">
          <div className="project-modal-inner">
            {/* 'X' close button */}
            <button onClick={handleCloseProjectModal} className="close-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="project-modal-inner-inner">
              <h3 className="project-title">{selectedProject.title}</h3>
              <img
                src={selectedProject.imageUrl}
                alt={`Image of ${selectedProject.title}`}
                className="project-image"
                width={200}
                height={200}
              />

              <p className="project-desc">{selectedProject.description}</p>

              <h4 className="features-title">Key Features:</h4>
              <ul className="features-list">
                {selectedProject.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <h4 className="features-title">Tools Used:</h4>
              <div className="tools-grid">
                {selectedProject.techStack.map((tech, index) => (
                  <div key={index} className="tool-item">
                    {techMap[tech.toLowerCase()] ? (
                      <img
                        src={techMap[tech.toLowerCase()]}
                        alt={tech}
                        className="tool-logo"
                      />
                    ) : null}
                    <span>{tech}</span>
                  </div>
                ))}
              </div>

              <div className="project-buttons">
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    className="project-link-button"
                  >
                    View Live
                  </a>
                )}
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-button"
                  >
                    <i className="fab fa-github"></i>
                    <span>GitHub</span>
                  </a>
                )}
                {selectedProject.docs && (
                  <a
                    href={selectedProject.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="docs-button"
                  >
                    <i className="fas fa-book"></i>
                    <span>Docs</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <main>
        <section id="home" className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Hello, I'm <span className="name">Arigbo Jesse</span>
            </h1>
            <h2 className="hero-subtitle">Full-Stack Developer</h2>
            <p className="hero-desc">
              I build high-performance web applications from the ground up,
              blending clean code with creative design to solve real-world
              problems and create seamless user experiences.
            </p>
            <div className="hero-buttons">
              <button
                className="view-work-button gradient-button"
                onClick={() => {
                  setIsContactModalOpen(true);
                }}
              >
                Let's Talk
              </button>

              <a href="/about">
                <button className="learn-more-button">About Me</button>
              </a>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <h3 className="section-title">Projects</h3>
          <div className="projects-grid">
            {allProjects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="image-container">
                  <img src={project.imageUrl} alt={project.title} />
                  <div className="handle-overlay">
                    <button
                      onClick={() => handleOpenProjectModal(project)}
                      className="detail-button group-hover"
                    >
                      View Details
                    </button>
                  </div>
                </div>
                <div className="project-card-bottom">
                  <a href={project.link} className="project-name">
                    {project.title}
                  </a>
                  <p className="line-clamp-3">{project.description}</p>
                  <div className="tech-tags">
                    {project.techStack.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="links">
                    {project.github && (
                      <a href={project.github} className="link">
                        <i className="fab fa-github"></i>
                        <span>GitHub</span>
                      </a>
                    )}
                    {project.docs && (
                      <a href={project.docs} className="link">
                        <i className="fas fa-book"></i>
                        <span>Docs</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="stack" className="section">
          <h3 className="section-title">Tech Stack</h3>
          <div className="tech-grid">
            <div className="tech-category">
              <h4 className="tech-category-title">Frontend</h4>
              <div className="tech-icons">
                {techStackData.frontend.map((tech) => (
                  <div key={tech.name} className="tech-icon">
                    <img
                      src={tech.logo}
                      alt={`${tech.name} logo`}
                      className="tech-logo"
                    />
                    <span className="tech-name">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="tech-category">
              <h4 className="tech-category-title">Backend</h4>
              <div className="tech-icons">
                {techStackData.backend.map((tech) => (
                  <div key={tech.name} className="tech-icon">
                    <img
                      src={tech.logo}
                      alt={`${tech.name} logo`}
                      className="tech-logo"
                    />
                    <span className="tech-name">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="tech-category">
              <h4 className="tech-category-title">Extras</h4>
              <div className="tech-icons">
                {techStackData.extra.map((tech) => (
                  <div key={tech.name} className="tech-icon">
                    <img
                      src={tech.logo}
                      alt={`${tech.name} logo`}
                      className="tech-logo"
                    />
                    <span className="tech-name">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialSection />
        {/* <section id="testimonials" className="section">
          <div className="container">
            <h3 className="section-title">Testimonials</h3>
            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <blockquote className="quote">
                    <span className="quote-span">"</span>
                    {testimonial.quote}
                    <span className="quote-span">"</span>
                  </blockquote>
                  <div>
                    <p className="name">{testimonial.name}</p>
                    <p className="title">{testimonial.title}</p>
                    <div className="social-links">
                      {testimonial.social.map((social, socialIndex) => (
                        <a
                          key={socialIndex}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link"
                        >
                          {getSocialIcon(social.platform)}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}
      </main>
    </div>
  );
};

export default App;
