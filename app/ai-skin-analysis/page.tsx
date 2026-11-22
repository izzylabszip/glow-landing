import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/JsonLd'
import { APP_URL, SITE_URL, pageMeta, breadcrumb } from '@/lib/site'

export const metadata: Metadata = pageMeta({
  title: 'Free AI Skin Analysis: Scan Your Skin From a Selfie',
  description:
    'Free AI skin analysis from one selfie: redness, texture, pores, fine lines, dark spots, blemishes and shine, zone by zone, with heatmaps and progress over time.',
  path: '/ai-skin-analysis',
})

const MEASURES: [string, string][] = [
  ['Redness', 'Where skin is flushed or irritated compared with the rest of your face.'],
  ['Texture', 'How smooth the skin surface is, zone by zone.'],
  ['Pores', 'How visible pores are on the nose and cheeks, on sharp photos.'],
  ['Fine lines', 'Lines on the forehead, around the eyes and smile lines.'],
  ['Dark spots', 'Flat brown marks such as sun spots and post-acne marks.'],
  ['Blemishes', 'Raised or red spots, marked only when the scan is confident.'],
  ['Shine', 'Oily areas, measured against the light on your eyes so skin tone does not skew it.'],
  ['Dryness', 'Dull, flaky-looking areas.'],
]

const FAQS = [
  { q: 'Is the AI skin analysis free?', a: 'Yes. The skin scan in Gloww’s My Space is free.' },
  { q: 'Is it a medical diagnosis?', a: 'No. It is a beauty and skincare guide from a photo. For any skin concern that worries you, see a dermatologist.' },
  { q: 'How accurate is it?', a: 'It is built to be consistent: the same face in similar light gets the same scores, so changes over time mean something. It only marks spots it is confident about, and it tells you to retake a photo that is too dark, blurry or turned.' },
  { q: 'What happens to my photo?', a: 'It is used to give you your results. You can delete any scan or your account in the app. Photos only help improve the scan if you turn that on yourself.' },
  { q: 'Does it work on every skin tone?', a: 'It measures each face against its own skin, not a fixed colour, and is checked across light, medium and deep skin tones.' },
]

export default function SkinAnalysisPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              name: 'Free AI skin analysis',
              url: `${SITE_URL}/ai-skin-analysis`,
              description: 'Free AI skin analysis from a selfie, with heatmaps and progress over time.',
              publisher: { '@id': `${SITE_URL}/#org` },
            },
            breadcrumb('AI skin analysis', '/ai-skin-analysis'),
            { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
          ],
        }}
      />
      <Navbar />
      <main>
        <section className="svc-hero">
          <div className="wrap svc-hero-grid">
            <div>
              <p className="kicker">My Space · Free</p>
              <h1 className="display">AI skin analysis, <em>from one selfie.</em></h1>
              <p className="lead">
                Take a selfie in good light. Gloww maps your face zone by zone, scores eight skin concerns, draws a heatmap of where it sees them, and
                saves each scan so you can watch your skin change.
              </p>
              <div className="cta-row">
                <a href={APP_URL} className="btn btn-rose btn-lg">Scan my skin, free</a>
                <Link href="/services" className="btn btn-ghost btn-lg">Book an artist</Link>
              </div>
            </div>
            <div className="arch svc-photo svc-photo-phone">
              <Image src="/services/skin-analysis.webp" alt="A phone showing a skin scan: marked blemishes, dark spots and pores, an 87 out of 100 score and personalised tips" fill priority sizes="(max-width: 980px) 90vw, 440px" quality={90} />
            </div>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: 72 }}>
          <div className="wrap">
            <div className="sec-title">
              <p className="kicker">What it measures</p>
              <h2 className="display-2">Eight concerns, <em>zone by zone.</em></h2>
            </div>
            <dl className="measure-grid">
              {MEASURES.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </div>
        </section>

        <section className="sec scan" style={{ paddingTop: 72 }}>
          <div className="wrap svc-body">
            <article className="article prose-page" style={{ padding: 0 }}>
              <h2>How it works</h2>
              <ol>
                <li>Hold your phone at eye level in even light, face inside the oval.</li>
                <li>The app checks the photo first: face size, angle, light and sharpness.</li>
                <li>Gloww’s own skin engine measures each zone (forehead, cheeks, nose, chin, under the eyes) against your own skin.</li>
                <li>You get scores, a short reading and a heatmap per concern. Scan again next week to compare.</li>
              </ol>
              <h2>Tips for a good scan</h2>
              <ul>
                <li>Face a window or a soft light; avoid strong light from one side.</li>
                <li>No glasses, hair off the forehead, no fresh makeup.</li>
                <li>A neutral expression: smiling and squinting add lines.</li>
              </ul>
              <h2>Questions</h2>
              <div className="faq" style={{ margin: 0 }}>
                {FAQS.map(f => (
                  <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
                ))}
              </div>
            </article>
            <aside className="svc-aside">
              <p className="kicker">Then book</p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginBottom: 20 }}>A facial, threading or a makeup artist who knows how to prep your skin.</p>
              <ul className="svc-links">
                <li><Link href="/services/bridal-makeup">Bridal makeup</Link></li>
                <li><Link href="/services/party-makeup">Party makeup</Link></li>
                <li><Link href="/blog/skin-type-test">Skin type test: at home or from a photo</Link></li>
                <li><Link href="/blog/winter-skin-care">Winter skin care guide</Link></li>
              </ul>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
