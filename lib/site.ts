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
  // Add once the Google Business Profile is verified.
  social: {
    googleBusiness: "",
    instagram: "",
    facebook: "",
  },
} as const;

export const ogLocale = { en: "en_CA", fr: "fr_CA" } as const;
export const htmlLang = { en: "en-CA", fr: "fr-CA" } as const;
