'use client'

import * as React from 'react'

export function Checkbox({
  id,
  label,
  defaultChecked = false
}: {
  id: string
  label: string
  defaultChecked?: boolean
}) {
  const storageKey = `doc-checkbox:${id}`
  const [checked, setChecked] = React.useState(defaultChecked)

  // Load saved state
  React.useEffect(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved !== null) setChecked(saved === 'true')
  }, [storageKey])

  // Save state
  React.useEffect(() => {
    localStorage.setItem(storageKey, String(checked))
  }, [storageKey, checked])

  return (
    <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <span
        style={{
          textDecoration: checked ? 'line-through' : 'none',
          opacity: checked ? 0.6 : 1
        }}
      >
        {label}
      </span>
    </label>
  )
}