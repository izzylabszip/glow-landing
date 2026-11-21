import { FAQS } from '@/lib/faq'

export default function FAQ() {
  return (
    <section id="faq" className="sec">
      <div className="wrap">
        <div className="sec-title" style={{ marginBottom: 32 }}>
          <p className="kicker">Questions</p>
          <h2 className="display-2">Good to <em>know.</em></h2>
        </div>
        <div className="faq">
          {FAQS.map(({ q, a }) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
