import type { Metadata } from "next";
import Image from "next/image";
import { QuoteBand } from "@/components/site/QuoteBand";
import { Reveal } from "@/components/site/Reveal";
import factoryImg from "@/assets/factory.jpg";
import { clients, company, timeline, whyUs } from "@/lib/site-data";

const title = "About Sonison Packaging: BOPP Tape Makers Since 1995";
const description =
  "Since 1995 Sonison Packaging has manufactured BOPP self adhesive tape from New Delhi. A 9,000 sq. ft. Mundka facility focused on quality, price and order fulfilment.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, type: "website", url: "/about" },
};

export default function About() {
  return (
    <main>
      <section className="ink-panel relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-35" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="eyebrow text-accent">Our story</p>
          <h1 className="mt-4 max-w-4xl text-5xl leading-[0.95] text-ink-foreground md:text-7xl">
            We are the solution for your packaging requirements
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-muted">
            {company.name} began its journey in {company.since} with the manufacturing of BOPP
            self adhesive tape. We are a well-known manufacturer across India, with a strong
            connect with exporters, traders and service providers that deal in a wide range of
            industrial tapes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="tape-sheen border border-border shadow-lift">
              <Image
                src={factoryImg}
                alt="Sonison Packaging manufacturing floor in Mundka, New Delhi"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p className="eyebrow text-accent">The facility</p>
            <h2 className="mt-4 text-4xl leading-[1.02] md:text-5xl">
              9,000 sq. ft. in Mundka Industrial Area
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              With over 9,000 square feet of factory area, our plant in Mundka, New Delhi is
              equipped with a state-of-the-art manufacturing facility: adhesive coating,
              rotogravure printing, precision slitting and core winding, all in one place.
            </p>
            <dl className="mt-10 grid gap-px bg-border sm:grid-cols-3">
              {[
                { k: "Factory area", v: "9,000 sq. ft." },
                { k: "Established", v: "1995" },
                { k: "Focus", v: "Quality · Price · Fulfilment" },
              ].map((row) => (
                <div key={row.k} className="bg-background p-6">
                  <dt className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                    {row.k}
                  </dt>
                  <dd className="mt-2 font-display text-lg font-extrabold">{row.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="eyebrow text-accent">Milestones</p>
          <h2 className="mt-4 text-4xl md:text-6xl">Three decades of tape</h2>
          <div className="mt-14 grid gap-px bg-border md:grid-cols-4">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 70} className="h-full bg-background p-8">
                <div className="font-mono text-sm text-accent">{t.year}</div>
                <h3 className="mt-4 text-xl">{t.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow text-accent">Why us</p>
            <h2 className="mt-4 text-4xl leading-[1.02] md:text-5xl">
              What customers keep coming back for
            </h2>
          </div>
          <div className="grid gap-px bg-border sm:grid-cols-2">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 60} className="h-full bg-background p-7">
                <h3 className="text-lg">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ink-panel">
  <div className="mx-auto max-w-7xl px-6 py-16">
    <p className="eyebrow text-accent">Trusted by brands like</p>
    <div className="mt-8 flex flex-wrap items-center gap-3">
      {clients.map((c) =>
        c.logo ? (
          <span
            key={c.name}
            className="flex items-center border border-ink-border bg-white px-5 py-3"
          >
            <Image
              src={c.logo}
              alt={c.name}
              width={160}
              height={48}
              className="h-7 w-auto object-contain"
            />
          </span>
        ) : (
          <span
            key={c.name}
            className="border border-ink-border px-5 py-3 font-display text-sm font-extrabold uppercase tracking-tight text-ink-foreground"
          >
            {c.name}
          </span>
        ),
      )}
    </div>
  </div>
</section>

      <QuoteBand
        eyebrow="Have a question?"
        title="Get in touch today"
        body="Our team answers on WhatsApp within working hours, and a written quote follows the same day."
      />
    </main>
  );
}
