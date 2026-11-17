import ClientProjects from "@/components/ClientProjects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Projects by Arigbo Jesse: Lodger (student housing), CareKey (patient-owned health records), a weather dashboard and two client websites.",
  path: "/projects",
});

export default function ProjectsPage() {
  return <ClientProjects />;
}
