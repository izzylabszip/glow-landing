# Content and keyword plan: gloww.dev

Updated 27 Oct 2026. Phrases come from Google autocomplete for Nepal
(`suggestqueries.google.com`, gl=np), which lists what people actually type.
Search Console has no query data for gloww.dev yet (verified 27 Oct, sitemap
not yet submitted), so there are no volumes here. Re-check this table against
Search Console every month and add the real position.

## Rules

- One page per search intent. Two pages chasing the same phrase compete with
  each other; link to the existing page instead.
- Every post links to one service page or to `/ai-skin-analysis`, and that page
  links back from its "Read more" list.
- Only facts we can stand behind. No invented prices, ratings or "best artist"
  claims; no medical claims about skin. A price guide waits until artists'
  prices are real NPR amounts (see GLOW-95: stored prices look like dollars).
- Titles at most 53 characters (" | Glow" is added), descriptions 120-155.
- After publishing: build, run `seo-audit.mjs`, deploy, then
  `node scripts/indexnow.mjs`.

## Keyword map

| Phrase people type | Page | Status |
| --- | --- | --- |
| bridal makeup artist in kathmandu / bridal makeup kathmandu | `/services/bridal-makeup` | live |
| makeup artist near me home service | `/services/party-makeup`, home | live |
| mehendi artist kathmandu | `/services/mehendi` | live |
| hair style for wedding / for wedding guest | `/services/hair-styling` | live |
| nail art kathmandu | `/services/nails` | live |
| skin analysis online free / skin analysis ai | `/ai-skin-analysis` | live |
| skin type test online with photo / skin type test at home | `/blog/skin-type-test` | new, 27 Oct |
| how to choose foundation shade for indian skin / according to skin tone | `/blog/foundation-shade-guide` | new, 27 Oct |
| bridal makeup price in kathmandu / in nepal | `/blog/bridal-makeup-price-kathmandu` | waits for real NPR prices |
| party makeup price list / nail art price in nepal | `/blog/beauty-prices-kathmandu` | waits for real NPR prices |
| skin care routine for oily skin / dry skin / combination skin | `/blog/skin-care-routine-by-skin-type` | next |
| dark circles under eyes causes | `/blog/dark-circles` | next |
| mehendi design simple front hand | `/blog/simple-mehendi-designs` | needs artists' own photos, with consent |
| teej makeup look | `/blog/teej-makeup-look` | publish July 2027, before Teej |

## Calendar

| When | What |
| --- | --- |
| Week of 27 Oct 2026 | Skin type test; foundation shade guide |
| Week of 3 Nov | Skin care routine by skin type |
| Week of 10 Nov | Dark circles: causes and what helps |
| After artists enter NPR prices | Bridal makeup price in Kathmandu, from Glow's own price data |
| Monthly | Check Search Console: pages with impressions but position 8-20 get a better title and one more section |
| July 2027 | Teej makeup look |

## Not worth chasing

- "best makeup artist in kathmandu", "top 10": ranking lists need reviews we
  don't have and invite naming people who never agreed to it.
- "makeup artist course / job in kathmandu": a different audience (training).
- "skin analysis machine price": clinic equipment buyers, not our users.
