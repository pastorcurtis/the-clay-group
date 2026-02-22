/* ═══════════════════════════════════════════════════
   THE CLAY GROUP — Main Entry
   GSAP + Lenis initialization, page loader
   ═══════════════════════════════════════════════════ */

import { prefersReducedMotion } from './utils.js';

// ─── Lenis Smooth Scroll ───
let lenis;

function initLenis() {
  if (prefersReducedMotion()) return;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

// ─── Page Loader ───
function initPageLoader() {
  const loader = document.querySelector('.page-loader');
  const brand = document.querySelector('.page-loader__brand');

  if (!loader || !brand) return;

  if (prefersReducedMotion()) {
    loader.classList.add('page-loader--hidden');
    loader.style.display = 'none';
    document.body.classList.add('loaded');
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      loader.style.display = 'none';
      document.body.classList.add('loaded');
    }
  });

  tl.to(brand, {
    opacity: 1,
    letterSpacing: '0.5em',
    duration: 1.2,
    ease: 'power2.out',
  })
  .to(brand, {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.in',
    delay: 0.6,
  })
  .to(loader, {
    yPercent: -100,
    duration: 0.8,
    ease: 'power3.inOut',
  });
}

// ─── Register GSAP Plugins ───
function initGSAP() {
  gsap.registerPlugin(ScrollTrigger);

  // Default GSAP settings
  gsap.defaults({
    ease: 'power2.out',
    duration: 1,
  });
}

// ─── Init ───
document.addEventListener('DOMContentLoaded', () => {
  initGSAP();
  initPageLoader();
  initLenis();
});

export { lenis };
