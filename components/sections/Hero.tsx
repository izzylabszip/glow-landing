import Image from 'next/image'
import { APP_URL, pexels } from '@/lib/site'

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="kicker">Beauty, on your schedule</p>
          <h1 className="display">
            Your artist, your look, <em>your glow.</em>
          </h1>
          <p className="lead">
            Book makeup artists, hairstylists, nail and mehendi artists near you, at home or in their studio. Then let our
            free AI skin scan show you what your skin needs.
          </p>
          <div className="cta-row">
            <a href={APP_URL} className="btn btn-rose btn-lg">Book an artist</a>
            <a href="#skin-scan" className="btn btn-ghost btn-lg">Try the free skin scan</a>
          </div>
        </div>

        <div className="arches" aria-hidden="true">
          <div className="arch arch-a">
            <Image src={pexels('2949157', 700)} alt="" fill priority sizes="(max-width: 980px) 40vw, 260px" />
          </div>
          <div className="arch arch-b">
            <Image src={pexels('30497752', 900)} alt="" fill priority sizes="(max-width: 980px) 50vw, 320px" />
          </div>
          <div className="arch arch-c">
            <Image src={pexels('30276787', 700)} alt="" fill sizes="(max-width: 980px) 40vw, 240px" />
          </div>
          <span className="float-chip">✦ Free AI skin scan</span>
        </div>
      </div>

      <div className="strip" aria-label="Services">
        <div className="strip-track">
          {[0, 1].map(k => (
            <span key={k} aria-hidden={k === 1}>
              Bridal makeup <i>✦</i> Party glam <i>✦</i> Hair styling <i>✦</i> Nails <i>✦</i> Mehendi <i>✦</i> Lashes &amp; brows <i>✦</i> Threading <i>✦</i> Skin scan <i>✦</i>{' '}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
