import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'
import api from '../../api'

const fmt = n => 'Rp' + Number(n).toLocaleString('id-ID')

// Offline mock stats
const mockStats = {
  total_orders: 1247, total_revenue: 892500000,
  total_events: 6, total_users: 984, pending: 23,
  daily: [
    { date:'2026-09-06', revenue:45000000, orders:82 },
    { date:'2026-09-07', revenue:38000000, orders:69 },
    { date:'2026-09-08', revenue:62000000, orders:114 },
    { date:'2026-09-09', revenue:51000000, orders:93 },
    { date:'2026-09-10', revenue:77000000, orders:141 },
    { date:'2026-09-11', revenue:43000000, orders:78 },
    { date:'2026-09-12', revenue:56000000, orders:102 },
  ],
  topEvents: [
    { title:'UNGU Final Chapter',     category:'Konser',  total_orders:412, revenue:226600000 },
    { title:'Westlife World Tour',    category:'Konser',  total_orders:385, revenue:289000000 },
    { title:'LaLaLa Festival 2026',   category:'Festival',total_orders:267, revenue:213600000 },
    { title:'Synchronize Festival',   category:'Festival',total_orders:198, revenue:118800000 },
    { title:'Beyond Eyes 15th Anniv.',category:'Konser',  total_orders:142, revenue:127800000 },
  ],
}

const StatCard = ({ icon, label, value, sub, color }) => (
  <div style={{
    background:'#13131f', border:'1px solid rgba(255,255,255,0.07)',
    borderRadius:18, padding:'22px 24px',
    transition:'transform 0.2s, box-shadow 0.2s',
  }}
    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(0,0,0,0.3)' }}
    onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}
  >
    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
      <div style={{ width:42, height:42, borderRadius:12, background:`${color}22`, border:`1px solid ${color}44`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{icon}</div>
      <span style={{ color:'#6b7280', fontSize:'0.82rem', fontWeight:500 }}>{label}</span>
    </div>
    <p style={{ fontSize:'1.8rem', fontWeight:900, fontFamily:'Poppins,sans-serif', color:'#fff', marginBottom:4 }}>{value}</p>
    {sub && <p style={{ fontSize:'0.75rem', color: sub.startsWith('+') ? '#22c55e' : '#6b7280' }}>{sub}</p>}
  </div>
)

// Simple bar chart
const BarChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.revenue))
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:8, height:120 }}>
      {data.map(d => (
        <div key={d.date} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
          <div style={{ width:'100%', borderRadius:'4px 4px 0 0', background:'linear-gradient(to top,#7c3aed,#a78bfa)', transition:'height 0.6s', height: `${Math.round((d.revenue/max)*100)}%`, minHeight:4 }} title={fmt(d.revenue)} />
          <span style={{ fontSize:'0.6rem', color:'#4b5563', textAlign:'center' }}>
            {new Date(d.date).toLocaleDateString('id-ID',{day:'2-digit',month:'2-digit'})}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function DashboardPage() {
  const [stats, setStats]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/stats')
      .then(r => setStats(r.data.data))
      .catch(() => setStats(mockStats))
      .finally(() => setLoading(false))
  }, [])

  return (
    <AdminLayout>
      <div style={{ padding:'32px 28px' }}>
        {/* Header */}
        <div style={{ marginBottom:28 }}>
          <p style={{ color:'#6b7280', fontSize:'0.8rem', marginBottom:4 }}>Selamat datang kembali 👋</p>
          <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, fontSize:'1.6rem', color:'#fff' }}>Dashboard</h1>
        </div>

        {loading ? (
          <div style={{ textAlign:'center', padding:60, color:'#6b7280' }}>⏳ Memuat data...</div>
        ) : (
          <>
            {/* Stat cards */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:16, marginBottom:28 }}>
              <StatCard icon="🎫" label="Total Pesanan"   value={stats.total_orders?.toLocaleString()} sub="+12% bulan ini" color="#7c3aed" />
              <StatCard icon="💰" label="Total Pendapatan" value={fmt(stats.total_revenue)}              sub="+8% bulan ini"  color="#22c55e" />
              <StatCard icon="🎪" label="Event Aktif"      value={stats.total_events}                    sub={null}           color="#f59e0b" />
              <StatCard icon="👥" label="Total Users"       value={stats.total_users?.toLocaleString()}  sub="+47 hari ini"  color="#06b6d4" />
              <StatCard icon="⏳" label="Pending Bayar"    value={stats.pending}                         sub="Perlu diproses" color="#ef4444" />
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
              {/* Revenue chart */}
              <div style={{ background:'#13131f', border:'1px solid rgba(255,255,255,0.07)', borderRadius:18, padding:24 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:20 }}>
                  <h3 style={{ fontWeight:700, fontSize:'0.95rem' }}>Pendapatan 7 Hari</h3>
                  <span style={{ fontSize:'0.75rem', color:'#6b7280' }}>Revenue</span>
                </div>
                <BarChart data={stats.daily} />
                <div style={{ display:'flex', justifyContent:'space-between', marginTop:12, paddingTop:12, borderTop:'1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize:'0.75rem', color:'#6b7280' }}>Total 7 hari</span>
                  <span style={{ fontSize:'0.82rem', fontWeight:700, color:'#a78bfa' }}>
                    {fmt(stats.daily.reduce((s,d)=>s+Number(d.revenue),0))}
                  </span>
                </div>
              </div>

              {/* Top events */}
              <div style={{ background:'#13131f', border:'1px solid rgba(255,255,255,0.07)', borderRadius:18, padding:24 }}>
                <h3 style={{ fontWeight:700, fontSize:'0.95rem', marginBottom:18 }}>Top Events</h3>
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  {stats.topEvents.map((ev, i) => (
                    <div key={ev.title} style={{ display:'flex', alignItems:'center', gap:12 }}>
                      <div style={{ width:26, height:26, borderRadius:8, background:'rgba(124,58,237,0.2)', border:'1px solid rgba(124,58,237,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.72rem', fontWeight:800, color:'#a78bfa', flexShrink:0 }}>#{i+1}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <p style={{ fontSize:'0.82rem', fontWeight:600, marginBottom:2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{ev.title}</p>
                        <p style={{ fontSize:'0.7rem', color:'#6b7280' }}>{ev.total_orders} pesanan</p>
                      </div>
                      <div style={{ textAlign:'right', flexShrink:0 }}>
                        <p style={{ fontSize:'0.8rem', fontWeight:700, color:'#22c55e' }}>{fmt(ev.revenue)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  )
}
