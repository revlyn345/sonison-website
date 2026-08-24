import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { QuoteBand } from "@/components/site/QuoteBand";
import { Reveal } from "@/components/site/Reveal";
import { TapeDesignStudio } from "@/components/site/TapeDesignStudio";
import { products } from "@/lib/site-data";
import { productDetails } from "@/lib/product-detail";
import { productScenarios } from "@/lib/product-scenarios";
import {
  Applications,
  CompareTable,
  DispatchStrip,
  EnquiryCard,
  InfoTable,
  OrderSteps,
  QuickFacts,
  RequirementCalculator,
  ScenarioFaqs,
} from "@/components/site/product/ProductWidgets";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.seo.title,
    description: p.seo.description,
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      title: p.seo.title,
      description: p.seo.description,
      type: "website",
      url: `/products/${slug}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const index = products.findIndex((p) => p.slug === product.slug);
  const next = products[(index + 1) % products.length]!;
  const detail = productDetails[product.slug];
  const allFaqs = [...(product.faqs ?? []), ...(detail?.buyerFaqs ?? [])];

  const scenarioFaqEntries = (productScenarios[product.slug] ?? []).map((s) => ({
    q: s.q,
    a: `${s.a} Suggested specification: ${s.spec.map((r) => `${r.label}: ${r.value}`).join("; ")}.`,
  }));
  const structuredFaqs = [...allFaqs, ...scenarioFaqEntries];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.summary,
            brand: { "@type": "Brand", name: "Sonison Packaging" },
            category: "BOPP adhesive tape",
          }),
        }}
      />
      {structuredFaqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: structuredFaqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      )}

      <section className="ink-panel relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-35" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-ink-muted transition-colors hover:text-ink-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All products
            </Link>
            <p className="eyebrow mt-8 text-accent">{product.kicker}</p>
            <h1 className="mt-4 text-5xl leading-[0.95] text-ink-foreground md:text-7xl">{product.name}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">{product.summary}</p>
          </div>
          <div className="tape-sheen border border-ink-border">
            <Image src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
        </div>
        {detail && (
          <div className="relative mx-auto max-w-7xl px-6 pb-16">
            <QuickFacts detail={detail} />
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <p className="eyebrow text-accent">Overview</p>
            <p className="mt-6 text-xl leading-relaxed text-foreground/85 md:text-2xl">{product.intro}</p>
            {product.sections.map((s) => (
              <div key={s.title} className="mt-12">
                <h2 className="text-2xl">{s.title}</h2>
                {s.body && <p className="mt-4 leading-relaxed text-muted-foreground">{s.body}</p>}
                {s.bullets && (
                  <ul className="mt-5 space-y-3">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-3 border-b border-border pb-3 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Reveal>

          <Reveal delay={80}>
            <div className="border border-border bg-card p-8 shadow-card">
              <p className="eyebrow text-muted-foreground">Key attributes</p>
              <ul className="mt-6 space-y-4">
                {product.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm font-medium">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {product.specGroups.map((g) => (
              <div key={g.title} className="mt-8 border border-border bg-card shadow-card">
                <h3 className="px-8 pt-6 text-lg">{g.title}</h3>
                <dl className="px-8 pb-6 pt-4">
                  {g.rows.map((r, i) => (
                    <div
                      key={`${r.label}-${i}`}
                      className="grid gap-1 border-b border-border py-3 last:border-0 sm:grid-cols-[130px_minmax(0,1fr)] sm:gap-4"
                    >
                      <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
                        {r.label}
                      </dt>
                      <dd className="text-sm font-semibold">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}

            {detail && (
              <div className="mt-8">
                <EnquiryCard detail={detail} productName={product.name} />
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {detail && (
        <>
          <section className="border-y border-border bg-surface">
            <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
              <Reveal>
                <p className="eyebrow text-accent">Applications</p>
                <h2 className="mt-4 text-3xl md:text-5xl">Where buyers use it</h2>
                <div className="mt-8">
                  <Applications detail={detail} />
                </div>
              </Reveal>
              <Reveal delay={80} className="mt-14">
                <RequirementCalculator detail={detail} productName={product.name} />
              </Reveal>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <Reveal>
              <p className="eyebrow text-accent">Packing, freight &amp; terms</p>
              <h2 className="mt-4 text-3xl md:text-5xl">Everything before the PO</h2>
            </Reveal>
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <Reveal>
                <InfoTable title="Packing & dispatch" icon="packing" rows={detail.packing} />
              </Reveal>
              <Reveal delay={80}>
                <InfoTable title="Commercial terms" icon="commercial" rows={detail.commercials} />
              </Reveal>
            </div>
            <Reveal delay={120} className="mt-8">
              <DispatchStrip />
            </Reveal>
          </section>

          <section className="ink-panel">
            <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
              <p className="eyebrow text-accent">How to order</p>
              <h2 className="mt-4 text-3xl text-ink-foreground md:text-5xl">
                Four steps from enquiry to dispatch
              </h2>
              <div className="mt-10">
                <OrderSteps detail={detail} />
              </div>
            </div>
          </section>

          <section className="border-y border-border bg-surface">
            <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
              <Reveal>
                <p className="eyebrow text-accent">Advice by scenario</p>
                <h2 className="mt-4 max-w-3xl text-3xl md:text-5xl">
                  Tell us the situation, we&apos;ll tell you the spec
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Common cases we handle every week, pick the one closest to yours and see exactly
                  what we would put on the invoice.
                </p>
                <div className="mt-10">
                  <ScenarioFaqs slug={product.slug} productName={product.name} />
                </div>
              </Reveal>
            </div>
          </section>

          {(product.slug === "coloured-tape" || product.slug === "printed-tape") && (
            <section className="border-y border-border bg-surface">
              <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
                <Reveal>
                  <p className="eyebrow text-accent">Design studio</p>
                  <h2 className="mt-4 max-w-3xl text-3xl md:text-5xl">
                    See it on the carton before you order it
                  </h2>
                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    Try shades, layouts and your own wordmark. Send the mock-up over and
                    we&apos;ll price it and courier a proof roll.
                  </p>
                  <div className="mt-10">
                    <TapeDesignStudio />
                  </div>
                </Reveal>
              </div>
            </section>
          )}

          <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <Reveal>
              <p className="eyebrow text-accent">Compare</p>
              <h2 className="mt-4 text-3xl md:text-5xl">How this sits in the range</h2>
              <div className="mt-10">
                <CompareTable currentSlug={product.slug} />
              </div>
            </Reveal>
          </section>
        </>
      )}

      {allFaqs.length > 0 && (
        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-4xl px-6 py-20">
            <p className="eyebrow text-accent">FAQs</p>
            <h2 className="mt-4 text-3xl md:text-5xl">Frequently asked questions</h2>
            <div className="mt-10 divide-y divide-border border-y border-border">
              {allFaqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 40}>
                  <details className="group py-6">
                    <summary className="grid cursor-pointer list-none grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4">
                      <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="min-w-0 text-lg md:text-xl">{f.q}</h3>
                      <span className="mt-1 h-4 w-4 shrink-0 border-t-2 border-accent transition-transform group-open:rotate-180">
                        <span className="block h-4 w-4 -translate-y-[9px] border-l-2 border-accent group-open:opacity-0" />
                      </span>
                    </summary>
                    <p className="ml-9 mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Link
          href={`/products/${next.slug}`}
          className="group grid gap-6 border border-border bg-card p-8 shadow-card transition-shadow hover:shadow-lift sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
        >
          <div className="min-w-0">
            <p className="eyebrow text-muted-foreground">Next product</p>
            <h2 className="mt-2 truncate text-3xl">{next.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{next.kicker}</p>
          </div>
          <ArrowRight className="h-8 w-8 shrink-0 text-accent transition-transform group-hover:translate-x-2" />
        </Link>
      </section>

      <QuoteBand />
    </main>
  );
}
