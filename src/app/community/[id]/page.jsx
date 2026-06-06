import React from "react";
import Link from "next/link";
import { communityCategories } from "@/lib/communityData";
import ClientCommunityGallery from "@/components/ClientCommunityGallery";
import "@/styles/community.scss";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const category = communityCategories.find((cat) => cat.id === id);
  
  if (!category) {
    return {
      title: "Gallery Not Found",
      description: "The requested community event gallery could not be found."
    };
  }

  return {
    title: `${category.title} Gallery`,
    description: `${category.description} Explore Jesse's engagement and event photos in the ${category.title} community.`,
    openGraph: {
      title: `${category.title} Community Engagement | Arigbo Jesse`,
      description: category.description,
      url: `https://arigbojesse.dev/community/${id}`,
      images: [
        {
          url: category.coverImage,
          alt: category.title
        }
      ]
    }
  };
}

export default async function SingleGalleryPage({ params }) {
  const { id } = await params;
  const category = communityCategories.find((cat) => cat.id === id);

  if (!category) {
    return (
      <div className="portfolio" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBlockEnd: "1rem" }}>Gallery Not Found</h2>
          <p style={{ opacity: "0.8", marginBlockEnd: "2rem" }}>The community category you are looking for does not exist.</p>
          <Link href="/about#community">
            <button className="gradient-button" style={{ padding: "0.75rem 2rem" }}>
              Back to Communities
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio">
      <ClientCommunityGallery category={category} />
    </div>
  );
}

