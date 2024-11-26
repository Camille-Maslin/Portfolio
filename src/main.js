import './scripts/theme.js';
import './scripts/navigation.js';
import './scripts/language.js';
import { initBackgroundAnimation } from './scripts/modules/backgroundAnimation.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme()
  initScroll()
  initNavigation()
  initLanguage()
  initBackgroundAnimation()
}) 