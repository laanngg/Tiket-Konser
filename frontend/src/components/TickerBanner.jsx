const items = [
  'Echoes of Innocence — 29 Agt',
  'Westlife World Tour — 15 Sep',
  'Jazz Under The Stars — 5 Okt',
  'Synchronize Fest — 3 Okt',
  'Vienna Philharmonic — 20 Nov',
  'UNGU Final Chapter — 30 Okt',
  'Raisa Live in Concert — 12 Des',
]

export default function TickerBanner() {
  const doubled = [...items, ...items]
  return (
    <div style={{
      overflow: 'hidden',
      background: '#0d0b16',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      padding: '14px 0',
      position: 'relative',
    }}>
      {/* fades */}
      <div style={{ position:'absolute',left:0,top:0,bottom:0,width:100,background:'linear-gradient(to right,#0c0a14,transparent)',zIndex:2,pointerEvents:'none' }} />
      <div style={{ position:'absolute',right:0,top:0,bottom:0,width:100,background:'linear-gradient(to left,#0c0a14,transparent)',zIndex:2,pointerEvents:'none' }} />

      <div className="animate-ticker" style={{ display:'flex', whiteSpace:'nowrap', willChange:'transform' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            display:'inline-flex', alignItems:'center', gap: 14,
            marginRight: 48, fontSize:'0.75rem', fontWeight: 500,
            color: '#a1a1aa', letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            {item}
            <span style={{ color: '#d97706', fontSize: '0.6rem', opacity: 0.7 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
