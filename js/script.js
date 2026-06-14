document.addEventListener('DOMContentLoaded', () => {

  /* ===== Мобильное меню ===== */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      burger.classList.toggle('is-active', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        burger.classList.remove('is-active');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ===== Аккордеоны (программа курса и FAQ) ===== */
  document.querySelectorAll('.prog .acc, .faq .acc').forEach((item) => {
    const head = item.querySelector('.acc-head');
    const body = item.querySelector('.acc-body');

    head.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      const group = item.closest('.prog, .faq');

      group.querySelectorAll('.acc.active').forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove('active');
          openItem.querySelector('.acc-body').style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('active');
        body.style.maxHeight = null;
      } else {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  /* ===== Анимация появления при скролле ===== */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el) => observer.observe(el));
  }

});
