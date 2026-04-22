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

  const isRunning = status === 'running'

  return (
    <div className="sp-container">
      <div className="sp-layout">
        <div className="sp-panel sp-editor-panel">
          <div className="sp-panel-header">
            <span className="sp-tab">main.py</span>
          </div>
          <textarea
            className="sp-editor"
            value={code}
            onChange={e => setCode(e.target.value)}
            readOnly={readonly}
            spellCheck={false}
          />
        </div>
        <div className="sp-panel sp-output-panel">
          <div className="sp-panel-header">
            <span className="sp-tab">Output</span>
          </div>
          <div className="sp-output">
            {result ? (
              <>
                {result.stdout && <div>{result.stdout}</div>}
                {result.stderr && <div className="sp-stderr">{result.stderr}</div>}
                {result.error && <div className="sp-error">{result.error}</div>}
                {!result.stdout && !result.stderr && !result.error && (
                  <div className="sp-placeholder">No output</div>
                )}
              </>
            ) : (
              <div className="sp-placeholder">Run your code to see output</div>
            )}
          </div>
        </div>
      </div>
      <div className="sp-footer">
        <button
          className="sp-run-btn"
          onClick={isRunning ? handleStop : handleRun}
          disabled={status === 'loading' || status === 'error'}
        >
          {isRunning ? '■ Stop' : '▶ Run'}
        </button>
        <span className="sp-status">
          {status === 'loading' && 'Loading Python…'}
          {status === 'running' && 'Running…'}
          {status === 'error' && 'Failed to load Python'}
        </span>
      </div>
    </div>
  )
}
