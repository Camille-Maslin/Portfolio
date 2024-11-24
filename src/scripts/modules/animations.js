import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
};
