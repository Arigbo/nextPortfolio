export const techStackData = {
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
      name: "Tailwind CSS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
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
    {
      name: "Cloudflare",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg",
    },
    {
      name: "Redis",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
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
      name: "Vercel",
      logo: "https://cdn.worldvectorlogo.com/logos/vercel.svg",
    },
    {
      name: "Stripe",
      logo: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg",
    },
    {
      name: "Paystack",
      logo: "https://placehold.co/100x100/09a5db/ffffff?text=Paystack",
    },
  ],
};

export const techMap = [...techStackData.frontend, ...techStackData.backend, ...techStackData.extra].reduce(
  (map, tech) => {
    map[tech.name.toLowerCase()] = tech.logo;
    return map;
  },
  {}
);

export const allProjects = [
  {
    id: "p1",
    title: "Evolve Classroom",
    description: "Evolve was born from a simple idea: to fix online education. We were tired of passive video tutorials and outdated curricula that left learners with a certificate but no practical skills. Courses are centered around building a single, challenging project from start to finish with direct mentorship and a vibrant community.",
    features: [
      "Project-centric learning curricula flow",
      "Direct mentorship check-in modules",
      "Interactive coding roadmaps",
      "Community workspaces and forum hubs",
      "Custom responsive dashboard workspace"
    ],
    link: "https://evolve-fawn.vercel.app/",
    github: "https://github.com/Arigbo/evolve",
    docs: "https://github.com/Arigbo/evolve",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60",
    techStack: ["Next.js", "SCSS", "React"],
    category: "Full-Stack",
    status: "finished"
  },
  {
    id: "p2",
    title: "Ralonic Engineering Portal",
    description: "A comprehensive digital operations portal for Ralonic, a fast-growing engineering and construction company operating in Land and Marine sectors in Nigeria. Handles production facilities maintenance logging, procurement tracking, and industrial equipment leasing.",
    features: [
      "Procurement lifecycle management boards",
      "Marine and land equipment tracking registers",
      "Total Quality Management (TQM) checklist templates",
      "Interactive design engineering documentation portals",
      "Secure project access controls for clients"
    ],
    link: "https://ralonic.vercel.app/",
    github: "https://github.com/Arigbo/ralonick",
    docs: "https://github.com/Arigbo/ralonick",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=60",
    techStack: ["Next.js", "Node.js", "TypeScript", "SCSS"],
    category: "Full-Stack",
    status: "finished"
  },
  {
    id: "p3",
    title: "CareKey Healthcare Portal",
    description: "A comprehensive digital patient portal and clinic administration dashboard. Bridges patient onboarding, doctor schedules, electronic health records, and secure messaging under one central compliance-guided interface.",
    features: [
      "Patient self-onboarding checkups flow",
      "Doctor appointment slots scheduling boards",
      "Private real-time chat between doctor and patient",
      "Electronic Health Records (EHR) management & secure storage",
      "Clinic partnership registration flow"
    ],
    link: "",
    github: "https://github.com/Arigbo/carekey",
    docs: "https://github.com/Arigbo/carekey",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60",
    techStack: ["Next.js", "TypeScript", "Firebase", "Firestore", "Firebase Data Connect"],
    category: "Full-Stack",
    status: "finished"
  },
  {
    id: "p4",
    title: "SkillsBridge Live Classroom",
    description: "An educational platform designed for skills training, featuring virtual audio/video classrooms powered by Cloudflare RealtimeKit, interactive instructor calendars, and rich progress cards for students.",
    features: [
      "Virtual streaming rooms powered by Cloudflare RealtimeKit UI",
      "Interactive session scheduling system",
      "Student dashboards with enrolled courses",
      "Instructor dashboard for session management",
      "Token-based secure meeting authorization"
    ],
    link: "",
    github: "https://github.com/Arigbo/skillsbridge",
    docs: "https://github.com/Arigbo/skillsbridge",
    imageUrl: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&auto=format&fit=crop&q=60",
    techStack: ["Next.js", "TypeScript", "Redux Toolkit", "Cloudflare", "Tailwind CSS"],
    category: "Full-Stack",
    status: "finished"
  },
  {
    id: "p5",
    title: "MyReport Performance Platform",
    description: "A secure field service and student reporting application. Empowers service supervisors and academic instructors to compile, format, preview, and generate client-ready PDF performance analytics reports.",
    features: [
      "Field inspection report creation builder",
      "Student progress and grades assessment logs",
      "Real-time rendering preview window",
      "PDF reporting output compilation",
      "Analytics summaries and graphs dashboard"
    ],
    link: "",
    github: "https://github.com/Arigbo/my-report",
    docs: "https://github.com/Arigbo/my-report",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
    techStack: ["Next.js", "TypeScript", "Firebase", "Firestore", "SCSS"],
    category: "Full-Stack",
    status: "finished"
  },
  {
    id: "p6",
    title: "Agunwami Enterprise Portal",
    description: "A unified enterprise workspace managing communications, transactional email flows, project boards, and task statuses for Agunwami Enterprises.",
    features: [
      "Task board registers with priority sorting",
      "Transactional automated email triggers with Resend API",
      "Client communication dashboard",
      "Team collaboration task assignment cards",
      "Secure client access panels"
    ],
    link: "",
    github: "https://github.com/Arigbo/arisch-workspace",
    docs: "https://github.com/Arigbo/arisch-workspace",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60",
    techStack: ["Next.js", "Firebase", "Resend", "TypeScript", "Tailwind CSS"],
    category: "Full-Stack",
    status: "finished"
  },
  {
    id: "p7",
    title: "Lodger Booking Platform",
    description: "A platform for managing and booking temporary lodging accommodations. Features integrated payment gateways, interactive availability calendars, and user ratings.",
    features: [
      "Interactive lodgings availability booking calendar",
      "Secure stripe payment gateway flow",
      "Review ratings and guest comment system",
      "Fast response caches using Upstash Redis",
      "Tenant and landlord message portal"
    ],
    link: "https://lodger-ancient.vercel.app/",
    github: "https://github.com/Arigbo/lodger",
    docs: "https://github.com/Arigbo/lodger",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60",
    techStack: ["Next.js", "Node.js", "TypeScript", "SCSS", "Firebase", "Stripe", "Redis"],
    category: "Full-Stack",
    status: "finished"
  },
  {
    id: "p8",
    title: "Weather App",
    description: "A rich weather dashboard providing current atmospheric conditions and 7-day outlook predictions based on geographical coordinates.",
    features: [
      "Live coordinates mapping data updates",
      "Detailed 7-day weather predictions",
      "Interactive weather statistics graph charts",
      "Theme modes matching local timezone cycles",
      "Location search and history bookmarks"
    ],
    link: "https://ancients-weather.vercel.app/",
    github: "https://github.com/Arigbo/weather-app",
    docs: "https://github.com/Arigbo/weather-app",
    imageUrl: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&auto=format&fit=crop&q=60",
    techStack: ["Next.js", "TypeScript", "SCSS", "Axios", "Jotai", "Date-fns"],
    category: "Frontend",
    status: "finished"
  }
];
