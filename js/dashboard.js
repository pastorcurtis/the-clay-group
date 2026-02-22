/* ═══════════════════════════════════════════════════
   THE CLAY GROUP — Dashboard Controller
   Bar chart animations for intelligence.html
   ═══════════════════════════════════════════════════ */

import { prefersReducedMotion, $$ } from './utils.js';

function initDashboard() {
  const bars = $$('.dashboard__bar[data-height]');

  if (!bars.length) return;

  if (prefersReducedMotion()) {
    bars.forEach(bar => {
      bar.style.height = bar.dataset.height + '%';
    });
    return;
  }

  // Animate bars when chart scrolls into view
  const chart = document.getElementById('marketChart');
  if (!chart) return;

  ScrollTrigger.create({
    trigger: chart,
    start: 'top 80%',
    onEnter: () => {
      bars.forEach((bar, i) => {
        setTimeout(() => {
          bar.style.height = bar.dataset.height + '%';
        }, i * 100);
      });
    },
    once: true,
  });
}

document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(initDashboard);
});
