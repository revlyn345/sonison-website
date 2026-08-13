import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { QuoteBand } from "@/components/site/QuoteBand";
import { faqs } from "@/lib/catalog";

const title = "BOPP Tape FAQs: Micron, MOQ, Printing & Lead Time | Sonison";
const description =
  "Answers on minimum order quantity, how tape is priced by weight, which micron to use, printing colours and cylinder cost, lead times and delivery across India.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/faq" },
  openGraph: { title, description, type: "website", url: "/faq" },
};

export default function FaqPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <section className="ink-panel relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="eyebrow rule-red text-accent">Buyer&apos;s questions</p>
          <h1 className="mt-6 max-w-3xl text-5xl leading-[0.95] text-ink-foreground md:text-7xl">
            Everything a purchase team asks
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Straight answers on quantity, gauge, printing and delivery, the same ones we give on
            the phone.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="divide-y divide-border border-y border-border">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 40}>
              <details className="group py-6">
                <summary className="grid cursor-pointer list-none grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="min-w-0 text-lg md:text-xl">{f.q}</h2>
                  <span className="mt-1 h-4 w-4 shrink-0 border-t-2 border-accent transition-transform group-open:rotate-180">
                    <span className="block h-4 w-4 -translate-y-[9px] border-l-2 border-accent group-open:opacity-0" />
                  </span>
                </summary>
                <p className="ml-9 mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>

        <Link href="/configurator" className="mt-12 inline-flex items-center gap-2 font-bold text-accent">
          Price your own specification <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <QuoteBand />
    </main>
  );
}
