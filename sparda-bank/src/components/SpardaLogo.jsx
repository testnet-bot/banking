import React from 'react'

export default function SpardaLogo({ size = 34 }) {
  return (
    <div style={{
      width: size, height: size,
      background: 'var(--red)', borderRadius: 4,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <svg viewBox="0 0 100 100" width={size * 0.65} height={size * 0.65} fill="white">
        <text y="0.9em" fontSize="80" fontFamily="Georgia, serif" fontWeight="bold">S</text>
      </svg>
    </div>
  )
}
