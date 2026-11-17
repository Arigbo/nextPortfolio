import { allProjects, projectPath } from "@/lib/projectsData";
import { communityCategories } from "@/lib/communityData";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap() {
  const pages = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/projects", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  ];

  return [
    ...pages.map((p) => ({ url: absoluteUrl(p.path), changeFrequency: p.changeFrequency, priority: p.priority })),
    ...allProjects.map((p) => ({
      url: absoluteUrl(projectPath(p)),
      changeFrequency: "monthly",
      // projects people can open and see rank above ones with no public preview
      priority: p.link ? 0.8 : 0.5,
      ...(p.imageUrl && { images: [absoluteUrl(p.imageUrl)] }),
    })),
    ...communityCategories.map((c) => ({
      url: absoluteUrl(`/community/${c.id}`),
      changeFrequency: "yearly",
      priority: 0.4,
      images: c.photos.map((photo) => absoluteUrl(photo.url)),
    })),
  ];
}
