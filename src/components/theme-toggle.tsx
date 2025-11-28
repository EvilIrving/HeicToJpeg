"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [enabled, setEnabled] = useState(theme === "dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setEnabled(theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setEnabled(!enabled);
  };

  // 防止水化不匹配
  if (!mounted) {
    return (
      <div className="relative h-9 w-16 rounded-full bg-muted" />
    );
  }

  return (
    <button
      role="switch"
      aria-checked={enabled}
      aria-label={enabled ? "切换到亮色模式" : "切换到暗色模式"}
      onClick={toggleTheme}
      className="group relative flex h-9 w-16 items-center rounded-full border-2 border-border bg-muted p-1 transition-all duration-300 ease-in-out hover:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
    >
      {/* 背景渐变 */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-500 ease-in-out ${
          enabled
            ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            : "bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-300"
        }`}
      />
      
      {/* 滑动按钮 */}
      <span
        className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-500 ease-in-out ${
          enabled ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {enabled ? (
          <MoonIcon className="h-4 w-4 text-indigo-600" />
        ) : (
          <SunIcon className="h-4 w-4 text-amber-600" />
        )}
      </span>

      {/* 星星装饰 (暗色模式) */}
      {enabled && (
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute left-2 top-2 h-1 w-1 animate-pulse rounded-full bg-white opacity-75" />
          <span className="absolute right-3 top-3 h-0.5 w-0.5 animate-pulse rounded-full bg-white opacity-60" style={{ animationDelay: "0.5s" }} />
          <span className="absolute left-4 bottom-2 h-0.5 w-0.5 animate-pulse rounded-full bg-white opacity-80" style={{ animationDelay: "1s" }} />
        </div>
      )}
    </button>
  );
}
