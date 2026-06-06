import { useTranslations } from "next-intl";
import { SectionHeading } from "./SectionHeading";

type Item = { title: string; description: string };

export function WhyBook() {
  const t = useTranslations("whyBook");
  const items = t.raw("items") as Item[];

  return (
    <section className="border-y border-border bg-surface py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading title={t("heading")} centered />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-background p-6">
              <h3 className="font-display text-lg font-semibold uppercase tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
