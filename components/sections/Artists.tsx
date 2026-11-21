import Image from 'next/image'
import { APP_URL } from '@/lib/site'
import './artists.css'

const ALT = 'A makeup artist brushing blush onto a bride’s cheek in a softly lit studio, with pink flowers in the foreground.'

const CHIPS = [
  { label: 'Get verified once', icon: <path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7L12 3z" /> },
  { label: 'Set your own hours', icon: <><rect x="4" y="5" width="16" height="15" rx="2.5" /><path d="M4 10h16M9 3v4M15 3v4" /></> },
  { label: 'Paid securely', icon: <><path d="M12 3l7 3v5.5c0 4.4-2.9 8.1-7 9.5-4.1-1.4-7-5.1-7-9.5V6l7-3z" /><path d="M9 12l2.2 2.2L15.5 10" /></> },
]

/**
 * "For beauty artists". The picture (public/artists) is the pink silk, petals, blossoms and the arch photo; the words,
 * button and chips are live text over it on desktop, and sit under the arch photo on small screens.
 */
export default function Artists() {
  return (
    <section id="artists" className="art-sec" aria-labelledby="art-title">
      <div className="art-wrap">
        <Image className="art-img art-img-wide" src="/artists/pink-art.webp" alt={ALT} width={1672} height={941} sizes="100vw" quality={90} />
        <Image className="art-img art-img-arch" src="/artists/pink-arch.webp" alt={ALT} width={892} height={941} sizes="100vw" quality={88} />

        <div className="art-copy">
          <p className="art-kicker"><span>For beauty artists</span><i aria-hidden="true" /></p>
          <h2 className="art-h2" id="art-title">Your talent, <em>fully booked.</em></h2>
          <p className="art-lead">
            Makeup artists, hairstylists, nail techs and mehendi artists: show your work, set your own prices and hours,
            and get booked by clients near you. <strong>Get verified once</strong> and start taking bookings.
          </p>
          <a href={APP_URL} className="art-btn">
            <svg className="art-btn-star" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" /></svg>
            <span>Join as an artist</span>
            <span className="art-btn-go" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </a>
          <ul className="art-chips">
            {CHIPS.map(c => (
              <li key={c.label}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{c.icon}</svg>
                <span>{c.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
