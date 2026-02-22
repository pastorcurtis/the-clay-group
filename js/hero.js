/* ═══════════════════════════════════════════════════
   THE CLAY GROUP — Hero Controller
   CSS particle field + GSAP hero entrance timeline
   ═══════════════════════════════════════════════════ */

import { prefersReducedMotion } from './utils.js';

// ─── CSS Particle Field ───
// Creates floating dust-in-light particles (pure CSS animation)
// Achieves premium particle effect at 1/100th the weight of Three.js
function initParticles() {
  const container = document.querySelector('.hero__particles');
  if (!container || prefersReducedMotion()) return;

  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Randomize position, size, and timing
    const size = Math.random() * 2 + 1;
    particle.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100 + 50}%;
      width: ${size}px;
      height: ${size}px;
      opacity: 0;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
    `;

    container.appendChild(particle);
  }
}

// ─── Hero Entrance Timeline ───
function initHeroAnimation() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  if (prefersReducedMotion()) {
    // Instantly show everything
    hero.querySelectorAll('.hero__label, .hero__subtitle, .hero__cta, .hero__scroll').forEach(el => {
      el.style.opacity = '1';
    });
    return;
  }

  // Wait for page loader to finish
  const delay = 2.8;

  const tl = gsap.timeline({ delay });

  // Label slides in
  tl.to('.hero__label', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
  })

  // Title — stagger each <span> line
  .add(() => {
    const title = document.querySelector('.hero__title');
    if (!title) return;

    const spans = title.querySelectorAll('span');
    if (spans.length) {
      gsap.from(spans, {
        yPercent: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.08,
      });
    } else {
      gsap.from(title, {
        yPercent: 15,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      });
    }
  }, '-=0.3')

  // Subtitle fades in
  .to('.hero__subtitle', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
  }, '-=0.5')

  // CTA appears
  .to('.hero__cta', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out',
  }, '-=0.3')

  // Scroll indicator
  .to('.hero__scroll', {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
  }, '-=0.2');
}

// ─── Init ───
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initHeroAnimation();
});
