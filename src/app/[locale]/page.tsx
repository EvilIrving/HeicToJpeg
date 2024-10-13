import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import FAQ from "@/components/faq/page";
import Footer from "@/components/footer";

const Main = dynamic(() => import("../../components/element/Main"), {
  ssr: false,
});
export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <main className="mx-auto mt-4 max-w-4xl">
      <Main />
      <FAQ />
      <Footer />
    </main>
  );
}
