import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/JsonLd'
import { breadcrumb, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_TEL, pageMeta } from '@/lib/site'

export const metadata: Metadata = pageMeta({
  title: 'Terms of Service',
  description: 'The terms for using Glow to book beauty artists, join as an artist and use the My Space skin scan.',
  path: '/terms',
})

const UPDATED = '24 October 2026'

export default function TermsPage() {
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', ...breadcrumb('Terms of Service', '/terms') }} />
      <Navbar />
      <main className="prose-page">
        <div className="wrap-tight" style={{ maxWidth: 820 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}><span className="dot" />Legal</div>
          <h1>Terms of Service</h1>
          <p className="mono-label" style={{ marginBottom: 28 }}>Last updated {UPDATED}</p>

          <p>
            These terms apply when you use the Glow app or website (&ldquo;Glow&rdquo;). By creating an account or booking
            through Glow you agree to them and to our <Link href="/privacy">Privacy Policy</Link>.
          </p>

          <h2>1. What Glow is</h2>
          <p>
            Glow is a platform that connects clients with independent beauty artists (&ldquo;Artists&rdquo;) for makeup, hair,
            mehendi, nails, threading, waxing and similar services. Artists are not Glow employees. Each Artist is
            responsible for the services they provide.
          </p>

          <h2>2. Your account</h2>
          <ul>
            <li>You must be 16 or older and give accurate details.</li>
            <li>Keep your account secure. You are responsible for what happens under it.</li>
            <li>We may suspend accounts that break these terms or put others at risk.</li>
          </ul>

          <h2>3. Bookings and prices</h2>
          <ul>
            <li>Artists set their own prices. You see the price before you confirm a booking.</li>
            <li>A booking is confirmed when the Artist accepts it.</li>
            <li>For home visits, give an accurate address and be available at the booked time.</li>
          </ul>

          <h2>4. Cancellations and refunds</h2>
          <ul>
            <li>You can cancel a booking in the app until the service has started.</li>
            <li>If you cancel before the service starts, any payment made through Glow for that booking is refunded.</li>
            <li>If something went wrong with a service, email us within 7 days and we will review it with the Artist.</li>
          </ul>

          <h2>5. For Artists</h2>
          <ul>
            <li>Give true information and documents, and keep your services, prices and availability up to date.</li>
            <li>Only offer services you are trained to provide, and follow good hygiene and safety practice.</li>
            <li>Treat clients with respect, and keep their personal details private.</li>
            <li>Glow may approve, decline or remove an Artist profile.</li>
          </ul>

          <h2>6. The My Space skin scan</h2>
          <p>
            The skin scan gives cosmetic and skincare guidance from a photo. It is not a medical device and does not
            diagnose, treat or prevent any condition. Results depend on the photo and lighting and may be wrong. For any
            skin concern, see a doctor or dermatologist.
          </p>

          <h2>7. Content you post</h2>
          <p>
            You keep ownership of the photos, reviews and posts you add. You allow Glow to show them in the app and on our
            website to run the service. Do not post anything that is unlawful, misleading, or that you do not have the
            right to share. We may remove content that breaks these terms.
          </p>

          <h2>8. Acceptable use</h2>
          <p>Do not misuse Glow: no harassment, fraud, fake reviews, taking bookings off the platform to avoid fees, or attempts to break or scrape the service.</p>

          <h2>9. Liability</h2>
          <p>
            Glow is provided as it is. To the extent the law allows, Glow is not liable for the services Artists provide,
            or for indirect losses. Nothing in these terms limits rights you have under the law that cannot be limited.
          </p>

          <h2>10. Changes and law</h2>
          <p>
            We may update these terms and will tell you in the app before important changes take effect. These terms are
            governed by the laws of Nepal.
          </p>

          <h2>11. Contact</h2>
          <p>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> · <a href={CONTACT_TEL}>{CONTACT_PHONE}</a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
