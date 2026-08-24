"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Send, Sparkles } from "lucide-react";
import { tapeColours, type ColourId } from "@/lib/catalog";
import { company } from "@/lib/site-data";

export type LayoutId = "repeat" | "logo-strip" | "fragile" | "tamper" | "arrows";

const layouts: { id: LayoutId; name: string; note: string; inks: number }[] = [
  {
    id: "repeat",
    name: "Repeat wordmark",
    note: "Brand name every 220mm — the workhorse of D2C cartons",
    inks: 1,
  },
  {
    id: "logo-strip",
    name: "Wordmark + rules",
    note: "Name between two ink rules, reads clean at courier speed",
    inks: 2,
  },
  {
    id: "fragile",
    name: "Fragile / handle",
    note: "Warning caps with hazard blocks for glass and electronics",
    inks: 2,
  },
  {
    id: "tamper",
    name: "Tamper evident",
    note: "SEALED / DO NOT ACCEPT IF TORN — kills pilferage claims",
    inks: 2,
  },
  {
    id: "arrows",
    name: "Directional",
    note: "This side up arrows for stacked and palletised loads",
    inks: 1,
  },
];

const inkColours = [
  { id: "white", name: "White", hex: "#FFFFFF" },
  { id: "black", name: "Black", hex: "#141821" },
  { id: "red", name: "Red", hex: "#ED1C24" },
  { id: "navy", name: "Navy", hex: "#0E3F6B" },
  { id: "gold", name: "Gold", hex: "#D8A441" },
] as const;

export const baseHex: Record<ColourId, string> = {
  clear: "#E7E3D8",
  tan: "#C08B4B",
  white: "#F5F5F2",
  red: "#D32027",
  blue: "#1F4E9C",
  green: "#1E8A55",
  yellow: "#EFC131",
  black: "#20242C",
};

const presets: {
  name: string;
  brand: string;
  base: ColourId;
  ink: string;
  layout: LayoutId;
  who: string;
}[] = [
  {
    name: "D2C unboxing",
    brand: "MAISON CO.",
    base: "black",
    ink: "#D8A441",
    layout: "logo-strip",
    who: "Apparel and beauty brands",
  },
  {
    name: "Courier standard",
    brand: "SHIPFAST",
    base: "tan",
    ink: "#141821",
    layout: "repeat",
    who: "E-commerce fulfilment",
  },
  {
    name: "Glassware",
    brand: "FRAGILE",
    base: "red",
    ink: "#FFFFFF",
    layout: "fragile",
    who: "Glass, ceramics, LED",
  },
  {
    name: "Anti-pilferage",
    brand: "SEALED",
    base: "blue",
    ink: "#FFFFFF",
    layout: "tamper",
    who: "High-value electronics",
  },
  {
    name: "Pharma cold-chain",
    brand: "2-8°C",
    base: "green",
    ink: "#FFFFFF",
    layout: "arrows",
    who: "Pharma and vaccine boxes",
  },
  {
    name: "Warehouse sorting",
    brand: "ZONE B",
    base: "yellow",
    ink: "#141821",
    layout: "repeat",
    who: "3PL and QC floors",
  },
];

function isDark(hex: string) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 140;
}

