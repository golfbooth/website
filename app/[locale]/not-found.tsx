import { useTranslations } from "next-intl";
import { CTAButton } from "@/components/CTAButton";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="container-page flex min-h-[60vh] items-center py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-6xl font-bold text-accent">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
          {t("heading")}
        </h1>
        <p className="mt-4 text-lg text-muted">{t("body")}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton href="/" variant="primary">
            {t("backHome")}
          </CTAButton>
          <CTAButton href="/contact" variant="secondary">
            {t("contact")}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
