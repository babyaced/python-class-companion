export type RunResult = {
  stdout: string
  stderr: string
  error: string | null
}

export type RunnerStatus = 'idle' | 'loading' | 'ready' | 'running' | 'error'

export class PyodideRunner {
  private static instance: PyodideRunner | null = null

  private pyodide: any = null
  private loadPromise: Promise<void> | null = null
  private _status: RunnerStatus = 'idle'
  private listeners: Set<(s: RunnerStatus) => void> = new Set()
  private interruptBuffer: Uint8Array | null = null

  static getInstance(): PyodideRunner {
    if (!PyodideRunner.instance) {
      PyodideRunner.instance = new PyodideRunner()
    }
    return PyodideRunner.instance
  }

  get status(): RunnerStatus {
    return this._status
  }

  private setStatus(s: RunnerStatus) {
    this._status = s
    this.listeners.forEach(cb => cb(s))
  }

  onStatusChange(cb: (s: RunnerStatus) => void): () => void {
    this.listeners.add(cb)
    return () => this.listeners.delete(cb)
  }

  load(): Promise<void> {
    if (this.loadPromise) return this.loadPromise
    this.setStatus('loading')
    this.loadPromise = (async () => {
      try {
        await new Promise<void>((resolve, reject) => {
          if ((window as any).loadPyodide) { resolve(); return }
          const script = document.createElement('script')
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.js'
          script.onload = () => resolve()
          script.onerror = (e) => reject(e)
          document.head.appendChild(script)
        })
        this.pyodide = await (window as any).loadPyodide()

        // Set up interrupt buffer if SharedArrayBuffer is available
        if (typeof SharedArrayBuffer !== 'undefined') {
          this.interruptBuffer = new Uint8Array(new SharedArrayBuffer(1))
          this.pyodide.setInterruptBuffer(this.interruptBuffer)
        }

        this.setStatus('ready')
      } catch (e) {
        console.error('Pyodide failed to load:', e)
        this.loadPromise = null
        this.setStatus('error')
      }
    })()
    return this.loadPromise
  }

  async run(code: string): Promise<RunResult> {
    await this.load()

    if (this._status !== 'ready') {
      return { stdout: '', stderr: '', error: 'Pyodide failed to load.' }
    }

    this.setStatus('running')

    // Reset interrupt buffer
    if (this.interruptBuffer) {
      this.interruptBuffer[0] = 0
    }

    let stdout = ''
    let stderr = ''
    let error: string | null = null

    try {
      // Redirect stdout and stderr
      this.pyodide.runPython(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
      `)

      await this.pyodide.runPythonAsync(code)

      stdout = this.pyodide.runPython('sys.stdout.getvalue()')
      stderr = this.pyodide.runPython('sys.stderr.getvalue()')
    } catch (e: any) {
      try {
        stdout = this.pyodide.runPython('sys.stdout.getvalue()')
        stderr = this.pyodide.runPython('sys.stderr.getvalue()')
      } catch {}
      error = e?.message ?? String(e)
    } finally {
      // Restore stdout/stderr
      try {
        this.pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
        `)
      } catch {}
      this.setStatus('ready')
    }

    return { stdout, stderr, error }
  }

  interrupt(): void {
    if (this.interruptBuffer) {
      this.interruptBuffer[0] = 2 // SIGINT
    }
  }
}
