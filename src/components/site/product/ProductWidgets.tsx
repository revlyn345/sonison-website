"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Boxes,
  Calculator,
  Check,
  Lightbulb,
  MapPin,
  MessageCircle,
  Phone,
  Truck,
} from "lucide-react";
import { company, products } from "@/lib/site-data";
import {
  productDetails,
  dispatchCities,
  type ProductDetail,
} from "@/lib/product-detail";
import { productScenarios } from "@/lib/product-scenarios";

const nf = new Intl.NumberFormat("en-IN");

export function QuickFacts({ detail }: { detail: ProductDetail }) {
  return (
    <div className="grid gap-px border border-ink-border bg-ink-border sm:grid-cols-2 lg:grid-cols-4">
      {detail.quickFacts.map((f) => (
        <div key={f.label} className="ink-panel px-6 py-5">
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
            {f.label}
          </p>
          <p className="mt-2 text-lg font-semibold text-ink-foreground">
            {f.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export function Applications({ detail }: { detail: ProductDetail }) {
  return (
    <div className="flex flex-wrap gap-2">
      {detail.applications.map((a) => (
        <span
          key={a}
          className="border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground"
        >
          {a}
        </span>
      ))}
    </div>
  );
}

export function RequirementCalculator({
  detail,
  productName,
}: {
  detail: ProductDetail;
  productName: string;
}) {
  const [units, setUnits] = useState(detail.calculator.defaultUnitsPerDay);
  const [days, setDays] = useState(26);

  const r = useMemo(() => {
    const metres = units * days * detail.calculator.metresPerUnit;
    const rolls = Math.ceil(metres / detail.calculator.rollLength);
    const boxes = Math.ceil(rolls / detail.calculator.rollsPerBox);
    return { metres, rolls, boxes };
  }, [units, days, detail]);

  const waHref = `${company.whatsapp}?text=${encodeURIComponent(
    `Hi Sonison, ${detail.enquiryLine}. My estimated requirement is about ${nf.format(
      r.rolls,
    )} rolls per month (${productName}).`,
  )}`;

  return (
    <div className="border border-border bg-card shadow-card">
      <div className="grid gap-10 p-8 lg:grid-cols-2">
        <div>
          <p className="eyebrow flex items-center gap-2 text-accent">
            <Calculator className="h-3.5 w-3.5" /> Requirement calculator
          </p>
          <h3 className="mt-4 text-2xl">How much do you actually need?</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Move the sliders to size your monthly order before you enquire. We
            quote against this number.
          </p>

          <label className="mt-8 block">
            <span className="flex items-baseline justify-between font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
              {detail.calculator.unitLabel}
              <span className="text-base font-semibold text-foreground">
                {nf.format(units)}
              </span>
            </span>
            <input
              type="range"
              min={50}
              max={detail.calculator.defaultUnitsPerDay * 5}
              step={50}
              value={units}
              onChange={(e) => setUnits(Number(e.target.value))}
              className="mt-3 w-full accent-accent"
              aria-label={detail.calculator.unitLabel}
            />
          </label>

          <label className="mt-6 block">
            <span className="flex items-baseline justify-between font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
              Working days per month
              <span className="text-base font-semibold text-foreground">
                {days}
              </span>
            </span>
            <input
              type="range"
              min={20}
              max={31}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="mt-3 w-full accent-accent"
              aria-label="Working days per month"
            />
          </label>
        </div>

        <div className="ink-panel flex flex-col justify-between gap-6 p-8">
          <div className="grid gap-6">
            <Figure label="Tape consumed / month" value={`${nf.format(Math.round(r.metres))} m`} />
            <Figure label="Rolls / month" value={nf.format(r.rolls)} />
            <Figure
              label={`Boxes / month (${detail.calculator.rollsPerBox} per box)`}
              value={nf.format(r.boxes)}
            />
          </div>
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-accent px-6 py-4 font-mono text-[0.7rem] uppercase tracking-widest text-accent-foreground transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" /> Send this on WhatsApp
          </a>
        </div>
      </div>
      <p className="border-t border-border px-8 py-4 text-xs text-muted-foreground">
        Indicative only, based on {detail.calculator.metresPerUnit} m of tape per
        unit and {detail.calculator.rollLength} m rolls. Final quantities are
        confirmed by the plant.
      </p>
    </div>
  );
}

function Figure({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
        {label}
      </p>
      <p className="mt-1 text-3xl text-ink-foreground">{value}</p>
    </div>
  );
}

export function InfoTable({
  title,
  icon,
  rows,
}: {
  title: string;
  icon: "packing" | "commercial";
  rows: { label: string; value: string }[];
}) {
  const Icon = icon === "packing" ? Boxes : Truck;
  return (
    <div className="border border-border bg-card shadow-card">
      <h3 className="flex items-center gap-2 border-b border-border px-8 py-5 text-lg">
        <Icon className="h-4 w-4 text-accent" /> {title}
      </h3>
      <dl className="px-8 py-4">
        {rows.map((r) => (
          <div
            key={r.label + r.value}
            className="grid gap-1 border-b border-border py-3 last:border-0 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-4"
          >
            <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
              {r.label}
            </dt>
            <dd className="text-sm font-medium">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function OrderSteps({ detail }: { detail: ProductDetail }) {
  return (
    <ol className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
      {detail.steps.map((s, i) => (
        <li key={s.title} className="bg-background p-8">
          <span className="font-mono text-[0.7rem] uppercase tracking-widest text-accent">
            Step {i + 1}
          </span>
          <h3 className="mt-3 text-lg text-foreground">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {s.body}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function EnquiryCard({
  detail,
  productName,
}: {
  detail: ProductDetail;
  productName: string;
}) {
  const msg = encodeURIComponent(
    `Hi Sonison, ${detail.enquiryLine} (${productName}). Please share rates.`,
  );
  return (
    <div className="border border-border bg-card shadow-card">
      <div className="p-8">
        <p className="eyebrow text-muted-foreground">Talk to the plant</p>
        <h3 className="mt-3 text-xl">Get a rate for {productName}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Speak to us in Hindi or English. Rates quoted the same working day,
          GST and freight shown separately.
        </p>
        <div className="mt-6 grid gap-3">
          <a
            href={`${company.whatsapp}?text=${msg}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-accent px-5 py-3.5 font-mono text-[0.7rem] uppercase tracking-widest text-accent-foreground transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp enquiry
          </a>
          {company.phones.map((p) => (
            <a
              key={p}
              href={`tel:${p.replace(/\s/g, "")}`}
              className="inline-flex items-center justify-center gap-2 border border-border px-5 py-3.5 font-mono text-[0.7rem] uppercase tracking-widest transition-colors hover:bg-surface"
            >
              <Phone className="h-4 w-4 text-accent" /> {p}
            </a>
          ))}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border border-border px-5 py-3.5 font-mono text-[0.7rem] uppercase tracking-widest transition-colors hover:bg-surface"
          >
            Send an enquiry form
          </Link>
        </div>
        <p className="mt-6 flex gap-2 text-xs leading-relaxed text-muted-foreground">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
          {company.address}
        </p>
      </div>
    </div>
  );
}

export function DispatchStrip() {
  return (
    <div className="border border-border bg-surface p-8">
      <p className="eyebrow flex items-center gap-2 text-accent">
        <Truck className="h-3.5 w-3.5" /> Dispatch network
      </p>
      <h3 className="mt-3 text-xl">Regularly shipped to</h3>
      <div className="mt-5 flex flex-wrap gap-2">
        {dispatchCities.map((c) => (
          <span
            key={c}
            className="border border-border bg-background px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground"
          >
            {c}
          </span>
        ))}
      </div>
      <p className="mt-5 text-sm text-muted-foreground">
        Ex-works Delhi, or we book transport at actuals to your city. Docket and
        LR shared on dispatch.
      </p>
    </div>
  );
}

export function CompareTable({ currentSlug }: { currentSlug: string }) {
  return (
    <div className="overflow-x-auto border border-border bg-card shadow-card">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border">
            {["Product", "MOQ", "Lead time", "Best for", ""].map((h) => (
              <th
                key={h}
                className="px-6 py-4 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            const d = productDetails[p.slug];
            const active = p.slug === currentSlug;
            return (
              <tr
                key={p.slug}
                className={`border-b border-border last:border-0 ${active ? "bg-surface" : ""}`}
              >
                <td className="px-6 py-4 text-sm font-semibold">
                  <span className="flex items-center gap-2">
                    {active && <Check className="h-4 w-4 text-accent" />}
                    {p.name}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {d?.quickFacts[0]?.value ?? "—"}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {d?.quickFacts[1]?.value ?? "—"}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {p.kicker}
                </td>
                <td className="px-6 py-4">
                  {active ? (
                    <span className="font-mono text-[0.65rem] uppercase tracking-widest text-accent">
                      Viewing
                    </span>
                  ) : (
                    <Link
                      href={`/products/${p.slug}`}
                      className="font-mono text-[0.65rem] uppercase tracking-widest underline underline-offset-4 hover:text-accent"
                    >
                      View
                    </Link>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function ScenarioFaqs({
  slug,
  productName,
}: {
  slug: string;
  productName: string;
}) {
  const scenarios = productScenarios[slug] ?? [];
  const [open, setOpen] = useState(0);
  if (scenarios.length === 0) return null;

  return (
    <div className="grid gap-px border border-border bg-border lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <div className="bg-surface p-2">
        {scenarios.map((s, i) => (
          <button
            key={s.situation}
            type="button"
            onClick={() => setOpen(i)}
            className={`grid w-full grid-cols-[auto_minmax(0,1fr)] items-start gap-4 border-l-2 px-6 py-5 text-left transition-colors ${
              open === i
                ? "border-accent bg-background"
                : "border-transparent hover:bg-background/60"
            }`}
          >
            <span className="font-mono text-[0.7rem] text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{s.situation}</span>
              <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                {s.q}
              </span>
            </span>
          </button>
        ))}
      </div>

      <div className="bg-card p-8 md:p-10">
        {scenarios.map((s, i) =>
          open === i ? (
            <div key={s.situation}>
              <p className="eyebrow flex items-center gap-2 text-accent">
                <Lightbulb className="h-3.5 w-3.5" /> What we would advise
              </p>
              <h3 className="mt-4 text-xl md:text-2xl">{s.q}</h3>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                {s.a}
              </p>

              <p className="mt-8 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                Suggested specification
              </p>
              <dl className="mt-3 divide-y divide-border border-y border-border">
                {s.spec.map((r) => (
                  <div
                    key={r.label}
                    className="grid gap-1 py-3 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-4"
                  >
                    <dt className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                      {r.label}
                    </dt>
                    <dd className="text-sm font-semibold">{r.value}</dd>
                  </div>
                ))}
              </dl>

              <a
                href={`${company.whatsapp}?text=${encodeURIComponent(
                  `Hi Sonison, my situation: ${s.situation}. Please quote ${productName} — ${s.spec
                    .map((r) => `${r.label}: ${r.value}`)
                    .join(", ")}`,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 bg-accent px-5 py-3.5 font-mono text-[0.7rem] uppercase tracking-widest text-accent-foreground transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" /> Quote me this spec
              </a>
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}
