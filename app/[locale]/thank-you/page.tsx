import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Locale } from "@/i18n/routing";
import { CTAButton } from "@/components/CTAButton";

const HREF = "/thank-you" as const;
type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.thankYou" });
  return pageMetadata({
    locale,
    href: HREF,
    title: t("title"),
    description: t("description"),
    noindex: true,
  });
}

export default async function ThankYouPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "thankYou" });

  return (
    <section className="container-page flex min-h-[60vh] items-center py-20">
      <div className="mx-auto max-w-xl text-center">
        <span aria-hidden className="text-5xl text-accent">✓</span>
        <h1 className="mt-6 font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
          {t("heading")}
        </h1>
        <p className="mt-4 text-lg text-muted">{t("body")}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <CTAButton href="/" variant="primary">
            {t("backHome")}
          </CTAButton>
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-muted underline underline-offset-2 hover:text-foreground"
          >
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
