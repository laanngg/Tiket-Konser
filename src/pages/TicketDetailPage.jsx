import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

// Data statis (nanti diganti dari API)
const eventsData = {
  1: {
    id: 1, title: 'UNGU – Waktu yang Dinanti Final Chapter',
    category: 'Konser', venue: 'ICE BSD', city: 'Tangerang',
    event_date: '2026-10-30T19:30:00', organizer: 'TipTip',
    description: 'Konser penutup era baru UNGU yang penuh kenangan dan nostalgia. Saksikan UNGU membawakan lagu-lagu terbaik mereka untuk terakhir kalinya dalam format ini.',
    placeholder: 'linear-gradient(135deg,#3b0764,#5b21b6)',
    ticket_types: [
      { id: 1, name: 'Festival', price: 550000, quota: 5000, sold: 3200, description: 'Area festival standing' },
      { id: 2, name: 'Tribune A', price: 800000, quota: 2000, sold: 1500, description: 'Tribune A dengan view terbaik' },
      { id: 3, name: 'Tribune VIP', price: 1200000, quota: 500, sold: 480, description: 'Tribune VIP eksklusif' },
    ],
  },
  2: {
    id: 2, title: 'Beyond Eyes 15th Anniversary – Surabaya',
    category: 'Konser', venue: 'Surabaya Convention Center', city: 'Surabaya',
    event_date: '2026-08-28T19:00:00', organizer: 'Maryhouse Media',
    description: 'Perayaan 15 tahun perjalanan musik Beyond Eyes yang luar biasa. Tampil perdana dengan set list spesial anniversary.',
    placeholder: 'linear-gradient(135deg,#0c4a6e,#0369a1)',
    ticket_types: [
      { id: 3, name: 'Regular', price: 900000, quota: 3000, sold: 1800, description: 'Tiket regular' },
      { id: 4, name: 'VIP', price: 1700000, quota: 500, sold: 480, description: 'VIP dengan meet & greet' },
    ],
  },
  3: {
    id: 3, title: 'LaLaLa Festival 2026',
    category: 'Festival', venue: 'Gambir Expo', city: 'Jakarta',
    event_date: '2026-08-22T14:00:00', organizer: 'The Group',
    description: 'Festival musik multi-genre terbesar di Jakarta dengan lebih dari 50 artis.',
    placeholder: 'linear-gradient(135deg,#064e3b,#059669)',
    ticket_types: [
      { id: 5, name: 'Day Pass', price: 800000, quota: 8000, sold: 4500, description: 'Tiket 1 hari' },
      { id: 6, name: 'Full Pass', price: 1500000, quota: 2000, sold: 1200, description: 'Tiket 2 hari penuh' },
    ],
  },
  4: {
    id: 4, title: 'Westlife World Tour 2026',
    category: 'Konser', venue: 'GBK Arena', city: 'Jakarta',
    event_date: '2026-09-15T20:00:00', organizer: 'Live Nation',
    description: 'Konser boyband legendaris asal Irlandia. Bawakan hits terbaik dari album-album ikonik mereka.',
    placeholder: 'linear-gradient(135deg,#001a33,#1e40af)',
    ticket_types: [
      { id: 7, name: 'CAT 3', price: 750000, quota: 5000, sold: 3800, description: 'Kategori 3' },
      { id: 8, name: 'CAT 2', price: 1200000, quota: 2000, sold: 1900, description: 'Kategori 2' },
      { id: 9, name: 'CAT 1', price: 2000000, quota: 500, sold: 350, description: 'Kategori 1 paling dekat panggung' },
    ],
  },
  5: {
    id: 5, title: 'Synchronize Festival 2026',
    category: 'Festival', venue: 'Gambir Expo', city: 'Jakarta',
    event_date: '2026-10-03T14:00:00', organizer: 'Demajors',
    description: 'Festival indie terpopuler se-Indonesia. 3 hari, 5 panggung, 100+ artis.',
    placeholder: 'linear-gradient(135deg,#78350f,#d97706)',
    ticket_types: [
      { id: 9, name: 'Regular', price: 600000, quota: 10000, sold: 6000, description: 'Tiket regular per hari' },
      { id: 10, name: 'VIP', price: 1200000, quota: 1000, sold: 800, description: 'Area VIP 3 hari' },
    ],
  },
}

const fmt = (n) => 'Rp' + Number(n).toLocaleString('id-ID')
const fmtDate = (d) => new Date(d).toLocaleDateString('id-ID', { weekday:'long', day:'numeric', month:'long', year:'numeric' })
const fmtTime = (d) => new Date(d).toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' }) + ' WIB'

