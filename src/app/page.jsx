import ClientHome from "@/components/ClientHome";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    description:
      "Arigbo Jesse is a full-stack software engineer building web apps with Next.js, TypeScript and Firebase — including Lodger, a student-housing marketplace.",
    path: "/",
  }),
  title: { absolute: "Arigbo Jesse | Full-Stack Software Engineer" },
};

export default function HomePage() {
  return <ClientHome />;
}
