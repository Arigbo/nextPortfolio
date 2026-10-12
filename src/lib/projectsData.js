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

// Logos for libraries that appear in project stacks but not in the skills list above
const projectOnlyLogos = {
  bootstrap: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  "redux toolkit": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
};

export const techMap = [...techStackData.frontend, ...techStackData.backend, ...techStackData.extra].reduce(
  (map, tech) => {
    if (tech.logo) map[tech.name.toLowerCase()] = tech.logo;
    return map;
  },
  { ...projectOnlyLogos }
);

/*
 * Project entries. Every description, feature and tech tag below is grounded in
 * the project's repository (dependencies / routes) or its live site — keep it
 * that way: no claims that can't be shown.
 *
 * imageUrl: null  → card shows a "no preview yet" placeholder
 * repo:     "public" | "private" | null (no repository to show)
 */
export const allProjects = [
  {
    id: "p1",
    title: "Evolve Classroom",
    description: "A website for Evolve, a project-based IT training programme: it presents the programme, its course catalogue and why to choose it, with an enquiry form for prospective students.",
    features: [
      "Landing page presenting the programme and its course catalogue",
      "Enquiry / contact form in a modal",
      "Scroll-triggered animations with Framer Motion",
      "Responsive layout styled with SCSS"
    ],
    link: "https://evolve-fawn.vercel.app/",
    github: "https://github.com/Arigbo/evolve",
    repo: "public",
    imageUrl: "/evolve.png",
    techStack: ["Next.js", "React", "SCSS", "Framer Motion"],
    category: "Frontend",
  },
  {
    id: "p2",
    title: "Ralonick Company Website",
    description: "Corporate website for Ralonick, a Nigerian construction and oil & gas services company — presenting its services (design, engineering, procurement, fabrication and repair of GRE/GRP pipe systems), company profile and projects.",
    features: [
      "Hero carousel showcasing the company's services (Swiper)",
      "Company profile, services and contact sections",
      "Scroll animations with AOS",
      "Responsive layout built with Bootstrap and SCSS"
    ],
    link: "https://ralonic.vercel.app/",
    github: "https://github.com/Arigbo/ralonick",
    repo: "public",
    imageUrl: "/ralonic.png",
    techStack: ["Next.js", "TypeScript", "Bootstrap", "SCSS"],
    category: "Frontend",
  },
  {
    id: "p3",
    title: "CareKey Healthcare Portal",
    description: "A patient–doctor platform: patients onboard, choose a doctor, chat privately and keep a medical history they can share; doctors manage their patients, incoming requests and medical records.",
    features: [
      "Separate patient and doctor dashboards with authentication",
      "Patient onboarding and doctor selection",
      "Private patient–doctor chat",
      "Medical records written with a rich-text editor (Tiptap), with record history",
      "Record sharing and a clinic partnership page"
    ],
    link: "",
    github: null,
    repo: "private",
    imageUrl: null,
    techStack: ["Next.js", "TypeScript", "Firebase", "Firebase Data Connect", "Tailwind CSS"],
    category: "Full-Stack",
  },
  {
    id: "p4",
    title: "SkillsBridge",
    description: "A multi-tenant learning platform where organisations manage their courses, faculty and students — with separate dashboards for super-admins, organisation admins, faculty and students.",
    features: [
      "Super-admin management of organisations and their users",
      "Organisation and faculty admin dashboards with course management",
      "Student dashboard",
      "Invite-based onboarding and authentication with NextAuth",
      "Data tables with TanStack Table and state managed with Redux Toolkit"
    ],
    link: "",
    github: null,
    repo: "private",
    imageUrl: null,
    techStack: ["Next.js", "TypeScript", "Redux Toolkit", "NextAuth", "Tailwind CSS"],
    category: "Frontend",
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
    github: null,
    repo: null,
    imageUrl: null,
    techStack: ["Next.js", "TypeScript", "Firebase", "Firestore", "SCSS"],
    category: "Full-Stack",
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
    github: null,
    repo: null,
    imageUrl: null,
    techStack: ["Next.js", "Firebase", "Resend", "TypeScript", "Tailwind CSS"],
    category: "Full-Stack",
  },
  {
    id: "p7",
    title: "Lodger Student Housing",
    description: "A student-housing marketplace: students find, book and pay for rentals near campus, while landlords list properties and manage leases, tenants, maintenance and payouts.",
    features: [
      "Separate student and landlord portals — listings, bookmarks, leases, tenancy, messages and notifications",
      "Stripe payments and Stripe Connect payouts for landlords, with webhooks",
      "AI-generated listing descriptions and image moderation (Genkit + Gemini)",
      "Property locations on interactive maps (Leaflet)",
      "Rate limiting with Upstash Redis and transactional email via Resend"
    ],
    link: "https://lodger-ancient.vercel.app/",
    github: "https://github.com/Arigbo/lodger",
    repo: "public",
    imageUrl: "/lodger.png",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Stripe", "Redis", "Resend", "Genkit"],
    category: "Full-Stack",
  },
  {
    id: "p8",
    title: "Weather App",
    description: "A weather dashboard showing current conditions, an hourly forecast and a multi-day outlook for any searched location or your current position.",
    features: [
      "Current temperature with feels-like, high and low",
      "Scrollable 3-hourly forecast strip",
      "Visibility, humidity, wind speed, air pressure, sunrise and sunset",
      "Multi-day forecast",
      "Location search and a use-my-location button"
    ],
    link: "https://ancients-weather.vercel.app/",
    github: "https://github.com/Arigbo/weather-app",
    repo: "public",
    imageUrl: "/weatherap.png",
    techStack: ["Next.js", "TypeScript", "SCSS", "Tailwind CSS", "Axios", "TanStack Query", "Jotai", "Date-fns"],
    category: "Frontend",
  }
];
