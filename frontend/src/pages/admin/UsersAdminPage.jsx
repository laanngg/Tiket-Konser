import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'
import api from '../../api'

const mockUsers = Array.from({ length: 15 }, (_, i) => ({
  id: i+1,
  name: ['Budi Santoso','Ani Rahayu','Doni Pratama','Sari Dewi','Riko Hermawan','Maya Putri','Andi Kurniawan','Lina Susanti','Fajar Nugroho','Dewi Lestari','Hendra Wijaya','Nita Sari','Bambang Priyanto','Citra Amelia','Yusuf Hidayat'][i],
  email: `user${i+1}@email.com`,
  phone: `08${Math.floor(Math.random()*9000000000+1000000000)}`,
  role: i===0?'admin':'user',
  created_at: new Date(Date.now() - i*86400000*3).toISOString(),
}))

export default function UsersAdminPage() {
  const [users, setUsers]     = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')

  useEffect(() => {
    api.get('/admin/users').then(r => setUsers(r.data.data)).catch(() => setUsers(mockUsers)).finally(() => setLoading(false))
  }, [])

  const filtered = users.filter(u => {
    const q = search.toLowerCase()
    return !q || u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q)
  })

  return (
    <AdminLayout>
      <div style={{ padding:'32px 28px' }}>
        <div style={{ marginBottom:24 }}>
          <p style={{ color:'#6b7280', fontSize:'0.8rem', marginBottom:4 }}>Kelola</p>
          <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, fontSize:'1.6rem', color:'#fff' }}>Users</h1>
        </div>

        {/* Search */}
        <div style={{ position:'relative', maxWidth:360, marginBottom:20 }}>
          <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', fontSize:14, color:'#6b7280' }}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari nama atau email..." style={{ width:'100%', padding:'10px 12px 10px 36px', borderRadius:12, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.05)', color:'#fff', fontSize:'0.85rem', outline:'none', boxSizing:'border-box' }} />
        </div>

        <div style={{ background:'#13131f', border:'1px solid rgba(255,255,255,0.07)', borderRadius:18, overflow:'hidden' }}>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
                  {['#','Nama','Email','No. HP','Role','Bergabung'].map(h => (
                    <th key={h} style={{ padding:'13px 16px', textAlign:'left', fontSize:'0.72rem', fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.08em', whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading
                  ? <tr><td colSpan={6} style={{ textAlign:'center', padding:40, color:'#4b5563' }}>⏳ Memuat...</td></tr>
                  : filtered.map((u, i) => (
                    <tr key={u.id} style={{ borderBottom:'1px solid rgba(255,255,255,0.04)', background: i%2===0?'transparent':'rgba(255,255,255,0.01)' }}>
                      <td style={{ padding:'13px 16px', color:'#4b5563', fontSize:'0.8rem' }}>{u.id}</td>
                      <td style={{ padding:'13px 16px' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div style={{ width:34, height:34, borderRadius:10, background:'linear-gradient(135deg,#7c3aed,#ec4899)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.75rem', fontWeight:800, flexShrink:0 }}>
                            {u.name?.[0]?.toUpperCase()}
                          </div>
                          <span style={{ fontSize:'0.85rem', fontWeight:600 }}>{u.name}</span>
                        </div>
                      </td>
                      <td style={{ padding:'13px 16px', fontSize:'0.82rem', color:'#9ca3af' }}>{u.email}</td>
                      <td style={{ padding:'13px 16px', fontSize:'0.82rem', color:'#9ca3af' }}>{u.phone || '-'}</td>
                      <td style={{ padding:'13px 16px' }}>
                        <span style={{
                          padding:'3px 10px', borderRadius:8, fontSize:'0.72rem', fontWeight:700,
                          background: u.role==='admin'?'rgba(124,58,237,0.2)':'rgba(255,255,255,0.06)',
                          border: u.role==='admin'?'1px solid rgba(124,58,237,0.4)':'1px solid rgba(255,255,255,0.1)',
                          color: u.role==='admin'?'#a78bfa':'#9ca3af',
                          textTransform:'capitalize',
                        }}>{u.role}</span>
                      </td>
                      <td style={{ padding:'13px 16px', fontSize:'0.8rem', color:'#6b7280', whiteSpace:'nowrap' }}>
                        {new Date(u.created_at).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'})}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          {!loading && <div style={{ padding:'12px 16px', borderTop:'1px solid rgba(255,255,255,0.05)', fontSize:'0.75rem', color:'#4b5563' }}>{filtered.length} dari {users.length} pengguna</div>}
        </div>
      </div>
    </AdminLayout>
  )
}
