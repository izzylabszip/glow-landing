import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import JsonLd from '@/components/JsonLd'
import { breadcrumb, pageMeta } from '@/lib/site'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = pageMeta({
  title: 'The Gloww Journal: makeup, hair and skin care guides',
  description: 'Bridal makeup planning, festival looks and skin care guides from Gloww.',
  path: '/blog',
})

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', ...breadcrumb('Blog', '/blog') }} />
      <Navbar />
      <main className="prose-page">
        <div className="wrap-tight" style={{ maxWidth: 900 }}>
          <p className="kicker">Journal</p>
          <h1>The Gloww Journal</h1>
          <p style={{ marginBottom: 36, color: 'var(--muted)' }}>
            Bridal planning, festival looks and skin care, written for real life.
          </p>
          <div style={{ display: 'grid', gap: 18 }}>
            {posts.map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="post-card">
                <span className="mono-label">{p.category} · {p.readingTime}</span>
                <h2>{p.title}</h2>
                <p style={{ color: 'var(--muted)', fontSize: 15 }}>{p.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
