import { GlowMark } from '@/components/brand/GlowMark'
import { APP_URL, CONTACT_EMAIL, CONTACT_TEL } from '@/lib/site'

const footCols = [
  {
    title: 'Gloww',
    links: [
      ['Open the app', APP_URL],
      ['Find your look', '/#looks'],
      ['Skin scan', '/#skin-scan'],
      ['For artists', '/#artists'],
      ['Journal', '/blog'],
    ],
  },
  {
    title: 'Services',
    links: [
      ['Bridal makeup', '/services/bridal-makeup'],
      ['Party makeup', '/services/party-makeup'],
      ['Hair styling', '/services/hair-styling'],
      ['Mehendi', '/services/mehendi'],
      ['Nails', '/services/nails'],
      ['AI skin analysis', '/ai-skin-analysis'],
    ],
  },
  {
    title: 'Help',
    links: [
      ['Support', '/support'],
      ['Email us', `mailto:${CONTACT_EMAIL}`],
      ['Call us', CONTACT_TEL],
      ['Privacy Policy', '/privacy'],
      ['Terms of Service', '/terms'],
    ],
  },
]

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--ink)',
        color: '#fff',
        padding: '80px 0 36px',
      }}
    >
      <div className="wrap">
        {/* mega wordmark */}
        <div
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            fontSize: 'clamp(90px, 16vw, 240px)',
            lineHeight: 0.8,
            letterSpacing: '-0.03em',
            color: '#fff',
            marginBottom: 56,
          }}
        >
          Gloww<i style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--rose)', letterSpacing: '-0.03em' }}>.</i>
        </div>

        {/* grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
            gap: 48,
            paddingTop: 56,
            borderTop: '1px solid rgba(255,255,255,0.10)',
          }}
          className="foot-grid-responsive"
        >
          {/* brand col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <GlowMark size={28} inverted />
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 300, fontSize: 20, letterSpacing: '-0.02em', color: '#fff' }}>
                Gloww
              </span>
            </div>
            <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: '34ch' }}>
              Book makeup, hair, nail and mehendi artists near you, and track your skin with a free AI scan.
            </p>
          </div>

          {/* link cols */}
          {footCols.map(col => (
            <div key={col.title}>
              <h2
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                  marginBottom: 18,
                  fontWeight: 600,
                }}
              >
                {col.title}
              </h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="foot-link"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* bottom bar */}
        <div
          style={{
            marginTop: 64,
            paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
            fontFamily: 'var(--mono)',
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          <span>&copy; {new Date().getFullYear()} Gloww</span>
          <span>Made with love for beauty</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 880px) {
          .foot-grid-responsive { grid-template-columns: 1fr 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 520px) {
          .foot-grid-responsive { grid-template-columns: 1fr !important; }
        }
        .foot-link { font-size: 14.5px; font-weight: 500; color: rgba(255,255,255,0.6); transition: color .15s ease; }
        .foot-link:hover { color: #fff; }
      ` }} />
    </footer>
  )
}
