import { caseStudies } from "@/lib/catalog";
import { Reveal } from "@/components/site/Reveal";

export function CaseStudies() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <p className="eyebrow text-accent">Problems solved on the floor</p>
      <h2 className="mt-4 max-w-3xl text-4xl leading-[1.02] md:text-6xl">
        What changed when the spec changed
      </h2>

      <div className="mt-12 grid gap-px border border-border bg-border lg:grid-cols-3">
        {caseStudies.map((c, i) => (
          <Reveal key={c.client} delay={i * 90} className="flex h-full flex-col bg-background p-8">
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-accent">
              {c.industry}
            </span>
            <h3 className="mt-3 text-xl">{c.client}</h3>

            <dl className="mt-6 flex-1 space-y-4 text-sm leading-relaxed">
              <div>
                <dt className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                  Challenge
                </dt>
                <dd className="mt-1">{c.challenge}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                  What we changed
                </dt>
                <dd className="mt-1">{c.solution}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                  Outcome
                </dt>
                <dd className="mt-1">{c.outcome}</dd>
              </div>
            </dl>

            <div className="mt-7 border-t border-border pt-5">
              <div className="font-display text-3xl font-extrabold text-primary">
                {c.metric.value}
              </div>
              <div className="mt-1 font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
                {c.metric.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
