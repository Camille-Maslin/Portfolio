export const initSkillsFilter = () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCategories = document.querySelectorAll('.skill-category');

  // Définir l'état initial
  const initializeFilter = () => {
    const activeFilter = document.querySelector('.filter-btn.active');
    if (activeFilter) {
      filterSkills(activeFilter.dataset.filter);
    }
  };

  const filterSkills = (filter) => {
    skillCategories.forEach(category => {
      const categoryType = category.dataset.category;
      if (filter === 'all' || categoryType === filter) {
        category.style.display = 'block';
        setTimeout(() => {
          category.style.opacity = '1';
          category.style.transform = 'translateY(0)';
        }, 50);
      } else {
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        setTimeout(() => {
          category.style.display = 'none';
        }, 300);
      }
    });
  };

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      filterSkills(button.dataset.filter);
    });
  });

  // Initialiser le filtre au chargement
  initializeFilter();
};
