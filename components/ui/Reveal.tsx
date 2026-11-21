'use client'

import { useEffect, useRef, useState, type ElementType } from 'react'

type RevealProps = {
  children: React.ReactNode
  delay?: number
  as?: ElementType
  className?: string
}

// Server HTML is fully visible: crawlers and no-JS readers see everything,
// and above-the-fold content never waits on hydration (it is the LCP).
// Only blocks that start below the fold are hidden, then faded in on scroll.
export default function Reveal({ children, delay = 0, as: Tag = 'div', className }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [state, setState] = useState<'static' | 'hidden' | 'shown'>('static')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight) return

    setState('hidden')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown')
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const style =
    state === 'static'
      ? undefined
      : {
          opacity: state === 'shown' ? 1 : 0,
          transform: state === 'shown' ? 'none' : 'translateY(28px)',
          transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .7s cubic-bezier(.16,1,.3,1) ${delay}ms`,
        }

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {children}
    </Tag>
  )
}
