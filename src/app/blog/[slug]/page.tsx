import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { QuoteBand } from "@/components/site/QuoteBand";
import { Reveal } from "@/components/site/Reveal";
import { getPostBySlug, formatPostDate, estimateReadTime } from "@/lib/wordpress";

// Articles are published externally (WordPress, via the daily automation),
// so these pages can't be statically enumerated at build time. Render on
// request and cache each one for 30 minutes.
export const revalidate = 1800;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Sonison Packaging`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `/blog/${slug}`,
      publishedTime: post.date,
      images: post.featuredImage ? [post.featuredImage.url] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            image: post.featuredImage?.url,
            author: { "@type": "Organization", name: "Sonison Packaging Pvt. Ltd." },
          }),
        }}
      />

      <section className="ink-panel relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-6 py-16 md:py-24">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-ink-muted transition-colors hover:text-ink-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All articles
          </Link>
          {post.categories[0] && <p className="eyebrow mt-8 text-accent">{post.categories[0]}</p>}
          <h1 className="mt-4 text-4xl leading-[1.02] text-ink-foreground md:text-6xl">
            {post.title}
          </h1>
          <div className="mt-7 flex items-center gap-5 font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatPostDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {estimateReadTime(post.contentHtml)}
            </span>
          </div>
        </div>
      </section>

      {post.featuredImage && (
        <section className="mx-auto max-w-4xl px-6 pt-10">
          <div className="tape-sheen border border-border">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt || post.title}
              width={1200}
              height={675}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </section>
      )}

      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <Reveal>
          <div
            className="prose-article max-w-none"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </Reveal>
      </section>

      <QuoteBand />
    </main>
  );
}
