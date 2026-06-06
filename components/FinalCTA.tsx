import { useTranslations } from "next-intl";
import { CTAButton } from "./CTAButton";

export function FinalCTA() {
  const t = useTranslations("finalCta");

  return (
    <section className="container-page py-16 sm:py-24">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-14 text-center sm:px-12">
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
          {t("heading")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted">{t("subtitle")}</p>
        <div className="mt-8 flex justify-center">
          <CTAButton href="/contact" variant="primary" className="w-full sm:w-auto">
            {t("button")}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
