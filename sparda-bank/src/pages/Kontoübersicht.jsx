import React from 'react'
import { accounts, transactions } from '../data/bankData'
import TransactionItem from '../components/TransactionItem'

const cardGradients = {
  giro:  'linear-gradient(135deg, #C8102E, #8b0b20)',
  spar:  'linear-gradient(135deg, #1a6eb5, #0f4d82)',
  depot: 'linear-gradient(135deg, #2d7d46, #1b4d2b)',
}

const btnStyle = {
  background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)',
  color: 'white', borderRadius: 5, padding: '5px 10px', fontSize: 11,
  cursor: 'pointer', fontFamily: 'Source Sans 3, sans-serif',
}

function AccountCard({ acct, onClick, onAction }) {
  return (
    <div onClick={onClick} style={{
      background: cardGradients[acct.id], color: 'white',
      borderRadius: 10, padding: 20, cursor: 'pointer',
      position: 'relative', overflow: 'hidden',
      transition: 'transform 0.15s, box-shadow 0.15s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.18)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
    >
      <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
      <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.75, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{acct.type}</div>
      <div style={{ fontSize: 14, fontWeight: 600, margin: '4px 0' }}>{acct.name}</div>
      <div style={{ fontSize: 11, opacity: 0.65, marginBottom: 16, fontFamily: 'monospace' }}>{acct.iban}</div>
      <div style={{ fontSize: 26, fontWeight: 700 }}>{acct.balance}</div>
      <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>{acct.balanceLabel}</div>
      <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }} onClick={e => e.stopPropagation()}>
        {acct.id === 'giro'  && <><button onClick={() => onAction('überweisung')} style={btnStyle}>Überweisen</button><button onClick={() => onAction('umsätze')} style={btnStyle}>Umsätze</button></>}
        {acct.id === 'spar'  && <button onClick={() => onAction('sparkonto')} style={btnStyle}>Details</button>}
        {acct.id === 'depot' && <button onClick={() => onAction('depot')} style={btnStyle}>Depot ansehen</button>}
      </div>
    </div>
  )
}

const stats = [
  { label: 'Einnahmen (März)', value: '+3.400,00 €', cls: 'pos', sub: 'Gehalt + Zinsen' },
  { label: 'Ausgaben (März)',  value: '-1.847,22 €', cls: 'neg', sub: 'inkl. Daueraufträge' },
  { label: 'Gesamt Guthaben', value: '56.500,68 €', cls: '',    sub: 'Alle Konten' },
  { label: 'Daueraufträge',   value: '4 aktiv',      cls: '',    sub: 'Nächste am 15.03.' },
]

const barData = [
  { label: 'Wohnen',    h: 65, color: 'var(--red)'      },
  { label: 'Lebensm.',  h: 32, color: 'var(--gray-400)' },
  { label: 'Transport', h: 20, color: 'var(--blue)'      },
  { label: 'Freizeit',  h: 15, color: 'var(--green)'     },
  { label: 'Medien',    h: 12, color: '#f59e0b'           },
  { label: 'Sonstiges', h: 18, color: '#8b5cf6'           },
]

