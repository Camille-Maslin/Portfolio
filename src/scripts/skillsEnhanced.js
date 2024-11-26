export const initEnhancedSkills = () => {
  // Gestion des filtres
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillItems = document.querySelectorAll('.skill-category');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      
      // Mise à jour des boutons actifs
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filtrage des compétences
      skillItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
          setTimeout(() => item.style.opacity = '1', 50);
        } else {
          item.style.opacity = '0';
          setTimeout(() => item.style.display = 'none', 500);
        }
      });
    });
  });

  // Animation des barres de progression
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector('.progress-bar');
        const targetWidth = progressBar.dataset.progress;
        progressBar.style.width = `${targetWidth}%`;
      }
    });
  };

  const progressObserver = new IntersectionObserver(observerCallback, {
    threshold: 0.5
  });

  document.querySelectorAll('.skill-bar').forEach(bar => {
    progressObserver.observe(bar);
  });
};
