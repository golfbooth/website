import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import { SEOContentSection } from "@/components/SEOContentSection";
import { FinalCTA } from "@/components/FinalCTA";
import { JsonLd } from "@/components/JsonLd";

const HREF = "/trade-shows-brand-activations" as const;
type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.tradeShows" });
  return pageMetadata({ locale, href: HREF, title: t("title"), description: t("description") });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "tradeShowsPage" });
  const tm = await getTranslations({ locale, namespace: "metadata.tradeShows" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const sections = t.raw("sections") as { heading: string; paragraphs: string[] }[];

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(locale, HREF, t("hero.title"), tm("description")),
          breadcrumbSchema([
            { name: tn("home"), locale, href: "/" },
            { name: tn("tradeShows"), locale, href: HREF },
          ]),
        ]}
      />
      <PageHero title={t("hero.title")} subtitle={t("hero.subtitle")} />
      <SEOContentSection sections={sections} />
      <FinalCTA />
    </>
  );
}
