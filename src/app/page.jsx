"use client";
import { Context } from "@/components/context";
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
      name: "Next.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
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
      name: "Python",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
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
    title: "Modern E-commerce Platform",
    companyLogoUrl: "https://placehold.co/100x100/1E293B/a855f7?text=E-Logo",
    description:
      "This is a comprehensive e-commerce platform built from the ground up. It includes a robust user authentication system, a secure shopping cart, and an admin dashboard for product management. The front-end is powered by React for a fast and dynamic user experience, while the back-end uses Node.js and Express to handle API requests and business logic. Data is stored in a MongoDB database, ensuring scalability and flexibility.",
    features: [
      "User authentication and authorization",
      "Shopping cart and secure checkout",
      "Product listing and search functionality",
      "Admin dashboard for CRUD operations",
      "Order history and tracking",
    ],
    link: "#",
    github: "https://github.com/ArigboJesse/ecommerce-platform",
    docs: "https://docs.ecommerce-platform.com",
    imageUrl:
      "https://placehold.co/600x400/1E293B/a855f7?text=E-commerce+Platform",
    techStack: ["React", "Next.js", "Node.js", "Express", "MongoDB"],
    status: "finished",
  },
  {
    id: "p2",
    title: "Interactive Data Dashboard",
    companyLogoUrl: "https://placehold.co/100x100/1E293B/a855f7?text=D-Logo",
    description:
      "An interactive data visualization dashboard designed to handle and display complex datasets. It fetches data from a PostgreSQL database and uses the D3.js library to create dynamic charts and graphs. The application is optimized for performance, ensuring a smooth experience even with large volumes of data. Python is used on the back-end for data processing and analysis.",
    features: [
      "Real-time data fetching and display",
      "Interactive charts (bar, line, pie) using D3.js",
      "Customizable dashboard widgets",
      "Data filtering and sorting",
      "Responsive design for various screen sizes",
    ],
    link: "#",
    github: "https://github.com/ArigboJesse/data-dashboard",
    docs: "https://docs.data-dashboard.com",
    imageUrl: "https://placehold.co/600x400/1E293B/a855f7?text=Data+Viz",
    techStack: ["React", "D3.js", "Python", "PostgreSQL"],
    status: "finished",
  },
  {
    id: "p3",
    title: "Collaborative Task Management Tool",
    companyLogoUrl: "https://placehold.co/100x100/1E293B/a855f7?text=T-Logo",
    description:
      "A real-time collaborative task management tool for teams. It allows multiple users to work on the same project simultaneously, with updates reflected instantly across all devices. The application uses WebSockets for real-time communication and is built on a React front-end with a Node.js/Express back-end. The state management is handled efficiently with React's Context API.",
    features: [
      "Real-time task and project updates",
      "Multi-user collaboration",
      "Task assignment and status tracking",
      "User notifications for project changes",
      "Drag-and-drop interface for task organization",
    ],
    link: "#",
    github: "https://github.com/ArigboJesse/task-management-tool",
    docs: "https://docs.task-management-tool.com",
    imageUrl: "https://placehold.co/600x400/1E293B/a855f7?text=Task+Manager",
    techStack: ["React", "Node.js", "WebSockets", "Context API", "Express"],
    status: "in-progress",
  },
];

// Static data for testimonials
const testimonials = [
  {
    name: "Sarah Chen",
    title: "Product Manager, Innovate Inc.",
    quote:
      "Working with Arigbo was a fantastic experience. Their ability to quickly grasp complex requirements and deliver high-quality code was impressive. The project was completed ahead of schedule and exceeded our expectations.",
    social: [
      { platform: "X", handle: "@sarahchen", url: "#" },
      { platform: "LinkedIn", handle: "sarah-chen", url: "#" },
    ],
  },
  {
    name: "Michael Davis",
    title: "CTO, Global Tech Solutions",
    quote:
      "Arigbo's expertise in full-stack development is second to none. They were an invaluable asset to our team, bringing innovative solutions and a commitment to clean, maintainable code. Highly recommended.",
    social: [
      { platform: "Facebook", handle: "michael.davis", url: "#" },
      { platform: "Threads", handle: "michaelthreads", url: "#" },
    ],
  },
];

