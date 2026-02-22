/* ═══════════════════════════════════════════════════
   THE CLAY GROUP — Navigation Controller
   Scroll behavior, hide/reveal, mobile menu
   ═══════════════════════════════════════════════════ */

import { throttle } from './utils.js';

function initNav() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.nav__mobile');

  if (!nav) return;

  let lastScrollY = 0;
  let ticking = false;

  // ─── Scroll Behavior: transparent→solid, hide/reveal ───
  const handleScroll = throttle(() => {
    const scrollY = window.scrollY;

    // Add/remove scrolled state
    if (scrollY > 80) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }

    // Hide on scroll down, show on scroll up (only after hero)
    if (scrollY > window.innerHeight * 0.5) {
      if (scrollY > lastScrollY + 5) {
        nav.classList.add('nav--hidden');
      } else if (scrollY < lastScrollY - 5) {
        nav.classList.remove('nav--hidden');
      }
    } else {
      nav.classList.remove('nav--hidden');
    }

    lastScrollY = scrollY;
  }, 50);

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ─── Mobile Menu ───
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.contains('nav__toggle--open');

      toggle.classList.toggle('nav__toggle--open');
      mobileMenu.classList.toggle('nav__mobile--open');

      // Toggle body scroll
      document.body.style.overflow = isOpen ? '' : 'hidden';

      // Update ARIA
      toggle.setAttribute('aria-expanded', !isOpen);
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('.nav__mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('nav__toggle--open');
        mobileMenu.classList.remove('nav__mobile--open');
        document.body.style.overflow = '';
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('nav__mobile--open')) {
        toggle.classList.remove('nav__toggle--open');
        mobileMenu.classList.remove('nav__mobile--open');
        document.body.style.overflow = '';
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', initNav);
