<template>
  <div ref="wrapper" class="fit-code-wrapper">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue'

const wrapper = ref<HTMLElement | null>(null)

function fit() {
  const el = wrapper.value
  if (!el) return

  const container = el.parentElement
  if (!container) return

  const code = el.querySelector('code')
  if (!code) return

  // Reset font size before measuring
  code.style.fontSize = ''

  const availableHeight = container.clientHeight
  const availableWidth = container.clientWidth

  let size = 18
  code.style.fontSize = `${size}px`

  while (size > 8) {
    if (code.scrollHeight <= availableHeight && code.scrollWidth <= availableWidth) break
    size -= 0.5
    code.style.fontSize = `${size}px`
  }
}

onMounted(fit)
onUpdated(fit)
</script>

<style>
.fit-code-wrapper {
  width: 100%;
  height: 100%;
}
</style>
