(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Local clock chip (University Park, PA)
  var clock = document.getElementById('clock');
  function tick() {
    if (!clock) return;
    clock.textContent = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York' }).format(new Date());
  }
  tick(); setInterval(tick, 30000);

  // Theme toggle
  var btn = document.querySelector('.theme');
  if (btn) btn.addEventListener('click', function () {
    var dark = root.dataset.theme ? root.dataset.theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    var next = dark ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el, i) { el.style.transitionDelay = (i % 5) * 40 + 'ms'; io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Hero parallax, under 1% travel
  var hero = document.querySelector('.hero');
  var scene = hero && hero.querySelector('.scene');
  if (hero && scene && !reduce && window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      scene.style.setProperty('--px', (x * -14).toFixed(1) + 'px');
      scene.style.setProperty('--py', (y * -8).toFixed(1) + 'px');
    });
  }

  // Pause SMIL fireflies for reduced motion
  if (reduce) document.querySelectorAll('svg.scene').forEach(function (s) { if (s.pauseAnimations) s.pauseAnimations(); });
})();
