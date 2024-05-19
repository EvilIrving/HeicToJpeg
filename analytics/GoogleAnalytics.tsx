import Script from 'next/script'
import React from 'react'

export interface Props {
  trackingId: string
}

export default function GoogleAnalytics({ trackingId }: Props) {
  return (
    <>
      <Script
        data-testid={'gtag'}
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
        strategy="afterInteractive"
      />
      <Script
        data-testid={'gtagSetup'}
        strategy="afterInteractive"
      >{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}');
        `}</Script>
    </>
  )
}
