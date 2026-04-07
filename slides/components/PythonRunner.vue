<template>
  <div class="python-runner">
    <textarea
      v-model="code"
      :readonly="readonly"
      rows="8"
      spellcheck="false"
      style="width: 100%; font-family: Menlo, Consolas, 'Courier New', monospace; font-size: 0.9rem; line-height: 1.6; padding: 0.75rem; border-radius: 0.375rem; border: 1px solid #e5e5e5; background: #fafafa; resize: vertical; box-sizing: border-box;"
    />
    <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
      <button @click="handleRun" :disabled="!isReady || isRunning">
        {{ isRunning ? 'Running…' : '▶ Run' }}
      </button>
      <button v-if="isRunning" @click="handleStop">■ Stop</button>
      <span style="font-size: 0.8rem; opacity: 0.5;">
        <template v-if="status === 'loading'">Loading Python…</template>
        <template v-else-if="status === 'ready'">Ready</template>
        <template v-else-if="status === 'running'">Running…</template>
        <template v-else-if="status === 'error'">Failed to load Python</template>
      </span>
    </div>
    <div v-if="result" style="margin-top: 0.75rem; padding: 0.75rem; border-radius: 0.375rem; border: 1px solid #e5e5e5; background: #fafafa; font-family: Menlo, Consolas, 'Courier New', monospace; font-size: 0.9rem; white-space: pre-wrap;">
      <div v-if="result.stdout">{{ result.stdout }}</div>
      <div v-if="result.stderr" style="color: orange;">{{ result.stderr }}</div>
      <div v-if="result.error" style="color: red;">{{ result.error }}</div>
      <div v-if="!result.stdout && !result.stderr && !result.error" style="opacity: 0.4;">No output</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { PyodideRunner, RunResult, RunnerStatus } from '../../lib/pyodide/runner'

const props = withDefaults(defineProps<{
  code?: string
  readonly?: boolean
  autorun?: boolean
}>(), {
  code: '',
  readonly: false,
  autorun: false,
})

const code = ref(props.code)
const status = ref<RunnerStatus>('idle')
const result = ref<RunResult | null>(null)
const runner = PyodideRunner.getInstance()

const isReady = computed(() => status.value === 'ready')
const isRunning = computed(() => status.value === 'running')

let unsubscribe: (() => void) | null = null

onMounted(() => {
  unsubscribe = runner.onStatusChange(s => { status.value = s })
  runner.load()
})

onUnmounted(() => {
  unsubscribe?.()
})

async function handleRun() {
  result.value = await runner.run(code.value)
}

function handleStop() {
  runner.interrupt()
}
</script>
