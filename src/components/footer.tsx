import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");
  return (
    <footer className="border-t border-border bg-card py-8 transition-colors duration-300">
      <div className="container mx-auto flex flex-col items-center justify-center gap-2 sm:flex-row">
        <p className="text-sm text-muted-foreground sm:mr-2">
          {t("contact")}
        </p>
        <div className="flex gap-3">
          <a
            href="https://twitter.com/@LoseWings"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {t("twitter")}
          </a>
          <a
            href="https://t.me/noncain"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {t("telegram")}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
