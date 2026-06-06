import { useTranslations } from "next-intl";
import { SectionHeading } from "./SectionHeading";

type Step = { title: string; description: string };

export function HowItWorks() {
  const t = useTranslations("howItWorks");
  const steps = t.raw("steps") as Step[];

  return (
    <section id="how-it-works" className="scroll-mt-20 border-y border-border bg-surface py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading title={t("heading")} centered />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-border bg-background p-6">
              <span className="font-display text-3xl font-bold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold uppercase tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
