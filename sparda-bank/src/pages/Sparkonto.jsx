import React, { useState } from 'react'

const sparTransactions = [
  { icon: '💸', type: 'income',   name: 'Zinsgutschrift',           detail: '2,5 % p.a. · März 2026',   amount: '+31,75 €',  date: '31.03.2026', future: true  },
  { icon: '💸', type: 'income',   name: 'Zinsgutschrift',           detail: '2,5 % p.a. · Feb 2026',    amount: '+31,75 €',  date: '28.02.2026' },
  { icon: '💸', type: 'income',   name: 'Zinsgutschrift',           detail: '2,5 % p.a. · Jan 2026',    amount: '+29,88 €',  date: '31.01.2026' },
  { icon: '🔁', type: 'transfer', name: 'Einzahlung vom Girokonto', detail: 'Sparrate März 2026',        amount: '+500,00 €', date: '01.03.2026' },
  { icon: '🔁', type: 'transfer', name: 'Einzahlung vom Girokonto', detail: 'Sparrate Februar 2026',    amount: '+500,00 €', date: '01.02.2026' },
  { icon: '🔁', type: 'transfer', name: 'Einzahlung vom Girokonto', detail: 'Sparrate Januar 2026',     amount: '+500,00 €', date: '01.01.2026' },
]

const konditionen = [
  { key: 'Zinssatz',           value: '2,50 % p.a.', highlight: true },
  { key: 'Zinsmethode',        value: 'Monatliche Gutschrift' },
  { key: 'Kündigungsfrist',    value: '3 Monate' },
  { key: 'Mindesteinlage',     value: '0,00 €' },
  { key: 'Max. Einlage',       value: '100.000,00 €' },
  { key: 'Einlagensicherung',  value: '100.000 € (gesetzl.)' },
  { key: 'Konto eröffnet',     value: '12.04.2019' },
]

export default function Sparkonto() {
  const [showCalculator, setShowCalculator] = useState(false)
  const [calcAmount, setCalcAmount] = useState('1000')
  const [calcYears, setCalcYears] = useState('5')

  const interest = (parseFloat(calcAmount) || 0) * 0.025 * (parseFloat(calcYears) || 1)
  const total = (parseFloat(calcAmount) || 0) + interest

  return (
    <div className="page-animate">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 700 }}>SpardaSpar Flex</div>
        <div style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 4 }}>DE89 7009 0500 0012 3456 90 · BIC: GENODEF1S04</div>
      </div>

      {/* Balance hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1a6eb5, #0f4d82)',
        borderRadius: 10, padding: '28px 32px', color: 'white',
        marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -30, top: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 12, opacity: 0.75, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Aktuelles Guthaben</div>
          <div style={{ fontSize: 40, fontWeight: 700, margin: '6px 0' }}>15.240,00 €</div>
          <div style={{ opacity: 0.7, fontSize: 13 }}>
            Zinsgutschrift: zuletzt 28.02.2026 · <strong>+31,75 €</strong> · Nächste: 31.03.2026
          </div>
        </div>
        <div style={{ textAlign: 'center', flexShrink: 0, position: 'relative' }}>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '14px 22px' }}>
            <div style={{ fontSize: 32, fontWeight: 700 }}>2,50 %</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>p.a. · variabel</div>
          </div>
          <div style={{ fontSize: 11, opacity: 0.6, marginTop: 8 }}>Stand: 09.03.2026</div>
        </div>
      </div>

      {/* Content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        {/* Left: Transactions */}
        <div>
          <div style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--gray-100)', fontSize: 14, fontWeight: 700 }}>Umsätze</div>
            {sparTransactions.map((tx, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '12px 20px', borderBottom: i < sparTransactions.length - 1 ? '1px solid var(--gray-100)' : 'none',
                background: tx.future ? 'var(--blue-pale)' : 'white',
                transition: 'background 0.1s',
              }}
                onMouseEnter={e => { if (!tx.future) e.currentTarget.style.background = 'var(--gray-50)' }}
                onMouseLeave={e => { if (!tx.future) e.currentTarget.style.background = 'white' }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: tx.type === 'income' ? 'var(--green-pale)' : 'var(--blue-pale)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0,
                }}>{tx.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {tx.name}
                    {tx.future && <span style={{ fontSize: 10, background: 'var(--blue)', color: 'white', borderRadius: 4, padding: '1px 5px' }}>Geplant</span>}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 1 }}>{tx.detail}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green)' }}>{tx.amount}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 1 }}>{tx.date}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Zinsrechner */}
          <div style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--gray-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>🧮 Zinsrechner</span>
              <button onClick={() => setShowCalculator(!showCalculator)} style={{ fontSize: 12, color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                {showCalculator ? 'Schließen' : 'Öffnen'}
              </button>
            </div>
            {showCalculator && (
              <div style={{ padding: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', display: 'block', marginBottom: 4 }}>Betrag (€)</label>
                    <input type="number" value={calcAmount} onChange={e => setCalcAmount(e.target.value)}
                      style={{ width: '100%', border: '1.5px solid var(--gray-200)', borderRadius: 6, padding: '8px 10px', fontSize: 13, outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', display: 'block', marginBottom: 4 }}>Laufzeit (Jahre)</label>
                    <input type="number" value={calcYears} onChange={e => setCalcYears(e.target.value)} min="1" max="30"
                      style={{ width: '100%', border: '1.5px solid var(--gray-200)', borderRadius: 6, padding: '8px 10px', fontSize: 13, outline: 'none' }} />
                  </div>
                </div>
                <div style={{ background: 'var(--green-pale)', borderRadius: 8, padding: 14, fontSize: 13 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ color: 'var(--gray-600)' }}>Zinsen (2,5 % p.a.)</span>
                    <strong style={{ color: 'var(--green)' }}>+{interest.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--gray-600)' }}>Gesamtguthaben</span>
                    <strong>{total.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Konditionen + actions */}
        <div>
          <div style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 10, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Konditionen</div>
            {konditionen.map(k => (
              <div key={k.key} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--gray-50)' }}>
                <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>{k.key}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: k.highlight ? 'var(--green)' : 'var(--gray-900)' }}>{k.value}</span>
              </div>
            ))}
          </div>

          <div style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 10, padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Aktionen</div>
            <button style={{ width: '100%', background: 'var(--blue)', color: 'white', border: 'none', borderRadius: 7, padding: '10px', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 8 }}>
              + Geld einzahlen
            </button>
            <button style={{ width: '100%', background: 'white', color: 'var(--gray-700)', border: '1.5px solid var(--gray-300)', borderRadius: 7, padding: '10px', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 8 }}>
              − Geld auszahlen
            </button>
            <button style={{ width: '100%', background: 'white', color: 'var(--gray-700)', border: '1.5px solid var(--gray-300)', borderRadius: 7, padding: '10px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              📄 Kontoauszug
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
