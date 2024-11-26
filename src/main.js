import { initTheme } from './scripts/theme.js';
import { initNavigation } from './scripts/navigation.js';
import { initLanguage } from './scripts/language.js';
import { initScroll } from './scripts/scroll.js';
import { initBackgroundAnimation } from './scripts/modules/backgroundAnimation.js';
import { initAnimations } from './scripts/animations.js';
import { initSkillsFilter } from './scripts/modules/skillsFilter.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme()
  initScroll()
  initNavigation()
  initLanguage()
  initBackgroundAnimation()
  initAnimations()
  initSkillsFilter()
}) 