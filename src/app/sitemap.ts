import type { MetadataRoute } from "next";
import { products } from "@/lib/site-data";
import { industriesDetail } from "@/lib/catalog";

// Keep this in sync with `siteUrl` in src/app/layout.tsx.
const siteUrl = "https://www.sonisonpackaging.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, priority: 1.0 },
    { url: `${siteUrl}/about`, priority: 0.8 },
    { url: `${siteUrl}/products`, priority: 0.9 },
    { url: `${siteUrl}/quality`, priority: 0.7 },
    { url: `${siteUrl}/industries`, priority: 0.8 },
    { url: `${siteUrl}/configurator`, priority: 0.8 },
    { url: `${siteUrl}/resources`, priority: 0.7 },
    { url: `${siteUrl}/blog`, priority: 0.6 },
    { url: `${siteUrl}/faq`, priority: 0.7 },
    { url: `${siteUrl}/contact`, priority: 0.7 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${siteUrl}/products/${p.slug}`,
    priority: 0.8,
  }));

  const industryRoutes: MetadataRoute.Sitemap = industriesDetail.map((i) => ({
    url: `${siteUrl}/industries/${i.slug}`,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...industryRoutes];
}