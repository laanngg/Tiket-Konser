const list = [
  { id:1, mon:'AGT', day:'28', title:'Beyond Eyes 15th Anniversary – Surabaya', venue:'Surabaya Convention Center', time:'19:00 WIB', price:'Rp900.000',   cat:'Konser',  dotColor:'#3b82f6', emoji:'🎤' },
  { id:2, mon:'AGT', day:'29', title:'Echoes of Innocence – Usmar Ismail Hall',  venue:'Usmar Ismail Hall, Jakarta', time:'20:00 WIB', price:'Rp350.000',  cat:'Konser',  dotColor:'#7c3aed', emoji:'🎸' },
  { id:3, mon:'SEP', day:'06', title:'SNOOPY RUN 2026',                           venue:'Tangerang Selatan',          time:'05:00 WIB', price:'Rp499.000',  cat:'Sports',  dotColor:'#eab308', emoji:'🏃' },
  { id:4, mon:'SEP', day:'15', title:'Westlife World Tour 2026 – Jakarta',        venue:'GBK Arena, Jakarta',         time:'20:00 WIB', price:'Rp750.000',  cat:'Konser',  dotColor:'#06b6d4', emoji:'🌟' },
  { id:5, mon:'OKT', day:'03', title:'Synchronize Festival 2026 — Day 1',         venue:'Gambir Expo, Jakarta',       time:'14:00 WIB', price:'Rp600.000',  cat:'Festival',dotColor:'#f97316', emoji:'🎆' },
  { id:6, mon:'OKT', day:'30', title:'UNGU – Waktu yang Dinanti Final Chapter',   venue:'ICE BSD, Tangerang',         time:'19:30 WIB', price:'Rp550.000',  cat:'Konser',  dotColor:'#a855f7', emoji:'🎵' },
]

export default function UpcomingEvents() {
  return (
    <section style={{ padding: '96px 0', background: '#0a0a0f' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: 36, flexWrap: 'wrap', gap: 12,
        }}>
          <div>
            <p style={{
              fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: '#fbbf24', marginBottom: 10,
            }}>
              📅 Jadwal
            </p>
            <h2 style={{
              fontFamily: 'Poppins,sans-serif',
              fontSize: 'clamp(1.6rem,3.5vw,2.2rem)',
              fontWeight: 900, color: '#fff',
            }}>
              Event{' '}
              <span style={{
                background: 'linear-gradient(135deg,#a78bfa,#ec4899,#f59e0b)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Mendatang</span>
            </h2>
          </div>
          <a href="#" style={{
            display: 'flex', alignItems: 'center', gap: 5,
            color: '#a78bfa', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none',
          }}>
            Lihat Semua
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* List — gap & padding lebih besar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {list.map(ev => (
            <div
              key={ev.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 20,
                padding: '22px 28px', borderRadius: 20,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background    = 'rgba(124,58,237,0.08)'
                e.currentTarget.style.borderColor   = 'rgba(124,58,237,0.35)'
                e.currentTarget.style.transform     = 'translateX(6px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background    = 'rgba(255,255,255,0.03)'
                e.currentTarget.style.borderColor   = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.transform     = 'translateX(0)'
              }}
            >
              {/* Date box — lebih besar */}
              <div style={{
                flexShrink: 0, width: 64, height: 64, borderRadius: 16,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {ev.mon}
                </span>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>
                  {ev.day}
                </span>
              </div>

              {/* Emoji box — lebih besar */}
              <div style={{
                flexShrink: 0, width: 52, height: 52, borderRadius: 14,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24,
              }}>
                {ev.emoji}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  color: '#f3f4f6', fontWeight: 700, fontSize: '1rem',
                  marginBottom: 6,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {ev.title}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                  <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>📍 {ev.venue}</span>
                  <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>🕐 {ev.time}</span>
                </div>
              </div>

              {/* Category */}
              <div style={{
                flexShrink: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              }}>
                <span style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: ev.dotColor, display: 'block',
                  boxShadow: `0 0 8px ${ev.dotColor}`,
                }} />
                <span style={{ fontSize: '0.72rem', color: '#6b7280' }}>{ev.cat}</span>
              </div>

              {/* Price */}
              <div style={{ flexShrink: 0, textAlign: 'right', minWidth: 100 }}>
                <p style={{ fontSize: '0.68rem', color: '#4b5563', marginBottom: 3 }}>Mulai dari</p>
                <p style={{
                  fontWeight: 800, fontSize: '0.95rem',
                  background: 'linear-gradient(135deg,#a78bfa,#ec4899)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {ev.price}
                </p>
              </div>

              {/* Buy btn — lebih besar */}
              <button
                style={{
                  flexShrink: 0, padding: '10px 22px', borderRadius: 12,
                  background: 'linear-gradient(135deg,#7c3aed,#ec4899)',
                  color: '#fff', fontWeight: 700, fontSize: '0.82rem',
                  border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(124,58,237,0.35)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform='scale(1.06)'; e.currentTarget.style.boxShadow='0 6px 20px rgba(124,58,237,0.55)' }}
                onMouseLeave={e => { e.currentTarget.style.transform='scale(1)';    e.currentTarget.style.boxShadow='0 4px 14px rgba(124,58,237,0.35)' }}
              >
                Beli Tiket
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
