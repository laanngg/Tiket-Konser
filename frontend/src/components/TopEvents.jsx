import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

const defaultEvents = [
  {
    id: 1,
    image: null,
    placeholder: 'linear-gradient(135deg,#3b0764,#5b21b6)',
    title: 'UNGU – Waktu yang Dinanti Final Chapter',
    cat: 'Konser',
    city: 'Tangerang',
    venue: 'ICE BSD, Tangerang',
    date: '30 Okt 2026',
    rawDate: '2026-10-30',
    time: '19:30 WIB',
    price: 'Rp550.000',
    numericPrice: 550000,
    org: 'TipTip',
    status: 'available',
    hot: true,
  },
  {
    id: 2,
    image: null,
    placeholder: 'linear-gradient(135deg,#7c2d12,#c2410c)',
    title: 'SNOOPY RUN 2026 Indonesia Fun Run',
    cat: 'Sports',
    city: 'Tangerang',
    venue: 'BSD Green Office Park, Tangerang',
    date: '06 Sep 2026',
    rawDate: '2026-09-06',
    time: '05:30 WIB',
    price: 'Rp499.000',
    numericPrice: 499000,
    org: 'Provaliant Sports',
    status: 'available',
    hot: false,
  },
  {
    id: 3,
    image: null,
    placeholder: 'linear-gradient(135deg,#0c4a6e,#0369a1)',
    title: 'Beyond Eyes 15th Anniversary – Surabaya',
    cat: 'Konser',
    city: 'Surabaya',
    venue: 'Surabaya Convention Center',
    date: '28 Agt 2026',
    rawDate: '2026-08-28',
    time: '19:00 WIB',
    price: 'Rp900.000',
    numericPrice: 900000,
    org: 'Maryhouse Media',
    status: 'available',
    hot: true,
  },
  {
    id: 4,
    image: null,
    placeholder: 'linear-gradient(135deg,#831843,#be185d)',
    title: 'Beyond Eyes 1st Tour – Jakarta 2026',
    cat: 'Konser',
    city: 'Jakarta',
    venue: 'Istora Senayan, Jakarta',
    date: '30 Agt 2026',
    rawDate: '2026-08-30',
    time: '20:00 WIB',
    price: 'Rp1.700.000',
    numericPrice: 1700000,
    org: 'Maryhouse Media',
    status: 'available',
    hot: true,
  },
  {
    id: 5,
    image: null,
    placeholder: 'linear-gradient(135deg,#064e3b,#059669)',
    title: 'LaLaLa Festival 2026 Forest Edition',
    cat: 'Festival',
    city: 'Jakarta',
    venue: 'Gambir Expo, Kemayoran, Jakarta',
    date: '22–23 Agt 2026',
    rawDate: '2026-08-22',
    time: '14:00 WIB',
    price: 'Rp800.000',
    numericPrice: 800000,
    org: 'The Group',
    status: 'available',
    hot: false,
  },
  {
    id: 6,
    image: null,
    placeholder: 'linear-gradient(135deg,#18181b,#3f3f46)',
    title: 'Twilite Orchestra 35th Anniversary Concert',
    cat: 'Theater',
    city: 'Jakarta',
    venue: 'Usmar Ismail Hall, Jakarta',
    date: '06 Sep 2026',
    rawDate: '2026-09-06',
    time: '16:00 WIB',
    price: 'Rp500.000',
    numericPrice: 500000,
    org: 'TWILITE ORCHESTRA',
    status: 'soldout',
    hot: false,
  },
  {
    id: 7,
    image: null,
    placeholder: 'linear-gradient(135deg,#4c1d95,#7c3aed)',
    title: 'Raisa Live in Concert 2026 The Comeback',
    cat: 'Konser',
    city: 'Jakarta',
    venue: 'GBK Senayan, Jakarta',
    date: '12 Des 2026',
    rawDate: '2026-12-12',
    time: '19:30 WIB',
    price: 'Rp650.000',
    numericPrice: 650000,
    org: 'Raisa Production',
    status: 'available',
    hot: true,
  },
  {
    id: 8,
    image: null,
    placeholder: 'linear-gradient(135deg,#78350f,#d97706)',
    title: 'Synchronize Festival 2026 Multi-Genre',
    cat: 'Festival',
    city: 'Jakarta',
    venue: 'Gambir Expo Kemayoran, Jakarta',
    date: '03–05 Okt 2026',
    rawDate: '2026-10-03',
    time: '13:00 WIB',
    price: 'Rp600.000',
    numericPrice: 600000,
    org: 'Demajors',
    status: 'available',
    hot: false,
  },
  {
    id: 9,
    image: null,
    placeholder: 'linear-gradient(135deg,#9f1239,#e11d48)',
    title: 'Raditya Dika – Cerita Cintaku Tour 2026',
    cat: 'Stand Up',
    city: 'Bandung',
    venue: 'Sasana Budaya Ganesha (Sabuga), Bandung',
    date: '18 Okt 2026',
    rawDate: '2026-10-18',
    time: '19:00 WIB',
    price: 'Rp250.000',
    numericPrice: 250000,
    org: 'Kolektif Tawa',
    status: 'available',
    hot: true,
  },
  {
    id: 10,
    image: null,
    placeholder: 'linear-gradient(135deg,#312e81,#4338ca)',
    title: 'Pandji Pragiwaksono – Komoidoumenoi 2.0',
    cat: 'Stand Up',
    city: 'Jakarta',
    venue: 'Istora Senayan, Jakarta',
    date: '25 Nov 2026',
    rawDate: '2026-11-25',
    time: '20:00 WIB',
    price: 'Rp350.000',
    numericPrice: 350000,
    org: 'Comika Event',
    status: 'available',
    hot: true,
  },
  {
    id: 11,
    image: null,
    placeholder: 'linear-gradient(135deg,#047857,#10b981)',
    title: 'Jakarta Sunset Marathon 2026 21K & 10K',
    cat: 'Sports',
    city: 'Jakarta',
    venue: 'Ancol Beach City, Jakarta',
    date: '12 Okt 2026',
    rawDate: '2026-10-12',
    time: '15:30 WIB',
    price: 'Rp375.000',
    numericPrice: 375000,
    org: 'RunID Official',
    status: 'available',
    hot: false,
  },
  {
    id: 12,
    image: null,
    placeholder: 'linear-gradient(135deg,#581c87,#9333ea)',
    title: 'Teater Musikal Laskar Pelangi Reimagined',
    cat: 'Theater',
    city: 'Bali',
    venue: 'Nusa Dua Convention Center, Bali',
    date: '05 Des 2026',
    rawDate: '2026-12-05',
    time: '18:30 WIB',
    price: 'Rp600.000',
    numericPrice: 600000,
    org: 'Artisana Project',
    status: 'available',
    hot: true,
  },
]

