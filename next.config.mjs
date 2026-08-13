/** @type {import('next').NextConfig} */
const nextConfig = {
  // Every page here is built from static data (no fetch/DB), so Next.js
  // automatically prerenders all of them to static HTML at build time —
  // the best possible setup for SEO. No extra config needed for that.
  images: {
    formats: ["image/webp"],
  },
  reactStrictMode: true,
};

export default nextConfig;
