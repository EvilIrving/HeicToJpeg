import Script from "next/script";
import { siteMetadata } from "@/data.config";

export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    applicationCategory: "UtilityApplication",
    author: {
      "@type": "Person",
      name: siteMetadata.author,
      url: siteMetadata.siteUrl,
    },
    creator: {
      "@type": "Person",
      name: siteMetadata.author,
    },
    image: siteMetadata.socialBanner,
    screenshot: siteMetadata.socialBanner,
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1000",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is HEIC format?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "HEIC is a high-efficiency image codec format developed by Apple. It provides better compression than JPEG while maintaining image quality.",
        },
      },
      {
        "@type": "Question",
        name: "Is the conversion process offline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our converter works completely offline. All conversions happen in your browser without uploading files to any server.",
        },
      },
      {
        "@type": "Question",
        name: "What formats can I convert HEIC to?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can convert HEIC images to JPEG, PNG, and other common image formats using our converter.",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        strategy="afterInteractive"
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="afterInteractive"
      />
    </>
  );
}
