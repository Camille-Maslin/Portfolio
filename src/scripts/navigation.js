export const initNavigation = () => {
  const burger = document.createElement('button');
  burger.className = 'nav-burger';
  burger.innerHTML = '<i class="fas fa-bars"></i>';
  burger.setAttribute('aria-label', 'Toggle navigation');
  
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');
  
  navbar.insertBefore(burger, navLinks);
  
  const toggleMenu = () => {
    const isOpen = navLinks.classList.contains('active');
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    burger.innerHTML = isOpen 
      ? '<i class="fas fa-bars"></i>' 
      : '<i class="fas fa-times"></i>';
  };
  
  burger.addEventListener('click', toggleMenu);
  
  // Fermer le menu au clic sur un lien
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu();
    });
  });
  
  // Fermer le menu au scroll
  document.addEventListener('scroll', () => {
    if (navLinks.classList.contains('active')) {
      toggleMenu();
    }
  });
};
