import { useTranslations } from "next-intl";
import { SectionHeading } from "./SectionHeading";

export function VideoShowcase() {
  const t = useTranslations("video");

  return (
    <section className="border-y border-border bg-surface py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading title={t("heading")} subtitle={t("subtitle")} centered />
        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-border bg-black">
          <video
            className="aspect-video w-full"
            controls
            playsInline
            preload="metadata"
            poster="/images/video-poster.png"
          >
            <source src="/videos/booth-showcase.mp4" type="video/mp4" />
          </video>
        </div>
        <p className="mt-4 text-center text-xs text-muted">{t("caption")}</p>
      </div>
    </section>
  );
}
