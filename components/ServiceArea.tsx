import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { SectionHeading } from "./SectionHeading";

export function ServiceArea() {
  const t = useTranslations("serviceArea");

  return (
    <section className="container-page py-16 sm:py-24">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <SectionHeading title={t("heading")} subtitle={t("body")} />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/golf-simulator-rental-ottawa"
              className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-foreground hover:bg-surface"
            >
              {t("ottawaCta")}
            </Link>
            <Link
              href="/golf-simulator-rental-gatineau"
              className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-foreground hover:bg-surface"
            >
              {t("gatineauCta")}
            </Link>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {site.areasServed.map((city) => (
            <li
              key={city}
              className="rounded-xl border border-border bg-surface px-4 py-3 text-center text-sm font-medium text-muted"
            >
              {city}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
