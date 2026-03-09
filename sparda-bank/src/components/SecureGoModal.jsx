import React, { useState } from 'react'

export default function SecureGoModal({ onClose, onConfirm }) {
  const [code, setCode] = useState('')

  const handleConfirm = () => {
    onClose()
    onConfirm()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: 'white', borderRadius: 14, padding: 36,
        maxWidth: 380, width: '90%', textAlign: 'center',
        boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
      }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>📱</div>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>SpardaSecureGo+ Freigabe</h3>
        <p style={{ fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.6, marginBottom: 16 }}>
          Eine Push-Benachrichtigung wurde an Ihr <strong>iPhone 14 Pro</strong> gesendet.
          Oder geben Sie Ihren 6-stelligen Freigabecode ein:
        </p>
        <input
          type="text" maxLength={6} value={code}
          onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
          placeholder="— — — — — —"
          style={{
            width: '100%', textAlign: 'center', fontSize: 24,
            letterSpacing: 10, fontWeight: 700, padding: '12px 8px',
            border: '2px solid var(--red)', borderRadius: 8, outline: 'none',
            fontFamily: 'monospace', marginBottom: 20,
          }}
        />
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button onClick={handleConfirm} style={{
            background: 'var(--red)', color: 'white', border: 'none',
            borderRadius: 7, padding: '10px 24px', fontSize: 14, fontWeight: 600,
            cursor: 'pointer',
          }}>✓ Bestätigen</button>
          <button onClick={onClose} style={{
            background: 'white', color: 'var(--gray-700)',
            border: '1.5px solid var(--gray-300)',
            borderRadius: 7, padding: '10px 24px', fontSize: 14, fontWeight: 600,
            cursor: 'pointer',
          }}>Abbrechen</button>
        </div>
      </div>
    </div>
  )
}
