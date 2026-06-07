import ClientHome from "@/components/ClientHome";

export const metadata = {
  title: "Arigbo Jesse | Full-Stack Software Engineer & Builder",
  description: "Senior Full-Stack Software Engineer and Tech Builder. Discover projects including AEHub and SkillsBridge, built using Next.js, React, Node.js, Firebase, Cloudflare, Supabase, and Paystack integration.",
  openGraph: {
    title: "Arigbo Jesse | Full-Stack Software Engineer & Builder",
    description: "Discover high-performance full-stack web applications and developer tools built by Arigbo Jesse.",
    url: "https://arigbo-jesse.vercel.app"
  }
};

export default function HomePage() {
  return <ClientHome />;
}

