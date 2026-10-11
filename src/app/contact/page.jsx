import ClientContact from "@/components/ClientContact";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Arigbo Jesse for projects, collaborations, or a friendly chat. Usually replies within 24 hours.",
  openGraph: {
    title: "Contact Arigbo Jesse | Full-Stack Software Engineer",
    description: "Get in touch for projects, collaborations, or a friendly chat.",
    url: "https://arigbo-jesse.vercel.app/contact"
  }
};

export default function ContactPage() {
  return <ClientContact />;
}
