export const initScroll = () => {
  const backToTopButton = document.getElementById('back-to-top');
  
  if (!backToTopButton) {
    console.warn('Back to top button not found');
    return;
  }

  let scrollTimeout;
  const handleScroll = () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(() => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      backToTopButton.classList.toggle('visible', scrollPosition > 300);
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      duration: 500
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  backToTopButton.addEventListener('click', scrollToTop);

  return () => {
    window.removeEventListener('scroll', handleScroll);
    backToTopButton.removeEventListener('click', scrollToTop);
  };
};
