document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('hamburger');
  const menu = document.getElementById('navMenu');
  if (!button || !menu) return;

  const mobileLinks = [...menu.querySelectorAll('a')];
  const allLinks = [...document.querySelectorAll('.desktop-nav a, .full-screen-menu a')];
  button.setAttribute('aria-label', 'Open navigation');
  const closeMenu = (restoreFocus = false) => {
    button.classList.remove('is-active');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open navigation');
    menu.classList.remove('is-active');
    document.body.style.overflow = '';
    if (restoreFocus) button.focus();
  };
  const openMenu = () => {
    button.classList.add('is-active');
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-label', 'Close navigation');
    menu.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    mobileLinks[0]?.focus();
  };

  button.addEventListener('click', () => button.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu());
  mobileLinks.forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') return closeMenu(true);
    if (event.key !== 'Tab' || button.getAttribute('aria-expanded') !== 'true') return;
    const first = mobileLinks[0]; const last = mobileLinks.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  });
  window.addEventListener('resize', () => { if (window.matchMedia('(min-width: 861px)').matches) closeMenu(); });

  const setActive = href => allLinks.forEach(link => link.getAttribute('href') === href ? link.setAttribute('aria-current', href.includes('#') ? 'location' : 'page') : link.removeAttribute('aria-current'));
  const path = window.location.pathname;
  if (path.endsWith('about-us.html')) setActive('about-us.html');
  else if (path.endsWith('insights.html')) setActive('insights.html');
  else if (path.endsWith('index.html') || path.endsWith('/')) {
    const sections = ['hero', 'service-lines', 'service-types', 'sectors', 'insights', 'contact'].map(id => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(`index.html#${visible.target.id}`);
    }, { rootMargin: '-35% 0px -55% 0px', threshold: [0, .15, .5] });
    sections.forEach(section => observer.observe(section));
    setActive(`index.html#${window.location.hash.slice(1) || 'hero'}`);
  }
});
