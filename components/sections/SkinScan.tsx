import Image from 'next/image'
import Reveal from '@/components/ui/Reveal'
import { APP_URL, pexels } from '@/lib/site'

const READS = ['Redness', 'Texture', 'Pores', 'Fine lines', 'Dark spots', 'Blemishes', 'Shine', 'Dryness']

export default function SkinScan() {
  return (
    <section id="skin-scan" className="sec scan">
      <div className="wrap scan-grid">
        <Reveal className="phone-wrap">
          <div className="phone" aria-hidden="true">
            <Image src={pexels('17566310', 700)} alt="" fill sizes="300px" style={{ objectPosition: '50% 20%' }} />
            <span className="heat heat-1" />
            <span className="heat heat-2" />
            <span className="ring ring-1" />
            <span className="ring ring-2" />
            <div className="phone-sheet">
              <small>Example result</small>
              <strong>Your skin today</strong>
              {[['Texture', 74], ['Redness', 61], ['Shine', 48]].map(([k, v]) => (
                <div key={k} className="bar"><span>{k}</span><i style={{ width: `${v}%` }} /></div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="kicker">My Space · Free</p>
          <h2 className="display-2">A skin scan that <em>shows its work.</em></h2>
          <p className="lead">
            One selfie in good light. Glow maps your face zone by zone, draws a soft heatmap of where it sees redness,
            texture or shine, and circles only the spots it is sure of. Scan again next week and watch what changes.
          </p>
          <ul className="pills">{READS.map(r => <li key={r}>{r}</li>)}</ul>
          <div className="cta-row" style={{ marginTop: 0 }}>
            <a href={APP_URL} className="btn btn-ink btn-lg">Scan my skin, free</a>
            <a href="/ai-skin-analysis" className="btn btn-ghost btn-lg">How it works</a>
          </div>
          <p className="fine">
            A beauty and skincare guide, not a medical diagnosis. Delete any scan whenever you like. Your photos only help
            improve the scan if you choose to allow it.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
