import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Glow: book makeup artists near you, plus a free AI skin scan'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #FBF6F3 0%, #FDF0F3 55%, #F0D3DD 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36 }}>
          <div style={{ width: 22, height: 22, borderRadius: 11, background: '#C9718A' }} />
          <div style={{ fontSize: 30, fontWeight: 600, color: '#2A1F24', letterSpacing: -1 }}>Glow</div>
        </div>
        <div style={{ fontSize: 74, fontWeight: 800, color: '#2A1F24', lineHeight: 1.02, letterSpacing: -3, maxWidth: 900 }}>
          Your artist, your look, your glow.
        </div>
        <div style={{ fontSize: 30, color: '#6B6B6B', marginTop: 28 }}>
          Makeup · Hair · Nails · Mehendi · Free AI skin scan
        </div>
        <div style={{ display: 'flex', marginTop: 44, fontSize: 24, color: '#A9536C', fontWeight: 600 }}>gloww.dev</div>
      </div>
    ),
    { ...size },
  )
}
