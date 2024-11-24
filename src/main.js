import './styles/main.scss'
import { initTheme } from './scripts/modules/theme.js'
import { initScroll } from './scripts/modules/scroll.js'
import { initNavigation } from './scripts/modules/navigation.js'
import { initLanguage } from './scripts/modules/language.js'

document.addEventListener('DOMContentLoaded', () => {
  initTheme()
  initScroll()
  initNavigation()
  initLanguage()
})
