const SearchIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const TicketIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M13 5v2" />
    <path d="M13 17v2" />
    <path d="M13 11v2" />
  </svg>
)

const CardIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
)

const MusicCheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
)

const icons = [SearchIcon, TicketIcon, CardIcon, MusicCheckIcon]

const steps = [
  {
    n: '01',
    title: 'Cari Event',
    desc: 'Temukan konser atau event favoritmu dari ribuan pilihan di seluruh Indonesia.',
  },
  {
    n: '02',
    title: 'Pilih Tiket',
    desc: 'Pilih kategori tiket yang sesuai budget dan preferensi tempat dudukmu.',
  },
  {
    n: '03',
    title: 'Bayar Mudah',
    desc: 'Bayar dengan transfer bank, e-wallet, kartu kredit, dan banyak metode lainnya.',
  },
  {
    n: '04',
    title: 'Nikmati Konser',
    desc: 'Dapatkan e-tiket di emailmu dan tunjukkan QR code saat masuk ke venue.',
  },
]

export default function HowItWorks() {
  return (
    <section style={{ padding: '100px 0 88px', background: '#0c0a14' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>

        {/* ── Header — left-aligned, editorial ── */}
        <div style={{ marginBottom: 64 }}>
          <p style={{
            fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: '#d97706', marginBottom: 12,
          }}>
            Panduan Pembelian
          </p>
          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(1.9rem, 4vw, 2.8rem)',
            fontWeight: 400,
            color: '#f8f7f4',
            lineHeight: 1.18,
            letterSpacing: '-0.01em',
            margin: 0,
          }}>
            Kemudahan memesan tiket
            <br />
            <span style={{ color: '#d97706', fontStyle: 'italic' }}>langsung dari perangkatmu</span>
          </h2>
          <p style={{
            color: '#a1a1aa', marginTop: 14, fontSize: '0.9rem',
            lineHeight: 1.6, maxWidth: 440,
          }}>
            Beli tiket konser favoritmu dalam hitungan menit — tanpa antri dan langsung terbit di email.
          </p>
        </div>

        {/* ── Steps — numbered list rows ── */}
        <div>
          {steps.map((st, i) => {
            const Icon = icons[i]
            return (
              <div key={st.n}>
                {/* Divider line */}
                <div style={{
                  height: 1,
                  background: 'rgba(255,255,255,0.06)',
                }} />

                {/* Step row */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '72px 56px 1fr',
                    alignItems: 'center',
                    gap: 24,
                    padding: '36px 0',
                    transition: 'background 0.25s ease',
                    borderRadius: 12,
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {/* Oversized serif number */}
                  <span style={{
                    fontFamily: "'DM Serif Display', Georgia, serif",
                    fontSize: '2.5rem',
                    fontWeight: 400,
                    lineHeight: 1,
                    color: '#d97706',
                    letterSpacing: '-0.02em',
                  }}>
                    {st.n}
                  </span>

                  {/* Icon */}
                  <div style={{
                    width: 48, height: 48,
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#d4d4d8',
                    flexShrink: 0,
                  }}>
                    <Icon />
                  </div>

                  {/* Title + description */}
                  <div>
                    <h3 style={{
                      fontFamily: "'Inter', 'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '1.05rem',
                      color: '#e5e7eb',
                      margin: '0 0 6px',
                      letterSpacing: '-0.01em',
                    }}>
                      {st.title}
                    </h3>
                    <p style={{
                      color: '#6b7280',
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      margin: 0,
                    }}>
                      {st.desc}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Bottom divider */}
          <div style={{
            height: 1,
            background: 'rgba(255,255,255,0.06)',
          }} />
        </div>

        {/* ── CTA — subtle pill ── */}
        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <button
            style={{
              padding: '14px 40px',
              borderRadius: 9999,
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              background: '#4f46e5',
              transition: 'background 0.2s ease, transform 0.2s ease',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#4338ca'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#4f46e5'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Mulai Beli Tiket Sekarang
          </button>
          <p style={{ color: '#4b5563', fontSize: '0.8rem', marginTop: 14 }}>
            Tidak perlu mendaftar untuk melihat event
          </p>
        </div>
      </div>

      {/* Responsive mobile override */}
      <style>{`
        @media (max-width: 640px) {
          /* Stack step rows vertically on mobile */
          section div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
            padding: 28px 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
