// Service pages (gloww.dev/services/<slug>). Each answers what someone
// searching for that service actually wants to know before booking, so the
// page is useful on its own, not a keyword shell around a button.
export interface ServicePage {
  slug: string
  name: string
  title: string // <title>, ~60 chars
  description: string // meta description, ~150 chars
  kicker: string
  headline: string
  headlineEm: string
  intro: string
  photo: string // Pexels id, same photos as the app's Looks
  photoAlt: string
  sections: { heading: string; body: string[] }[]
  checklist: string[]
  faqs: { q: string; a: string }[]
}

export const SERVICES: ServicePage[] = [
  {
    slug: 'bridal-makeup',
    name: 'Bridal makeup',
    title: 'Book a Bridal Makeup Artist Near You',
    description:
      'Find and book a bridal makeup artist near you: see real bridal work, compare artists, plan your trial and timeline, at home or in their studio. Book on Glow.',
    kicker: 'Bridal makeup',
    headline: 'Your wedding look,',
    headlineEm: 'planned properly.',
    intro:
      'A bridal look has to last 12 hours, photograph well in daylight and under flash, and still feel like you. Glow helps you find an artist whose real bridal work matches what you want, book your date early, and plan the trial and the timing.',
    photo: '35341784',
    photoAlt: 'Bride with soft glam bridal makeup',
    sections: [
      {
        heading: 'How to choose a bridal makeup artist',
        body: [
          'Look at brides with a skin tone and style close to yours, not just the artist’s best photo. Ask how long the look lasts and what they use for a long day, and whether they bring a touch-up kit.',
          'Check what is included: hair, draping, lashes, jewellery setting, and whether they come to your home or venue. On Glow, each artist profile lists services, prices and whether they travel.',
        ],
      },
      {
        heading: 'A simple bridal makeup timeline',
        body: [
          'Two to three months before: choose your look and book your artist. Popular wedding dates book out first.',
          'Four to six weeks before: do a trial in your wedding colours and take photos in daylight and with flash.',
          'The week of the wedding: confirm timings with your makeup artist, hair stylist and mehendi artist. On the day, allow two to three hours.',
        ],
      },
      {
        heading: 'Prepare your skin',
        body: [
          'Keep a simple, steady routine in the weeks before: gentle cleanser, moisturiser, sunscreen. Avoid new strong products or facials in the last two weeks.',
          'Glow’s free AI skin scan shows redness, texture and dryness zone by zone, so you can see whether your routine is working as the date gets closer.',
        ],
      },
    ],
    checklist: ['Real bridal photos on similar skin tones', 'Trial look before the day', 'Hair and draping included or booked', 'Home or venue visit confirmed', 'Touch-up kit for the day'],
    faqs: [
      { q: 'How early should I book a bridal makeup artist?', a: 'Two to three months ahead for most weddings, earlier for peak wedding season or a weekend date. You can reserve the date on Glow and plan the trial after.' },
      { q: 'Do I need a bridal makeup trial?', a: 'It is strongly recommended. A trial in your wedding colours shows how the look photographs and lasts, and gives you time to change it.' },
      { q: 'Can the artist come to my home or venue?', a: 'Many bridal artists on Glow offer home and venue visits. Each profile shows whether they travel.' },
    ],
  },
  {
    slug: 'party-makeup',
    name: 'Party makeup',
    title: 'Party & Event Makeup Artist Near You',
    description:
      'Book a makeup artist near you for parties, receptions, festivals and photoshoots. Soft glam to full glam, at home or in the studio. Book on Glow.',
    kicker: 'Party & event makeup',
    headline: 'Glam for the night,',
    headlineEm: 'booked in minutes.',
    intro:
      'Receptions, birthdays, festivals, photoshoots: party makeup needs to look good in low light and in flash photos, and last through the evening. Pick a look, see which artists near you do it, and book a time that fits.',
    photo: '14575974',
    photoAlt: 'Woman with full glam party makeup',
    sections: [
      {
        heading: 'Pick the look first',
        body: [
          'Soft glam, smoky eyes, glass skin, bold lips: start from a Look in the app and Glow shows the artists who do it. It is easier to agree on a look from a photo than from a description.',
        ],
      },
      {
        heading: 'What makes party makeup last',
        body: [
          'Skin prep, a long-wear base and a setting spray matter more than the amount of product. Tell your artist how long the event runs and whether it is indoors, outdoors or both.',
          'For photos, ask for a finish that is not too shiny under flash. Bring the outfit or a photo of it so colours work together.',
        ],
      },
    ],
    checklist: ['Look picked from photos', 'Event length and setting shared', 'Outfit colours shared', 'Touch-up lipstick for the evening'],
    faqs: [
      { q: 'How long does party makeup take?', a: 'Usually 45 to 90 minutes, longer with hair styling or lashes. Artists list durations on their services.' },
      { q: 'Can I book for today?', a: 'Yes, when an artist near you is free. You can also schedule ahead for a specific date and time.' },
    ],
  },
  {
    slug: 'hair-styling',
    name: 'Hair styling',
    title: 'Book a Hair Stylist Near You for Events',
    description:
      'Book a hair stylist near you for weddings, parties and photoshoots: updos, waves, braids and blow-dries, at home or in the salon. Book on Glow.',
    kicker: 'Hair styling',
    headline: 'Hair that holds',
    headlineEm: 'all night.',
    intro:
      'Updos, soft waves, braids and blow-dries for weddings, parties and shoots. See each stylist’s real work and book a time, at home or in their salon.',
    photo: '28833615',
    photoAlt: 'Long hair styled in soft waves with a braid',
    sections: [
      {
        heading: 'Getting the style you want',
        body: [
          'Share a photo of the style and of your outfit. Tell the stylist about your hair length and thickness, and whether you will add extensions or accessories.',
          'Washed and dried hair the night before is usually best for updos; your stylist will tell you if they want it washed on the day.',
        ],
      },
    ],
    checklist: ['Reference photo of the style', 'Hair length and thickness shared', 'Accessories ready', 'Timing set around makeup'],
    faqs: [
      { q: 'Should I book hair and makeup with the same artist?', a: 'Many artists do both. If not, book them back to back and tell both the timing.' },
      { q: 'Can the stylist come to my home?', a: 'Many stylists on Glow offer home visits. Each profile shows where they work.' },
    ],
  },
  {
    slug: 'mehendi',
    name: 'Mehendi',
    title: 'Book a Mehendi (Henna) Artist Near You',
    description:
      'Book a mehendi artist near you for weddings, festivals and parties: bridal, Arabic and minimal henna designs. See real designs and book a time on Glow.',
    kicker: 'Mehendi & henna',
    headline: 'Mehendi with',
    headlineEm: 'the colour you want.',
    intro:
      'Bridal full-hand designs, Arabic patterns or a simple festival design: see each artist’s real work, choose a style and book your time.',
    photo: '14825258',
    photoAlt: 'Hands with detailed bridal mehendi design',
    sections: [
      {
        heading: 'Plan the timing',
        body: [
          'Mehendi colour deepens over one to two days, so book it a day or two before a wedding or festival. Bridal designs can take several hours.',
          'Keep the paste on as long as your artist suggests and avoid water for the first hours for a deeper colour.',
        ],
      },
    ],
    checklist: ['Design style chosen from photos', 'Booked 1-2 days before the event', 'Time set aside for drying', 'Aftercare from your artist'],
    faqs: [
      { q: 'How long does bridal mehendi take?', a: 'Often three to five hours for full hands and feet, depending on the design.' },
      { q: 'When should I book mehendi before a wedding?', a: 'Usually one to two days before, so the colour has time to deepen.' },
    ],
  },
  {
    slug: 'nails',
    name: 'Nails',
    title: 'Nail Artist Near You: Manicures & Nail Art',
    description:
      'Book a nail artist near you for manicures, gel and nail art, at home or in the studio. See real work, compare prices and book on Glow.',
    kicker: 'Nails',
    headline: 'Nails that',
    headlineEm: 'match the moment.',
    intro:
      'Classic manicures, gel and nail art for everyday or events. Browse real work and book an artist near you.',
    photo: '3997384',
    photoAlt: 'Polished red manicure',
    sections: [
      {
        heading: 'Choosing a finish',
        body: [
          'Gel lasts longer and suits events and travel; a classic polish is quicker and easier to change. Share your outfit colour or a reference photo for nail art.',
        ],
      },
    ],
    checklist: ['Finish chosen (classic or gel)', 'Reference photo for nail art', 'Booked close to the event'],
    faqs: [
      { q: 'How long does a gel manicure last?', a: 'Usually around two weeks, depending on your nails and daily use.' },
    ],
  },
]

export const serviceBySlug = (slug: string) => SERVICES.find(s => s.slug === slug)
