import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [form, setForm]   = useState({ email:'admin@konserku.id', password:'admin123' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await api.post('/auth/login', form)
      if (res.data.success && res.data.data.user.role === 'admin') {
        localStorage.setItem('kk_token', res.data.data.token)
        localStorage.setItem('kk_user',  JSON.stringify(res.data.data.user))
        navigate('/admin/dashboard')
      } else {
        setError('Akses ditolak. Akun bukan admin.')
      }
    } catch (err) {
      // Offline fallback
      if (form.email === 'admin@konserku.id' && form.password === 'admin123') {
        localStorage.setItem('kk_token', 'offline_admin_token')
        localStorage.setItem('kk_user',  JSON.stringify({ id:1, name:'Administrator', email:form.email, role:'admin' }))
        navigate('/admin/dashboard')
      } else {
        setError('Email atau password salah')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight:'100vh', background:'linear-gradient(135deg,#0a0a0f 0%,#0d0620 50%,#0a0a0f 100%)',
      display:'flex', alignItems:'center', justifyContent:'center', padding:24,
      fontFamily:'Inter,sans-serif',
    }}>
      {/* orbs */}
      <div style={{ position:'fixed',top:'10%',left:'5%',width:400,height:400,borderRadius:'50%',background:'#7c3aed',filter:'blur(130px)',opacity:0.1,pointerEvents:'none' }} />
      <div style={{ position:'fixed',bottom:'10%',right:'5%',width:350,height:350,borderRadius:'50%',background:'#ec4899',filter:'blur(110px)',opacity:0.08,pointerEvents:'none' }} />

      <div style={{ width:'100%', maxWidth:420, position:'relative', zIndex:1 }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <div style={{ width:60, height:60, borderRadius:18, background:'linear-gradient(135deg,#7c3aed,#ec4899)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', boxShadow:'0 8px 28px rgba(124,58,237,0.45)', fontSize:28 }}>🎛️</div>
          <h1 style={{ color:'#fff', fontFamily:'Poppins,sans-serif', fontWeight:900, fontSize:'1.6rem', marginBottom:4 }}>Admin Panel</h1>
          <p style={{ color:'#6b7280', fontSize:'0.85rem' }}>KonserKu Management System</p>
        </div>

        <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.09)', borderRadius:24, padding:'32px 28px', backdropFilter:'blur(12px)' }}>
          {error && (
            <div style={{ background:'rgba(239,68,68,0.12)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:10, padding:'12px 16px', marginBottom:18, color:'#fca5a5', fontSize:'0.82rem' }}>
              ⚠️ {error}
            </div>
          )}
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {[
              { label:'Email Admin', name:'email', type:'email', icon:'✉️' },
              { label:'Password',   name:'password', type:'password', icon:'🔒' },
            ].map(f => (
              <div key={f.name}>
                <label style={{ display:'block', color:'#9ca3af', fontSize:'0.8rem', fontWeight:600, marginBottom:7 }}>{f.label}</label>
                <div style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)', fontSize:15 }}>{f.icon}</span>
                  <input
                    type={f.type} name={f.name} value={form[f.name]}
                    onChange={e => setForm({...form, [e.target.name]:e.target.value})}
                    style={{ width:'100%', padding:'12px 14px 12px 40px', borderRadius:12, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.05)', color:'#f9fafb', fontSize:'0.875rem', outline:'none', boxSizing:'border-box' }}
                    onFocus={e => e.target.style.borderColor='rgba(124,58,237,0.6)'}
                    onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.1)'}
                  />
                </div>
              </div>
            ))}
            <button type="submit" disabled={loading} style={{ marginTop:8, width:'100%', padding:'13px', borderRadius:12, background: loading?'rgba(124,58,237,0.5)':'linear-gradient(135deg,#7c3aed,#ec4899)', color:'#fff', fontWeight:700, fontSize:'0.95rem', border:'none', cursor: loading?'not-allowed':'pointer', boxShadow:'0 8px 24px rgba(124,58,237,0.35)' }}>
              {loading ? '⏳ Masuk...' : '🔐 Masuk ke Panel Admin'}
            </button>
          </form>
          <p style={{ textAlign:'center', marginTop:20, color:'#4b5563', fontSize:'0.78rem' }}>
            Default: admin@konserku.id / admin123
          </p>
        </div>
      </div>
    </div>
  )
}
