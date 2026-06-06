import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname, type Locale } from "@/i18n/routing";
import { ogLocale, site } from "./site";

function absoluteUrl(locale: Locale, href: AppPathname): string {
  const path = getPathname({ locale, href });
  return `${site.url}${path === "/" ? "" : path}`;
}

type PageMetaArgs = {
  locale: Locale;
  href: AppPathname;
  title: string;
  description: string;
  noindex?: boolean;
};

export function pageMetadata({
  locale,
  href,
  title,
  description,
  noindex = false,
}: PageMetaArgs): Metadata {
  const canonical = absoluteUrl(locale, href);

  const languages: Record<string, string> = {
    "x-default": absoluteUrl(routing.defaultLocale, href),
  };
  for (const l of routing.locales) {
    languages[l === "en" ? "en-CA" : "fr-CA"] = absoluteUrl(l, href);
  }

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url: canonical,
      locale: ogLocale[locale],
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => ogLocale[l]),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
