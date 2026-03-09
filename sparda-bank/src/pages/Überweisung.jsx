import React, { useState } from 'react'

const FAVORITES = [
  { name: 'Hausverwaltung München GmbH', iban: 'DE12 7009 0500 9988 7766 55', bic: 'GENODEF1M01' },
  { name: 'Anna Müller', iban: 'DE45 2004 1155 0123 4567 89', bic: 'COBADEFFXXX' },
  { name: 'Max Mustermann', iban: 'DE89 3704 0044 0532 0130 00', bic: 'COBADEFFXXX' },
]

export default function Überweisung({ openModal }) {
  const [form, setForm] = useState({ name: '', iban: '', bic: '', betrag: '', datum: '2026-03-09', zweck: '' })
  const [errors, setErrors] = useState({})
  const [showFavs, setShowFavs] = useState(false)

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name)   e.name   = 'Bitte geben Sie einen Empfängernamen ein'
    if (!form.iban)   e.iban   = 'Bitte geben Sie eine gültige IBAN ein'
    if (!form.betrag || parseFloat(form.betrag) <= 0) e.betrag = 'Bitte geben Sie einen Betrag über 0,00 € ein'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => { if (validate()) openModal() }

  const fillFavorite = fav => {
    setForm(p => ({ ...p, name: fav.name, iban: fav.iban, bic: fav.bic }))
    setShowFavs(false)
  }

  const fieldStyle = (key) => ({
    width: '100%', border: `1.5px solid ${errors[key] ? 'var(--red)' : 'var(--gray-200)'}`,
    borderRadius: 6, padding: '9px 12px', fontSize: 13, outline: 'none',
    fontFamily: 'Source Sans 3, sans-serif', transition: 'border-color 0.15s',
  })

  return (
    <div className="page-animate">
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--gray-900)' }}>SEPA-Überweisung</div>
        <div style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 4 }}>Überweisungen werden mit SpardaSecureGo+ freigegeben</div>
      </div>

      <div style={{ maxWidth: 640 }}>
        {/* SecureGo note */}
        <div style={{ background: 'var(--blue-pale)', border: '1px solid #bee3f8', borderRadius: 8, padding: '14px 16px', display: 'flex', gap: 12, marginBottom: 20, fontSize: 13, color: 'var(--blue)' }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>🔒</span>
          <div>
            <strong style={{ display: 'block', marginBottom: 3 }}>SpardaSecureGo+ Freigabe erforderlich</strong>
            Jede Überweisung wird über die SpardaSecureGo+ App auf Ihrem iPhone 14 Pro bestätigt.
            Sie erhalten nach dem Abschicken eine Push-Benachrichtigung.
          </div>
        </div>

        {/* Auftraggeberkonto */}
        <div style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 10, padding: 24, marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 14 }}>Auftraggeber</div>
          <select style={{ width: '100%', border: '1.5px solid var(--gray-200)', borderRadius: 6, padding: '9px 12px', fontSize: 13, outline: 'none', background: 'white' }}>
            <option>SpardaGiro Klassik · DE89 7009 0500 0012 3456 78 · Saldo: 2.847,93 €</option>
          </select>
        </div>

        {/* Empfänger */}
        <div style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 10, padding: 24, marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Empfänger</div>
            <button onClick={() => setShowFavs(!showFavs)} style={{ fontSize: 12, color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
              ⭐ Vorlagen
            </button>
          </div>

          {showFavs && (
            <div style={{ background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: 8, padding: 12, marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-500)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Gespeicherte Empfänger</div>
              {FAVORITES.map((fav, i) => (
                <div key={i} onClick={() => fillFavorite(fav)} style={{ padding: '8px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 13, transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'white'}
                  onMouseLeave={e => e.currentTarget.style.background = ''}
                >
                  <div style={{ fontWeight: 600 }}>{fav.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', fontFamily: 'monospace' }}>{fav.iban}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'grid', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 5 }}>Name des Empfängers *</label>
              <input value={form.name} onChange={set('name')} placeholder="Vor- und Nachname / Firmenname" style={fieldStyle('name')} />
              {errors.name && <div style={{ fontSize: 11, color: 'var(--red)', marginTop: 3 }}>⚠ {errors.name}</div>}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 5 }}>IBAN *</label>
              <input value={form.iban} onChange={set('iban')} placeholder="DE00 0000 0000 0000 0000 00" style={{ ...fieldStyle('iban'), fontFamily: 'monospace', fontSize: 14, letterSpacing: 1 }} />
              {errors.iban && <div style={{ fontSize: 11, color: 'var(--red)', marginTop: 3 }}>⚠ {errors.iban}</div>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 5 }}>BIC (optional)</label>
                <input value={form.bic} onChange={set('bic')} placeholder="z.B. SSKMDEMMXXX" style={fieldStyle('bic')} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 5 }}>Bank</label>
                <input readOnly placeholder="Wird auto. ermittelt" style={{ ...fieldStyle(''), background: 'var(--gray-50)', color: 'var(--gray-500)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Auftragsdetails */}
        <div style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 10, padding: 24, marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 14 }}>Auftragsdetails</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 5 }}>Betrag (EUR) *</label>
              <input type="number" value={form.betrag} onChange={set('betrag')} placeholder="0,00" step="0.01" min="0.01" style={fieldStyle('betrag')} />
              {errors.betrag && <div style={{ fontSize: 11, color: 'var(--red)', marginTop: 3 }}>⚠ {errors.betrag}</div>}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 5 }}>Ausführungsdatum</label>
              <input type="date" value={form.datum} onChange={set('datum')} min="2026-03-09" style={fieldStyle('')} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 5 }}>Verwendungszweck</label>
            <textarea value={form.zweck} onChange={set('zweck')} placeholder="z.B. Rechnung Nr. 2024-001 (max. 140 Zeichen)"
              maxLength={140} rows={3}
              style={{ width: '100%', border: '1.5px solid var(--gray-200)', borderRadius: 6, padding: '9px 12px', fontSize: 13, outline: 'none', resize: 'vertical', fontFamily: 'Source Sans 3, sans-serif' }}
            />
            <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 3, textAlign: 'right' }}>{form.zweck.length}/140 Zeichen</div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={handleSubmit} style={{ background: 'var(--red)', color: 'white', border: 'none', borderRadius: 7, padding: '11px 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            ✓ Weiter zur Freigabe
          </button>
          <button onClick={() => setForm({ name: '', iban: '', bic: '', betrag: '', datum: '2026-03-09', zweck: '' })} style={{ background: 'white', color: 'var(--gray-700)', border: '1.5px solid var(--gray-300)', borderRadius: 7, padding: '11px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Zurücksetzen
          </button>
          <button style={{ background: 'white', color: 'var(--gray-700)', border: '1.5px solid var(--gray-300)', borderRadius: 7, padding: '11px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Als Vorlage speichern
          </button>
        </div>
      </div>
    </div>
  )
}
