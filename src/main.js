import { initTheme } from './modules/theme.js';
import { initNavigation } from './modules/navigation.js';
import { initLanguage } from './modules/language.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initLanguage();
}); 