import React from "react";
import { notFound } from "next/navigation";
import { communityCategories } from "@/lib/communityData";
import ClientCommunityGallery from "@/components/ClientCommunityGallery";
import "@/styles/community.scss";

export function generateStaticParams() {
  return communityCategories.map((cat) => ({ id: cat.id }));
}

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
      url: `https://arigbo-jesse.vercel.app/community/${id}`,
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
  if (!category) notFound();

  return <ClientCommunityGallery category={category} />;
}
