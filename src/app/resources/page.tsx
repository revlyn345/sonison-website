import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { QuoteBand } from "@/components/site/QuoteBand";
import { glossary, micronGrades, specSheetRows } from "@/lib/catalog";

const title = "BOPP Tape Technical Resources & Glossary | Sonison Packaging";
const description =
  "Master specification sheet, micron selection guide and a plain-language glossary of BOPP tape terms: coat weight, peel adhesion, shear, telescoping, repeat length and more.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/resources" },
  openGraph: { title, description, type: "website", url: "/resources" },
};

export default function ResourcesPage() {
  return (
    <main>
      <section className="ink-panel relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="eyebrow rule-red text-accent">Technical library</p>
          <h1 className="mt-6 max-w-3xl text-5xl leading-[0.95] text-ink-foreground md:text-7xl">
            Know the tape before you buy it
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
            The numbers, the vocabulary and the selection logic we use on the floor, written out
            so your team can specify with confidence.
          </p>
        </div>
      </section>

      {/* Spec sheet */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <Reveal>
            <p className="eyebrow text-accent">Master specification</p>
            <h2 className="mt-4 text-3xl md:text-5xl">Sonison BOPP tape datasheet</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Ranges cover the full production window. A firm datasheet for your exact gauge and
              width is issued with the quotation.
            </p>
            <Link href="/resources/configurator" className="mt-7 inline-flex items-center gap-2 font-bold text-accent">
              Build a spec and price it <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <Reveal delay={110}>
            <dl className="divide-y divide-border border-y border-border">
              {specSheetRows.map((r) => (
                <div key={r.property} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-5 py-4">
                  <dt className="min-w-0 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                    {r.property}
                  </dt>
                  <dd className="min-w-0 text-sm font-semibold">{r.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Micron table */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="eyebrow text-accent">Selection guide</p>
          <h2 className="mt-4 max-w-2xl text-3xl md:text-5xl">Which micron for which carton</h2>
          <div className="mt-10 overflow-x-auto border border-border bg-background">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="ink-panel">
                  {["Gauge", "Typical use", "Peel adhesion", "Tensile"].map((h) => (
                    <th key={h} className="px-5 py-4 font-mono text-[0.62rem] uppercase tracking-widest text-ink-muted">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {micronGrades.map((m) => (
                  <tr key={m.micron} className="transition-colors hover:bg-surface">
                    <td className="px-5 py-4 font-display font-extrabold text-accent">{m.micron}µ</td>
                    <td className="px-5 py-4">{m.use}</td>
                    <td className="px-5 py-4 font-mono text-xs">{m.adhesion}</td>
                    <td className="px-5 py-4 font-mono text-xs">{m.tensile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Glossary */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <p className="eyebrow text-accent">Glossary</p>
        <h2 className="mt-4 max-w-2xl text-3xl md:text-5xl">Tape vocabulary, without the sales gloss</h2>
        <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {glossary.map((g, i) => (
            <Reveal key={g.term} delay={(i % 3) * 70} className="bg-background p-7">
              <h3 className="text-lg">{g.term}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.def}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <QuoteBand />
    </main>
  );
}
