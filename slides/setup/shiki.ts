import { defineShikiSetup } from '@slidev/types'
import { transformerNotationWordHighlight } from '@shikijs/transformers'

export default defineShikiSetup(() => {
  return {
    themes: {
      dark: 'dark-plus',
      light: 'light-plus',
    },
    transformers: [
      transformerNotationWordHighlight(),
    ],
  }
})
