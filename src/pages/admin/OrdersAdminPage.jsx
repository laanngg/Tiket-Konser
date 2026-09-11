import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'
import api from '../../api'

const fmt = n => 'Rp' + Number(n).toLocaleString('id-ID')

const mockOrders = Array.from({ length: 20 }, (_, i) => ({
  id: i+1,
  order_code: 'KK' + (Date.now()+i).toString(36).toUpperCase(),
  user_name: ['Budi Santoso','Ani Rahayu','Doni Pratama','Sari Dewi','Riko Hermawan'][i%5],
  user_email: `user${i+1}@email.com`,
  event_title: ['UNGU Final Chapter','Westlife World Tour','LaLaLa Festival','Synchronize Festival','Beyond Eyes'][i%5],
  ticket_type_name: ['Festival','VIP','CAT 2','Regular','Tribune A'][i%5],
  quantity: (i%3)+1,
  total_price: [550000,750000,1200000,600000,800000][i%5] * ((i%3)+1),
  payment_method: ['bca','gopay','ovo','qris','mandiri'][i%5],
  payment_status: ['paid','paid','pending','paid','failed'][i%5],
  created_at: new Date(Date.now() - i*3600000*6).toISOString(),
}))

const statusStyle = s => ({
  paid:    { bg:'rgba(34,197,94,0.15)',  border:'rgba(34,197,94,0.3)',  color:'#22c55e' },
  pending: { bg:'rgba(234,179,8,0.15)', border:'rgba(234,179,8,0.3)', color:'#eab308' },
  failed:  { bg:'rgba(239,68,68,0.15)', border:'rgba(239,68,68,0.3)', color:'#ef4444' },
  refunded:{ bg:'rgba(107,114,128,0.15)',border:'rgba(107,114,128,0.3)',color:'#9ca3af' },
}[s] || { bg:'rgba(255,255,255,0.05)', border:'rgba(255,255,255,0.1)', color:'#9ca3af' })