export default function Kontoübersicht({ goTo, openModal, isMobile }) {
  const recentTx = transactions.slice(0, isMobile ? 5 : 7)

  return (
    <div className="page-animate">
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700 }}>Kontoübersicht</div>
        <div style={{ fontSize: 12, color: 'var(--gray-600)', marginTop: 4 }}>
          Letzter Login: Heute, 09:14 Uhr · IP: 192.168.1.xxx
        </div>
      </div>

      {/* Account Cards — 1 col on mobile, 3 on desktop */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
        gap: 12, marginBottom: 20,
      }}>
        {accounts.map(acct => (
          <AccountCard key={acct.id} acct={acct}
            onClick={() => goTo(acct.id === 'giro' ? 'umsätze' : acct.id === 'spar' ? 'sparkonto' : 'depot')}
            onAction={goTo}
          />
        ))}
      </div>

      {/* Stats — 2 col on mobile, 4 on desktop */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)',
        gap: 10, marginBottom: 20,
      }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 8, padding: '12px 14px' }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{s.label}</div>
            <div style={{ fontSize: isMobile ? 16 : 20, fontWeight: 700, marginTop: 4, color: s.cls === 'pos' ? 'var(--green)' : s.cls === 'neg' ? 'var(--red)' : 'var(--gray-900)' }}>{s.value}</div>
            <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 3 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Content — single col on mobile, two col on desktop */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 360px',
        gap: 16,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Transactions */}
          <div style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--gray-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>Letzte Umsätze</span>
              <span onClick={() => goTo('umsätze')} style={{ fontSize: 12, color: 'var(--red)', cursor: 'pointer' }}>Alle →</span>
            </div>
            {recentTx.map(tx => <TransactionItem key={tx.id} tx={tx} />)}
          </div>

          {/* Bar chart */}
          <div style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--gray-100)' }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>Ausgaben nach Kategorien</span>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
                {barData.map(b => (
                  <div key={b.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: '100%', height: b.h, background: b.color, borderRadius: '4px 4px 0 0' }} />
                    <div style={{ fontSize: 9, color: 'var(--gray-500)', whiteSpace: 'nowrap' }}>{b.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Quick Transfer */}
          <div style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--gray-100)' }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>Schnellüberweisung</span>
            </div>
            <div style={{ padding: 14 }}>
              {[
                { label: 'Empfänger', placeholder: 'Name des Empfängers', type: 'text' },
                { label: 'IBAN',      placeholder: 'DE00 0000 0000 0000 0000 00', type: 'text' },
              ].map(f => (
                <div key={f.label} style={{ marginBottom: 10 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 4 }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} style={{ width: '100%', border: '1.5px solid var(--gray-200)', borderRadius: 6, padding: '9px 10px', fontSize: 16, outline: 'none' }} />
                </div>
              ))}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 4 }}>Betrag (€)</label>
                  <input type="number" placeholder="0,00" style={{ width: '100%', border: '1.5px solid var(--gray-200)', borderRadius: 6, padding: '9px 10px', fontSize: 16, outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 4 }}>Datum</label>
                  <input type="date" defaultValue="2026-03-09" style={{ width: '100%', border: '1.5px solid var(--gray-200)', borderRadius: 6, padding: '9px 10px', fontSize: 16, outline: 'none' }} />
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 4 }}>Verwendungszweck</label>
                <input type="text" placeholder="z.B. Rechnung März" style={{ width: '100%', border: '1.5px solid var(--gray-200)', borderRadius: 6, padding: '9px 10px', fontSize: 16, outline: 'none' }} />
              </div>
              <button onClick={openModal} style={{ background: 'var(--red)', color: 'white', border: 'none', borderRadius: 6, padding: '11px', fontSize: 14, fontWeight: 600, cursor: 'pointer', width: '100%' }}>
                ↗ Überweisung ausführen
              </button>
            </div>
          </div>

          {/* Mailbox */}
          <div style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--gray-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>📬 Postfach</span>
              <span onClick={() => goTo('postfach')} style={{ fontSize: 12, color: 'var(--red)', cursor: 'pointer' }}>Alle →</span>
            </div>
            {[
              { subject: 'Kontoauszug Februar 2026',  preview: 'Ihr Kontoauszug steht bereit...', date: '08.03.2026', unread: true  },
              { subject: 'SpardaSecureGo+ aktiviert', preview: 'Ihr Gerät wurde erfolgreich registriert...', date: '06.03.2026', unread: true  },
              { subject: 'Wichtige Mitteilung: VoP',  preview: 'Ab Oktober automatische Empfängerprüfung...', date: '01.03.2026', unread: false },
            ].map((m, i) => (
              <div key={i} onClick={() => goTo('postfach')} style={{
                padding: '11px 14px', borderBottom: '1px solid var(--gray-100)',
                background: m.unread ? 'var(--red-pale)' : 'white', cursor: 'pointer',
                display: 'flex', gap: 10, alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{m.unread ? '📩' : '📧'}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: m.unread ? 700 : 600 }}>{m.subject}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.preview}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 2 }}>{m.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