// Data for the new community photo gallery
const communityPhotos = [
  {
    id: "photo-1",
    imgUrl: "https://placehold.co/800x600/4a5568/ffffff?text=Tech+Meetup",
    altText: "Group photo at a tech meetup.",
    people: [
      { name: "Alice", handle: "@tech_alice" },
      { name: "Bob", handle: "@dev_bob" },
    ],
  },
  {
    id: "photo-2",
    imgUrl: "https://placehold.co/800x600/2c5282/ffffff?text=Hackathon+Team",
    altText: "Team photo after a hackathon.",
    people: [
      { name: "Charlie", handle: "@code_charlie" },
      { name: "Dana", handle: "@hacker_dana" },
      { name: "Eve", handle: "@eve_devs" },
    ],
  },
  {
    id: "photo-3",
    imgUrl: "https://placehold.co/800x600/319795/ffffff?text=Workshop",
    altText: "Me with people at a coding workshop.",
    people: [
      { name: "Frank", handle: "@frank_codes" },
      { name: "Grace", handle: "@g_design" },
    ],
  },
  {
    id: "photo-4",
    imgUrl: "https://placehold.co/800x600/68d391/319795?text=Gaming+Night",
    altText: "Friends playing games together.",
    people: [
      { name: "Heidi", handle: "@gamer_heidi" },
      { name: "Ivan", handle: "@ivan_plays" },
    ],
  },
];

