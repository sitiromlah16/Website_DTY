document.addEventListener('DOMContentLoaded', function() {
  const backToTop = document.getElementById('backToTop');
  const statValues = document.querySelectorAll('.stat-value');
  const revealItems = document.querySelectorAll('.feature, .stat-card, .card');
  const heroInner = document.querySelector('.hero-inner');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const nextSection = document.querySelector('.hero-banner + section');
  let latestScrollY = 0;
  let ticking = false;

  function toggleBackToTop() {
    if (window.scrollY > 360) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
  }

  function animateStats() {
    statValues.forEach(item => {
      if (item.dataset.animated) return;
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        const target = parseInt(item.dataset.target, 10) || 0;
        const suffix = item.dataset.suffix || '';
        item.dataset.animated = 'true';
        let start = 0;
        const duration = 1200;
        const step = Math.max(1, Math.ceil(target / (duration / 20)));
        const interval = setInterval(() => {
          start += step;
          if (start >= target) {
            start = target;
            clearInterval(interval);
          }
          item.textContent = start + suffix;
        }, 20);
      }
    });
  }

  function revealOnScroll() {
    revealItems.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('visible');
      }
    });
  }

  function updateHeroTextOnScroll() {
    if (!heroInner) return;
    const offset = Math.min(latestScrollY * 0.18, 80);
    heroInner.style.transform = `translateY(${offset}px)`;
    heroInner.style.opacity = `${Math.max(0, 1 - latestScrollY / 550)}`;
  }

  function handleScroll() {
    latestScrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(() => {
        updateHeroTextOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  }

  backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollBy({ top: window.innerHeight * 0.85, left: 0, behavior: 'smooth' });
      }
    });
  }

  window.addEventListener('scroll', function() {
    toggleBackToTop();
    animateStats();
    revealOnScroll();
    handleScroll();
  });

  toggleBackToTop();
  animateStats();
  revealOnScroll();
  updateHeroTextOnScroll();
});
