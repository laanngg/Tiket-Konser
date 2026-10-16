import { useState, useEffect } from 'react'

const slides = [
  {
    tag: 'Pilihan Utama',
    title: 'Echoes of',
    accent: 'Innocence',
    venue: 'Usmar Ismail Hall, Jakarta',
    date: '29–30 Agustus 2026',
    price: 'Mulai Rp350.000',
    bgFrom: '#18120c',
    bgVia: '#100c18',
    orb1: '#d97706',
    accentColor: '#fbbf24',
  },
  {
    tag: 'Tur Dunia',
    title: 'Westlife',
    accent: 'Greatest Hits',
    venue: 'GBK Arena, Jakarta',
    date: '15 September 2026',
    price: 'Mulai Rp750.000',
    bgFrom: '#0a1420',
    bgVia: '#0c0e18',
    orb1: '#0284c7',
    accentColor: '#38bdf8',
  },
  {
    tag: 'Pentas Eksklusif',
    title: 'Jazz Under',
    accent: 'The Stars',
    venue: 'Taman Ismail Marzuki',
    date: '5 Oktober 2026',
    price: 'Mulai Rp450.000',
    bgFrom: '#1c1308',
    bgVia: '#140e06',
    orb1: '#b45309',
    accentColor: '#f59e0b',
  },
]

