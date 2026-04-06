<template>
  <div class="slidev-layout fit-code-layout" ref="container">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUpdated, nextTick } from 'vue'

const container = ref<HTMLElement | null>(null)

function fit() {
  const el = container.value
  if (!el) return

  const code = el.querySelector('code')
  if (!code) return

  code.style.fontSize = ''

  // Start large and shrink until the whole slide no longer overflows
  let size = 36
  code.style.fontSize = `${size}px`

  while (size > 8) {
    if (el.scrollHeight <= el.clientHeight && el.scrollWidth <= el.clientWidth) break
    size -= 0.5
    code.style.fontSize = `${size}px`
  }
}

onMounted(() => nextTick(fit))
onUpdated(() => nextTick(fit))
</script>

<style>
.fit-code-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 0.5rem 1.5rem;
  box-sizing: border-box;
}

.fit-code-layout .slidev-code {
  flex: 1;
  min-height: 0;
}
</style>
