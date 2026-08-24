import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { company, products } from "@/lib/site-data";
import { industriesDetail } from "@/lib/catalog";

export function Footer() {
  return (
    <footer className="ink-panel">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_0.9fr_1.1fr]">
          <div>
            <div className="inline-block bg-white p-4">
              <Image
                src="/logo.png"
                alt="Sonison Packaging Pvt. Ltd."
                width={1600}
                height={347}
                className="h-9 w-auto"
              />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
              Manufacturing BOPP self adhesive tape from New Delhi since {company.since}.{" "}
              {company.tagline}.
            </p>
            <div className="mt-6 flex gap-2">
              {company.brands.map((b) => (
                <span
                  key={b}
                  className="border border-ink-border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="eyebrow text-ink-foreground">Products</h3>
            <ul className="mt-5 space-y-3 text-sm text-ink-muted">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="transition-colors hover:text-ink-foreground">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-ink-foreground">Industries</h3>
            <ul className="mt-5 space-y-3 text-sm text-ink-muted">
              {industriesDetail.map((i) => (
                <li key={i.slug}>
                  <Link href={`/products/industries/${i.slug}`} className="transition-colors hover:text-ink-foreground">
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-ink-foreground">Company</h3>
            <ul className="mt-5 space-y-3 text-sm text-ink-muted">
              <li>
                <Link href="/" className="hover:text-ink-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-ink-foreground">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/designs" className="hover:text-ink-foreground">
                  Design studio
                </Link>
              </li>
              <li>
                <Link href="/about/quality" className="hover:text-ink-foreground">
                  Quality & process
                </Link>
              </li>
              <li>
                <Link href="/resources/configurator" className="hover:text-ink-foreground">
                  Spec configurator
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-ink-foreground">
                  Technical resources
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-ink-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/resources/faq" className="hover:text-ink-foreground">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-ink-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-ink-foreground">Contact</h3>
            <ul className="mt-5 space-y-4 text-sm text-ink-muted">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href={company.mapUrl} target="_blank" rel="noreferrer">
                  {company.address}
                </a>
              </li>
              {company.phones.map((p) => (
                <li key={p} className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="font-mono hover:text-ink-foreground">
                    {p}
                  </a>
                </li>
              ))}
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ink-border pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-widest">Mundka Industrial Area · New Delhi · India</p>
        </div>
      </div>
    </footer>
  );
}
