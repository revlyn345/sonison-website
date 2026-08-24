"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, Send } from "lucide-react";
import { company } from "@/lib/site-data";

type UseCase = "ecom" | "export" | "cold" | "brand" | "sorting" | "slitter";

const useCases: { id: UseCase; label: string; hint: string }[] = [
  { id: "ecom", label: "E-commerce cartons", hint: "3-ply, courier movement" },
  { id: "export", label: "Export / heavy loads", hint: "5-ply, sea freight" },
  { id: "cold", label: "Cold storage / chiller", hint: "2-8°C, condensation" },
  { id: "brand", label: "Branded / printed seal", hint: "Logo on the carton" },
  { id: "sorting", label: "Colour-coded sorting", hint: "Warehouse, 3PL, QC" },
  { id: "slitter", label: "I slit my own tape", hint: "Need mother rolls" },
];

const volumes = [
  { id: "s", label: "Under 500 rolls / month" },
  { id: "m", label: "500 – 5,000 rolls / month" },
  { id: "l", label: "5,000+ rolls / month" },
] as const;

const sealing = [
  { id: "hand", label: "By hand, with a dispenser" },
  { id: "machine", label: "On a carton sealing machine" },
] as const;

type VolumeId = (typeof volumes)[number]["id"];
type SealId = (typeof sealing)[number]["id"];

type Result = {
  product: string;
  slug: string;
  micron: string;
  size: string;
  colour: string;
  adhesive: string;
  moq: string;
  verdict: string;
};

function recommend(use: UseCase, vol: VolumeId, seal: SealId): Result {
  const machineNote =
    seal === "machine"
      ? "Wound for machine use — consistent core tension, no hard starts on the sealer."
      : "Hand rolls with an easy start edge, sized for a standard dispenser.";
  const size = seal === "machine" ? "48mm × 990m (machine roll)" : "48mm × 65m";

  if (use === "slitter") {
    return {
      product: "BOPP Jumbo Rolls",
      slug: "bopp-jumbo-rolls",
      micron: "40–65µ, your call per batch",
      size: "1040mm or 1320mm × 4000m",
      colour: "Clear, tan or to shade",
      adhesive: "Water-based, standard or high-tack",
      moq: vol === "l" ? "Monthly contract, 1000+ rolls" : "1 pallet to start",
      verdict:
        "You need mother rolls, not finished tape. We coat and wind on our own line in Mundka, so gauge stays flat edge to edge — that is what decides your slitting yield.",
    };
  }

  if (use === "export") {
    return {
      product: "BOPP Plain Tape",
      slug: "plain-brown-tape",
      micron: "55–65µ",
      size: seal === "machine" ? "72mm × 990m" : "72mm × 65m",
      colour: "Tan or brown",
      adhesive: "High-tack, UV stabilised",
      moq: vol === "s" ? "2 boxes (144 rolls)" : "10 boxes and up",
      verdict:
        "5-ply cartons on a 30-day sea leg flex and sweat. Go 55–65 micron with a wider web so the seal holds across the flap, not just on the crease. " +
        machineNote,
    };
  }

  if (use === "cold") {
    return {
      product: "BOPP Plain Tape",
      slug: "plain-brown-tape",
      micron: "50–55µ",
      size,
      colour: "Clear or tan",
      adhesive: "Low-temperature grade",
      moq: vol === "s" ? "2 boxes (144 rolls)" : "10 boxes and up",
      verdict:
        "Standard adhesive goes brittle and lifts at chiller temperature. Our low-temp grade is formulated to keep tack down to 2°C, and we ask you to seal the carton before it enters the cold room. " +
        machineNote,
    };
  }

  if (use === "brand") {
    return {
      product: "Custom Printed Tape",
      slug: "printed-tape",
      micron: "45–50µ",
      size,
      colour: "Up to 3 colours on tan or white",
      adhesive: "Standard water-based",
      moq: vol === "s" ? "36 rolls per design" : "150 rolls per design",
      verdict:
        "A printed seal doubles as tamper evidence — a resealed carton never lines the repeat up again. Send artwork as AI or CDR with fonts converted to curves; we set the repeat length and share a proof before the cylinder runs.",
    };
  }

  if (use === "sorting") {
    return {
      product: "Coloured BOPP Tape",
      slug: "coloured-tape",
      micron: "45µ",
      size,
      colour: "Red, blue, green, yellow, black",
      adhesive: "Standard water-based",
      moq: vol === "s" ? "1 box per shade" : "4 boxes per shade",
      verdict:
        "One shade per destination or per QC status and your floor stops reading labels. Mix four colours on one order and one invoice — you don't have to buy a full box of each from us.",
    };
  }

  return {
    product: "BOPP Plain Tape",
    slug: "plain-brown-tape",
    micron: vol === "l" ? "45µ" : "40–45µ",
    size,
    colour: "Clear or tan",
    adhesive: "Standard water-based",
    moq: vol === "s" ? "2 boxes (144 rolls)" : "10 boxes and up",
    verdict:
      "Courier cartons take abrasion, not weight. 40–45 micron with clean release is the sweet spot — thicker tape here is money spent on the roll, not on the seal. " +
      machineNote,
  };
}

