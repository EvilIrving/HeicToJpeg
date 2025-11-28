"use client";

import { useTranslations } from "next-intl";

import FaqItem from "./faq";

export default function FAQ() {
  const t = useTranslations("FAQ");
  
  const features = [
    {
      title: t("worksOffline.title"),
      description: t("worksOffline.description"),
    },
    {
      title: t("batchConversion.title"),
      description: t("batchConversion.description"),
    },
    {
      title: t("preserveQuality.title"),
      description: t("preserveQuality.description"),
    },
    {
      title: t("noRegistration.title"),
      description: t("noRegistration.description"),
    },
    {
      title: t("previewBeforeDownload.title"),
      description: t("previewBeforeDownload.description"),
    },
  ];

  return (
    <div className="py-10 lg:py-12">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="py-10 text-2xl font-bold text-gray-800 dark:text-neutral-200 md:text-3xl md:leading-tight lg:py-14">
          {t("title")}
        </h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 md:gap-12">
        {features.map((feature) => (
          <FaqItem key={feature.title} feature={feature}></FaqItem>
        ))}
      </div>
    </div>
  );
}
