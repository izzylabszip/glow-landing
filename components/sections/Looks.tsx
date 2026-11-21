import Image from 'next/image'
import Reveal from '@/components/ui/Reveal'
import { APP_URL, pexels } from '@/lib/site'

// Same looks (and photos) as the app's Looks tab.
const LOOKS = [
  { name: 'Luxury Bridal', occasion: 'Wedding day', photo: '35341784', tall: true },
  { name: 'Glass Skin', occasion: 'Everyday', photo: '6811012' },
  { name: 'Arabic Glam', occasion: 'Party', photo: '14575974' },
  { name: 'Effortless Waves', occasion: 'Hair', photo: '28833615', tall: true },
  { name: 'Traditional Bridal', occasion: 'Wedding day', photo: '12792004', tall: true },
  { name: 'Korean Beauty', occasion: 'Date night', photo: '6543645' },
  { name: 'Polished', occasion: 'Nails', photo: '3997384' },
  { name: 'Parisian Minimalism', occasion: 'Everyday', photo: '8062997', tall: true },
]

export default function Looks() {
  return (
    <section id="looks" className="sec">
      <div className="wrap">
        <Reveal className="sec-title">
          <p className="kicker">Find your look</p>
          <h2 className="display-2">Start with the look. <em>We’ll find the artist.</em></h2>
          <p className="lead">Bridal, party, festival or everyday. Pick a look you love and see the artists near you who do it best. <a href="/services" style={{ color: 'var(--rose-2)', fontWeight: 600 }}>See all services →</a></p>
        </Reveal>
        <div className="looks">
          {LOOKS.map((l, i) => (
            <Reveal key={l.name} delay={(i % 4) * 70} className={`look${l.tall ? ' look-tall' : ''}`}>
              <a href={APP_URL} aria-label={`${l.name} look: book an artist`}>
                <Image src={pexels(l.photo, 700)} alt={`${l.name} ${l.occasion.toLowerCase()} look`} fill sizes="(max-width: 640px) 50vw, 300px" />
                <span className="look-label">
                  <small>{l.occasion}</small>
                  {l.name}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
