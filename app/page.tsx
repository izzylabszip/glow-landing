import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Looks from '@/components/sections/Looks'
import SkinScan from '@/components/sections/SkinScan'
import Artists from '@/components/sections/Artists'
import FAQ from '@/components/sections/FAQ'
import FinalCTA from '@/components/sections/FinalCTA'
import JsonLd from '@/components/JsonLd'
import { FAQS } from '@/lib/faq'
import { DESCRIPTION, pageMeta } from '@/lib/site'

export const metadata: Metadata = pageMeta({ description: DESCRIPTION, path: '/' })

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQS.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        }}
      />
      <Navbar />
      <main>
        <Hero />
        <Looks />
        <SkinScan />
        <Artists />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
