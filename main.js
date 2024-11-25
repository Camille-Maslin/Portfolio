import './src/styles/main.scss'
import { initTheme } from './src/scripts/modules/theme.js'
import { initScroll } from './src/scripts/modules/scroll.js'
import { initNavigation } from './src/scripts/modules/navigation.js'
import { initLanguage } from './src/scripts/modules/language.js'

document.addEventListener('DOMContentLoaded', () => {
  initTheme()
  initScroll()
  initNavigation()
  initLanguage()
})
