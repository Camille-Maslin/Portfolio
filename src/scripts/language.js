export const initLanguage = () => {
  const languageSelector = document.querySelector('.language-selector');
  const currentLang = document.querySelector('.current-lang');
  
  if (!languageSelector || !currentLang) {
    console.error('Éléments du sélecteur de langue non trouvés', {
      languageSelector: !!languageSelector,
      currentLang: !!currentLang
    });
    return;
  }

  const setLanguage = async (lang) => {
    try {
      const response = await fetch(`locales/${lang}.json`);
      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}, path: ${response.url}`);
      }
      
      const translations = await response.json();
      document.documentElement.setAttribute('lang', lang);
      currentLang.textContent = lang.toUpperCase();
      
      document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = key.split('.').reduce((obj, i) => {
          if (obj === undefined) return undefined;
          return obj[i];
        }, translations);
        
        if (translation) {
          if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
          } else {
            element.textContent = translation;
          }
        } else {
          console.warn(`Traduction manquante pour la clé: ${key}`, {
            lang,
            key,
            element: element.outerHTML
          });
        }
      });

      localStorage.setItem('language', lang);
      console.log(`Langue changée en: ${lang}`);
    } catch (error) {
      console.error('Erreur lors du changement de langue:', error);
    }
  };

  languageSelector.addEventListener('click', () => {
    const currentLanguage = document.documentElement.getAttribute('lang') || 'en';
    const newLanguage = currentLanguage === 'en' ? 'fr' : 'en';
    console.log(`Changement de langue: ${currentLanguage} -> ${newLanguage}`);
    setLanguage(newLanguage);
  });

  const savedLanguage = localStorage.getItem('language') || 
    (navigator.language.startsWith('fr') ? 'fr' : 'en');
  setLanguage(savedLanguage);
}; 