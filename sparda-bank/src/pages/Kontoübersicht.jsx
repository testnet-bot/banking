import React from 'react'
import { accounts, transactions } from '../data/bankData'
import TransactionItem from '../components/TransactionItem'

const cardStyle = {
  giro:  'linear-gradient(135deg, #C8102E, #8b0b20)',
  spar:  'linear-gradient(135deg, #1a6eb5, #0f4d82)',
  depot: 'linear-gradient(135deg, #2d7d46, #1b4d2b)',
}

function AccountCard({ acct, onClick, onAction }) {
  return (
    <div onClick={onClick} style={{
      background: cardStyle[acct.id], color: 'white',
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
      <div style={{ display: 'flex', gap: 8, marginTop: 14 }} onClick={e => e.stopPropagation()}>
        {acct.id === 'giro' && <>
          <button onClick={() => onAction('überweisung')} style={btnStyle}>Überweisen</button>
          <button onClick={() => onAction('umsätze')} style={btnStyle}>Umsätze</button>
        </>}
        {acct.id === 'spar' && <button onClick={() => onAction('sparkonto')} style={btnStyle}>Details</button>}
        {acct.id === 'depot' && <button onClick={() => onAction('depot')} style={btnStyle}>Depot ansehen</button>}
      </div>
    </div>
  )
}

const btnStyle = {
  background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)',
  color: 'white', borderRadius: 5, padding: '5px 10px', fontSize: 11,
  cursor: 'pointer', fontFamily: 'Source Sans 3, sans-serif',
}

const stats = [
  { label: 'Einnahmen (März)',   value: '+3.400,00 €',  cls: 'pos', sub: 'Gehalt + Zinsen' },
  { label: 'Ausgaben (März)',    value: '-1.847,22 €',  cls: 'neg', sub: 'inkl. Daueraufträge' },
  { label: 'Gesamt Guthaben',   value: '56.500,68 €',  cls: '',    sub: 'Alle Konten' },
  { label: 'Daueraufträge',     value: '4 aktiv',       cls: '',    sub: 'Nächste am 15.03.' },
]

const barData = [
  { label: 'Wohnen',      h: 65, color: 'var(--red)'     },
  { label: 'Lebensm.',    h: 32, color: 'var(--gray-400)' },
  { label: 'Transport',   h: 20, color: 'var(--blue)'     },
  { label: 'Freizeit',    h: 15, color: 'var(--green)'    },
  { label: 'Medien',      h: 12, color: '#f59e0b'         },
  { label: 'Sonstiges',   h: 18, color: '#8b5cf6'         },
]

export default function Kontoübersicht({ goTo, openModal }) {
  const recentTx = transactions.slice(0, 7)

  return (
    <div className="page-animate">
      {/* ...rest of your JSX content... */}
    </div>
  )
}