export default function OrdersAdminPage() {
  const [orders, setOrders]   = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('all')
  const [detail, setDetail]   = useState(null)

  useEffect(() => {
    api.get('/admin/orders').then(r => setOrders(r.data.data)).catch(() => setOrders(mockOrders)).finally(() => setLoading(false))
  }, [])

  const updateStatus = async (id, status) => {
    try { await api.put(`/admin/orders/${id}/status`, { status }) } catch {}
    setOrders(o => o.map(x => x.id===id ? {...x, payment_status:status} : x))
    if (detail?.id===id) setDetail(d => ({...d, payment_status:status}))
  }

  const filtered = orders.filter(o => {
    const q = search.toLowerCase()
    const matchSearch = !q || o.order_code?.toLowerCase().includes(q) || o.user_name?.toLowerCase().includes(q) || o.user_email?.toLowerCase().includes(q) || o.event_title?.toLowerCase().includes(q)
    const matchFilter = filter==='all' || o.payment_status===filter
    return matchSearch && matchFilter
  })

  return (
    <AdminLayout>
      <div style={{ padding:'32px 28px' }}>
        <div style={{ marginBottom:24 }}>
          <p style={{ color:'#6b7280', fontSize:'0.8rem', marginBottom:4 }}>Kelola</p>
          <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, fontSize:'1.6rem', color:'#fff' }}>Orders</h1>
        </div>

        {/* Filters */}
        <div style={{ display:'flex', gap:12, marginBottom:20, flexWrap:'wrap' }}>
          <div style={{ position:'relative', flex:1, minWidth:200 }}>
            <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', fontSize:14, color:'#6b7280' }}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari order, nama, email..." style={{ width:'100%', padding:'10px 12px 10px 36px', borderRadius:12, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.05)', color:'#fff', fontSize:'0.85rem', outline:'none', boxSizing:'border-box' }} />
          </div>
          {['all','paid','pending','failed','refunded'].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{ padding:'9px 16px', borderRadius:10, border: filter===s?'none':'1px solid rgba(255,255,255,0.1)', background: filter===s?'linear-gradient(135deg,#7c3aed,#ec4899)':'rgba(255,255,255,0.05)', color: filter===s?'#fff':'#9ca3af', fontWeight:600, fontSize:'0.8rem', cursor:'pointer', textTransform:'capitalize' }}>{s}</button>
          ))}
        </div>

        <div style={{ background:'#13131f', border:'1px solid rgba(255,255,255,0.07)', borderRadius:18, overflow:'hidden' }}>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
                  {['Kode','Pemesan','Event','Tiket','Total','Metode','Status','Aksi'].map(h => (
                    <th key={h} style={{ padding:'13px 16px', textAlign:'left', fontSize:'0.72rem', fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.08em', whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading
                  ? <tr><td colSpan={8} style={{ textAlign:'center', padding:40, color:'#4b5563' }}>⏳ Memuat...</td></tr>
                  : filtered.length === 0
                    ? <tr><td colSpan={8} style={{ textAlign:'center', padding:40, color:'#4b5563' }}>Tidak ada data</td></tr>
                    : filtered.map((o, i) => {
                        const st = statusStyle(o.payment_status)
                        return (
                          <tr key={o.id} style={{ borderBottom:'1px solid rgba(255,255,255,0.04)', background: i%2===0?'transparent':'rgba(255,255,255,0.01)', cursor:'pointer' }}
                            onClick={() => setDetail(o)}>
                            <td style={{ padding:'13px 16px' }}>
                              <span style={{ fontFamily:'monospace', fontSize:'0.8rem', color:'#a78bfa', fontWeight:600 }}>{o.order_code}</span>
                            </td>
                            <td style={{ padding:'13px 16px' }}>
                              <p style={{ fontSize:'0.82rem', fontWeight:600, marginBottom:1 }}>{o.user_name}</p>
                              <p style={{ fontSize:'0.7rem', color:'#6b7280' }}>{o.user_email}</p>
                            </td>
                            <td style={{ padding:'13px 16px', fontSize:'0.8rem', maxWidth:160 }}>
                              <p style={{ whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{o.event_title}</p>
                            </td>
                            <td style={{ padding:'13px 16px', fontSize:'0.8rem', color:'#9ca3af', whiteSpace:'nowrap' }}>{o.ticket_type_name} ×{o.quantity}</td>
                            <td style={{ padding:'13px 16px', fontSize:'0.82rem', fontWeight:700, color:'#22c55e', whiteSpace:'nowrap' }}>{fmt(o.total_price)}</td>
                            <td style={{ padding:'13px 16px', fontSize:'0.8rem', color:'#9ca3af', textTransform:'uppercase' }}>{o.payment_method}</td>
                            <td style={{ padding:'13px 16px' }}>
                              <span style={{ background:st.bg, border:`1px solid ${st.border}`, color:st.color, padding:'3px 10px', borderRadius:8, fontSize:'0.72rem', fontWeight:700, textTransform:'capitalize' }}>{o.payment_status}</span>
                            </td>
                            <td style={{ padding:'13px 16px' }} onClick={e=>e.stopPropagation()}>
                              <div style={{ display:'flex', gap:4 }}>
                                {o.payment_status==='pending' && (
                                  <button onClick={()=>updateStatus(o.id,'paid')} style={{ padding:'5px 10px', borderRadius:7, background:'rgba(34,197,94,0.15)', border:'1px solid rgba(34,197,94,0.3)', color:'#22c55e', fontSize:'0.7rem', cursor:'pointer', fontWeight:600 }}>Bayar</button>
                                )}
                                {o.payment_status==='paid' && (
                                  <button onClick={()=>updateStatus(o.id,'refunded')} style={{ padding:'5px 10px', borderRadius:7, background:'rgba(107,114,128,0.1)', border:'1px solid rgba(107,114,128,0.2)', color:'#9ca3af', fontSize:'0.7rem', cursor:'pointer' }}>Refund</button>
                                )}
                              </div>
                            </td>
                          </tr>
                        )
                      })
                }
              </tbody>
            </table>
          </div>
          {!loading && <div style={{ padding:'12px 16px', borderTop:'1px solid rgba(255,255,255,0.05)', fontSize:'0.75rem', color:'#4b5563' }}>{filtered.length} dari {orders.length} pesanan</div>}
        </div>
      </div>

      {/* Detail modal */}
      {detail && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:200, backdropFilter:'blur(4px)', padding:16 }}>
          <div style={{ background:'#13131f', border:'1px solid rgba(255,255,255,0.1)', borderRadius:24, padding:28, maxWidth:460, width:'100%' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:20 }}>
              <h3 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:'1.1rem' }}>Detail Order</h3>
              <button onClick={()=>setDetail(null)} style={{ background:'none', border:'none', color:'#6b7280', cursor:'pointer', fontSize:20 }}>✕</button>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {[
                ['Kode Order', detail.order_code],
                ['Nama', detail.user_name],
                ['Email', detail.user_email],
                ['Event', detail.event_title],
                ['Tiket', `${detail.ticket_type_name} × ${detail.quantity}`],
                ['Total', fmt(detail.total_price)],
                ['Metode', detail.payment_method?.toUpperCase()],
                ['Status', detail.payment_status],
                ['Waktu', new Date(detail.created_at).toLocaleString('id-ID')],
              ].map(([l,v]) => (
                <div key={l} style={{ display:'flex', justifyContent:'space-between', padding:'10px 14px', background:'rgba(255,255,255,0.03)', borderRadius:10 }}>
                  <span style={{ color:'#6b7280', fontSize:'0.82rem' }}>{l}</span>
                  <span style={{ fontSize:'0.82rem', fontWeight:600, fontFamily:l==='Kode Order'?'monospace':'inherit', color:l==='Total'?'#22c55e':'#f9fafb' }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:10, marginTop:20 }}>
              {detail.payment_status==='pending' && (
                <button onClick={()=>updateStatus(detail.id,'paid')} style={{ flex:1, padding:'11px', borderRadius:12, background:'rgba(34,197,94,0.8)', color:'#fff', fontWeight:700, border:'none', cursor:'pointer' }}>✓ Tandai Lunas</button>
              )}
              <button onClick={()=>setDetail(null)} style={{ flex:1, padding:'11px', borderRadius:12, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'#9ca3af', fontWeight:600, cursor:'pointer' }}>Tutup</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
