"use client";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

import LanguageToggle from "./language-toggle";
import { ModeToggle } from "./theme-toggle";

import { Locale } from "@/i18n.config";

const Header = () => {
  const locale = useLocale() as Locale;

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 100); // 调整阈值
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`top-0 z-50 flex w-full items-center ${
        isScrolled
          ? "shadow-sticky bg-white/80 backdrop-blur-sm dark:bg-slate-800/80"
          : "bg-transparent dark:bg-transparent"
      }`}
    >
      <div className="container max-w-[1430px]">
        <h1 className="absolute left-1/2 -translate-x-1/2 pt-4 text-center text-2xl font-extrabold tracking-tight lg:text-3xl">
          HEIC/HEIF Simple, Free, and Offline Converter
        </h1>
        <div className="relative -mx-4 flex items-center justify-between">
          <div></div>

          <div className="flex w-32 items-center justify-around py-4">
            <ModeToggle />

            {/* <LanguageToggle locale={locale} /> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
