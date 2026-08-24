"use client";

import { useMemo, useState } from "react";
import { Phone, Send, Package } from "lucide-react";
import { z } from "zod";
import { company } from "@/lib/site-data";

const nameSchema = z.string().trim().min(2).max(60);
const phoneSchema = z
  .string()
  .trim()
  .regex(/^(\+91[\s-]?)?[6-9]\d{9}$/, "Enter a 10-digit Indian mobile number");
const freeText = z.string().trim().max(160);

const needs = ["Plain BOPP tape", "Coloured tape", "Printed tape", "Jumbo rolls", "Paper cores", "Not sure yet"];

const slots = ["Now", "Later today", "Tomorrow morning"];

export function CallbackCard() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [need, setNeed] = useState(needs[0]!);
  const [slot, setSlot] = useState(slots[0]!);
  const [sample, setSample] = useState(false);
  const [touched, setTouched] = useState(false);

  const nameOk = nameSchema.safeParse(name).success;
  const phoneOk = phoneSchema.safeParse(phone).success;
  const valid = nameOk && phoneOk;

  const message = useMemo(
    () =>
      encodeURIComponent(
        `Hello Sonison Packaging, please call me back.\n` +
          `Name: ${freeText.parse(name || "-")}\n` +
          `Mobile: ${freeText.parse(phone || "-")}\n` +
          `City: ${freeText.parse(city || "-")}\n` +
          `Requirement: ${need}\n` +
          `Best time: ${slot}` +
          (sample ? `\nPlease also send a sample roll.` : ""),
      ),
    [name, phone, city, need, slot, sample],
  );

  const field =
    "w-full border border-ink-border bg-[oklch(0.13_0.035_254/0.6)] px-4 py-3 text-ink-foreground placeholder:text-ink-muted/70 outline-none focus:border-accent";

  return (
    <div className="border border-ink-border bg-[oklch(0.13_0.035_254/0.7)] p-7 backdrop-blur md:p-9">
      <p className="eyebrow text-accent">30-minute callback</p>
      <h3 className="mt-3 text-3xl leading-tight text-ink-foreground">
        Tell us the requirement. We&apos;ll call, not email a brochure.
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        Mon–Sat, 9:30am to 7pm. Rate, MOQ and dispatch date on the same call, our plant team picks
        up, not a call centre.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 60))}
            onBlur={() => setTouched(true)}
            placeholder="Your name"
            className={field}
            aria-label="Your name"
          />
          {touched && !nameOk && <p className="mt-1 text-xs text-accent">Please enter your name.</p>}
        </div>
        <div>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value.slice(0, 14))}
            onBlur={() => setTouched(true)}
            inputMode="tel"
            placeholder="Mobile number"
            className={field}
            aria-label="Mobile number"
          />
          {touched && !phoneOk && (
            <p className="mt-1 text-xs text-accent">10-digit Indian mobile, please.</p>
          )}
        </div>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value.slice(0, 40))}
          placeholder="City (for freight)"
          className={field}
          aria-label="City"
        />
        <select
          value={need}
          onChange={(e) => setNeed(e.target.value)}
          className={field}
          aria-label="Requirement"
        >
          {needs.map((n) => (
            <option key={n} value={n} className="bg-[oklch(0.15_0.04_254)]">
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[0.62rem] uppercase tracking-widest text-ink-muted">Call me</span>
        {slots.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSlot(s)}
            className={`border px-3 py-1.5 text-xs font-bold transition-colors ${
              slot === s
                ? "border-accent bg-accent text-accent-foreground"
                : "border-ink-border text-ink-muted hover:border-accent/60"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setSample((v) => !v)}
        className={`mt-4 inline-flex items-center gap-2 border px-4 py-2.5 text-sm font-bold transition-colors ${
          sample
            ? "border-accent bg-accent text-accent-foreground"
            : "border-ink-border text-ink-foreground hover:border-accent/60"
        }`}
      >
        <Package className="h-4 w-4" />
        Send a free sample roll too
      </button>

      <div className="mt-7 flex flex-wrap gap-3">
        <a
          href={valid ? `${company.whatsapp}?text=${message}` : undefined}
          onClick={(e) => {
            if (!valid) {
              e.preventDefault();
              setTouched(true);
            }
          }}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-2 px-7 py-3.5 font-bold transition-transform ${
            valid
              ? "bg-accent text-accent-foreground shadow-red hover:-translate-y-0.5"
              : "cursor-not-allowed bg-ink-border text-ink-muted"
          }`}
        >
          <Send className="h-4 w-4" /> Request callback on WhatsApp
        </a>
        <a
          href={`tel:${company.phones[0].replace(/\s/g, "")}`}
          className="inline-flex items-center gap-2 border border-ink-border px-7 py-3.5 font-bold text-ink-foreground transition-colors hover:bg-ink-border/40"
        >
          <Phone className="h-4 w-4" /> {company.phones[0]}
        </a>
      </div>
    </div>
  );
}
