import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ─── Swap `image: null` → `image: importedPhoto` nanti ──────────────────────
// import unguImg from '../assets/events/ungu.jpg'
// lalu: { id:1, image: unguImg, ... }
// ─────────────────────────────────────────────────────────────────────────────

const categories = ['Semua', 'Konser', 'Festival', 'Stand Up', 'Sports', 'Theater']

const events = [
  { id:1, image:null, placeholder:'linear-gradient(135deg,#3b0764,#5b21b6)', title:'UNGU – Waktu yang Dinanti Final Chapter',       cat:'Konser',  date:'30 Okt 2026',     price:'Rp550.000',   org:'TipTip',            status:'available', hot:true  },
  { id:2, image:null, placeholder:'linear-gradient(135deg,#7c2d12,#c2410c)', title:'SNOOPY RUN 2026',                                cat:'Sports',  date:'06 Sep 2026',     price:'Rp499.000',   org:'Provaliant Sports', status:'available', hot:false },
  { id:3, image:null, placeholder:'linear-gradient(135deg,#0c4a6e,#0369a1)', title:'Beyond Eyes 15th Anniversary – Surabaya',       cat:'Konser',  date:'28 Agt 2026',     price:'Rp900.000',   org:'Maryhouse Media',   status:'available', hot:true  },
  { id:4, image:null, placeholder:'linear-gradient(135deg,#831843,#be185d)', title:'Beyond Eyes 1st Tour – Jakarta 2026',           cat:'Konser',  date:'30 Agt 2026',     price:'Rp1.700.000', org:'Maryhouse Media',   status:'available', hot:true  },
  { id:5, image:null, placeholder:'linear-gradient(135deg,#064e3b,#059669)', title:'LaLaLa Festival 2026',                          cat:'Festival',date:'22–23 Agt 2026',  price:'Rp800.000',   org:'The Group',         status:'available', hot:false },
  { id:6, image:null, placeholder:'linear-gradient(135deg,#18181b,#3f3f46)', title:'Twilite Orchestra 35th Anniversary Concert',    cat:'Theater', date:'06 Sep 2026',     price:'Rp500.000',   org:'TWILITE ORCHESTRA', status:'soldout',   hot:false },
  { id:7, image:null, placeholder:'linear-gradient(135deg,#4c1d95,#7c3aed)', title:'Raisa Live in Concert 2026',                   cat:'Konser',  date:'12 Des 2026',     price:'Rp650.000',   org:'Raisa Production',  status:'available', hot:true  },
  { id:8, image:null, placeholder:'linear-gradient(135deg,#78350f,#d97706)', title:'Synchronize Festival 2026',                    cat:'Festival',date:'3–5 Okt 2026',    price:'Rp600.000',   org:'Demajors',          status:'available', hot:false },
]

function OrgAvatar({ name }) {
  const initials = name.split(' ').slice(0,2).map(w => w[0]).join('').toUpperCase()
  const palette  = ['#7c3aed','#0891b2','#0f766e','#b45309','#be123c','#1d4ed8']
  const color    = palette[name.charCodeAt(0) % palette.length]
  return (
    <div style={{
      width:28, height:28, borderRadius:8, flexShrink:0,
      background:color, display:'flex', alignItems:'center',
      justifyContent:'center', fontSize:'0.6rem', fontWeight:800, color:'#fff',
    }}>
      {initials}
    </div>
  )
}

