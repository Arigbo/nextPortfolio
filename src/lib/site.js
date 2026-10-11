// Shared site-wide data: navigation, contact details and social links.

export const SITE = {
  name: "Arigbo Jesse",
  handle: "arigbo-jesse",
  role: "Full-Stack Engineer",
  location: "Rivers State, Nigeria",
  email: "arigbojesse@gmail.com",
  phone: "+234 810 943 2202",
  whatsapp: "https://wa.me/2348109432202",
  resume: "/Resume.pdf",
  startYear: 2022,
};

export const yearsExp = Math.max(1, new Date().getFullYear() - SITE.startYear);

// Nav items render as editor tabs: `file` is the tab label.
export const NAV = [
  { href: "/", label: "Home", file: "home.tsx", icon: "fa-brands fa-react", tone: "blue" },
  { href: "/about", label: "About", file: "about.md", icon: "fa-brands fa-markdown", tone: "purple" },
  { href: "/projects", label: "Projects", file: "projects/", icon: "fa-solid fa-folder", tone: "yellow" },
  { href: "/contact", label: "Contact", file: "contact.sh", icon: "fa-solid fa-terminal", tone: "green" },
];

export const SOCIALS = [
  { label: "GitHub", handle: "github.com/Arigbo", href: "https://github.com/Arigbo", icon: "fa-brands fa-github" },
  { label: "LinkedIn", handle: "in/ArigboJesse", href: "https://linkedin.com/in/ArigboJesse", icon: "fa-brands fa-linkedin-in" },
  { label: "X (Twitter)", handle: "@anc13nt2", href: "https://x.com/anc13nt2?s=09", icon: "fa-brands fa-x-twitter" },
  { label: "WhatsApp", handle: SITE.phone, href: SITE.whatsapp, icon: "fa-brands fa-whatsapp" },
];

/** "Evolve Classroom" → "evolve" — used as a folder-style name for projects */
export const slugOf = (title) => title.toLowerCase().split(/\s+/)[0].replace(/[^a-z0-9-]/g, "");

/** Is the current pathname inside this nav item? */
export const isActive = (pathname, href) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
