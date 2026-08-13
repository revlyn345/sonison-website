import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Factory, ShieldCheck, Timer, Truck } from "lucide-react";
import { QuoteBand } from "@/components/site/QuoteBand";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { CaseStudies } from "@/components/site/CaseStudies";
import { CertStrip } from "@/components/site/CertStrip";
import { TapeConfigurator } from "@/components/site/TapeConfigurator";
import heroImg from "@/assets/hero-line.jpg";
import factoryImg from "@/assets/factory.jpg";
import { industriesDetail } from "@/lib/catalog";
import { capabilities, clients, company, products, stats, whyUs } from "@/lib/site-data";

const title = "BOPP Tape Manufacturer in Delhi | Sonison Packaging Pvt. Ltd.";
const description =
  "Sonison Packaging manufactures BOPP self adhesive tape, jumbo rolls, coloured and custom printed tape and paper cores from a 9,000 sq. ft. plant in Mundka, New Delhi. Since 1995.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, type: "website", url: "/" },
};

const icons = [Factory, Timer, Truck, ShieldCheck];

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: company.name,
            foundingDate: "1995",
            email: company.email,
            telephone: company.phones[0],
            address: {
              "@type": "PostalAddress",
              streetAddress: "Plot No. 20, Road No. 7, Mundka Industrial Area",
              addressLocality: "New Delhi",
              postalCode: "110041",
              addressCountry: "IN",
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="ink-panel relative overflow-hidden">
        <Image
          src={heroImg}
          alt="BOPP adhesive tape coating line with a jumbo roll of clear film"
          priority
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(100deg,oklch(0.15_0.04_254/0.95)_0%,oklch(0.15_0.04_254/0.7)_55%,oklch(0.15_0.04_254/0.3)_100%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 md:pb-28 md:pt-28">
          <div className="max-w-3xl">
            <p className="eyebrow rule-red text-accent">BOPP tape manufacturer · New Delhi · Since 1995</p>
            <h1 className="mt-7 text-5xl leading-[0.92] text-ink-foreground sm:text-6xl md:text-8xl">
              Your product.
              <br />
              <span className="text-accent">Our package.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted md:text-xl">
              Self adhesive BOPP tape coated, printed, slit and wound under one roof in Mundka,
              from 1320mm jumbo mother rolls to your three-colour branded carton seal.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={company.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-accent px-8 py-4 font-bold text-accent-foreground shadow-red transition-transform hover:-translate-y-1"
              >
                Get a quote today
                <ArrowRight className="h-5 w-5" />
              </a>
              <Link
                href="/products"
                className="inline-flex items-center gap-3 border border-ink-border px-8 py-4 font-bold text-ink-foreground transition-colors hover:bg-ink-border/40"
              >
                See the range
              </Link>
            </div>
          </div>
        </div>

        <div className="relative border-t border-ink-border/60 bg-[oklch(0.13_0.035_254/0.72)] backdrop-blur">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="px-2 py-7">
                <div className="font-display text-3xl font-extrabold text-ink-foreground md:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-b border-border bg-surface py-4">
       <div className="marquee-track">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center">
            {clients.concat(clients).map((c, i) =>
              c.logo ? (
                <span
                  key={`${dup}-${c.name}-${i}`}
                  className="flex items-center gap-8 whitespace-nowrap px-8"
               >
                  <Image
                    src={c.logo}
                    alt={c.name}
                    width={160}
                    height={48}
                    className="h-9 w-auto object-contain"
                  />
                  <span className="h-1.5 w-1.5 bg-accent" />
               </span>
            ) : (
            <span
              key={`${dup}-${c.name}-${i}`}
              className="flex items-center gap-8 whitespace-nowrap px-8 font-display text-lg font-extrabold uppercase tracking-tight text-muted-foreground"
            >
              {c.name}
              <span className="h-1.5 w-1.5 bg-accent" />
            </span>
          ),
        )}
      </div>
    ))}
  </div>
