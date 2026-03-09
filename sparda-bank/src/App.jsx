import React, { useState } from 'react'
import DemoBanner from './components/DemoBanner'
import SpardaLogo from './components/SpardaLogo'
import SecureGoModal from './components/SecureGoModal'
import Login from './pages/Login'
import Kontoübersicht from './pages/Kontoübersicht'
import Umsätze from './pages/Umsätze'
import Überweisung from './pages/Überweisung'
import Dauerauftrag from './pages/Dauerauftrag'
import Depot from './pages/Depot'
import Sparkonto from './pages/Sparkonto'
import Postfach from './pages/Postfach'
import Karten from './pages/Karten'
import Profil from './pages/Profil'

const navSections = [
  {
    title: 'Konten',
    items: [
      { id: 'kontoübersicht', icon: '🏠', label: 'Kontoübersicht' },
      { id: 'umsätze',        icon: '📋', label: 'Umsätze' },
    ],
  },
  {
    title: 'Zahlungsverkehr',
    items: [
      { id: 'überweisung', icon: '↗️', label: 'Überweisung' },
      { id: 'dauerauftrag', icon: '🔄', label: 'Dauerauftrag' },
    ],
  },
  {
    title: 'Anlage & Depot',
    items: [
      { id: 'depot',     icon: '📈', label: 'UnionDepot' },
      { id: 'sparkonto', icon: '🐷', label: 'SpardaSpar' },
    ],
  },
  {
    title: 'Service',
    items: [
      { id: 'postfach', icon: '📬', label: 'Postfach', badge: 3 },
      { id: 'karten',   icon: '💳', label: 'Meine Karten' },
      { id: 'profil',   icon: '👤', label: 'Profil & Sicherheit' },
    ],
  },
]

const pageComponents = {
  kontoübersicht: Kontoübersicht,
  umsätze:        Umsätze,
  überweisung:    Überweisung,
  dauerauftrag:   Dauerauftrag,
  depot:          Depot,
  sparkonto:      Sparkonto,
  postfach:       Postfach,
  karten:         Karten,
  profil:         Profil,
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [page, setPage] = useState('kontoübersicht')
  const [modalOpen, setModalOpen] = useState(false)
  const [transferSuccess, setTransferSuccess] = useState(false)

  const PageComponent = pageComponents[page] || Kontoübersicht

  if (!loggedIn) return (
    <>
      <DemoBanner />
      <div style={{ paddingTop: 'var(--banner-h)' }}>
        <Login onLogin={() => setLoggedIn(true)} />
      </div>
    </>
  )

  return (
    <>
      <DemoBanner />
      {modalOpen && (
        <SecureGoModal
          onClose={() => setModalOpen(false)}
          onConfirm={() => {
            setTransferSuccess(true)
            setTimeout(() => setTransferSuccess(false), 4000)
          }}
        />
      )}

      {transferSuccess && (
        <div style={{ position: 'fixed', top: 38, right: 20, zIndex: 1500, background: 'var(--green)', color: 'white', borderRadius: 10, padding: '14px 20px', fontSize: 14, fontWeight: 600, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: 8 }}>
          ✅ Auftrag erfolgreich erteilt! Überweisung wird verarbeitet.
        </div>
      )}

      <div style={{ paddingTop: 'var(--banner-h)' }}>
        {/* Header */}
        <header style={{ position: 'fixed', top: 'var(--banner-h)', left: 0, right: 0, height: 'var(--header-h)', background: 'white', borderBottom: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', zIndex: 100, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ width: 'var(--sidebar-w)', padding: '0 20px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, borderRight: '1px solid var(--gray-200)', height: '100%' }}>
            <SpardaLogo size={34} />
            <span style={{ fontSize: 15, fontWeight: 700 }}>Sparda-<span style={{ color: 'var(--red)' }}>Bank</span></span>
          </div>
          <div style={{ flex: 1, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 14, color: 'var(--gray-600)' }}>Guten Tag, <strong style={{ color: 'var(--gray-900)' }}>Thomas Müller</strong></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={() => setPage('postfach')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', border: '1px solid var(--gray-300)', borderRadius: 6, background: 'white', color: 'var(--gray-700)', fontSize: 13, cursor: 'pointer', position: 'relative' }}>
                📬 Postfach
                <span style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, background: 'var(--red)', color: 'white', borderRadius: '50%', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
              </button>
              <button style={{ padding: '6px 10px', border: '1px solid var(--gray-300)', borderRadius: 6, background: 'white', fontSize: 13, cursor: 'pointer' }}>🔔</button>
              <div onClick={() => setPage('profil')} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 6, cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-100)'}
                onMouseLeave={e => e.currentTarget.style.background = ''}
              >
                <div style={{ width: 32, height: 32, background: 'var(--red)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 700 }}>TM</div>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-800)' }}>Th. Müller</span>
                <span style={{ color: 'var(--gray-400)', fontSize: 10 }}>▾</span>
              </div>
              <button onClick={() => setLoggedIn(false)} style={{ padding: '6px 12px', border: '1px solid var(--red)', borderRadius: 6, background: 'white', color: 'var(--red)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                ⏏ Abmelden
              </button>
            </div>
          </div>
        </header>

        {/* Sidebar */}
        <nav style={{ position: 'fixed', top: `calc(var(--banner-h) + var(--header-h))`, left: 0, width: 'var(--sidebar-w)', bottom: 0, background: 'white', borderRight: '1px solid var(--gray-200)', overflowY: 'auto', zIndex: 90, padding: '16px 0' }}>
          {navSections.map((section, si) => (
            <div key={section.title}>
              {si > 0 && <hr style={{ border: 'none', borderTop: '1px solid var(--gray-200)', margin: '8px 0' }} />}
              <div style={{ padding: '8px 20px 6px', fontSize: 10, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{section.title}</div>
              {section.items.map(item => {
                const active = page === item.id
                return (
                  <button key={item.id} onClick={() => setPage(item.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '9px 20px',
                    color: active ? 'var(--red)' : 'var(--gray-600)',
                    background: active ? 'var(--red-pale)' : 'transparent',
                    borderRight: active ? '3px solid var(--red)' : '3px solid transparent',
                    border: 'none', width: '100%', textAlign: 'left',
                    fontSize: 13.5, fontWeight: 500, cursor: 'pointer',
                    transition: 'all 0.12s',
                  }}
                    onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'var(--gray-50)'; e.currentTarget.style.color = 'var(--gray-900)' } }}
                    onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gray-600)' } }}
                  >
                    <span style={{ width: 18, textAlign: 'center', fontSize: 15 }}>{item.icon}</span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge && <span style={{ background: 'var(--red)', color: 'white', borderRadius: 10, fontSize: 10, fontWeight: 700, padding: '1px 6px' }}>{item.badge}</span>}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Main */}
        <main style={{ marginLeft: 'var(--sidebar-w)', paddingTop: 'var(--header-h)', minHeight: 'calc(100vh - var(--banner-h))' }}>
          <div style={{ padding: '28px 32px' }}>
            <PageComponent
              key={page}
              goTo={setPage}
              openModal={() => setModalOpen(true)}
            />
          </div>
        </main>
      </div>
    </>
  )
}
