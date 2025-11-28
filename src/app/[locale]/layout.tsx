import "@/app/globals.css";

import { NextUIProvider } from "@nextui-org/system";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { GoogleAnalytics } from "@/analytics";
import StructuredData from "@/components/StructuredData";
import Header from "@/components/header";
import { type Locale, locales } from "@/i18n.config";
import { siteMetadata } from "@/data.config";

const inter = Inter({ subsets: ["latin"] });

// 为搜索引擎生成所有可能的语言路由
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 动态生成基于 locale 的 metadata
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const localeKey = locale === "zh" ? "zh-CN" : "en-US";
  const translation = siteMetadata.translations[localeKey];
  const localeCode = locale === "zh" ? "zh_CN" : "en_US";
  const currentUrl = `${siteMetadata.siteUrl}/${locale}`;
  
  return {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
      default: translation.title,
      template: `%s | ${translation.title}`,
    },
    description: translation.description,
    keywords: siteMetadata.keywords || [],
    authors: [{ name: siteMetadata.author }],
    creator: siteMetadata.author,
    openGraph: {
      title: translation.title,
      description: translation.description,
      url: currentUrl,
      siteName: translation.title,
      images: [
        {
          url: siteMetadata.socialBanner,
          width: 1200,
          height: 630,
          alt: translation.title,
          type: "image/png",
        },
      ],
      locale: localeCode,
      type: "website",
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        "en-US": `${siteMetadata.siteUrl}/en`,
        "zh-CN": `${siteMetadata.siteUrl}/zh`,
      },
      types: {
        "application/rss+xml": `${siteMetadata.siteUrl}/feed.xml`,
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: translation.title,
      description: translation.description,
      images: [siteMetadata.socialBanner],
      creator: "@Losewings",
    },
    verification: {
      google: "YOUR_GOOGLE_SITE_VERIFICATION",
    },
    other: {
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
    },
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body
        className={`${inter.className} flex min-h-screen flex-col antialiased dark:bg-background`}
      >
        <StructuredData />
        <GoogleAnalytics trackingId={"G-H8B2S3ZDV2"} />
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="92bec6d5-24ed-46d5-beec-ed7eb85b88a0"
        ></Script>
        <NextUIProvider>
          <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider messages={messages}>
              <Header />
              <main className="flex-1">
                <div className="mx-auto w-full max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
                  {children}
                </div>
              </main>
            </NextIntlClientProvider>
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
