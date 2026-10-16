import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'
import api from '../../api'

const mockEvents = [
  { id:1, title:'UNGU – Waktu yang Dinanti Final Chapter', category:'Konser', venue:'ICE BSD', city:'Tangerang', event_date:'2026-10-30T19:30:00', organizer:'TipTip', status:'active' },
  { id:2, title:'Beyond Eyes 15th Anniversary – Surabaya', category:'Konser', venue:'Surabaya Convention Center', city:'Surabaya', event_date:'2026-08-28T19:00:00', organizer:'Maryhouse Media', status:'active' },
  { id:3, title:'LaLaLa Festival 2026', category:'Festival', venue:'Gambir Expo', city:'Jakarta', event_date:'2026-08-22T14:00:00', organizer:'The Group', status:'active' },
  { id:4, title:'Westlife World Tour 2026', category:'Konser', venue:'GBK Arena', city:'Jakarta', event_date:'2026-09-15T20:00:00', organizer:'Live Nation', status:'active' },
  { id:5, title:'Synchronize Festival 2026', category:'Festival', venue:'Gambir Expo', city:'Jakarta', event_date:'2026-10-03T14:00:00', organizer:'Demajors', status:'active' },
  { id:6, title:'Twilite Orchestra 35th Anniversary', category:'Theater', venue:'Usmar Ismail Hall', city:'Jakarta', event_date:'2026-09-06T16:00:00', organizer:'TWILITE ORCHESTRA', status:'soldout' },
]

const emptyForm = { title:'', description:'', category:'Konser', venue:'', city:'', event_date:'', organizer:'', image_url:'', status:'active' }
const categories = ['Konser','Festival','Theater','Stand Up','Sports','Jazz']

