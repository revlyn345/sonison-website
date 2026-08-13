import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { company } from "@/lib/site-data";

export function QuoteBand({
  eyebrow = "Your product, our package",
  title = "Send us your requirement",
  body = "Widths, colours, artwork, monthly volume: share what you need and we will come back with a price and a date.",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  return (
    <section className="ink-panel relative overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow text-accent">{eyebrow}</p>
            <h2 className="mt-4 max-w-2xl text-4xl leading-[1.05] text-ink-foreground md:text-6xl">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-ink-muted">{body}</p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={company.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-between gap-3 bg-accent px-7 py-5 font-bold text-accent-foreground shadow-red transition-transform hover:-translate-y-1"
            >
              <span className="inline-flex items-center gap-3">
                <MessageCircle className="h-5 w-5" />
                Talk on WhatsApp
              </span>
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-between gap-3 border border-ink-border px-7 py-5 font-bold text-ink-foreground transition-colors hover:bg-ink-border/40"
            >
              Request a formal quote
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
