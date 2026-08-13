import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { QuoteBand } from "@/components/site/QuoteBand";

const title = "Blog | Sonison Packaging";
const description =
  "Articles on BOPP tape specification, buying guides and packaging know-how from Sonison Packaging. New articles publishing soon.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title, description, type: "website", url: "/blog" },
};

export default function BlogIndex() {
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

      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="flex flex-col items-center border border-border bg-surface px-6 py-20 text-center">
          <Newspaper className="h-8 w-8 text-accent" strokeWidth={1.6} />
          <h2 className="mt-6 text-2xl md:text-3xl">Articles are on their way</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            We're putting together guides on tape specification, buying and packaging know-how.
            Check back soon, or reach out directly if you need an answer right now.
          </p>
        </div>
      </section>

      <QuoteBand />
    </main>
  );
}