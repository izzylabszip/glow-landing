import Reveal from '@/components/ui/Reveal'
import LooksShowcase from './LooksShowcase'

// The "Find your look" section: heading, then the 3D carousel / bento showcase (see LooksShowcase.tsx).
export default function Looks() {
  return (
    <section id="looks" className="sec">
      <div className="wrap">
        <Reveal className="sec-title">
          <p className="kicker">Find your look</p>
          <h2 className="display-2">Start with the look. <em>We’ll find the artist.</em></h2>
          <p className="lead">Bridal, party, festival or everyday. Pick a look you love and see the artists near you who do it best. <a href="/services" style={{ color: 'var(--rose-2)', fontWeight: 600 }}>See all services →</a></p>
        </Reveal>
        <LooksShowcase />
      </div>
    </section>
  )
}
