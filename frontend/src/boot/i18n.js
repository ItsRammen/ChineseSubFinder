import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'

// Default language - you can change this or read from localStorage/settings
// Let's start with Chinese as default for now, will add switcher later
const defaultLocale = 'zh-CN'

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: 'en-US', // Fallback language
  messages,
  legacy: false // Important for Vue 3 Composition API
})

export default ({ app }) => {
  // Set i18n instance on app
  app.use(i18n)
}

export { i18n } // Export for use in components if needed 