'use client'

import dynamic from 'next/dynamic'

function PythonRunnerSkeleton() {
  return (
    <div className="sp-container sp-skeleton">
      <div className="sp-layout">
        <div className="sp-panel sp-editor-panel">
          <div className="sp-panel-header">
            <span className="sp-tab">main.py</span>
          </div>
          <div className="sp-editor sp-skeleton-body" />
        </div>
        <div className="sp-panel sp-output-panel">
          <div className="sp-panel-header">
            <span className="sp-tab">Output</span>
          </div>
          <div className="sp-output sp-skeleton-body" />
        </div>
      </div>
      <div className="sp-footer">
        <div className="sp-skeleton-btn" />
      </div>
    </div>
  )
}

export const PythonRunner = dynamic(
  () => import('./PythonRunner').then(m => m.PythonRunner),
  { ssr: false, loading: PythonRunnerSkeleton }
)
