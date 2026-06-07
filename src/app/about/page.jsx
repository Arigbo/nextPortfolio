import React from "react";
import ClientAbout from "@/components/ClientAbout";

export const metadata = {
  title: "About Me",
  description: "Learn about the professional journey, developer toolkit, engineering principles, and community contributions of Arigbo Jesse, a senior Full-Stack Software Engineer.",
  openGraph: {
    title: "About Arigbo Jesse | Full-Stack Software Engineer",
    description: "Learn about the professional journey, developer toolkit, engineering principles, and community contributions of Arigbo Jesse.",
    url: "https://arigbo-jesse.vercel.app/about"
  }
};

export default function AboutPage() {
  return <ClientAbout />;
}
