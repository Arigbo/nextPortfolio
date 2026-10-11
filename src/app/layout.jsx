import { Inter, JetBrains_Mono } from "next/font/google";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import "@/styles/custom.scss";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

// Runs before first paint so the saved (or system) theme never flashes the wrong colours.
// Older visits may have stored one of the retired colour themes — those fall back to the system setting.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})()`;

export const metadata = {
  title: {
    default: "Arigbo Jesse | Full-Stack Software Engineer & Builder",
    template: "%s | Arigbo Jesse"
  },
  description: "Portfolio of Arigbo Jesse, a senior Full-Stack Software Engineer specializing in Next.js, Node.js, Firebase, Cloudflare, Paystack integrations, and high-performance web applications.",
  keywords: ["Arigbo Jesse", "Full-Stack Developer", "Next.js Portfolio", "Software Engineer", "Web Developer", "React Developer", "Firebase", "Paystack Developer"],
  authors: [{ name: "Arigbo Jesse" }],
  creator: "Arigbo Jesse",
  metadataBase: new URL("https://arigbo-jesse.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arigbo-jesse.vercel.app",
    title: "Arigbo Jesse | Full-Stack Software Engineer & Builder",
    description: "Explore the full-stack projects, workshops, and community contributions of Arigbo Jesse.",
    siteName: "Arigbo Jesse Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Arigbo Jesse | Full-Stack Software Engineer & Builder",
    description: "Explore the full-stack projects, workshops, and community contributions of Arigbo Jesse."
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0e0b" },
    { media: "(prefers-color-scheme: light)", color: "#f6f8f6" },
  ],
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Arigbo Jesse",
    "url": "https://arigbojesse.dev",
    "sameAs": [
      "https://github.com/Arigbo",
      "https://linkedin.com/in/ArigboJesse"
    ],
    "jobTitle": "Full-Stack Software Engineer",
    "description": "Senior Full-Stack Software Engineer specializing in Next.js, Node.js, Firebase, Cloudflare, and Paystack integration."
  };

  return (
    <html lang="en" className={`${mono.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
    </html>
  );
}
