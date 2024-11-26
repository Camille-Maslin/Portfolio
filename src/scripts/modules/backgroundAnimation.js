const initBackgroundAnimation = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.classList.add('background-canvas');
  document.body.insertBefore(canvas, document.body.firstChild);

  let width = window.innerWidth;
  let height = window.innerHeight;
  
  const calculateParticleCount = () => {
    const screenArea = width * height;
    const baseCount = 20;
    const densityFactor = 1 / 60000;
    return Math.min(Math.floor(screenArea * densityFactor + baseCount), 150);
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
      this.colorVariant = Math.floor(Math.random() * 5) + 1;
      this.sizeVariant = Math.random() < 0.7 ? 'small' : (Math.random() < 0.9 ? 'medium' : 'large');
    }
    
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      if (this.sizeVariant === 'small') {
        this.size = 1 + Math.random() * 1;
      } else if (this.sizeVariant === 'medium') {
        this.size = 2 + Math.random() * 1.5;
      } else {
        this.size = 3 + Math.random() * 2;
      }
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      if (this.sizeVariant === 'small') {
        this.opacity = 0.3 + Math.random() * 0.3;
      } else if (this.sizeVariant === 'medium') {
        this.opacity = 0.4 + Math.random() * 0.3;
      } else {
        this.opacity = 0.5 + Math.random() * 0.3;
      }
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;
      
      particles.forEach(particle => {
        if (particle !== this) {
          const dx = this.x - particle.x;
          const dy = this.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const color = getComputedColor(`--particle-color-${this.colorVariant}`);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${color}, ${(1 - distance / 150) * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(particle.x, particle.y);
            ctx.stroke();
          }
        }
      });
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
  
  const animate = () => {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animate);
  };

  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    init();
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
};

export { initBackgroundAnimation }; 