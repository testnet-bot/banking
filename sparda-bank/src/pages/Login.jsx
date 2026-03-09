import React, { useState } from 'react'
import SpardaLogo from '../components/SpardaLogo'

const navLinks = ['Girokonto', 'Sparen', 'Immobilien', 'Versicherungen', 'Depot', 'Service']
const badges = ['TÜV-geprüft sicher', 'SpardaSecureGo+', 'UnionDepot', 'Echtzeit-Überweisung']

export default function Login({ onLogin }) {
  const [netkey, setNetkey] = useState('Sparda1234512.05.85')
  const [pin, setPin] = useState('123456')

  return (
    <div style={{ minHeight: 'calc(100vh - 28px)', background: 'white', display: 'flex', flexDirection: 'column' }}>
      {/* Nav */}
      <nav style={{ background: 'white', borderBottom: '1px solid var(--gray-200)', padding: '0 40px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <SpardaLogo size={40} />
          <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)' }}>
            Sparda-<span style={{ color: 'var(--red)' }}>Bank</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {navLinks.map(l => (
            <a key={l} href="#" style={{ color: 'var(--gray-600)', fontSize: 13, textDecoration: 'none' }}
              onMouseEnter={e => e.target.style.color = 'var(--red)'}
              onMouseLeave={e => e.target.style.color = 'var(--gray-600)'}
            >{l}</a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <div style={{ flex: 1, background: 'linear-gradient(135deg,#1a1a2e 0%,#2d1b1b 50%,#3d0f0f 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(200,16,46,0.15) 0%, transparent 60%), radial-gradient(ellipse 50% 80% at 80% 30%, rgba(200,16,46,0.08) 0%, transparent 60%)' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 80, maxWidth: 1100, width: '100%', position: 'relative', zIndex: 1, alignItems: 'center' }}>

          {/* Copy */}
          <div>
            <h1 style={{ fontSize: 42, fontWeight: 300, color: 'white', lineHeight: 1.2, marginBottom: 20 }}>
              Ihr Banking.<br /><strong style={{ fontWeight: 700, color: '#ff3a57' }}>Einfach. Sicher. Digital.</strong>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, lineHeight: 1.6, maxWidth: 440 }}>
              Mit dem Online-Banking der Sparda-Bank haben Sie Ihre Finanzen jederzeit im Blick – auf allen Geräten.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 32, flexWrap: 'wrap' }}>
              {badges.map(b => (
                <span key={b} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#4cde80', fontSize: 11 }}>✓</span> {b}
                </span>
              ))}
            </div>
          </div>

          {/* Card */}
          <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.4)', padding: 36, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'var(--red)' }} />
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Online-Banking</h2>
            <div style={{ fontSize: 13, color: 'var(--gray-600)', marginBottom: 28 }}>Melden Sie sich mit Ihrem Sparda-NetKey an.</div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-700)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Sparda-NetKey / Alias</label>
              <input value={netkey} onChange={e => setNetkey(e.target.value)}
                style={{ width: '100%', border: '1.5px solid var(--gray-300)', borderRadius: 6, padding: '10px 14px', fontSize: 14, outline: 'none' }} />
              <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 5 }}>z.B. Sparda + Kundennummer + Geburtsdatum (TTMMJJJJ)</div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-700)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Online-PIN (6-stellig)</label>
              <input type="password" value={pin} onChange={e => setPin(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && onLogin()}
                style={{ width: '100%', border: '1.5px solid var(--gray-300)', borderRadius: 6, padding: '10px 14px', fontSize: 14, outline: 'none' }} />
            </div>

            <button onClick={onLogin} style={{ width: '100%', background: 'var(--red)', color: 'white', border: 'none', borderRadius: 6, padding: 12, fontSize: 15, fontWeight: 600, cursor: 'pointer', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              🔐 Anmelden
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, fontSize: 12 }}>
              <a href="#" style={{ color: 'var(--red)', textDecoration: 'none' }}>Alias vergessen?</a>
              <a href="#" style={{ color: 'var(--red)', textDecoration: 'none' }}>PIN vergessen?</a>
            </div>

            <div style={{ background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: 8, padding: '12px 14px', marginTop: 20, display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--gray-600)' }}>
              <span style={{ fontSize: 22 }}>📱</span>
              <div>
                <strong style={{ display: 'block', color: 'var(--gray-900)', marginBottom: 2 }}>SpardaSecureGo+</strong>
                Freigabe per App – kein TAN mehr nötig. Sicher und bequem.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
