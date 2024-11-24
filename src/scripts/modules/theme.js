export const initTheme = () => {
  const themeToggle = document.querySelector('.theme-toggle');
  if (!themeToggle) {
    console.error('Theme toggle button not found');
    return;
  }

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = `fas fa-${theme === 'dark' ? 'sun' : 'moon'}`;
    }

    // Forcer le rafraîchissement des styles
    document.body.classList.remove('theme-transition');
    window.setTimeout(() => {
      document.body.classList.add('theme-transition');
    }, 1);
  };

  // Event listener
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  // Initialisation
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
  setTheme(savedTheme);
};
