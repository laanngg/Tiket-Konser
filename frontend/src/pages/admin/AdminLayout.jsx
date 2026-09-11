import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const menu = [
  { path:'/admin/dashboard', icon:'📊', label:'Dashboard' },
  { path:'/admin/events',    icon:'🎪', label:'Events' },
  { path:'/admin/orders',    icon:'🎫', label:'Orders' },
  { path:'/admin/users',     icon:'👥', label:'Users' },
]

export default function AdminLayout({ children }) {
  const location = useLocation()
  const navigate  = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  const user = JSON.parse(localStorage.getItem('kk_user') || '{}')

  const logout = () => {
    localStorage.removeItem('kk_token')
    localStorage.removeItem('kk_user')
    navigate('/admin')
  }

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#0a0a0f', fontFamily:'Inter,sans-serif', color:'#fff' }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: collapsed ? 68 : 230, flexShrink:0,
        background:'#0d0d1a', borderRight:'1px solid rgba(255,255,255,0.07)',
        display:'flex', flexDirection:'column',
        transition:'width 0.3s', overflow:'hidden',
        position:'sticky', top:0, height:'100vh',
      }}>
        {/* Logo */}
        <div style={{ padding:'20px 18px', borderBottom:'1px solid rgba(255,255,255,0.07)', display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:34, height:34, borderRadius:10, background:'linear-gradient(135deg,#7c3aed,#ec4899)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:16 }}>🎛️</div>
          {!collapsed && <span style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:'1rem', whiteSpace:'nowrap' }}>Admin Panel</span>}
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:'16px 10px' }}>
          {menu.map(m => {
            const active = location.pathname === m.path
            return (
              <Link key={m.path} to={m.path} style={{
                display:'flex', alignItems:'center', gap:12, padding:'10px 10px',
                borderRadius:12, marginBottom:4, textDecoration:'none',
                background: active ? 'rgba(124,58,237,0.2)' : 'transparent',
                border: active ? '1px solid rgba(124,58,237,0.4)' : '1px solid transparent',
                color: active ? '#a78bfa' : '#6b7280',
                transition:'all 0.2s',
              }}
                onMouseEnter={e => { if(!active){ e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.color='#fff' } }}
                onMouseLeave={e => { if(!active){ e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#6b7280' } }}
              >
                <span style={{ fontSize:18, flexShrink:0 }}>{m.icon}</span>
                {!collapsed && <span style={{ fontSize:'0.875rem', fontWeight:500, whiteSpace:'nowrap' }}>{m.label}</span>}
                {active && !collapsed && <div style={{ marginLeft:'auto', width:6, height:6, borderRadius:'50%', background:'#a78bfa' }} />}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding:'12px 10px', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
          {!collapsed && (
            <div style={{ padding:'10px 10px', marginBottom:8 }}>
              <p style={{ fontSize:'0.78rem', fontWeight:600, color:'#fff', marginBottom:2 }}>{user.name}</p>
              <p style={{ fontSize:'0.7rem', color:'#4b5563' }}>{user.email}</p>
            </div>
          )}
          <button onClick={() => setCollapsed(!collapsed)} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 10px', width:'100%', borderRadius:10, background:'rgba(255,255,255,0.05)', border:'none', color:'#6b7280', cursor:'pointer', marginBottom:6, fontSize:'0.8rem' }}>
            <span>{collapsed ? '→' : '←'}</span>
            {!collapsed && 'Ciutkan'}
          </button>
          <button onClick={logout} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 10px', width:'100%', borderRadius:10, background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', color:'#f87171', cursor:'pointer', fontSize:'0.8rem' }}>
            <span>🚪</span>
            {!collapsed && 'Keluar'}
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main style={{ flex:1, overflow:'auto', minWidth:0 }}>
        {children}
      </main>
    </div>
  )
}
