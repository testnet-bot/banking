import React from 'react'

export default function DemoBanner() {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
      background: '#1a1a1a', color: '#f0c040',
      textAlign: 'center', fontSize: 12, fontWeight: 600,
      padding: '5px 12px', letterSpacing: '0.5px',
      height: 'var(--banner-h)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      ⚠️ DEMO · Nur zu Demonstrations- und Lernzwecken · Kein echtes Konto
    </div>
  )
}
