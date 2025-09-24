import { Suspense } from "react";
import { useTranslations } from "next-intl";

import FAQ from "@/components/faq/page";
import Footer from "@/components/footer";
import Main from "@/components/element/Main";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <main className="mx-auto mt-4 max-w-4xl">
      <Suspense
        fallback={
          <div className="space-y-4">
            <div className="h-48 w-full animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
            <div className="h-6 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        }
      >
        <Main />
      </Suspense>
      <FAQ />
      <Footer />
    </main>
  );
}
