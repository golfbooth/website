import Image from "next/image";
import { useTranslations } from "next-intl";
import { CTAButton, AnchorButton } from "./CTAButton";

export function Hero() {
  const t = useTranslations("hero");
  const tc = useTranslations("cta");
  const tt = useTranslations("trust");
  const items = tt.raw("items") as string[];

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0">
        <Image
          src="/images/booth-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/55" />
      </div>

      <div className="container-page relative py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">{t("subtitle")}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton href="/contact" variant="primary" className="w-full sm:w-auto">
              {tc("requestQuote")}
            </CTAButton>
            <AnchorButton href="#how-it-works" variant="secondary" className="w-full sm:w-auto">
              {tc("seeHowItWorks")}
            </AnchorButton>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-muted">
            {items.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
