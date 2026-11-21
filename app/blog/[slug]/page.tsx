import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getPostBySlug, getAllPosts, formatDate } from '@/lib/blog'
import { renderMarkdown } from '@/lib/markdown'
import { APP_URL, SITE_URL, pageMeta } from '@/lib/site'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/JsonLd'

interface PageProps {
  params: { slug: string }
}

export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return pageMeta({ title: post.title, description: post.description, path: `/blog/${post.slug}`, type: 'article', image: post.image ? { url: post.image, alt: post.title } : undefined })
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()
  const url = `${SITE_URL}/blog/${post.slug}`

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              headline: post.title,
              description: post.description,
              ...(post.image ? { image: post.image } : {}),
              author: { '@type': 'Organization', name: post.author, url: SITE_URL },
              publisher: { '@id': `${SITE_URL}/#org` },
              datePublished: post.date,
              dateModified: post.updated || post.date,
              mainEntityOfPage: url,
              inLanguage: 'en',
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
                { '@type': 'ListItem', position: 2, name: 'Journal', item: `${SITE_URL}/blog` },
                { '@type': 'ListItem', position: 3, name: post.title, item: url },
              ],
            },
          ],
        }}
      />
      <Navbar />
      <main className="prose-page">
        <article className="wrap-tight article" style={{ maxWidth: 760 }}>
          <nav aria-label="Breadcrumb" className="mono-label" style={{ marginBottom: 24 }}>
            <Link href="/">Home</Link> / <Link href="/blog">Journal</Link>
          </nav>
          <span className="mono-label">{post.category} · {post.readingTime}</span>
          <h1 style={{ marginTop: 12 }}>{post.title}</h1>
          <p style={{ fontSize: 19, color: 'var(--muted)', marginBottom: 12 }}>{post.description}</p>
          <p className="mono-label" style={{ marginBottom: 32 }}>
            {post.author} · <time dateTime={post.updated || post.date}>{formatDate(post.updated || post.date)}</time>
          </p>
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />

          <div className="final" style={{ marginTop: 56, padding: '48px 28px' }}>
            <p className="h3" style={{ color: '#fff', fontSize: 26, marginBottom: 10 }}>Ready for your look?</p>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 22 }}>
              Book a verified artist near you, or take a free skin scan first.
            </p>
            <a href={APP_URL} className="btn btn-paper btn-lg" style={{ textDecoration: 'none' }}>Open Gloww</a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