export default function TicketDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = eventsData[id] || eventsData[1]

  const [selected, setSelected] = useState(null)
  const [qty, setQty] = useState(1)

  const chosenType = event.ticket_types.find(t => t.id === selected)
  const available = chosenType ? chosenType.quota - chosenType.sold : 0
  const total = chosenType ? chosenType.price * qty : 0

  const handleBuy = () => {
    if (!chosenType) return
    navigate('/payment', { state: { event, ticketType: chosenType, quantity: qty, total } })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      {/* Back nav */}
      <div style={{ background: 'rgba(10,10,20,0.95)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '14px 24px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link to="/" style={{ color: '#a78bfa', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem' }}>
            ← Kembali
          </Link>
          <span style={{ color: '#374151' }}>|</span>
          <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>{event.title}</span>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, alignItems: 'start' }}>

          {/* ── LEFT ── */}
          <div>
            {/* Banner */}
            <div style={{
              height: 320, borderRadius: 20, marginBottom: 32,
              background: event.placeholder, position: 'relative', overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }} />
              <div style={{ position:'absolute', bottom:28, left:28, zIndex:1 }}>
                <span style={{ background:'rgba(124,58,237,0.8)', padding:'4px 12px', borderRadius:8, fontSize:'0.75rem', fontWeight:700, marginBottom:10, display:'inline-block' }}>{event.category}</span>
                <h1 style={{ fontFamily:'Poppins,sans-serif', fontSize:'clamp(1.4rem,3vw,2rem)', fontWeight:900, margin:'8px 0 4px' }}>{event.title}</h1>
                <p style={{ color:'#d1d5db', fontSize:'0.85rem' }}>by {event.organizer}</p>
              </div>
            </div>

            {/* Info chips */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:12, marginBottom:28 }}>
              {[
                { icon:'📍', text:`${event.venue}, ${event.city}` },
                { icon:'📅', text:fmtDate(event.event_date) },
                { icon:'🕐', text:fmtTime(event.event_date) },
              ].map(c => (
                <div key={c.text} style={{
                  display:'flex', alignItems:'center', gap:8, padding:'10px 16px',
                  borderRadius:12, background:'rgba(255,255,255,0.05)',
                  border:'1px solid rgba(255,255,255,0.09)', fontSize:'0.85rem', color:'#d1d5db',
                }}>
                  {c.icon} {c.text}
                </div>
              ))}
            </div>

            {/* Description */}
            <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:24, marginBottom:28 }}>
              <h3 style={{ fontWeight:700, marginBottom:12, fontSize:'1rem' }}>Tentang Event</h3>
              <p style={{ color:'#9ca3af', lineHeight:1.75, fontSize:'0.9rem' }}>{event.description}</p>
            </div>

            {/* Ticket types */}
            <h3 style={{ fontWeight:700, marginBottom:16, fontSize:'1rem' }}>Pilih Kategori Tiket</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {event.ticket_types.map(t => {
                const avail = t.quota - t.sold
                const pct = Math.round((t.sold / t.quota) * 100)
                const isSoldout = avail <= 0
                const isSelected = selected === t.id
                return (
                  <div
                    key={t.id}
                    onClick={() => { if (!isSoldout) { setSelected(t.id); setQty(1) } }}
                    style={{
                      padding:'20px 22px', borderRadius:16, cursor: isSoldout ? 'not-allowed' : 'pointer',
                      border: isSelected ? '2px solid #7c3aed' : '1px solid rgba(255,255,255,0.09)',
                      background: isSelected ? 'rgba(124,58,237,0.1)' : 'rgba(255,255,255,0.03)',
                      opacity: isSoldout ? 0.5 : 1,
                      transition: 'all 0.2s',
                      position: 'relative',
                    }}
                  >
                    {isSelected && (
                      <div style={{ position:'absolute', top:14, right:14, width:22, height:22, borderRadius:'50%', background:'#7c3aed', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12 }}>✓</div>
                    )}
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                      <div>
                        <p style={{ fontWeight:700, fontSize:'1rem', marginBottom:3 }}>{t.name}</p>
                        <p style={{ color:'#6b7280', fontSize:'0.8rem' }}>{t.description}</p>
                      </div>
                      <p style={{
                        fontWeight:800, fontSize:'1.1rem', textAlign:'right',
                        background:'linear-gradient(135deg,#a78bfa,#ec4899)',
                        WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                      }}>
                        {fmt(t.price)}
                      </p>
                    </div>
                    {/* Quota bar */}
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ flex:1, height:4, borderRadius:2, background:'rgba(255,255,255,0.08)', overflow:'hidden' }}>
                        <div style={{ height:'100%', width:`${pct}%`, background: pct > 80 ? '#ef4444' : pct > 50 ? '#f97316' : '#22c55e', borderRadius:2 }} />
                      </div>
                      <span style={{ fontSize:'0.72rem', color: isSoldout ? '#ef4444' : '#6b7280', whiteSpace:'nowrap' }}>
                        {isSoldout ? 'Habis' : `${avail.toLocaleString()} tersisa`}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── RIGHT: Order summary ── */}
          <div style={{ position:'sticky', top:80 }}>
            <div style={{ background:'#13131f', border:'1px solid rgba(255,255,255,0.09)', borderRadius:20, padding:24 }}>
              <h3 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:'1.05rem', marginBottom:20 }}>Ringkasan Pesanan</h3>

              {chosenType ? (
                <>
                  <div style={{ background:'rgba(124,58,237,0.08)', border:'1px solid rgba(124,58,237,0.2)', borderRadius:12, padding:14, marginBottom:18 }}>
                    <p style={{ fontSize:'0.78rem', color:'#a78bfa', marginBottom:4 }}>Tiket dipilih</p>
                    <p style={{ fontWeight:700, fontSize:'0.95rem' }}>{chosenType.name}</p>
                    <p style={{ fontSize:'0.78rem', color:'#6b7280', marginTop:2 }}>{fmt(chosenType.price)} / tiket</p>
                  </div>

                  {/* Quantity */}
                  <div style={{ marginBottom:20 }}>
                    <p style={{ fontSize:'0.8rem', color:'#9ca3af', marginBottom:10 }}>Jumlah Tiket</p>
                    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                      <button onClick={() => setQty(q => Math.max(1, q-1))} style={{ width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff', fontSize:18, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>−</button>
                      <span style={{ fontWeight:800, fontSize:'1.2rem', minWidth:30, textAlign:'center' }}>{qty}</span>
                      <button onClick={() => setQty(q => Math.min(available, q+1))} style={{ width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff', fontSize:18, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
                      <span style={{ color:'#6b7280', fontSize:'0.75rem' }}>maks {Math.min(available, 10)}</span>
                    </div>
                  </div>

                  <div style={{ borderTop:'1px solid rgba(255,255,255,0.07)', paddingTop:16, marginBottom:20 }}>
                    {[
                      { l:'Harga tiket', v: fmt(chosenType.price) + ` × ${qty}` },
                      { l:'Biaya admin', v:'Gratis' },
                    ].map(r => (
                      <div key={r.l} style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                        <span style={{ color:'#6b7280', fontSize:'0.82rem' }}>{r.l}</span>
                        <span style={{ fontSize:'0.82rem' }}>{r.v}</span>
                      </div>
                    ))}
                    <div style={{ display:'flex', justifyContent:'space-between', marginTop:12, paddingTop:12, borderTop:'1px solid rgba(255,255,255,0.07)' }}>
                      <span style={{ fontWeight:700 }}>Total</span>
                      <span style={{ fontWeight:800, fontSize:'1.1rem', background:'linear-gradient(135deg,#a78bfa,#ec4899)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{fmt(total)}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ textAlign:'center', padding:'24px 0', color:'#4b5563' }}>
                  <div style={{ fontSize:36, marginBottom:10 }}>🎫</div>
                  <p style={{ fontSize:'0.85rem' }}>Pilih kategori tiket di sebelah kiri</p>
                </div>
              )}

              <button
                onClick={handleBuy}
                disabled={!chosenType}
                style={{
                  width:'100%', padding:'14px', borderRadius:12,
                  background: chosenType ? 'linear-gradient(135deg,#7c3aed,#ec4899)' : 'rgba(255,255,255,0.05)',
                  color: chosenType ? '#fff' : '#4b5563',
                  fontWeight:700, fontSize:'0.95rem', border:'none',
                  cursor: chosenType ? 'pointer' : 'not-allowed',
                  boxShadow: chosenType ? '0 8px 24px rgba(124,58,237,0.35)' : 'none',
                  transition:'all 0.2s',
                }}
              >
                {chosenType ? `Lanjut Pembayaran →` : 'Pilih Tiket Dulu'}
              </button>

              <p style={{ textAlign:'center', fontSize:'0.72rem', color:'#4b5563', marginTop:12 }}>
                🔒 Transaksi aman & terenkripsi
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .ticket-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
