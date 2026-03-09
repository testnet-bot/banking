import React, { useState } from 'react'
import { dauerauftraege } from '../data/bankData'

export default function Dauerauftrag() {
  const [items, setItems] = useState(dauerauftraege)

  return (
    <div className="page-animate">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--gray-900)' }}>Daueraufträge</div>
        <div style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 4 }}>
          {items.length} aktive Daueraufträge · Nächste Ausführung: 15.03.2026
        </div>
      </div>

      {/* New button */}
      <div style={{ marginBottom: 20 }}>
        <button style={{
          background: 'var(--red)', color: 'white', border: 'none',
          borderRadius: 7, padding: '9px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          + Neuer Dauerauftrag
        </button>
      </div>

      {/* Standing order items */}
      {items.map(da => (
        <div key={da.id} style={{
          background: 'white', border: '1px solid var(--gray-200)', borderRadius: 8,
          padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16,
          marginBottom: 10, transition: 'box-shadow 0.15s',
        }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
        >
          {/* Icon */}
          <div style={{
            width: 42, height: 42, borderRadius: 8, background: da.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, flexShrink: 0,
          }}>{da.icon}</div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)' }}>{da.name}</div>
            <div style={{ fontSize: 12, color: 'var(--gray-500)', fontFamily: 'monospace', marginTop: 1 }}>{da.iban}</div>
            <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 2 }}>{da.schedule}</div>
          </div>

          {/* Amount + status */}
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--red)' }}>{da.amount}</div>
            <span style={{
              display: 'inline-block', marginTop: 4,
              background: 'var(--green-pale)', color: 'var(--green)',
              borderRadius: 10, fontSize: 11, fontWeight: 600, padding: '1px 8px',
            }}>Aktiv</span>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            {[
              { icon: '✏️', title: 'Bearbeiten' },
              { icon: '🗑️', title: 'Löschen', danger: true },
            ].map(btn => (
              <button key={btn.icon} title={btn.title} style={{
                border: '1px solid var(--gray-300)', background: 'white',
                borderRadius: 5, padding: '5px 10px', fontSize: 13, cursor: 'pointer',
                transition: 'all 0.15s',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = btn.danger ? 'var(--red)' : 'var(--gray-500)'
                  e.currentTarget.style.color = btn.danger ? 'var(--red)' : 'inherit'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--gray-300)'
                  e.currentTarget.style.color = 'inherit'
                }}
              >{btn.icon}</button>
            ))}
          </div>
        </div>
      ))}

      {/* Summary footer */}
      <div style={{
        background: 'white', border: '1px solid var(--gray-200)', borderRadius: 8,
        padding: '14px 20px', marginTop: 8,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: 13, color: 'var(--gray-600)' }}>Gesamt monatliche Belastung</span>
        <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--red)' }}>−1.576,95 €</span>
      </div>
    </div>
  )
}
