import React, { useState } from 'react'
import { user } from '../data/bankData'

function Toggle({ on, onToggle }) {
  return (
    <div onClick={onToggle} style={{
      width: 40, height: 22, borderRadius: 11,
      background: on ? 'var(--green)' : 'var(--gray-300)',
      position: 'relative', cursor: 'pointer',
      transition: 'background 0.2s', flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', top: 3,
        left: on ? 21 : 3, width: 16, height: 16,
        background: 'white', borderRadius: '50%',
        transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
      }} />
    </div>
  )
}

const personalRows = [
  ['Vorname',       'Thomas'],
  ['Nachname',      'Müller'],
  ['Geburtsdatum',  '12.05.1985'],
  ['Steuer-ID',     '14 xxx xx xxx'],
  ['Adresse',       'Maximilianstr. 42, 80539 München'],
  ['Telefon',       '+49 176 •••••••789'],
  ['E-Mail',        't.mueller@email.de'],
  ['Kundennummer',  '123456'],
  ['Mitglied seit', '2011'],
]

const securityItems = [
  { key: 'securego', name: 'SpardaSecureGo+',              desc: 'iPhone 14 Pro · Aktiviert seit 06.03.2026',    on: true  },
  { key: 'smarttan', name: 'Sm@rtTAN plus',                 desc: 'Backup-Verfahren mit TAN-Generator',           on: true  },
  { key: 'emailNotif', name: 'E-Mail-Benachrichtigungen',   desc: 'Benachrichtigung bei neuen Dokumenten',        on: true  },
  { key: 'pushNotif',  name: 'Push-Benachrichtigungen',     desc: 'Umsätze und Überweisungen in Echtzeit',        on: true  },
  { key: 'loginAlert', name: 'Login-Benachrichtigung',      desc: 'Benachrichtigung bei jedem Anmeldevorgang',    on: false },
]

export default function Profil() {
  const [sec, setSec] = useState(
    Object.fromEntries(securityItems.map(s => [s.key, s.on]))
  )
  const toggle = k => setSec(p => ({ ...p, [k]: !p[k] }))
  const [editing, setEditing] = useState(false)

  return (
    <div className="page-animate">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--gray-900)' }}>Profil & Sicherheit</div>
        <div style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 4 }}>
          Kundennummer: {user.kundennummer} · Mitglied seit {user.since}
        </div>
      </div>

      {/* Avatar + name banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e, #2d1b1b)',
        borderRadius: 10, padding: '20px 24px', marginBottom: 20,
        display: 'flex', alignItems: 'center', gap: 18, color: 'white',
      }}>
        <div style={{
          width: 56, height: 56, background: 'var(--red)', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, fontWeight: 700, flexShrink: 0,
        }}>TM</div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Thomas Müller</div>
          <div style={{ fontSize: 13, opacity: 0.7 }}>Kundennummer: 123456 · Mitglied seit 2011</div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <span style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 20, padding: '5px 14px', fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>
            🔒 SpardaSecureGo+ aktiv
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Personal data */}
        <div style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 10, padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid var(--gray-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Persönliche Daten
            <button onClick={() => setEditing(!editing)} style={{ fontSize: 12, color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
              {editing ? '✓ Speichern' : '✏️ Bearbeiten'}
            </button>
          </div>
          {personalRows.map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--gray-50)' }}>
              <span style={{ fontSize: 12, color: 'var(--gray-500)', flexShrink: 0 }}>{k}</span>
              {editing && ['Telefon', 'E-Mail', 'Adresse'].includes(k) ? (
                <input defaultValue={v} style={{ border: '1px solid var(--gray-300)', borderRadius: 4, padding: '3px 8px', fontSize: 13, outline: 'none', maxWidth: 220, textAlign: 'right' }} />
              ) : (
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-900)', textAlign: 'right' }}>{v}</span>
              )}
            </div>
          ))}
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <button style={{ background: 'var(--red)', color: 'white', border: 'none', borderRadius: 6, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              PIN ändern
            </button>
            <button style={{ background: 'white', color: 'var(--gray-700)', border: '1.5px solid var(--gray-300)', borderRadius: 6, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              Alias ändern
            </button>
          </div>
        </div>

        {/* Security */}
        <div style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 10, padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid var(--gray-100)' }}>
            Sicherheit & Verfahren
          </div>
          {securityItems.map(item => (
            <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid var(--gray-100)' }}>
              <div style={{ flex: 1, paddingRight: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-900)' }}>{item.name}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 2 }}>{item.desc}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                <span style={{ fontSize: 11, color: sec[item.key] ? 'var(--green)' : 'var(--gray-400)' }}>
                  {sec[item.key] ? 'An' : 'Aus'}
                </span>
                <Toggle on={sec[item.key]} onToggle={() => toggle(item.key)} />
              </div>
            </div>
          ))}

          {/* Last login info */}
          <div style={{ marginTop: 16, background: 'var(--gray-50)', borderRadius: 8, padding: '12px 14px', fontSize: 12, color: 'var(--gray-600)' }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>🕐 Letzte Anmeldungen</div>
            <div>Heute 09:14 Uhr · Chrome · Windows · 192.168.1.xxx</div>
            <div style={{ marginTop: 2, color: 'var(--gray-400)' }}>07.03.2026 18:42 Uhr · Safari · iPhone 14 Pro</div>
          </div>
        </div>
      </div>
    </div>
  )
}
