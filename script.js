const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 }
  );

  for (const element of revealElements) {
    revealObserver.observe(element);
  }
}

const navLinks = Array.from(document.querySelectorAll('.nav a'));
const hashLinks = navLinks.filter((link) => {
  const href = link.getAttribute('href') || '';
  return href.startsWith('#');
});

if ('IntersectionObserver' in window && hashLinks.length > 0) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }

        hashLinks.forEach((link) => {
          const target = document.querySelector(link.getAttribute('href'));
          if (target) {
            link.toggleAttribute('aria-current', target === entry.target);
          }
        });
      }
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 }
  );

  hashLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean)
    .forEach((section) => sectionObserver.observe(section));
}
