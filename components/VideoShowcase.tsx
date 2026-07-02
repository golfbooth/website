import { useTranslations } from "next-intl";
import { SectionHeading } from "./SectionHeading";

export function VideoShowcase() {
  const t = useTranslations("video");

  return (
    <section className="border-y border-border bg-surface py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading title={t("heading")} subtitle={t("subtitle")} centered />
        <div className="mx-auto mt-10 w-full max-w-[320px] sm:max-w-[360px]">
          <div className="overflow-hidden rounded-3xl border border-border bg-black">
            <video
              className="aspect-[9/16] w-full object-cover"
              controls
              playsInline
              preload="metadata"
              poster="/images/video-poster.png"
            >
              <source src="/videos/booth-showcase.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-muted">{t("caption")}</p>
      </div>
    </section>
  );
}
