import React from 'react'
import { funds } from '../data/bankData'

const depotStats = [
  { label: 'Depotwert gesamt', value: '38.412,75 €', color: 'var(--gray-900)' },
  { label: 'Einstandswert',    value: '36.600,00 €', color: 'var(--gray-900)' },
  { label: 'Gesamtertrag',     value: '+1.812,75 €', color: 'var(--green)'    },
  { label: 'Performance YTD', value: '+4,95 %',      color: 'var(--green)'    },
]

const allocationData = [
  { label: 'Aktien Welt',   pct: 55.9, color: 'var(--blue)'   },
  { label: 'Aktien Europa', pct: 23.9, color: '#4a90d9'        },
  { label: 'Mischfonds',    pct: 14.2, color: '#6bb8f0'        },
  { label: 'Geldmarkt',     pct: 6.0,  color: 'var(--gray-300)'},
]

export default function Depot() {
  return (
    <div className="page-animate">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--gray-900)' }}>UnionDepot</div>
        <div style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 4 }}>
          Depot-Nr: 4821 0076 00 · Verwahrart: Inlandsverwahrung · Stand: 09.03.2026
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 24 }}>
        {depotStats.map(s => (
          <div key={s.label} style={{
            background: 'white', border: '1px solid var(--gray-200)',
            borderRadius: 8, padding: 16,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Positions card */}
      <div style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--gray-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)' }}>Positionen</span>
          <span style={{ fontSize: 12, color: 'var(--red)', cursor: 'pointer' }}>Sparplan verwalten →</span>
        </div>

        {funds.map((f, i) => (
          <div key={i} style={{
            padding: '14px 20px',
            borderBottom: i < funds.length - 1 ? '1px solid var(--gray-100)' : 'none',
            display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: 14, alignItems: 'center',
            transition: 'background 0.1s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-50)'}
            onMouseLeave={e => e.currentTarget.style.background = ''}
          >
            {/* Fund icon */}
            <div style={{
              width: 38, height: 38, background: 'var(--blue-pale)', borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
            }}>{f.icon}</div>

            {/* Fund name + ISIN */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-900)' }}>{f.name}</div>
              <div style={{ fontSize: 11, color: 'var(--gray-500)', fontFamily: 'monospace' }}>ISIN: {f.isin}</div>
            </div>

            {/* Shares */}
            <div style={{ fontSize: 12, color: 'var(--gray-600)' }}>{f.shares}</div>

            {/* Value + performance */}
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)' }}>{f.value}</div>
              <div style={{ fontSize: 12, fontWeight: 600, marginTop: 2, color: f.up ? 'var(--green)' : 'var(--red)' }}>
                {f.up ? '▲' : '▼'} {f.perf}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Asset allocation card */}
      <div style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--gray-100)' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)' }}>Asset-Allokation</span>
        </div>

        {/* Stacked bar */}
        <div style={{ margin: '20px 20px 0' }}>
          <div style={{ height: 8, background: 'var(--gray-200)', borderRadius: 4, overflow: 'hidden', display: 'flex' }}>
            {allocationData.map((seg, i) => (
              <div key={i} style={{
                width: `${seg.pct}%`, height: '100%',
                background: seg.color,
                borderRadius: i === 0 ? '4px 0 0 4px' : i === allocationData.length - 1 ? '0 4px 4px 0' : 0,
              }} />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 20, padding: '12px 20px', flexWrap: 'wrap' }}>
          {allocationData.map(seg => (
            <div key={seg.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--gray-700)' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: seg.color }} />
              {seg.label} <strong>{seg.pct}%</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
