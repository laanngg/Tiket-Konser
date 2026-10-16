import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const cities = ['Semua Kota', 'Jakarta', 'Tangerang', 'Surabaya', 'Bandung', 'Bali']
const categories = ['Konser', 'Festival', 'Stand Up', 'Sports', 'Theater']

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [navSearch, setNavSearch] = useState('')
  const [navCity, setNavCity] = useState('Jakarta')
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false)
  const cityDropdownRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(e.target)) {
        setCityDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCategoryClick = (cat, e) => {
    if (e) e.preventDefault()
    setMobileOpen(false)
    window.dispatchEvent(new CustomEvent('kk_filter_change', {
      detail: { category: cat, scroll: true }
    }))
  }

  const handleSearchChange = (val) => {
    setNavSearch(val)
    window.dispatchEvent(new CustomEvent('kk_filter_change', {
      detail: { search: val, scroll: true }
    }))
  }

  const handleCitySelect = (c) => {
    setNavCity(c)
    setCityDropdownOpen(false)
    window.dispatchEvent(new CustomEvent('kk_filter_change', {
      detail: { city: c, scroll: true }
    }))
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled ? 'rgba(12, 10, 20, 0.88)' : 'rgba(12, 10, 20, 0.45)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(255, 255, 255, 0.04)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 74 }}>

          {/* Clean Brand Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: '#f8f7f4',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#0c0a14',
              fontWeight: 900,
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: '1.25rem',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
            }}>
              K
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: '1.35rem',
                color: '#f8f7f4',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}>
                Konser<span style={{ color: '#d97706', fontStyle: 'italic' }}>Ku</span>
              </span>
              <span style={{
                fontSize: '0.62rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#71717a',
                fontWeight: 600,
              }}>
                Live Tickets
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="desktop-nav">
            {categories.map(item => (
              <button
                key={item}
                onClick={(e) => handleCategoryClick(item, e)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '6px 2px',
                  color: '#a1a1aa',
                  fontSize: '0.86rem',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                  letterSpacing: '0.01em',
                }}
                className="nav-link"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

            {/* Minimal Search Bar */}
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '7px 14px', borderRadius: 99,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'border-color 0.25s, background 0.25s, width 0.25s',
              }}
              className="search-bar"
            >
              <svg width="14" height="14" fill="none" stroke="#a1a1aa" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={navSearch}
                onChange={e => handleSearchChange(e.target.value)}
                placeholder="Cari konser, artis..."
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#f8f7f4',
                  fontSize: '0.82rem',
                  width: 130,
                  transition: 'width 0.25s ease',
                }}
                onFocus={e => {
                  e.target.style.width = '175px'
                  e.target.parentElement.style.borderColor = 'rgba(217, 119, 6, 0.45)'
                  e.target.parentElement.style.background = 'rgba(255,255,255,0.07)'
                }}
                onBlur={e => {
                  if (!navSearch) e.target.style.width = '130px'
                  e.target.parentElement.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.target.parentElement.style.background = 'rgba(255,255,255,0.04)'
                }}
              />
              {navSearch && (
                <button
                  onClick={() => handleSearchChange('')}
                  style={{
                    background: 'none', border: 'none', color: '#71717a',
                    cursor: 'pointer', fontSize: 11, padding: 0,
                  }}
                  title="Hapus"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Clean City Dropdown */}
            <div ref={cityDropdownRef} style={{ position: 'relative' }} className="location-btn">
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 99,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  cursor: 'pointer', color: '#d4d4d8', fontSize: '0.8rem',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              >
                <span style={{ color: '#d97706', fontSize: '0.75rem' }}>●</span>
                <span>{navCity}</span>
                <span style={{ fontSize: '0.62rem', color: '#71717a', marginLeft: 2 }}>▾</span>
              </button>

              {cityDropdownOpen && (
                <div style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: 8,
                  width: 170, borderRadius: 12,
                  background: '#14121d',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 16px 36px rgba(0,0,0,0.6)',
                  padding: 6, zIndex: 120,
                  backdropFilter: 'blur(16px)',
                  display: 'flex', flexDirection: 'column', gap: 2,
                }}>
                  <div style={{
                    padding: '6px 10px', fontSize: '0.65rem', color: '#71717a',
                    fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}>
                    Kota
                  </div>
                  {cities.map(c => (
                    <button
                      key={c}
                      onClick={() => handleCitySelect(c)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '8px 12px', borderRadius: 8,
                        background: navCity === c ? 'rgba(217,119,6,0.12)' : 'transparent',
                        color: navCity === c ? '#fbbf24' : '#d4d4d8',
                        border: 'none', fontSize: '0.78rem', fontWeight: navCity === c ? 600 : 400,
                        cursor: 'pointer', textAlign: 'left',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => {
                        if (navCity !== c) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                      }}
                      onMouseLeave={e => {
                        if (navCity !== c) e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      <span>{c}</span>
                      {navCity === c && <span style={{ color: '#fbbf24', fontSize: 12 }}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Buttons: Subtle text link & solid pill */}
            <Link
              to="/login"
              style={{
                color: '#d4d4d8',
                fontSize: '0.82rem',
                fontWeight: 500,
                textDecoration: 'none',
                padding: '6px 12px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = '#d4d4d8'}
            >
              Masuk
            </Link>
            <Link
              to="/register"
              style={{
                padding: '8px 18px',
                fontSize: '0.82rem',
                borderRadius: 99,
                background: '#f8f7f4',
                color: '#0c0a14',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#fbbf24'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#f8f7f4'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Daftar
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-menu-btn"
              style={{
                padding: 8, borderRadius: 8,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#f8f7f4', cursor: 'pointer',
              }}
              aria-label="Toggle menu"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path d="M6 18L18 6M6 6l12 12" />
                  : <path d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div style={{
            padding: '16px 0 22px', borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 14px', borderRadius: 10,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <svg width="14" height="14" fill="none" stroke="#a1a1aa" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={navSearch}
                onChange={e => handleSearchChange(e.target.value)}
                placeholder="Cari konser atau event..."
                style={{
                  background: 'transparent', border: 'none', outline: 'none',
                  color: '#fff', fontSize: '0.85rem', width: '100%',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {categories.map(item => (
                <button
                  key={item}
                  onClick={(e) => handleCategoryClick(item, e)}
                  style={{
                    color: '#d4d4d8', padding: '10px 12px', fontSize: '0.82rem',
                    borderRadius: 8, background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, overflowX: 'auto',
              paddingTop: 4,
            }} className="no-scrollbar">
              <span style={{ fontSize: '0.72rem', color: '#71717a', flexShrink: 0 }}>Kota:</span>
              {cities.map(c => (
                <button
                  key={c}
                  onClick={() => handleCitySelect(c)}
                  style={{
                    flexShrink: 0, padding: '5px 12px', borderRadius: 99,
                    fontSize: '0.75rem', fontWeight: 500,
                    background: navCity === c ? 'rgba(217,119,6,0.2)' : 'rgba(255,255,255,0.03)',
                    color: navCity === c ? '#fbbf24' : '#a1a1aa',
                    border: navCity === c ? '1px solid rgba(217,119,6,0.35)' : '1px solid rgba(255,255,255,0.06)',
                    cursor: 'pointer',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .search-bar { display: none !important; }
          .location-btn { display: none !important; }
        }
        @media (min-width: 901px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </nav>
  )
}

export default Navbar
