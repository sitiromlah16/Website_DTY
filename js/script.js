document.addEventListener('DOMContentLoaded', function() {
  const backToTop = document.getElementById('backToTop');
  const statValues = document.querySelectorAll('.stat-value');
  const revealItems = document.querySelectorAll('.feature, .stat-card, .card');

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

  backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', function() {
    toggleBackToTop();
    animateStats();
    revealOnScroll();
  });

  toggleBackToTop();
  animateStats();
  revealOnScroll();
});
