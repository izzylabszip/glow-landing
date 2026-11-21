import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/JsonLd'
import type { Metadata } from 'next'
import { breadcrumb, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_TEL, pageMeta } from '@/lib/site'

export const metadata: Metadata = pageMeta({
  title: 'Glow support: bookings, payments and skin scans',
  description: 'Help with Glow: booking an artist, cancelling, refunds, deleting your account, the skin scan and joining as an artist.',
  path: '/support',
})

const faqs = [
  {
    q: 'How do I book an artist?',
    a: 'Open the Glow app, pick a service (makeup, hair, nails, mehendi and more), choose Now or Schedule, then pick an artist from their work and reviews and confirm. You can chat with the artist and track their arrival on the day.',
  },
  {
    q: 'How much does it cost?',
    a: 'Each artist sets their own prices, and you see the full price for every service before you confirm a booking.',
  },
  {
    q: 'How do I cancel a booking?',
    a: 'Open the booking in the app and tap Cancel. See our Terms of Service for the cancellation and refund policy.',
  },
  {
    q: 'How do I get a refund?',
    a: 'If a booking was cancelled or something went wrong, email support with your booking details and we will review it.',
  },
  {
    q: 'Are artists verified?',
    a: 'Yes. Every artist submits identity and professional documents, and our team reviews them before the profile is approved and shown to clients.',
  },
  {
    q: 'How do I delete my account?',
    a: 'In the app, go to Profile, scroll to the bottom and tap Delete Account. Your personal data, including any skin scan photos, is removed as described in our Privacy Policy.',
  },
  {
    q: 'I am an artist — how do I join?',
    a: 'Open Glow at app.gloww.dev, sign up as an artist, then add your services and prices, your work, and your documents. Our team reviews and approves new artists.',
  },
  {
    q: 'Is the skin scan a medical diagnosis?',
    a: 'No. My Space gives cosmetic guidance from a photo. For any skin concern that worries you, see a dermatologist.',
  },
]

export default function SupportPage() {
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', ...breadcrumb('Support', '/support') }} />
      <Navbar />
      <main className="prose-page">
        <div className="wrap-tight" style={{ maxWidth: 820 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}><span className="dot" />Help</div>
          <h1>Support &amp; questions</h1>
          <p style={{ marginBottom: 28 }}>
            Questions about a booking, your account or joining as an artist? Start with the answers below, email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or call <a href={CONTACT_TEL}>{CONTACT_PHONE}</a>.
          </p>
          {faqs.map(f => (
            <section key={f.q}>
              <h2>{f.q}</h2>
              <p>{f.a}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