</div>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="min-w-0">
            <p className="eyebrow text-accent">What we manufacture</p>
            <h2 className="mt-4 max-w-2xl text-4xl leading-[1.02] md:text-6xl">
              Tape built for the carton, not the catalogue
            </h2>
          </div>
          <Link href="/products" className="inline-flex shrink-0 items-center gap-2 font-bold text-accent">
            All products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70} className="bg-background">
              <Link href={`/products/${p.slug}`} className="group flex h-full flex-col">
                <div className="tape-sheen aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-2xl">{p.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent">
                    Specifications
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Capability strip */}
      <section className="ink-panel relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="eyebrow text-accent">Inside the plant</p>
          <h2 className="mt-4 max-w-3xl text-4xl leading-[1.02] text-ink-foreground md:text-6xl">
            Four processes, one building, zero handoffs
          </h2>
          <div className="mt-14 grid gap-px bg-ink-border md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 70} className="ink-panel h-full p-8">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-xl text-ink-foreground">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why us + factory */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="tape-sheen relative border border-border shadow-lift">
              <Image
                src={factoryImg}
                alt="Slitting machines and pallets of finished tape inside the Sonison Packaging plant"
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-accent px-6 py-4">
                <div className="font-display text-3xl font-extrabold text-accent-foreground">9,000</div>
                <div className="font-mono text-[0.65rem] uppercase tracking-widest text-accent-foreground/85">
                  sq. ft. Mundka facility
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p className="eyebrow text-accent">Why Sonison</p>
            <h2 className="mt-4 text-4xl leading-[1.02] md:text-5xl">Quality, price and order fulfilment</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Sonison Packaging Pvt. Ltd. began its journey in 1995 with the manufacture of BOPP
              self adhesive tape. We are a well-known manufacturer across India with a strong
              connect with exporters, traders and service providers dealing in a wide range of
              industrial tapes.
            </p>
            <div className="mt-8 grid gap-px bg-border sm:grid-cols-2">
              {whyUs.map((w, i) => {
                const Icon = icons[i] ?? Check;
                return (
                  <div key={w.title} className="bg-background p-6">
                    <Icon className="h-5 w-5 text-accent" />
                    <h3 className="mt-3 text-lg">{w.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
                  </div>
                );
              })}
            </div>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 font-bold text-accent">
              Our story <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Configurator */}
      <section className="ink-panel relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-25" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div className="min-w-0">
              <p className="eyebrow text-accent">Price it yourself</p>
              <h2 className="mt-4 max-w-2xl text-4xl leading-[1.02] text-ink-foreground md:text-6xl">
                Tape is sold by weight. Here is the maths, live.
              </h2>
            </div>
            <Link href="/configurator" className="inline-flex shrink-0 items-center gap-2 font-bold text-accent">
              Full configurator <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12">
            <TapeConfigurator compact />
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: 30, s: "+", l: "Years on the coating line" },
            { v: 9000, s: "", l: "Sq. ft. under one roof" },
            { v: 11000, s: "+", l: "Rolls dispatched monthly" },
            { v: 1320, s: "mm", l: "Widest mother roll" },
          ].map((n) => (
            <div key={n.l} className="bg-surface px-6 py-10">
              <Counter value={n.v} suffix={n.s} className="font-display text-4xl font-extrabold text-primary md:text-5xl" />
              <div className="mt-2 font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
                {n.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="min-w-0">
            <p className="eyebrow text-accent">Matched to the job</p>
            <h2 className="mt-4 max-w-2xl text-4xl leading-[1.02] md:text-6xl">
              A chiller and a container need different tape
            </h2>
          </div>
          <Link href="/industries" className="inline-flex shrink-0 items-center gap-2 font-bold text-accent">
            All industries <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {industriesDetail.map((ind, i) => (
            <Reveal key={ind.slug} delay={i * 60} className="bg-background">
              <Link href={`/industries/${ind.slug}`} className="group flex h-full flex-col p-7">
                <span className="font-mono text-[0.62rem] uppercase tracking-widest text-accent">{ind.kicker}</span>
                <h3 className="mt-3 text-xl">{ind.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{ind.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent">
                  Specs for this
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CaseStudies />
      <CertStrip />

      {/* Brands */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[auto_minmax(0,1fr)] md:items-center">
          <div>
            <p className="eyebrow text-accent">Our brands</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Pack Me &amp; Winpack</h2>
          </div>
          <p className="text-muted-foreground">
            Two in-house labels covering retail-ready packs and bulk industrial supply,
            alongside private-label production for brands that want their own name on the roll.
          </p>
        </div>
      </section>

      <QuoteBand />
    </main>
  );
}
