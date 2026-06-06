import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname } from "@/i18n/routing";
import { site } from "@/lib/site";

const indexablePaths: AppPathname[] = [
  "/",
  "/golf-simulator-rental-ottawa",
  "/golf-simulator-rental-gatineau",
  "/corporate-events",
  "/golf-tournaments",
  "/trade-shows-brand-activations",
  "/contact",
  "/privacy-policy",
  "/terms",
];

function url(locale: (typeof routing.locales)[number], href: AppPathname) {
  const path = getPathname({ locale, href });
  return `${site.url}${path === "/" ? "" : path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePaths.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: url(locale, href),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: href === "/" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l === "en" ? "en-CA" : "fr-CA", url(l, href)]),
        ),
      },
    })),
  );
}
