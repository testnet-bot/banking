import React, { useState } from 'react'
import { transactions } from '../data/bankData'
import TransactionItem from '../components/TransactionItem'

const FILTERS = ['Alle', 'Einnahmen', 'Ausgaben', 'Überweisungen', 'Daueraufträge', 'Lastschriften']

export default function Umsätze() {
  const [activeFilter, setActiveFilter] = useState('Alle')
  const [search, setSearch] = useState('')
  const [sortDesc, setSortDesc] = useState(true)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const filtered = transactions.filter(tx => {
    if (activeFilter === 'Einnahmen'    && tx.type !== 'income')   return false
    if (activeFilter === 'Ausgaben'     && tx.type !== 'expense')  return false
    if (activeFilter === 'Überweisungen'&& tx.type !== 'transfer') return false
    if (activeFilter === 'Daueraufträge'&& !tx.name.includes('Dauerauftrag') && !tx.name.includes('Umbuchung') && tx.type !== 'transfer') return false
    if (activeFilter === 'Lastschriften'&& tx.type !== 'expense')  return false
    const q = search.toLowerCase()
    if (q && !tx.name.toLowerCase().includes(q) && !tx.amount.includes(q) && !tx.detail.toLowerCase().includes(q)) return false
    return true
  })

  const months = [...new Set(filtered.map(t => t.month))]

  // Summary stats
  const totalIn  = transactions.filter(t=>t.type==='income').reduce((s,t)=>s+parseFloat(t.amount.replace(/[^0-9,]/g,'').replace(',','.')),0)
  const totalOut = transactions.filter(t=>t.type!=='income').reduce((s,t)=>s+parseFloat(t.amount.replace(/[^0-9,]/g,'').replace(',','.')),0)

  return (
    <div className="page-animate">
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--gray-900)' }}>Umsätze · Girokonto</div>
        <div style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 4 }}>
          DE89 7009 0500 0012 3456 78 · SpardaGiro Klassik
        </div>
      </div>

      {/* Summary mini-stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Einnahmen (gesamt)',  value: `+${totalIn.toFixed(2).replace('.',',')} €`,  color: 'var(--green)' },
          { label: 'Ausgaben (gesamt)',   value: `-${totalOut.toFixed(2).replace('.',',')} €`, color: 'var(--red)'   },
          { label: 'Transaktionen',       value: `${transactions.length} Einträge`,             color: 'var(--gray-900)' },
        ].map(s => (
          <div key={s.label} style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 8, padding: '12px 16px' }}>
            <div style={{ fontSize: 11, color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{s.label}</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: s.color, marginTop: 3 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)} style={{
            border: `1.5px solid ${activeFilter === f ? 'var(--red)' : 'var(--gray-300)'}`,
            borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600,
            color: activeFilter === f ? 'white' : 'var(--gray-600)',
            background: activeFilter === f ? 'var(--red)' : 'white',
            cursor: 'pointer', transition: 'all 0.15s',
          }}>{f}</button>
        ))}
      </div>

      {/* Search + date range */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍  Empfänger, Betrag oder Verwendungszweck..."
          style={{ flex: 1, minWidth: 200, border: '1.5px solid var(--gray-200)', borderRadius: 20, padding: '7px 14px', fontSize: 13, outline: 'none' }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--gray-600)' }}>
          <span>Von</span>
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} style={{ border: '1.5px solid var(--gray-200)', borderRadius: 6, padding: '6px 10px', fontSize: 12, outline: 'none' }} />
          <span>bis</span>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} style={{ border: '1.5px solid var(--gray-200)', borderRadius: 6, padding: '6px 10px', fontSize: 12, outline: 'none' }} />
        </div>
        <button onClick={() => { setSearch(''); setDateFrom(''); setDateTo(''); setActiveFilter('Alle') }} style={{ border: '1px solid var(--gray-300)', borderRadius: 6, padding: '7px 14px', fontSize: 12, color: 'var(--gray-600)', background: 'white', cursor: 'pointer' }}>
          ✕ Reset
        </button>
      </div>

      {/* Grouped results */}
      {months.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--gray-400)' }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🔍</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Keine Umsätze gefunden</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>Versuchen Sie einen anderen Suchbegriff oder Filter</div>
        </div>
      ) : months.map(month => {
        const monthTxs = filtered.filter(t => t.month === month)
        const monthIn  = monthTxs.filter(t=>t.type==='income').reduce((s,t)=>s+parseFloat(t.amount.replace(/[^0-9,]/g,'').replace(',','.')),0)
        return (
          <div key={month} style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 8, borderBottom: '1px solid var(--gray-200)', marginBottom: 4 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{month}</div>
              <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>
                {monthTxs.length} Buchungen
                {monthIn > 0 && <span style={{ color: 'var(--green)', marginLeft: 8 }}>+{monthIn.toFixed(2).replace('.',',')} €</span>}
              </div>
            </div>
            <div style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 8, overflow: 'hidden' }}>
              {monthTxs.map(tx => <TransactionItem key={tx.id} tx={tx} />)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
