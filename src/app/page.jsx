"use client";
import React, { useState, useEffect } from "react";

// Static data for the tech stack
const techStack = {
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
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [theme, setTheme] = useState("blue");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // New data for co-workers to be displayed in the modal
  const coWorkers = [
    {
      name: "John Doe",
      handle: "@johndoe",
      photo: "https://placehold.co/300x300/1E293B/a855f7?text=John",
    },
    {
      name: "Jane Smith",
      handle: "@janesmith",
      photo: "https://placehold.co/300x300/1E293B/a855f7?text=Jane",
    },
    {
      name: "Sam Wilson",
      handle: "@samw",
      photo: "https://placehold.co/300x300/1E293B/a855f7?text=Sam",
    },
    {
      name: "Emily Clark",
      handle: "@emilyc",
      photo: "https://placehold.co/300x300/1E293B/a855f7?text=Emily",
    },
    {
      name: "David Lee",
      handle: "@davidl",
      photo: "https://placehold.co/300x300/1E293B/a855f7?text=David",
    },
    {
      name: "Alice Brown",
      handle: "@aliceb",
      photo: "https://placehold.co/300x300/1E293B/a855f7?text=Alice",
    },
  ];

  // Define themes with a new dark/blue color scheme
  const themes = {
    light: {
      bg: "bg-gray-100",
      text: "text-gray-800",
      navBg: "bg-white bg-opacity-80 backdrop-blur-sm shadow-md",
      navText: "text-gray-600 hover:text-blue-600",
      cardBg: "bg-white shadow-lg",
      border: "border-gray-200",
      accent: "text-blue-600",
      heroAccent:
        "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:from-blue-600 group-hover:to-cyan-500",
      placeholder: "placeholder-gray-400",
    },
    dark: {
      bg: "bg-gray-950",
      text: "text-gray-100",
      navBg: "bg-gray-950 bg-opacity-80 backdrop-blur-sm shadow-xl",
      navText: "text-gray-400 hover:text-blue-400",
      cardBg: "bg-gray-900 shadow-xl shadow-gray-800/50",
      border: "border-gray-800",
      accent: "text-blue-400",
      heroAccent:
        "text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 group-hover:from-blue-500 group-hover:to-sky-400",
      placeholder: "placeholder-gray-500",
    },
    blue: {
      bg: "bg-slate-950",
      text: "text-slate-200",
      navBg: "bg-slate-950 bg-opacity-80 backdrop-blur-sm shadow-xl",
      navText: "text-slate-400 hover:text-sky-400",
      cardBg: "bg-slate-900 shadow-xl shadow-slate-800/50",
      border: "border-slate-800",
      accent: "text-sky-400",
      heroAccent:
        "text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 group-hover:from-blue-500 group-hover:to-sky-400",
      placeholder: "placeholder-slate-500",
    },
    forest: {
      bg: "bg-gray-800",
      text: "text-gray-200",
      navBg: "bg-gray-800 bg-opacity-80 backdrop-blur-sm shadow-md",
      navText: "text-gray-300 hover:text-blue-400",
      cardBg: "bg-gray-700 shadow-lg",
      border: "border-gray-600",
      accent: "text-blue-400",
      heroAccent:
        "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:from-blue-600 group-hover:to-cyan-500",
      placeholder: "placeholder-gray-400",
    },
  };

  const currentTheme = themes[theme];

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
  };

  const handleOpenProjectModal = (project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleCloseProjectModal = () => {
    setIsProjectModalOpen(false);
    setSelectedProject(null);
  };

  const name = "Arigbo Jesse";
  const logo = (
    <div
      className={`flex items-center justify-center w-10 h-10 rounded-lg border-2 ${currentTheme.border} ${currentTheme.accent} font-bold text-xl font-chivo`}
    >
      LD
    </div>
  );

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleOpenAboutModal = () => {
    setIsAboutModalOpen(true);
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
        return <i className="fas fa-users text-4xl text-sky-400"></i>;
      case "ancients":
        return <i className="fas fa-university text-4xl text-blue-400"></i>;
      case "sui":
        return <i className="fas fa-seedling text-4xl text-green-400"></i>;
      case "codex":
        return <i className="fas fa-book-open text-4xl text-yellow-400"></i>;
      default:
        return <i className="fas fa-globe text-4xl text-gray-400"></i>;
    }
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Chivo:ital,wght@0,100..900;1,100..900&family=Funnel+Display:wght@300..800&display=swap');
          @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css');
        
          .font-display {
            font-family: 'Funnel Display', sans-serif;
            font-optical-sizing: auto;
            font-weight: 600; /* Default weight, can be adjusted */
            font-style: normal;
          }

          .font-chivo {
            font-family: 'Chivo', sans-serif;
          }

          /* Custom CSS for the photo gallery */
          .handle-overlay {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            pointer-events: none;
            background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
          }

          .photo-card-container:hover .handle-overlay {
            opacity: 1;
            pointer-events: auto;
          }

          .handle-text {
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9);
          }
          
          /* Custom styles for the Instagram-style co-worker section */
          .coworker-photo-container {
            position: relative;
            overflow: hidden;
            border-radius: 0.75rem; /* rounded-xl */
            transform: scale(1);
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); /* default shadow */
          }
          .coworker-photo-container:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); /* shadow-lg */
          }
          .coworker-info-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            color: white;
            opacity: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: opacity 0.3s ease-in-out;
          }
          .coworker-photo-container:hover .coworker-info-overlay {
            opacity: 1;
          }
        `}
      </style>
      <div
        className={`${currentTheme.bg} ${currentTheme.text} min-h-screen font-chivo antialiased leading-relaxed overflow-x-hidden`}
      >
        {/* General Purpose Modal for messages */}
        {modal.show && (
          <div className="fixed inset-0 bg-gray-950 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300">
            <div
              className={`p-8 rounded-xl shadow-2xl border ${currentTheme.border} transform transition-all duration-300 scale-100 ${currentTheme.cardBg} text-center`}
            >
              <p className="font-normal text-lg">{modal.message}</p>
              <button
                onClick={() => setModal({ ...modal, show: false })}
                className={`mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-sky-500 transition-colors duration-300 text-white font-semibold`}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* About Me Modal */}
        {isAboutModalOpen && (
          <div className="fixed inset-0 bg-gray-950 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 px-4 py-8">
            <div
              className={`relative p-8 md:p-12 rounded-2xl shadow-2xl border ${currentTheme.border} max-w-5xl w-full transform transition-all duration-300 scale-100 ${currentTheme.cardBg} overflow-y-auto max-h-[90vh]`}
            >
              {/* 'X' close button in top right corner, now fixed position */}
              <button
                onClick={() => setIsAboutModalOpen(false)}
                className="fixed top-4 right-4 text-gray-400 hover:text-blue-400 transition-colors duration-300 z-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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

              <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-12">
                <div className="flex-shrink-0 mb-6 md:mb-0 hidden md:flex">
                  <img
                    src="https://placehold.co/400x600/1e293b/4ade80?text=Developer+Image"
                    alt="Your profile"
                    className="h-full w-auto rounded-xl object-cover shadow-lg"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h3
                    className={`font-display text-3xl md:text-4xl font-bold mb-4 ${currentTheme.accent}`}
                  >
                    More About Me
                  </h3>
                  <p
                    className={`text-lg font-normal mb-6 ${currentTheme.text}`}
                  >
                    I am a passionate and results-driven software developer
                    dedicated to crafting exceptional user experiences and
                    robust, scalable back-end systems.
                  </p>

                  <div className="mb-8">
                    <h4
                      className={`font-display text-2xl font-semibold mb-2 ${currentTheme.accent}`}
                    >
                      My Journey
                    </h4>
                    <p className={`font-normal text-lg ${currentTheme.text}`}>
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
              <div className="mt-8 space-y-12 text-center md:text-left">
                {/* My Full-Stack Approach */}
                <div>
                  <h4
                    className={`font-display text-2xl font-semibold mb-4 ${currentTheme.accent}`}
                  >
                    A Full-Stack Approach
                  </h4>
                  <p
                    className={`font-normal text-lg ${currentTheme.text} mb-4`}
                  >
                    As a full-stack developer, I thrive on the challenge of
                    handling every layer of a web application. From designing
                    intuitive user interfaces to building powerful back-end
                    systems, I ensure that every piece of the puzzle fits
                    together seamlessly. This holistic perspective allows me to
                    build robust, scalable, and maintainable applications that
                    are ready for production. I'm not just a front-end or a
                    back-end developer; I'm an architect of complete digital
                    experiences.
                  </p>
                  <div className="flex justify-center md:justify-start">
                    <img
                      src="https://placehold.co/800x400/1e293b/a855f7?text=Full+Stack+Diagram"
                      alt="A diagram illustrating full-stack development"
                      className="rounded-xl shadow-lg border-2 border-slate-700 max-w-full h-auto"
                    />
                  </div>
                </div>

                {/* My Toolkit */}
                <div>
                  <h4
                    className={`font-display text-2xl font-semibold mb-4 ${currentTheme.accent}`}
                  >
                    My Toolkit
                  </h4>
                  <p
                    className={`font-normal text-lg ${currentTheme.text} mb-4`}
                  >
                    I specialize in a modern, comprehensive toolkit that allows
                    me to build applications efficiently. My primary stack
                    revolves around **React** for dynamic, component-based
                    front-ends and **Node.js with Express** for building fast,
                    scalable APIs. I'm proficient in utilizing **PostgreSQL**
                    and **MongoDB** for flexible data storage solutions. For
                    development, I rely on tools like **Git** for version
                    control, **Webpack** for asset bundling, and **Docker** for
                    containerization to ensure a consistent development
                    environment.
                  </p>
                </div>

                {/* My Company Section - Updated */}
                <div>
                  <h4
                    className={`font-display text-2xl font-semibold mb-4 ${currentTheme.accent}`}
                  >
                    My Company, Lodger
                  </h4>
                  <p
                    className={`font-normal text-lg ${currentTheme.text} mb-4`}
                  >
                    In addition to my work in software development, I am the
                    owner of **Lodger**, a company in the building industry. My
                    experience with Lodger has given me a unique perspective on
                    real-world problem-solving and project management. I apply
                    the same principles of efficiency, quality, and user
                    satisfaction to my building projects as I do to my code,
                    ensuring that every foundation is solid and every detail is
                    carefully considered.
                  </p>

                  {/* Instagram-style co-worker photo grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                    {coWorkers.map((coworker, index) => (
                      <div key={index} className="coworker-photo-container">
                        <img
                          src={coworker.photo}
                          alt={coworker.name}
                          className="w-full h-auto object-cover"
                        />
                        <div className="coworker-info-overlay">
                          <p className="font-semibold text-lg">
                            {coworker.name}
                          </p>
                          <p className="text-sm">{coworker.handle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Community & Connections */}
                <div>
                  <h4
                    className={`font-display text-2xl font-semibold mb-4 ${currentTheme.accent}`}
                  >
                    Connecting with the Community
                  </h4>
                  <p
                    className={`font-normal text-lg ${currentTheme.text} mb-4`}
                  >
                    My journey isn't just about code; it's also about people. I
                    believe in continuous learning and collaboration, which is
                    why I actively participate in tech events and conferences.
                    I've had the pleasure of attending events like **React
                    Conf** and **Node.js Summit**, where I've met inspiring
                    developers, product managers, and mentors. These connections
                    have enriched my understanding of the industry and have led
                    to exciting new opportunities.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                    {communityPhotos.map((photo) => (
                      <div
                        key={photo.id}
                        className="relative rounded-lg overflow-hidden photo-card-container group transform hover:scale-105 transition-transform duration-300"
                      >
                        <img
                          src={photo.imgUrl}
                          alt={photo.altText}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://placehold.co/400x300/cccccc/000000?text=Image+Load+Error";
                          }}
                        />
                        <div className="handle-overlay absolute inset-0 flex flex-col justify-end p-2 md:p-4">
                          <div className="flex flex-col space-y-1">
                            {photo.people.map((person, index) => (
                              <span
                                key={index}
                                className="handle-text text-sm md:text-base font-semibold text-white"
                              >
                                {person.handle}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* New Communities Section */}
                  <h4
                    className={`font-display text-2xl font-semibold mt-12 mb-4 ${currentTheme.accent}`}
                  >
                    My Communities
                  </h4>
                  <p
                    className={`font-normal text-lg ${currentTheme.text} mb-6`}
                  >
                    I am an active member of several vibrant tech communities.
                    Here are some of the groups I'm proud to be a part of:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {communities.map((community, index) => (
                      <div
                        key={index}
                        className={`flex flex-col items-center p-6 rounded-xl shadow-lg border ${currentTheme.border} ${currentTheme.cardBg} transition-transform duration-300 hover:scale-[1.02] transform`}
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          {getCommunityIcon(community.name)}
                          <h5 className="font-display text-xl font-bold">
                            {community.name}
                          </h5>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                          {community.social.map((handle, handleIndex) => (
                            <a
                              key={handleIndex}
                              href={handle.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`p-3 rounded-full ${currentTheme.accent} hover:text-white hover:bg-sky-500 transition-colors duration-300 transform hover:scale-110`}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mt-8 font-normal">
                <div className="flex items-center space-x-2">
                  <i
                    className={`fa-solid fa-map-pin ${currentTheme.accent}`}
                  ></i>
                  <div>
                    <p className={`font-semibold ${currentTheme.accent}`}>
                      Location:
                    </p>
                    <p className={currentTheme.text}>San Francisco, CA</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <i
                    className={`fa-solid fa-briefcase ${currentTheme.accent}`}
                  ></i>
                  <div>
                    <p className={`font-semibold ${currentTheme.accent}`}>
                      Years of Experience:
                    </p>
                    <p className={currentTheme.text}>{yearsOfExperience}+</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <i
                    className={`fa-solid fa-graduation-cap ${currentTheme.accent}`}
                  ></i>
                  <div>
                    <p className={`font-semibold ${currentTheme.accent}`}>
                      Education:
                    </p>
                    <p className={currentTheme.text}>
                      B.S. in Computer Science from Stanford University
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <i
                    className={`fa-brands fa-github ${currentTheme.accent}`}
                  ></i>
                  <div>
                    <p className={`font-semibold ${currentTheme.accent}`}>
                      GitHub:
                    </p>
                    <a
                      href="https://github.com/ArigboJesse"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`underline ${currentTheme.text} hover:${currentTheme.accent}`}
                    >
                      github.com/ArigboJesse
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <i
                    className={`fa-brands fa-linkedin ${currentTheme.accent}`}
                  ></i>
                  <div>
                    <p className={`font-semibold ${currentTheme.accent}`}>
                      LinkedIn:
                    </p>
                    <a
                      href="https://linkedin.com/in/ArigboJesse"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`underline ${currentTheme.text} hover:${currentTheme.accent}`}
                    >
                      linkedin.com/in/ArigboJesse
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <i
                    className={`fa-brands fa-x-twitter ${currentTheme.accent}`}
                  ></i>
                  <div>
                    <p className={`font-semibold ${currentTheme.accent}`}>X:</p>
                    <a
                      href="https://x.com/ArigboJesse"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`underline ${currentTheme.text} hover:${currentTheme.accent}`}
                    >
                      x.com/ArigboJesse
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <i
                    className={`fa-brands fa-facebook ${currentTheme.accent}`}
                  ></i>
                  <div>
                    <p className={`font-semibold ${currentTheme.accent}`}>
                      Facebook:
                    </p>
                    <a
                      href="https://facebook.com/ArigboJesse"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`underline ${currentTheme.text} hover:${currentTheme.accent}`}
                    >
                      facebook.com/ArigboJesse
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <i
                    className={`fa-brands fa-threads ${currentTheme.accent}`}
                  ></i>
                  <div>
                    <p className={`font-semibold ${currentTheme.accent}`}>
                      Threads:
                    </p>
                    <a
                      href="https://threads.net/@ArigboJesse"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`underline ${currentTheme.text} hover:${currentTheme.accent}`}
                    >
                      threads.net/@ArigboJesse
                    </a>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-left mt-8">
                <button
                  onClick={handleCVDownload}
                  className={`px-8 py-3 rounded-full text-lg font-bold ${currentTheme.accent} hover:underline transition-colors duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto md:mx-0`}
                >
                  <i className="fa-solid fa-file-arrow-down"></i>
                  <span className="font-chivo">Download CV</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Project Modal */}
        {isProjectModalOpen && selectedProject && (
          <div className="fixed inset-0 bg-gray-950 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 px-4 py-8">
            <div
              className={`relative p-8 md:p-12 rounded-2xl shadow-2xl border ${currentTheme.border} max-w-4xl w-full transform transition-all duration-300 scale-100 ${currentTheme.cardBg} overflow-y-auto max-h-[90vh]`}
            >
              {/* 'X' close button */}
              <button
                onClick={handleCloseProjectModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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

              <div className="text-center md:text-left">
                <h3
                  className={`font-display text-3xl md:text-4xl font-bold mb-4 ${currentTheme.accent}`}
                >
                  {selectedProject.title}
                </h3>
                <img
                  src={selectedProject.imageUrl}
                  alt={`Image of ${selectedProject.title}`}
                  className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg mb-6 border-2 border-slate-700"
                />

                <p className={`text-lg font-normal mb-6 ${currentTheme.text}`}>
                  {selectedProject.description}
                </p>

                <h4
                  className={`font-display text-2xl font-semibold mb-2 ${currentTheme.accent}`}
                >
                  Key Features:
                </h4>
                <ul
                  className={`list-disc list-inside text-lg mb-6 ${currentTheme.text} space-y-2`}
                >
                  {selectedProject.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      className="inline-block px-6 py-3 text-base font-chivo font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                      View Live Demo
                    </a>
                  )}
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 text-base font-chivo font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-2"
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
                      className="inline-block px-6 py-3 text-base font-chivo font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-2"
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

        {/* Main Content Sections */}
        {/* Navigation */}
        <nav
          className={`fixed top-0 left-0 right-0 z-40 p-4 md:px-8 flex items-center justify-between ${currentTheme.navBg}`}
        >
          <div className="flex items-center space-x-4">
            {logo}
            <span
              className={`text-lg md:text-xl font-bold ${currentTheme.text}`}
            >
              {name}
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6 font-semibold">
            <a
              href="#projects"
              className={`relative group ${currentTheme.navText}`}
            >
              <span>Projects</span>
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 rounded-full ${currentTheme.accent} transition-all duration-300 group-hover:w-full`}
              ></span>
            </a>
            <a
              href="#about"
              onClick={handleOpenAboutModal}
              className={`relative group ${currentTheme.navText}`}
            >
              <span>About</span>
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 rounded-full ${currentTheme.accent} transition-all duration-300 group-hover:w-full`}
              ></span>
            </a>
            <a
              href="#contact"
              className={`relative group ${currentTheme.navText}`}
            >
              <span>Contact</span>
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 rounded-full ${currentTheme.accent} transition-all duration-300 group-hover:w-full`}
              ></span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <select
              onChange={handleThemeChange}
              value={theme}
              className={`p-2 rounded-lg border-2 ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-blue-400`}
            >
              <option value="blue">Blue</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="forest">Forest</option>
            </select>
            <a href="#contact" className="hidden md:block">
              <button
                className={`px-4 py-2 rounded-lg font-bold text-sm bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-sky-500 transition-colors duration-300 text-white shadow-lg`}
              >
                Let's Talk
              </button>
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <header
          id="home"
          className="relative flex flex-col items-center justify-center min-h-screen pt-24 px-4 md:px-8 text-center overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            {/* Subtle background gradient or pattern */}
            <div
              className={`absolute inset-0 opacity-10`}
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at center, rgba(30, 41, 59, 0.2) 0%, rgba(30, 41, 59, 0) 70%)",
              }}
            ></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 leading-tight tracking-tight">
              Hello, I'm{" "}
              <span className="inline-block relative group">
                <span
                  className={`font-display font-bold ${currentTheme.heroAccent}`}
                >
                  Arigbo Jesse
                </span>
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              Full-Stack Developer & Entrepreneur
            </h2>
            <p className="text-lg md:text-xl font-normal max-w-2xl mx-auto mb-8">
              I build high-performance web applications from the ground up,
              blending clean code with creative design to solve real-world
              problems and create seamless user experiences.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#projects">
                <button className="px-8 py-3 rounded-full text-lg font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-sky-500 transition-colors duration-300 shadow-lg transform hover:scale-105">
                  View My Work
                </button>
              </a>
              <a href="#about" onClick={handleOpenAboutModal}>
                <button
                  className={`px-8 py-3 rounded-full text-lg font-bold border-2 ${currentTheme.border} hover:underline transition-colors duration-300 transform hover:scale-105`}
                >
                  Learn More
                </button>
              </a>
            </div>
          </div>
        </header>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h3
              className={`font-display text-4xl md:text-5xl font-bold mb-12 text-center ${currentTheme.accent}`}
            >
              Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProjects.map((project) => (
                <div
                  key={project.id}
                  className={`relative p-6 rounded-2xl shadow-lg border ${currentTheme.border} ${currentTheme.cardBg} transition-transform duration-300 hover:scale-[1.02] transform group overflow-hidden`}
                >
                  {/* Status badge */}
                  <span
                    className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full ${
                      project.status === "in-progress"
                        ? "bg-orange-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {project.status === "in-progress"
                      ? "In Progress"
                      : "Completed"}
                  </span>
                  <div className="relative w-full h-48 md:h-56 rounded-xl overflow-hidden mb-4">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleOpenProjectModal(project)}
                        className="px-6 py-3 bg-white text-gray-900 rounded-full font-semibold text-sm transform transition-all duration-300 scale-95 group-hover:scale-100 opacity-0 group-hover:opacity-100"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  <h4 className="font-display text-2xl font-bold mb-2">
                    {project.title}
                  </h4>
                  <p
                    className={`text-sm ${currentTheme.text} mb-4 line-clamp-3`}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-slate-800 ${currentTheme.accent}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    {project.link && (
                      <a
                        href={project.link}
                        className="flex items-center space-x-1 hover:underline text-sm font-semibold"
                      >
                        <i className="fas fa-external-link-alt"></i>
                        <span>Live</span>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        className="flex items-center space-x-1 hover:underline text-sm font-semibold"
                      >
                        <i className="fab fa-github"></i>
                        <span>GitHub</span>
                      </a>
                    )}
                    {project.docs && (
                      <a
                        href={project.docs}
                        className="flex items-center space-x-1 hover:underline text-sm font-semibold"
                      >
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
        <section id="stack" className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h3
              className={`font-display text-4xl md:text-5xl font-bold mb-12 ${currentTheme.accent}`}
            >
              Tech Stack
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h4
                  className={`text-2xl font-bold mb-6 ${currentTheme.accent}`}
                >
                  Frontend
                </h4>
                <div className="flex flex-wrap justify-center gap-6">
                  {techStack.frontend.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex flex-col items-center justify-center p-4 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 transform"
                    >
                      <img
                        src={tech.logo}
                        alt={`${tech.name} logo`}
                        className="w-12 h-12 mb-2"
                      />
                      <span className="font-medium text-sm">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4
                  className={`text-2xl font-bold mb-6 ${currentTheme.accent}`}
                >
                  Backend
                </h4>
                <div className="flex flex-wrap justify-center gap-6">
                  {techStack.backend.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex flex-col items-center justify-center p-4 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 transform"
                    >
                      <img
                        src={tech.logo}
                        alt={`${tech.name} logo`}
                        className="w-12 h-12 mb-2"
                      />
                      <span className="font-medium text-sm">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h3
              className={`font-display text-4xl md:text-5xl font-bold mb-12 text-center ${currentTheme.accent}`}
            >
              Testimonials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`p-8 rounded-2xl shadow-lg border ${currentTheme.border} ${currentTheme.cardBg} flex flex-col justify-between`}
                >
                  <blockquote className="italic font-normal text-lg leading-relaxed mb-6">
                    <span className="text-3xl font-bold opacity-30 leading-[0] mr-2">
                      "
                    </span>
                    {testimonial.quote}
                    <span className="text-3xl font-bold opacity-30 leading-[0] ml-2">
                      "
                    </span>
                  </blockquote>
                  <div>
                    <p className="font-semibold text-lg mb-1">
                      {testimonial.name}
                    </p>
                    <p className={`text-sm ${currentTheme.text} mb-4`}>
                      {testimonial.title}
                    </p>
                    <div className="flex space-x-4 text-xl">
                      {testimonial.social.map((social, socialIndex) => (
                        <a
                          key={socialIndex}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${currentTheme.accent} hover:text-blue-500`}
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

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <h3
              className={`font-display text-4xl md:text-5xl font-bold mb-6 text-center ${currentTheme.accent}`}
            >
              Get In Touch
            </h3>
            <p className="text-center text-lg md:text-xl font-normal mb-12">
              Have a project in mind or just want to say hi? Feel free to reach
              out!
            </p>
            <form
              onSubmit={handleContactSubmit}
              className={`p-8 md:p-12 rounded-2xl shadow-lg border ${currentTheme.border} ${currentTheme.cardBg} space-y-6`}
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className={`w-full p-4 rounded-lg border-2 ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} ${currentTheme.placeholder} focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200`}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className={`w-full p-4 rounded-lg border-2 ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} ${currentTheme.placeholder} focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200`}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="6"
                className={`w-full p-4 rounded-lg border-2 ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text} ${currentTheme.placeholder} focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200`}
                required
              ></textarea>
              <div className="text-center">
                <button
                  type="submit"
                  className={`px-10 py-4 rounded-full text-lg font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-sky-500 transition-colors duration-300 shadow-lg transform hover:scale-105`}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer
          className={`py-8 px-4 md:px-8 text-center ${currentTheme.bg} border-t ${currentTheme.border}`}
        >
          <div className="max-w-7xl mx-auto">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} {name}. All Rights Reserved.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <a
                href="#"
                aria-label="LinkedIn"
                className={`${currentTheme.text} hover:${currentTheme.accent} transition-colors duration-300`}
              >
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className={`${currentTheme.text} hover:${currentTheme.accent} transition-colors duration-300`}
              >
                <i className="fab fa-github fa-lg"></i>
              </a>
              <a
                href="#"
                aria-label="X"
                className={`${currentTheme.text} hover:${currentTheme.accent} transition-colors duration-300`}
              >
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className={`${currentTheme.text} hover:${currentTheme.accent} transition-colors duration-300`}
              >
                <i className="fab fa-instagram fa-lg"></i>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;
