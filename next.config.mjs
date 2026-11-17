// Project pages moved from /projects/p1… to readable slugs; keep old links working.
const legacyProjectIds = {
  p1: "evolve",
  p2: "ralonick",
  p3: "carekey",
  p5: "myreport",
  p7: "lodger",
  p8: "weather-app",
};

// Projects taken off the portfolio — send old links to the project list instead of a 404
const removedProjects = ["p4", "p6", "skillsbridge", "agunwami"];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      ...Object.entries(legacyProjectIds).map(([id, slug]) => ({
        source: `/projects/${id}`,
        destination: `/projects/${slug}`,
        permanent: true,
      })),
      ...removedProjects.map((path) => ({
        source: `/projects/${path}`,
        destination: "/projects",
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
