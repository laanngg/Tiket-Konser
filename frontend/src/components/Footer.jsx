export default function Footer() {
  const socialLinks = [
    { label: 'Fb', href: '#' },
    { label: 'Ig', href: '#' },
    { label: 'X', href: '#' },
    { label: 'Yt', href: '#' },
  ]

  const linkColumns = [
    { title: 'Event', links: ['Semua Konser', 'Festival Musik', 'Stand Up Comedy', 'Olahraga', 'Theater'] },
    { title: 'Bantuan', links: ['FAQ', 'Cara Pembelian', 'Kebijakan Refund', 'Hubungi Kami', 'Lapor Masalah'] },
    { title: 'Perusahaan', links: ['Tentang Kami', 'Karir', 'Blog', 'Mitra Kami', 'Press Kit'] },
  ]

  const paymentMethods = ['VISA', 'Mastercard', 'BCA', 'GoPay', 'OVO']

  return (
    <footer style={{ background: '#08080f', borderTop: '1px solid rgba(255,255,255,0.06)' }}>

      {/* Newsletter */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 24px' }}>
          <div className="newsletter-row">
            <div style={{ maxWidth: 380 }}>
              <h3 style={{
                color: '#f8f7f4',
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontWeight: 400,
                fontSize: '1.45rem',
                marginBottom: 8,
                letterSpacing: '-0.01em',
                lineHeight: 1.25,
              }}>
                Jangan lewatkan panggung{' '}
                <span style={{ color: '#d97706', fontStyle: 'italic' }}>
                  favoritmu
                </span>
              </h3>
              <p style={{
                color: '#a1a1aa',
                fontSize: '0.84rem',
                lineHeight: 1.5,
                margin: 0,
              }}>
                Dapatkan kabar jadwal konser terbaru langsung ke inbox kamu.
              </p>
            </div>
            <div style={{
              position: 'relative',
              flex: '1 1 auto',
              maxWidth: 440,
              minWidth: 260,
            }}>
              <input
                type="email"
                placeholder="Alamat email kamu..."
                style={{
                  width: '100%',
                  padding: '14px 130px 14px 20px',
                  borderRadius: 100,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(217,119,6,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
              <button style={{
                position: 'absolute',
                right: 4,
                top: '50%',
                transform: 'translateY(-50%)',
                padding: '10px 22px',
                borderRadius: 100,
                background: '#f8f7f4',
                color: '#0c0a14',
                fontSize: '0.82rem',
                fontWeight: 600,
                fontFamily: 'Inter, system-ui, sans-serif',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                letterSpacing: '-0.01em',
              }}
                onMouseEnter={e => e.target.style.background = '#fbbf24'}
                onMouseLeave={e => e.target.style.background = '#f8f7f4'}
              >
                Berlangganan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 24px 48px' }}>
        <div className="footer-grid">

          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6,
                background: '#f8f7f4',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#0c0a14',
                fontWeight: 900,
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: '1.1rem',
              }}>
                K
              </div>
              <span style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: '1.25rem',
                color: '#f8f7f4',
                letterSpacing: '-0.02em',
              }}>
                Konser<span style={{ color: '#d97706', fontStyle: 'italic' }}>Ku</span>
              </span>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: '0.82rem',
              lineHeight: 1.7,
              marginBottom: 28,
              maxWidth: 250,
            }}>
              Platform tiket konser terpercaya di Indonesia. Temukan dan pesan tiket favoritmu dengan mudah dan aman.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  className="footer-social"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    fontFamily: 'Inter, system-ui, sans-serif',
                    color: 'rgba(255,255,255,0.45)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {linkColumns.map(col => (
            <div key={col.title}>
              <h4 style={{
                color: 'rgba(255,255,255,0.35)',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 500,
                fontSize: '0.7rem',
                marginBottom: 22,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>
                {col.title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {col.links.map(link => (
                  <a
                    key={link}
                    href="#"
                    className="footer-link"
                    style={{
                      color: 'rgba(255,255,255,0.55)',
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontWeight: 400,
                      padding: '6px 0',
                      transition: 'color 0.15s ease',
                      display: 'inline-block',
                      width: 'fit-content',
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '20px 24px',
      }}>
        <div className="footer-bottom" style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}>
          <p style={{
            color: 'rgba(255,255,255,0.2)',
            fontSize: '0.75rem',
            fontFamily: 'Inter, system-ui, sans-serif',
            margin: 0,
          }}>
            &copy; 2026 KonserKu. All rights reserved.
          </p>

          <div style={{ display: 'flex', gap: 20 }}>
            {['Syarat & Ketentuan', 'Kebijakan Privasi', 'Cookie'].map(l => (
              <a
                key={l}
                href="#"
                className="footer-bottom-link"
                style={{
                  color: 'rgba(255,255,255,0.25)',
                  fontSize: '0.75rem',
                  textDecoration: 'none',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  transition: 'color 0.15s ease',
                }}
              >
                {l}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {paymentMethods.map(method => (
              <span
                key={method}
                style={{
                  padding: '3px 10px',
                  borderRadius: 4,
                  fontSize: '0.68rem',
                  fontWeight: 500,
                  fontFamily: 'Inter, system-ui, sans-serif',
                  color: 'rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  letterSpacing: '0.02em',
                }}
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .newsletter-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 48px;
        }
        .footer-link:hover {
          color: rgba(255,255,255,0.9) !important;
          text-decoration: underline !important;
          text-underline-offset: 3px;
        }
        .footer-social:hover {
          border-color: rgba(255,255,255,0.25) !important;
          color: rgba(255,255,255,0.8) !important;
        }
        .footer-bottom-link:hover {
          color: rgba(255,255,255,0.5) !important;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 36px !important;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .newsletter-row {
            flex-direction: column;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  )
}