export function TapeArt({
  base,
  ink,
  brand,
  layout,
}: {
  base: string;
  ink: string;
  brand: string;
  layout: LayoutId;
}) {
  const text = (brand || "YOUR BRAND").toUpperCase().slice(0, 18);
  const unit = 260;
  const repeats = [0, 1, 2, 3];

  return (
    <>
      <rect x={0} y={0} width={1040} height={110} fill={base} />
      {layout === "fragile" &&
        repeats.map((i) => (
          <g key={i} transform={`translate(${i * unit} 0)`}>
            <rect x={6} y={8} width={26} height={94} fill={ink} opacity={0.85} />
            <text x={48} y={64} fill={ink} fontSize={34} fontWeight={800} letterSpacing={2} fontFamily="Archivo, sans-serif">
              {text}
            </text>
            <text x={48} y={90} fill={ink} fontSize={15} letterSpacing={4} fontFamily="monospace" opacity={0.9}>
              HANDLE WITH CARE
            </text>
          </g>
        ))}

      {layout === "tamper" &&
        repeats.map((i) => (
          <g key={i} transform={`translate(${i * unit} 0)`}>
            <text x={16} y={48} fill={ink} fontSize={30} fontWeight={800} letterSpacing={3} fontFamily="Archivo, sans-serif">
              {text}
            </text>
            <text x={16} y={82} fill={ink} fontSize={13} letterSpacing={3} fontFamily="monospace" opacity={0.9}>
              DO NOT ACCEPT IF TORN
            </text>
            <rect x={16} y={92} width={200} height={4} fill={ink} opacity={0.7} />
          </g>
        ))}

      {layout === "repeat" &&
        repeats.map((i) => (
          <text
            key={i}
            x={i * unit + 22}
            y={70}
            fill={ink}
            fontSize={40}
            fontWeight={800}
            letterSpacing={4}
            fontFamily="Archivo, sans-serif"
          >
            {text}
          </text>
        ))}

      {layout === "logo-strip" && (
        <>
          <rect x={0} y={12} width={1040} height={5} fill={ink} opacity={0.8} />
          <rect x={0} y={93} width={1040} height={5} fill={ink} opacity={0.8} />
          {repeats.map((i) => (
            <g key={i} transform={`translate(${i * unit} 0)`}>
              <text x={26} y={68} fill={ink} fontSize={36} fontWeight={800} letterSpacing={6} fontFamily="Archivo, sans-serif">
                {text}
              </text>
            </g>
          ))}
        </>
      )}

      {layout === "arrows" &&
        repeats.map((i) => (
          <g key={i} transform={`translate(${i * unit} 0)`}>
            <polygon points="20,80 44,30 68,80 56,80 56,96 32,96 32,80" fill={ink} />
            <text x={86} y={70} fill={ink} fontSize={30} fontWeight={800} letterSpacing={3} fontFamily="Archivo, sans-serif">
              {text}
            </text>
          </g>
        ))}
    </>
  );
}

