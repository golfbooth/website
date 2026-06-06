import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import { SEOContentSection } from "@/components/SEOContentSection";
import { FinalCTA } from "@/components/FinalCTA";
import { JsonLd } from "@/components/JsonLd";

const HREF = "/golf-simulator-rental-ottawa" as const;
type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.ottawa" });
  return pageMetadata({ locale, href: HREF, title: t("title"), description: t("description") });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ottawaPage" });
  const tm = await getTranslations({ locale, namespace: "metadata.ottawa" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const sections = t.raw("sections") as { heading: string; paragraphs: string[] }[];

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(locale, HREF, t("hero.title"), tm("description")),
          breadcrumbSchema([
            { name: tn("home"), locale, href: "/" },
            { name: tn("ottawa"), locale, href: HREF },
          ]),
        ]}
      />
      <PageHero title={t("hero.title")} subtitle={t("hero.subtitle")} />
      <SEOContentSection sections={sections} />
      <FinalCTA />
    </>
  );
}
