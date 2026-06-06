import type { AppPathname } from "@/i18n/routing";

type NavItem = {
  href: AppPathname;
  /** Key under the `nav` namespace in messages. */
  key: string;
};

export const eventLinks: NavItem[] = [
  { href: "/corporate-events", key: "corporate" },
  { href: "/golf-tournaments", key: "tournaments" },
  { href: "/trade-shows-brand-activations", key: "tradeShows" },
];

export const locationLinks: NavItem[] = [
  { href: "/golf-simulator-rental-ottawa", key: "ottawa" },
  { href: "/golf-simulator-rental-gatineau", key: "gatineau" },
];

export const primaryLinks: NavItem[] = [
  { href: "/", key: "home" },
  ...locationLinks,
  { href: "/contact", key: "contact" },
];

export const legalLinks: NavItem[] = [
  { href: "/privacy-policy", key: "privacy" },
  { href: "/terms", key: "terms" },
];
