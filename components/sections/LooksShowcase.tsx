'use client'

import Image from 'next/image'
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type PointerEvent as RPointerEvent } from 'react'
import { APP_URL } from '@/lib/site'
import { CalendarIcon } from '@/components/brand/BeautyIcons'
import './showcase.css'

/**
 * Looks showcase: a 3D orbital carousel (auto-rotates, pauses on hover, drag / swipe / wheel / keys) and a
 * staggered bento grid, with category filters. Clicking a photo enlarges it in a lightbox.
 *
 * The carousel is driven imperatively with requestAnimationFrame (cards are positioned straight on the DOM) so
 * React never re-renders at 60fps. Cards always face the viewer: rotateY is clamped to sin(angle) * 22deg, the
 * cycle angle is normalised to [-180, 180), back-faces are hidden, and cards fade out from 112deg so a mirrored
 * back never shows.
 */

type Group = 'wedding' | 'traditional' | 'everyday' | 'hairnails'
// photo = file name in /public/looks; pos = where the card crop is anchored (keeps faces in frame); t = bento card height
type Look = { title: string; label: string; groups: Group[]; photo: string; pos: string; t: 't1' | 't2' | 't3' }

const LOOKS: Look[] = [
  { title: 'Wedding Day Glam',   label: 'Wedding makeup',     groups: ['wedding'],                 photo: 'wedding-makeup',     pos: '50% 28%', t: 't1' },
  { title: 'Glass Skin Glow',    label: 'Glass makeup',       groups: ['everyday'],                photo: 'glass-makeup',       pos: '50% 34%', t: 't2' },
  { title: 'Romantic Updos',     label: 'Hair',               groups: ['hairnails'],               photo: 'hair-updo',          pos: '50% 30%', t: 't3' },
  { title: 'Royal Bridal Red',   label: 'Traditional bridal', groups: ['wedding', 'traditional'],  photo: 'traditional-bridal', pos: '50% 30%', t: 't1' },
  { title: 'Pearl French Nails', label: 'Nails',              groups: ['hairnails'],               photo: 'nails',              pos: '50% 50%', t: 't2' },
  { title: 'Lashes & Brows',     label: 'Brows & lashes',     groups: ['everyday'],                photo: 'brows-lashes',       pos: '40% 40%', t: 't3' },
  { title: 'Heritage Makeup',    label: 'Traditional makeup', groups: ['traditional'],             photo: 'traditional-makeup', pos: '50% 38%', t: 't2' },
]
/**
 * The ring's slots. With a filter on, only that filter's looks are in the ring, and if there are fewer than six
 * they repeat so the ring stays full and every photo keeps rotating past the front.
 */
function slotsFor(filter: 'all' | Group): number[] {
  const m = LOOKS.map((_, i) => i).filter(i => filter === 'all' || LOOKS[i].groups.includes(filter))
  const reps = Math.max(1, Math.ceil(6 / m.length))
  return Array.from({ length: m.length * reps }, (_, k) => m[k % m.length])
}


const AUTO = 7                          // degrees per second
const DEG_PER_PX = 0.2
const DRAG_START_MOUSE = 8, DRAG_START_TOUCH = 14   // px a pointer must travel before it counts as a drag instead of a tap
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
const wrap180 = (a: number) => ((a % 360) + 540) % 360 - 180
const smooth = (a: number, b: number, x: number) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t) }

type Api = {
  hover: (on: boolean) => void
  click: (slot: number) => void
  goTo: (slot: number) => void
  step: (dir: number) => void
  filterChanged: () => void
  viewChanged: () => void
}

