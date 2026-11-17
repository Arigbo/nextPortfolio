import ClientContact from "@/components/ClientContact";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Arigbo Jesse, full-stack software engineer, about a project, collaboration or role — by email or WhatsApp. Usually replies within 24 hours.",
  path: "/contact",
});

export default function ContactPage() {
  return <ClientContact />;
}
