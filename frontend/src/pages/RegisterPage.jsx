import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const steps = ['Akun', 'Profil', 'Selesai']

export default function RegisterPage() {
  const navigate = useNavigate()
  const [step, setStep]       = useState(0)
  const [showPw, setShowPw]   = useState(false)
  const [showCf, setShowCf]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors]   = useState({})

  const [form, setForm] = useState({
    email: '', password: '', confirm: '',
    name: '', phone: '', birthdate: '', gender: '',
  })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  // ── Step validations ──────────────────────────────────────────────────────
  const validateStep0 = () => {
    const e = {}
    if (!form.email)    e.email    = 'Email wajib diisi.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Format email tidak valid.'
    if (!form.password) e.password = 'Password wajib diisi.'
    else if (form.password.length < 8) e.password = 'Minimal 8 karakter.'
    if (!form.confirm)  e.confirm  = 'Konfirmasi password wajib diisi.'
    else if (form.password !== form.confirm) e.confirm = 'Password tidak cocok.'
    return e
  }

  const validateStep1 = () => {
    const e = {}
    if (!form.name)  e.name  = 'Nama lengkap wajib diisi.'
    if (!form.phone) e.phone = 'Nomor HP wajib diisi.'
    return e
  }

  const handleNext = () => {
    const e = step === 0 ? validateStep0() : validateStep1()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setStep(s => s + 1)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    // Simulasi register (tanpa backend)
    setTimeout(() => {
      setLoading(false)
      setStep(2)
    }, 1400)
  }

  // ── Password strength ─────────────────────────────────────────────────────
  const pwStrength = () => {
    const p = form.password
    if (!p) return { pct: 0, label: '', color: '#374151' }
    let score = 0
    if (p.length >= 8)        score++
    if (/[A-Z]/.test(p))      score++
    if (/[0-9]/.test(p))      score++
    if (/[^A-Za-z0-9]/.test(p)) score++
    const map = [
      { pct: 25, label: 'Lemah',  color: '#ef4444' },
      { pct: 50, label: 'Cukup', color: '#f97316' },
      { pct: 75, label: 'Kuat',  color: '#eab308' },
      { pct: 100, label: 'Sangat Kuat', color: '#22c55e' },
    ]
    return map[score - 1] ?? { pct: 0, label: '', color: '#374151' }
  }
  const strength = pwStrength()

  // ── Field helper ──────────────────────────────────────────────────────────
  const Field = ({ label, name, type='text', placeholder, icon, right }) => (
    <div>
      <label style={{ display:'block', color:'#9ca3af', fontSize:'0.8rem', fontWeight:600, marginBottom:7, letterSpacing:'0.03em' }}>
        {label}
      </label>
      <div style={{ position:'relative' }}>
        {icon && <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:15 }}>{icon}</span>}
        <input
          type={type} name={name} value={form[name]}
          onChange={handleChange} placeholder={placeholder}
          style={{
            width:'100%',
            padding: `12px ${right ? '44px' : '14px'} 12px ${icon ? '42px' : '14px'}`,
            borderRadius:12,
            border: errors[name] ? '1px solid rgba(239,68,68,0.6)' : '1px solid rgba(255,255,255,0.1)',
            background:'rgba(255,255,255,0.05)', color:'#f9fafb',
            fontSize:'0.875rem', outline:'none', boxSizing:'border-box',
            transition:'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor='rgba(124,58,237,0.6)'}
          onBlur={e => e.target.style.borderColor = errors[name] ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.1)'}
        />
        {right}
      </div>
      {errors[name] && (
        <p style={{ color:'#f87171', fontSize:'0.75rem', marginTop:5 }}>⚠ {errors[name]}</p>
      )}
    </div>
  )

  return (
    <div style={{
      minHeight:'100vh', background:'#0a0a0f',
      display:'flex', alignItems:'center', justifyContent:'center',
      padding:'24px', position:'relative', overflow:'hidden',
    }}>
      {/* Orbs */}
      <div style={{ position:'absolute', top:'-8%', right:'-5%', width:480, height:480, borderRadius:'50%', background:'#7c3aed', filter:'blur(140px)', opacity:0.12, pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-8%', left:'-5%', width:380, height:380, borderRadius:'50%', background:'#ec4899', filter:'blur(120px)', opacity:0.1, pointerEvents:'none' }} />
      <div style={{ position:'absolute', inset:0, opacity:0.04, pointerEvents:'none', backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize:'32px 32px' }} />

      <div style={{ width:'100%', maxWidth:480, position:'relative', zIndex:1 }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <Link to="/" style={{ textDecoration:'none', display:'inline-flex', alignItems:'center', gap:10, marginBottom:24 }}>
            <div style={{
              width:38, height:38, borderRadius:11,
              background:'linear-gradient(135deg,#7c3aed,#ec4899)',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 4px 20px rgba(124,58,237,0.45)',
            }}>
              <span style={{ fontSize:18 }}>🎵</span>
            </div>
            <span style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:'1.2rem' }}>
              <span style={{ background:'linear-gradient(135deg,#a78bfa,#ec4899)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Konser</span>
              <span style={{ color:'#fff' }}>Ku</span>
            </span>
          </Link>
          <h1 style={{ color:'#fff', fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:'1.5rem', marginBottom:6 }}>
            Buat Akun Baru
          </h1>
          <p style={{ color:'#6b7280', fontSize:'0.85rem' }}>
            Daftar dan mulai beli tiket konser favoritmu
          </p>
        </div>

        {/* Stepper */}
        <div style={{ display:'flex', alignItems:'center', marginBottom:28 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display:'flex', alignItems:'center', flex: i < steps.length-1 ? 1 : 'none' }}>
              <div style={{
                width:36, height:36, borderRadius:'50%', flexShrink:0,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'0.8rem', fontWeight:800,
                background: i < step
                  ? 'linear-gradient(135deg,#7c3aed,#ec4899)'
                  : i === step
                    ? 'linear-gradient(135deg,#7c3aed,#ec4899)'
                    : 'rgba(255,255,255,0.06)',
                border: i <= step ? 'none' : '1px solid rgba(255,255,255,0.12)',
                color: i <= step ? '#fff' : '#4b5563',
                boxShadow: i <= step ? '0 4px 14px rgba(124,58,237,0.4)' : 'none',
              }}>
                {i < step ? '✓' : i + 1}
              </div>
              <span style={{
                marginLeft:8, fontSize:'0.78rem', fontWeight:600,
                color: i === step ? '#fff' : i < step ? '#a78bfa' : '#4b5563',
                whiteSpace:'nowrap',
              }}>
                {s}
              </span>
              {i < steps.length - 1 && (
                <div style={{
                  flex:1, height:1, margin:'0 12px',
                  background: i < step
                    ? 'linear-gradient(90deg,#7c3aed,#ec4899)'
                    : 'rgba(255,255,255,0.08)',
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div style={{
          background:'rgba(255,255,255,0.04)',
          border:'1px solid rgba(255,255,255,0.09)',
          borderRadius:24, padding:'32px 28px',
          backdropFilter:'blur(12px)',
        }}>

          {/* ── STEP 0: Akun ─────────────────────────────────── */}
          {step === 0 && (
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <Field label="Email" name="email" type="email" placeholder="nama@email.com" icon="✉️" />

              {/* Password dengan strength */}
              <div>
                <label style={{ display:'block', color:'#9ca3af', fontSize:'0.8rem', fontWeight:600, marginBottom:7, letterSpacing:'0.03em' }}>
                  Password
                </label>
                <div style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:15 }}>🔒</span>
                  <input
                    type={showPw ? 'text':'password'} name="password" value={form.password}
                    onChange={handleChange} placeholder="Min. 8 karakter"
                    style={{
                      width:'100%', padding:'12px 44px 12px 42px', borderRadius:12,
                      border: errors.password ? '1px solid rgba(239,68,68,0.6)' : '1px solid rgba(255,255,255,0.1)',
                      background:'rgba(255,255,255,0.05)', color:'#f9fafb',
                      fontSize:'0.875rem', outline:'none', boxSizing:'border-box',
                      transition:'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor='rgba(124,58,237,0.6)'}
                    onBlur={e => e.target.style.borderColor = errors.password ? 'rgba(239,68,68,0.6)':'rgba(255,255,255,0.1)'}
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#6b7280', fontSize:15, padding:0 }}>
                    {showPw ? '🙈':'👁️'}
                  </button>
                </div>
                {/* Strength bar */}
                {form.password && (
                  <div style={{ marginTop:8 }}>
                    <div style={{ height:4, borderRadius:2, background:'rgba(255,255,255,0.06)', overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${strength.pct}%`, background:strength.color, borderRadius:2, transition:'width 0.3s, background 0.3s' }} />
                    </div>
                    <p style={{ fontSize:'0.7rem', color:strength.color, marginTop:4 }}>{strength.label}</p>
                  </div>
                )}
                {errors.password && <p style={{ color:'#f87171', fontSize:'0.75rem', marginTop:5 }}>⚠ {errors.password}</p>}
              </div>

              {/* Confirm password */}
              <div>
                <label style={{ display:'block', color:'#9ca3af', fontSize:'0.8rem', fontWeight:600, marginBottom:7, letterSpacing:'0.03em' }}>
                  Konfirmasi Password
                </label>
                <div style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:15 }}>🔐</span>
                  <input
                    type={showCf ? 'text':'password'} name="confirm" value={form.confirm}
                    onChange={handleChange} placeholder="Ulangi password"
                    style={{
                      width:'100%', padding:'12px 44px 12px 42px', borderRadius:12,
                      border: errors.confirm
                        ? '1px solid rgba(239,68,68,0.6)'
                        : form.confirm && form.confirm === form.password
                          ? '1px solid rgba(34,197,94,0.5)'
                          : '1px solid rgba(255,255,255,0.1)',
                      background:'rgba(255,255,255,0.05)', color:'#f9fafb',
                      fontSize:'0.875rem', outline:'none', boxSizing:'border-box',
                      transition:'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor='rgba(124,58,237,0.6)'}
                    onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.1)'}
                  />
                  <button type="button" onClick={() => setShowCf(!showCf)} style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#6b7280', fontSize:15, padding:0 }}>
                    {showCf ? '🙈':'👁️'}
                  </button>
                  {form.confirm && form.confirm === form.password && (
                    <span style={{ position:'absolute', right:40, top:'50%', transform:'translateY(-50%)', color:'#22c55e', fontSize:14 }}>✓</span>
                  )}
                </div>
                {errors.confirm && <p style={{ color:'#f87171', fontSize:'0.75rem', marginTop:5 }}>⚠ {errors.confirm}</p>}
              </div>

              <button onClick={handleNext} style={{
                width:'100%', padding:'13px', borderRadius:12, marginTop:4,
                background:'linear-gradient(135deg,#7c3aed,#ec4899)', color:'#fff',
                fontWeight:700, fontSize:'0.9rem', border:'none', cursor:'pointer',
                boxShadow:'0 8px 24px rgba(124,58,237,0.35)',
                transition:'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(124,58,237,0.5)' }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(124,58,237,0.35)' }}
              >
                Lanjut →
              </button>
            </div>
          )}

          {/* ── STEP 1: Profil ───────────────────────────────── */}
          {step === 1 && (
            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <Field label="Nama Lengkap" name="name" placeholder="Nama kamu" icon="👤" />
              <Field label="Nomor HP" name="phone" type="tel" placeholder="08xxxxxxxxxx" icon="📱" />

              {/* Tanggal lahir */}
              <div>
                <label style={{ display:'block', color:'#9ca3af', fontSize:'0.8rem', fontWeight:600, marginBottom:7, letterSpacing:'0.03em' }}>
                  Tanggal Lahir <span style={{ color:'#4b5563', fontWeight:400 }}>(opsional)</span>
                </label>
                <div style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:15 }}>🎂</span>
                  <input
                    type="date" name="birthdate" value={form.birthdate}
                    onChange={handleChange}
                    style={{
                      width:'100%', padding:'12px 14px 12px 42px', borderRadius:12,
                      border:'1px solid rgba(255,255,255,0.1)',
                      background:'rgba(255,255,255,0.05)', color:'#f9fafb',
                      fontSize:'0.875rem', outline:'none', boxSizing:'border-box',
                      colorScheme:'dark',
                    }}
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label style={{ display:'block', color:'#9ca3af', fontSize:'0.8rem', fontWeight:600, marginBottom:10, letterSpacing:'0.03em' }}>
                  Jenis Kelamin <span style={{ color:'#4b5563', fontWeight:400 }}>(opsional)</span>
                </label>
                <div style={{ display:'flex', gap:10 }}>
                  {['Laki-laki','Perempuan'].map(g => (
                    <button
                      key={g} type="button"
                      onClick={() => setForm({ ...form, gender: g })}
                      style={{
                        flex:1, padding:'11px', borderRadius:12, cursor:'pointer',
                        border: form.gender === g ? 'none' : '1px solid rgba(255,255,255,0.1)',
                        background: form.gender === g
                          ? 'linear-gradient(135deg,#7c3aed,#ec4899)'
                          : 'rgba(255,255,255,0.05)',
                        color: form.gender === g ? '#fff' : '#9ca3af',
                        fontSize:'0.85rem', fontWeight:600,
                        boxShadow: form.gender === g ? '0 4px 14px rgba(124,58,237,0.35)' : 'none',
                        transition:'all 0.2s',
                      }}
                    >
                      {g === 'Laki-laki' ? '👨 ' : '👩 '}{g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terms */}
              <label style={{ display:'flex', alignItems:'flex-start', gap:10, cursor:'pointer' }}>
                <input type="checkbox" required style={{ accentColor:'#7c3aed', width:16, height:16, marginTop:2, flexShrink:0 }} />
                <span style={{ color:'#9ca3af', fontSize:'0.8rem', lineHeight:1.5 }}>
                  Saya menyetujui{' '}
                  <a href="#" style={{ color:'#a78bfa', textDecoration:'none' }}>Syarat & Ketentuan</a>
                  {' '}dan{' '}
                  <a href="#" style={{ color:'#a78bfa', textDecoration:'none' }}>Kebijakan Privasi</a>
                </span>
              </label>

              <div style={{ display:'flex', gap:10, marginTop:4 }}>
                <button
                  type="button" onClick={() => setStep(0)}
                  style={{
                    flex:1, padding:'13px', borderRadius:12,
                    background:'rgba(255,255,255,0.06)',
                    border:'1px solid rgba(255,255,255,0.1)',
                    color:'#9ca3af', fontWeight:600, fontSize:'0.875rem', cursor:'pointer',
                  }}
                >
                  ← Kembali
                </button>
                <button
                  type="submit" disabled={loading}
                  style={{
                    flex:2, padding:'13px', borderRadius:12,
                    background: loading ? 'rgba(124,58,237,0.5)' : 'linear-gradient(135deg,#7c3aed,#ec4899)',
                    color:'#fff', fontWeight:700, fontSize:'0.9rem',
                    border:'none', cursor: loading ? 'not-allowed':'pointer',
                    boxShadow: loading ? 'none' : '0 8px 24px rgba(124,58,237,0.35)',
                    display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                  }}
                >
                  {loading ? <><span>⏳</span> Mendaftar...</> : 'Daftar Sekarang'}
                </button>
              </div>
            </form>
          )}

          {/* ── STEP 2: Selesai ──────────────────────────────── */}
          {step === 2 && (
            <div style={{ textAlign:'center', padding:'16px 0' }}>
              <div style={{
                width:80, height:80, borderRadius:'50%', margin:'0 auto 20px',
                background:'linear-gradient(135deg,#7c3aed,#ec4899)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:38, boxShadow:'0 12px 32px rgba(124,58,237,0.45)',
              }}>
                🎉
              </div>
              <h2 style={{ color:'#fff', fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:'1.4rem', marginBottom:10 }}>
                Selamat Bergabung!
              </h2>
              <p style={{ color:'#9ca3af', fontSize:'0.875rem', lineHeight:1.65, marginBottom:28 }}>
                Akun kamu berhasil dibuat. Sekarang kamu bisa mulai cari dan beli tiket konser favorit!
              </p>

              {/* Summary */}
              <div style={{
                background:'rgba(124,58,237,0.1)', border:'1px solid rgba(124,58,237,0.25)',
                borderRadius:14, padding:'16px 20px', marginBottom:28, textAlign:'left',
              }}>
                <p style={{ color:'#a78bfa', fontSize:'0.75rem', fontWeight:700, marginBottom:10, letterSpacing:'0.08em', textTransform:'uppercase' }}>Detail Akun</p>
                {[
                  { label:'Nama', val: form.name || '-' },
                  { label:'Email', val: form.email },
                ].map(r => (
                  <div key={r.label} style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                    <span style={{ color:'#6b7280', fontSize:'0.82rem' }}>{r.label}</span>
                    <span style={{ color:'#f9fafb', fontSize:'0.82rem', fontWeight:600 }}>{r.val}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/')}
                style={{
                  width:'100%', padding:'14px', borderRadius:12,
                  background:'linear-gradient(135deg,#7c3aed,#ec4899)',
                  color:'#fff', fontWeight:700, fontSize:'0.95rem',
                  border:'none', cursor:'pointer',
                  boxShadow:'0 8px 24px rgba(124,58,237,0.4)',
                  transition:'transform 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
              >
                Mulai Jelajahi Konser 🎸
              </button>
            </div>
          )}

          {/* Login link (hanya step 0 & 1) */}
          {step < 2 && (
            <p style={{ textAlign:'center', marginTop:22, color:'#6b7280', fontSize:'0.85rem' }}>
              Sudah punya akun?{' '}
              <Link to="/login" style={{ color:'#a78bfa', fontWeight:700, textDecoration:'none' }}>
                Masuk di sini →
              </Link>
            </p>
          )}
        </div>

        {/* Back to home */}
        <div style={{ textAlign:'center', marginTop:20 }}>
          <Link to="/" style={{ color:'#4b5563', fontSize:'0.8rem', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:5 }}>
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}
