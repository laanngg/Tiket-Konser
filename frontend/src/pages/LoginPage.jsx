import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm]       = useState({ email: '', password: '' })
  const [show, setShow]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Email dan password wajib diisi.')
      return
    }
    setLoading(true)
    // Simulasi login (tanpa backend)
    setTimeout(() => {
      setLoading(false)
      navigate('/')
    }, 1200)
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0a0a0f',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background orbs */}
      <div style={{ position:'absolute', top:'-10%', left:'-5%', width:500, height:500, borderRadius:'50%', background:'#7c3aed', filter:'blur(140px)', opacity:0.12, pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-10%', right:'-5%', width:400, height:400, borderRadius:'50%', background:'#ec4899', filter:'blur(120px)', opacity:0.1, pointerEvents:'none' }} />
      {/* Grid dots */}
      <div style={{
        position:'absolute', inset:0, opacity:0.04, pointerEvents:'none',
        backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
        backgroundSize:'32px 32px',
      }} />

      <div style={{ width:'100%', maxWidth:440, position:'relative', zIndex:1 }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <Link to="/" style={{ textDecoration:'none', display:'inline-flex', alignItems:'center', gap:10, marginBottom:28 }}>
            <div style={{
              width:40, height:40, borderRadius:12,
              background:'linear-gradient(135deg,#7c3aed,#ec4899)',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 4px 20px rgba(124,58,237,0.45)',
            }}>
              <span style={{ fontSize:20 }}>🎵</span>
            </div>
            <span style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:'1.3rem' }}>
              <span style={{ background:'linear-gradient(135deg,#a78bfa,#ec4899)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Konser</span>
              <span style={{ color:'#fff' }}>Ku</span>
            </span>
          </Link>
          <h1 style={{ color:'#fff', fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:'1.6rem', marginBottom:8 }}>
            Selamat Datang Kembali
          </h1>
          <p style={{ color:'#6b7280', fontSize:'0.875rem' }}>
            Masuk untuk akses tiket konser favoritmu
          </p>
        </div>

        {/* Card */}
        <div style={{
          background:'rgba(255,255,255,0.04)',
          border:'1px solid rgba(255,255,255,0.09)',
          borderRadius:24, padding:'36px 32px',
          backdropFilter:'blur(12px)',
        }}>
          {/* Social login */}
          <div style={{ display:'flex', gap:12, marginBottom:24 }}>
            {[
              { icon:'🌐', label:'Google' },
              { icon:'🍎', label:'Apple' },
            ].map(s => (
              <button key={s.label} style={{
                flex:1, padding:'11px', borderRadius:12,
                background:'rgba(255,255,255,0.05)',
                border:'1px solid rgba(255,255,255,0.1)',
                color:'#d1d5db', fontSize:'0.85rem', fontWeight:600,
                cursor:'pointer', display:'flex', alignItems:'center',
                justifyContent:'center', gap:8,
                transition:'background 0.2s, border-color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.09)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.2)' }}
                onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)' }}
              >
                <span>{s.icon}</span> {s.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
            <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.08)' }} />
            <span style={{ color:'#4b5563', fontSize:'0.78rem' }}>atau masuk dengan email</span>
            <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Error */}
          {error && (
            <div style={{
              padding:'12px 16px', borderRadius:10, marginBottom:20,
              background:'rgba(239,68,68,0.12)', border:'1px solid rgba(239,68,68,0.3)',
              color:'#fca5a5', fontSize:'0.82rem',
              display:'flex', alignItems:'center', gap:8,
            }}>
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {/* Email */}
            <div>
              <label style={{ display:'block', color:'#9ca3af', fontSize:'0.8rem', fontWeight:600, marginBottom:7, letterSpacing:'0.03em' }}>
                Email
              </label>
              <div style={{ position:'relative' }}>
                <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:16 }}>✉️</span>
                <input
                  type="email" name="email" value={form.email}
                  onChange={handleChange}
                  placeholder="nama@email.com"
                  style={{
                    width:'100%', padding:'12px 14px 12px 42px',
                    borderRadius:12, border:'1px solid rgba(255,255,255,0.1)',
                    background:'rgba(255,255,255,0.05)', color:'#f9fafb',
                    fontSize:'0.875rem', outline:'none', boxSizing:'border-box',
                    transition:'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor='rgba(124,58,237,0.6)'}
                  onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.1)'}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:7 }}>
                <label style={{ color:'#9ca3af', fontSize:'0.8rem', fontWeight:600, letterSpacing:'0.03em' }}>
                  Password
                </label>
                <a href="#" style={{ color:'#a78bfa', fontSize:'0.78rem', textDecoration:'none', fontWeight:500 }}>
                  Lupa password?
                </a>
              </div>
              <div style={{ position:'relative' }}>
                <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:16 }}>🔒</span>
                <input
                  type={show ? 'text' : 'password'} name="password" value={form.password}
                  onChange={handleChange}
                  placeholder="Masukkan password"
                  style={{
                    width:'100%', padding:'12px 44px 12px 42px',
                    borderRadius:12, border:'1px solid rgba(255,255,255,0.1)',
                    background:'rgba(255,255,255,0.05)', color:'#f9fafb',
                    fontSize:'0.875rem', outline:'none', boxSizing:'border-box',
                    transition:'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor='rgba(124,58,237,0.6)'}
                  onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.1)'}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  style={{
                    position:'absolute', right:14, top:'50%', transform:'translateY(-50%)',
                    background:'none', border:'none', cursor:'pointer',
                    color:'#6b7280', fontSize:16, padding:0, lineHeight:1,
                  }}
                >
                  {show ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
              <input type="checkbox" style={{ accentColor:'#7c3aed', width:16, height:16 }} />
              <span style={{ color:'#9ca3af', fontSize:'0.82rem' }}>Ingat saya</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width:'100%', padding:'14px', borderRadius:12, marginTop:4,
                background: loading ? 'rgba(124,58,237,0.5)' : 'linear-gradient(135deg,#7c3aed,#ec4899)',
                color:'#fff', fontWeight:700, fontSize:'0.95rem',
                border:'none', cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '0 8px 24px rgba(124,58,237,0.4)',
                transition:'transform 0.2s, box-shadow 0.2s',
                display:'flex', alignItems:'center', justifyContent:'center', gap:8,
              }}
              onMouseEnter={e => { if(!loading){ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(124,58,237,0.55)' }}}
              onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(124,58,237,0.4)' }}
            >
              {loading
                ? <><span style={{ animation:'spin 1s linear infinite', display:'inline-block' }}>⏳</span> Memproses...</>
                : 'Masuk Sekarang'
              }
            </button>
          </form>

          {/* Register link */}
          <p style={{ textAlign:'center', marginTop:24, color:'#6b7280', fontSize:'0.85rem' }}>
            Belum punya akun?{' '}
            <Link to="/register" style={{ color:'#a78bfa', fontWeight:700, textDecoration:'none' }}>
              Daftar Gratis →
            </Link>
          </p>
        </div>

        {/* Back to home */}
        <div style={{ textAlign:'center', marginTop:20 }}>
          <Link to="/" style={{
            color:'#4b5563', fontSize:'0.8rem', textDecoration:'none',
            display:'inline-flex', alignItems:'center', gap:5,
          }}>
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}
