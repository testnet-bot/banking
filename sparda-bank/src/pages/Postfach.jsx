import React, { useState } from 'react'
import { mails } from '../data/bankData'

export default function Postfach() {
  const [selected, setSelected] = useState(0)
  const [readSet, setReadSet] = useState(new Set())

  const mail = mails[selected]
  const unreadCount = mails.filter((m, i) => m.unread && !readSet.has(i)).length

  const handleSelect = (i) => {
    setSelected(i)
    setReadSet(prev => new Set([...prev, i]))
  }

  return (
    <div className="page-animate">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--gray-900)' }}>Postfach</div>
        <div style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 4 }}>
          {unreadCount} ungelesene {unreadCount === 1 ? 'Nachricht' : 'Nachrichten'}
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '290px 1fr', gap: 16, alignItems: 'start' }}>

        {/* Mail list panel */}
        <div style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--gray-100)', fontSize: 14, fontWeight: 700 }}>
            Nachrichten
          </div>
          {mails.map((m, i) => {
            const isRead = readSet.has(i)
            const isUnread = m.unread && !isRead
            const isSelected = selected === i
            return (
              <div key={i} onClick={() => handleSelect(i)} style={{
                padding: '13px 16px',
                borderBottom: i < mails.length - 1 ? '1px solid var(--gray-100)' : 'none',
                background: isSelected ? 'var(--red-pale)' : isUnread ? '#fff5f5' : 'white',
                borderRight: isSelected ? '3px solid var(--red)' : '3px solid transparent',
                cursor: 'pointer', transition: 'background 0.1s',
              }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'var(--gray-50)' }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = isUnread ? '#fff5f5' : 'white' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
                  <div style={{
                    fontSize: 13, fontWeight: isUnread ? 700 : 600,
                    color: isSelected ? 'var(--red)' : isUnread ? 'var(--red)' : 'var(--gray-900)',
                    flex: 1, lineHeight: 1.3,
                  }}>
                    {m.subject.replace(/^[^\s]+ /, '')}
                  </div>
                  {isUnread && (
                    <div style={{ width: 8, height: 8, background: 'var(--red)', borderRadius: '50%', flexShrink: 0, marginTop: 4 }} />
                  )}
                </div>
                <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.preview}</div>
                <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4 }}>{m.date}</div>
              </div>
            )
          })}
        </div>

        {/* Mail detail panel */}
        <div style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 10, padding: 28 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 6 }}>{mail.subject}</div>
          <div style={{
            fontSize: 12, color: 'var(--gray-500)', marginBottom: 20,
            paddingBottom: 16, borderBottom: '1px solid var(--gray-200)',
          }}>{mail.meta}</div>
          <div
            style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--gray-800)' }}
            dangerouslySetInnerHTML={{ __html: mail.body }}
          />
          <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
            <button style={{
              background: 'white', color: 'var(--gray-700)',
              border: '1.5px solid var(--gray-300)', borderRadius: 7,
              padding: '9px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>⬇ PDF herunterladen</button>
            <button style={{
              background: 'white', color: 'var(--gray-700)',
              border: '1.5px solid var(--gray-300)', borderRadius: 7,
              padding: '9px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>🗑️ Löschen</button>
          </div>
        </div>

      </div>
    </div>
  )
}
