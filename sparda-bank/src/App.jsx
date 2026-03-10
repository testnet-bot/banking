import React, { useState, useEffect } from 'react'
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
      { id: 'überweisung',  icon: '↗️', label: 'Überweisung' },
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
      { id: 'profil',   icon: '👤', label: 'Profil' },
    ],
  },
]

// Bottom nav items (most used, for mobile)
const bottomNavItems = [
  { id: 'kontoübersicht', icon: '🏠', label: 'Konten' },
  { id: 'umsätze',        icon: '📋', label: 'Umsätze' },
  { id: 'überweisung',    icon: '↗️', label: 'Überweisen' },
  { id: 'postfach',       icon: '📬', label: 'Postfach', badge: 3 },
  { id: 'profil',         icon: '👤', label: 'Profil' },
]

const pageComponents = {
  'kontoübersicht': Kontoübersicht,
  'umsätze':        Umsätze,
  'überweisung':    Überweisung,
  'dauerauftrag':   Dauerauftrag,
  'depot':          Depot,
  'sparkonto':      Sparkonto,
  'postfach':       Postfach,
  'karten':         Karten,
  'profil':         Profil,
}

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth <= 768)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth <= 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return mobile
}

export default function App() {
  const [loggedIn, setLoggedIn]       = useState(false)
  const [page, setPage]               = useState('kontoübersicht')
  const [modalOpen, setModalOpen]     = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [transferSuccess, setTransferSuccess] = useState(false)
  const isMobile = useIsMobile()

  const PageComponent = pageComponents[page] || Kontoübersicht

  const goTo = (id) => {
    setPage(id)
    setSidebarOpen(false)
  }

  if (!loggedIn) return (
    <>
      <DemoBanner />
      <div style={{ paddingTop: 'var(--banner-h)' }}>
        <Login onLogin={() => setLoggedIn(true)} isMobile={isMobile} />
      </div>
    </>
  )

  return (
    <>
      <DemoBanner />

      {/* SecureGo modal */}
      {modalOpen && (
        <SecureGoModal
          onClose={() => setModalOpen(false)}
          onConfirm={() => {
            setModalOpen(false)
            setTransferSuccess(true)
            setTimeout(() => setTransferSuccess(false), 4000)
          }}
        />
      )}

      {/* Success toast */}
      {transferSuccess && (
        <div style={{
          position: 'fixed', top: isMobile ? 'auto' : 38, bottom: isMobile ? 80 : 'auto',
          right: 16, left: isMobile ? 16 : 'auto',
          zIndex: 1500, background: 'var(--green)', color: 'white',
          borderRadius: 10, padding: '14px 18px', fontSize: 13, fontWeight: 600,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          ✅ Auftrag erteilt! Überweisung wird verarbeitet.
        </div>
      )}

      {/* Sidebar backdrop (mobile) */}
      {isMobile && (
        <div
          className={`sidebar-backdrop ${sidebarOpen ? 'open' : ''}`}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div style={{ paddingTop: 'var(--banner-h)' }}>

        {/* ── HEADER ── */}
        <header style={{
          position: 'fixed', top: 'var(--banner-h)', left: 0, right: 0,
          height: 'var(--header-h)', background: 'white',
          borderBottom: '1px solid var(--gray-200)',
          display: 'flex', alignItems: 'center',
          zIndex: 100, boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}>

          {/* Logo section */}
          <div style={{
            width: isMobile ? 'auto' : 'var(--sidebar-w)',
            padding: isMobile ? '0 12px' : '0 20px',
            display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 10,
            flexShrink: 0,
            borderRight: isMobile ? 'none' : '1px solid var(--gray-200)',
            height: '100%',
          }}>
            {/* Hamburger on mobile */}
            {isMobile && (
              <button onClick={() => setSidebarOpen(v => !v)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 20, padding: '4px', color: 'var(--gray-700)',
                display: 'flex', flexDirection: 'column', gap: 4,
                alignItems: 'center', justifyContent: 'center', width: 32, height: 32,
              }}>
                <div style={{ width: 20, height: 2, background: 'var(--gray-700)', borderRadius: 1 }} />
                <div style={{ width: 20, height: 2, background: 'var(--gray-700)', borderRadius: 1 }} />
                <div style={{ width: 20, height: 2, background: 'var(--gray-700)', borderRadius: 1 }} />
              </button>
            )}
            <SpardaLogo size={isMobile ? 30 : 34} />
            {!isMobile && (
              <span style={{ fontSize: 15, fontWeight: 700 }}>
                Sparda-<span style={{ color: 'var(--red)' }}>Bank</span>
              </span>
            )}
          </div>

          {/* Header right */}
          <div style={{
            flex: 1, padding: isMobile ? '0 8px' : '0 24px',
            display: 'flex', alignItems: 'center',
            justifyContent: isMobile ? 'space-between' : 'space-between',
          }}>
            {/* Greeting — hidden on mobile via CSS */}
            <div className="header-greeting" style={{ fontSize: 14, color: 'var(--gray-600)' }}>
              Guten Tag, <strong style={{ color: 'var(--gray-900)' }}>Thomas Müller</strong>
            </div>

            {/* On mobile: show page title instead */}
            {isMobile && (
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--gray-900)' }}>
                {navSections.flatMap(s => s.items).find(i => i.id === page)?.label || 'Banking'}
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 4 : 8 }}>
              {/* Postfach button — icon only on mobile */}
              <button onClick={() => goTo('postfach')} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: isMobile ? '6px 8px' : '6px 12px',
                border: '1px solid var(--gray-300)', borderRadius: 6,
                background: 'white', color: 'var(--gray-700)', fontSize: 13,
                cursor: 'pointer', position: 'relative',
              }}>
                📬
                <span className="header-btn-label">Postfach</span>
                <span style={{
                  position: 'absolute', top: -4, right: -4,
                  width: 16, height: 16, background: 'var(--red)', color: 'white',
                  borderRadius: '50%', fontSize: 10, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>3</span>
              </button>

              {/* Bell — hidden on mobile to save space */}
              {!isMobile && (
                <button style={{ padding: '6px 10px', border: '1px solid var(--gray-300)', borderRadius: 6, background: 'white', fontSize: 13, cursor: 'pointer' }}>🔔</button>
              )}

              {/* Avatar */}
              <div onClick={() => goTo('profil')} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '4px 8px', borderRadius: 6, cursor: 'pointer',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-100)'}
                onMouseLeave={e => e.currentTarget.style.background = ''}
              >
                <div style={{
                  width: 32, height: 32, background: 'var(--red)', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: 12, fontWeight: 700, flexShrink: 0,
                }}>TM</div>
                {!isMobile && (
                  <>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-800)' }}>Th. Müller</span>
                    <span style={{ color: 'var(--gray-400)', fontSize: 10 }}>▾</span>
                  </>
                )}
              </div>

              {/* Logout */}
              <button onClick={() => setLoggedIn(false)} style={{
                padding: isMobile ? '6px 8px' : '6px 12px',
                border: '1px solid var(--red)', borderRadius: 6,
                background: 'white', color: 'var(--red)',
                fontSize: isMobile ? 16 : 13, fontWeight: 600, cursor: 'pointer',
              }}>
                {isMobile ? '⏏' : '⏏ Abmelden'}
              </button>
            </div>
          </div>
        </header>

        {/* ── SIDEBAR ── */}
        <nav style={{
          position: 'fixed',
          top: isMobile ? 0 : `calc(var(--banner-h) + var(--header-h))`,
          left: 0,
          width: 'var(--sidebar-w, 240px)',
          // On mobile: slide in/out as drawer
          ...(isMobile ? {
            width: 260,
            top: 0, bottom: 0,
            transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.25s ease',
            zIndex: 90,
            paddingTop: 64,
            boxShadow: sidebarOpen ? '4px 0 20px rgba(0,0,0,0.15)' : 'none',
          } : {
            width: 'var(--sidebar-w)',
            bottom: 0,
            zIndex: 90,
          }),
          background: 'white',
          borderRight: '1px solid var(--gray-200)',
          overflowY: 'auto',
          padding: isMobile ? '0' : '16px 0',
        }}>
          {isMobile && (
            <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid var(--gray-100)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, background: 'var(--red)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>TM</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>Thomas Müller</div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>Kd-Nr: 123456</div>
              </div>
            </div>
          )}

          {navSections.map((section, si) => (
            <div key={section.title}>
              {si > 0 && <hr style={{ border: 'none', borderTop: '1px solid var(--gray-200)', margin: '8px 0' }} />}
              <div style={{ padding: '8px 20px 6px', fontSize: 10, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                {section.title}
              </div>
              {section.items.map(item => {
                const active = page === item.id
                return (
                  <button key={item.id} onClick={() => goTo(item.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 20px',
                    color: active ? 'var(--red)' : 'var(--gray-600)',
                    background: active ? 'var(--red-pale)' : 'transparent',
                    borderRight: active ? '3px solid var(--red)' : '3px solid transparent',
                    border: 'none', width: '100%', textAlign: 'left',
                    fontSize: 14, fontWeight: active ? 600 : 500,
                    cursor: 'pointer', transition: 'all 0.12s',
                  }}>
                    <span style={{ width: 20, textAlign: 'center', fontSize: 16 }}>{item.icon}</span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge && (
                      <span style={{ background: 'var(--red)', color: 'white', borderRadius: 10, fontSize: 10, fontWeight: 700, padding: '1px 6px' }}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          ))}

          {isMobile && (
            <div style={{ padding: '16px 20px', marginTop: 8, borderTop: '1px solid var(--gray-200)' }}>
              <button onClick={() => setLoggedIn(false)} style={{ width: '100%', background: 'white', color: 'var(--red)', border: '1.5px solid var(--red)', borderRadius: 7, padding: '10px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                ⏏ Abmelden
              </button>
            </div>
          )}
        </nav>

        {/* ── MAIN CONTENT ── */}
        <main style={{
          marginLeft: isMobile ? 0 : 'var(--sidebar-w)',
          paddingTop: 'var(--header-h)',
          paddingBottom: isMobile ? 'var(--bottom-nav-h)' : 0,
          minHeight: 'calc(100vh - var(--banner-h))',
        }}>
          <div style={{ padding: isMobile ? '16px' : '28px 32px' }}>
            <PageComponent
              key={page}
              goTo={goTo}
              openModal={() => setModalOpen(true)}
              isMobile={isMobile}
            />
          </div>
        </main>

        {/* ── BOTTOM NAV (mobile only) ── */}
        {isMobile && (
          <nav style={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            height: 'var(--bottom-nav-h)',
            background: 'white', borderTop: '1px solid var(--gray-200)',
            display: 'flex', alignItems: 'stretch',
            zIndex: 100, boxShadow: '0 -2px 8px rgba(0,0,0,0.06)',
          }}>
            {bottomNavItems.map(item => {
              const active = page === item.id
              return (
                <button key={item.id} onClick={() => goTo(item.id)} style={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 3,
                  border: 'none', background: 'transparent', cursor: 'pointer',
                  color: active ? 'var(--red)' : 'var(--gray-500)',
                  borderTop: active ? '2px solid var(--red)' : '2px solid transparent',
                  position: 'relative',
                }}>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <span style={{ fontSize: 10, fontWeight: active ? 700 : 500 }}>{item.label}</span>
                  {item.badge && (
                    <span style={{
                      position: 'absolute', top: 6, right: '50%',
                      marginRight: -18,
                      width: 15, height: 15, background: 'var(--red)', color: 'white',
                      borderRadius: '50%', fontSize: 9, fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{item.badge}</span>
                  )}
                </button>
              )
            })}
          </nav>
        )}

      </div>
    </>
  )
}
