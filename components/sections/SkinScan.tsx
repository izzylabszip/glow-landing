import Image from 'next/image'
import { APP_URL } from '@/lib/site'
import './skinscan.css'

const READS = ['Redness', 'Texture', 'Pores', 'Fine lines', 'Dark spots', 'Blemishes', 'Shine', 'Dryness']

const ALT = 'A phone showing a skin scan of a smiling woman, with an example result: Texture 84%, Redness 71%, Shine 69%.'

/**
 * "My Space" skin scan. The picture (public/skin) is the pink silk, phone, butterflies and blossoms; the words and
 * buttons are live text laid over it on desktop and stacked under the phone on small screens.
 */
export default function SkinScan() {
  return (
    <section id="skin-scan" className="skin-sec" aria-labelledby="skin-title">
      <div className="skin-art">
        <Image className="skin-img skin-img-wide" src="/skin/skin-art-v2.webp" alt={ALT} width={1956} height={804} sizes="100vw" quality={90} />
        <Image className="skin-img skin-img-phone" src="/skin/skin-phone-v2.webp" alt={ALT} width={940} height={804} sizes="100vw" quality={88} />

        <div className="skin-copy">
          <p className="skin-kicker">My Space · Free</p>
          <h2 className="skin-h2" id="skin-title">A skin scan that <em>shows its work.</em></h2>
          <p className="skin-lead">
            One selfie in good light. Gloww maps your face zone by zone, draws a soft heatmap of where it sees redness,
            texture or shine, and circles only the spots it is sure of. Scan again next week and watch what changes.
          </p>
          <ul className="skin-pills">{READS.map(r => <li key={r}>{r}</li>)}</ul>

          <div className="skin-cta">
            <a href={APP_URL} className="book-btn skin-primary">
              <svg className="book-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
                <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
              </svg>
              <span>Scan my skin, free</span>
              <svg className="book-btn-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <a href="/ai-skin-analysis" className="skin-how">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" /></svg>
              <span>How it works</span>
            </a>
          </div>

          <p className="skin-fine">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l7 3v5.5c0 4.4-2.9 8.1-7 9.5-4.1-1.4-7-5.1-7-9.5V6l7-3z" /><path d="M9 12l2.2 2.2L15.5 10" /></svg>
            <span>A beauty and skincare guide, not a medical diagnosis. Delete any scan whenever you like. Your photos only help improve the scan if you choose to allow it.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
