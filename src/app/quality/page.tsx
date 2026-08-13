import type { Metadata } from "next";
import { QuoteBand } from "@/components/site/QuoteBand";
import { Reveal } from "@/components/site/Reveal";
import { capabilities, qualityChecks } from "@/lib/site-data";

const title = "Quality & Manufacturing Process | Sonison Packaging";
const description =
  "How Sonison Packaging makes BOPP tape: adhesive coating, rotogravure printing, precision slitting and core winding, with lot-by-lot testing for peel, tensile and coat weight.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/quality" },
  openGraph: { title, description, type: "website", url: "/quality" },
};

const steps = [
  {
    step: "Film & adhesive intake",
    body: "BOPP film and water-based acrylic adhesive are checked on arrival for gauge, clarity and solids before they touch a machine.",
  },
  {
    step: "Coating",
    body: "Adhesive is coated onto the film at a controlled coat weight and dried in-line, giving stable tack across the full roll width.",
  },
  {
    step: "Printing",
    body: "Engraved cylinders print up to three colours in register: logos, cautionary marks and repeat patterns on the running film.",
  },
  {
    step: "Slitting",
    body: "Mother rolls are slit to finished widths from 12mm to 96mm with clean edges and no telescoping.",
  },
  {
    step: "Winding & core fit",
    body: "Tape is wound onto paper cores made in-house, so inner diameter and roundness are consistent with your dispensers.",
  },
  {
    step: "Inspection & dispatch",
    body: "Sample rolls from every lot are pulled and tested, then packed, palletised and dispatched from Mundka.",
  },
];

export default function Quality() {
  return (
    <main>
      <section className="ink-panel relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-35" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="eyebrow text-accent">Quality &amp; process</p>
          <h1 className="mt-4 max-w-4xl text-5xl leading-[0.95] text-ink-foreground md:text-7xl">
            Tape fails quietly. We test loudly.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-muted">
            A carton that opens in transit costs far more than the tape that sealed it. Every lot
            leaving Mundka is checked against the properties that decide whether a seal holds.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <p className="eyebrow text-accent">From film to pallet</p>
        <h2 className="mt-4 max-w-3xl text-4xl leading-[1.02] md:text-6xl">
          Six stages, all under our own roof
        </h2>
        <div className="mt-14 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 60} className="h-full bg-background p-8">
              <span className="font-mono text-xs text-accent">Stage {String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-xl">{s.step}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="eyebrow text-accent">What we measure</p>
              <h2 className="mt-4 text-4xl leading-[1.02] md:text-5xl">Six properties, checked lot by lot</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Certified quality is one of our four stated commitments, alongside a
                well-equipped facility, timely delivery and competitive prices.
              </p>
            </div>
            <div className="grid gap-px bg-border sm:grid-cols-2">
              {qualityChecks.map((q, i) => (
                <Reveal key={q.label} delay={i * 50} className="h-full bg-background p-7">
                  <h3 className="text-lg">{q.label}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{q.detail}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ink-panel relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="eyebrow text-accent">Capabilities</p>
          <div className="mt-10 grid gap-px bg-ink-border md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c) => (
              <div key={c.title} className="ink-panel h-full p-8">
                <h3 className="text-xl text-ink-foreground">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteBand
        eyebrow="Specify with us"
        title="Send a sample brief"
        body="Tell us the carton, the weight and the journey. We'll recommend micron, adhesive and width, and send a sample roll."
      />
    </main>
  );
}
