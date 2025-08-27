"use client"
import React, { useState, useEffect } from 'react';

// Static data for the tech stack
const techStackData = {
  frontend: [
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'SCSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
    { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  ],
  backend: [
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Express', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  ],
};

// Create a map for quick lookup of logos by name
const techMap = [...techStackData.frontend, ...techStackData.backend].reduce((map, tech) => {
  map[tech.name.toLowerCase()] = tech.logo;
  return map;
}, {});

// Consolidated data for all projects with a status property and new links, description, features, and company logos
const allProjects = [
  {
    id: 'p1',
    title: 'Modern E-commerce Platform',
    companyLogoUrl: 'https://placehold.co/100x100/1E293B/a855f7?text=E-Logo',
    description: "This is a comprehensive e-commerce platform built from the ground up. It includes a robust user authentication system, a secure shopping cart, and an admin dashboard for product management. The front-end is powered by React for a fast and dynamic user experience, while the back-end uses Node.js and Express to handle API requests and business logic. Data is stored in a MongoDB database, ensuring scalability and flexibility.",
    features: [
      "User authentication and authorization",
      "Shopping cart and secure checkout",
      "Product listing and search functionality",
      "Admin dashboard for CRUD operations",
      "Order history and tracking"
    ],
    link: '#',
    github: 'https://github.com/ArigboJesse/ecommerce-platform',
    docs: 'https://docs.ecommerce-platform.com',
    imageUrl: 'https://placehold.co/600x400/1E293B/a855f7?text=E-commerce+Platform',
    techStack: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB'],
    status: 'finished'
  },
  {
    id: 'p2',
    title: 'Interactive Data Dashboard',
    companyLogoUrl: 'https://placehold.co/100x100/1E293B/a855f7?text=D-Logo',
    description: "An interactive data visualization dashboard designed to handle and display complex datasets. It fetches data from a PostgreSQL database and uses the D3.js library to create dynamic charts and graphs. The application is optimized for performance, ensuring a smooth experience even with large volumes of data. Python is used on the back-end for data processing and analysis.",
    features: [
      "Real-time data fetching and display",
      "Interactive charts (bar, line, pie) using D3.js",
      "Customizable dashboard widgets",
      "Data filtering and sorting",
      "Responsive design for various screen sizes"
    ],
    link: '#',
    github: 'https://github.com/ArigboJesse/data-dashboard',
    docs: 'https://docs.data-dashboard.com',
    imageUrl: 'https://placehold.co/600x400/1E293B/a855f7?text=Data+Viz',
    techStack: ['React', 'D3.js', 'Python', 'PostgreSQL'],
    status: 'finished'
  },
  {
    id: 'p3',
    title: 'Collaborative Task Management Tool',
    companyLogoUrl: 'https://placehold.co/100x100/1E293B/a855f7?text=T-Logo',
    description: "A real-time collaborative task management tool for teams. It allows multiple users to work on the same project simultaneously, with updates reflected instantly across all devices. The application uses WebSockets for real-time communication and is built on a React front-end with a Node.js/Express back-end. The state management is handled efficiently with React's Context API.",
    features: [
      "Real-time task and project updates",
      "Multi-user collaboration",
      "Task assignment and status tracking",
      "User notifications for project changes",
      "Drag-and-drop interface for task organization"
    ],
    link: '#',
    github: 'https://github.com/ArigboJesse/task-management-tool',
    docs: 'https://docs.task-management-tool.com',
    imageUrl: 'https://placehold.co/600x400/1E293B/a855f7?text=Task+Manager',
    techStack: ['React', 'Node.js', 'WebSockets', 'Context API', 'Express'],
    status: 'in-progress'
  },
];

// Static data for testimonials
const testimonials = [
  {
    name: 'Sarah Chen',
    title: 'Product Manager, Innovate Inc.',
    quote: "Working with Arigbo was a fantastic experience. Their ability to quickly grasp complex requirements and deliver high-quality code was impressive. The project was completed ahead of schedule and exceeded our expectations.",
    social: [
      { platform: 'X', handle: '@sarahchen', url: '#' },
      { platform: 'LinkedIn', handle: 'sarah-chen', url: '#' },
    ]
  },
  {
    name: 'Michael Davis',
    title: 'CTO, Global Tech Solutions',
    quote: "Arigbo's expertise in full-stack development is second to none. They were an invaluable asset to our team, bringing innovative solutions and a commitment to clean, maintainable code. Highly recommended.",
    social: [
      { platform: 'Facebook', handle: 'michael.davis', url: '#' },
      { platform: 'Threads', handle: 'michaelthreads', url: '#' },
    ]
  },
];

// Data for the new community photo gallery
const communityPhotos = [
  {
    id: 'photo-1',
    imgUrl: 'https://placehold.co/800x600/4a5568/ffffff?text=Tech+Meetup',
    altText: 'Group photo at a tech meetup.',
    people: [
      { name: 'Alice', handle: '@tech_alice' },
      { name: 'Bob', handle: '@dev_bob' }
    ]
  },
  {
    id: 'photo-2',
    imgUrl: 'https://placehold.co/800x600/2c5282/ffffff?text=Hackathon+Team',
    altText: 'Team photo after a hackathon.',
    people: [
      { name: 'Charlie', handle: '@code_charlie' },
      { name: 'Dana', handle: '@hacker_dana' },
      { name: 'Eve', handle: '@eve_devs' }
    ]
  },
  {
    id: 'photo-3',
    imgUrl: 'https://placehold.co/800x600/319795/ffffff?text=Workshop',
    altText: 'Me with people at a coding workshop.',
    people: [
      { name: 'Frank', handle: '@frank_codes' },
      { name: 'Grace', handle: '@g_design' }
    ]
  },
  {
    id: 'photo-4',
    imgUrl: 'https://placehold.co/800x600/68d391/319795?text=Gaming+Night',
    altText: 'Friends playing games together.',
    people: [
      { name: 'Heidi', handle: '@gamer_heidi' },
      { name: 'Ivan', handle: '@ivan_plays' },
    ]
  },
];

// New data for communities and their social handles
const communities = [
  {
    name: "GDG Community",
    social: [
      { platform: 'whatsapp', url: '#' },
      { platform: 'X', url: '#' },
      { platform: 'facebook', url: '#' },
      { platform: 'linkedin', url: '#' },
      { platform: 'instagram', url: '#' },
      { platform: 'Discord', url: '#' },
    ]
  },
  {
    name: "Ancients",
    social: [
      { platform: 'whatsapp', url: '#' },
      { platform: 'X', url: '#' },
      { platform: 'linkedin', url: '#' },
      { platform: 'Discord', url: '#' },
    ]
  },
  {
    name: "Sui",
    social: [
      { platform: 'whatsapp', url: '#' },
      { platform: 'X', url: '#' },
      { platform: 'linkedin', url: '#' },
      { platform: 'Discord', url: '#' },
      { platform: 'Telegram', url: '#' },
    ]
  },
  {
    name: "Codex",
    social: [
      { platform: 'whatsapp', url: '#' },
      { platform: 'X', url: '#' },
      { platform: 'facebook', url: '#' },
      { platform: 'linkedin', url: '#' },
      { platform: 'instagram', url: '#' },
      { platform: 'Discord', url: '#' },
    ]
  },
];


const App = () => {

const [modal, setModal] = useState({ show: false, message: '', type: '' });
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [theme, setTheme] = useState('blue'); // Default theme
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // [Collaborators, calculateYearsOfExperience, handleCVDownload, handleContactSubmit, etc. remain unchanged]

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'blue';
      setTheme(savedTheme);

      const root = document.documentElement;

      let rootBg, rootText, navBg, navBlur, navShadow, navTextColor, navTextHover, cardBg, cardShadow, borderColor, accentColor, heroFrom, heroTo, heroHoverFrom, heroHoverTo, placeholderColor;

      switch (savedTheme) {
        case 'light':
          rootBg = '#f3f4f6';
          rootText = '#1f2937';
          navBg = 'rgba(255,255,255,0.9)';
          navBlur = 'blur(8px)';
          navShadow = '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)';
          navTextColor = '#4a5568';
          navTextHover = '#2563eb';
          cardBg = '#ffffff';
          cardShadow = '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)';
          borderColor = '#e2e8f0';
          accentColor = '#2563eb';
          heroFrom = '#06b6d4';
          heroTo = '#2563eb';
          heroHoverFrom = '#2563eb';
          heroHoverTo = '#06b6d4';
          placeholderColor = '#a0aec0';
          break;
        case 'dark':
          rootBg = '#030712';
          rootText = '#f3f4f6';
          navBg = 'rgba(3,7,18,0.9)';
          navBlur = 'blur(8px)';
          navShadow = '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)';
          navTextColor = '#9ca3af';
          navTextHover = '#60a5fa';
          cardBg = '#111827';
          cardShadow = '0 20px 25px -5px rgba(31,41,55,0.5), 0 8px 10px -6px rgba(31,41,55,0.5)';
          borderColor = '#1f2937';
          accentColor = '#60a5fa';
          heroFrom = '#38bdf8';
          heroTo = '#3b82f6';
          heroHoverFrom = '#3b82f6';
          heroHoverTo = '#38bdf8';
          placeholderColor = '#6b7280';
          break;
        case 'blue':
          rootBg = '#020617';
          rootText = '#e2e8f0';
          navBg = 'rgba(2,6,23,0.9)';
          navBlur = 'blur(8px)';
          navShadow = '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)';
          navTextColor = '#94a3b8';
          navTextHover = '#38bdf8';
          cardBg = '#0f172a';
          cardShadow = '0 20px 25px -5px rgba(30,41,59,0.5), 0 8px 10px -6px rgba(30,41,59,0.5)';
          borderColor = '#1e293b';
          accentColor = '#38bdf8';
          heroFrom = '#38bdf8';
          heroTo = '#3b82f6';
          heroHoverFrom = '#3b82f6';
          heroHoverTo = '#38bdf8';
          placeholderColor = '#64748b';
          break;
        case 'forest':
          rootBg = '#1f2937';
          rootText = '#e5e7eb';
          navBg = 'rgba(31,41,55,0.9)';
          navBlur = 'blur(8px)';
          navShadow = '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)';
          navTextColor = '#d1d5db';
          navTextHover = '#60a5fa';
          cardBg = '#374151';
          cardShadow = '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)';
          borderColor = '#4a5568';
          accentColor = '#60a5fa';
          heroFrom = '#06b6d4';
          heroTo = '#2563eb';
          heroHoverFrom = '#2563eb';
          heroHoverTo = '#06b6d4';
          placeholderColor = '#a0aec0';
          break;
        case 'purple':
          rootBg = '#0f031a';
          rootText = '#f3e8ff';
          navBg = 'rgba(15,3,26,0.9)';
          navBlur = 'blur(8px)';
          navShadow = '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)';
          navTextColor = '#d8b4fe';
          navTextHover = '#a855f7';
          cardBg = '#1c0933';
          cardShadow = '0 20px 25px -5px rgba(76,29,149,0.5), 0 8px 10px -6px rgba(76,29,149,0.5)';
          borderColor = '#3b0764';
          accentColor = '#d946ef';
          heroFrom = '#c084fc';
          heroTo = '#a855f7';
          heroHoverFrom = '#a855f7';
          heroHoverTo = '#c084fc';
          placeholderColor = '#a78bfa';
          break;
        case 'orange':
          rootBg = '#2c0a00';
          rootText = '#ffedd5';
          navBg = 'rgba(44,10,0,0.9)';
          navBlur = 'blur(8px)';
          navShadow = '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)';
          navTextColor = '#fdba74';
          navTextHover = '#f97316';
          cardBg = '#431407';
          cardShadow = '0 20px 25px -5px rgba(124,45,18,0.5), 0 8px 10px -6px rgba(124,45,18,0.5)';
          borderColor = '#7c2d12';
          accentColor = '#fb923c';
          heroFrom = '#fdba74';
          heroTo = '#f97316';
          heroHoverFrom = '#f97316';
          heroHoverTo = '#fdba74';
          placeholderColor = '#ea580c';
          break;
        default:
          break;
      }

      root.style.setProperty('--root-bg', rootBg);
      root.style.setProperty('--root-text', rootText);
      root.style.setProperty('--nav-bg', navBg);
      root.style.setProperty('--nav-blur', navBlur);
      root.style.setProperty('--nav-shadow', navShadow);
      root.style.setProperty('--nav-text-color', navTextColor);
      root.style.setProperty('--nav-text-hover', navTextHover);
      root.style.setProperty('--card-bg', cardBg);
      root.style.setProperty('--card-shadow', cardShadow);
      root.style.setProperty('--border-color', borderColor);
      root.style.setProperty('--accent-color', accentColor);
      root.style.setProperty('--hero-from', heroFrom);
      root.style.setProperty('--hero-to', heroTo);
      root.style.setProperty('--hero-hover-from', heroHoverFrom);
      root.style.setProperty('--hero-hover-to', heroHoverTo);
      root.style.setProperty('--placeholder-color', placeholderColor);

      localStorage.setItem('theme', savedTheme);
    }
  }, []);

