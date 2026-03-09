import React from 'react'

const iconBg = { income: 'var(--green-pale)', expense: '#fef2f2', transfer: 'var(--blue-pale)' }

export default function TransactionItem({ tx }) {
  const isPositive = tx.amount.startsWith('+')
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '12px 20px', borderBottom: '1px solid var(--gray-100)',
      transition: 'background 0.1s',
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-50)'}
      onMouseLeave={e => e.currentTarget.style.background = ''}
    >
      <div style={{
        width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
        background: iconBg[tx.type] || 'var(--gray-100)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
      }}>
        {tx.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.name}</div>
        <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 1 }}>{tx.detail}</div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: isPositive ? 'var(--green)' : 'var(--gray-900)' }}>{tx.amount}</div>
        <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 1 }}>{tx.date}</div>
      </div>
    </div>
  )
}
