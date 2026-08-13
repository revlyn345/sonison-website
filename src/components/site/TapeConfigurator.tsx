"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ArrowRight, RotateCcw, Send } from "lucide-react";
import { z } from "zod";
import {
  adhesiveGrades,
  estimateQuote,
  inr,
  micronGrades,
  tapeColours,
  tapeLengths,
  tapeWidths,
  type AdhesiveId,
  type ColourId,
} from "@/lib/catalog";
import { company } from "@/lib/site-data";

const textSchema = z.string().trim().max(80);

const printOptions = [0, 1, 2, 3] as const;

const rollSteps = [50, 200, 500, 1000, 2500, 5000, 10000, 20000];

export function TapeConfigurator({ compact = false }: { compact?: boolean }) {
  const [width, setWidth] = useState(48);
  const [length, setLength] = useState(65);
  const [micron, setMicron] = useState(45);
  const [colour, setColour] = useState<ColourId>("tan");
  const [adhesive, setAdhesive] = useState<AdhesiveId>("standard");
  const [printColours, setPrintColours] = useState<0 | 1 | 2 | 3>(0);
  const [rollIdx, setRollIdx] = useState(3);
  const [buyer, setBuyer] = useState("");

  const rolls = rollSteps[rollIdx] ?? 1000;

  const quote = useMemo(
    () => estimateQuote({ width, length, micron, colour, adhesive, printColours, rolls }),
    [width, length, micron, colour, adhesive, printColours, rolls],
  );

  const grade = micronGrades.find((m) => m.micron === micron);
  const swatch = tapeColours.find((c) => c.id === colour)!;

  const reset = () => {
    setWidth(48);
    setLength(65);
    setMicron(45);
    setColour("tan");
    setAdhesive("standard");
    setPrintColours(0);
    setRollIdx(3);
    setBuyer("");
  };

  const message = useMemo(() => {
    const who = textSchema.safeParse(buyer);
    const name = who.success && who.data ? `\nBuyer: ${who.data}` : "";
    return encodeURIComponent(
      `Hello Sonison Packaging, I would like a quote.\n` +
        `Product: ${printColours > 0 ? `${printColours}-colour printed` : swatch.name} BOPP tape\n` +
        `Size: ${width}mm x ${length}m, ${micron} micron\n` +
        `Adhesive: ${adhesiveGrades.find((a) => a.id === adhesive)!.name}\n` +
        `Quantity: ${rolls.toLocaleString("en-IN")} rolls (~${quote.boxes} boxes)` +
        name,
    );
  }, [buyer, printColours, swatch.name, width, length, micron, adhesive, rolls, quote.boxes]);

  return (
    <div className="grid gap-px border border-border bg-border text-foreground lg:grid-cols-[1.15fr_1fr]">
      {/* Controls */}
      <div className="bg-background p-6 md:p-9">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
          <div className="min-w-0">
            <p className="eyebrow text-accent">Spec builder</p>
            <h3 className="mt-3 text-2xl md:text-3xl">Build your roll</h3>
          </div>
          <button
            onClick={reset}
            className="inline-flex shrink-0 items-center gap-2 border border-border px-3 py-2 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        </div>

        <Field label="Width" hint={`${width} mm`}>
          <div className="flex flex-wrap gap-2">
            {tapeWidths.map((w) => (
              <Chip key={w} active={w === width} onClick={() => setWidth(w)}>
                {w}
              </Chip>
            ))}
          </div>
        </Field>

        <Field label="Length" hint={`${length} metres`}>
          <div className="flex flex-wrap gap-2">
            {tapeLengths.map((l) => (
              <Chip key={l} active={l === length} onClick={() => setLength(l)}>
                {l}m
              </Chip>
            ))}
          </div>
        </Field>

        <Field label="Thickness" hint={grade ? grade.use : ""}>
          <div className="flex flex-wrap gap-2">
            {micronGrades.map((m) => (
              <Chip key={m.micron} active={m.micron === micron} onClick={() => setMicron(m.micron)}>
                {m.micron}µ
              </Chip>
            ))}
          </div>
          {grade && (
            <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
              Peel {grade.adhesion} · Tensile {grade.tensile}
            </p>
          )}
        </Field>

        <Field label="Colour" hint={swatch.name}>
          <div className="flex flex-wrap gap-2">
            {tapeColours.map((c) => (
              <button
                key={c.id}
                onClick={() => setColour(c.id)}
                aria-label={c.name}
                aria-pressed={c.id === colour}
                className={`h-9 w-9 border-2 transition-transform hover:-translate-y-0.5 ${
                  c.id === colour ? "border-accent" : "border-border"
                }`}
                style={{ backgroundColor: c.swatch }}
              />
            ))}
          </div>
        </Field>

        <Field label="Adhesive grade">
          <div className="grid gap-2 sm:grid-cols-3">
            {adhesiveGrades.map((a) => (
              <button
                key={a.id}
                onClick={() => setAdhesive(a.id)}
                className={`border p-3 text-left transition-colors ${
                  a.id === adhesive ? "border-accent bg-surface" : "border-border hover:bg-surface"
                }`}
              >
                <span className="block text-sm font-bold">{a.name}</span>
                <span className="mt-1 block text-xs leading-snug text-muted-foreground">{a.note}</span>
              </button>
            ))}
          </div>
        </Field>

        <Field label="Printing" hint={printColours === 0 ? "Unprinted" : `${printColours} colour rotogravure`}>
          <div className="flex flex-wrap gap-2">
            {printOptions.map((p) => (
              <Chip key={p} active={p === printColours} onClick={() => setPrintColours(p)}>
                {p === 0 ? "None" : `${p} colour`}
              </Chip>
            ))}
          </div>
        </Field>

        <Field label="Quantity" hint={`${rolls.toLocaleString("en-IN")} rolls · ${quote.tier}`}>
          <input
            type="range"
            min={0}
            max={rollSteps.length - 1}
            step={1}
            value={rollIdx}
            onChange={(e) => setRollIdx(Number(e.target.value))}
            aria-label="Quantity in rolls"
            className="w-full accent-[var(--accent)]"
          />
        </Field>
      </div>

      {/* Preview + estimate */}
      <div className="ink-panel relative overflow-hidden p-6 md:p-9">
        <div className="grid-lines absolute inset-0 opacity-25" aria-hidden />
        <div className="relative">
          <p className="eyebrow text-accent">Live preview</p>

          <div className="mt-6 flex items-center justify-center py-4">
            <RollPreview colour={swatch.swatch} width={width} printColours={printColours} />
          </div>

          <dl className="mt-6 divide-y divide-ink-border/70 border-y border-ink-border/70">
            <Row label="Specification" value={`${width}mm × ${length}m · ${micron}µ`} />
            <Row label="Film per roll" value={`${quote.kgPerRoll.toFixed(3)} kg`} />
            <Row label="Packing" value={`${quote.rollsPerBox} rolls/box · ${quote.boxes} boxes`} />
            <Row label="Lead time" value={quote.leadTimeDays} />
            <Row label="Indicative per roll" value={inr(quote.pricePerRoll)} strong />
            {quote.cylinderCost > 0 && <Row label="Cylinders (one time)" value={inr(quote.cylinderCost)} />}
            <Row label="Indicative order value" value={inr(quote.total)} strong />
          </dl>

          <p className="mt-4 font-mono text-[0.62rem] leading-relaxed uppercase tracking-widest text-ink-muted">
            Indicative only, confirmed against current film rates on enquiry.
          </p>

          {!compact && (
            <input
              value={buyer}
              maxLength={80}
              onChange={(e) => setBuyer(e.target.value)}
              placeholder="Your company (optional)"
              className="mt-5 w-full border border-ink-border bg-[oklch(0.13_0.035_254/0.6)] px-4 py-3 text-sm text-ink-foreground placeholder:text-ink-muted focus:border-accent focus:outline-none"
            />
          )}

          <a
            href={`${company.whatsapp}?text=${message}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center gap-3 bg-accent px-6 py-4 font-bold text-accent-foreground shadow-red transition-transform hover:-translate-y-0.5"
          >
            <Send className="h-4 w-4" />
            Send this spec for a firm price
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="mt-8 border-t border-border pt-6 first:border-0">
      <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3">
        <span className="eyebrow text-foreground">{label}</span>
        {hint && <span className="min-w-0 truncate text-right text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`min-w-[3.25rem] border px-3 py-2 font-mono text-xs transition-colors ${
        active
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border text-foreground/75 hover:border-accent hover:text-accent"
      }`}
    >
      {children}
    </button>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3">
      <dt className="min-w-0 font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">{label}</dt>
      <dd className={strong ? "font-display text-lg font-extrabold text-ink-foreground" : "text-sm text-ink-foreground"}>
        {value}
      </dd>
    </div>
  );
}

function RollPreview({ colour, width, printColours }: { colour: string; width: number; printColours: number }) {
  // Roll face width scales with tape width (12mm..96mm -> 26..120px)
  const w = 26 + ((width - 12) / 84) * 94;
  return (
    <svg viewBox="0 0 260 190" className="h-44 w-full max-w-[320px]" role="img" aria-label={`Preview of a ${width}mm tape roll`}>
      <defs>
        <linearGradient id="cfg-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(1 0 0 / 0.35)" />
          <stop offset="45%" stopColor="oklch(1 0 0 / 0)" />
          <stop offset="100%" stopColor="oklch(0 0 0 / 0.35)" />
        </linearGradient>
      </defs>
      <ellipse cx="130" cy="168" rx="96" ry="12" fill="oklch(0 0 0 / 0.35)" />
      <g transform={`translate(${130 - w / 2}, 40)`}>
        {/* barrel */}
        <rect x="0" y="0" width={w} height="110" fill={colour} />
        <rect x="0" y="0" width={w} height="110" fill="url(#cfg-body)" />
        {printColours > 0 &&
          Array.from({ length: 4 }).map((_, i) => (
            <rect
              key={i}
              x="0"
              y={12 + i * 26}
              width={w}
              height={printColours >= 2 ? 7 : 5}
              fill={
                printColours >= 3 && i % 3 === 2
                  ? "oklch(0.85 0.17 96)"
                  : printColours >= 2 && i % 2 === 1
                    ? "oklch(0.97 0.005 250)"
                    : "oklch(0.185 0.045 254)"
              }
              opacity="0.9"
            />
          ))}
        {/* core */}
        <ellipse cx={w} cy="55" rx="16" ry="55" fill={colour} />
        <ellipse cx={w} cy="55" rx="16" ry="55" fill="oklch(1 0 0 / 0.12)" />
        <ellipse cx={w} cy="55" rx="7" ry="24" fill="oklch(0.72 0.075 68)" />
        <ellipse cx="0" cy="55" rx="16" ry="55" fill="oklch(0 0 0 / 0.28)" />
      </g>
      <text x="130" y="186" textAnchor="middle" className="font-mono" fontSize="10" letterSpacing="3" fill="oklch(0.72 0.025 250)">
        {width}MM
      </text>
    </svg>
  );
}
