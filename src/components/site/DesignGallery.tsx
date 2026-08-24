"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Carousel } from "@/components/site/Carousel";
import { TapeArt, baseHex, type LayoutId } from "@/components/site/TapeDesignStudio";
import { tapeColours, type ColourId } from "@/lib/catalog";
import { company } from "@/lib/site-data";

type Design = {
  name: string;
  who: string;
  brand: string;
  base: ColourId;
  ink: string;
  layout: LayoutId;
  spec: string;
  tag: string;
};

const designs: Design[] = [
  {
    name: "Midnight gold",
    tag: "Retail & D2C",
    who: "Apparel & beauty D2C",
    brand: "MAISON",
    base: "black",
    ink: "#D8A441",
    layout: "logo-strip",
    spec: "48mm · 65m · 45 micron · 2 colour",
  },
  {
    name: "Courier brown",
    tag: "E-commerce",
    who: "Marketplace fulfilment",
    brand: "SHIPFAST",
    base: "tan",
    ink: "#141821",
    layout: "repeat",
    spec: "48mm · 100m · 45 micron · 1 colour",
  },
  {
    name: "Fragile red",
    tag: "Fragile goods",
    who: "Glass, ceramics, LED",
    brand: "FRAGILE",
    base: "red",
    ink: "#FFFFFF",
    layout: "fragile",
    spec: "72mm · 65m · 50 micron · 2 colour",
  },
  {
    name: "Sealed navy",
    tag: "Security",
    who: "High-value electronics",
    brand: "SEALED",
    base: "blue",
    ink: "#FFFFFF",
    layout: "tamper",
    spec: "48mm · 65m · 50 micron · 2 colour",
  },
  {
    name: "Cold chain green",
    tag: "Pharma",
    who: "Pharma & vaccine boxes",
    brand: "2-8°C",
    base: "green",
    ink: "#FFFFFF",
    layout: "arrows",
    spec: "48mm · 65m · 45 micron · 1 colour",
  },
  {
    name: "Sorting yellow",
    tag: "Warehouse",
    who: "3PL & QC floors",
    brand: "ZONE B",
    base: "yellow",
    ink: "#141821",
    layout: "repeat",
    spec: "60mm · 65m · 42 micron · 1 colour",
  },
  {
    name: "Export white",
    tag: "Export",
    who: "Container & LCL loads",
    brand: "SIDE UP",
    base: "white",
    ink: "#0E3F6B",
    layout: "arrows",
    spec: "72mm · 65m · 50 micron · 1 colour",
  },
  {
    name: "Clear seam",
    tag: "E-commerce",
    who: "Printed carton, no cover-up",
    brand: "SONISON",
    base: "clear",
    ink: "#141821",
    layout: "logo-strip",
    spec: "48mm · 100m · 40 micron · 1 colour",
  },
  {
    name: "Handle with care",
    tag: "Fragile goods",
    who: "Furniture & appliance dispatch",
    brand: "CARE",
    base: "white",
    ink: "#C0392B",
    layout: "fragile",
    spec: "72mm · 65m · 50 micron · 1 colour",
  },
  {
    name: "Do not stack",
    tag: "Warehouse",
    who: "Palletised FMCG loads",
    brand: "NO STACK",
    base: "yellow",
    ink: "#141821",
    layout: "arrows",
    spec: "60mm · 65m · 45 micron · 1 colour",
  },
  {
    name: "Festive kraft",
    tag: "Retail & D2C",
    who: "Gifting & seasonal hampers",
    brand: "WITH LOVE",
    base: "tan",
    ink: "#8E2B36",
    layout: "logo-strip",
    spec: "48mm · 50m · 42 micron · 2 colour",
  },
  {
    name: "Security check",
    tag: "Security",
    who: "High-value cash & jewellery",
    brand: "SECURED",
    base: "black",
    ink: "#E4E7EC",
    layout: "tamper",
    spec: "48mm · 65m · 55 micron · 2 colour",
  },
  {
    name: "Food grade blue",
    tag: "Pharma",
    who: "Dairy, frozen & QSR supply",
    brand: "FOOD SAFE",
    base: "blue",
    ink: "#FFFFFF",
    layout: "repeat",
    spec: "48mm · 65m · 45 micron · 1 colour",
  },
  {
    name: "Recycle green",
    tag: "Retail & D2C",
    who: "Sustainable D2C brands",
    brand: "RECYCLE",
    base: "green",
    ink: "#EAF7EE",
    layout: "logo-strip",
    spec: "48mm · 65m · 42 micron · 1 colour",
  },
  {
    name: "Signal orange",
    tag: "Industrial",
    who: "Industrial spares & auto parts",
    brand: "PART NO.",
    base: "red",
    ink: "#FFE9B0",
    layout: "repeat",
    spec: "60mm · 100m · 50 micron · 2 colour",
  },
  {
    name: "Return label clear",
    tag: "E-commerce",
    who: "Reverse logistics & repairs",
    brand: "RETURNS",
    base: "clear",
    ink: "#0E3F6B",
    layout: "tamper",
    spec: "48mm · 65m · 45 micron · 1 colour",
  },
];

