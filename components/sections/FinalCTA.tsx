import { APP_URL } from '@/lib/site'

export default function FinalCTA() {
  return (
    <section className="sec final-sec">
      <div className="wrap">
        <div className="final">
          <p className="kicker kicker-light">Ready when you are</p>
          <h2 className="display-2">Glow up, <em>your way.</em></h2>
          <p className="lead">Open Gloww in your browser. No download needed.</p>
          <a href={APP_URL} className="btn btn-paper btn-lg">Open Gloww</a>
        </div>
      </div>
    </section>
  )
}
