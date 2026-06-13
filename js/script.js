document.addEventListener('DOMContentLoaded', () => {

  /* ===== Мобильное меню ===== */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      burger.classList.toggle('is-active', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        burger.classList.remove('is-active');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ===== Аккордеон FAQ ===== */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const question = item.querySelector('.faq-item__question');
    const answer = item.querySelector('.faq-item__answer');
    const inner = item.querySelector('.faq-item__answer-inner');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      document.querySelectorAll('.faq-item.is-open').forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
          openItem.querySelector('.faq-item__answer').style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        question.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = inner.offsetHeight + 'px';
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
