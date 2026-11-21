import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { SITE_URL } from '@/lib/site'
import { SERVICES } from '@/lib/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  return [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/ai-skin-analysis`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/services`, changeFrequency: 'monthly', priority: 0.8 },
    ...SERVICES.map(s => ({ url: `${SITE_URL}/services/${s.slug}`, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...(posts.length ? [{ url: `${SITE_URL}/blog`, changeFrequency: 'weekly' as const, priority: 0.7 }] : []),
    ...posts.map(p => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p.updated || p.date, changeFrequency: 'monthly' as const, priority: 0.6 })),
    { url: `${SITE_URL}/support`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/terms`, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
