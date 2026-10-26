import type { MetadataRoute } from "next";
import { products } from "@/lib/site-data";
import { industriesDetail } from "@/lib/catalog";
import { getPosts } from "@/lib/wordpress";

// Keep this in sync with `siteUrl` in src/app/layout.tsx.
const siteUrl = "https://www.sonisonpackaging.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, priority: 1.0 },
    { url: `${siteUrl}/about`, priority: 0.8 },
    { url: `${siteUrl}/about/quality`, priority: 0.7 },
    { url: `${siteUrl}/products`, priority: 0.9 },
    { url: `${siteUrl}/products/industries`, priority: 0.8 },
    { url: `${siteUrl}/designs`, priority: 0.8 },
    { url: `${siteUrl}/resources`, priority: 0.7 },
    { url: `${siteUrl}/resources/configurator`, priority: 0.8 },
    { url: `${siteUrl}/resources/faq`, priority: 0.7 },
    { url: `${siteUrl}/blog`, priority: 0.6 },
    { url: `${siteUrl}/contact`, priority: 0.7 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${siteUrl}/products/${p.slug}`,
    priority: 0.8,
  }));

  const industryRoutes: MetadataRoute.Sitemap = industriesDetail.map((i) => ({
    url: `${siteUrl}/products/industries/${i.slug}`,
    priority: 0.7,
  }));

  // If WordPress is unreachable at build time, getPosts() returns an empty
  // array rather than throwing, so this never breaks the site's build.
  const posts = await getPosts();
  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => {
    // WordPress dates have no timezone (e.g. 2026-10-20T09:00:00), which the sitemap
    // standard rejects. Converting to a Date makes Next write a valid ISO date.
    const modified = new Date(p.date);
    return {
      url: `${siteUrl}/blog/${p.slug}`,
      ...(Number.isNaN(modified.getTime()) ? {} : { lastModified: modified }),
      priority: 0.6,
    };
  });

  return [...staticRoutes, ...productRoutes, ...industryRoutes, ...blogRoutes];
}
