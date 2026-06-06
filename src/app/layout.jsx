import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import "@/styles/custom.scss";

export const metadata = {
  title: {
    default: "Arigbo Jesse | Full-Stack Software Engineer & Builder",
    template: "%s | Arigbo Jesse"
  },
  description: "Portfolio of Arigbo Jesse, a senior Full-Stack Software Engineer specializing in Next.js, Node.js, Firebase, Cloudflare, Paystack integrations, and high-performance web applications.",
  keywords: ["Arigbo Jesse", "Full-Stack Developer", "Next.js Portfolio", "Software Engineer", "Web Developer", "React Developer", "Firebase", "Paystack Developer"],
  authors: [{ name: "Arigbo Jesse" }],
  creator: "Arigbo Jesse",
  metadataBase: new URL("https://arigbojesse.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arigbojesse.dev",
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chivo:ital,wght@0,100..900;1,100..900&family=Funnel+Display:wght@300..800&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Rock+3D&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
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

