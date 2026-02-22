/* ═══════════════════════════════════════════════════
   THE CLAY GROUP — Utilities
   Throttle, debounce, helpers
   ═══════════════════════════════════════════════════ */

/**
 * Throttle — limit function calls to once per interval
 * Used for scroll and resize handlers
 */
export function throttle(fn, delay = 100) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

/**
 * Debounce — delay execution until input stops
 * Used for search inputs and resize end detection
 */
export function debounce(fn, delay = 250) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Select single element (shorthand)
 */
export function $(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Select all elements (shorthand)
 */
export function $$(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Animate counter from 0 to target
 * Used for Market Power Index stats
 */
export function animateCounter(element, target, duration = 2000, prefix = '', suffix = '') {
  if (prefersReducedMotion()) {
    element.textContent = prefix + target + suffix;
    return;
  }

  const start = performance.now();
  const isFloat = String(target).includes('.');

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = isFloat
      ? (eased * target).toFixed(1)
      : Math.floor(eased * target);

    element.textContent = prefix + current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
