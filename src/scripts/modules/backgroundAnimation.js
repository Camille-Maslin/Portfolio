const initBackgroundAnimation = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.classList.add('background-canvas');
  document.body.insertBefore(canvas, document.body.firstChild);

  let width = window.innerWidth;
  let height = window.innerHeight;
  
  const calculateParticleCount = () => {
    const screenArea = width * height;
    const baseCount = Math.min(20, Math.floor(screenArea / 100000));
    const densityFactor = 1 / 100000;
    return Math.min(Math.floor(screenArea * densityFactor + baseCount), 100);
  };
  
  let PARTICLE_COUNT = calculateParticleCount();
  const particles = [];
  
  const getComputedColor = (variable) => {
    const style = getComputedStyle(document.documentElement);
    return style.getPropertyValue(variable).trim();
  };
  
  class Particle {
    constructor() {
      this.reset();
      this.colorVariant = Math.floor(Math.random() * 3) + 1;
      this.sizeVariant = Math.random() < 0.8 ? 'small' : 'medium';
    }
    
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      if (this.sizeVariant === 'small') {
        this.size = 1 + Math.random() * 1;
      } else {
        this.size = 2 + Math.random() * 1.5;
      }
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      if (this.sizeVariant === 'small') {
        this.opacity = 0.3 + Math.random() * 0.3;
      } else {
        this.opacity = 0.4 + Math.random() * 0.3;
      }
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;
      
      if (!document.hidden) {
        const maxConnections = 3;
        let connections = 0;
        
        for (let i = 0; i < particles.length && connections < maxConnections; i++) {
          const particle = particles[i];
          if (particle !== this) {
            const dx = this.x - particle.x;
            const dy = this.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              connections++;
              const color = getComputedColor(`--particle-color-${this.colorVariant}`);
              ctx.beginPath();
              ctx.strokeStyle = `rgba(${color}, ${(1 - distance / 100) * 0.1})`;
              ctx.moveTo(this.x, this.y);
              ctx.lineTo(particle.x, particle.y);
              ctx.stroke();
            }
          }
        }
      }
    }
    
    draw() {
      const color = getComputedColor(`--particle-color-${this.colorVariant}`);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${this.opacity})`;
      ctx.fill();
    }
  }

  const init = () => {
    canvas.width = width;
    canvas.height = height;
    PARTICLE_COUNT = calculateParticleCount();
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  };
  
  let animationFrameId;
  const animate = () => {
    if (!document.hidden) {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        animationFrameId = requestAnimationFrame(animate);
    }
  };

  // Debounce pour le redimensionnement
  const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  };

  // Gestion optimisée du redimensionnement
  const handleResize = debounce(() => {
    width = window.innerWidth;
    height = window.innerHeight;
    init();
  }, 150);

  window.addEventListener('resize', handleResize);

  // Gestion optimisée de la visibilité
  let isAnimating = false;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isAnimating = false;
      cancelAnimationFrame(animationFrameId);
    } else if (!isAnimating) {
      isAnimating = true;
      animate();
    }
  });

  // Réinitialiser l'animation lors du changement de thème
  const observer = new MutationObserver(() => {
    init();
  });
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
  
  init();
  animate();

  // Vérification des performances du navigateur
  const checkPerformance = () => {
    const ua = navigator.userAgent.toLowerCase();
    const isMobile = /mobile|android|ios|iphone|ipad|ipod|windows phone/i.test(ua);
    const isLowEnd = navigator.hardwareConcurrency <= 4;
    return { isMobile, isLowEnd };
  };

  const { isMobile, isLowEnd } = checkPerformance();
  const performanceMode = isMobile || isLowEnd ? 'low' : 'high';

  // Ajuster les paramètres en fonction du mode de performance
  const config = {
    low: {
      particleDensity: 1 / 120000,
      maxParticles: 50,
      connectionDistance: 80,
      maxConnections: 2
    },
    high: {
      particleDensity: 1 / 60000,
      maxParticles: 100,
      connectionDistance: 150,
      maxConnections: 4
    }
  }[performanceMode];
};

export { initBackgroundAnimation }; 