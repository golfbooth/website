"use client";

import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function switchTo(nextLocale: string) {
    if (nextLocale === locale) return;
    router.replace(
      // @ts-expect-error -- params are validated by next-intl at runtime
      { pathname, params },
      { locale: nextLocale },
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1 text-xs font-semibold uppercase ${className}`}
    >
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 ? <span className="text-border">/</span> : null}
          <button
            type="button"
            onClick={() => switchTo(l)}
            aria-current={l === locale ? "true" : undefined}
            className={
              l === locale
                ? "text-foreground"
                : "text-muted transition-colors hover:text-foreground"
            }
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
