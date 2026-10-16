import { useState } from 'react'

const artists = [
  { id:1, name:'Raisa',    genre:'Pop',         date:'12 Des 2026', gradFrom:'#d97706', gradTo:'#f59e0b', fans:'2.1M' },
  { id:2, name:'UNGU',     genre:'Rock',        date:'30 Okt 2026', gradFrom:'#38bdf8', gradTo:'#0284c7', fans:'3.5M' },
  { id:3, name:'Westlife', genre:'Pop',         date:'15 Sep 2026', gradFrom:'#e2e8f0', gradTo:'#94a3b8', fans:'5.2M' },
  { id:4, name:'Noah',     genre:'Alternative', date:'10 Nov 2026', gradFrom:'#fb923c', gradTo:'#ea580c', fans:'4.1M' },
  { id:5, name:'Dewa 19',  genre:'Rock',        date:'22 Des 2026', gradFrom:'#fde047', gradTo:'#d97706', fans:'3.8M' },
  { id:6, name:'Isyana',   genre:'Pop',         date:'05 Okt 2026', gradFrom:'#a7f3d0', gradTo:'#10b981', fans:'1.7M' },
]

function ArtistCard({ artist, featured = false }) {
  const [hovered, setHovered] = useState(false)
  const initial = artist.name.charAt(0)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#12101b',
        borderRadius: 16,
        border: `1px solid ${hovered ? 'rgba(217,119,6,0.35)' : 'rgba(255,255,255,0.06)'}`,
        cursor: 'pointer',
        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, box-shadow 0.4s',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: featured ? 'row' : 'column',
        minHeight: featured ? 220 : 'auto',
      }}
    >
      {/* Initial letter area */}
      <div
        style={{
          display: 'flex',
          alignItems: featured ? 'center' : 'flex-end',
          justifyContent: featured ? 'center' : 'flex-start',
          padding: featured ? '0 40px' : '32px 28px 0',
          flexShrink: 0,
          width: featured ? 200 : 'auto',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle radial glow behind the letter */}
        <div style={{
          position: 'absolute',
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${artist.gradFrom}22, transparent 70%)`,
          top: featured ? '50%' : 'auto',
          bottom: featured ? 'auto' : 0,
          left: featured ? '50%' : 28,
          transform: featured ? 'translate(-50%, -50%)' : 'translateY(30%)',
          pointerEvents: 'none',
        }} />
        <span
          className="serif"
          style={{
            fontSize: featured ? '7rem' : '5.5rem',
            fontWeight: 700,
            lineHeight: 1,
            background: `linear-gradient(135deg, ${artist.gradFrom}, ${artist.gradTo})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            position: 'relative',
            zIndex: 1,
            transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            userSelect: 'none',
          }}
        >
          {initial}
        </span>
      </div>

      {/* Info */}
      <div style={{
        padding: featured ? '32px 36px 32px 12px' : '20px 28px 28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
      }}>
        <h3 style={{
          color: '#f1f1f4',
          fontSize: featured ? '1.5rem' : '1.15rem',
          fontWeight: 600,
          margin: 0,
          letterSpacing: '-0.01em',
          lineHeight: 1.2,
        }}>
          {artist.name}
        </h3>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginTop: 10,
          flexWrap: 'wrap',
        }}>
          {/* Genre pill */}
          <span style={{
            display: 'inline-block',
            padding: '3px 12px',
            borderRadius: 99,
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: artist.gradFrom,
            background: `${artist.gradFrom}14`,
            border: `1px solid ${artist.gradFrom}30`,
          }}>
            {artist.genre}
          </span>

          {/* Fan count */}
          <span style={{
            fontSize: '0.72rem',
            color: '#4b5563',
            fontWeight: 500,
          }}>
            {artist.fans} fans
          </span>
        </div>

        {/* Date */}
        <p style={{
          marginTop: 14,
          fontSize: '0.8rem',
          color: '#9ca3af',
          fontWeight: 500,
          margin: `${featured ? 16 : 14}px 0 0`,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {artist.date}
        </p>
      </div>
    </div>
  )
}

export default function FeaturedArtists() {
  return (
    <section style={{
      padding: '100px 0',
      background: '#0c0a14',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Section header — editorial left-aligned */}
        <div style={{ marginBottom: 56 }}>
          <p style={{
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#d97706',
            marginBottom: 10,
          }}>
            Artis Pilihan
          </p>
          <h2
            className="serif"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
              color: '#f8f7f4',
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Artis <span style={{ color: '#d97706', fontStyle: 'italic' }}>Populer</span>
          </h2>
          <p style={{
            color: '#4b5563',
            marginTop: 14,
            fontSize: '0.95rem',
            lineHeight: 1.6,
            maxWidth: 440,
          }}>
            Temukan konser artis favorit kamu sebelum tiket habis.
            Dari pop hingga rock — semuanya ada di sini.
          </p>
        </div>

        {/* Varied grid — first 2 featured (span 2 cols), rest smaller */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 18,
        }}>
          {/* First 2 artists — featured cards spanning 2 cols each */}
          <div style={{ gridColumn: 'span 2' }}>
            <ArtistCard artist={artists[0]} featured />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <ArtistCard artist={artists[1]} featured />
          </div>

          {/* Remaining 4 in single columns */}
          {artists.slice(2).map(a => (
            <div key={a.id} style={{ gridColumn: 'span 1' }}>
              <ArtistCard artist={a} />
            </div>
          ))}
        </div>

        {/* Responsive overrides via style tag */}
        <style>{`
          @media (max-width: 900px) {
            /* On tablet: 2-col grid, featured cards still span 2 */
          }
          @media (max-width: 640px) {
            section > div > div:last-of-type {
              grid-template-columns: 1fr 1fr !important;
            }
            section > div > div:last-of-type > div {
              grid-column: span 1 !important;
            }
          }
          @media (max-width: 480px) {
            section > div > div:last-of-type {
              grid-template-columns: 1fr !important;
              gap: 14px !important;
            }
          }
        `}</style>
      </div>
    </section>
  )
}
