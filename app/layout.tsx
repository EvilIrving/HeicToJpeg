import '@/style/global.css'

import { inter } from '@/font/fonts'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { Metadata } from 'next'
import { GoogleAnalytics } from '@/analytics/index'
import { ThemeProvider } from 'next-themes'
import { NextUIProvider } from '@nextui-org/react'

import Header from '@/components/Header'
// import type GoogleAnalyticsProps from '@/analytics/index'
export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteMetadata.language}>
      <body className={`${inter.className} antialiased mx-4 sm:mx-40`}>
        <NextUIProvider>
          <ThemeProvider>
            <Header />
            <GoogleAnalytics trackingId={'G-H8B2S3ZDV2'} />
            <main className='mx-auto max-w-3xl'> {children}</main>
            <Footer />
          </ThemeProvider>
        </NextUIProvider>
      </body>
    </html>
  )
}
