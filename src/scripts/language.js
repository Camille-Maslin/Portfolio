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

  const setLanguage = async (lang) => {
    if (isChangingLanguage || currentLang.textContent === lang) return;
    isChangingLanguage = true;
    
    try {
      const langFile = lang.toLowerCase();
      const isGitHubPages = window.location.hostname === 'mmillle.github.io';
      const basePath = isGitHubPages ? '/Portfolio' : '';
      
      const response = await fetch(`${basePath}/src/locales/${langFile}.json`);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
      }
      
      const translations = await response.json();
      const previousLang = currentLang.textContent;
      
      localStorage.setItem('language', lang);
      await updateTranslations(translations);
      currentLang.textContent = lang;
      document.documentElement.setAttribute('lang', langFile);
      
      console.log(`Changement de langue réussi: ${previousLang} -> ${lang}`);
    } catch (error) {
      console.error('Erreur détaillée lors du changement de langue:', {
        error: error.message,
        url: error.url,
        status: error.status
      });
      const savedLang = localStorage.getItem('language') || 'EN';
      currentLang.textContent = savedLang;
    } finally {
      isChangingLanguage = false;
    }
  };

  languageSelector.addEventListener('click', async () => {
    const currentLanguage = currentLang.textContent;
    const newLanguage = currentLanguage === 'EN' ? 'FR' : 'EN';
    try {
      await setLanguage(newLanguage);
    } catch (error) {
      console.error('Erreur lors du changement de langue:', error);
      alert('Erreur lors du changement de langue. Veuillez réessayer.');
    }
  });

  const savedLanguage = localStorage.getItem('language') || 
    (navigator.language.startsWith('fr') ? 'FR' : 'EN');
  
  setLanguage(savedLanguage).catch(error => {
    console.error('Erreur lors de l\'initialisation de la langue:', error);
  });
}; 