import React from "react";
import Script from "next/script";

export interface Props {
  trackingId: string;
}

export default function GoogleAnalytics({ trackingId }: Props) {
  return (
    <>
      <Script
        data-testid={"gtag"}
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        data-testid={"gtagSetup"}
        strategy="afterInteractive"
      >{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}', {
            'page_path': window.location.pathname,
            'send_page_view': true,
            'anonymize_ip': true,
            'allow_google_signals': false,
          });
          
          // Track Web Vitals
          window.addEventListener('web-vital', (e) => {
            gtag('event', e.detail.name, {
              'value': Math.round(e.detail.value),
              'event_category': 'web_vitals',
              'event_label': e.detail.id,
              'non_interaction': true,
            });
          });
        `}</Script>
    </>
  );
}
