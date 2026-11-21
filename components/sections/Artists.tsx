import Image from 'next/image'
import Reveal from '@/components/ui/Reveal'
import { APP_URL, pexels } from '@/lib/site'

export default function Artists() {
  return (
    <section id="artists" className="sec artists">
      <div className="wrap artists-grid">
        <Reveal>
          <p className="kicker kicker-light">For beauty artists</p>
          <h2 className="display-2">Your talent, <em>fully booked.</em></h2>
          <p className="lead">
            Makeup artists, hairstylists, nail techs and mehendi artists: show your work, set your own prices and hours,
            and get booked by clients near you. Get verified once and start taking bookings.
          </p>
          <a href={APP_URL} className="btn btn-paper btn-lg">Join as an artist</a>
        </Reveal>
        <Reveal delay={100} className="artists-img">
          <Image src={pexels('29588096', 1000)} alt="Beauty artist styling a client's hair" fill sizes="(max-width: 980px) 90vw, 520px" />
        </Reveal>
      </div>
    </section>
  )
}
