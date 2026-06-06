"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const STORAGE_KEY = "gb-cookie-consent";

export function CookieConsent() {
  const t = useTranslations("cookie");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // ignore storage access errors
    }
  }, []);

  function decide(value: "accepted" | "declined") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore storage access errors
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <div className="container-page">
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-2xl sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm text-muted">
            {t("message")}{" "}
            <Link href="/privacy-policy" className="text-foreground underline underline-offset-2">
              {t("learnMore")}
            </Link>
          </p>
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={() => decide("declined")}
              className="rounded-full border border-border px-5 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors hover:bg-surface-2"
            >
              {t("decline")}
            </button>
            <button
              type="button"
              onClick={() => decide("accepted")}
              className="rounded-full bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-hover"
            >
              {t("accept")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
