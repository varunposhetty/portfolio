// Smooth scroll behavior and reveal animations
(function(){
  // Polyfill: ensure smooth behavior in script
  try { document.documentElement.style.scrollBehavior = 'smooth'; } catch (e) {}

  // Smooth nav links
  document.querySelectorAll('nav a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // IntersectionObserver reveal
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach((el, i) => {
    // stagger using CSS variable
    el.style.setProperty('--reveal-delay', (i * 80) + 'ms');
    io.observe(el);
  });

  // Scroll progress
  const progress = document.getElementById('progress');
  function updateProgress(){
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const height = doc.scrollHeight - doc.clientHeight;
    const pct = height > 0 ? (scrollTop / height) * 100 : 0;
    if (progress) progress.style.width = pct + '%';
  }
  document.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // Back to top
  const back = document.getElementById('backToTop');
  function toggleBack(){
    if (!back) return;
    if ((window.scrollY || document.documentElement.scrollTop) > 400) back.classList.add('visible');
    else back.classList.remove('visible');
  }
  back && back.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.addEventListener('scroll', toggleBack, { passive: true });
  toggleBack();
})();
