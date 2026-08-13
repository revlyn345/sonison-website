import { ShieldCheck, FileSearch, Droplets, CalendarClock } from "lucide-react";
import { certifications } from "@/lib/catalog";
import { Reveal } from "@/components/site/Reveal";

const icons = [FileSearch, ShieldCheck, Droplets, CalendarClock];

export function CertStrip() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-px bg-border px-0 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((c, i) => {
          const Icon = icons[i % icons.length]!;
          return (
            <Reveal key={c.title} delay={i * 70} className="bg-surface p-8">
              <Icon className="h-6 w-6 text-accent" strokeWidth={1.6} />
              <h3 className="mt-5 text-lg">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
