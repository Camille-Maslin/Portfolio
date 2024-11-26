export const initProjectTags = () => {
  const createSkillTag = (skill) => {
    return `
      <div class="skill-tag" data-category="${skill.category}">
        <i class="${skill.icon}"></i>
        <span>${skill.name}</span>
      </div>
    `;
  };

  // Appliquer aux projets existants
  document.querySelectorAll('.project-skills').forEach(container => {
    const skills = container.dataset.skills.split(',');
    container.innerHTML = skills.map(skill => createSkillTag(skill)).join('');
  });
}; 