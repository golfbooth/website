import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHeading } from "./SectionHeading";

export function WhatIs() {
  const t = useTranslations("what");
  const points = t.raw("points") as string[];

  return (
    <section className="container-page py-16 sm:py-24">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <SectionHeading title={t("heading")} />
          <p className="mt-5 text-lg font-medium text-foreground">{t("lead")}</p>
          <p className="mt-4 text-base leading-relaxed text-muted">{t("body")}</p>
          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-base text-muted">
                <span aria-hidden className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border">
          <Image
            src="/images/booth-hero.png"
            alt={t("imageAlt")}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
