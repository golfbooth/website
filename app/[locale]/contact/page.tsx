import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { localBusinessSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import type { Locale } from "@/i18n/routing";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";

const HREF = "/contact" as const;
type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.contact" });
  return pageMetadata({ locale, href: HREF, title: t("title"), description: t("description") });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "form" });

  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <section className="container-page py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h1 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
              {t("heading")}
            </h1>
            <p className="mt-4 max-w-md text-lg text-muted">{t("subtitle")}</p>
            <div className="mt-8 space-y-4 text-base">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 text-muted transition-colors hover:text-foreground"
              >
                <span aria-hidden className="text-accent">✉</span>
                {site.email}
              </a>
              <a
                href={`tel:${site.phoneE164}`}
                className="flex items-center gap-3 text-muted transition-colors hover:text-foreground"
              >
                <span aria-hidden className="text-accent">✆</span>
                {site.phone}
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
