const promos = [
  {
    id: 1,
    tag: 'Penawaran Spesial',
    title: 'Early Bird',
    sub: 'Diskon 30%',
    desc: 'Pesan tiket lebih awal untuk pertunjukan pilihan bulan ini dan dapatkan harga terbaik.',
    code: 'EARLY30',
    expires: '31 Agustus 2026',
    accent: '#d97706',
  },
  {
    id: 2,
    tag: 'Pengguna Baru',
    title: 'Bebas Biaya Admin',
    sub: 'Hemat 100%',
    desc: 'Registrasi akun KonserKu hari ini dan nikmati transaksi pertama tanpa biaya pemesanan.',
    code: 'NEWUSER',
    expires: 'Periode Terbatas',
    accent: '#4f46e5',
  },
]

const stats = [
  { val: '50.000+', label: 'Tiket Terjual' },
  { val: '500+',    label: 'Pertunjukan Live' },
  { val: '200+',    label: 'Artis & Musisi' },
  { val: '4.9/5',   label: 'Kepuasan Penonton' },
]

export default function PromoSection() {
  return (
    <section style={{
      padding: '96px 0',
      background: '#0c0a14',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>

        {/* Header */}
        <div style={{ marginBottom: 44 }}>
          <p style={{
            fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: '#d97706', marginBottom: 8,
          }}>
            Benefit & Penawaran
          </p>
          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(1.9rem, 3.8vw, 2.6rem)',
            fontWeight: 400, color: '#f8f7f4', lineHeight: 1.15,
            letterSpacing: '-0.01em', margin: 0,
          }}>
            Penawaran <span style={{ color: '#d97706', fontStyle: 'italic' }}>Eksklusif</span>
          </h2>
        </div>

        {/* Promo cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 24, marginBottom: 68,
        }}>
          {promos.map(p => (
            <div
              key={p.id}
              style={{
                borderRadius: 16,
                padding: '36px 34px',
                background: '#12101b',
                border: '1px solid rgba(255,255,255,0.06)',
                borderTop: `3px solid ${p.accent}`,
                position: 'relative',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <span style={{
                  fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: p.accent,
                }}>
                  {p.tag}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#71717a' }}>
                  {p.expires}
                </span>
              </div>

              <h3 style={{
                color: '#f8f7f4',
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontWeight: 400, fontSize: '1.5rem', marginBottom: 6,
                lineHeight: 1.2,
              }}>
                {p.title}
              </h3>

              <p style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: '2.4rem',
                marginBottom: 14,
                color: p.accent,
                lineHeight: 1.1,
              }}>
                {p.sub}
              </p>

              <p style={{
                color: '#a1a1aa', fontSize: '0.86rem',
                lineHeight: 1.6, marginBottom: 28,
              }}>
                {p.desc}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px dashed rgba(255,255,255,0.15)',
                  borderRadius: 8, padding: '7px 14px',
                }}>
                  <span style={{ fontSize: '0.7rem', color: '#71717a' }}>Kode:</span>
                  <span style={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    fontSize: '0.86rem', color: '#f8f7f4', letterSpacing: '0.08em',
                  }}>
                    {p.code}
                  </span>
                </div>

                <button
                  style={{
                    padding: '8px 18px', borderRadius: 99,
                    background: p.accent === '#d97706' ? '#d97706' : '#4f46e5',
                    color: '#f8f7f4',
                    fontWeight: 600, fontSize: '0.8rem',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Klaim Promo
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats — minimal editorial divider */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 20,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 48,
        }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'left', padding: '0 8px' }}>
              <p style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: '2.4rem',
                color: '#f8f7f4',
                marginBottom: 4,
                lineHeight: 1,
              }}>
                {s.val}
              </p>
              <p style={{
                color: '#71717a',
                fontSize: '0.8rem',
                fontWeight: 500,
                letterSpacing: '0.02em',
                margin: 0,
              }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
