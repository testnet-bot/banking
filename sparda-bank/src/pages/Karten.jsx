import React, { useState } from 'react'

function Toggle({ on, onToggle }) {
  return (
    <div
      onClick={onToggle}
      title={on ? 'Deaktivieren' : 'Aktivieren'}
      style={{
        width: 40, height: 22, borderRadius: 11,
        background: on ? 'var(--green)' : 'var(--gray-300)',
        position: 'relative', cursor: 'pointer',
        transition: 'background 0.2s', flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute', top: 3,
        left: on ? 21 : 3, width: 16, height: 16,
        background: 'white', borderRadius: '50%',
        transition: 'left 0.2s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
      }} />
    </div>
  )
}

function PaymentCard({ gradient, type, last4, holder, expiry }) {
  return (
    <div style={{
      background: gradient, borderRadius: 14, padding: 24,
      color: 'white', position: 'relative', overflow: 'hidden',
      height: 185, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      {/* Decorative circles */}
      <div style={{ position: 'absolute', right: -20, top: -20, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
      <div style={{ position: 'absolute', right: 20, bottom: -35, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
        <span style={{ fontSize: 24 }}>💳</span>
        <span style={{ fontSize: 13, fontWeight: 700, opacity: 0.85 }}>{type}</span>
      </div>

      {/* Card number */}
      <div style={{ fontFamily: 'monospace', fontSize: 16, letterSpacing: 3, opacity: 0.85, position: 'relative' }}>
        •••• &nbsp;•••• &nbsp;•••• &nbsp;{last4}
      </div>

      {/* Bottom row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative' }}>
        <div>
          <div style={{ fontSize: 10, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Karteninhaber</div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{holder}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 10, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Gültig bis</div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{expiry}</div>
        </div>
      </div>
    </div>
  )
}

export default function Karten() {
  const [toggles, setToggles] = useState({
    nfc: true, online3d: true, ausland: true, apple: true,
    mconline: true, mclimit: false,
  })
  const toggle = k => setToggles(p => ({ ...p, [k]: !p[k] }))

  const cardInfoStyle = { display: 'flex', gap: 24, flexWrap: 'wrap', padding: 16 }
  const infoItem = (label, value, color) => (
    <div key={label}>
      <div style={{ fontSize: 11, color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: color || 'var(--gray-900)', marginTop: 3 }}>{value}</div>
    </div>
  )

  return (
    <div className="page-animate">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--gray-900)' }}>Meine Karten</div>
        <div style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 4 }}>2 aktive Karten · Kontaktlos und Apple/Google Pay aktiviert</div>
      </div>

      {/* Cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>

        {/* Girocard */}
        <div>
          <PaymentCard
            gradient="linear-gradient(135deg, #C8102E 0%, #7a0b1e 100%)"
            type="Girocard" last4="4782" holder="THOMAS MÜLLER" expiry="12/28"
          />
          <div style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 8, marginTop: 12 }}>
            <div style={cardInfoStyle}>
              {infoItem('Status',          '✓ Aktiv',     'var(--green)')}
              {infoItem('Tageslimit',      '1.500,00 €')}
              {infoItem('Kontaktlos',      'Aktiviert')}
              {infoItem('Apple Pay',       'Aktiviert')}
            </div>
            <div style={{ borderTop: '1px solid var(--gray-100)', padding: '12px 16px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 12 }}>Einstellungen</div>
              {[
                { key: 'nfc',    name: 'Kontaktloses Bezahlen (NFC)', desc: 'Bis 50 € ohne PIN-Eingabe' },
                { key: 'ausland',name: 'Auslandseinsatz',              desc: 'Kartenzahlung außerhalb EU/EWR' },
                { key: 'apple', name: 'Apple/Google Pay',             desc: 'Mobiles Bezahlen per Smartphone' },
              ].map(item => (
                <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>{item.desc}</div>
                  </div>
                  <Toggle on={toggles[item.key]} onToggle={() => toggle(item.key)} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mastercard Gold */}
        <div>
          <PaymentCard
            gradient="linear-gradient(135deg, #1a1a2e 0%, #2d2d4e 100%)"
            type="Mastercard Gold" last4="9341" holder="THOMAS MÜLLER" expiry="08/27"
          />
          <div style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 8, marginTop: 12 }}>
            <div style={cardInfoStyle}>
              {infoItem('Status',          '✓ Aktiv',     'var(--green)')}
              {infoItem('Kreditlimit',     '5.000,00 €')}
              {infoItem('Genutzt',         '342,80 €',    'var(--red)')}
              {infoItem('Verfügbar',       '4.657,20 €',  'var(--green)')}
            </div>
            {/* Credit usage bar */}
            <div style={{ padding: '0 16px 12px' }}>
              <div style={{ height: 6, background: 'var(--gray-200)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '6.86%', background: 'var(--red)', borderRadius: 3 }} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4 }}>342,80 € von 5.000,00 € genutzt</div>
            </div>
            <div style={{ borderTop: '1px solid var(--gray-100)', padding: '12px 16px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 12 }}>Einstellungen</div>
              {[
                { key: 'mconline', name: 'Online-Zahlungen',  desc: '3D Secure / Mastercard Identity Check' },
                { key: 'ausland',  name: 'Auslandseinsatz',   desc: 'Zahlungen außerhalb EU/EWR' },
                { key: 'mclimit',  name: 'Benachrichtigungen', desc: 'Push bei jeder Kartenzahlung' },
              ].map(item => (
                <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>{item.desc}</div>
                  </div>
                  <Toggle on={toggles[item.key]} onToggle={() => toggle(item.key)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card locking section */}
      <div style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 10, padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Kartensperrung & Notfall</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button style={{ background: 'white', color: 'var(--red)', border: '1.5px solid var(--red)', borderRadius: 7, padding: '9px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            🔒 Karte sofort sperren
          </button>
          <button style={{ background: 'white', color: 'var(--gray-700)', border: '1.5px solid var(--gray-300)', borderRadius: 7, padding: '9px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            📋 Ersatzkarte beantragen
          </button>
          <button style={{ background: 'white', color: 'var(--gray-700)', border: '1.5px solid var(--gray-300)', borderRadius: 7, padding: '9px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            🔑 PIN anzeigen
          </button>
        </div>
        <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 10 }}>
          Notruf Kartensperrung: <strong>+49 116 116</strong> (24/7 erreichbar)
        </div>
      </div>
    </div>
  )
}
