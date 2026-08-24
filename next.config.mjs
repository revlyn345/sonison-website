/** @type {import('next').NextConfig} */
const nextConfig = {
  // Every page here is built from static data (no fetch/DB), so Next.js
  // automatically prerenders all of them to static HTML at build time,
  // the best possible setup for SEO. No extra config needed for that.
  images: {
    formats: ["image/webp"],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/quality", destination: "/about/quality", permanent: true },
      { source: "/configurator", destination: "/resources/configurator", permanent: true },
      { source: "/faq", destination: "/resources/faq", permanent: true },
      { source: "/industries", destination: "/products/industries", permanent: true },
      {
        source: "/industries/:slug",
        destination: "/products/industries/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
