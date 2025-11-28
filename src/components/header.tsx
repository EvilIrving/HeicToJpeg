"use client";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";

import LanguageToggle from "./language-toggle";
import { ModeToggle } from "./theme-toggle";

import { Locale } from "@/i18n.config";

const Header = () => {
  const locale = useLocale() as Locale;
  const t = useTranslations("Header");
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const offset = window.scrollY;
    setIsScrolled(offset > 100);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  return (
    <header
      className={clsx(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md shadow-sm supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-center text-lg font-bold tracking-tight sm:text-xl md:text-2xl lg:text-3xl">
            {t("title")}
          </h1>

          <div className="flex items-center justify-center gap-3">
            <LanguageToggle locale={locale} />
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