const categoryMeta = [
  { id: 'Semua', label: 'Semua' },
  { id: 'Konser', label: 'Konser' },
  { id: 'Festival', label: 'Festival' },
  { id: 'Stand Up', label: 'Stand Up' },
  { id: 'Sports', label: 'Sports' },
  { id: 'Theater', label: 'Theater' },
]

const cityOptions = ['Semua Kota', 'Jakarta', 'Tangerang', 'Surabaya', 'Bandung', 'Bali']

const sortOptions = [
  { id: 'popular', label: 'Paling Populer' },
  { id: 'date-asc', label: 'Tanggal Terdekat' },
  { id: 'price-asc', label: 'Harga Terendah' },
  { id: 'price-desc', label: 'Harga Tertinggi' },
  { id: 'title-asc', label: 'Nama (A - Z)' },
]

function OrgAvatar({ name = '' }) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase() || 'KK'
  const palette = ['#4f46e5', '#0284c7', '#0d9488', '#d97706', '#e11d48', '#4338ca']
  const color = palette[name.charCodeAt(0) % palette.length] || '#4f46e5'
  return (
    <div style={{
      width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
      background: color, display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontSize: '0.62rem', fontWeight: 700, color: '#fff',
    }}>
      {initials}
    </div>
  )
}

function EventCard({ ev }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/event/${ev.id}`)}
      style={{
        background: '#12101b',
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        border: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s, border-color 0.3s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 16px 36px rgba(0,0,0,0.45)'
        e.currentTarget.style.borderColor = 'rgba(217, 119, 6, 0.35)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
      }}
    >
      {/* ── Visual Banner ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: '58%',
        background: ev.placeholder || 'linear-gradient(135deg,#1e1b4b,#312e81)',
        overflow: 'hidden',
      }}>
        {ev.image && (
          <img
            src={ev.image}
            alt={ev.title}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}

        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(18,16,27,0.95) 0%, rgba(18,16,27,0.3) 60%, transparent 100%)',
        }} />

        {/* Top Badges */}
        <div style={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            padding: '3px 8px', borderRadius: 6,
            background: 'rgba(12,10,20,0.75)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#d4d4d8', fontSize: '0.68rem', fontWeight: 600,
            backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', gap: 4,
          }}>
            {ev.city}
          </span>

          {ev.hot && (
            <span style={{
              padding: '3px 8px', borderRadius: 6,
              background: '#b45309',
              color: '#fef3c7', fontSize: '0.65rem', fontWeight: 700,
              letterSpacing: '0.05em',
            }}>
              POPULER
            </span>
          )}
        </div>

        {/* Bottom Status & Category */}
        <div style={{ position: 'absolute', bottom: 10, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            padding: '3px 8px', borderRadius: 6,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#f8f7f4', fontSize: '0.68rem', fontWeight: 600,
            backdropFilter: 'blur(4px)',
          }}>
            {ev.cat}
          </span>

          <span style={{
            padding: '3px 8px', borderRadius: 6,
            background: ev.status === 'soldout' ? 'rgba(39,39,42,0.85)' : 'rgba(13,148,136,0.85)',
            color: ev.status === 'soldout' ? '#a1a1aa' : '#fff',
            fontSize: '0.68rem', fontWeight: 600,
            backdropFilter: 'blur(4px)',
          }}>
            {ev.status === 'soldout' ? 'Habis' : 'Tersedia'}
          </span>
        </div>
      </div>

      {/* ── Card Content ── */}
      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{
          fontSize: '0.94rem', fontWeight: 600, color: '#f8f7f4',
          lineHeight: 1.45, marginBottom: 10,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
          minHeight: '2.8em',
        }}>
          {ev.title}
        </h3>

        {/* Date and Venue */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fbbf24', fontSize: '0.78rem', fontWeight: 500 }}>
            <span>{ev.date} {ev.time ? `• ${ev.time}` : ''}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#a1a1aa', fontSize: '0.76rem' }}>
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.venue}</span>
          </div>
        </div>

        {/* Price Tag */}
        <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <p style={{ fontSize: '0.66rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Mulai Dari</p>
              <p style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: '#f8f7f4' }}>
                {ev.status === 'soldout' ? (
                  <span style={{ color: '#71717a', fontSize: '0.88rem' }}>Habis Terjual</span>
                ) : (
                  ev.price
                )}
              </p>
            </div>
          </div>

          {/* Organizer & Action */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0 }}>
              <OrgAvatar name={ev.org} />
              <span style={{
                fontSize: '0.75rem', color: '#a1a1aa', fontWeight: 500,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {ev.org}
              </span>
            </div>

            <button
              onClick={e => {
                e.stopPropagation()
                navigate(`/event/${ev.id}`)
              }}
              style={{
                flexShrink: 0, padding: '7px 14px', borderRadius: 8,
                background: ev.status === 'soldout' ? 'rgba(255,255,255,0.05)' : '#4f46e5',
                color: ev.status === 'soldout' ? '#71717a' : '#f8f7f4',
                fontSize: '0.76rem', fontWeight: 600,
                border: 'none', cursor: 'pointer',
                transition: 'background 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                if (ev.status !== 'soldout') {
                  e.currentTarget.style.background = '#4338ca'
                }
              }}
              onMouseLeave={e => {
                if (ev.status !== 'soldout') {
                  e.currentTarget.style.background = '#4f46e5'
                }
              }}
            >
              {ev.status === 'soldout' ? 'Detail' : 'Pesan Tiket'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TopEvents() {
  const [eventsList, setEventsList] = useState(defaultEvents)
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('Semua Kota')
  const [sortBy, setSortBy] = useState('popular')
  const [statusFilter, setStatusFilter] = useState('all') // 'all' | 'available' | 'hot'
  const [visibleCount, setVisibleCount] = useState(8)

  // Sync with API when available
  useEffect(() => {
    let isMounted = true
    api.get('/events')
      .then(res => {
        if (!isMounted) return
        const backendData = res.data?.data
        if (Array.isArray(backendData) && backendData.length > 0) {
          const mapped = backendData.map(item => ({
            id: item.id,
            image: item.image_url || null,
            placeholder: 'linear-gradient(135deg,#3b0764,#5b21b6)',
            title: item.title,
            cat: item.category || 'Konser',
            city: item.city || 'Jakarta',
            venue: item.venue || 'Arena',
            date: item.event_date ? new Date(item.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Segera Hadir',
            rawDate: item.event_date || '2026-12-31',
            time: item.event_date ? new Date(item.event_date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB' : '19:00 WIB',
            price: item.min_price ? 'Rp' + Number(item.min_price).toLocaleString('id-ID') : 'Rp450.000',
            numericPrice: item.min_price ? Number(item.min_price) : 450000,
            org: item.organizer || 'KonserKu Live',
            status: item.status || 'available',
            hot: true,
          }))

          // Merge: prepend live backend events
          const existingIds = new Set(mapped.map(m => m.id))
          const restDefaults = defaultEvents.filter(d => !existingIds.has(d.id))
          setEventsList([...mapped, ...restDefaults])
        }
      })
      .catch(() => {
        // Fallback to rich default events
        setEventsList(defaultEvents)
      })

    return () => { isMounted = false }
  }, [])

  // Listen for global filter events (from Navbar or Hero)
  useEffect(() => {
    const handleFilterChange = (e) => {
      const { category, city, search, scroll } = e.detail || {}
      if (category !== undefined) setActiveCategory(category)
      if (city !== undefined) setSelectedCity(city)
      if (search !== undefined) setSearchQuery(search)

      if (scroll) {
        const el = document.getElementById('top-events')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    }

    window.addEventListener('kk_filter_change', handleFilterChange)
    return () => window.removeEventListener('kk_filter_change', handleFilterChange)
  }, [])

  // Calculate live count per category based on current dataset
  const categoryCounts = useMemo(() => {
    const counts = { Semua: eventsList.length }
    categoryMeta.forEach(c => {
      if (c.id !== 'Semua') {
        counts[c.id] = eventsList.filter(e => e.cat.toLowerCase() === c.id.toLowerCase()).length
      }
    })
    return counts
  }, [eventsList])

  // Multi-facet filtering & sorting
  const filteredEvents = useMemo(() => {
    let result = [...eventsList]

    // 1. Category
    if (activeCategory !== 'Semua') {
      result = result.filter(e => e.cat.toLowerCase() === activeCategory.toLowerCase())
    }

    // 2. City
    if (selectedCity !== 'Semua Kota') {
      result = result.filter(e => e.city.toLowerCase() === selectedCity.toLowerCase())
    }

    // 3. Search query (title, venue, city, organizer, cat)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.org.toLowerCase().includes(q) ||
        e.cat.toLowerCase().includes(q)
      )
    }

    // 4. Status filter
    if (statusFilter === 'available') {
      result = result.filter(e => e.status !== 'soldout')
    } else if (statusFilter === 'hot') {
      result = result.filter(e => e.hot)
    }

    // 5. Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return (b.hot ? 1 : 0) - (a.hot ? 1 : 0) || a.numericPrice - b.numericPrice
        case 'date-asc':
          return new Date(a.rawDate || 0) - new Date(b.rawDate || 0)
        case 'price-asc':
          return a.numericPrice - b.numericPrice
        case 'price-desc':
          return b.numericPrice - a.numericPrice
        case 'title-asc':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return result
  }, [eventsList, activeCategory, selectedCity, searchQuery, statusFilter, sortBy])

  // Active filter checks
  const isFiltered = activeCategory !== 'Semua' || selectedCity !== 'Semua Kota' || searchQuery.trim() !== '' || statusFilter !== 'all'

  const resetAllFilters = () => {
    setActiveCategory('Semua')
    setSelectedCity('Semua Kota')
    setSearchQuery('')
    setStatusFilter('all')
    setSortBy('popular')
    setVisibleCount(8)
  }

  const displayedEvents = filteredEvents.slice(0, visibleCount)

  return (
    <section id="top-events" style={{ padding: '88px 0 100px', background: '#0c0a14', position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>

        {/* ── Section Header ── */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: 32, flexWrap: 'wrap', gap: 16,
        }}>
          <div>
            <p style={{
              fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: '#d97706', marginBottom: 8,
            }}>
              Pilihan Event
            </p>
            <h2 style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(1.9rem, 4vw, 2.8rem)',
              fontWeight: 400, color: '#f8f7f4', lineHeight: 1.15,
              letterSpacing: '-0.01em', margin: 0,
            }}>
              Jadwal Pilihan <span style={{ color: '#d97706', fontStyle: 'italic' }}>Musim Ini</span>
            </h2>
          </div>

          {/* Quick stats / Reset indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              fontSize: '0.8rem', color: '#a1a1aa',
              background: 'rgba(255,255,255,0.04)',
              padding: '6px 14px', borderRadius: 99,
              border: '1px solid rgba(255,255,255,0.07)',
            }}>
              <strong style={{ color: '#f8f7f4' }}>{filteredEvents.length}</strong> event tersedia
            </span>

            {isFiltered && (
              <button
                onClick={resetAllFilters}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '6px 14px', borderRadius: 99,
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.25)',
                  color: '#f87171', fontSize: '0.78rem', fontWeight: 500,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.18)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
              >
                <span>↺</span> Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* ── Main Filter Toolbar (Glass Card) ── */}
        <div style={{
          background: 'rgba(19,19,31,0.85)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20,
          padding: '20px 22px',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
          marginBottom: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
          {/* Top Row: Search Input + City Dropdown + Sort Dropdown */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 12,
            alignItems: 'center',
          }}>
            {/* Search Input */}
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gridColumn: 'span 2',
            }}>
              <span style={{
                position: 'absolute', left: 14,
                fontSize: 15, color: '#9ca3af', pointerEvents: 'none',
              }}>
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value)
                  setVisibleCount(8)
                }}
                placeholder="Cari judul event, artis, venue, atau kota..."
                style={{
                  width: '100%',
                  padding: '12px 38px 12px 42px',
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#fff',
                  fontSize: '0.88rem',
                  outline: 'none',
                  transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#a78bfa'
                  e.target.style.boxShadow = '0 0 14px rgba(167,139,250,0.25)'
                  e.target.style.background = 'rgba(255,255,255,0.08)'
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.12)'
                  e.target.style.boxShadow = 'none'
                  e.target.style.background = 'rgba(255,255,255,0.05)'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute', right: 12,
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none', borderRadius: '50%',
                    width: 22, height: 22, color: '#d1d5db',
                    fontSize: 12, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  title="Hapus pencarian"
                >
                  ✕
                </button>
              )}
            </div>

            {/* City Selector */}
            <div style={{ position: 'relative' }}>
              <select
                value={selectedCity}
                onChange={e => {
                  setSelectedCity(e.target.value)
                  setVisibleCount(8)
                }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 14,
                  background: '#181829',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#e5e7eb',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a78bfa' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 14px center',
                  backgroundSize: '14px',
                  paddingRight: 38,
                }}
              >
                {cityOptions.map(c => (
                  <option key={c} value={c} style={{ background: '#13131f', color: '#fff' }}>
                    {c === 'Semua Kota' ? '📍 Semua Kota' : `📍 ${c}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Selector */}
            <div style={{ position: 'relative' }}>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 14,
                  background: '#181829',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#e5e7eb',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ec4899' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 14px center',
                  backgroundSize: '14px',
                  paddingRight: 38,
                }}
              >
                {sortOptions.map(s => (
                  <option key={s.id} value={s.id} style={{ background: '#13131f', color: '#fff' }}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bottom Row: Category Pills + Status Toggles */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: 14,
          }}>
            {/* Category Chips with Icons & Counts */}
            <div
              className="no-scrollbar"
              style={{
                display: 'flex',
                gap: 8,
                overflowX: 'auto',
                paddingBottom: 2,
                flex: 1,
              }}
            >
              {categoryMeta.map(cat => {
                const isActive = activeCategory === cat.id
                const count = categoryCounts[cat.id] ?? 0
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id)
                      setVisibleCount(8)
                    }}
                    style={{
                      flexShrink: 0,
                      padding: '8px 16px',
                      borderRadius: 99,
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 7,
                      border: isActive ? '1px solid rgba(217,119,6,0.4)' : '1px solid rgba(255,255,255,0.08)',
                      background: isActive
                        ? '#d97706'
                        : 'rgba(255,255,255,0.03)',
                      color: isActive ? '#0c0a14' : '#a1a1aa',
                      boxShadow: isActive ? '0 4px 12px rgba(217,119,6,0.25)' : 'none',
                      transform: isActive ? 'translateY(-1px)' : 'none',
                      transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                    }}
                  >
                    <span>{cat.label}</span>
                    <span style={{
                      fontSize: '0.68rem',
                      padding: '1px 6px',
                      borderRadius: 99,
                      background: isActive ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.08)',
                      color: isActive ? '#0c0a14' : '#71717a',
                      fontWeight: 700,
                    }}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Quick Status Buttons */}
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              {[
                { id: 'all', label: 'Semua Status' },
                { id: 'available', label: 'Tersedia' },
                { id: 'hot', label: 'Populer' },
              ].map(st => {
                const isActive = statusFilter === st.id
                return (
                  <button
                    key={st.id}
                    onClick={() => {
                      setStatusFilter(st.id)
                      setVisibleCount(8)
                    }}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 99,
                      fontSize: '0.76rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      border: isActive ? '1px solid rgba(248,247,244,0.3)' : '1px solid rgba(255,255,255,0.06)',
                      background: isActive ? 'rgba(248,247,244,0.1)' : 'transparent',
                      color: isActive ? '#f8f7f4' : '#71717a',
                      transition: 'all 0.2s',
                    }}
                  >
                    {st.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Active Filters Tag Bar (shown when any filter active) ── */}
        {isFiltered && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            flexWrap: 'wrap', marginBottom: 24, padding: '0 4px',
          }}>
            <span style={{ fontSize: '0.75rem', color: '#71717a', fontWeight: 500 }}>Filter aktif:</span>

            {activeCategory !== 'Semua' && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 10px', borderRadius: 6,
                background: 'rgba(217,119,6,0.12)', border: '1px solid rgba(217,119,6,0.25)',
                color: '#fbbf24', fontSize: '0.75rem', fontWeight: 500,
              }}>
                Kategori: {activeCategory}
                <button onClick={() => setActiveCategory('Semua')} style={{ background: 'none', border: 'none', color: '#fbbf24', cursor: 'pointer', fontSize: 11 }}>✕</button>
              </span>
            )}

            {selectedCity !== 'Semua Kota' && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 10px', borderRadius: 6,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#f8f7f4', fontSize: '0.75rem', fontWeight: 500,
              }}>
                Kota: {selectedCity}
                <button onClick={() => setSelectedCity('Semua Kota')} style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', fontSize: 11 }}>✕</button>
              </span>
            )}

            {searchQuery.trim() !== '' && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 10px', borderRadius: 6,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#f8f7f4', fontSize: '0.75rem', fontWeight: 500,
              }}>
                Pencarian: "{searchQuery}"
                <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', fontSize: 11 }}>✕</button>
              </span>
            )}

            {statusFilter !== 'all' && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 10px', borderRadius: 6,
                background: 'rgba(217,119,6,0.12)', border: '1px solid rgba(217,119,6,0.25)',
                color: '#fbbf24', fontSize: '0.75rem', fontWeight: 500,
              }}>
                Status: {statusFilter === 'available' ? 'Tersedia' : 'Populer'}
                <button onClick={() => setStatusFilter('all')} style={{ background: 'none', border: 'none', color: '#fbbf24', cursor: 'pointer', fontSize: 11 }}>✕</button>
              </span>
            )}
          </div>
        )}

        {/* ── Events Grid or Empty State ── */}
        {displayedEvents.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 24,
          }}>
            {displayedEvents.map(ev => (
              <EventCard key={ev.id} ev={ev} />
            ))}
          </div>
        ) : (
          /* ── Empty State ── */
          <div style={{
            background: 'rgba(19,19,31,0.6)',
            border: '1px dashed rgba(255,255,255,0.15)',
            borderRadius: 24,
            padding: '56px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            maxWidth: 520,
            margin: '20px auto',
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: 20,
              background: 'rgba(124,58,237,0.12)',
              border: '1px solid rgba(124,58,237,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32,
            }}>
              🔍
            </div>
            <h3 style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800, fontSize: '1.25rem', color: '#fff', margin: 0,
            }}>
              Tidak Ada Event yang Sesuai
            </h3>
            <p style={{ color: '#9ca3af', fontSize: '0.88rem', lineHeight: 1.6, maxWidth: 380, margin: 0 }}>
              Kami tidak menemukan event untuk filter yang dipilih. Coba ganti kata kunci atau reset filter.
            </p>
            <button
              onClick={resetAllFilters}
              style={{
                marginTop: 8,
                padding: '11px 24px',
                borderRadius: 12,
                background: 'linear-gradient(135deg,#7c3aed,#ec4899)',
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(124,58,237,0.4)',
              }}
            >
              ↺ Tampilkan Semua Event
            </button>
          </div>
        )}

        {/* ── Load More / Pagination ── */}
        {filteredEvents.length > visibleCount && (
          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <button
              onClick={() => setVisibleCount(c => c + 4)}
              style={{
                padding: '13px 40px', borderRadius: 99,
                border: '1px solid rgba(255,255,255,0.14)',
                background: 'rgba(255,255,255,0.04)',
                color: '#fff', fontWeight: 700, fontSize: '0.88rem',
                cursor: 'pointer', transition: 'all 0.25s',
                backdropFilter: 'blur(8px)',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(124,58,237,0.18)'
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span>Lihat Lebih Banyak</span>
              <span style={{
                fontSize: '0.75rem', padding: '2px 8px', borderRadius: 99,
                background: 'rgba(124,58,237,0.3)', color: '#c4b5fd',
              }}>
                +{filteredEvents.length - visibleCount}
              </span>
            </button>
          </div>
        )}

        {filteredEvents.length > 0 && filteredEvents.length <= visibleCount && filteredEvents.length > 4 && (
          <p style={{ textAlign: 'center', color: '#4b5563', fontSize: '0.8rem', marginTop: 40 }}>
            Semua event telah ditampilkan ({filteredEvents.length} event)
          </p>
        )}

      </div>
    </section>
  )
}
