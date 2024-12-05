export const initLanguage = () => {
  const languageSelector = document.querySelector('.language-selector');
  let currentLang = document.querySelector('.current-lang');
  let isChangingLanguage = false;
  
  if (!languageSelector || !currentLang) {
    console.error('Éléments du sélecteur de langue non trouvés');
    return;
  }

  const updateTranslations = async (translations) => {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const keys = element.getAttribute('data-i18n').split('.');
      let value = translations;
      
      for (const key of keys) {
        value = value[key];
        if (!value) break;
      }
      
      if (value) {
        if (element.tagName === 'INPUT' && element.type === 'placeholder') {
          element.placeholder = value;
        } else {
          element.textContent = value;
        }
      }
    });
  };

  const setLanguage = async (lang, isInitial = false) => {
    if (isChangingLanguage || (!isInitial && currentLang.textContent === lang)) return;
    isChangingLanguage = true;
    
    try {
      const langFile = lang.toLowerCase();
      const isGitHubPages = window.location.hostname === 'camille-maslin.github.io';
      const basePath = isGitHubPages ? '/Portfolio' : '';
      const localesPath = `${basePath}/src/locales/${langFile}.json`;
      
      console.log('Tentative de chargement du fichier de langue:', localesPath);
      
      const response = await fetch(localesPath, {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText} - ${localesPath}`);
      }
      
      const translations = await response.json();
      const previousLang = currentLang.textContent;
      
      localStorage.setItem('language', lang);
      await updateTranslations(translations);
      currentLang.textContent = lang;
      document.documentElement.setAttribute('lang', langFile);
      
      if (!isInitial) {
        console.log(`Changement de langue réussi: ${previousLang} -> ${lang}`);
      }
    } catch (error) {
      console.error('Erreur détaillée lors du changement de langue:', {
        message: error.message,
        path: error.url || 'N/A',
        status: error.status || 'N/A'
      });
      if (!isInitial) {
        const savedLang = localStorage.getItem('language') || 'EN';
        currentLang.textContent = savedLang;
      }
    } finally {
      isChangingLanguage = false;
    }
  };

  languageSelector.addEventListener('click', async () => {
    const newLanguage = currentLang.textContent === 'EN' ? 'FR' : 'EN';
    await setLanguage(newLanguage);
  });

  const browserLang = navigator.language.startsWith('fr') ? 'FR' : 'EN';
  const savedLanguage = localStorage.getItem('language') || browserLang;
  
  setLanguage(savedLanguage, true);
}; 