import { defineConfig } from 'vite'
import { transformerNotationWordHighlight } from '@shikijs/transformers'

export default defineConfig({
  slidev: {
    shiki: {
      transformers: [
        transformerNotationWordHighlight(),
      ],
    },
  },
})
