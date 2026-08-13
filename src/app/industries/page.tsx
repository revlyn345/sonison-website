import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { QuoteBand } from "@/components/site/QuoteBand";
import { Reveal } from "@/components/site/Reveal";
import { industriesDetail } from "@/lib/catalog";

const title = "BOPP Tape by Industry: E-commerce, Pharma, Export | Sonison";
const description =
  "Tape specifications matched to the job: e-commerce fulfilment, pharma cold chain, exporters, FMCG, slitting houses and heavy goods. Gauge, width and adhesive recommendations for each.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/industries" },
  openGraph: { title, description, type: "website", url: "/industries" },
};

export default function IndustriesIndex() {
  return (
    <main>
      <section className="ink-panel relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="eyebrow rule-red text-accent">Who we supply</p>
          <h1 className="mt-6 max-w-3xl text-5xl leading-[0.95] text-ink-foreground md:text-7xl">
            The right tape is an
            <span className="text-accent"> industry decision</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
            A pharma chiller, a container crossing the Arabian Sea and an automatic case sealer
            running 6,000 cartons a shift each fail for a different reason. Here is what we
            specify for each.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {industriesDetail.map((ind, i) => (
            <Reveal key={ind.slug} delay={i * 60} className="bg-background">
              <Link href={`/industries/${ind.slug}`} className="group flex h-full flex-col p-8">
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-accent">{ind.kicker}</span>
                <h2 className="mt-3 text-2xl">{ind.name}</h2>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{ind.summary}</p>
                <div className="mt-6 border-t border-border pt-5">
                  <div className="font-display text-2xl font-extrabold text-primary">{ind.stat.value}</div>
                  <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                    {ind.stat.label}
                  </div>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent">
                  Recommended specs
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <QuoteBand />
    </main>
  );
}
