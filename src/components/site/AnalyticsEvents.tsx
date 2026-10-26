"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";

/**
 * Sends a Google Analytics event whenever a visitor clicks a WhatsApp, phone
 * or email link anywhere on the site. One listener covers every button
 * (header, quote bands, configurator, design studio, contact form...), so new
 * buttons are tracked automatically without touching their code.
 *
 * Events appear in GA4 as: whatsapp_click, phone_click, email_click.
 * Mark them as "key events" in GA4 (Admin > Events) to count them as enquiries.
 */
export function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest("a");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";

      let name: string | null = null;
      if (href.includes("wa.me")) name = "whatsapp_click";
      else if (href.startsWith("tel:")) name = "phone_click";
      else if (href.startsWith("mailto:")) name = "email_click";
      if (!name) return;

      sendGAEvent("event", name, {
        page_path: window.location.pathname,
        link_text: (link.textContent ?? "").trim().slice(0, 80),
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
