import { useTranslations } from "next-intl";
import { SectionHeading } from "./SectionHeading";

type Item = { question: string; answer: string };

export function FAQ() {
  const t = useTranslations("faq");
  const items = t.raw("items") as Item[];

  return (
    <section className="border-t border-border bg-surface py-16 sm:py-24">
      <div className="container-page max-w-3xl">
        <SectionHeading title={t("heading")} subtitle={t("subtitle")} centered />
        <div className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-background">
          {items.map((item) => (
            <details key={item.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-base font-medium [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden
                  className="shrink-0 text-accent transition-transform group-open:rotate-45"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
