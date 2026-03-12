'use client'

import * as React from 'react'

const definitions: Record<string, string> = {
  keyword: 'A word reserved by a programming language with special meaning that cannot be used as an identifier.',
  identifier: 'A name used to identify a variable, function, class, or other user-defined item.',
  variable: 'A named storage location in a program that holds a value.',
  function: 'A reusable block of code that performs a specific task.',
  class: 'A blueprint for creating objects in object-oriented programming.',
  object: 'An instance of a class that contains data and can perform actions defined by its methods.',
  instance: 'A specific object created from a class.',
  attribute: 'A variable that belongs to an object or class.',
  method: 'A function that belongs to an object or class.',
  mutable: 'An object that can be changed after it is created (e.g. lists, dictionaries).',
  immutable: 'An object that cannot be changed after it is created (e.g. strings, tuples, integers).',
  syntax: 'The set of rules that define how code must be written in a programming language.',
  semantics: 'The meaning of the code — what it actually does when executed.',
}

export function GlossaryTerm({ children, term }: { children: string; term?: string }) {
  const id = (term ?? children).toLowerCase().replace(/\s+/g, '-')
  const definition = definitions[id]
  const displayName = id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' ')
  const [visible, setVisible] = React.useState(false)
  const hideTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    setVisible(true)
  }

  const hide = () => {
    hideTimer.current = setTimeout(() => setVisible(false), 80)
  }

  return (
    <span style={{ position: 'relative', display: 'inline' }} onMouseEnter={show} onMouseLeave={hide}>
      <a
        href={`/en/Reference/Glossary#${id}`}
        style={{
          color: 'inherit',
          textDecoration: 'underline dotted',
          textDecorationColor: 'currentColor',
          textDecorationThickness: '1px',
          textUnderlineOffset: '3px',
          opacity: 0.85,
          cursor: 'help',
        }}
      >
        {children}
      </a>
      {visible && definition && (
        <span
          className="glossary-tooltip"
          onMouseEnter={show}
          onMouseLeave={hide}
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '240px',
            borderRadius: '6px',
            padding: '8px 12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
            zIndex: 50,
            fontSize: '0.8em',
            lineHeight: '1.5',
            pointerEvents: 'auto',
          }}
        >
          <span style={{ display: 'block', fontWeight: 600, marginBottom: '3px', opacity: 0.6, fontSize: '0.85em', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {displayName}
          </span>
          <span>{definition}</span>
        </span>
      )}
    </span>
  )
}
