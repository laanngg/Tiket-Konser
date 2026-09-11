import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import api from '../api'

const fmt = (n) => 'Rp' + Number(n).toLocaleString('id-ID')
const fmtDate = (d) => new Date(d).toLocaleDateString('id-ID', { weekday:'long', day:'numeric', month:'long', year:'numeric' })

const paymentMethods = [
  { id:'bca',     label:'BCA Virtual Account',   icon:'🏦', detail:'Bayar via ATM / m-Banking BCA' },
  { id:'mandiri', label:'Mandiri Virtual Account',icon:'🏦', detail:'Bayar via ATM / m-Banking Mandiri' },
  { id:'bni',     label:'BNI Virtual Account',    icon:'🏦', detail:'Bayar via ATM / m-Banking BNI' },
  { id:'gopay',   label:'GoPay',                  icon:'💚', detail:'Bayar via aplikasi Gojek' },
  { id:'ovo',     label:'OVO',                    icon:'💜', detail:'Bayar via aplikasi OVO' },
  { id:'dana',    label:'DANA',                   icon:'💙', detail:'Bayar via aplikasi DANA' },
  { id:'qris',    label:'QRIS',                   icon:'📲', detail:'Scan QR dari aplikasi apapun' },
]

export default function PaymentPage() {
  const { state } = useLocation()
  const navigate  = useNavigate()

  // If accessed directly without state, show placeholder data
  const event      = state?.event      || { id:1, title:'UNGU Final Chapter', venue:'ICE BSD', city:'Tangerang', event_date:'2026-10-30T19:30:00', placeholder:'linear-gradient(135deg,#3b0764,#5b21b6)' }
  const ticketType = state?.ticketType || { name:'Festival', price:550000 }
  const quantity   = state?.quantity   || 1
  const total      = state?.total      || ticketType.price * quantity

  const [step, setStep]       = useState(0) // 0=data, 1=payment, 2=confirm, 3=done
  const [loading, setLoading] = useState(false)
  const [method, setMethod]   = useState('')
  const [orderResult, setOrderResult] = useState(null)
  const [errors, setErrors]   = useState({})
  const [form, setForm] = useState({ name:'', email:'', phone:'' })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validateForm = () => {
    const e = {}
    if (!form.name)  e.name  = 'Nama wajib diisi'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email tidak valid'
    if (!form.phone) e.phone = 'Nomor HP wajib diisi'
    return e
  }

  const handleNextToPayment = () => {
    const e = validateForm()
    if (Object.keys(e).length) { setErrors(e); return }
    setStep(1)
  }

  const handleConfirm = async () => {
    if (!method) return
    setLoading(true)
    try {
      // Call backend
      const res = await api.post('/orders', {
        user_name:      form.name,
        user_email:     form.email,
        user_phone:     form.phone,
        event_id:       event.id,
        ticket_type_id: ticketType.id,
        quantity,
        payment_method: method,
      })
      if (res.data.success) {
        setOrderResult(res.data.data)
        // Simulate payment
        setTimeout(async () => {
          await api.post(`/orders/${res.data.data.order_code}/pay`, {})
          setLoading(false)
          setStep(3)
        }, 1800)
      }
    } catch {
      // Offline mode — simulate
      const code = 'KK' + Date.now().toString(36).toUpperCase()
      const tickets = Array.from({ length: quantity }, (_, i) =>
        'TKT-' + Math.random().toString(36).substr(2,12).toUpperCase()
      )
      setOrderResult({ order_code: code, tickets, total_price: total })
      setTimeout(() => { setLoading(false); setStep(3) }, 1800)
    }
  }

  const steps = ['Data Diri', 'Pembayaran', 'Konfirmasi', 'Selesai']

  return (
    <div style={{ minHeight:'100vh', background:'#0a0a0f', color:'#fff', fontFamily:'Inter,sans-serif' }}>
      {/* Nav */}
      <div style={{ background:'rgba(10,10,20,0.95)', borderBottom:'1px solid rgba(255,255,255,0.07)', padding:'14px 24px', position:'sticky', top:0, zIndex:50 }}>
        <div style={{ maxWidth:900, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <Link to="/" style={{ color:'#a78bfa', textDecoration:'none', fontSize:'0.85rem', display:'flex', alignItems:'center', gap:5 }}>← Beranda</Link>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            {steps.map((s, i) => (
              <div key={s} style={{ display:'flex', alignItems:'center', gap:6 }}>
                <div style={{
                  width:26, height:26, borderRadius:'50%',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'0.72rem', fontWeight:800,
                  background: i < step ? 'linear-gradient(135deg,#7c3aed,#ec4899)' : i === step ? 'linear-gradient(135deg,#7c3aed,#ec4899)' : 'rgba(255,255,255,0.08)',
                  color: i <= step ? '#fff' : '#4b5563',
                  boxShadow: i <= step ? '0 0 12px rgba(124,58,237,0.4)' : 'none',
                }}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span style={{ fontSize:'0.75rem', color: i === step ? '#fff' : '#4b5563', display:'none' }} className="step-label">{s}</span>
                {i < steps.length-1 && <div style={{ width:24, height:1, background: i < step ? '#7c3aed' : 'rgba(255,255,255,0.1)' }} />}
              </div>
            ))}
          </div>
          <div style={{ width:80 }} />
        </div>
      </div>

      <div style={{ maxWidth:900, margin:'0 auto', padding:'36px 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:28, alignItems:'start' }}>

          {/* ── LEFT: Steps ── */}
          <div>

            {/* STEP 0 — Data Diri */}
            {step === 0 && (
              <div style={{ background:'#13131f', border:'1px solid rgba(255,255,255,0.09)', borderRadius:20, padding:28 }}>
                <h2 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:'1.2rem', marginBottom:24 }}>📝 Data Pemesan</h2>
                <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                  {[
                    { label:'Nama Lengkap', name:'name', type:'text',  icon:'👤', placeholder:'Nama sesuai KTP' },
                    { label:'Email',        name:'email', type:'email', icon:'✉️', placeholder:'email@kamu.com' },
                    { label:'Nomor HP',     name:'phone', type:'tel',  icon:'📱', placeholder:'08xxxxxxxxxx' },
                  ].map(f => (
                    <div key={f.name}>
                      <label style={{ display:'block', color:'#9ca3af', fontSize:'0.8rem', fontWeight:600, marginBottom:7 }}>{f.label}</label>
                      <div style={{ position:'relative' }}>
                        <span style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)', fontSize:15 }}>{f.icon}</span>
                        <input
                          type={f.type} name={f.name} value={form[f.name]} onChange={handleChange}
                          placeholder={f.placeholder}
                          style={{
                            width:'100%', padding:'12px 14px 12px 40px', borderRadius:12, boxSizing:'border-box',
                            border: errors[f.name] ? '1px solid rgba(239,68,68,0.6)' : '1px solid rgba(255,255,255,0.1)',
                            background:'rgba(255,255,255,0.05)', color:'#f9fafb', fontSize:'0.875rem', outline:'none',
                          }}
                          onFocus={e => e.target.style.borderColor='rgba(124,58,237,0.6)'}
                          onBlur={e => e.target.style.borderColor = errors[f.name] ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.1)'}
                        />
                      </div>
                      {errors[f.name] && <p style={{ color:'#f87171', fontSize:'0.75rem', marginTop:4 }}>⚠ {errors[f.name]}</p>}
                    </div>
                  ))}
                </div>
                <button onClick={handleNextToPayment} style={{ marginTop:24, width:'100%', padding:'13px', borderRadius:12, background:'linear-gradient(135deg,#7c3aed,#ec4899)', color:'#fff', fontWeight:700, fontSize:'0.9rem', border:'none', cursor:'pointer', boxShadow:'0 8px 24px rgba(124,58,237,0.35)' }}>
                  Lanjut Pilih Pembayaran →
                </button>
              </div>
            )}

            {/* STEP 1 — Metode Bayar */}
            {step === 1 && (
              <div style={{ background:'#13131f', border:'1px solid rgba(255,255,255,0.09)', borderRadius:20, padding:28 }}>
                <h2 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:'1.2rem', marginBottom:24 }}>💳 Metode Pembayaran</h2>
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  {paymentMethods.map(m => (
                    <div key={m.id} onClick={() => setMethod(m.id)} style={{
                      display:'flex', alignItems:'center', gap:14, padding:'16px 18px', borderRadius:14, cursor:'pointer',
                      border: method === m.id ? '2px solid #7c3aed' : '1px solid rgba(255,255,255,0.09)',
                      background: method === m.id ? 'rgba(124,58,237,0.1)' : 'rgba(255,255,255,0.03)',
                      transition:'all 0.2s',
                    }}>
                      <span style={{ fontSize:22 }}>{m.icon}</span>
                      <div style={{ flex:1 }}>
                        <p style={{ fontWeight:600, fontSize:'0.9rem', marginBottom:2 }}>{m.label}</p>
                        <p style={{ color:'#6b7280', fontSize:'0.75rem' }}>{m.detail}</p>
                      </div>
                      <div style={{ width:20, height:20, borderRadius:'50%', border: method===m.id ? 'none':'1px solid rgba(255,255,255,0.2)', background: method===m.id ? '#7c3aed':'transparent', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11 }}>
                        {method === m.id && '✓'}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display:'flex', gap:10, marginTop:24 }}>
                  <button onClick={() => setStep(0)} style={{ flex:1, padding:'13px', borderRadius:12, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'#9ca3af', fontWeight:600, cursor:'pointer' }}>← Kembali</button>
                  <button onClick={() => method && setStep(2)} disabled={!method} style={{ flex:2, padding:'13px', borderRadius:12, background: method ? 'linear-gradient(135deg,#7c3aed,#ec4899)':'rgba(255,255,255,0.05)', color: method ? '#fff':'#4b5563', fontWeight:700, border:'none', cursor: method?'pointer':'not-allowed', boxShadow: method?'0 8px 24px rgba(124,58,237,0.35)':'none' }}>
                    Konfirmasi Pembayaran →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 — Konfirmasi */}
            {step === 2 && (
              <div style={{ background:'#13131f', border:'1px solid rgba(255,255,255,0.09)', borderRadius:20, padding:28 }}>
                <h2 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:'1.2rem', marginBottom:24 }}>✅ Konfirmasi Pesanan</h2>

                <div style={{ background:'rgba(255,255,255,0.03)', borderRadius:14, padding:20, marginBottom:20 }}>
                  <p style={{ color:'#a78bfa', fontSize:'0.72rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:12 }}>Detail Event</p>
                  {[
                    { l:'Event', v: event.title },
                    { l:'Venue', v: `${event.venue}, ${event.city}` },
                    { l:'Tanggal', v: fmtDate(event.event_date) },
                    { l:'Kategori Tiket', v: ticketType.name },
                    { l:'Jumlah', v: `${quantity} tiket` },
                  ].map(r => (
                    <div key={r.l} style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                      <span style={{ color:'#6b7280', fontSize:'0.82rem' }}>{r.l}</span>
                      <span style={{ fontSize:'0.82rem', fontWeight:500, textAlign:'right', maxWidth:'60%' }}>{r.v}</span>
                    </div>
                  ))}
                </div>

                <div style={{ background:'rgba(255,255,255,0.03)', borderRadius:14, padding:20, marginBottom:20 }}>
                  <p style={{ color:'#a78bfa', fontSize:'0.72rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:12 }}>Data Pemesan</p>
                  {[
                    { l:'Nama', v: form.name },
                    { l:'Email', v: form.email },
                    { l:'HP', v: form.phone },
                    { l:'Metode', v: paymentMethods.find(m=>m.id===method)?.label },
                  ].map(r => (
                    <div key={r.l} style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                      <span style={{ color:'#6b7280', fontSize:'0.82rem' }}>{r.l}</span>
                      <span style={{ fontSize:'0.82rem', fontWeight:500 }}>{r.v}</span>
                    </div>
                  ))}
                </div>

                <div style={{ background:'rgba(124,58,237,0.1)', border:'1px solid rgba(124,58,237,0.25)', borderRadius:14, padding:'16px 20px', marginBottom:20, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontWeight:700 }}>Total Pembayaran</span>
                  <span style={{ fontSize:'1.3rem', fontWeight:900, background:'linear-gradient(135deg,#a78bfa,#ec4899)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{fmt(total)}</span>
                </div>

                <div style={{ display:'flex', gap:10 }}>
                  <button onClick={() => setStep(1)} style={{ flex:1, padding:'13px', borderRadius:12, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'#9ca3af', fontWeight:600, cursor:'pointer' }}>← Kembali</button>
                  <button onClick={handleConfirm} disabled={loading} style={{ flex:2, padding:'13px', borderRadius:12, background: loading?'rgba(124,58,237,0.5)':'linear-gradient(135deg,#7c3aed,#ec4899)', color:'#fff', fontWeight:700, border:'none', cursor: loading?'not-allowed':'pointer', boxShadow:'0 8px 24px rgba(124,58,237,0.35)', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                    {loading ? <><span>⏳</span> Memproses...</> : '💳 Bayar Sekarang'}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 — Selesai */}
            {step === 3 && orderResult && (
              <div style={{ background:'#13131f', border:'1px solid rgba(255,255,255,0.09)', borderRadius:20, padding:36, textAlign:'center' }}>
                <div style={{ width:80, height:80, borderRadius:'50%', margin:'0 auto 20px', background:'linear-gradient(135deg,#22c55e,#16a34a)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:38, boxShadow:'0 12px 32px rgba(34,197,94,0.4)' }}>🎉</div>
                <h2 style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, fontSize:'1.5rem', marginBottom:8 }}>Pembayaran Berhasil!</h2>
                <p style={{ color:'#9ca3af', fontSize:'0.875rem', marginBottom:28 }}>Tiketmu sudah siap. Tunjukkan QR code di bawah saat masuk venue.</p>

                {/* Order code */}
                <div style={{ background:'rgba(124,58,237,0.1)', border:'1px solid rgba(124,58,237,0.3)', borderRadius:16, padding:20, marginBottom:24 }}>
                  <p style={{ color:'#a78bfa', fontSize:'0.72rem', fontWeight:700, textTransform:'uppercase', marginBottom:8 }}>Kode Pesanan</p>
                  <p style={{ fontFamily:'monospace', fontSize:'1.4rem', fontWeight:900, letterSpacing:'0.1em' }}>{orderResult.order_code}</p>
                </div>

                {/* Tickets */}
                <div style={{ marginBottom:28 }}>
                  <p style={{ color:'#6b7280', fontSize:'0.8rem', marginBottom:12 }}>E-Tiket ({orderResult.tickets?.length} tiket)</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                    {(orderResult.tickets || []).map((code, i) => (
                      <TicketCard key={code} code={code} idx={i+1} event={event} ticketType={ticketType} name={form.name} date={event.event_date} />
                    ))}
                  </div>
                </div>

                <button onClick={() => navigate('/')} style={{ width:'100%', padding:'13px', borderRadius:12, background:'linear-gradient(135deg,#7c3aed,#ec4899)', color:'#fff', fontWeight:700, border:'none', cursor:'pointer', boxShadow:'0 8px 24px rgba(124,58,237,0.35)' }}>
                  Kembali ke Beranda 🎸
                </button>
              </div>
            )}
          </div>

          {/* ── RIGHT: Summary sidebar ── */}
          {step < 3 && (
            <div style={{ background:'#13131f', border:'1px solid rgba(255,255,255,0.09)', borderRadius:20, padding:22, position:'sticky', top:80 }}>
              {/* Event image */}
              <div style={{ height:120, borderRadius:12, marginBottom:16, background:event.placeholder, display:'flex', alignItems:'flex-end', padding:14, overflow:'hidden', position:'relative' }}>
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.7),transparent)' }} />
                <p style={{ fontWeight:700, fontSize:'0.85rem', position:'relative', zIndex:1, lineHeight:1.3 }}>{event.title}</p>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:16 }}>
                <p style={{ color:'#6b7280', fontSize:'0.78rem' }}>📍 {event.venue}, {event.city}</p>
                <p style={{ color:'#6b7280', fontSize:'0.78rem' }}>📅 {fmtDate(event.event_date)}</p>
              </div>
              <div style={{ borderTop:'1px solid rgba(255,255,255,0.07)', paddingTop:14 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                  <span style={{ color:'#6b7280', fontSize:'0.8rem' }}>{ticketType.name} × {quantity}</span>
                  <span style={{ fontSize:'0.8rem' }}>{fmt(ticketType.price * quantity)}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', paddingTop:10, borderTop:'1px solid rgba(255,255,255,0.07)' }}>
                  <span style={{ fontWeight:700 }}>Total</span>
                  <span style={{ fontWeight:800, background:'linear-gradient(135deg,#a78bfa,#ec4899)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{fmt(total)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Ticket Card visual ──────────────────────────────────────────
function TicketCard({ code, idx, event, ticketType, name, date }) {
  const fmtD = (d) => new Date(d).toLocaleDateString('id-ID', { day:'numeric', month:'short', year:'numeric' })
  // Simple QR-like pattern
  const bits = Array.from(code).map(c => c.charCodeAt(0) % 2)
  return (
    <div style={{ background:'#0f0f1a', borderRadius:16, overflow:'hidden', border:'1px solid rgba(255,255,255,0.09)', textAlign:'left' }}>
      {/* Header strip */}
      <div style={{ height:6, background:'linear-gradient(90deg,#7c3aed,#ec4899,#f59e0b)' }} />
      <div style={{ padding:'16px 18px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:'0.9rem', marginBottom:2 }}>Tiket #{idx}</p>
            <p style={{ color:'#a78bfa', fontSize:'0.78rem', fontWeight:600 }}>{ticketType.name}</p>
          </div>
          {/* Mini QR */}
          <div style={{ width:52, height:52, background:'#fff', borderRadius:8, padding:5, display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:1 }}>
            {bits.slice(0,36).map((b,i) => (
              <div key={i} style={{ borderRadius:1, background: b ? '#111':'#fff' }} />
            ))}
          </div>
        </div>
        <div style={{ borderTop:'1px dashed rgba(255,255,255,0.1)', margin:'12px 0', paddingTop:12 }}>
          <p style={{ color:'#6b7280', fontSize:'0.72rem', marginBottom:2 }}>Pemegang Tiket</p>
          <p style={{ fontWeight:600, fontSize:'0.85rem' }}>{name}</p>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', gap:8 }}>
          <div>
            <p style={{ color:'#6b7280', fontSize:'0.68rem', marginBottom:1 }}>Venue</p>
            <p style={{ fontSize:'0.78rem', fontWeight:500 }}>{event.venue}</p>
          </div>
          <div style={{ textAlign:'right' }}>
            <p style={{ color:'#6b7280', fontSize:'0.68rem', marginBottom:1 }}>Tanggal</p>
            <p style={{ fontSize:'0.78rem', fontWeight:500 }}>{fmtD(date)}</p>
          </div>
        </div>
        <div style={{ marginTop:12, background:'rgba(255,255,255,0.04)', borderRadius:8, padding:'8px 10px' }}>
          <p style={{ fontFamily:'monospace', fontSize:'0.7rem', color:'#a78bfa', letterSpacing:'0.06em', textAlign:'center' }}>{code}</p>
        </div>
      </div>
    </div>
  )
}