const handleThemeChange = (e) => {
  const newTheme = e.target.value;
  setTheme(newTheme);
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', newTheme);
  }
};

  // [Rest of the component code remains unchanged]

  // New data for collaborators
  const collaborators = [
    { name: "John Doe", handle: "@johndoe", photo: "https://placehold.co/300x300/1E293B/a855f7?text=John", collaboration: "Worked on E-commerce Platform, handled backend API development." },
    { name: "Jane Smith", handle: "@janesmith", photo: "https://placehold.co/300x300/1E293B/a855f7?text=Jane", collaboration: "Collaborated on Data Dashboard, focused on data visualization." },
    { name: "Sam Wilson", handle: "@samw", photo: "https://placehold.co/300x300/1E293B/a855f7?text=Sam", collaboration: "Team member for Task Management Tool, implemented real-time features." },
    { name: "Emily Clark", handle: "@emilyc", photo: "https://placehold.co/300x300/1E293B/a855f7?text=Emily", collaboration: "Assisted in frontend design for multiple projects." },
    { name: "David Lee", handle: "@davidl", photo: "https://placehold.co/300x300/1E293B/a855f7?text=David", collaboration: "Contributed to database optimization in E-commerce Platform." },
    { name: "Alice Brown", handle: "@aliceb", photo: "https://placehold.co/300x300/1E293B/a855f7?text=Alice", collaboration: "Worked on Python scripts for Data Dashboard analytics." },
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
      message: 'This is a demo. A PDF download would be triggered here.',
      type: 'info'
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setModal({
      show: true,
      message: 'This is a static demo. A real full-stack portfolio would have a backend to handle form submissions.',
      type: 'info'
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

  const name = "Arigbo Jesse";
  const logo = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', borderWidth: '2px', borderColor: 'var(--border-color)', color: 'var(--accent-color)', fontWeight: '700', fontSize: '1.25rem', fontFamily: 'Chivo, sans-serif', transition: 'transform 0.3s' }} className="group-hover:rotate-12">
      LD
    </div>
  );

  const handleOpenAboutModal = () => {
    setIsAboutModalOpen(true);
  };

  const handleOpenContactModal = () => {
    setIsContactModalOpen(true);
  };

  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'x':
        return <i className="fab fa-twitter"></i>;
      case 'linkedin':
        return <i className="fab fa-linkedin-in"></i>;
      case 'facebook':
        return <i className="fab fa-facebook-f"></i>;
      case 'whatsapp':
        return <i className="fab fa-whatsapp"></i>;
      case 'instagram':
        return <i className="fab fa-instagram"></i>;
      case 'discord':
        return <i className="fab fa-discord"></i>;
      case 'telegram':
        return <i className="fab fa-telegram-plane"></i>;
      default:
        return <i className="fas fa-link"></i>;
    }
  };

  // Function to get an icon for a community
  const getCommunityIcon = (communityName) => {
    switch (communityName.toLowerCase()) {
      case 'gdg community':
        return <i style={{ fontSize: '2rem', color: '#38bdf8' }} className="fas fa-users"></i>;
      case 'ancients':
        return <i style={{ fontSize: '2rem', color: '#60a5fa' }} className="fas fa-university"></i>;
      case 'sui':
        return <i style={{ fontSize: '2rem', color: '#22c55e' }} className="fas fa-seedling"></i>;
      case 'codex':
        return <i style={{ fontSize: '2rem', color: '#eab308' }} className="fas fa-book-open"></i>;
      default:
        return <i style={{ fontSize: '2rem', color: '#9ca3af' }} className="fas fa-globe"></i>;
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
          
                .about-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 3rem;
          }

          @media (min-width: 768px) {
            .about-content {
              flex-direction: row;
              align-items: flex-start;
              gap: 3rem;
            }
          }

          .about-image-container {
            flex-shrink: 0;
            margin-bottom: 1.5rem;
            display: none;
          }

          @media (min-width: 768px) {
            .about-image-container {
              display: flex;
              margin-bottom: 0;
            }
          }

          .about-image {
            height: 100%;
            width: auto;
            border-radius: 0.75rem;
            object-fit: cover;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
          }

          .about-text {
            text-align: center;
          }

          @media (min-width: 768px) {
            .about-text {
              text-align: left;
            }
          }

          .about-title {
            font-family: 'Funnel Display', sans-serif;
            font-size: 1.875rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--accent-color);
          }

          @media (min-width: 768px) {
            .about-title {
              font-size: 2.25rem;
            }
          }

          .about-desc {
            font-size: 1.125rem;
            font-weight: 400;
            margin-bottom: 1.5rem;
            color: var(--root-text);
          }

          .section-space {
            margin-top: 2rem;
            display: flex;
            flex-direction: column;
            gap: 3rem;
            text-align: center;
          }

          @media (min-width: 768px) {
            .section-space {
              text-align: left;
            }
          }

          .subsection-title {
            font-family: 'Funnel Display', sans-serif;
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--accent-color);
          }

          .subsection-desc {
            font-weight: 400;
            font-size: 1.125rem;
            color: var(--root-text);
            margin-bottom: 1rem;
          }

          .diagram-image {
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
            border-width: 2px;
            border-color: #334155;
            max-width: 100%;
            height: auto;
          }

          .coworker-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem; /* increased gap for better spacing */
            margin-top: 1.5rem;
          }

          @media (min-width: 768px) {
            .coworker-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          @media (min-width: 1024px) {
            .coworker-grid {
              grid-template-columns: repeat(4, 1fr);
            }
          }

          .photo-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-top: 2rem;
          }

          @media (min-width: 768px) {
            .photo-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          @media (min-width: 1024px) {
            .photo-grid {
              grid-template-columns: repeat(4, 1fr);
            }
          }

          .photo-card {
            position: relative;
            border-radius: 0.5rem;
            overflow: hidden;
            transition: transform 0.3s;
          }

          .photo-card:hover {
            transform: scale(1.05);
          }

          .photo-img {
            width: 100%;
            height: 12rem;
            object-fit: cover;
            transition: transform 0.3s;
          }

          .photo-card:hover .photo-img {
            transform: scale(1.1);
          }

          /* Improved community card styles */
          .community-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem; /* increased gap */
          }

          @media (min-width: 768px) {
            .community-grid {
              grid-template-columns: 1fr 1fr;
            }
          }

          @media (min-width: 1024px) {
            .community-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          .community-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem; /* more padding */
            border-radius: 1.25rem; /* softer corners */
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); /* softer shadow */
            border-width: 1px;
            border-color: var(--border-color);
            background-color: var(--card-bg);
            transition: transform 0.3s, box-shadow 0.3s;
          }

          .community-card:hover {
            transform: translateY(-10px); /* lift effect */
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
          }

          .community-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem; /* more space */
          }

          .community-name {
            font-family: 'Funnel Display', sans-serif;
            font-size: 1.5rem; /* larger name */
            font-weight: 700;
          }

          .community-social {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1.25rem; /* larger gap between icons */
          }

          .community-social-link {
            padding: 1rem; /* larger padding for icons */
            border-radius: 9999px;
            color: var(--accent-color);
            transition: color 0.3s, background-color 0.3s, transform 0.3s;
            font-size: 1.5rem; /* larger icons */
          }

          .community-social-link:hover {
            color: white;
            background-color: #0ea5e9;
            transform: scale(1.15); /* larger scale */
          }

          .info-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            text-align: left;
            margin-top: 2rem;
            font-weight: 400;
          }

          @media (min-width: 640px) {
            .info-grid {
              grid-template-columns: 1fr 1fr;
            }
          }

          .info-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .info-icon {
            color: var(--accent-color);
          }

          .info-label {
            font-weight: 600;
            color: var(--accent-color);
          }

          .info-value {
            color: var(--root-text);
          }

          .info-link {
            text-decoration: underline;
            color: var(--root-text);
            transition: color 0.3s;
          }

          .info-link:hover {
            color: var(--accent-color);
          }

          .cv-button {
            padding-left: 2rem;
            padding-right: 2rem;
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            border-radius: 9999px;
            font-size: 1.125rem;
            font-weight: 700;
            color: var(--accent-color);
            transition: text-decoration 0.3s, transform 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            margin-left: auto;
            margin-right: auto;
          }

          @media (min-width: 768px) {
            .cv-button {
              margin-left: 0;
              margin-right: 0;
            }
          }

          .cv-button:hover {
            text-decoration: underline;
            transform: scale(1.05);
          }

          .project-modal-inner {
            position: relative;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
            border-width: 1px;
            border-color: var(--border-color);
            max-width: 64rem;
            width: 100%;
            transform: scale(1);
            transition: all 0.3s;
            background-color: var(--card-bg);
            overflow-y: auto;
            max-height: 90vh;
          }

          @media (min-width: 768px) {
            .project-modal-inner {
              padding: 3rem;
            }
          }

          .project-title {
            font-family: 'Funnel Display', sans-serif;
            font-size: 1.875rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--accent-color);
          }

          @media (min-width: 768px) {
            .project-title {
              font-size: 2.25rem;
            }
          }

          .project-image {
            width: 100%;
            height: 16rem;
            object-fit: cover;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
            margin-bottom: 1.5rem;
            border-width: 2px;
            border-color: #334155;
          }

          @media (min-width: 768px) {
            .project-image {
              height: 20rem;
            }
          }

          .project-desc {
            font-size: 1.125rem;
            font-weight: 400;
            margin-bottom: 1.5rem;
            color: var(--root-text);
          }

          .features-title {
            font-family: 'Funnel Display', sans-serif;
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: var(--accent-color);
          }

          .features-list {
            list-style-type: disc;
            padding-left: 1.25rem;
            font-size: 1.125rem;
            margin-bottom: 1.5rem;
            color: var(--root-text);
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .project-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            margin-top: 1rem;
            justify-content: center;
          }

          @media (min-width: 768px) {
            .project-buttons {
              justify-content: flex-start;
            }
          }

          .project-link-button {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
            font-family: 'Chivo', sans-serif;
            font-weight: 500;
            color: white;
            background-color: #2563eb;
            border-radius: 0.5rem;
            transition: background-color 0.3s;
          }

          .project-link-button:hover {
            background-color: #1d4ed8;
          }

          .github-button {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
            font-family: 'Chivo', sans-serif;
            font-weight: 500;
            color: white;
            background-color: #374151;
            border-radius: 0.5rem;
            transition: background-color 0.3s;
          }

          .github-button:hover {
            background-color: #1f2937;
          }

          .docs-button {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
            font-family: 'Chivo', sans-serif;
            font-weight: 500;
            color: white;
            background-color: #374151;
            border-radius: 0.5rem;
            transition: background-color 0.3s;
          }

          .docs-button:hover {
            background-color: #1f2937;
          }

          .about-modal-overlay {
            position: fixed;
            inset: 0;
            background-color: rgba(3,7,18,0.75);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 50;
            transition: opacity 0.3s;
            padding-left: 1rem;
            padding-right: 1rem;
            padding-top: 2rem;
            padding-bottom: 2rem;
          }

          .project-modal-overlay {
            position: fixed;
            inset: 0;
            background-color: rgba(3,7,18,0.75);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 50;
            transition: opacity 0.3s;
            padding-left: 1rem;
            padding-right: 1rem;
            padding-top: 2rem;
            padding-bottom: 2rem;
          }

          .modal-button {
            margin-top: 1rem;
            padding: 0.5rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            transition: background-image 0.3s;
          }

          .about-modal-inner {
            position: relative;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
            border-width: 1px;
            border-color: var(--border-color);
            max-width: 80rem;
            width: 100%;
            transform: scale(1);
            transition: all 0.3s;
            background-color: var(--card-bg);
            overflow-y: auto;
            max-height: 90vh;
          }

          @media (min-width: 768px) {
            .about-modal-inner {
              padding: 3rem;
            }
          }

          .close-button {
            position: fixed;
            top: 1rem;
            right: 1rem;
            color: #9ca3af;
            transition: color 0.3s;
            z-index: 50;
          }

          .close-button:hover {
            color: #60a5fa;
          }

          .project-modal-text {
            text-align: center;
          }

          @media (min-width: 768px) {
            .project-modal-text {
              text-align: left;
            }
          }

          .line-clamp-3 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
          }
          /* Improved styles for the Instagram-style collaborator section */
          .collaborator-card {
            background-color: var(--card-bg);
            border-radius: 1rem;
            box-shadow: var(--card-shadow);
            overflow: hidden;
            transition: transform 0.3s, box-shadow 0.3s;
          }

          .collaborator-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
          }

          .collaborator-photo {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }

          .collaborator-info {
            padding: 1rem;
          }

          .collaborator-name {
            font-size: 1.125rem;
            font-weight: 700;
            margin-bottom: 0.25rem;
          }

          .collaborator-handle {
            font-size: 0.875rem;
            color: var(--accent-color);
            margin-bottom: 0.5rem;
          }

          .collaborator-collaboration {
            font-size: 0.875rem;
            color: var(--root-text);
          }

          /* Hero improvements */
          .hero {
            position: relative;
            overflow: hidden;
          }

          .hero-bg::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
            animation: rotate 20s linear infinite;
          }

          @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .hero-title {
            position: relative;
            z-index: 10;
          }

          .hero-subtitle, .hero-desc {
            position: relative;
            z-index: 10;
          }

          /* Header improvements */
          .nav {
            transition: background-color 0.3s, box-shadow 0.3s;
          }

          .nav:hover {
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
          }

          .nav-items a {
            position: relative;
          }

          .nav-items a::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background-color: var(--accent-color);
            transition: width 0.3s;
          }

          .nav-items a:hover::after {
            width: 100%;
          }

          /* About layout improvements */
          .about-content {
            gap: 2rem;
          }

          .about-image-container {
            max-width: 40%;
          }

          .about-text {
            flex: 1;
          }

          /* Project modal tools */
          .tools-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            margin-top: 1rem;
          }

          .tool-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            background-color: var(--border-color);
            border-radius: 9999px;
            font-size: 0.875rem;
          }

          .tool-logo {
            width: 1.25rem;
            height: 1.25rem;
          }

          /* Contact modal */
          .contact-modal-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          /* Other styles remain the same */
          .nav-link {
            color: var(--nav-text-color);
            transition: color 0.3s;
          }

          .nav-link:hover {
            color: var(--nav-text-hover);
          }

          .hero-accent {
            color: transparent;
            background-clip: text;
            background-image: linear-gradient(to right, var(--hero-from), var(--hero-to));
            transition: background-image 0.3s;
          }

          .group:hover .hero-accent {
            background-image: linear-gradient(to right, var(--hero-hover-from), var(--hero-hover-to));
          }

          input::placeholder, textarea::placeholder {
            color: var(--placeholder-color);
          }

          .gradient-button {
            background-image: linear-gradient(to right, #0ea5e9, #2563eb);
            transition: background-image 0.3s;
            color: white;
          }

          .gradient-button:hover {
            background-image: linear-gradient(to right, #2563eb, #0ea5e9);
          }

          .underline-hover {
            position: relative;
          }

          .underline-hover::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 0.125rem;
            background-color: var(--accent-color);
            transition: width 0.3s;
            border-radius: 9999px;
          }

          .underline-hover:hover::after {
            width: 100%;
          }

          .project-card {
            position: relative;
            padding: 1.5rem;
            border-radius: 1rem;
            box-shadow: var(--card-shadow);
            border-width: 1px;
            border-color: var(--border-color);
            background-color: var(--card-bg);
            transition: transform 0.3s;
          }

          .project-card:hover {
            transform: scale(1.02);
          }

          .status-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            padding: 0.25rem 0.75rem;
            font-size: 0.75rem;
            font-weight: 600;
            border-radius: 9999px;
          }

          .image-container {
            position: relative;
            width: 100%;
            height: 12rem;
            border-radius: 0.75rem;
            overflow: hidden;
            margin-bottom: 1rem;
          }

          @media (min-width: 768px) {
            .image-container {
              height: 14rem;
            }
          }

          .image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s;
          }

          .project-card:hover .image-container img {
            transform: scale(1.1);
          }

          .overlay {
            position: absolute;
            inset: 0;
            background-color: rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s;
          }

          .project-card:hover .overlay {
            opacity: 1;
          }

          .detail-button {
            padding: 0.75rem 1.5rem;
            background-color: white;
            color: #111827;
            border-radius: 9999px;
            font-weight: 600;
            font-size: 0.875rem;
            transform: scale(0.95);
            transition: all 0.3s;
            opacity: 0;
          }

          .project-card:hover .detail-button {
            transform: scale(1);
            opacity: 1;
          }

          .tech-tag {
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 500;
            background-color: #1e293b;
            color: var(--accent-color);
          }

          .link {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 600;
            transition: text-decoration 0.3s;
          }

          .link:hover {
            text-decoration: underline;
          }

          .theme-select {
            padding: 0.5rem;
            border-radius: 0.5rem;
            border-width: 2px;
            border-color: var(--border-color);
            background-color: var(--card-bg);
            color: var(--root-text);
            transition: border-color 0.3s;
          }

          .theme-select:focus {
            outline: none;
            box-shadow: 0 0 0 2px #3b82f6;
          }

          .nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 40;
            padding: 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: var(--nav-bg);
            backdrop-filter: var(--nav-blur);
            box-shadow: var(--nav-shadow);
            transition: all 0.3s ease;
          }

          @media (min-width: 768px) {
            .nav {
              padding-left: 2rem;
              padding-right: 2rem;
            }
          }

          .nav-items {
            display: none;
          }

          @media (min-width: 768px) {
            .nav-items {
              display: flex;
              align-items: center;
              gap: 1.5rem;
              font-weight: 600;
            }
          }

          .talk-button {
            display: none;
          }

          @media (min-width: 768px) {
            .talk-button {
              display: block;
            }
          }

          .hero {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding-top: 6rem;
            padding-left: 1rem;
            padding-right: 1rem;
            text-align: center;
            overflow: hidden;
          }

          @media (min-width: 768px) {
            .hero {
              padding-left: 2rem;
              padding-right: 2rem;
            }
          }

          .hero-bg {
            position: absolute;
            inset: 0;
            z-index: 0;
          }

          .hero-gradient {
            position: absolute;
            inset: 0;
            opacity: 0.1;
            background-image: radial-gradient(ellipse at center, rgba(30,41,59,0.2) 0%, rgba(30,41,59,0) 70%);
          }

          .hero-content {
            position: relative;
            z-index: 10;
            max-width: 64rem;
            margin-left: auto;
            margin-right: auto;
          }

          .hero-title {
            font-family: 'Funnel Display', sans-serif;
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
            line-height: 1.1;
            letter-spacing: -0.025em;
            animation: fadeInDown 1s ease-out;
          }

          @media (min-width: 768px) {
            .hero-title {
              font-size: 4.5rem;
            }
          }

          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .hero-subtitle {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            animation: fadeIn 1.5s ease-out;
          }

          @media (min-width: 768px) {
            .hero-subtitle {
              font-size: 1.875rem;
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .hero-desc {
            font-size: 1.125rem;
            font-weight: 400;
            max-width: 32rem;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 2rem;
            animation: fadeIn 2s ease-out;
          }

          @media (min-width: 768px) {
            .hero-desc {
              font-size: 1.25rem;
            }
          }

          .hero-buttons {
            display: flex;
            justify-content: center;
            gap: 1rem;
          }

          .view-work-button {
            padding-left: 2rem;
            padding-right: 2rem;
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            border-radius: 9999px;
            font-size: 1.125rem;
            font-weight: 700;
            color: white;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);
            transform: scale(1);
            transition: transform 0.3s, background-image 0.3s;
            animation: fadeInUp 2.5s ease-out;
          }

          .view-work-button:hover {
            transform: scale(1.05);
          }

          .learn-more-button {
            padding-left: 2rem;
            padding-right: 2rem;
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            border-radius: 9999px;
            font-size: 1.125rem;
            font-weight: 700;
            border-width: 2px;
            border-color: var(--border-color);
            transition: transform 0.3s;
            animation: fadeInUp 2.5s ease-out;
          }

          .learn-more-button:hover {
            transform: scale(1.05);
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .section {
            padding-top: 5rem;
            padding-bottom: 5rem;
            padding-left: 1rem;
            padding-right: 1rem;
          }

          @media (min-width: 768px) {
            .section {
              padding-left: 2rem;
              padding-right: 2rem;
            }
          }

          .container {
            max-width: 80rem;
            margin-left: auto;
            margin-right: auto;
          }

          .section-title {
            font-family: 'Funnel Display', sans-serif;
            font-size: 2.25rem;
            font-weight: 700;
            margin-bottom: 3rem;
            text-align: center;
            color: var(--accent-color);
          }

          @media (min-width: 768px) {
            .section-title {
              font-size: 3rem;
            }
          }

          .projects-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          @media (min-width: 768px) {
            .projects-grid {
              grid-template-columns: 1fr 1fr;
            }
          }

          @media (min-width: 1024px) {
            .projects-grid {
              grid-template-columns: 1fr 1fr 1fr;
            }
          }

          .tech-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          @media (min-width: 1024px) {
            .tech-grid {
              grid-template-columns: 1fr 1fr;
            }
          }

          .tech-category-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: var(--accent-color);
          }

          .tech-icons {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1.5rem;
          }

          .tech-icon {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 transform;
          }

          .tech-logo {
            width: 3rem;
            height: 3rem;
            margin-bottom: 0.5rem;
          }

          .tech-name {
            font-weight: 500;
            font-size: 0.875rem;
          }

          .testimonials-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          @media (min-width: 768px) {
            .testimonials-grid {
              grid-template-columns: 1fr 1fr;
            }
          }

          .testimonial-card {
            padding: 2rem;
            rounded-2xl shadow-lg border var(--border-color) var(--card-bg) flex flex-col justify-between;
          }

          .quote {
            italic font-normal text-lg leading-relaxed mb-6;
          }

          .quote-span {
            text-3xl font-bold opacity-30 leading-[0];
          }

          .name {
            font-semibold text-lg mb-1;
          }

          .title {
            text-sm var(--root-text) mb-4;
          }

          .social-links {
            flex space-x-4 text-xl;
          }

          .social-link {
            var(--accent-color) hover:text-blue-500;
          }

          .contact-container {
            max-w-3xl mx-auto;
          }

          .contact-desc {
            text-center text-lg md:text-xl font-normal mb-12;
          }

          .contact-form {
            p-8 md:p-12 rounded-2xl shadow-lg border var(--border-color) var(--card-bg) space-y-6;
          }

          .form-input {
            w-full p-4 rounded-lg border-2 var(--border-color) var(--card-bg) var(--root-text) var(--placeholder-color) focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200;
          }

          .form-textarea {
            w-full p-4 rounded-lg border-2 var(--border-color) var(--card-bg) var(--root-text) var(--placeholder-color) focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200;
          }

          .form-submit-container {
            text-center;
          }

          .submit-button {
            px-10 py-4 rounded-full text-lg font-bold text-white gradient-button shadow-lg transform hover:scale-105;
          }

          .footer {
            py-8 px-4 md:px-8 text-center var(--root-bg) border-t var(--border-color);
          }

          .footer-text {
            text-sm;
          }

          .footer-links {
            mt-4 flex justify-center space-x-6;
          }

          .footer-link {
            var(--root-text) hover:var(--accent-color) transition-colors duration-300;
          }

          .modal-close {
            text-gray-400 hover:text-blue-400 transition-colors duration-300;
          }

    
          .photo-grid {
            grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8;
          }

          .photo-card {
            relative rounded-lg overflow-hidden photo-card-container group transform hover:scale-105 transition-transform duration-300;
          }

          .photo-img {
            w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110;
          }

          .community-grid {
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
          }

          .community-card {
            flex flex-col items-center p-6 rounded-xl shadow-lg border var(--border-color) var(--card-bg) transition-transform duration-300 hover:scale-[1.02] transform;
          }

          .community-header {
            flex items-center space-x-4 mb-4;
          }

          .community-name {
            font-display text-xl font-bold;
          }

          .community-social {
            flex flex-wrap justify-center gap-4;
          }

          .community-social-link {
            p-3 rounded-full var(--accent-color) hover:text-white hover:bg-sky-500 transition-colors duration-300 transform hover:scale-110;
          }

          .info-grid {
            grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mt-8 font-normal;
          }

          .info-item {
            flex items-center space-x-2;
          }

          .info-icon {
            var(--accent-color);
          }

          .info-label {
            font-semibold var(--accent-color);
          }

          .info-value {
            var(--root-text);
          }

          .info-link {
            underline var(--root-text) hover:var(--accent-color);
          }

          .cv-button {
            px-8 py-3 rounded-full text-lg font-bold var(--accent-color) hover:underline transition-colors duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto md:mx-0;
          }

          .project-modal-inner {
            relative p-8 md:p-12 rounded-2xl shadow-2xl border var(--border-color) max-w-4xl w-full transform transition-all duration-300 scale-100 var(--card-bg) overflow-y-auto max-h-[90vh];
          }

          .project-title {
            font-display text-3xl md:text-4xl font-bold mb-4 var(--accent-color);
          }

          .project-image {
            w-full h-64 md:h-80 object-cover rounded-xl shadow-lg mb-6 border-2 border-slate-700;
          }

          .project-desc {
            text-lg font-normal mb-6 var(--root-text);
          }

          .features-title {
            font-display text-2xl font-semibold mb-2 var(--accent-color);
          }

          .features-list {
            list-disc list-inside text-lg mb-6 var(--root-text) space-y-2;
          }

          .project-buttons {
            flex flex-wrap gap-4 mt-4 justify-center md:justify-start;
          }

          .project-link-button {
            inline-block px-6 py-3 text-base font-chivo font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300;
          }

          .github-button {
            inline-block px-6 py-3 text-base font-chivo font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-2;
          }

          .docs-button {
            inline-block px-6 py-3 text-base font-chivo font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center space-x-2;
          }

          .about-modal-overlay {
            fixed inset-0 bg-gray-950 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 px-4 py-8;
          }

          .project-modal-overlay {
            fixed inset-0 bg-gray-950 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 px-4 py-8;
          }

          .modal-button {
            mt-4 px-6 py-2 rounded-lg gradient-button transition-colors duration-300 text-white font-semibold;
          }

          .about-modal-inner {
            relative p-8 md:p-12 rounded-2xl shadow-2xl border var(--border-color) max-w-5xl w-full transform transition-all duration-300 scale-100 var(--card-bg) overflow-y-auto max-h-[90vh];
          }

          .close-button {
            absolute top-4 right-4 text-gray-400 hover:text-blue-400 transition-colors duration-300;
          }

          .project-modal-text {
            text-center md:text-left;
          }

          .line-clamp-3 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
          }
        `}
      </style>
      <div style={{ backgroundColor: 'var(--root-bg)', color: 'var(--root-text)', minHeight: '100vh', fontFamily: 'Chivo, sans-serif', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', lineHeight: '1.625', overflowX: 'hidden' }}>
        {/* General Purpose Modal for messages */}
        {modal.show && (
          <div className="about-modal-overlay">
            <div style={{ padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', borderWidth: '1px', borderColor: 'var(--border-color)', transform: 'scale(1)', transition: 'all 0.3s', backgroundColor: 'var(--card-bg)', textAlign: 'center' }}>
              <p style={{ fontWeight: '400', fontSize: '1.125rem' }}>{modal.message}</p>
              <button
                onClick={() => setModal({ ...modal, show: false })}
                className="gradient-button modal-button"
                style={{ fontWeight: '600' }}
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
              <button onClick={() => setIsAboutModalOpen(false)} className="close-button">
                <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.5rem', width: '1.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                  <h3 
                    className="about-title"
                  >
                    More About Me
                  </h3>
                  <p className="about-desc">
                    I am a passionate and results-driven software developer dedicated to crafting exceptional user experiences and robust, scalable back-end systems.
                  </p>

                  <div style={{ marginBottom: '2rem' }}>
                    <h4 className="subsection-title">My Journey</h4>
                    <p className="subsection-desc">
                      My fascination with technology began with building simple websites in high school. This hobby quickly evolved into a career-long commitment to mastering the full development life cycle. I thrive on the challenge of transforming complex ideas into elegant, functional code. With a background in computer science, I've spent the last {yearsOfExperience} years building and maintaining web applications for both startups and established companies, focusing on clean architecture, performance optimization, and seamless user experiences.
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
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                    I specialize in a modern, comprehensive toolkit that allows me to build applications efficiently. My primary stack revolves around **React** for dynamic, component-based front-ends and **Node.js with Express** for building fast, scalable APIs. I'm proficient in utilizing **PostgreSQL** and **MongoDB** for flexible data storage solutions. For development, I rely on tools like **Git** for version control, **Webpack** for asset bundling, and **Docker** for containerization to ensure a consistent development environment.
                  </p>
                </div>

                {/* People I've Collaborated With */}
                <div>
                  <h4 className="subsection-title">People I've Collaborated With</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                    {collaborators.map((collab, index) => (
                      <div key={index} className="collaborator-card">
                        <img src={collab.photo} alt={collab.name} className="collaborator-photo" />
                        <div className="collaborator-info">
                          <p className="collaborator-name">{collab.name}</p>
                          <p className="collaborator-handle">{collab.handle}</p>
                          <p className="collaborator-collaboration">{collab.collaboration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Community & Connections */}
                <div>
                  <h4 className="subsection-title">Connecting with the Community</h4>
                  <p className="subsection-desc">
                    My journey isn't just about code; it's also about people. I believe in continuous learning and collaboration, which is why I actively participate in tech events and conferences. I've had the pleasure of attending events like **React Conf** and **Node.js Summit**, where I've met inspiring developers, product managers, and mentors. These connections have enriched my understanding of the industry and have led to exciting new opportunities.
                  </p>
                  
                  <div className="photo-grid">
                    {communityPhotos.map(photo => (
                      <div key={photo.id} className="photo-card photo-card-container group">
                        <img
                          src={photo.imgUrl}
                          alt={photo.altText}
                          className="photo-img"
                          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/cccccc/000000?text=Image+Load+Error'; }}
                        />
                        <div className="handle-overlay absolute inset-0 flex flex-col justify-end p-2 md:p-4">
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {photo.people.map((person, index) => (
                              <span key={index} className="handle-text" style={{ fontSize: '0.875rem', fontWeight: '600', color: 'white' }}>
                                {person.handle}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* New Communities Section */}
                  <h4 className="subsection-title" style={{ marginTop: '3rem' }}>My Communities</h4>
                  <p className="subsection-desc" style={{ marginBottom: '1.5rem' }}>
                    I am an active member of several vibrant tech communities. Here are some of the groups I'm proud to be a part of:
                  </p>
                  <div className="community-grid">
                    {communities.map((community, index) => (
                      <div key={index} className="community-card">
                        <div className="community-header">
                          {getCommunityIcon(community.name)}
                          <h5 className="community-name">
                            {community.name}
                          </h5>
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
                    <p className="info-value">B.S. in Computer Science from Stanford University</p>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fa-brands fa-github info-icon"></i>
                  <div>
                    <p className="info-label">GitHub:</p>
                    <a href="https://github.com/ArigboJesse" target="_blank" rel="noopener noreferrer" className="info-link">
                      github.com/ArigboJesse
                    </a>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fa-brands fa-linkedin info-icon"></i>
                  <div>
                    <p className="info-label">LinkedIn:</p>
                    <a href="https://linkedin.com/in/ArigboJesse" target="_blank" rel="noopener noreferrer" className="info-link">
                      linkedin.com/in/ArigboJesse
                    </a>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fa-brands fa-x-twitter info-icon"></i>
                  <div>
                    <p className="info-label">X:</p>
                    <a href="https://x.com/ArigboJesse" target="_blank" rel="noopener noreferrer" className="info-link">
                      x.com/ArigboJesse
                    </a>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fa-brands fa-facebook info-icon"></i>
                  <div>
                    <p className="info-label">Facebook:</p>
                    <a href="https://facebook.com/ArigboJesse" target="_blank" rel="noopener noreferrer" className="info-link">
                      facebook.com/ArigboJesse
                    </a>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fa-brands fa-threads info-icon"></i>
                  <div>
                    <p className="info-label">Threads:</p>
                    <a href="https://threads.net/@ArigboJesse" target="_blank" rel="noopener noreferrer" className="info-link">
                      threads.net/@ArigboJesse
                    </a>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button onClick={handleCVDownload} className="cv-button">
                  <i className="fa-solid fa-file-arrow-down"></i>
                  <span style={{ fontFamily: 'Chivo, sans-serif' }}>Download CV</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Modal */}
        {isContactModalOpen && (
          <div className="about-modal-overlay">
            <div className="about-modal-inner">
              <button onClick={() => setIsContactModalOpen(false)} className="close-button">
                <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.5rem', width: '1.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h3 className="about-title">Get In Touch</h3>
              <p className="about-desc">Have a project in mind or just want to say hi? Feel free to reach out!</p>
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
                <button type="submit" className="gradient-button" style={{ padding: '1rem 2rem', borderRadius: '9999px', fontWeight: '700', color: 'white' }}>
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
              <button onClick={handleCloseProjectModal} className="close-button" style={{ position: 'absolute' }}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.5rem', width: '1.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="project-modal-text">
                <h3 
                  className="project-title"
                >
                  {selectedProject.title}
                </h3>
                <img
                  src={selectedProject.imageUrl}
                  alt={`Image of ${selectedProject.title}`}
                  className="project-image"
                />

                <p className="project-desc">
                  {selectedProject.description}
                </p>

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
                        <img src={techMap[tech.toLowerCase()]} alt={tech} className="tool-logo" />
                      ) : null}
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>

                <div className="project-buttons">
                  {selectedProject.link && (
                    <a href={selectedProject.link} className="project-link-button">
                      View Live Demo
                    </a>
                  )}
                  {selectedProject.github && (
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="github-button">
                      <i className="fab fa-github"></i>
                      <span>GitHub</span>
                    </a>
                  )}
                  {selectedProject.docs && (
                    <a href={selectedProject.docs} target="_blank" rel="noopener noreferrer" className="docs-button">
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
        <nav className="nav">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {logo}
            <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--root-text)' }}>{name}</span>
          </div>
          <div className="nav-items">
            <a href="#projects" className="nav-link underline-hover">
              <span>Projects</span>
            </a>
            <a href="#about" onClick={handleOpenAboutModal} className="nav-link underline-hover">
              <span>About</span>
            </a>
            <a onClick={handleOpenContactModal} className="nav-link underline-hover" style={{ cursor: 'pointer' }}>
              <span>Contact</span>
            </a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <select
              onChange={handleThemeChange}
              value={theme}
              className="theme-select"
            >
              <option value="blue">Blue</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="forest">Forest</option>
              <option value="purple">Purple</option>
              <option value="orange">Orange</option>
            </select>
            <button onClick={handleOpenContactModal} className="talk-button gradient-button" style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: '700', fontSize: '0.875rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)' }}>
              Let's Talk
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <header id="home" className="hero">
          <div className="hero-bg">
            {/* Subtle background gradient or pattern */}
            <div className="hero-gradient"></div>
          </div>
          
          <div className="hero-content">
            <h1 className="hero-title">
              Hello, I'm <span style={{ display: 'inline-block', position: 'relative' }} className="group">
                <span className="hero-accent font-display font-bold">Arigbo Jesse</span>
              </span>
            </h1>
            <h2 className="hero-subtitle">
              Full-Stack Developer & Entrepreneur
            </h2>
            <p className="hero-desc">
              I build high-performance web applications from the ground up, blending clean code with creative design to solve real-world problems and create seamless user experiences.
            </p>
            <div className="hero-buttons">
              <a href="#projects">
                <button className="view-work-button gradient-button">
                  View My Work
                </button>
              </a>
              <a href="#about" onClick={handleOpenAboutModal}>
                <button className="learn-more-button" style={{ textDecoration: 'underline' }}>
                  Learn More
                </button>
              </a>
            </div>
          </div>
        </header>

        {/* Projects Section */}
        <section id="projects" className="section">
          <div className="container">
            <h3 className="section-title">Projects</h3>
            <div className="projects-grid">
              {allProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="project-card group"
                  style={{ overflow: 'hidden' }}
                >
                  {/* Status badge */}
                  <span className="status-badge" style={{ backgroundColor: project.status === 'in-progress' ? '#f97316' : '#22c55e', color: 'white' }}>
                    {project.status === 'in-progress' ? 'In Progress' : 'Completed'}
                  </span>
                  <div className="image-container">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                    />
                    <div className="overlay">
                      <button 
                        onClick={() => handleOpenProjectModal(project)} 
                        className="detail-button group-hover"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  <h4 style={{ fontFamily: 'Funnel Display, sans-serif', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>{project.title}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--root-text)', marginBottom: '1rem' }} className="line-clamp-3">
                    {project.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                    {project.techStack.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
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
          <div className="container" style={{ textAlign: 'center' }}>
            <h3 className="section-title">Tech Stack</h3>
            <div className="tech-grid">
              <div>
                <h4 className="tech-category-title">Frontend</h4>
                <div className="tech-icons">
                  {techStackData.frontend.map(tech => (
                    <div key={tech.name} className="tech-icon">
                      <img src={tech.logo} alt={`${tech.name} logo`} className="tech-logo"/>
                      <span className="tech-name">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="tech-category-title">Backend</h4>
                <div className="tech-icons">
                  {techStackData.backend.map(tech => (
                    <div key={tech.name} className="tech-icon">
                      <img src={tech.logo} alt={`${tech.name} logo`} className="tech-logo"/>
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
                <div 
                  key={index} 
                  className="testimonial-card"
                >
                  <blockquote className="quote">
                    <span className="quote-span">"</span>{testimonial.quote}<span className="quote-span">"</span>
                  </blockquote>
                  <div>
                    <p className="name">{testimonial.name}</p>
                    <p className="title">{testimonial.title}</p>
                    <div className="social-links">
                      {testimonial.social.map((social, socialIndex) => (
                        <a key={socialIndex} href={social.url} target="_blank" rel="noopener noreferrer" className="social-link">
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

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <p className="footer-text">
              &copy; {new Date().getFullYear()} {name}. All Rights Reserved.
            </p>
            <div className="footer-links">
              <a href="#" aria-label="LinkedIn" className="footer-link">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
              <a href="#" aria-label="GitHub" className="footer-link">
                <i className="fab fa-github fa-lg"></i>
              </a>
              <a href="#" aria-label="X" className="footer-link">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" aria-label="Instagram" className="footer-link">
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