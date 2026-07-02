export const site = {
  name: "GolfBooth",
  domain: "golfbooth.ca",
  url: "https://golfbooth.ca",
  email: "info@golfbooth.ca",
  phone: "(613) 290-1001",
  phoneE164: "+16132901001",
  descriptor: "Mobile Golf Simulator",
  areasServed: [
    "Ottawa",
    "Gatineau",
    "Kanata",
    "Orléans",
    "Nepean",
    "Barrhaven",
    "Aylmer",
    "Hull",
    "Chelsea",
  ],
  // Add your Google Business Profile URL once verified (helps SEO + sameAs schema).
  social: {
    googleBusiness: "",
    instagram: "",
    facebook: "",
  },
  geo: {
    latitude: 45.4215,
    longitude: -75.6972,
  },
} as const;

export const ogLocale = { en: "en_CA", fr: "fr_CA" } as const;
export const htmlLang = { en: "en-CA", fr: "fr-CA" } as const;
