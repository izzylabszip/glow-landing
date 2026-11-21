import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/JsonLd'
import { breadcrumb, pageMeta, pexels } from '@/lib/site'
import { SERVICES } from '@/lib/services'

export const metadata: Metadata = pageMeta({
  title: 'Beauty services: makeup, hair, mehendi and nails',
  description: 'Book bridal and party makeup, hair styling, mehendi and nails with artists near you, at home or in their studio. Guides to choosing and booking each one.',
  path: '/services',
})

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', ...breadcrumb('Services', '/services') }} />
      <Navbar />
      <main className="sec" style={{ paddingTop: 48 }}>
        <div className="wrap">
          <div className="sec-title">
            <p className="kicker">Services</p>
            <h1 className="display-2">Every look, <em>one app.</em></h1>
            <p className="lead">Choose a service to see how to pick the right artist, what to plan, and common questions.</p>
          </div>
          <div className="looks">
            {SERVICES.map(s => (
              <div key={s.slug} className="look look-tall">
                <Link href={`/services/${s.slug}`} aria-label={s.name}>
                  <Image src={pexels(s.photo, 700)} alt={s.photoAlt} fill sizes="(max-width: 640px) 50vw, 300px" />
                  <span className="look-label"><small>{s.kicker}</small>{s.name}</span>
                </Link>
              </div>
            ))}
            <div className="look look-tall">
              <Link href="/ai-skin-analysis" aria-label="AI skin analysis">
                <Image src={pexels('6811012', 700)} alt="Woman checking her skin" fill sizes="(max-width: 640px) 50vw, 300px" />
                <span className="look-label"><small>Free</small>AI skin analysis</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
