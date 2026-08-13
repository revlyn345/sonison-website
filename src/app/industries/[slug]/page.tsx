import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, TriangleAlert } from "lucide-react";
import { QuoteBand } from "@/components/site/QuoteBand";
import { Reveal } from "@/components/site/Reveal";
import { TapeConfigurator } from "@/components/site/TapeConfigurator";
import { industriesDetail } from "@/lib/catalog";
import { products } from "@/lib/site-data";

export function generateStaticParams() {
  return industriesDetail.map((i) => ({ slug: i.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ind = industriesDetail.find((i) => i.slug === slug);
  if (!ind) return {};
  return {
    title: ind.seo.title,
    description: ind.seo.description,
    alternates: { canonical: `/industries/${slug}` },
    openGraph: {
      title: ind.seo.title,
      description: ind.seo.description,
      type: "article",
      url: `/industries/${slug}`,
    },
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = industriesDetail.find((i) => i.slug === slug);
  if (!industry) notFound();

  const related = products.filter((p) => industry.productSlugs.includes(p.slug));

  return (
    <main>
      <section className="ink-panel relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-ink-muted transition-colors hover:text-ink-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All industries
          </Link>
          <p className="eyebrow mt-8 text-accent">{industry.kicker}</p>
          <h1 className="mt-4 max-w-4xl text-5xl leading-[0.95] text-ink-foreground md:text-7xl">{industry.name}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{industry.summary}</p>
          <div className="mt-10 inline-block border border-ink-border px-7 py-5">
            <div className="font-display text-4xl font-extrabold text-ink-foreground">{industry.stat.value}</div>
            <div className="mt-1 font-mono text-[0.62rem] uppercase tracking-widest text-ink-muted">
              {industry.stat.label}
            </div>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <p className="eyebrow text-accent">Where sealing fails here</p>
        <h2 className="mt-4 max-w-2xl text-3xl md:text-5xl">Three failures we design against</h2>
        <div className="mt-12 grid gap-px border border-border bg-border lg:grid-cols-3">
          {industry.challenges.map((c, i) => (
            <Reveal key={c.title} delay={i * 80} className="bg-background p-8">
              <TriangleAlert className="h-5 w-5 text-accent" strokeWidth={1.7} />
              <h3 className="mt-5 text-xl">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Recommended */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="eyebrow text-accent">What we recommend</p>
          <h2 className="mt-4 max-w-2xl text-3xl md:text-5xl">
            The specification sheet for {industry.name.toLowerCase()}
          </h2>
          <div className="mt-10 overflow-x-auto border border-border bg-background">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="ink-panel">
                  {["Product", "Specification", "Why"].map((h) => (
                    <th key={h} className="px-5 py-4 font-mono text-[0.62rem] uppercase tracking-widest text-ink-muted">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {industry.recommended.map((r) => (
                  <tr key={r.spec}>
                    <td className="px-5 py-4 font-bold">{r.product}</td>
                    <td className="px-5 py-4 font-mono text-xs">{r.spec}</td>
                    <td className="px-5 py-4 text-muted-foreground">{r.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {related.length > 0 && (
            <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group grid grid-cols-[auto_minmax(0,1fr)] items-center gap-5 bg-background p-6"
                >
                  <Image src={p.image} alt={p.name} className="h-20 w-20 shrink-0 object-cover" />
                  <span className="min-w-0">
                    <span className="block text-lg font-bold">{p.name}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{p.kicker}</span>
                    <span className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-accent">
                      View specs
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Configurator */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <p className="eyebrow text-accent">Price it now</p>
        <h2 className="mt-4 max-w-2xl text-3xl md:text-5xl">Adjust the spec to your carton</h2>
        <div className="mt-10">
          <TapeConfigurator compact />
        </div>
      </section>

      <QuoteBand />
    </main>
  );
}
