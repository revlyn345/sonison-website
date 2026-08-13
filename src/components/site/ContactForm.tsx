"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { company, products } from "@/lib/site-data";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    product: products[0]!.name,
    artwork: "No",
    quantity: "",
    details: "",
  });

  const message = `Hello Sonison Packaging,%0A%0AName: ${encodeURIComponent(
    form.name,
  )}%0ACompany: ${encodeURIComponent(form.company)}%0AProduct: ${encodeURIComponent(
    form.product,
  )}%0AArtwork ready: ${form.artwork}%0AQuantity: ${encodeURIComponent(
    form.quantity,
  )}%0A%0ADetails: ${encodeURIComponent(form.details)}`;

  const field =
    "w-full border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-accent";

  return (
    <div className="border border-border bg-card shadow-card">
      <div className="p-8 md:p-10">
        <h2 className="text-3xl">Leave a message</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Fill this in and it opens a pre-written WhatsApp message to our sales desk, the fastest
          way to a price.
        </p>

        <div className="mt-8 grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="eyebrow text-muted-foreground">Your name</span>
              <input
                className={`${field} mt-2`}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full name"
              />
            </label>
            <label className="block">
              <span className="eyebrow text-muted-foreground">Company</span>
              <input
                className={`${field} mt-2`}
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="Company name"
              />
            </label>
          </div>

          <label className="block">
            <span className="eyebrow text-muted-foreground">Product of interest</span>
            <select
              className={`${field} mt-2`}
              value={form.product}
              onChange={(e) => setForm({ ...form, product: e.target.value })}
            >
              {products.map((p) => (
                <option key={p.slug}>{p.name}</option>
              ))}
            </select>
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="eyebrow text-muted-foreground">Artwork ready?</span>
              <select
                className={`${field} mt-2`}
                value={form.artwork}
                onChange={(e) => setForm({ ...form, artwork: e.target.value })}
              >
                <option>No</option>
                <option>Yes</option>
              </select>
            </label>
            <label className="block">
              <span className="eyebrow text-muted-foreground">Monthly quantity</span>
              <input
                className={`${field} mt-2`}
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                placeholder="e.g. 5,000 rolls"
              />
            </label>
          </div>

          <label className="block">
            <span className="eyebrow text-muted-foreground">Project details</span>
            <textarea
              rows={4}
              className={`${field} mt-2 resize-none`}
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
              placeholder="Widths, colours, micron, delivery city…"
            />
          </label>

          <a
            href={`${company.whatsapp}?text=${message}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-accent px-7 py-4 font-bold text-accent-foreground shadow-red transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="h-5 w-5" />
            Send on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