export function TapeDesignStudio() {
  const [base, setBase] = useState<ColourId>("black");
  const [ink, setInk] = useState<string>("#D8A441");
  const [brand, setBrand] = useState("MAISON CO.");
  const [layout, setLayout] = useState<LayoutId>("logo-strip");
  const [printed, setPrinted] = useState(true);

  const baseColour = baseHex[base];
  const layoutMeta = layouts.find((l) => l.id === layout)!;
  const inks = printed ? layoutMeta.inks : 0;

  const message = useMemo(
    () =>
      `${company.whatsapp}?text=${encodeURIComponent(
        `Hello Sonison Packaging, I designed a tape on your website:\n` +
          `Tape colour: ${tapeColours.find((c) => c.id === base)?.name}\n` +
          (printed
            ? `Print: ${layoutMeta.name}, ${inks} colour${inks > 1 ? "s" : ""}\n` +
              `Wordmark: ${brand || "to be shared"}\n` +
              `Ink colour: ${inkColours.find((i) => i.hex === ink)?.name ?? ink}\n`
            : `Print: plain, no printing\n`) +
          `Please share price, MOQ and a proof.`,
      )}`,
    [base, printed, layoutMeta, inks, brand, ink],
  );

  const swatchBtn = (active: boolean) =>
    `h-10 w-10 border-2 transition-transform ${active ? "border-accent scale-110" : "border-border hover:scale-105"}`;

  return (
    <div className="grid gap-px border border-border bg-border text-foreground lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      {/* Preview */}
      <div className="bg-surface p-7 md:p-9">
        <p className="eyebrow text-accent">Live mock-up</p>

        <div className="mt-6 overflow-hidden border border-border bg-[#C9A574]">
          <svg viewBox="0 0 1040 560" className="block w-full">
            <defs>
              <linearGradient id="cartonShade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#000" stopOpacity="0.22" />
              </linearGradient>
              <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
                <stop offset="35%" stopColor="#fff" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#000" stopOpacity="0.25" />
              </linearGradient>
            </defs>
            <rect x={0} y={0} width={1040} height={560} fill="#C49A67" />
            <rect x={0} y={0} width={1040} height={560} fill="url(#cartonShade)" />
            <rect x={0} y={278} width={1040} height={4} fill="#8E6C42" opacity={0.8} />
            {Array.from({ length: 26 }).map((_, i) => (
              <rect key={i} x={i * 40} y={0} width={2} height={560} fill="#8E6C42" opacity={0.13} />
            ))}
            <g transform="translate(0 225)">
              {printed ? (
                <TapeArt base={baseColour} ink={ink} brand={brand} layout={layout} />
              ) : (
                <rect x={0} y={0} width={1040} height={110} fill={baseColour} />
              )}
              <rect x={0} y={0} width={1040} height={110} fill="url(#sheen)" opacity={0.35} />
              <rect x={0} y={0} width={1040} height={3} fill="#000" opacity={0.15} />
              <rect x={0} y={107} width={1040} height={3} fill="#000" opacity={0.15} />
            </g>
          </svg>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Indicative only, screen colours shift. We print a physical proof roll before the main
          run, and match shades against your Pantone reference.
        </p>

        <div className="mt-7">
          <span className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
            Start from a design we already run
          </span>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {presets.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => {
                  setBase(p.base);
                  setInk(p.ink);
                  setBrand(p.brand);
                  setLayout(p.layout);
                  setPrinted(true);
                }}
                className="group flex items-center gap-3 border border-border bg-background p-2.5 text-left transition-colors hover:border-accent"
              >
                <span
                  className="flex h-9 w-16 shrink-0 items-center justify-center border border-border"
                  style={{ background: baseHex[p.base] }}
                >
                  <span className="font-display text-[0.55rem] font-extrabold tracking-widest" style={{ color: p.ink }}>
                    {p.brand.slice(0, 8)}
                  </span>
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold">{p.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">{p.who}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-7 bg-background p-7 md:p-9">
        <div>
          <span className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
            Tape colour
          </span>
          <div className="mt-3 flex flex-wrap gap-2">
            {tapeColours.map((c) => (
              <button
                key={c.id}
                type="button"
                title={c.name}
                aria-label={c.name}
                onClick={() => setBase(c.id)}
                className={swatchBtn(base === c.id)}
                style={{ background: baseHex[c.id] }}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {tapeColours.find((c) => c.id === base)?.name}, mixed shades ship on one invoice, no
            full box per colour.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { v: false, l: "Plain, no print" },
            { v: true, l: "Printed" },
          ].map((o) => (
            <button
              key={o.l}
              type="button"
              onClick={() => setPrinted(o.v)}
              className={`border px-4 py-2.5 text-sm font-bold transition-colors ${
                printed === o.v
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border hover:border-accent/60"
              }`}
            >
              {o.l}
            </button>
          ))}
        </div>

        {printed && (
          <>
            <div>
              <span className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
                Your wordmark
              </span>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value.slice(0, 18))}
                placeholder="YOUR BRAND"
                aria-label="Wordmark on the tape"
                className="mt-3 w-full border border-border bg-surface px-4 py-3 uppercase tracking-widest outline-none focus:border-accent"
              />
            </div>

            <div>
              <span className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
                Print layout
              </span>
              <div className="mt-3 grid gap-2">
                {layouts.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setLayout(l.id)}
                    className={`border px-4 py-3 text-left transition-colors ${
                      layout === l.id
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border hover:border-accent/60"
                    }`}
                  >
                    <span className="block text-sm font-bold">{l.name}</span>
                    <span
                      className={`mt-0.5 block text-xs ${layout === l.id ? "text-accent-foreground/80" : "text-muted-foreground"}`}
                    >
                      {l.note}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
                Ink colour
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {inkColours.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    title={c.name}
                    aria-label={`${c.name} ink`}
                    onClick={() => setInk(c.hex)}
                    className={swatchBtn(ink === c.hex)}
                    style={{ background: c.hex }}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        <div className="grid gap-px bg-border sm:grid-cols-3">
          {[
            ["Print colours", printed ? `${inks}` : "0"],
            ["MOQ per design", printed ? "36 rolls" : "1 box"],
            ["Proof to dispatch", printed ? "5–7 days" : "2–3 days"],
          ].map(([k, v]) => (
            <div key={k} className="bg-background px-4 py-3">
              <div className="font-mono text-[0.58rem] uppercase tracking-widest text-muted-foreground">{k}</div>
              <div className="mt-1 text-sm font-bold">{v}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={message}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-accent px-6 py-3 font-bold text-accent-foreground shadow-red transition-transform hover:-translate-y-0.5"
          >
            <Send className="h-4 w-4" /> Send this design for a quote
          </a>
          <Link
            href={`/products/${printed ? "printed-tape" : "coloured-tape"}`}
            className="inline-flex items-center gap-2 border border-border px-6 py-3 font-bold transition-colors hover:border-accent"
          >
            {printed ? "Printed tape details" : "Coloured tape details"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
          Artwork in AI or CDR with fonts converted to curves. No artwork yet? Send a logo and
          we&apos;ll lay out the repeat for you, no design charge on orders above 150 rolls.
          {isDark(baseColour) && ink === "#141821"
            ? " Heads up: black ink on a dark tape reads poorly — try white or gold."
            : ""}
        </p>
      </div>
    </div>
  );
}