export default function LooksShowcase() {
  const filter: 'all' | Group = 'all'                     // category filters were removed; the ring and grid always show every look
  const [view, setView] = useState<'carousel' | 'bento'>('carousel')
  const [modal, setModal] = useState<number | null>(null)
  const [closing, setClosing] = useState(false)
  const [bentoKey, setBentoKey] = useState(0)
  const [preview, setPreview] = useState<string | null>(null)   // the card's photo, shown instantly while the large one loads
  const [ratio, setRatio] = useState(0.8)                   // enlarged photo's width / height (updated once it loads)

  const rootRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([])
  const api = useRef<Api | null>(null)
  const filterRef = useRef(filter); filterRef.current = filter
  const viewRef = useRef(view); viewRef.current = view
  const modalRef = useRef(modal); modalRef.current = modal
  const lastFocus = useRef<HTMLElement | null>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)

  const matches = (i: number) => filter === 'all' || LOOKS[i].groups.includes(filter)
  const slots = useMemo(() => slotsFor(filter), [filter])
  const slotsRef = useRef(slots); slotsRef.current = slots

  /* ------------------------------------------------------------ modal */
  const openModal = (i: number, src?: string | null) => {
    lastFocus.current = document.activeElement as HTMLElement
    setPreview(src ?? null); setClosing(false); setModal(i)
  }
  const closeModal = () => {
    setClosing(true)
    window.setTimeout(() => { setModal(null); setClosing(false); lastFocus.current?.focus?.({ preventScroll: true }) }, 280)
  }

  useEffect(() => {
    if (modal === null) return
    setRatio(0.8)
    document.body.style.overflow = 'hidden'
    const t = window.setTimeout(() => closeBtn.current?.focus(), 60)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { closeModal(); return }
      if (e.key === 'Tab') { e.preventDefault(); closeBtn.current?.focus() }   // the lightbox has a single control, keep focus on it
    }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.clearTimeout(t); document.removeEventListener('keydown', onKey) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal])

  /* ----------------------------------------------------- carousel engine */
  useEffect(() => {
    const root = rootRef.current!, stage = stageRef.current!
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cards = () => cardRefs.current

    let Rx = 440, Rz = 240, CW = 290, CH = 400
    let angle = 0, speed = 0, vel = 0, target = 0
    let mode: 'auto' | 'drag' | 'inertia' | 'snap' | 'wheel' = 'auto'
    let hoverPause = false, inView = false, raf = 0, last = 0

    const S = () => slotsRef.current.length                  // cards in the ring right now
    const STEPD = () => 360 / S()                            // degrees between neighbouring cards
    const frontIndex = () => ((Math.round(-angle / STEPD()) % S()) + S()) % S()

    function layout() {
      const W = stage.clientWidth || window.innerWidth
      CW = clamp(W * 0.235, 196, 300)
      CH = Math.round(CW * 1.38)
      Rx = clamp(W * 0.37, 150, 560)
      // depth of the ring: at least 0.85 x the card width, so a neighbour's inner edge (turned up to 22deg) never pokes through the centre card
      Rz = clamp(Math.max(Rx * 0.54, CW * 0.85), 110, 330)
      root.style.setProperty('--cw', CW + 'px')
      root.style.setProperty('--ch', CH + 'px')
      stage.style.height = (CH + 96) + 'px'
    }

    const startSnap = (to: number) => { target = to; mode = 'snap' }
    const snapNearest = () => startSnap(Math.round(angle / STEPD()) * STEPD())
    const goTo = (slot: number) => {
      if (modalRef.current !== null) return
      startSnap(angle + wrap180(-slot * STEPD() - angle))           // shortest way round
    }
    const step = (dir: number) => goTo((frontIndex() + dir + S()) % S())

    function update(dt: number) {
      const wantAuto = !(hoverPause || modalRef.current !== null || reduced || down !== null) && mode === 'auto'
      speed += ((wantAuto ? AUTO : 0) - speed) * (1 - Math.exp(-dt * 2.6))
      if (mode === 'auto') angle += speed * dt
      else if (mode === 'inertia') {
        angle += vel * dt; vel *= Math.exp(-dt * 5.2)
        if (Math.abs(vel) < 9) snapNearest()
      } else if (mode === 'snap') {
        const d = target - angle
        angle += d * (1 - Math.exp(-dt * 8.5))
        if (Math.abs(d) < 0.04) { angle = target; mode = 'auto'; speed = 0 }
      }
      if (angle > 36000 || angle < -36000) angle = wrap180(angle)
    }

    function render() {
      const els = cards(), fi = frontIndex(), n = S(), stepDeg = STEPD()
      for (let k = 0; k < n; k++) {
        const el = els[k]; if (!el) continue
        const a = wrap180(k * stepDeg + angle)                       // cycle angle, normalised to [-180, 180)
        const abs = Math.abs(a), rad = a * Math.PI / 180
        const sin = Math.sin(rad), cos = Math.cos(rad)
        const x = sin * Rx, z = (cos - 1) * Rz, y = -(1 - cos) * CH * 0.1
        const ry = sin * 22                                          // never beyond 22deg: cards always face the viewer
        const f = smooth(0, 1, 1 - abs / 30)                          // 1 at front centre
        const sc = 1 + 0.06 * f
        const veil = 0.52 * smooth(0, 112, abs)
        const op = abs <= 112 ? 1 : Math.max(0, 1 - (abs - 112) / 26) // fully gone before a card passes behind the ring
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateY(${ry.toFixed(2)}deg) scale(${sc.toFixed(4)})`
        el.style.opacity = op.toFixed(3)
        el.style.visibility = op < 0.02 ? 'hidden' : 'visible'
        el.style.pointerEvents = op < 0.3 ? 'none' : 'auto'
        el.style.zIndex = String(Math.round((cos + 1) * 100))
        el.style.setProperty('--f', f.toFixed(3))
        el.style.setProperty('--d', veil.toFixed(3))
      }
      dotRefs.current.forEach((d, k) => {
        if (!d) return
        const on = String(k === fi)
        if (d.getAttribute('aria-current') !== on) d.setAttribute('aria-current', on)
      })
    }

    function frame(t: number) {
      const dt = Math.min(0.05, (t - last) / 1000 || 0.016); last = t
      update(dt); render()
      raf = requestAnimationFrame(frame)
    }
    const running = () => viewRef.current === 'carousel' && inView && !document.hidden
    const start = () => { if (!raf && running()) { last = performance.now(); raf = requestAnimationFrame(frame) } }
    const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0 } }
    const sync = () => (running() ? start() : stop())

    /* pointer: drag with inertia */
    let down: { x: number; id: number; last: number } | null = null
    let moved = false, samples: { t: number; a: number }[] = []
    let suppressClick = false
    const onDown = (e: PointerEvent) => {
      if (e.button > 0 || (e.target as HTMLElement).closest('.sc-nav') || modalRef.current !== null) return
      down = { x: e.clientX, id: e.pointerId, last: e.clientX }; moved = false; samples = [{ t: performance.now(), a: angle }]
    }
    const onMove = (e: PointerEvent) => {
      if (!down || e.pointerId !== down.id) return
      if (!moved && Math.abs(e.clientX - down.x) > (e.pointerType === 'touch' ? DRAG_START_TOUCH : DRAG_START_MOUSE)) { moved = true; mode = 'drag'; stage.classList.add('is-dragging'); try { stage.setPointerCapture(e.pointerId) } catch { /* ignore */ } }
      if (moved) {
        angle += (e.clientX - down.last) * DEG_PER_PX
        const now = performance.now(); samples.push({ t: now, a: angle })
        while (samples.length > 2 && now - samples[0].t > 90) samples.shift()
      }
      down.last = e.clientX
    }
    const onUp = (e: PointerEvent) => {
      if (!down || e.pointerId !== down.id) return
      const wasMoved = moved; down = null
      stage.classList.remove('is-dragging')
      if (wasMoved) {
        suppressClick = true; window.setTimeout(() => { suppressClick = false }, 0)
        const a = samples[0], b = samples[samples.length - 1]
        const v = b.t > a.t ? (b.a - a.a) / ((b.t - a.t) / 1000) : 0
        if (Math.abs(v) > 40) { vel = clamp(v, -520, 520); mode = 'inertia' } else snapNearest()
      }
    }
    /* trackpad: horizontal gestures rotate; vertical scrolling still scrolls the page */
    let wheelT = 0
    const onWheel = (e: WheelEvent) => {
      if (modalRef.current !== null) return
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) && !e.shiftKey) return
      e.preventDefault()
      mode = 'wheel'
      angle -= (e.deltaX || e.deltaY) * 0.13
      window.clearTimeout(wheelT); wheelT = window.setTimeout(snapNearest, 150)
    }
    /* keyboard: only while the carousel is on screen, so the arrows never hijack the rest of the page */
    const onKey = (e: KeyboardEvent) => {
      if (modalRef.current !== null || !running() || /input|textarea|select/i.test((e.target as HTMLElement)?.tagName || '')) return
      if (e.key === 'ArrowRight') { e.preventDefault(); step(1) }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1) }
    }

    stage.addEventListener('pointerdown', onDown)
    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerup', onUp)
    stage.addEventListener('pointercancel', onUp)
    stage.addEventListener('wheel', onWheel, { passive: false })
    document.addEventListener('keydown', onKey)
    const onVis = () => sync()
    document.addEventListener('visibilitychange', onVis)

    const io = new IntersectionObserver(([entry]) => { inView = entry.intersectionRatio > 0.35; sync() }, { threshold: [0, 0.35, 0.6, 1] })
    io.observe(stage)
    const ro = new ResizeObserver(() => { if (viewRef.current === 'carousel') layout() })
    ro.observe(stage)

    api.current = {
      hover: on => { hoverPause = on },
      click: slot => {
        if (suppressClick || mode === 'drag') return
        lastFocus.current = document.activeElement as HTMLElement; setClosing(false)
        setPreview(cardRefs.current[slot]?.querySelector('img')?.currentSrc ?? null); setModal(slotsRef.current[slot])
      },
      goTo, step,
      viewChanged: () => { if (viewRef.current === 'carousel') layout(); sync() },
      // a new filter means a new set of cards: start the ring again from the first one
      filterChanged: () => { angle = 0; speed = 0; vel = 0; mode = 'auto'; render() },
    }

    layout(); render(); stage.setAttribute('data-ready', '')
    return () => {
      stop(); io.disconnect(); ro.disconnect()
      stage.removeEventListener('pointerdown', onDown); stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerup', onUp); stage.removeEventListener('pointercancel', onUp)
      stage.removeEventListener('wheel', onWheel); document.removeEventListener('keydown', onKey)
      document.removeEventListener('visibilitychange', onVis)
      window.clearTimeout(wheelT)
    }
  }, [])

  // view / filter changes talk to the engine
  useEffect(() => { api.current?.viewChanged(); setBentoKey(k => k + 1) }, [view])
  useLayoutEffect(() => { api.current?.filterChanged(); setBentoKey(k => k + 1) }, [filter])

  /* ------------------------------------------------------------ markup */
  const cardBody = (l: Look) => (
    <>
      <Image src={`/looks/${l.photo}.webp`} alt={`${l.title}, ${l.label.toLowerCase()} look`} fill sizes="(max-width: 640px) 80vw, 300px" style={{ objectPosition: l.pos }} draggable={false} />
      <div className="sc-shade" />
      <div className="sc-text"><span className="sc-cat">{l.label}</span><h3 className="sc-title">{l.title}</h3></div>
    </>
  )
  const onKeyActivate = (fn: () => void) => (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn() } }
  const M = modal !== null ? LOOKS[modal] : null

  return (
    <div className="showcase" ref={rootRef}>
      <div className="sc-controls">
        <div className="sc-seg" role="group" aria-label="View">
          <button aria-pressed={view === 'carousel'} onClick={() => setView('carousel')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><ellipse cx="12" cy="12" rx="9" ry="4.5" /><rect x="8.5" y="5" width="7" height="14" rx="1.6" /></svg>
            3D Carousel
          </button>
          <button aria-pressed={view === 'bento'} onClick={() => setView('bento')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="10" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="6" rx="1.5" /><rect x="3.5" y="16" width="7" height="4.5" rx="1.5" /><rect x="13.5" y="12" width="7" height="8.5" rx="1.5" /></svg>
            Bento Grid
          </button>
        </div>
      </div>

      {/* 3D carousel */}
      <section className="sc-carousel" hidden={view !== 'carousel'} aria-label="Signature looks carousel">
        <div className="sc-stage" ref={stageRef}>
          <div className="sc-halo" aria-hidden="true" />
          <div className="sc-ring">
            {slots.map((li, k) => {
              const l = LOOKS[li]
              return (
                <article
                  key={`${filter}-${k}`}
                  ref={el => { cardRefs.current[k] = el }}
                  className="sc-card"
                  tabIndex={0}
                  role="button"
                  aria-label={`${l.title}, ${l.label}. Enlarge photo`}
                  onPointerEnter={(e: RPointerEvent) => { if (e.pointerType === 'mouse') api.current?.hover(true) }}
                  onPointerLeave={(e: RPointerEvent) => { if (e.pointerType === 'mouse') api.current?.hover(false) }}
                  onFocus={() => api.current?.hover(true)}
                  onBlur={() => api.current?.hover(false)}
                  onClick={() => api.current?.click(k)}
                  onKeyDown={onKeyActivate(() => api.current?.click(k))}
                >
                  {cardBody(l)}
                </article>
              )
            })}
          </div>
          <button className="sc-nav prev" aria-label="Previous look" onClick={() => api.current?.step(-1)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button className="sc-nav next" aria-label="Next look" onClick={() => api.current?.step(1)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        <div className="sc-dots" role="group" aria-label="Choose a look">
          {slots.map((li, k) => (
            <button key={`${filter}-${k}`} ref={el => { dotRefs.current[k] = el }} className="sc-dot" aria-label={`Show ${LOOKS[li].title}`} aria-current={k === 0} onClick={() => api.current?.goTo(k)} />
          ))}
        </div>
      </section>

      {/* bento grid */}
      <section hidden={view !== 'bento'} aria-label="Signature looks grid">
        <div className="sc-bento">
          {LOOKS.map((l, i) => matches(i) && (
            <article
              key={`${bentoKey}-${l.title}`}
              className={`sc-card ${l.t}`}
              style={{ animationDelay: `${i * 90}ms` }}
              tabIndex={0}
              role="button"
              aria-label={`${l.title}, ${l.label}. Enlarge photo`}
              onClick={e => openModal(i, e.currentTarget.querySelector('img')?.currentSrc)}
              onKeyDown={onKeyActivate(() => openModal(i))}
            >
              {cardBody(l)}
            </article>
          ))}
        </div>
      </section>

      {/* lightbox: click a photo to enlarge it */}
      {M && (
        <div className={`sc-backdrop${closing ? ' closing' : ''}`} onClick={closeModal}>
          <figure className="sc-lightbox" style={{ ['--r' as string]: ratio }} role="dialog" aria-modal="true" aria-label={`${M.title}, enlarged`} onClick={e => e.stopPropagation()}>
            <button className="sc-x" ref={closeBtn} aria-label="Close enlarged photo" onClick={closeModal}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
            <Image className="sc-lb-img" src={`/looks/${M.photo}.webp`} alt={`${M.title}, ${M.label.toLowerCase()} look`} width={1200} height={1500} sizes="(max-width: 760px) 92vw, 720px" priority style={preview ? { backgroundImage: `url("${preview}")`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined} onClick={closeModal} onLoad={e => { const im = e.currentTarget; if (im.naturalHeight) setRatio(im.naturalWidth / im.naturalHeight) }} />
            <figcaption className="sc-lb-cap"><span className="sc-mcat">{M.label}</span><span className="sc-lb-title">{M.title}</span></figcaption>
            <a className="book-btn sc-lb-book" href={APP_URL}>
              <CalendarIcon size={20} color="currentColor" className="book-btn-icon" />
              <span>Book an artist</span>
              <svg className="book-btn-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
            </a>
          </figure>
        </div>
      )}
    </div>
  )
}
