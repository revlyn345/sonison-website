import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Newspaper } from "lucide-react";
import { QuoteBand } from "@/components/site/QuoteBand";
import { Reveal } from "@/components/site/Reveal";
import { getPosts, formatPostDate, estimateReadTime } from "@/lib/wordpress";

const title = "Blog | Sonison Packaging";
const description =
  "Articles on BOPP tape specification, buying guides and packaging know-how from Sonison Packaging.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title, description, type: "website", url: "/blog" },
};

// Re-check WordPress for new articles at most every 30 minutes, rather than
// only when the site is redeployed.
export const revalidate = 1800;

export default async function BlogIndex() {
  const posts = await getPosts();

  return (
    <main>
      <section className="ink-panel relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="eyebrow rule-red text-accent">From the floor</p>
          <h1 className="mt-6 max-w-3xl text-5xl leading-[0.95] text-ink-foreground md:text-7xl">
            Notes on tape, packing and specification
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Buying guides and product knowledge from the coating and slitting lines.
          </p>
        </div>
      </section>

      {posts.length === 0 ? (
        <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="flex flex-col items-center border border-border bg-surface px-6 py-20 text-center">
            <Newspaper className="h-8 w-8 text-accent" strokeWidth={1.6} />
            <h2 className="mt-6 text-2xl md:text-3xl">Articles are on their way</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              We&apos;re putting together guides on tape specification, buying and packaging
              know-how. Check back soon, or reach out directly if you need an answer right now.
            </p>
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={(i % 6) * 60} className="bg-background">
                <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
                  {post.featuredImage && (
                    <div className="tape-sheen aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.featuredImage.url}
                        alt={post.featuredImage.alt || post.title}
                        width={640}
                        height={400}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-7">
                    {post.categories[0] && (
                      <span className="font-mono text-[0.62rem] uppercase tracking-widest text-accent">
                        {post.categories[0]}
                      </span>
                    )}
                    <h2 className="mt-3 text-2xl">{post.title}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="mt-6 flex items-center gap-4 border-t border-border pt-4 font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatPostDate(post.date)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {estimateReadTime(post.contentHtml)}
                      </span>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent">
                      Read the guide
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <QuoteBand
        eyebrow="Still deciding on a spec"
        title="Skip the reading, ask us directly"
        body="Tell us the carton, the weight and the journey and we will recommend the micron, adhesive and width."
      />
    </main>
  );
}
