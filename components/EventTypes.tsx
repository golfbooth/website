import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
import { SectionHeading } from "./SectionHeading";

const items: { key: string; href: AppPathname }[] = [
  { key: "corporate", href: "/corporate-events" },
  { key: "tournaments", href: "/golf-tournaments" },
  { key: "tradeShows", href: "/trade-shows-brand-activations" },
  { key: "private", href: "/contact" },
];

export function EventTypes() {
  const t = useTranslations("eventTypes");

  return (
    <section className="container-page py-16 sm:py-24">
      <SectionHeading title={t("heading")} subtitle={t("subtitle")} centered />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ key, href }) => (
          <Link
            key={key}
            href={href}
            className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-foreground/30 hover:bg-surface-2"
          >
            <h3 className="font-display text-xl font-semibold uppercase tracking-tight">
              {t(`items.${key}.title`)}
            </h3>
            <p className="mt-3 flex-1 text-sm text-muted">
              {t(`items.${key}.description`)}
            </p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
