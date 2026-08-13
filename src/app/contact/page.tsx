import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";
import { company } from "@/lib/site-data";

const title = "Contact Sonison Packaging: BOPP Tape Enquiries, Delhi";
const description =
  "Get a quote for BOPP jumbo rolls, printed tape, coloured tape or paper cores. Call +91 8802 750 750 or send your requirement from Mundka Industrial Area, New Delhi.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, type: "website", url: "/contact" },
};

export default function Contact() {
  return (
    <main>
      <section className="ink-panel relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-35" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="eyebrow text-accent">Get in touch</p>
          <h1 className="mt-4 max-w-3xl text-5xl leading-[0.95] text-ink-foreground md:text-7xl">
            Let&apos;s pack your product together
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <div className="grid gap-px bg-border">
              <a
                href={company.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex gap-4 bg-background p-7"
              >
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" />
                <span className="min-w-0">
                  <span className="eyebrow block text-muted-foreground">Location</span>
                  <span className="mt-2 block font-semibold group-hover:text-accent">{company.address}</span>
                </span>
              </a>
              <div className="flex gap-4 bg-background p-7">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-accent" />
                <div className="min-w-0">
                  <span className="eyebrow block text-muted-foreground">Phone</span>
                  {company.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="mt-2 block font-mono font-semibold hover:text-accent">
                      {p}
                    </a>
                  ))}
                </div>
              </div>
              <a href={`mailto:${company.email}`} className="group flex gap-4 bg-background p-7">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-accent" />
                <span className="min-w-0">
                  <span className="eyebrow block text-muted-foreground">Email</span>
                  <span className="mt-2 block font-semibold group-hover:text-accent">{company.email}</span>
                </span>
              </a>
            </div>

            <div className="mt-8 border border-border">
              <iframe
                title="Sonison Packaging location map"
                src="https://www.google.com/maps?q=Mundka+Industrial+Area+New+Delhi+110041&output=embed"
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </main>
  );
}
