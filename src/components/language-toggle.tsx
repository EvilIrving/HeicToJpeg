"use client";
import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";

import {
  Locale,
  localeNames,
  locales,
  usePathname,
  useRouter,
} from "@/i18n.config";

const LanguageToggle = ({ locale }: { locale: Locale }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const changeLocale = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const code = target.dataset["locale"] as Locale;
    router.replace(pathname, { locale: code });
  };
  return (
    <div
      className="relative inline-block py-4 text-left"
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
    >
      <button className="flex items-center text-white transition-colors duration-300 hover:text-gray-400 focus:outline-none">
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
        <div className="absolute right-0 z-10 mt-2 w-32 rounded-md bg-slate-50 text-black shadow-lg dark:bg-slate-800 dark:text-white">
          <ul className="mx-2 py-2" role="select">
            {locales.map((lang) => (
              <li
                onClick={changeLocale}
                data-locale={lang}
                role="option"
                key={lang}
                aria-selected={lang === locale}
                className={clsx(
                  "block rounded px-4 py-2 text-sm",
                  lang === locale
                    ? "pointer-events-none cursor-pointer"
                    : "cursor-pointer hover:bg-gray-200 hover:text-primary dark:bg-slate-700"
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
