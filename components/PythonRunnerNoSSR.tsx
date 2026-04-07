'use client'

import dynamic from 'next/dynamic'

export const PythonRunner = dynamic(
  () => import('./PythonRunner').then(m => m.PythonRunner),
  { ssr: false }
)
