import { useNavigate } from 'react-router-dom'

const list = [
  { id:1, mon:'AGT', day:'28', title:'Beyond Eyes 15th Anniversary – Surabaya', venue:'Surabaya Convention Center', time:'19:00 WIB', price:'Rp900.000',  cat:'Konser' },
  { id:2, mon:'AGT', day:'29', title:'Echoes of Innocence – Usmar Ismail Hall',  venue:'Usmar Ismail Hall, Jakarta', time:'20:00 WIB', price:'Rp350.000', cat:'Konser' },
  { id:3, mon:'SEP', day:'06', title:'SNOOPY RUN 2026',                           venue:'Tangerang Selatan',          time:'05:00 WIB', price:'Rp499.000', cat:'Sports' },
  { id:4, mon:'SEP', day:'15', title:'Westlife World Tour 2026 – Jakarta',        venue:'GBK Arena, Jakarta',         time:'20:00 WIB', price:'Rp750.000', cat:'Konser' },
  { id:5, mon:'OKT', day:'03', title:'Synchronize Festival 2026 — Day 1',         venue:'Gambir Expo, Jakarta',       time:'14:00 WIB', price:'Rp600.000', cat:'Festival' },
  { id:6, mon:'OKT', day:'30', title:'UNGU – Waktu yang Dinanti Final Chapter',   venue:'ICE BSD, Tangerang',         time:'19:30 WIB', price:'Rp550.000', cat:'Konser' },
]

const accent = '#d97706'

export default function UpcomingEvents() {
  const navigate = useNavigate()
  return (
    <section style={{ padding: '88px 0', background: '#0c0a14' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>

        {/* ── Header ── */}
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          marginBottom: 44, flexWrap: 'wrap', gap: 12,
        }}>
          <div>
            <p style={{
              fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: '#d97706', marginBottom: 8,
            }}>
              Timeline Konser
            </p>
            <h2 style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
              fontWeight: 400,
              color: '#f8f7f4',
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              margin: 0,
            }}>
              Event <span style={{ color: '#d97706', fontStyle: 'italic' }}>Mendatang</span>
            </h2>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('top-events')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              color: '#9ca3af', fontWeight: 500, fontSize: '0.8rem',
              background: 'none', border: 'none', cursor: 'pointer',
              letterSpacing: '0.01em',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#e5e7eb' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#9ca3af' }}
          >
            Lihat Semua
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginTop: 1 }}>
              <path d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* ── Event list ── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {list.map(ev => (
            <div
              key={ev.id}
              onClick={() => navigate(`/event/${ev.id}`)}
              style={{
                display: 'flex', alignItems: 'center', gap: 20,
                padding: '20px 12px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {/* Date box */}
              <div style={{
                flexShrink: 0, width: 56, height: 56, borderRadius: 10,
                background: 'rgba(255,255,255,0.04)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 1,
              }}>
                <span style={{
                  fontSize: '0.6rem', fontWeight: 600, color: accent,
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                  lineHeight: 1,
                }}>
                  {ev.mon}
                </span>
                <span style={{
                  fontSize: '1.25rem', fontWeight: 700, color: '#e5e7eb',
                  lineHeight: 1.1,
                }}>
                  {ev.day}
                </span>
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  color: '#f3f4f6', fontWeight: 600, fontSize: '0.95rem',
                  marginBottom: 5, lineHeight: 1.3,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {ev.title}
                </p>
                <div style={{
                  display: 'flex', flexWrap: 'wrap', alignItems: 'center',
                  gap: 6, fontSize: '0.78rem', color: '#6b7280', lineHeight: 1,
                }}>
                  <span>{ev.venue}</span>
                  <span style={{ color: '#374151' }}>·</span>
                  <span>{ev.time}</span>
                  <span style={{
                    display: 'inline-block',
                    padding: '2px 8px',
                    borderRadius: 999,
                    background: 'rgba(255,255,255,0.06)',
                    fontSize: '0.65rem',
                    fontWeight: 500,
                    color: '#9ca3af',
                    letterSpacing: '0.02em',
                    marginLeft: 2,
                  }}>
                    {ev.cat}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div style={{
                flexShrink: 0, textAlign: 'right', minWidth: 90,
              }}
                className="event-price-col"
              >
                <p style={{
                  fontWeight: 600, fontSize: '0.88rem',
                  color: accent,
                  lineHeight: 1,
                }}>
                  {ev.price}
                </p>
              </div>

              {/* Buy btn */}
              <button
                onClick={e => {
                  e.stopPropagation()
                  navigate(`/event/${ev.id}`)
                }}
                style={{
                  flexShrink: 0, padding: '8px 18px', borderRadius: 999,
                  background: accent,
                  color: '#fff', fontWeight: 600, fontSize: '0.78rem',
                  border: 'none', cursor: 'pointer',
                  transition: 'opacity 0.15s',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                Beli
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive: on narrow screens, stack info and hide price column */}
      <style>{`
        @media (max-width: 640px) {
          .event-price-col {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}
