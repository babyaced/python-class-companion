'use client'

import { useEffect, useRef, useState } from 'react'
import { PyodideRunner, RunResult, RunnerStatus } from '@/lib/pyodide/runner'

interface Props {
  code?: string
  readonly?: boolean
  autorun?: boolean
}

export function PythonRunner({ code: initialCode = '', readonly = false, autorun = false }: Props) {
  const [code, setCode] = useState(initialCode)
  const [status, setStatus] = useState<RunnerStatus>('idle')
  const [result, setResult] = useState<RunResult | null>(null)
  const runner = useRef(PyodideRunner.getInstance())

  useEffect(() => {
    const unsubscribe = runner.current.onStatusChange(setStatus)
    runner.current.load()
    return unsubscribe
  }, [])

  useEffect(() => {
    if (autorun && status === 'ready') {
      handleRun()
    }
  }, [status, autorun])

  async function handleRun() {
    const res = await runner.current.run(code)
    setResult(res)
  }

  function handleStop() {
    runner.current.interrupt()
  }

  const isLoading = status === 'loading'
  const isRunning = status === 'running'
  const isReady = status === 'ready'

  return (
    <div className="python-runner">
      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        readOnly={readonly}
        rows={8}
        spellCheck={false}
        style={{
          width: '100%',
          fontFamily: 'Menlo, Consolas, "Courier New", monospace',
          fontSize: '0.9rem',
          lineHeight: 1.6,
          padding: '0.75rem',
          borderRadius: '0.375rem',
          border: '1px solid var(--x-color-neutral-200, #e5e5e5)',
          background: 'var(--x-color-neutral-100, #f5f5f5)',
          color: 'inherit',
          resize: 'vertical',
          boxSizing: 'border-box',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
        <button
          onClick={handleRun}
          disabled={!isReady || isRunning}
          style={{ cursor: isReady ? 'pointer' : 'not-allowed' }}
        >
          {isRunning ? 'Running…' : '▶ Run'}
        </button>
        {isRunning && (
          <button onClick={handleStop}>■ Stop</button>
        )}
        <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>
          {status === 'idle' && ''}
          {status === 'loading' && 'Loading Python…'}
          {status === 'ready' && 'Ready'}
          {status === 'running' && 'Running…'}
          {status === 'error' && 'Failed to load Python'}
        </span>
      </div>
      {result && (
        <div style={{
          marginTop: '0.75rem',
          padding: '0.75rem',
          borderRadius: '0.375rem',
          border: '1px solid var(--x-color-neutral-200, #e5e5e5)',
          background: 'var(--x-color-neutral-100, #f5f5f5)',
          color: 'inherit',
          fontFamily: 'Menlo, Consolas, "Courier New", monospace',
          fontSize: '0.9rem',
          whiteSpace: 'pre-wrap',
        }}>
          {result.stdout && <div>{result.stdout}</div>}
          {result.stderr && <div style={{ color: 'orange' }}>{result.stderr}</div>}
          {result.error && <div style={{ color: 'red' }}>{result.error}</div>}
          {!result.stdout && !result.stderr && !result.error && (
            <div style={{ opacity: 0.4 }}>No output</div>
          )}
        </div>
      )}
    </div>
  )
}
