import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const initStarsAnimation = () => {
  const skillCards = gsap.utils.toArray('.general-skill-card');
  
  skillCards.forEach(card => {
    const stars = card.querySelectorAll('.star');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      }
    });

    stars.forEach((star, index) => {
      tl.from(star, {
        opacity: 0,
        scale: 0,
        duration: 0.4,
        ease: 'back.out(1.7)',
        delay: index * 0.1
      });
    });
  });
};

const initSkillCards = () => {
  const cards = document.querySelectorAll('.general-skill-card');
  
  cards.forEach(card => {
    const rating = card.querySelector('.skill-rating');
    const starsContainer = card.querySelector('.stars-container');
    
    if (rating && starsContainer) {
      const value = parseInt(rating.dataset.rating);
      const fillWidth = (value / 5) * 100;
      
      gsap.to(starsContainer.querySelector('.stars-fill'), {
        width: `${fillWidth}%`,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }
  });
};

document.addEventListener('DOMContentLoaded', initSkillCards);

export const initAnimations = () => {
  // Hero section animation
  gsap.from('.section__text', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
  });

  // Skills cards animation
  gsap.from('.skills-card', {
    scrollTrigger: {
      trigger: '.skills-container',
      start: 'top center+=100',
      toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.2
  });

  // Projects animation
  gsap.from('.project-item', {
    scrollTrigger: {
      trigger: '.projects-grid',
      start: 'top center+=100'
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.3
  });

  // General skills animation
  gsap.from('.general-skill-card', {
    scrollTrigger: {
      trigger: '.general-skills',
      start: 'top center+=100',
      toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: {
      amount: 0.8,
      grid: 'auto'
    },
    onComplete: () => {
      initStarsAnimation();
    }
  });
};