export function TapeFinder() {
  const [use, setUse] = useState<UseCase | null>(null);
  const [vol, setVol] = useState<VolumeId | null>(null);
  const [seal, setSeal] = useState<SealId | null>(null);

  const answered = [use, vol, seal].filter(Boolean).length;
  const result = useMemo(
    () => (use && vol && seal ? recommend(use, vol, seal) : null),
    [use, vol, seal],
  );

  const waLink = result
    ? `${company.whatsapp}?text=${encodeURIComponent(
        `Hello Sonison Packaging, the tape finder suggested this for me:\n` +
          `Product: ${result.product}\n` +
          `Micron: ${result.micron}\n` +
          `Size: ${result.size}\n` +
          `Colour: ${result.colour}\n` +
          `Adhesive: ${result.adhesive}\n` +
          `Volume: ${volumes.find((v) => v.id === vol)?.label}\n` +
          `Please confirm price and availability.`,
      )}`
    : company.whatsapp;

  const chip = (active: boolean) =>
    `border px-4 py-3 text-left text-sm transition-colors ${
      active
        ? "border-accent bg-accent text-accent-foreground"
        : "border-border bg-background hover:border-accent/60"
    }`;

  return (
    <div className="grid gap-px border border-border bg-border text-foreground lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
      <div className="space-y-8 bg-background p-7 md:p-9">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent">01</span>
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
              What are you sealing?
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {useCases.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => setUse(u.id)}
                className={chip(use === u.id)}
              >
                <span className="block font-bold">{u.label}</span>
                <span
                  className={`mt-0.5 block text-xs ${use === u.id ? "text-accent-foreground/80" : "text-muted-foreground"}`}
                >
                  {u.hint}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent">02</span>
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
              Roughly how much do you use?
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {volumes.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVol(v.id)}
                className={chip(vol === v.id)}
              >
                <span className="font-bold">{v.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent">03</span>
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
              How is the carton sealed?
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {sealing.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSeal(s.id)}
                className={chip(seal === s.id)}
              >
                <span className="font-bold">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 border-t border-border pt-5">
          <div className="h-1 flex-1 bg-border">
            <div
              className="h-full bg-accent transition-all duration-500"
              style={{ width: `${(answered / 3) * 100}%` }}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setUse(null);
              setVol(null);
              setSeal(null);
            }}
            className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground hover:text-accent"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        </div>
      </div>

      <div className="bg-surface p-7 md:p-9">
        {!result ? (
          <div className="flex h-full min-h-[18rem] flex-col justify-center">
            <p className="eyebrow text-accent">Your recommendation</p>
            <p className="mt-4 max-w-sm text-lg leading-relaxed text-muted-foreground">
              Answer the three questions and we&apos;ll name the exact grade, gauge and roll size
              we&apos;d put on your cartons, and the minimum order to start with.
            </p>
          </div>
        ) : (
          <div>
            <p className="eyebrow text-accent">We&apos;d send you</p>
            <h3 className="mt-3 text-3xl leading-tight">{result.product}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{result.verdict}</p>
            <dl className="mt-6 grid gap-px bg-border sm:grid-cols-2">
              {[
                ["Micron", result.micron],
                ["Roll size", result.size],
                ["Colour", result.colour],
                ["Adhesive", result.adhesive],
                ["Start with", result.moq],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className={`bg-surface px-4 py-3 ${k === "Start with" ? "sm:col-span-2" : ""}`}
                >
                  <dt className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="mt-1 text-sm font-bold">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-accent px-6 py-3 font-bold text-accent-foreground shadow-red transition-transform hover:-translate-y-0.5"
              >
                <Send className="h-4 w-4" /> Quote me this spec
              </a>
              <Link
                href={`/products/${result.slug}`}
                className="inline-flex items-center gap-2 border border-border px-6 py-3 font-bold transition-colors hover:border-accent"
              >
                Full details <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
