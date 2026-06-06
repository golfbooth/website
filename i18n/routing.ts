import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/golf-simulator-rental-ottawa": {
      en: "/golf-simulator-rental-ottawa",
      fr: "/location-simulateur-de-golf-ottawa",
    },
    "/golf-simulator-rental-gatineau": {
      en: "/golf-simulator-rental-gatineau",
      fr: "/location-simulateur-de-golf-gatineau",
    },
    "/corporate-events": {
      en: "/corporate-events",
      fr: "/evenements-corporatifs",
    },
    "/golf-tournaments": {
      en: "/golf-tournaments",
      fr: "/tournois-de-golf",
    },
    "/trade-shows-brand-activations": {
      en: "/trade-shows-brand-activations",
      fr: "/salons-et-activations-de-marque",
    },
    "/contact": "/contact",
    "/thank-you": {
      en: "/thank-you",
      fr: "/merci",
    },
    "/privacy-policy": {
      en: "/privacy-policy",
      fr: "/politique-de-confidentialite",
    },
    "/terms": {
      en: "/terms",
      fr: "/conditions-generales",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
