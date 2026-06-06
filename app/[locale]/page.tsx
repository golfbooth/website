import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { faqSchema, localBusinessSchema } from "@/lib/schema";
import type { Locale } from "@/i18n/routing";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { WhatIs } from "@/components/WhatIs";
import { VideoShowcase } from "@/components/VideoShowcase";
import { EventTypes } from "@/components/EventTypes";
import { HowItWorks } from "@/components/HowItWorks";
import { GolfChallenges } from "@/components/GolfChallenges";
import { WhyBook } from "@/components/WhyBook";
import { ServiceArea } from "@/components/ServiceArea";
import { FAQ } from "@/components/FAQ";
import { Testimonials } from "@/components/Testimonials";
import { FinalCTA } from "@/components/FinalCTA";
import { JsonLd } from "@/components/JsonLd";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  return pageMetadata({
    locale,
    href: "/",
    title: t("title"),
    description: t("description"),
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tf = await getTranslations({ locale, namespace: "faq" });
  const faqItems = tf.raw("items") as { question: string; answer: string }[];

  return (
    <>
      <JsonLd data={[localBusinessSchema(), faqSchema(faqItems)]} />
      <Hero />
      <TrustBar />
      <WhatIs />
      <VideoShowcase />
      <EventTypes />
      <HowItWorks />
      <GolfChallenges />
      <WhyBook />
      <ServiceArea />
      <FAQ />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
