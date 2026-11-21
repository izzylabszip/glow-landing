import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/JsonLd'
import { breadcrumb, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_TEL, pageMeta } from '@/lib/site'

export const metadata: Metadata = pageMeta({
  title: 'Privacy Policy',
  description: 'What Gloww collects, including skin scan photos, how it is used and shared, and how to delete it.',
  path: '/privacy',
})

const UPDATED = '24 October 2026'

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', ...breadcrumb('Privacy Policy', '/privacy') }} />
      <Navbar />
      <main className="prose-page">
        <div className="wrap-tight" style={{ maxWidth: 820 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}><span className="dot" />Legal</div>
          <h1>Privacy Policy</h1>
          <p className="mono-label" style={{ marginBottom: 28 }}>Last updated {UPDATED}</p>

          <p>
            Gloww (&ldquo;we&rdquo;) runs the Gloww app and website at gloww.dev and app.gloww.dev. Gloww lets clients book
            independent beauty artists (&ldquo;Artists&rdquo;) and use My Space, an AI skin scan. This policy explains, in
            plain language, what we collect, why, who we share it with and the choices you have.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li><b>Account details:</b> your name, phone number, and email if you sign in with Apple or Google.</li>
            <li><b>Profile and bookings:</b> services you book, dates, addresses you give for home visits, messages with Artists, reviews and favourites.</li>
            <li><b>Location:</b> your device location, only if you allow it, to show Artists near you and, during a booking, to help the Artist find you.</li>
            <li><b>Skin scan photos and results:</b> the selfies you take in My Space and the scores, heatmaps and marks we produce from them.</li>
            <li><b>Artist information:</b> for Artists, the documents, portfolio photos, services, prices and payout details needed to verify and pay them.</li>
            <li><b>Payments:</b> processed by our payment provider. We do not store full card numbers.</li>
            <li><b>Device and usage data:</b> app version, crash reports and basic usage, used to fix problems.</li>
          </ul>

          <h2>How we use it</h2>
          <ul>
            <li>To run your account, bookings, messages and payments</li>
            <li>To check Artists before they can take bookings</li>
            <li>To produce your skin scan results and keep your scan history</li>
            <li>To send booking updates and, if you allow it, notifications</li>
            <li>To keep Gloww safe, prevent fraud and fix errors</li>
          </ul>
          <p>We do not sell your personal information.</p>

          <h2>Skin scan photos</h2>
          <ul>
            <li>Your scan photo is analysed to give you your results. Results describe the look of your skin; they are not a medical diagnosis.</li>
            <li>To write the plain-language summary of your scan, the photo may be sent to Google&rsquo;s Gemini AI service.</li>
            <li>We use your scan photos to improve the scan <b>only if you turn on &ldquo;Help improve Gloww&rsquo;s skin analysis&rdquo;</b> in My Space. You can turn it off at any time, and from then on your past scans are no longer used either.</li>
            <li>You can delete any scan in My Space. Deleting a scan removes its photo and results.</li>
            <li>We never use scan photos to identify you to anyone else, and we do not use them for advertising.</li>
          </ul>

          <h2>Who we share it with</h2>
          <ul>
            <li><b>Artists you book:</b> your name, booking details, the address for a home visit and your messages.</li>
            <li><b>Service providers that run Gloww for us:</b> hosting (Railway, Vercel), file storage, text-message sign-in codes (Twilio), payments (Stripe), push notifications (Expo), crash reports (Sentry), maps (OpenStreetMap) and AI summaries (Google Gemini). They may only use the data to provide their service to us.</li>
            <li><b>When the law requires it,</b> or to protect the safety of a user or the public.</li>
          </ul>
          <p>Some of these providers store data outside the country you live in.</p>

          <h2>Public Artist profiles</h2>
          <p>
            Approved Artists can be shown publicly by first name and last initial, with their photo, services, prices and
            rating. Artists can switch this off in their profile. We never show an Artist&rsquo;s phone number, documents or
            exact location publicly.
          </p>

          <h2>How long we keep it</h2>
          <p>
            We keep your data while your account is open. When you delete your account in the app (Profile, then Delete
            Account), we remove your personal details and scan photos. We keep a minimal record of past bookings and
            payments where the law or resolving a dispute requires it.
          </p>

          <h2>Your choices</h2>
          <ul>
            <li>See and update your profile in the app</li>
            <li>Turn location, notifications and &ldquo;Help improve Gloww&rsquo;s skin analysis&rdquo; on or off</li>
            <li>Delete scans, or your whole account, in the app</li>
            <li>Email us to ask for a copy of your data or to correct it</li>
          </ul>

          <h2>Children</h2>
          <p>Gloww is for people aged 16 and over. We do not knowingly collect data from younger children.</p>

          <h2>Security</h2>
          <p>
            We use encrypted connections, access controls and limited staff access. No system is perfectly secure, so
            please tell us straight away if you think your account has been misused.
          </p>

          <h2>Changes</h2>
          <p>If we change this policy in a way that matters, we will tell you in the app before it takes effect.</p>

          <h2>Contact</h2>
          <p>
            Questions or requests: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> · <a href={CONTACT_TEL}>{CONTACT_PHONE}</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
