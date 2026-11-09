// Project pages moved from /projects/p1… to readable slugs; keep old links working.
const legacyProjectIds = {
  p1: "evolve",
  p2: "ralonick",
  p3: "carekey",
  p4: "skillsbridge",
  p5: "myreport",
  p6: "agunwami",
  p7: "lodger",
  p8: "weather-app",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return Object.entries(legacyProjectIds).map(([id, slug]) => ({
      source: `/projects/${id}`,
      destination: `/projects/${slug}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
