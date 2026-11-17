import React from "react";
import { notFound } from "next/navigation";
import { communityCategories } from "@/lib/communityData";
import ClientCommunityGallery from "@/components/ClientCommunityGallery";
import { pageMetadata } from "@/lib/seo";
import "@/styles/community.scss";

export function generateStaticParams() {
  return communityCategories.map((cat) => ({ id: cat.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const category = communityCategories.find((cat) => cat.id === id);

  if (!category) return { title: "Gallery Not Found" };

  return pageMetadata({
    title: `${category.title} — Photos`,
    description: `${category.description} ${category.photos.length} photos from the event.`,
    path: `/community/${category.id}`,
    image: { url: category.coverImage, alt: category.title },
  });
}

export default async function SingleGalleryPage({ params }) {
  const { id } = await params;
  const category = communityCategories.find((cat) => cat.id === id);
  if (!category) notFound();

  return <ClientCommunityGallery category={category} />;
}
