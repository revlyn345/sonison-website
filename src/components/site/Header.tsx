"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { company, products } from "@/lib/site-data";
import { industriesDetail } from "@/lib/catalog";

const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Quality", href: "/quality" },
  { label: "Configurator", href: "/configurator" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the mobile menu automatically on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-ink text-ink-muted md:block">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-2 text-[0.7rem]">
          <a
            href={company.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="min-w-0 truncate transition-colors hover:text-ink-foreground"
          >
            {company.address}
          </a>
          <div className="flex shrink-0 items-center gap-5">
            <a href={`mailto:${company.email}`} className="transition-colors hover:text-ink-foreground">
              {company.email}
            </a>
            <a
              href={`tel:${company.phones[0].replace(/\s/g, "")}`}
              className="font-mono tracking-wide text-ink-foreground"
            >
              {company.phones[0]}
            </a>
          </div>
        </div>
      </div>

      <div
        className={`relative border-b transition-all duration-300 ${
          scrolled ? "border-border bg-background/90 backdrop-blur-xl" : "border-transparent bg-background"
        }`}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4">
          <Link href="/" className="flex min-w-0 items-center">
            <Image
              src="/logo.png"
              alt="Sonison Packaging Pvt. Ltd."
              width={1600}
              height={347}
              priority
              className="h-8 w-auto sm:h-10"
            />
          </Link>

          <nav className="hidden items-center lg:flex">
            {nav.map((item) =>
              item.label === "Products" ? (
                <div key={item.href} className="group static">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-3 py-2 text-[0.82rem] font-semibold transition-colors hover:text-accent ${
                      isActive(item.href) ? "text-accent" : "text-foreground/80"
                    }`}
                  >
                    Products
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                  </Link>

                  {/* Mega menu */}
                  <div className="invisible absolute inset-x-0 top-full translate-y-1 border-y border-border bg-card opacity-0 shadow-lift transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="mx-auto grid max-w-7xl gap-px bg-border px-0 py-0 md:grid-cols-[1.4fr_1fr_0.9fr]">
                      <div className="bg-card p-7">
                        <p className="eyebrow text-muted-foreground">The range</p>
                        <div className="mt-4 grid gap-px bg-border sm:grid-cols-2">
                          {products.map((p) => (
                            <Link
                              key={p.slug}
                              href={`/products/${p.slug}`}
                              className="bg-card p-4 transition-colors hover:bg-surface"
                            >
                              <div className="text-sm font-bold">{p.name}</div>
                              <div className="mt-1 text-xs text-muted-foreground">{p.kicker}</div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="bg-card p-7">
                        <p className="eyebrow text-muted-foreground">By industry</p>
                        <div className="mt-4 flex flex-col">
                          {industriesDetail.map((i) => (
                            <Link
                              key={i.slug}
                              href={`/industries/${i.slug}`}
                              className="border-b border-border py-2.5 text-sm font-semibold text-foreground/80 transition-colors last:border-0 hover:text-accent"
                            >
                              {i.name}
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="ink-panel p-7">
                        <p className="eyebrow text-accent">Not sure what to order?</p>
                        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                          Build the exact roll (width, micron, colour, print) and see an
                          indicative price before you call.
                        </p>
                        <Link
                          href="/configurator"
                          className="mt-6 inline-flex items-center gap-2 bg-accent px-5 py-3 text-sm font-bold text-accent-foreground"
                        >
                          Open the configurator
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-[0.82rem] font-semibold transition-colors hover:text-accent ${
                    isActive(item.href) ? "text-accent" : "text-foreground/80"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
            <a
              href={company.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="ml-3 inline-flex items-center gap-2 bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground shadow-red transition-transform hover:-translate-y-0.5"
            >
              <Phone className="h-4 w-4" />
              Get a quote
            </a>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="shrink-0 border border-border p-2 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-[73px] z-40 overflow-y-auto bg-background px-6 py-6 lg:hidden">
          <nav className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-4 font-display text-2xl font-extrabold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="eyebrow mt-8 text-muted-foreground">Products</p>
          <div className="mt-3 flex flex-col">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 text-sm font-semibold text-foreground/80"
              >
                {p.name}
              </Link>
            ))}
          </div>
          <p className="eyebrow mt-8 text-muted-foreground">By industry</p>
          <div className="mt-3 flex flex-col">
            {industriesDetail.map((i) => (
              <Link
                key={i.slug}
                href={`/industries/${i.slug}`}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 text-sm font-semibold text-foreground/80"
              >
                {i.name}
              </Link>
            ))}
          </div>
          <Link href="/faq" onClick={() => setOpen(false)} className="mt-6 inline-block text-sm font-bold text-accent">
            FAQs
          </Link>
          <a
            href={company.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="mt-8 flex items-center justify-center gap-2 bg-accent px-6 py-4 font-bold text-accent-foreground"
          >
            <Phone className="h-4 w-4" /> Get a quote on WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
