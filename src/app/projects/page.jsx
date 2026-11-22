import ClientProjects from "@/components/ClientProjects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Projects by Arigbo Jesse: Lodger (student housing), CareKey (health records), Quick Drivers Card (driver ID verification) and more.",
  path: "/projects",
});

export default function ProjectsPage() {
  return <ClientProjects />;
}