export default function EventsAdminPage() {
  const [events, setEvents]   = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal]     = useState(false)
  const [form, setForm]       = useState(emptyForm)
  const [editId, setEditId]   = useState(null)
  const [saving, setSaving]   = useState(false)
  const [del, setDel]         = useState(null)
  const [search, setSearch]   = useState('')
  const [filterCat, setFilterCat] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const load = () => {
    api.get('/events').then(r => setEvents(r.data.data)).catch(() => setEvents(mockEvents)).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const openAdd  = ()  => { setForm(emptyForm); setEditId(null); setModal(true) }
  const openEdit = ev  => { setForm({ ...ev, event_date: ev.event_date?.slice(0,16) || '' }); setEditId(ev.id); setModal(true) }
  const closeModal = () => { setModal(false); setForm(emptyForm); setEditId(null) }

  const handleSave = async e => {
    e.preventDefault(); setSaving(true)
    try {
      if (editId) {
        await api.put(`/admin/events/${editId}`, form)
        setEvents(ev => ev.map(x => x.id===editId ? {...x,...form} : x))
      } else {
        const res = await api.post('/admin/events', form)
        setEvents(ev => [...ev, { ...form, id: res.data.data?.id || Date.now() }])
      }
    } catch {
      if (editId) setEvents(ev => ev.map(x => x.id===editId ? {...x,...form} : x))
      else        setEvents(ev => [...ev, { ...form, id: Date.now() }])
    }
    setSaving(false); closeModal()
  }

  const handleDelete = async id => {
    try { await api.delete(`/admin/events/${id}`) } catch {}
    setEvents(ev => ev.filter(x => x.id!==id)); setDel(null)
  }

  const statusColor = s => s==='active'?'#22c55e':s==='soldout'?'#ef4444':'#6b7280'

  const filtered = events.filter(ev => {
    const q = search.toLowerCase().trim()
    const matchSearch = !q || ev.title?.toLowerCase().includes(q) || ev.organizer?.toLowerCase().includes(q) || ev.venue?.toLowerCase().includes(q) || ev.city?.toLowerCase().includes(q)
    const matchCat = filterCat === 'all' || ev.category === filterCat
    const matchStatus = filterStatus === 'all' || ev.status === filterStatus
    return matchSearch && matchCat && matchStatus
  })

  return (
    <AdminLayout>
      <div style={{ padding:'32px 28px' }}>
        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
          <div>
            <p style={{ color:'#6b7280', fontSize:'0.8rem', marginBottom:4 }}>Kelola</p>
            <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, fontSize:'1.6rem', color:'#fff' }}>Events</h1>
          </div>
          <button onClick={openAdd} style={{ padding:'10px 20px', borderRadius:12, background:'linear-gradient(135deg,#7c3aed,#ec4899)', color:'#fff', fontWeight:700, fontSize:'0.875rem', border:'none', cursor:'pointer', boxShadow:'0 4px 16px rgba(124,58,237,0.35)', display:'flex', alignItems:'center', gap:8 }}>
            + Tambah Event
          </button>
        </div>

        {/* Filters Toolbar */}
        <div style={{ display:'flex', gap:12, marginBottom:20, flexWrap:'wrap', alignItems:'center' }}>
          {/* Search */}
          <div style={{ position:'relative', flex:1, minWidth:220 }}>
            <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', fontSize:14, color:'#6b7280' }}>🔍</span>
            <input
              value={search}
              onChange={e=>setSearch(e.target.value)}
              placeholder="Cari event, venue, kota, organizer..."
              style={{ width:'100%', padding:'10px 12px 10px 36px', borderRadius:12, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.05)', color:'#fff', fontSize:'0.85rem', outline:'none', boxSizing:'border-box' }}
            />
            {search && (
              <button onClick={()=>setSearch('')} style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'#9ca3af', cursor:'pointer', fontSize:12 }}>✕</button>
            )}
          </div>

          {/* Category Filter */}
          <select
            value={filterCat}
            onChange={e => setFilterCat(e.target.value)}
            style={{ padding:'10px 14px', borderRadius:12, background:'#1a1a2e', border:'1px solid rgba(255,255,255,0.1)', color:'#e5e7eb', fontSize:'0.85rem', outline:'none', cursor:'pointer' }}
          >
            <option value="all">Semua Kategori</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* Status Filter */}
          <div style={{ display:'flex', gap:6 }}>
            {['all','active','soldout'].map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                style={{
                  padding:'9px 14px', borderRadius:10,
                  border: filterStatus===s?'none':'1px solid rgba(255,255,255,0.1)',
                  background: filterStatus===s?'linear-gradient(135deg,#7c3aed,#ec4899)':'rgba(255,255,255,0.05)',
                  color: filterStatus===s?'#fff':'#9ca3af',
                  fontWeight:600, fontSize:'0.8rem', cursor:'pointer', textTransform:'capitalize'
                }}
              >
                {s==='all'?'Semua':s}
              </button>
            ))}
          </div>

          {(search || filterCat !== 'all' || filterStatus !== 'all') && (
            <button
              onClick={() => { setSearch(''); setFilterCat('all'); setFilterStatus('all') }}
              style={{ padding:'8px 12px', borderRadius:10, background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', color:'#f87171', fontSize:'0.78rem', cursor:'pointer', fontWeight:600 }}
            >
              Reset
            </button>
          )}
        </div>

        {/* Table */}
        <div style={{ background:'#13131f', border:'1px solid rgba(255,255,255,0.07)', borderRadius:18, overflow:'hidden' }}>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
                  {['Event','Kategori','Venue','Tanggal','Status','Aksi'].map(h => (
                    <th key={h} style={{ padding:'14px 18px', textAlign:'left', fontSize:'0.75rem', fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.08em', whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} style={{ textAlign:'center', padding:40, color:'#4b5563' }}>⏳ Memuat...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={6} style={{ textAlign:'center', padding:40, color:'#4b5563' }}>Tidak ada event yang sesuai dengan filter</td></tr>
                ) : filtered.map((ev, i) => (
                  <tr key={ev.id} style={{ borderBottom:'1px solid rgba(255,255,255,0.04)', background: i%2===0?'transparent':'rgba(255,255,255,0.01)' }}>
                    <td style={{ padding:'14px 18px', maxWidth:220 }}>
                      <p style={{ fontWeight:600, fontSize:'0.85rem', marginBottom:2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{ev.title}</p>
                      <p style={{ fontSize:'0.72rem', color:'#6b7280' }}>{ev.organizer}</p>
                    </td>
                    <td style={{ padding:'14px 18px' }}>
                      <span style={{ background:'rgba(124,58,237,0.15)', border:'1px solid rgba(124,58,237,0.25)', color:'#a78bfa', padding:'3px 10px', borderRadius:8, fontSize:'0.72rem', fontWeight:600 }}>{ev.category}</span>
                    </td>
                    <td style={{ padding:'14px 18px', fontSize:'0.82rem', color:'#9ca3af', whiteSpace:'nowrap' }}>{ev.venue}, {ev.city}</td>
                    <td style={{ padding:'14px 18px', fontSize:'0.82rem', color:'#9ca3af', whiteSpace:'nowrap' }}>
                      {ev.event_date ? new Date(ev.event_date).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'}) : '-'}
                    </td>
                    <td style={{ padding:'14px 18px' }}>
                      <span style={{ background:`${statusColor(ev.status)}22`, border:`1px solid ${statusColor(ev.status)}44`, color:statusColor(ev.status), padding:'3px 10px', borderRadius:8, fontSize:'0.72rem', fontWeight:600, textTransform:'capitalize' }}>{ev.status}</span>
                    </td>
                    <td style={{ padding:'14px 18px' }}>
                      <div style={{ display:'flex', gap:8 }}>
                        <button onClick={() => openEdit(ev)} style={{ padding:'6px 14px', borderRadius:8, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'#d1d5db', fontSize:'0.75rem', cursor:'pointer' }}>Edit</button>
                        <button onClick={() => setDel(ev.id)} style={{ padding:'6px 14px', borderRadius:8, background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', color:'#f87171', fontSize:'0.75rem', cursor:'pointer' }}>Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!loading && <div style={{ padding:'12px 18px', borderTop:'1px solid rgba(255,255,255,0.05)', fontSize:'0.75rem', color:'#6b7280' }}>{filtered.length} dari {events.length} event</div>}
        </div>

        {/* Delete confirm */}
        {del && (
          <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:200, backdropFilter:'blur(4px)' }}>
            <div style={{ background:'#13131f', border:'1px solid rgba(255,255,255,0.1)', borderRadius:20, padding:32, maxWidth:380, width:'90%', textAlign:'center' }}>
              <div style={{ fontSize:40, marginBottom:16 }}>⚠️</div>
              <h3 style={{ fontWeight:700, marginBottom:8 }}>Hapus Event?</h3>
              <p style={{ color:'#6b7280', fontSize:'0.85rem', marginBottom:24 }}>Tindakan ini tidak bisa dibatalkan. Semua tiket terkait akan ikut terhapus.</p>
              <div style={{ display:'flex', gap:10 }}>
                <button onClick={() => setDel(null)} style={{ flex:1, padding:'11px', borderRadius:12, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'#9ca3af', fontWeight:600, cursor:'pointer' }}>Batal</button>
                <button onClick={() => handleDelete(del)} style={{ flex:1, padding:'11px', borderRadius:12, background:'rgba(239,68,68,0.8)', color:'#fff', fontWeight:700, border:'none', cursor:'pointer' }}>Hapus</button>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {modal && (
          <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:200, backdropFilter:'blur(4px)', padding:16, overflowY:'auto' }}>
            <div style={{ background:'#13131f', border:'1px solid rgba(255,255,255,0.1)', borderRadius:24, padding:32, maxWidth:560, width:'100%' }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:24 }}>
                <h2 style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:'1.2rem' }}>{editId ? 'Edit Event' : 'Tambah Event Baru'}</h2>
                <button onClick={closeModal} style={{ background:'none', border:'none', color:'#6b7280', cursor:'pointer', fontSize:20 }}>✕</button>
              </div>
              <form onSubmit={handleSave} style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  {[
                    { label:'Judul Event', name:'title',     full:true },
                    { label:'Deskripsi',   name:'description',full:true, textarea:true },
                    { label:'Venue',       name:'venue' },
                    { label:'Kota',        name:'city' },
                    { label:'Organizer',   name:'organizer' },
                    { label:'Tanggal & Waktu', name:'event_date', type:'datetime-local' },
                    { label:'URL Gambar',  name:'image_url', full:true },
                  ].map(f => (
                    <div key={f.name} style={{ gridColumn: f.full?'1/-1':'auto' }}>
                      <label style={{ display:'block', color:'#9ca3af', fontSize:'0.78rem', fontWeight:600, marginBottom:6 }}>{f.label}</label>
                      {f.textarea ? (
                        <textarea name={f.name} value={form[f.name]} onChange={e=>setForm({...form,[e.target.name]:e.target.value})}
                          rows={3} style={{ width:'100%', padding:'10px 12px', borderRadius:10, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.05)', color:'#f9fafb', fontSize:'0.85rem', outline:'none', resize:'vertical', boxSizing:'border-box' }} />
                      ) : (
                        <input type={f.type||'text'} name={f.name} value={form[f.name]} onChange={e=>setForm({...form,[e.target.name]:e.target.value})}
                          style={{ width:'100%', padding:'10px 12px', borderRadius:10, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.05)', color:'#f9fafb', fontSize:'0.85rem', outline:'none', boxSizing:'border-box', colorScheme:'dark' }}
                          onFocus={e=>e.target.style.borderColor='rgba(124,58,237,0.6)'}
                          onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'} />
                      )}
                    </div>
                  ))}
                  {/* Category & Status selects */}
                  <div>
                    <label style={{ display:'block', color:'#9ca3af', fontSize:'0.78rem', fontWeight:600, marginBottom:6 }}>Kategori</label>
                    <select name="category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}
                      style={{ width:'100%', padding:'10px 12px', borderRadius:10, border:'1px solid rgba(255,255,255,0.1)', background:'#1a1a2e', color:'#f9fafb', fontSize:'0.85rem', outline:'none', boxSizing:'border-box' }}>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display:'block', color:'#9ca3af', fontSize:'0.78rem', fontWeight:600, marginBottom:6 }}>Status</label>
                    <select name="status" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}
                      style={{ width:'100%', padding:'10px 12px', borderRadius:10, border:'1px solid rgba(255,255,255,0.1)', background:'#1a1a2e', color:'#f9fafb', fontSize:'0.85rem', outline:'none', boxSizing:'border-box' }}>
                      {['active','soldout','cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display:'flex', gap:10, marginTop:8 }}>
                  <button type="button" onClick={closeModal} style={{ flex:1, padding:'12px', borderRadius:12, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'#9ca3af', fontWeight:600, cursor:'pointer' }}>Batal</button>
                  <button type="submit" disabled={saving} style={{ flex:2, padding:'12px', borderRadius:12, background:'linear-gradient(135deg,#7c3aed,#ec4899)', color:'#fff', fontWeight:700, border:'none', cursor:'pointer', boxShadow:'0 4px 16px rgba(124,58,237,0.35)' }}>
                    {saving ? '⏳ Menyimpan...' : editId ? '💾 Simpan Perubahan' : '✅ Tambah Event'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
