// Minimal client for reading published posts from the Sonison blog's
// WordPress instance at cms.sonisonpackaging.com, via WordPress's built-in
// REST API (no plugin required, this endpoint exists on every WordPress site).
//
// Kept deliberately dependency-free (no npm packages) since the rest of this
// project has none either.

const WP_URL = "https://cms.sonisonpackaging.com";

export type WordPressPost = {
  id: number;
  slug: string;
  date: string; // ISO
  title: string; // already decoded, plain text
  excerpt: string; // already decoded, tags stripped
  contentHtml: string; // raw HTML, safe to render (our own generated content)
  featuredImage: { url: string; alt: string } | null;
  categories: string[];
  tags: string[];
};

// Decodes the small set of HTML entities WordPress actually emits in
// title/excerpt fields (smart quotes, dashes, ampersands, numeric entities).
// Not a general-purpose HTML decoder, just enough for this use case.
function decodeEntities(input: string): string {
  return input
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

type WpApiPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string; alt_text: string }[];
    "wp:term"?: { taxonomy: string; name: string }[][];
  };
};

function mapPost(p: WpApiPost): WordPressPost {
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  const terms = p._embedded?.["wp:term"] ?? [];
  const categories = terms.flat().filter((t) => t.taxonomy === "category").map((t) => t.name);
  const tags = terms.flat().filter((t) => t.taxonomy === "post_tag").map((t) => t.name);

  return {
    id: p.id,
    slug: p.slug,
    date: p.date,
    title: decodeEntities(stripTags(p.title.rendered)),
    excerpt: decodeEntities(stripTags(p.excerpt.rendered)),
    contentHtml: p.content.rendered,
    featuredImage: media ? { url: media.source_url, alt: media.alt_text || "" } : null,
    categories,
    tags,
  };
}

/**
 * Fetches published posts, newest first. Returns an empty array (rather than
 * throwing) if the WordPress site is unreachable or returns an error, so a
 * blog outage never breaks the main website's build or page render. Logs the
 * actual failure reason to the server console either way, so it's visible in
 * Vercel's function logs instead of failing completely silently.
 */
export async function getPosts(limit = 50): Promise<WordPressPost[]> {
  const url = `${WP_URL}/wp-json/wp/v2/posts?per_page=${limit}&_embed=1&status=publish`;
  try {
    const res = await fetch(url, { next: { revalidate: 1800 } }); // re-check every 30 min
    if (!res.ok) {
      console.error(`[wordpress] getPosts: WordPress returned ${res.status} for ${url}`);
      return [];
    }
    const data = (await res.json()) as WpApiPost[];
    console.log(`[wordpress] getPosts: fetched ${data.length} post(s) from WordPress`);
    return data.map(mapPost);
  } catch (err) {
    console.error(`[wordpress] getPosts: fetch to ${url} failed:`, err);
    return [];
  }
}

/** Returns a single post by slug, or null if not found / WordPress unreachable. */
export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  const url = `${WP_URL}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=1&status=publish`;
  try {
    const res = await fetch(url, { next: { revalidate: 1800 } });
    if (!res.ok) {
      console.error(`[wordpress] getPostBySlug("${slug}"): WordPress returned ${res.status}`);
      return null;
    }
    const data = (await res.json()) as WpApiPost[];
    return data.length > 0 ? mapPost(data[0]!) : null;
  } catch (err) {
    console.error(`[wordpress] getPostBySlug("${slug}"): fetch failed:`, err);
    return null;
  }
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Rough reading time estimate from the HTML content, ~200 words/minute. */
export function estimateReadTime(html: string): string {
  const words = stripTags(html).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}