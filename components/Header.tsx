"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { eventLinks, locationLinks } from "@/lib/nav";
import { Logo } from "./Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("cta");
  const [open, setOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
    setEventsOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          <Link href="/" className="text-sm text-muted transition-colors hover:text-foreground">
            {t("home")}
          </Link>

          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
            >
              {t("events")}
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden className="mt-0.5">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </button>
            <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="w-64 rounded-2xl border border-border bg-surface p-2 shadow-xl">
                {eventLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-xl px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {locationLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {t(item.key)}
            </Link>
          ))}

          <Link href="/contact" className="text-sm text-muted transition-colors hover:text-foreground">
            {t("contact")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher className="hidden sm:inline-flex" />
          <Link
            href="/contact"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-hover sm:inline-flex"
          >
            {tc("requestQuote")}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border lg:hidden"
          >
            <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
              {open ? (
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-lg px-2 py-3 text-base text-foreground hover:bg-surface"
            >
              {t("home")}
            </Link>

            <button
              type="button"
              onClick={() => setEventsOpen((v) => !v)}
              className="flex items-center justify-between rounded-lg px-2 py-3 text-base text-foreground hover:bg-surface"
              aria-expanded={eventsOpen}
            >
              {t("events")}
              <svg
                width="14"
                height="14"
                viewBox="0 0 12 12"
                aria-hidden
                className={eventsOpen ? "rotate-180 transition-transform" : "transition-transform"}
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </button>
            {eventsOpen ? (
              <div className="ml-3 flex flex-col border-l border-border pl-3">
                {eventLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="rounded-lg px-2 py-2.5 text-sm text-muted hover:bg-surface hover:text-foreground"
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </div>
            ) : null}

            {locationLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-lg px-2 py-3 text-base text-foreground hover:bg-surface"
              >
                {t(item.key)}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={closeMenu}
              className="rounded-lg px-2 py-3 text-base text-foreground hover:bg-surface"
            >
              {t("contact")}
            </Link>

            <div className="mt-3 flex items-center justify-between gap-3 px-2">
              <LocaleSwitcher />
              <Link
                href="/contact"
                onClick={closeMenu}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white"
              >
                {tc("requestQuote")}
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
