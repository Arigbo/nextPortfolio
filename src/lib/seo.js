import { SITE, SOCIALS } from "@/lib/site";

export const DEFAULT_OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: `${SITE.name} — ${SITE.role}`,
};

export const absoluteUrl = (path = "/") => new URL(path, SITE.url).toString();

/**
 * Full metadata for a page. Next.js merges metadata shallowly, so a page that sets
 * its own `openGraph` would otherwise lose the site-wide fields (siteName, locale…).
 * Every page goes through here to get a canonical URL, Open Graph and Twitter tags.
 */
export function pageMetadata({ title, description, path, image, type = "website" }) {
  const images = [image ?? DEFAULT_OG_IMAGE];
  const socialTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} | ${SITE.role}`;

  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "en_US",
      siteName: `${SITE.name} — Portfolio`,
      url: path,
      title: socialTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}

/** Site-wide JSON-LD: who the site is about, and the site itself */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE.url}/#person`,
        name: SITE.name,
        url: SITE.url,
        image: absoluteUrl("/graduation.jpg"),
        jobTitle: "Full-Stack Software Engineer",
        address: { "@type": "PostalAddress", addressRegion: "Rivers State", addressCountry: "NG" },
        sameAs: SOCIALS.filter((s) => s.href.startsWith("https://") && !s.href.includes("wa.me")).map((s) => s.href.split("?")[0]),
        knowsAbout: ["Next.js", "React", "TypeScript", "Node.js", "Firebase", "Stripe", "Tailwind CSS", "SCSS"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: `${SITE.name} — Portfolio`,
        publisher: { "@id": `${SITE.url}/#person` },
        inLanguage: "en",
      },
    ],
  };
}

/** Serialise JSON-LD safely for a <script> tag (no closing-tag injection) */
export const jsonLdScript = (data) => JSON.stringify(data).replace(/</g, "\\u003c");
