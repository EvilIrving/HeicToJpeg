import type { Metadata } from "next";

import { type Locale } from "@/i18n.config";
import { siteMetadata } from "@/data.config";

interface PageSEOProps {
  title: string;
  description?: string;
  image?: string;
  locale?: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// 获取多语言元数据
function getLocalizedMetadata(locale: Locale) {
  const localeKey = locale === "zh" ? "zh-CN" : "en-US";
  const translation = siteMetadata.translations[localeKey];
  
  return {
    title: translation.title,
    description: translation.description,
  };
}

export function genPageMetadata({
  title,
  description,
  image,
  locale = "en",
  ...rest
}: PageSEOProps): Metadata {
  const localizedMeta = getLocalizedMetadata(locale);
  const pageTitle = title || localizedMeta.title;
  const pageDescription = description || localizedMeta.description;
  const localeCode = locale === "zh" ? "zh_CN" : "en_US";
  
  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: `${pageTitle} | ${localizedMeta.title}`,
      description: pageDescription,
      url: "./",
      siteName: localizedMeta.title,
      images: image ? [image] : [siteMetadata.socialBanner],
      locale: localeCode,
      type: "website",
    },
    twitter: {
      title: `${pageTitle} | ${localizedMeta.title}`,
      card: "summary_large_image",
      images: image ? [image] : [siteMetadata.socialBanner],
    },
    alternates: {
      canonical: `${siteMetadata.siteUrl}/${locale}`,
      languages: {
        "en-US": `${siteMetadata.siteUrl}/en`,
        "zh-CN": `${siteMetadata.siteUrl}/zh`,
      },
    },
    ...rest,
  };
}
