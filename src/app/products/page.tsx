import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { QuoteBand } from "@/components/site/QuoteBand";
import { Reveal } from "@/components/site/Reveal";
import { products, industries } from "@/lib/site-data";

const title = "BOPP Tape Products: Jumbo Rolls, Printed & Coloured Tape";
const description =
  "Explore Sonison Packaging's full range: BOPP jumbo rolls, plain and brown tape, coloured tape, custom printed tape and paper cores, made in New Delhi.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/products" },
  openGraph: { title, description, type: "website", url: "/products" },
};

export default function ProductsIndex() {
  return (
    <main>
      <section className="ink-panel relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-35" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="eyebrow text-accent">Product range</p>
          <h1 className="mt-4 max-w-4xl text-5xl leading-[0.95] text-ink-foreground md:text-7xl">
            Five product families. One coating line.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            From 1320mm mother rolls to a 12mm printed strip, everything below is coated,
            printed, slit and wound inside our Mundka facility.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60} className="bg-background">
              <Link href={`/products/${p.slug}`} className="group flex h-full flex-col">
                <div className="tape-sheen aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <p className="eyebrow text-accent">
                    {String(i + 1).padStart(2, "0")} · {p.kicker}
                  </p>
                  <h2 className="mt-3 text-3xl">{p.name}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent">
                    View specifications
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
          <div className="flex flex-col justify-center bg-surface p-10">
            <p className="eyebrow text-muted-foreground">Industries served</p>
            <ul className="mt-6 space-y-3">
              {industries.map((s) => (
                <li key={s} className="border-b border-border pb-3 text-sm font-semibold">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <QuoteBand
        eyebrow="Not sure which grade"
        title="Tell us what you are packing"
        body="Carton weight, transit distance, storage time and dispenser type decide the micron and adhesive. Send us the brief and we'll specify it."
      />
    </main>
  );
}
