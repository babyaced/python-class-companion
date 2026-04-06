import { defineAppSetup } from '@slidev/types'
import PhosphorIcons from '@phosphor-icons/vue'

export default defineAppSetup(({ app }) => {
  app.use(PhosphorIcons)
})
