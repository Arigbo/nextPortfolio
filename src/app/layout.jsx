import { Inter, JetBrains_Mono } from "next/font/google";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import { SITE } from "@/lib/site";
import { pageMetadata, siteJsonLd, jsonLdScript } from "@/lib/seo";
import "@/styles/custom.scss";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

// Runs before first paint so the saved (or system) theme never flashes the wrong colours.
// Older visits may have stored one of the retired colour themes — those fall back to the system setting.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})()`;

const description =
  "Portfolio of Arigbo Jesse, a full-stack software engineer in Rivers State, Nigeria, building web apps with Next.js, React, TypeScript, Firebase and Stripe.";

// Site-wide defaults. The canonical URL is deliberately left out here — it would be inherited
// by every page that doesn't set its own — so each page declares it via pageMetadata().
const { alternates: _rootCanonical, ...siteDefaults } = pageMetadata({ description, path: "/" });

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Full-Stack Software Engineer`,
    template: `%s | ${SITE.name}`,
  },
  applicationName: `${SITE.name} — Portfolio`,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  keywords: ["Arigbo Jesse", "Full-Stack Developer", "Software Engineer", "Next.js Developer", "React Developer", "TypeScript", "Firebase", "Web Developer Nigeria", "Rivers State"],
  ...siteDefaults,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0e0b" },
    { media: "(prefers-color-scheme: light)", color: "#f6f8f6" },
  ],
};

export default function RootLayout({ children }) {
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
          dangerouslySetInnerHTML={{ __html: jsonLdScript(siteJsonLd()) }}
        />
      </head>
      <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
    </html>
  );
}
