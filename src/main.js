import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { 
  faMoon, faSun, faGlobe, faRocket, faMicroscope, faBriefcase,
  faGraduationCap, faEnvelope, faArrowUp, faDatabase, faCode, faFlask
} from '@fortawesome/free-solid-svg-icons';
import { 
  faLinkedin, faGithub, faHtml5, faCss3Alt, faJs, faPython 
} from '@fortawesome/free-brands-svg-icons';

import { initTheme } from './scripts/theme.js';
import { initNavigation } from './scripts/navigation.js';
import { initLanguage } from './scripts/language.js';
import { initScroll } from './scripts/scroll.js';
import { initBackgroundAnimation } from './scripts/modules/backgroundAnimation.js';
import { initAnimations } from './scripts/animations.js';
import { initSkillsFilter } from './scripts/modules/skillsFilter.js';

// Initialisation des icônes Font Awesome
const initIcons = () => {
  library.add(
    // Icônes solides
    faMoon, faSun, faGlobe, faRocket, faMicroscope, faBriefcase,
    faGraduationCap, faEnvelope, faArrowUp, faDatabase, faCode, faFlask,
    // Icônes de marques
    faLinkedin, faGithub, faHtml5, faCss3Alt, faJs, faPython
  );
  dom.watch();
};

document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  initTheme();
  initScroll();
  initNavigation();
  initLanguage();
  initBackgroundAnimation();
  initAnimations();
  initSkillsFilter();
}); 