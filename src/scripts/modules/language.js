function initLanguage() {
  const langSelector = document.querySelector('.language-selector');
  const currentLang = document.querySelector('.current-lang');
  
  async function loadTranslations(lang) {
    try {
      const response = await fetch(`/src/locales/${lang}.json`);
      const translations = await response.json();
      updateContent(translations);
      localStorage.setItem('lang', lang);
      currentLang.textContent = lang.toUpperCase();
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  }
  
  function updateContent(translations) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = key.split('.').reduce((obj, key) => obj?.[key], translations);
      if (translation) element.textContent = translation;
    });
  }
  
  langSelector?.addEventListener('click', () => {
    const currentLang = localStorage.getItem('lang') || 'en';
    const newLang = currentLang === 'en' ? 'fr' : 'en';
    loadTranslations(newLang);
  });
  
  const savedLang = localStorage.getItem('lang');
  if (savedLang) loadTranslations(savedLang);
}

export { initLanguage }; 