function waLink(d: Design) {
  return `${company.whatsapp}?text=${encodeURIComponent(
    `Hello Sonison Packaging, I like the "${d.name}" design from your gallery.\n` +
      `Base shade: ${tapeColours.find((c) => c.id === d.base)?.name}\n` +
      `Wordmark: ${d.brand}\n` +
      `Suggested spec: ${d.spec}\n` +
      `Please share price, MOQ and a proof.`,
  )}`;
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function DesignCard({ d }: { d: Design }) {
  return (
    <article className="group flex h-full flex-col border border-border bg-card transition-colors hover:border-accent">
      <div className="relative overflow-hidden bg-[#C49A67]">
        <svg viewBox="0 0 1040 300" className="block w-full">
          <defs>
            <linearGradient id={`sheen-${slug(d.name)}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
              <stop offset="35%" stopColor="#fff" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.25" />
            </linearGradient>
          </defs>
          <rect x={0} y={0} width={1040} height={300} fill="#C49A67" />
          {Array.from({ length: 26 }).map((_, i) => (
            <rect
              key={i}
              x={i * 40}
              y={0}
              width={2}
              height={300}
              fill="#8E6C42"
              opacity={0.13}
            />
          ))}
          <rect x={0} y={148} width={1040} height={4} fill="#8E6C42" opacity={0.8} />
          <g transform="translate(0 95)">
            <TapeArt
              base={baseHex[d.base]}
              ink={d.ink}
              brand={d.brand}
              layout={d.layout}
            />
            <rect
              x={0}
              y={0}
              width={1040}
              height={110}
              fill={`url(#sheen-${slug(d.name)})`}
              opacity={0.35}
            />
          </g>
        </svg>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold">{d.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{d.who}</p>
        <p className="mt-4 font-mono text-xs text-accent">{d.spec}</p>
        <a
          href={waLink(d)}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center justify-center gap-2 border border-border px-4 py-3 text-sm font-bold transition-colors group-hover:bg-accent group-hover:text-accent-foreground"
        >
          Quote this design <Send className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

export function DesignGalleryCarousel() {
  return (
    <Carousel label="Tape design gallery" slideClass="w-[86%] sm:w-[58%] lg:w-[38%]">
      {designs.map((d) => (
        <DesignCard key={d.name} d={d} />
      ))}
    </Carousel>
  );
}

const tags = ["All", ...Array.from(new Set(designs.map((d) => d.tag)))];

function TapePreview({ d, height = 300 }: { d: Design; height?: number }) {
  return (
    <svg viewBox="0 0 1040 300" className="block w-full" style={{ height }}>
      <defs>
        <linearGradient id={`spot-${slug(d.name)}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="35%" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={1040} height={300} fill="#C49A67" />
      {Array.from({ length: 26 }).map((_, i) => (
        <rect key={i} x={i * 40} y={0} width={2} height={300} fill="#8E6C42" opacity={0.13} />
      ))}
      <rect x={0} y={148} width={1040} height={4} fill="#8E6C42" opacity={0.8} />
      <g transform="translate(0 95)">
        <TapeArt base={baseHex[d.base]} ink={d.ink} brand={d.brand} layout={d.layout} />
        <rect x={0} y={0} width={1040} height={110} fill={`url(#spot-${slug(d.name)})`} opacity={0.35} />
      </g>
    </svg>
  );
}

export function DesignGalleryShowcase() {
  const [tag, setTag] = useState("All");
  const list = tag === "All" ? designs : designs.filter((d) => d.tag === tag);
  const [activeName, setActiveName] = useState(designs[0]!.name);
  const active = list.find((d) => d.name === activeName) ?? list[0] ?? designs[0]!;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTag(t)}
            className={`border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
              t === tag
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card text-muted-foreground hover:border-accent hover:text-foreground"
            }`}
          >
            {t}
            <span className="ml-2 opacity-60">
              {t === "All" ? designs.length : designs.filter((d) => d.tag === t).length}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_1fr]">
        <div className="border border-border bg-card">
          <div className="overflow-hidden border-b border-border">
            <TapePreview d={active} />
          </div>
          <div className="flex flex-wrap items-end justify-between gap-6 p-6 md:p-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-accent">{active.tag}</p>
              <h3 className="mt-2 text-2xl font-bold md:text-3xl">{active.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{active.who}</p>
              <p className="mt-4 font-mono text-xs text-accent">{active.spec}</p>
            </div>
            <a
              href={waLink(active)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-bold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Quote this design <Send className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid max-h-[560px] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3 lg:grid-cols-2">
          {list.map((d) => {
            const on = d.name === active.name;
            return (
              <button
                key={d.name}
                type="button"
                onClick={() => setActiveName(d.name)}
                aria-pressed={on}
                className={`group border text-left transition-colors ${
                  on ? "border-accent" : "border-border hover:border-accent"
                }`}
              >
                <div className="overflow-hidden">
                  <TapePreview d={d} height={78} />
                </div>
                <div className="bg-card px-3 py-2">
                  <div className="truncate text-xs font-bold">{d.name}</div>
                  <div className="truncate font-mono text-[10px] text-muted-foreground">
                    {d.tag}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ShadeCarousel() {
  return (
    <Carousel
      label="Stock tape shades"
      slideClass="w-[46%] sm:w-[30%] lg:w-[19%]"
    >
      {tapeColours.map((c) => (
        <div key={c.id} className="h-full border border-border bg-card p-5">
          <div
            className="h-24 w-full border border-border"
            style={{ background: c.swatch }}
            aria-hidden
          />
          <div className="mt-4 text-sm font-bold">{c.name}</div>
          <div className="mt-1 font-mono text-xs text-muted-foreground">
            {c.premium === 0 ? "Base price" : `+${Math.round(c.premium * 100)}% on base`}
          </div>
        </div>
      ))}
    </Carousel>
  );
}
