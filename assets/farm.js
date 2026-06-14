/* Farm — graceful scroll reveal. Everything is visible if JS is off
   (.farm__rv elements get .is-in immediately when IntersectionObserver is
   unavailable or motion is reduced). Idempotent: safe to load once per page. */
(function () {
  if (window.__farmRevealInit) return;
  window.__farmRevealInit = true;

  function init() {
    var els = document.querySelectorAll('.farm__rv');
    if (!els.length) return;

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    els.forEach(function (e) { io.observe(e); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
