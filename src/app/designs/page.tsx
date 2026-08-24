import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { QuoteBand } from "@/components/site/QuoteBand";
import { Reveal } from "@/components/site/Reveal";
import { TapeDesignStudio } from "@/components/site/TapeDesignStudio";
import { DesignGalleryShowcase, ShadeCarousel } from "@/components/site/DesignGallery";
import { Carousel } from "@/components/site/Carousel";

const title = "Coloured & Printed Tape Designs: Studio & Gallery | Sonison";
const description =
  "See your carton tape before you order it. Pick a shade, type your brand name, choose a print layout and send the exact design to our Delhi plant on WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/designs" },
  openGraph: { title, description, type: "website", url: "/designs" },
};

const artwork = [
  {
    step: "Send artwork",
    body: "AI, CDR, PDF or a high-resolution PNG. Vector is best, we can redraw a logo from a print sample if that is all you have.",
  },
  {
    step: "Colour match",
    body: "Tell us the Pantone or send a printed carton. We match on press and share a proof before the cylinder is cut.",
  },
  {
    step: "Cylinder & proof",
    body: "One cylinder per colour, a one-time cost that stays with us for repeat runs. You approve a physical strip first.",
  },
  {
    step: "Production run",
    body: "Economical from about 500 rolls per design. Mixed shades or designs can travel on one invoice.",
  },
];

const useCases = [
  { name: "D2C unboxing", note: "Brand wordmark in two colours on a strong base shade" },
  { name: "Anti-pilferage", note: "Tamper-evident wording repeated so any cut shows" },
  { name: "Fragile / handle with care", note: "High-contrast warning band read across a warehouse" },
  { name: "Warehouse sorting", note: "One flat shade per client or per route, no print needed" },
  { name: "Pharma cold chain", note: "Flagged shade plus a temperature instruction line" },
  { name: "Export cartons", note: "Directional arrows and consignee code on the seam" },
];

export default function DesignsPage() {
  return (
    <main>
      <section className="ink-panel relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="eyebrow rule-red text-accent">Colour &amp; print</p>
          <h1 className="mt-6 max-w-3xl text-5xl leading-[0.95] text-ink-foreground md:text-7xl">
            See the tape before you buy the tape.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Build a coloured or printed roll on screen, shade, wordmark, layout and ink, then
            send that exact design to the plant. No mockup fees, no waiting on a designer.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow rule-red text-accent">Design gallery</p>
                <h2 className="mt-4 max-w-2xl text-4xl md:text-5xl">
                  Sixteen designs already running on Indian cartons
                </h2>
              </div>
              <p className="max-w-sm text-sm text-muted-foreground">
                Filter by your industry, tap a design to see it on a sealed carton, and send it to
                the plant with your own brand swapped in.
              </p>
            </div>
          </Reveal>
          <div className="mt-10">
            <DesignGalleryShowcase />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <Reveal>
          <TapeDesignStudio />
        </Reveal>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <Reveal>
            <p className="eyebrow rule-red text-accent">Stock shades</p>
            <h2 className="mt-4 max-w-2xl text-4xl md:text-5xl">Eight shades we run regularly</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Anything outside this list is a custom masterbatch, tell us the Pantone and the
              monthly volume and we will quote it.
            </p>
          </Reveal>
          <div className="mt-10">
            <ShadeCarousel />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <Reveal>
          <p className="eyebrow rule-red text-accent">What people print</p>
          <h2 className="mt-4 max-w-2xl text-4xl md:text-5xl">
            Six designs that earn their cylinder cost
          </h2>
        </Reveal>
        <div className="mt-10">
          <Carousel label="Print use cases" slideClass="w-[80%] sm:w-[48%] lg:w-[32%]">
            {useCases.map((u) => (
              <div
                key={u.name}
                className="h-full border border-border bg-card p-7 transition-colors hover:border-accent"
              >
                <h3 className="mt-4 text-lg font-bold">{u.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{u.note}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <Reveal>
            <p className="eyebrow rule-red text-accent">Artwork to dispatch</p>
            <h2 className="mt-4 max-w-2xl text-4xl md:text-5xl">
              How a printed order actually runs
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
            {artwork.map((a, i) => (
              <div key={a.step} className="bg-card p-7">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-bold">{a.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/products/printed-tape"
              className="inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground"
            >
              Printed tape details <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/products/coloured-tape"
              className="inline-flex items-center gap-2 border border-border px-6 py-3.5 text-sm font-bold"
            >
              Coloured tape details <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <QuoteBand
        eyebrow="Send your artwork"
        title="Share a logo, get a proof"
        body="WhatsApp us the design you built here along with your logo file. We come back with a colour proof, a cylinder cost and a dispatch date."
      />
    </main>
  );
}
