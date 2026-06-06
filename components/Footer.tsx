import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { eventLinks, legalLinks, locationLinks } from "@/lib/nav";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm text-muted">{tf("tagline")}</p>
            <LocaleSwitcher />
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide">
              {tf("exploreHeading")}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-muted transition-colors hover:text-foreground">
                  {t("home")}
                </Link>
              </li>
              {[...eventLinks, ...locationLinks].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted transition-colors hover:text-foreground">
                    {t(item.key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="text-muted transition-colors hover:text-foreground">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide">
              {tf("contactHeading")}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="text-muted transition-colors hover:text-foreground">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phoneE164}`} className="text-muted transition-colors hover:text-foreground">
                  {site.phone}
                </a>
              </li>
            </ul>

            <h3 className="mt-6 font-display text-sm font-semibold uppercase tracking-wide">
              {tf("legalHeading")}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted transition-colors hover:text-foreground">
                    {tf(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide">
              {tf("areasHeading")}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-sm text-muted">
              {site.areasServed.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-xs text-muted">
          © {year} {site.name}. {tf("rights")}
        </div>
      </div>
    </footer>
  );
}
