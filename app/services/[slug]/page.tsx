import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/JsonLd'
import { APP_URL, SITE_URL, pageMeta, pexels } from '@/lib/site'
import { SERVICES, serviceBySlug } from '@/lib/services'

interface PageProps {
  params: { slug: string }
}

export const dynamicParams = false

export function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const s = serviceBySlug(params.slug)
  if (!s) return {}
  return pageMeta({ title: s.title, description: s.description, path: `/services/${s.slug}`, image: { url: pexels(s.photo, 1200), alt: s.photoAlt } })
}

export default function ServicePage({ params }: PageProps) {
  const s = serviceBySlug(params.slug)
  if (!s) notFound()
  const url = `${SITE_URL}/services/${s.slug}`
  const others = SERVICES.filter(o => o.slug !== s.slug)

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              name: s.name,
              serviceType: s.name,
              description: s.description,
              url,
              provider: { '@id': `${SITE_URL}/#org` },
              image: pexels(s.photo, 1200),
            },
            {
              '@type': 'FAQPage',
              mainEntity: s.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
                { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
                { '@type': 'ListItem', position: 3, name: s.name, item: url },
              ],
            },
          ],
        }}
      />
      <Navbar />
      <main>
        <section className="svc-hero">
          <div className="wrap svc-hero-grid">
            <div>
              <nav aria-label="Breadcrumb" className="mono-label" style={{ marginBottom: 18 }}>
                <Link href="/">Home</Link> / <Link href="/services">Services</Link>
              </nav>
              <p className="kicker">{s.kicker}</p>
              <h1 className="display">{s.headline} <em>{s.headlineEm}</em></h1>
              <p className="lead">{s.intro}</p>
              <div className="cta-row">
                <a href={APP_URL} className="btn btn-rose btn-lg">Book {s.name.toLowerCase()}</a>
                <Link href="/#skin-scan" className="btn btn-ghost btn-lg">Free skin scan</Link>
              </div>
            </div>
            <div className="arch svc-photo">
              <Image src={pexels(s.photo, 900)} alt={s.photoAlt} fill priority sizes="(max-width: 980px) 90vw, 460px" />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: 72 }}>
          <div className="wrap svc-body">
            <article className="article prose-page" style={{ padding: 0 }}>
              {s.sections.map(sec => (
                <div key={sec.heading}>
                  <h2>{sec.heading}</h2>
                  {sec.body.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              ))}
              <h2>Questions</h2>
              <div className="faq" style={{ margin: 0 }}>
                {s.faqs.map(f => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </article>
            <aside className="svc-aside">
              <p className="kicker">Before you book</p>
              <ul className="pills" style={{ flexDirection: 'column', alignItems: 'flex-start', margin: '0 0 24px' }}>
                {s.checklist.map(c => <li key={c}>✓ {c}</li>)}
              </ul>
              <a href={APP_URL} className="btn btn-ink btn-lg" style={{ width: '100%', justifyContent: 'center' }}>Open Gloww</a>
              <p className="kicker" style={{ marginTop: 36 }}>Other services</p>
              <ul className="svc-links">
                {others.map(o => <li key={o.slug}><Link href={`/services/${o.slug}`}>{o.name}</Link></li>)}
                <li><Link href="/ai-skin-analysis">AI skin analysis</Link></li>
              </ul>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
