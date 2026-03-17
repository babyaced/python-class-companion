'use client'

import * as React from 'react'

export function Checklist({ children }: { children: React.ReactNode }) {
  const items = React.Children.toArray(children)
  return (
    <div style={{ overflow: 'hidden' }}>
      {items.map((child, i) => (
        <div key={i} style={{
          padding: '10px 14px',
          borderTop: i === 0 ? 'none' : '1px solid color-mix(in srgb, currentColor 8%, transparent)',
          borderBottom: i === items.length - 1 ? 'none' : undefined,
        }}>
          {child}
        </div>
      ))}
    </div>
  )
}
