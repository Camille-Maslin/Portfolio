export const initLanguage = () => {
  const languageSelector = document.querySelector('.language-selector');
  const currentLang = document.querySelector('.current-lang');
  
  if (!languageSelector || !currentLang) {
    console.error('Éléments du sélecteur de langue non trouvés');
    return;
  }

  const setLanguage = async (lang) => {
    try {
      console.log(`Tentative de chargement de la langue: ${lang}`);
      console.log(`Chemin du fichier: ./locales/${lang}.json`);
      
      const response = await fetch(`./locales/${lang}.json`);
      console.log('Statut de la réponse:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }
      
      const text = await response.text();
      console.log('Contenu brut:', text);
      
      const translations = JSON.parse(text);
      document.documentElement.setAttribute('lang', lang);
      currentLang.textContent = lang.toUpperCase();
      
      document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = key.split('.').reduce((obj, i) => obj?.[i], translations);
        
        if (translation) {
          if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
          } else {
            element.textContent = translation;
          }
        }
      });

      localStorage.setItem('language', lang);
      console.log(`Langue changée en: ${lang}`);
    } catch (error) {
      console.error('Erreur détaillée:', {
        message: error.message,
        stack: error.stack,
        type: error.name
      });
    }
  };

  languageSelector.addEventListener('click', () => {
    const currentLanguage = document.documentElement.getAttribute('lang') || 'en';
    const newLanguage = currentLanguage === 'en' ? 'fr' : 'en';
    setLanguage(newLanguage);
  });

  // Initialisation de la langue
  const savedLanguage = localStorage.getItem('language') || 
    (navigator.language.startsWith('fr') ? 'fr' : 'en');
  setLanguage(savedLanguage);
}; 