import ClientProjects from "@/components/ClientProjects";

export const metadata = {
  title: "My Projects",
  description: "Explore a curated showcase of web applications, SaaS platforms, API integrations, and open source projects engineered by Arigbo Jesse.",
  openGraph: {
    title: "Projects Portfolio | Arigbo Jesse",
    description: "Explore a curated showcase of web applications, SaaS platforms, API integrations, and open source projects engineered by Arigbo Jesse.",
    url: "https://arigbojesse.dev/projects"
  }
};

export default function ProjectsPage() {
  return <ClientProjects />;
}


