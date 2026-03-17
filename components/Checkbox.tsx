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
    <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <span
        style={{
          textDecoration: checked ? 'line-through' : 'none',
          opacity: checked ? 0.6 : 1
        }}
      >
        {label}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        style={{ marginTop: 'calc((1.75em - 1em) / 2)', flexShrink: 0 }}
      />
    </label>
  )
}