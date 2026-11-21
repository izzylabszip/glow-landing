import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Plus_Jakarta_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import JsonLd from '@/components/JsonLd'
import { APP_URL, CONTACT_EMAIL, CONTACT_TEL, DESCRIPTION, SITE_URL, TITLE } from '@/lib/site'
import './globals.css'

const sans = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'], variable: '--font-sans', display: 'swap' })
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-mono', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s | Gloww',
  },
  description: DESCRIPTION,
  applicationName: 'Gloww',
  // Canonical, og and twitter tags are per page (lib/site.ts pageMeta): pages
  // inherit layout metadata, so site-wide values would point every page at
  // the homepage.
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
}

export const viewport: Viewport = { themeColor: '#FBF6F3' }

const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#org`,
      name: 'Gloww',
      url: SITE_URL,
      description: 'Book verified makeup, hair, nail and mehendi artists, at home or in-studio. Plus a free AI skin scan that tracks redness, pores and spots over time.',
      logo: `${SITE_URL}/icon.png`,
      email: CONTACT_EMAIL,
      telephone: CONTACT_TEL.slice(4),
      contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: CONTACT_EMAIL, telephone: CONTACT_TEL.slice(4) },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'Gloww',
      url: SITE_URL,
      publisher: { '@id': `${SITE_URL}/#org` },
      inLanguage: 'en',
    },
    {
      '@type': 'WebApplication',
      name: 'Gloww',
      url: APP_URL,
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@id': `${SITE_URL}/#org` },
    },
  ],
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <JsonLd data={siteSchema} />
        {children}
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
