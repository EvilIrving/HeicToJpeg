import { notFound } from "next/navigation";
import { Formats } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { type Locale, locales } from "./i18n.config";

function formatsFor(locale: Locale): Partial<Formats> {
  const localeFormats: Record<Locale, Partial<Formats>> = {
    zh: {
      number: {
        temperature: {
          style: "unit",
          unit: "celsius",
        },
      },
      dateTime: {
        longDay: {
          weekday: "long",
        },
      },
    },
    en: {
      number: {
        temperature: {
          style: "unit",
          unit: "fahrenheit",
        },
      },
      dateTime: {
        longDay: {
          weekday: "long",
        },
      },
    },
  };

  return localeFormats[locale];
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) {
    return notFound();
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    formats: {
      ...formatsFor(locale as Locale),
    },
  };
});
