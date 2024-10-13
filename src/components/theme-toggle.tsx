"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [enabled, setEnabled] = useState(theme === "dark");
  useEffect(() => {
    setEnabled(theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setEnabled(!enabled);
  };
  return (
    <button
      role="switch"
      aria-checked={enabled}
      onClick={toggleTheme}
      className="transition-border-color duration-250 relative block h-6 w-12 shrink-0 rounded-full border border-gray-50 bg-gray-100 px-2 py-1 outline-none ease-in-out hover:border-primary dark:border-gray-600 dark:bg-gray-800"
    >
      <span className="box-shadow-sm absolute left-2 top-1 size-6 rounded-full transition-translate-x duration-500 ease-in-out dark:translate-x-4">
        {enabled ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}
