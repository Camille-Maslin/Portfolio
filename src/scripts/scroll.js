export const initScroll = () => {
  const backToTopButton = document.getElementById('back-to-top');
  
  if (!backToTopButton) {
    console.warn('Back to top button not found');
    return;
  }

  const handleScroll = () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const shouldBeVisible = scrollPosition > 400;
    
    if (shouldBeVisible) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      duration: 800
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  backToTopButton.addEventListener('click', scrollToTop);

  // Initial check
  handleScroll();

  return () => {
    window.removeEventListener('scroll', handleScroll);
    backToTopButton.removeEventListener('click', scrollToTop);
  };
};
