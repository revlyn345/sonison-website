import type { Metadata } from "next";
import { Reveal } from "@/components/site/Reveal";
import { TapeConfigurator } from "@/components/site/TapeConfigurator";
import { micronGrades, specSheetRows } from "@/lib/catalog";

const title = "Tape Spec Configurator & Price Estimator | Sonison Packaging";
const description =
  "Build your BOPP tape specification (width, length, micron, colour, adhesive and printing) and get an indicative price per roll instantly, then send the spec straight to our plant.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/resources/configurator" },
  openGraph: { title, description, type: "website", url: "/resources/configurator" },
};

export default function ConfiguratorPage() {
  return (
    <main>
      <section className="ink-panel relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="eyebrow rule-red text-accent">Interactive</p>
          <h1 className="mt-6 max-w-3xl text-5xl leading-[0.95] text-ink-foreground md:text-7xl">
            Configure the roll.
            <br />
            <span className="text-accent">See the price.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Every roll is priced by size and micron. Change the width, length or micron and watch
            what it does to the cost, then send the exact specification to the plant on
            WhatsApp.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <TapeConfigurator />
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-2">
            <Reveal>
              <p className="eyebrow text-accent">Choosing a gauge</p>
              <h2 className="mt-4 text-3xl md:text-5xl">Micron is the decision that moves cost</h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Every extra micron is more film across the whole run. Buying heavier tape than
                the carton needs is the most common way packing budgets leak. Buying
                lighter than the sealer needs is the most common way lines stop.
              </p>
              <div className="mt-8 divide-y divide-border border-y border-border">
                {micronGrades.map((m) => (
                  <div key={m.micron} className="grid grid-cols-[auto_minmax(0,1fr)] gap-5 py-4">
                    <span className="font-display text-lg font-extrabold text-accent">{m.micron}µ</span>
                    <span className="min-w-0">
                      <span className="block text-sm">{m.use}</span>
                      <span className="mt-1 block font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
                        Peel {m.adhesion} · Tensile {m.tensile}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p className="eyebrow text-accent">Master specification</p>
              <h2 className="mt-4 text-3xl md:text-5xl">The datasheet behind every roll</h2>
              <dl className="mt-8 divide-y divide-border border-y border-border">
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
        </div>
      </section>
    </main>
  );
}
