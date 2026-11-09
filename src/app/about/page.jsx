import ClientAbout from "@/components/ClientAbout";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "About Arigbo Jesse — a full-stack software engineer in Rivers State, Nigeria: background, journey since 2022, toolkit, and developer communities and events.",
  path: "/about",
  type: "profile",
});

export default function AboutPage() {
  return <ClientAbout />;
}
