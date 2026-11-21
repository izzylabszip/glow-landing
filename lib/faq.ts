// One list feeds both the visible FAQ and the FAQPage structured data, so the
// two can never disagree (Google ignores FAQ markup that isn't on the page).
export const FAQS: { q: string; a: string }[] = [
  {
    q: 'What is Gloww?',
    a: 'Gloww is a beauty app. Book makeup artists, hairstylists, nail, mehendi and threading artists near you, browse Looks for weddings, parties and everyday, and use My Space, a free AI skin scan that tracks your skin over time.',
  },
  {
    q: 'Can an artist come to my home?',
    a: 'Yes. Many artists offer home visits for weddings, parties and events, and others work from their own studio or salon. Each profile shows which they offer.',
  },
  {
    q: 'How are artists checked?',
    a: 'Every artist sends identity and work documents when they join, and our team reviews them before they can take bookings. Reviews from real bookings show on each profile.',
  },
  {
    q: 'What does the AI skin scan measure?',
    a: 'Redness, texture, pores, fine lines, dark spots, blemishes, shine and dryness, zone by zone across your face. It marks only the spots it is confident about and saves each scan so you can compare over time. It is free, and it is a beauty guide, not a medical diagnosis.',
  },
  {
    q: 'What happens to my photos?',
    a: 'Your photos are used to give you your results. You can delete any scan, or your whole account, in the app. We only use your photos to improve the scan if you switch that on yourself.',
  },
  {
    q: 'Do I need to download an app?',
    a: 'No. Gloww works in your browser at app.gloww.dev. iPhone and Android apps are coming soon.',
  },
]