export default function HeroSection() {
  const [idx, setIdx] = useState(0)
  const [fading, setFading] = useState(false)

  const goTo = (next) => {
    if (fading || next === idx) return
    setFading(true)
    setTimeout(() => { setIdx(next); setFading(false) }, 500)
  }

  useEffect(() => {
    const t = setInterval(() => goTo((idx + 1) % slides.length), 5500)
    return () => clearInterval(t)
  }, [idx])

  const s = slides[idx]

  return (
    <section className="noise-texture" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: `linear-gradient(160deg, ${s.bgFrom} 0%, ${s.bgVia} 40%, #0a0a0f 100%)`,
      transition: 'background 1.2s ease',
    }}>
      {/* Single subtle orb */}
      <div style={{
        position: 'absolute', top: '10%', left: '15%',
        width: 600, height: 600, borderRadius: '50%',
        background: s.orb1, filter: 'blur(160px)', opacity: 0.12,
        transition: 'background 1.2s ease',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 32px',
        width: '100%', paddingTop: 100, paddingBottom: 80,
      }}>
        <div className="hero-grid">
          {/* ── LEFT: Editorial Typography ── */}
          <div style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            opacity: fading ? 0 : 1,
            transform: fading ? 'translateY(16px)' : 'translateY(0)',
            transition: 'opacity 0.5s ease, transform 0.6s ease',
          }}>
            {/* Tag — simple, understated */}
            <p style={{
              fontSize: '0.7rem', fontWeight: 600,
              letterSpacing: '0.25em', color: s.accentColor,
              textTransform: 'uppercase', marginBottom: 28,
              opacity: 0.8,
            }}>
              {s.tag}
            </p>

            {/* Title — serif, editorial, staggered */}
            <div style={{ marginBottom: 32 }}>
              <h1 className="serif" style={{
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                fontWeight: 400, lineHeight: 1,
                color: '#fff', margin: 0,
                letterSpacing: '-0.02em',
              }}>
                {s.title}
              </h1>
              <h1 className="serif" style={{
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                fontWeight: 400, lineHeight: 1,
                color: s.accentColor, margin: 0,
                fontStyle: 'italic',
                letterSpacing: '-0.02em',
                paddingLeft: 'clamp(16px, 3vw, 48px)',
              }}>
                {s.accent}
              </h1>
            </div>

            {/* Venue & Date — clean, minimal */}
            <div style={{
              display: 'flex', gap: 32, marginBottom: 40,
              flexWrap: 'wrap',
            }}>
              <div>
                <p style={{
                  fontSize: '0.65rem', fontWeight: 600,
                  letterSpacing: '0.15em', color: '#4b5563',
                  textTransform: 'uppercase', marginBottom: 6,
                }}>
                  Venue
                </p>
                <p style={{
                  fontSize: '0.95rem', color: '#d1d5db',
                  fontWeight: 400, margin: 0,
                }}>
                  {s.venue}
                </p>
              </div>
              <div>
                <p style={{
                  fontSize: '0.65rem', fontWeight: 600,
                  letterSpacing: '0.15em', color: '#4b5563',
                  textTransform: 'uppercase', marginBottom: 6,
                }}>
                  Date
                </p>
                <p style={{
                  fontSize: '0.95rem', color: '#d1d5db',
                  fontWeight: 400, margin: 0,
                }}>
                  {s.date}
                </p>
              </div>
              <div>
                <p style={{
                  fontSize: '0.65rem', fontWeight: 600,
                  letterSpacing: '0.15em', color: '#4b5563',
                  textTransform: 'uppercase', marginBottom: 6,
                }}>
                  Harga
                </p>
                <p style={{
                  fontSize: '0.95rem', color: s.accentColor,
                  fontWeight: 500, margin: 0,
                }}>
                  {s.price}
                </p>
              </div>
            </div>

            {/* Single strong CTA */}
            <div>
              <button
                className="btn-primary"
                onClick={() => {
                  const el = document.getElementById('top-events')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                style={{ paddingLeft: 36, paddingRight: 36 }}
              >
                Beli Tiket
              </button>
            </div>
          </div>

          {/* ── RIGHT: Abstract visual with overlaid info ── */}
          <div className="hero-right" style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            position: 'relative',
            opacity: fading ? 0 : 1,
            transition: 'opacity 0.6s ease',
          }}>
            <div style={{
              position: 'relative',
              width: '100%', maxWidth: 440,
              aspectRatio: '4 / 5',
            }}>
              {/* Gradient shape 1 — large organic rectangle */}
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '24px 80px 24px 80px',
                background: `linear-gradient(160deg, ${s.accentColor}18 0%, ${s.orb1}30 50%, transparent 100%)`,
                border: `1px solid ${s.accentColor}15`,
                transition: 'background 1.2s ease',
              }} />

              {/* Gradient shape 2 — overlapping accent */}
              <div style={{
                position: 'absolute',
                top: '12%', left: '10%', right: '-5%', bottom: '8%',
                borderRadius: '80px 24px 80px 24px',
                background: `linear-gradient(200deg, ${s.orb1}22 0%, transparent 60%)`,
                border: `1px solid ${s.accentColor}10`,
                transition: 'background 1.2s ease',
              }} />

              {/* Thin accent line */}
              <div style={{
                position: 'absolute',
                top: '50%', left: '-8%',
                width: '116%', height: 1,
                background: `linear-gradient(90deg, transparent, ${s.accentColor}30, transparent)`,
              }} />

              {/* Overlaid event info — editorial placement */}
              <div style={{
                position: 'absolute',
                bottom: '10%', left: '8%', right: '8%',
                padding: 28,
                borderRadius: 20,
                background: 'rgba(0,0,0,0.35)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <p style={{
                  fontSize: '0.6rem', fontWeight: 600,
                  letterSpacing: '0.2em', color: s.accentColor,
                  textTransform: 'uppercase', marginBottom: 10,
                  opacity: 0.9,
                }}>
                  Coming Soon
                </p>
                <p className="serif" style={{
                  fontSize: '1.6rem', color: '#fff',
                  fontWeight: 400, margin: 0, lineHeight: 1.2,
                  fontStyle: 'italic',
                }}>
                  {s.title} <span style={{ color: s.accentColor }}>{s.accent}</span>
                </p>
                <div style={{
                  width: 40, height: 1,
                  background: `${s.accentColor}60`,
                  margin: '14px 0',
                }} />
                <p style={{
                  fontSize: '0.78rem', color: '#9ca3af',
                  margin: 0,
                }}>
                  {s.venue} — {s.date}
                </p>
              </div>

              {/* Corner detail */}
              <div style={{
                position: 'absolute', top: 24, right: 24,
                width: 48, height: 48,
                borderTop: `1px solid ${s.accentColor}40`,
                borderRight: `1px solid ${s.accentColor}40`,
                borderRadius: '0 16px 0 0',
              }} />
              <div style={{
                position: 'absolute', bottom: 24, left: 24,
                width: 48, height: 48,
                borderBottom: `1px solid ${s.accentColor}40`,
                borderLeft: `1px solid ${s.accentColor}40`,
                borderRadius: '0 0 0 16px',
              }} />
            </div>
          </div>
        </div>

        {/* ── Slide controls — clean line indicators ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 56, flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  height: 2, borderRadius: 1,
                  width: i === idx ? 40 : 20,
                  background: i === idx ? s.accentColor : 'rgba(255,255,255,0.15)',
                  border: 'none', cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  padding: 0,
                }}
              />
            ))}
            <span style={{
              fontSize: '0.7rem', color: '#4b5563',
              marginLeft: 12, fontVariantNumeric: 'tabular-nums',
            }}>
              {String(idx + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { label: '←', fn: () => goTo((idx - 1 + slides.length) % slides.length) },
              { label: '→', fn: () => goTo((idx + 1) % slides.length) },
            ].map(btn => (
              <button
                key={btn.label}
                onClick={btn.fn}
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  color: '#9ca3af', fontSize: 16, fontWeight: 300,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'transparent',
                  cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  transition: 'border-color 0.3s, color 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${s.accentColor}60`
                  e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.color = '#9ca3af'
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to explore — subtle */}
      <div style={{
        position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      }}>
        <div style={{
          width: 1, height: 28,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)',
        }} />
        <span style={{
          fontSize: '0.6rem', letterSpacing: '0.25em',
          color: '#4b5563', textTransform: 'uppercase',
        }}>
          Scroll to explore
        </span>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; gap: 40px; }
          .hero-right { display: none !important; }
        }
      `}</style>
    </section>
  )
}
