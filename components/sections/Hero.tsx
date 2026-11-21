import Image from 'next/image'
import { APP_URL } from '@/lib/site'
import { GlowMark } from '@/components/brand/GlowMark'
import { CalendarIcon } from '@/components/brand/BeautyIcons'
import heroStudio from '@/public/hero-studio.webp'
import heroBanner from '@/public/hero-banner-v3.webp'
import catBridal from '@/public/cats/bridal.webp'
import catMakeup from '@/public/cats/makeup.webp'
import catHair from '@/public/cats/hair.webp'
import catNails from '@/public/cats/nails.webp'
import catMehendi from '@/public/cats/mehendi.webp'

// Solid berry pill: darkens, lifts, tilts its calendar icon and nudges its chevron on hover (styles: .book-btn in globals.css).
function BookButton({ className = '' }: { className?: string }) {
  return (
    <a href={APP_URL} className={`book-btn ${className}`}>
      <CalendarIcon size={20} color="currentColor" className="book-btn-icon" />
      <span>Book an artist</span>
      <svg className="book-btn-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
    </a>
  )
}

// Outline pill with a liquid swipe fill on hover (styles: .skin-btn in globals.css).
function SkinScanButton({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <a href="#skin-scan" className={`skin-btn ${className}`} style={style}>
      <svg className="skin-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3.5" y="8.5" width="17" height="4.5" rx="1" />
        <path d="M5 13v7.5h14V13M12 8.5v12M12 8.5C10.2 8.5 7.5 8 7.5 6A2.2 2.2 0 0 1 9.7 3.8c1.8 0 2.3 2.6 2.3 4.7zM12 8.5c1.8 0 4.5-.5 4.5-2.5a2.2 2.2 0 0 0-2.2-2.2C12.5 3.8 12 6.4 12 8.5z" />
      </svg>
      <span>Try the free skin scan</span>
    </a>
  )
}

// The five categories, in order. Used by both the desktop row and the phone list.
// The illustrated icons are in public/cats (each 153x136, a circle with its lower edge covered by the label pill).
const SERVICES = [
  { label: 'Bridal', href: '/services/bridal-makeup', img: catBridal },
  { label: 'Makeup', href: '/services/party-makeup', img: catMakeup },
  { label: 'Hair', href: '/services/hair-styling', img: catHair },
  { label: 'Nails', href: '/services/nails', img: catNails },
  { label: 'Mehendi', href: '/services/mehendi', img: catMehendi },
]

// Gold leaf sprig for the banner corners (decorative).
function Sprig({ className }: { className: string }) {
  const leaves = [
    [30, 150, -50], [44, 124, 40], [40, 100, -40], [56, 78, 45], [52, 56, -35], [68, 36, 50],
  ]
  return (
    <svg className={className} viewBox="0 0 120 180" fill="none" aria-hidden="true">
      <path d="M8 176C30 140 44 96 76 18" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" />
      {leaves.map(([x, y, r], i) => (
        <path
          key={i}
          d="M0 0C6-7 18-8 26-2C18 5 6 6 0 0Z"
          transform={`translate(${x} ${y}) rotate(${r})`}
          stroke="var(--gold)"
          strokeWidth="1.3"
          fill="rgba(212,175,55,0.08)"
        />
      ))}
    </svg>
  )
}

export default function Hero() {
  return (
    <section className="hero">
      <h1 className="sr-only">Your artist, your look, your glow.</h1>
      <p className="sr-only">Verified beauty artists, at home or in their studio. Book makeup, hair, nails and mehendi, or try the free AI skin scan.</p>

      {/* Desktop and tablet: the designed banner (public/hero-banner.webp, 2000x683). The text is
          baked into the picture; the two buttons and the service icons are real elements laid over it. */}
      <div className="hero-art">
        <Image
          src={heroBanner}
          alt=""
          priority
          quality={92}
          sizes="100vw"
          className="hero-art-img"
        />
        <span className="hero-art-logo" aria-hidden="true"><GlowMark size={100} /></span>
        <ul className="hero-cats" aria-label="Services">
          {SERVICES.map(({ label, href, img }) => (
            <li key={label}>
              <a href={href} className="cat">
                <span className="cat-icon cat-icon-art"><Image src={img} alt="" sizes="6vw" /></span>
                <span className="cat-label">{label}</span>
              </a>
            </li>
          ))}
        </ul>
        <BookButton className="book-btn-art" />
        <SkinScanButton className="skin-btn-art" />
      </div>

      {/* Phones: the same message as live text, since the picture's text is too small to read there. */}
      <div className="banner banner-small">
        <div className="banner-copy">
          <Sprig className="sprig sprig-top" />
          <Sprig className="sprig sprig-bottom" />

          <div className="banner-brand">
            <span className="banner-rule" />
            <GlowMark size={30} />
            <span className="banner-rule" />
          </div>
          <p className="banner-title" aria-hidden="true">
            Your artist, your look, <em>your glow.</em>
          </p>
          <p className="banner-script">Look beautiful · Feel confident · Be you</p>
          <div className="banner-divider" aria-hidden="true"><span>♥</span></div>
          <p className="banner-sub">Verified beauty artists, at home or in their studio</p>

          <ul className="banner-services">
            {SERVICES.map(({ label, href, img }) => (
              <li key={label}>
                <a href={href} className="cat">
                  <span className="cat-icon cat-icon-art"><Image src={img} alt="" sizes="80px" /></span>
                  <span className="cat-label">{label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="banner-cta">
            <BookButton className="book-btn-lg" />
            <SkinScanButton className="skin-btn-lg" />
          </div>
        </div>

        <div className="banner-photo">
          <Image
            src={heroStudio}
            alt="Woman with soft glam makeup and a flower-pinned updo in a pink beauty studio, with a note reading Pamper yourself, you deserve it"
            fill
            priority
            quality={90}
            sizes="(max-width: 1319px) 100vw, 66vw"
          />
        </div>
      </div>

      {/* Services bar, edge to edge: the roses and pill ends are the two cap pictures in public/strip (rose-cap-*.webp),
          the middle is a tiling strip; the names scroll over it. */}
      <div className="strip" aria-label="Services">
        <div className="strip-window">
          <div className="strip-track">
            {[0, 1].map(k => (
              <span key={k} aria-hidden={k === 1}>
                Lashes &amp; brows <i>✦</i> Threading <i>✦</i> Skin scan <i>✦</i> Bridal makeup <i>✦</i> Party glam <i>✦</i> Hair styling <i>✦</i> Nails <i>✦</i> Mehendi <i>✦</i>{' '}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