// New data for communities and their social handles
const communities = [
  {
    name: "GDG Community",
    social: [
      { platform: "whatsapp", url: "#" },
      { platform: "X", url: "#" },
      { platform: "facebook", url: "#" },
      { platform: "linkedin", url: "#" },
      { platform: "instagram", url: "#" },
      { platform: "Discord", url: "#" },
    ],
  },
  {
    name: "Ancients",
    social: [
      { platform: "whatsapp", url: "#" },
      { platform: "X", url: "#" },
      { platform: "linkedin", url: "#" },
      { platform: "Discord", url: "#" },
    ],
  },
  {
    name: "Sui",
    social: [
      { platform: "whatsapp", url: "#" },
      { platform: "X", url: "#" },
      { platform: "linkedin", url: "#" },
      { platform: "Discord", url: "#" },
      { platform: "Telegram", url: "#" },
    ],
  },
  {
    name: "Codex",
    social: [
      { platform: "whatsapp", url: "#" },
      { platform: "X", url: "#" },
      { platform: "facebook", url: "#" },
      { platform: "linkedin", url: "#" },
      { platform: "instagram", url: "#" },
      { platform: "Discord", url: "#" },
    ],
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

  // New data for collaborators
  const collaborators = [
    {
      name: "John Doe",
      handle: "@johndoe",
      photo: "https://placehold.co/300x300/1E293B/a855f7?text=John",
      collaboration:
        "Worked on E-commerce Platform, handled backend API development.",
    },
    {
      name: "Jane Smith",
      handle: "@janesmith",
      photo: "https://placehold.co/300x300/1E293B/a855f7?text=Jane",
      collaboration:
        "Collaborated on Data Dashboard, focused on data visualization.",
    },
    {
      name: "Sam Wilson",
      handle: "@samw",
      photo: "https://placehold.co/300x300/1E293B/a855f7?text=Sam",
      collaboration:
        "Team member for Task Management Tool, implemented real-time features.",
    },
    {
      name: "Emily Clark",
      handle: "@emilyc",
      photo: "https://placehold.co/300x300/1E293B/a855f7?text=Emily",
      collaboration: "Assisted in frontend design for multiple projects.",
    },
    {
      name: "David Lee",
      handle: "@davidl",
      photo: "https://placehold.co/300x300/1E293B/a855f7?text=David",
      collaboration:
        "Contributed to database optimization in E-commerce Platform.",
    },
    {
      name: "Alice Brown",
      handle: "@aliceb",
      photo: "https://placehold.co/300x300/1E293B/a855f7?text=Alice",
      collaboration: "Worked on Python scripts for Data Dashboard analytics.",
    },
  ];

  // Function to calculate years of experience
  const calculateYearsOfExperience = () => {
    const startYear = 2022;
    const currentYear = new Date().getFullYear();
    const years = currentYear - startYear;
    return years > 0 ? years : 1; // Ensure at least 1 year if it's the same year
  };

  const yearsOfExperience = calculateYearsOfExperience();

  const handleCVDownload = () => {
    setModal({
      show: true,
      message: "This is a demo. A PDF download would be triggered here.",
      type: "info",
    });
  };

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

  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "x":
        return <i className="fab fa-twitter"></i>;
      case "linkedin":
        return <i className="fab fa-linkedin-in"></i>;
      case "facebook":
        return <i className="fab fa-facebook-f"></i>;
      case "whatsapp":
        return <i className="fab fa-whatsapp"></i>;
      case "instagram":
        return <i className="fab fa-instagram"></i>;
      case "discord":
        return <i className="fab fa-discord"></i>;
      case "telegram":
        return <i className="fab fa-telegram-plane"></i>;
      default:
        return <i className="fas fa-link"></i>;
    }
  };

  // Function to get an icon for a community
  const getCommunityIcon = (communityName) => {
    switch (communityName.toLowerCase()) {
      case "gdg community":
        return <i className="fas fa-users"></i>;
      case "ancients":
        return <i className="fas fa-university"></i>;
      case "sui":
        return <i className="fas fa-seedling"></i>;
      case "codex":
        return <i className="fas fa-book-open"></i>;
      default:
        return <i className="fas fa-globe"></i>;
    }
  };

  return (
    <>
      {/* General Purpose Modal for messages */}
      {modal.show && (
        <div className="about-modal-overlay">
          <div>
            <p>{modal.message}</p>
            <button
              onClick={() => setModal({ ...modal, show: false })}
              className="gradient-button modal-button"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* About Me Modal */}
      {isAboutModalOpen && (
        <div className="about-modal-overlay">
          <div className="about-modal-inner">
            {/* 'X' close button in top right corner, now fixed position */}
            <button
              onClick={() => setIsAboutModalOpen(false)}
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

            <div className="about-content">
              <div className="about-image-container">
                <img
                  src="https://placehold.co/400x600/1e293b/4ade80?text=Developer+Image"
                  alt="Your profile"
                  className="about-image"
                />
              </div>
              <div className="about-text">
                <h3 className="about-title">More About Me</h3>
                <p className="about-desc">
                  I am a passionate and results-driven software developer
                  dedicated to crafting exceptional user experiences and robust,
                  scalable back-end systems.
                </p>

                <div>
                  <h4 className="subsection-title">My Journey</h4>
                  <p className="subsection-desc">
                    My fascination with technology began with building simple
                    websites in high school. This hobby quickly evolved into a
                    career-long commitment to mastering the full development
                    life cycle. I thrive on the challenge of transforming
                    complex ideas into elegant, functional code. With a
                    background in computer science, I've spent the last{" "}
                    {yearsOfExperience} years building and maintaining web
                    applications for both startups and established companies,
                    focusing on clean architecture, performance optimization,
                    and seamless user experiences.
                  </p>
                </div>
              </div>
            </div>

            {/* New Content Describing me, skills, and journey */}
            <div className="section-space">
              {/* My Full-Stack Approach */}
              {/* <div>
                  <h4 className="subsection-title">A Full-Stack Approach</h4>
                  <p className="subsection-desc">
                    As a full-stack developer, I thrive on the challenge of handling every layer of a web application. From designing intuitive user interfaces to building powerful back-end systems, I ensure that every piece of the puzzle fits together seamlessly. This holistic perspective allows me to build robust, scalable, and maintainable applications that are ready for production. I'm not just a front-end or a back-end developer; I'm an architect of complete digital experiences.
                  </p>style
                  <div ={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      src="https://placehold.co/800x400/1e293b/a855f7?text=Full+Stack+Diagram"
                      alt="A diagram illustrating full-stack development"
                      className="diagram-image"
                    />
                  </div>
                </div> */}

              {/* My Toolkit */}
              <div>
                <h4 className="subsection-title">My Toolkit</h4>
                <p className="subsection-desc">
                  I specialize in a modern, comprehensive toolkit that allows me
                  to build applications efficiently. My primary stack revolves
                  around **React** for dynamic, component-based front-ends and
                  **Node.js with Express** for building fast, scalable APIs. I'm
                  proficient in utilizing **PostgreSQL** and **MongoDB** for
                  flexible data storage solutions. For development, I rely on
                  tools like **Git** for version control, **Webpack** for asset
                  bundling, and **Docker** for containerization to ensure a
                  consistent development environment.
                </p>
              </div>

              {/* People I've Collaborated With */}
              <div>
                <h4 className="subsection-title">
                  People I've Collaborated With
                </h4>
                <div>
                  {collaborators.map((collab, index) => (
                    <div key={index} className="collaborator-card">
                      <img
                        src={collab.photo}
                        alt={collab.name}
                        className="collaborator-photo"
                      />
                      <div className="collaborator-info">
                        <p className="collaborator-name">{collab.name}</p>
                        <p className="collaborator-handle">{collab.handle}</p>
                        <p className="collaborator-collaboration">
                          {collab.collaboration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community & Connections */}
              <div>
                <h4 className="subsection-title">
                  Connecting with the Community
                </h4>
                <p className="subsection-desc">
                  My journey isn't just about code; it's also about people. I
                  believe in continuous learning and collaboration, which is why
                  I actively participate in tech events and conferences. I've
                  had the pleasure of attending events like **React Conf** and
                  **Node.js Summit**, where I've met inspiring developers,
                  product managers, and mentors. These connections have enriched
                  my understanding of the industry and have led to exciting new
                  opportunities.
                </p>

                <div className="photo-grid">
                  {communityPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="photo-card photo-card-container group"
                    >
                      <img
                        src={photo.imgUrl}
                        alt={photo.altText}
                        className="photo-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/400x300/cccccc/000000?text=Image+Load+Error";
                        }}
                      />
                      <div className="handle-overlay absolute inset-0 flex flex-col justify-end p-2 md:p-4">
                        <div>
                          {photo.people.map((person, index) => (
                            <span key={index} className="handle-text">
                              {person.handle}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* New Communities Section */}
                <h4 className="subsection-title">My Communities</h4>
                <p className="subsection-desc">
                  I am an active member of several vibrant tech communities.
                  Here are some of the groups I'm proud to be a part of:
                </p>
                <div className="community-grid">
                  {communities.map((community, index) => (
                    <div key={index} className="community-card">
                      <div className="community-header">
                        {getCommunityIcon(community.name)}
                        <h5 className="community-name">{community.name}</h5>
                      </div>
                      <div className="community-social">
                        {community.social.map((handle, handleIndex) => (
                          <a
                            key={handleIndex}
                            href={handle.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="community-social-link"
                            aria-label={`Visit ${community.name} on ${handle.platform}`}
                          >
                            {getSocialIcon(handle.platform)}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <i className="fa-solid fa-map-pin info-icon"></i>
                <div>
                  <p className="info-label">Location:</p>
                  <p className="info-value">San Francisco, CA</p>
                </div>
              </div>
              <div className="info-item">
                <i className="fa-solid fa-briefcase info-icon"></i>
                <div>
                  <p className="info-label">Years of Experience:</p>
                  <p className="info-value">{yearsOfExperience}+</p>
                </div>
              </div>
              <div className="info-item">
                <i className="fa-solid fa-graduation-cap info-icon"></i>
                <div>
                  <p className="info-label">Education:</p>
                  <p className="info-value">
                    B.S. in Computer Science from Stanford University
                  </p>
                </div>
              </div>
              <div className="info-item">
                <i className="fa-brands fa-github info-icon"></i>
                <div>
                  <p className="info-label">GitHub:</p>
                  <a
                    href="https://github.com/ArigboJesse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-link"
                  >
                    github.com/ArigboJesse
                  </a>
                </div>
              </div>
              <div className="info-item">
                <i className="fa-brands fa-linkedin info-icon"></i>
                <div>
                  <p className="info-label">LinkedIn:</p>
                  <a
                    href="https://linkedin.com/in/ArigboJesse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-link"
                  >
                    linkedin.com/in/ArigboJesse
                  </a>
                </div>
              </div>
              <div className="info-item">
                <i className="fa-brands fa-x-twitter info-icon"></i>
                <div>
                  <p className="info-label">X:</p>
                  <a
                    href="https://x.com/ArigboJesse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-link"
                  >
                    x.com/ArigboJesse
                  </a>
                </div>
              </div>
              <div className="info-item">
                <i className="fa-brands fa-facebook info-icon"></i>
                <div>
                  <p className="info-label">Facebook:</p>
                  <a
                    href="https://facebook.com/ArigboJesse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-link"
                  >
                    facebook.com/ArigboJesse
                  </a>
                </div>
              </div>
              <div className="info-item">
                <i className="fa-brands fa-threads info-icon"></i>
                <div>
                  <p className="info-label">Threads:</p>
                  <a
                    href="https://threads.net/@ArigboJesse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-link"
                  >
                    threads.net/@ArigboJesse
                  </a>
                </div>
              </div>
            </div>
            <div>
              <button onClick={handleCVDownload} className="cv-button">
                <i className="fa-solid fa-file-arrow-down"></i>
                <span>Download CV</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="about-modal-overlay">
          <div className="about-modal-inner">
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
            <h3 className="about-title">Get In Touch</h3>
            <p className="about-desc">
              Have a project in mind or just want to say hi? Feel free to reach
              out!
            </p>
            <form onSubmit={handleContactSubmit} className="contact-modal-form">
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

            <div className="project-modal-text">
              <h3 className="project-title">{selectedProject.title}</h3>
              <img
                src={selectedProject.imageUrl}
                alt={`Image of ${selectedProject.title}`}
                className="project-image"
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
                    View Live Demo
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
          <div className="hero-bg">
            {/* Subtle background gradient or pattern */}
            <div className="hero-gradient"></div>
          </div>

          <div className="hero-content">
            <h1 className="hero-title">
              Hello, I'm <span className="name">Arigbo Jesse</span>
            </h1>
            <h2 className="hero-subtitle">
              Full-Stack Developer & Entrepreneur
            </h2>
            <p className="hero-desc">
              I build high-performance web applications from the ground up,
              blending clean code with creative design to solve real-world
              problems and create seamless user experiences.
            </p>
            <div className="hero-buttons">
              <a href="#projects">
                <button className="view-work-button gradient-button">
                  View My Work
                </button>
              </a>
              <a
                href="#about"
                onClick={() => {
                  setIsAboutModalOpen(true);
                }}
              >
                <button className="learn-more-button">Learn More</button>
              </a>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <div className="container">
            <h3 className="section-title">Projects</h3>
            <div className="projects-grid">
              {allProjects.map((project) => (
                <div key={project.id} className="project-card group">
                  {/* Status badge */}
                  <span className="status-badge">
                    {project.status === "in-progress"
                      ? "In Progress"
                      : "Completed"}
                  </span>
                  <div className="image-container">
                    <img src={project.imageUrl} alt={project.title} />
                    <div className="overlay">
                      <button
                        onClick={() => handleOpenProjectModal(project)}
                        className="detail-button group-hover"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  <h4>{project.title}</h4>
                  <p className="line-clamp-3">{project.description}</p>
                  <div>
                    {project.techStack.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div>
                    {project.link && (
                      <a href={project.link} className="link">
                        <i className="fas fa-external-link-alt"></i>
                        <span>Live</span>
                      </a>
                    )}
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
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="stack" className="section">
          <div className="container">
            <h3 className="section-title">Tech Stack</h3>
            <div className="tech-grid">
              <div>
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
              <div>
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
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="section">
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
        </section>
      </main>
    </>
  );
};

export default App;
