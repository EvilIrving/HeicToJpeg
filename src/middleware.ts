import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { type Locale, locales } from "./i18n.config";

const LOCALE_COOKIE = "NEXT_LOCALE";

const defaultMiddleware = createMiddleware({
  defaultLocale: "zh",
  locales,
  localePrefix: "always",
  localeDetection: true,
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 检查是否已经包含语言前缀
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // 获取用户配置的语言（cookie优先）
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value as Locale | undefined;
  
  // 获取浏览器语言偏好
  const acceptLanguage = request.headers.get("accept-language");
  let browserLocale: Locale | undefined;
  
  if (acceptLanguage) {
    // 解析 Accept-Language 头
    const languages = acceptLanguage.split(",").map((lang: string) => {
      const [code] = lang.trim().split(";");
      return code.split("-")[0]; // 取主语言代码
    });
    
    // 找到第一个匹配的语言
    browserLocale = languages.find((lang: string) => 
      locales.includes(lang as Locale)
    ) as Locale | undefined;
  }
  
  // 优先级：cookie > 浏览器语言 > 默认语言
  const preferredLocale = cookieLocale || browserLocale || "zh";
  
  // 如果路径没有语言前缀，重定向到优先语言
  if (!pathnameHasLocale) {
    const newUrl = new URL(`/${preferredLocale}${pathname}`, request.url);
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl);
  }
  
  const response = defaultMiddleware(request);
  
  // 从路径中提取当前语言并保存到 cookie
  const currentLocale = pathname.split("/")[1] as Locale;
  if (locales.includes(currentLocale)) {
    response.cookies.set(LOCALE_COOKIE, currentLocale, {
      maxAge: 365 * 24 * 60 * 60, // 1年
      path: "/",
      sameSite: "lax",
    });
  }
  
  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
