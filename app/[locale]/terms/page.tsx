import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { LegalContent } from "@/components/LegalContent";

const HREF = "/terms" as const;
type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.terms" });
  return pageMetadata({ locale, href: HREF, title: t("title"), description: t("description") });
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const sections = t.raw("terms.sections") as { heading: string; paragraphs: string[] }[];

  return (
    <LegalContent
      title={t("terms.title")}
      lastUpdatedLabel={t("lastUpdatedLabel")}
      lastUpdated={t("terms.lastUpdated")}
      sections={sections}
    />
  );
}