function EventCard({ ev }) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/event/${ev.id}`)}
      style={{
        background:'#13131f',
        borderRadius:16,
        overflow:'hidden',
        cursor:'pointer',
        border:'1px solid rgba(255,255,255,0.07)',
        transition:'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s, border-color 0.25s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform    = 'translateY(-6px)'
        e.currentTarget.style.boxShadow    = '0 20px 40px rgba(124,58,237,0.25)'
        e.currentTarget.style.borderColor  = 'rgba(124,58,237,0.4)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform    = 'translateY(0)'
        e.currentTarget.style.boxShadow    = 'none'
        e.currentTarget.style.borderColor  = 'rgba(255,255,255,0.07)'
      }}
    >
      {/* ── Foto / Placeholder ── */}
      <div style={{
        position:'relative',
        width:'100%',
        paddingTop:'60%',      /* rasio ~5:3, lebih lega dari 16:9 */
        background: ev.placeholder,
        overflow:'hidden',
      }}>
        {ev.image && (
          <img
            src={ev.image}
            alt={ev.title}
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
          />
        )}

        {/* overlay gradien bawah supaya badge terbaca */}
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)',
        }} />

        {/* placeholder icon saat belum ada foto */}
        {!ev.image && (
          <div style={{
            position:'absolute', inset:0,
            display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center', gap:8, opacity:0.25,
          }}>
            <svg width="44" height="44" fill="none" stroke="#fff" strokeWidth="1.4" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
            <span style={{ color:'#fff', fontSize:'0.65rem', letterSpacing:'0.06em' }}>Foto Event</span>
          </div>
        )}

        {/* Hot badge — kanan atas */}
        {ev.hot && (
          <div style={{
            position:'absolute', top:12, right:12,
            padding:'4px 10px', borderRadius:8,
            background:'rgba(239,68,68,0.88)',
            color:'#fff', fontSize:'0.65rem', fontWeight:700,
            backdropFilter:'blur(4px)',
          }}>
            🔥 Hot
          </div>
        )}

        {/* Status badge — kiri bawah */}
        <div style={{
          position:'absolute', bottom:12, left:12,
          padding:'5px 11px', borderRadius:8,
          background: ev.status === 'soldout'
            ? 'rgba(39,39,42,0.88)'
            : 'rgba(22,163,74,0.88)',
          color: ev.status === 'soldout' ? '#a1a1aa' : '#fff',
          fontSize:'0.65rem', fontWeight:700,
          backdropFilter:'blur(4px)',
          border: ev.status === 'soldout'
            ? '1px solid rgba(255,255,255,0.1)'
            : '1px solid rgba(255,255,255,0.15)',
        }}>
          {ev.status === 'soldout' ? 'Tiket Habis' : 'Tiket Tersedia'}
        </div>
      </div>

      {/* ── Info ── */}
      <div style={{ padding:'16px 16px 18px' }}>

        {/* Judul */}
        <h3 style={{
          fontSize:'0.9rem', fontWeight:700, color:'#f9fafb',
          lineHeight:1.4, marginBottom:9,
          display:'-webkit-box', WebkitLineClamp:2,
          WebkitBoxOrient:'vertical', overflow:'hidden',
          minHeight:'2.52em',
        }}>
          {ev.title}
        </h3>

        {/* Tanggal */}
        <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:12 }}>
          <svg width="13" height="13" fill="none" stroke="#6b7280" strokeWidth="1.8" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <path d="M16 2v4M8 2v4M3 10h18"/>
          </svg>
          <span style={{ fontSize:'0.78rem', color:'#6b7280' }}>{ev.date}</span>
        </div>

        {/* Harga */}
        <p style={{ fontSize:'1.05rem', fontWeight:800, marginBottom:14 }}>
          {ev.status === 'soldout'
            ? <span style={{ color:'#52525b', fontWeight:600, fontSize:'0.85rem' }}>Habis Terjual</span>
            : <span style={{
                background:'linear-gradient(135deg,#a78bfa,#ec4899)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                backgroundClip:'text',
              }}>{ev.price}</span>
          }
        </p>

        {/* Divider */}
        <div style={{ height:1, background:'rgba(255,255,255,0.06)', marginBottom:12 }} />

        {/* Organizer + tombol beli */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, minWidth:0 }}>
            <OrgAvatar name={ev.org} />
            <span style={{
              fontSize:'0.75rem', color:'#6b7280', fontWeight:500,
              whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
            }}>
              {ev.org}
            </span>
          </div>

          {ev.status !== 'soldout' && (
            <button
              onClick={() => navigate(`/event/${ev.id}`)}
              style={{
                flexShrink:0, padding:'7px 16px', borderRadius:9,
                background:'linear-gradient(135deg,#7c3aed,#ec4899)',
                color:'#fff', fontSize:'0.73rem', fontWeight:700,
                border:'none', cursor:'pointer',
                boxShadow:'0 4px 12px rgba(124,58,237,0.35)',
                transition:'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform='scale(1.05)'; e.currentTarget.style.boxShadow='0 6px 18px rgba(124,58,237,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.transform='scale(1)';    e.currentTarget.style.boxShadow='0 4px 12px rgba(124,58,237,0.35)' }}
            >
              Beli →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function TopEvents() {
  const [active, setActive] = useState('Semua')
  const filtered = active === 'Semua' ? events : events.filter(e => e.cat === active)

  return (
    <section style={{ padding:'80px 0', background:'#0a0a0f' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px' }}>

        {/* ── Header ── */}
        <div style={{
          display:'flex', alignItems:'flex-end', justifyContent:'space-between',
          marginBottom:24, flexWrap:'wrap', gap:12,
        }}>
          <div>
            <p style={{
              fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.18em',
              textTransform:'uppercase', color:'#a78bfa', marginBottom:8,
            }}>
              🎵 Pilihan Terbaik
            </p>
            <h2 style={{
              fontFamily:'Poppins,sans-serif',
              fontSize:'clamp(1.6rem,3.5vw,2.2rem)',
              fontWeight:900, color:'#fff', lineHeight:1.1,
            }}>
              Top{' '}
              <span style={{
                background:'linear-gradient(135deg,#a78bfa,#ec4899,#f59e0b)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                backgroundClip:'text',
              }}>
                Events
              </span>
            </h2>
          </div>
          <a href="#" style={{
            display:'flex', alignItems:'center', gap:5,
            color:'#a78bfa', fontWeight:600, fontSize:'0.85rem', textDecoration:'none',
          }}>
            Lihat Semua
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* ── Category chips ── */}
        <div
          className="no-scrollbar"
          style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:4, marginBottom:28 }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                flexShrink:0, padding:'8px 18px', borderRadius:99,
                fontSize:'0.82rem', fontWeight:600, cursor:'pointer', whiteSpace:'nowrap',
                border: active === cat ? 'none' : '1px solid rgba(255,255,255,0.1)',
                background: active === cat
                  ? 'linear-gradient(135deg,#7c3aed,#ec4899)'
                  : 'rgba(255,255,255,0.05)',
                color: active === cat ? '#fff' : '#9ca3af',
                boxShadow: active === cat ? '0 4px 14px rgba(124,58,237,0.35)' : 'none',
                transition:'all 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))',
          gap:24,
        }}>
          {filtered.map(ev => <EventCard key={ev.id} ev={ev} />)}
        </div>

        {/* ── Load more ── */}
        <div style={{ textAlign:'center', marginTop:40 }}>
          <button style={{
            padding:'12px 36px', borderRadius:99,
            border:'1px solid rgba(255,255,255,0.12)',
            background:'rgba(255,255,255,0.04)',
            color:'#9ca3af', fontWeight:600, fontSize:'0.875rem',
            cursor:'pointer', transition:'all 0.2s',
            backdropFilter:'blur(8px)',
          }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(124,58,237,0.15)'; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='rgba(124,58,237,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.color='#9ca3af'; e.currentTarget.style.borderColor='rgba(255,255,255,0.12)' }}
          >
            Lihat Lainnya
          </button>
        </div>
      </div>
    </section>
  )
}
