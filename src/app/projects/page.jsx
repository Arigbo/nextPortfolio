import ClientProjects from "@/components/ClientProjects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Projects by Arigbo Jesse: Lodger (student housing), CareKey (patient–doctor portal), SkillsBridge (learning platform), a weather app and client websites.",
  path: "/projects",
});

export default function ProjectsPage() {
  return <ClientProjects />;
}
