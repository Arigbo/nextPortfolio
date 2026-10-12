import ClientHome from "@/components/ClientHome";

export const metadata = {
  title: "Arigbo Jesse | Full-Stack Software Engineer & Builder",
  description: "Senior Full-Stack Software Engineer and Tech Builder. Projects include Lodger, a student-housing marketplace, plus CareKey and SkillsBridge, built with Next.js, TypeScript, Firebase and Stripe.",
  openGraph: {
    title: "Arigbo Jesse | Full-Stack Software Engineer & Builder",
    description: "Discover high-performance full-stack web applications and developer tools built by Arigbo Jesse.",
    url: "https://arigbo-jesse.vercel.app"
  }
};

export default function HomePage() {
  return <ClientHome />;
}

