export const SITE_URL = 'https://gloww.dev'
export const APP_URL = 'https://app.gloww.dev'
export const CONTACT_EMAIL = 'contact@gloww.dev'
export const CONTACT_PHONE = '+1 (647) 620-9243'
export const CONTACT_TEL = 'tel:+16476209243'
export const BRAND = 'Gloww'

export const TITLE = 'Gloww: Book Makeup Artists Near You + Free AI Skin Analysis'
export const DESCRIPTION =
  'Book makeup artists, hairstylists, nail and mehendi artists near you for weddings, parties and everyday glam, then scan your skin free with AI.'

// Pexels photos, the same ones the app's Looks use (free to use, no attribution required).
export const pexels = (id: string, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`

/**
 * Per-page metadata. Next replaces (doesn't merge) nested objects like
 * openGraph, so every page builds the full set here: canonical, og and twitter.
 */
export function pageMeta({ title, description, path, type = 'website', image }: { title?: string; description: string; path: string; type?: 'website' | 'article'; image?: { url: string; alt: string } }) {
  const ogTitle = title ? `${title} | Gloww` : TITLE
  // Setting openGraph here drops the root app/opengraph-image for this page,
  // so the share image has to be named again (live audit 27 Oct: 14 of 15
  // pages shared with no image).
  const images = [image ?? { url: '/opengraph-image', width: 1200, height: 630, alt: TITLE }]
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: { title: ogTitle, description, url: path, siteName: 'Gloww', locale: 'en_US', type, images },
    twitter: { card: 'summary_large_image' as const, title: ogTitle, description, images },
  }
}

/** BreadcrumbList for a page one level below Home. */
export const breadcrumb = (name: string, path: string) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name, item: `${SITE_URL}${path}` },
  ],
})
