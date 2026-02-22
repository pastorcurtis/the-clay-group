/* ═══════════════════════════════════════════════════
   THE CLAY GROUP — Scroll Animations
   ScrollTrigger reveals, counters, stagger effects
   ═══════════════════════════════════════════════════ */

import { prefersReducedMotion, $$, animateCounter } from './utils.js';

// ─── Generic Reveal Elements ───
function initReveals() {
  if (prefersReducedMotion()) return;

  // Basic reveals (fade up)
  $$('.reveal').forEach(el => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
    });
  });

  // Left reveals
  $$('.reveal--left').forEach(el => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power2.out',
    });
  });

  // Right reveals
  $$('.reveal--right').forEach(el => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power2.out',
    });
  });

  // Scale reveals
  $$('.reveal--scale').forEach(el => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
    });
  });
}

// ─── Stagger Children ───
function initStagger() {
  if (prefersReducedMotion()) return;

  $$('.stagger-children').forEach(parent => {
    const children = parent.children;
    gsap.to(children, {
      scrollTrigger: {
        trigger: parent,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
    });
  });
}

// ─── Animated Counters ───
function initCounters() {
  $$('[data-counter]').forEach(el => {
    const target = parseFloat(el.dataset.counter);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    let triggered = false;

    if (prefersReducedMotion()) {
      el.textContent = prefix + target + suffix;
      return;
    }

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (triggered) return;
        triggered = true;
        animateCounter(el, target, 2000, prefix, suffix);
      },
    });
  });
}

// ─── Authority Marquee Pause on Hover ───
function initMarquee() {
  $$('.marquee').forEach(marquee => {
    const track = marquee.querySelector('.marquee__track');
    if (!track) return;

    marquee.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    marquee.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  });
}

// ─── Init ───
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to let GSAP and ScrollTrigger register
  requestAnimationFrame(() => {
    initReveals();
    initStagger();
    initCounters();
    initMarquee();
  });
});
