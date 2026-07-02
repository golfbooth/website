import { getPathname } from "@/i18n/navigation";
import { type AppPathname, type Locale } from "@/i18n/routing";
import { site } from "./site";

function url(locale: Locale, href: AppPathname): string {
  const path = getPathname({ locale, href });
  return `${site.url}${path === "/" ? "" : path}`;
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    description:
      "Premium mobile golf simulator rental for corporate events, tournaments, trade shows, and private parties in Ottawa and Gatineau.",
    url: site.url,
    email: site.email,
    telephone: site.phoneE164,
    image: `${site.url}/brand/logo-front.png`,
    logo: `${site.url}/brand/logo-front.png`,
    priceRange: "$$",
    areaServed: site.areasServed.map((name) => ({
      "@type": "City",
      name,
    })),
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ottawa",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    ...(site.social.googleBusiness
      ? { sameAs: [site.social.googleBusiness] }
      : {}),
  };
}

export function videoSchema(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: `${site.url}/images/video-poster.png`,
    contentUrl: `${site.url}/videos/booth-showcase.mp4`,
    uploadDate: "2026-07-02",
    publisher: { "@id": `${site.url}/#business` },
  };
}

export function serviceSchema(
  locale: Locale,
  href: AppPathname,
  name: string,
  description: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: url(locale, href),
    provider: { "@id": `${site.url}/#business` },
    areaServed: site.areasServed.map((n) => ({ "@type": "City", name: n })),
  };
}

export function breadcrumbSchema(
  items: { name: string; locale: Locale; href: AppPathname }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: url(item.locale, item.href),
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
