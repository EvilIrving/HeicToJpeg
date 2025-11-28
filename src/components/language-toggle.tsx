"use client";
import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  Locale,
  localeNames,
  locales,
} from "@/i18n.config";

const LOCALE_COOKIE = "NEXT_LOCALE";

const LanguageToggle = ({ locale }: { locale: Locale }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const changeLocale = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const newLocale = target.dataset["locale"] as Locale;
    
    if (newLocale && newLocale !== locale) {
      // 设置 cookie 保存用户选择
      document.cookie = `${LOCALE_COOKIE}=${newLocale}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
      
      // 获取当前路径（移除语言前缀）
      const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
      
      // 重定向到新语言的路径，并强制刷新页面
      window.location.href = `/${newLocale}${pathWithoutLocale}`;
    }
  };
  return (
    <div
      className="relative inline-block py-4 text-left"
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
    >
      <button className="flex items-center text-foreground transition-colors duration-300 hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded-md">
        <Image
          src="/icons/language.svg"
          width={20}
          height={20}
          alt="Language"
        />
        <Image
          src="/icons/chevron-down.svg"
          className="pl-1"
          width={16}
          height={16}
          alt="Language"
        />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 z-10 mt-2 w-32 rounded-md border border-border bg-popover text-popover-foreground shadow-lg transition-all duration-200">
          <ul className="mx-2 py-2" role="select">
            {locales.map((lang) => (
              <li
                onClick={changeLocale}
                data-locale={lang}
                role="option"
                key={lang}
                aria-selected={lang === locale}
                className={clsx(
                  "block rounded px-4 py-2 text-sm transition-colors duration-200",
                  lang === locale
                    ? "pointer-events-none bg-primary text-primary-foreground cursor-default"
                    : "cursor-pointer hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {localeNames[lang]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;
