/* ---- Karibu App — Global JS (Enhanced) ---- */

// Mobile menu toggle
function initMobileMenu() {
  const toggle = document.querySelector('.header-menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu-close');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      menu.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close on backdrop click
  menu.addEventListener('click', (e) => {
    if (e.target === menu) {
      menu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// Scroll-based header effect
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });
}

// Enhanced Intersection Observer for scroll animations with stagger
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-visible');

        // Stagger children if present
        const children = entry.target.querySelectorAll('.anim-stagger-child');
        children.forEach((child, i) => {
          child.style.setProperty('--anim-order', i);
          // Small delay then trigger
          requestAnimationFrame(() => {
            child.classList.add('anim-child-visible');
          });
        });

        // Auto-stagger direct children of grids/lists
        const autoStaggerSelectors = [
          '.product-card',
          '.cart-card',
          '.trust-badge',
          '.testimonial',
          '.category-pill',
          '.step',
          '.supplier-item',
          '.review-item',
          '.profile-section',
          '.doc-row',
          '.settings-row',
          '.info-item'
        ];

        autoStaggerSelectors.forEach(sel => {
          const items = entry.target.querySelectorAll(sel);
          items.forEach((item, i) => {
            item.style.transitionDelay = `${i * 80}ms`;
          });
        });

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  document.querySelectorAll('.anim-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Animated number counter
function initCounterAnimations() {
  const counters = document.querySelectorAll('.hero-stat-value, .profile-stat-value, .reviews-score');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        const match = text.match(/^([\d,.]+)(.*)$/);

        if (match) {
          const targetNum = parseFloat(match[1].replace(/[.,]/g, ''));
          const suffix = match[2] || '';
          const hasDecimal = match[1].includes('.');
          const hasDot = match[1].includes(',') || match[1].includes('.');
          const duration = 1200;
          const startTime = performance.now();

          function updateCounter(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.round(targetNum * ease);

            if (hasDecimal) {
              const decimalTarget = parseFloat(match[1]);
              const currentDecimal = (decimalTarget * ease).toFixed(1);
              el.textContent = currentDecimal + suffix;
            } else {
              // Format with dots for thousands
              const formatted = currentVal.toLocaleString('pt-AO').replace(/\s/g, '.');
              el.textContent = formatted + suffix;
            }

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              // Restore original text
              el.textContent = text;
            }
          }

          requestAnimationFrame(updateCounter);
        }

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

// Countdown timer
function initCountdowns() {
  const countdowns = document.querySelectorAll('[data-countdown]');
  if (!countdowns.length) return;

  function updateCountdown() {
    countdowns.forEach(countdown => {
      const target = new Date(countdown.dataset.countdown).getTime();
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const daysEl = countdown.querySelector('[data-days]');
      const hoursEl = countdown.querySelector('[data-hours]');
      const minutesEl = countdown.querySelector('[data-minutes]');
      const secondsEl = countdown.querySelector('[data-seconds]');

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');

      // Add urgent class if less than 48 hours
      if (diff < 48 * 60 * 60 * 1000 && diff > 0) {
        countdown.classList.add('urgent');
      }
    });
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Chart line draw animation
function initChartAnimation() {
  const chartLines = document.querySelectorAll('.chart-line');
  if (!chartLines.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('drawn');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  chartLines.forEach(line => observer.observe(line));
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Close mobile menu if open
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  });
}

// Toast notification system
function showToast(type, title, message, duration = 4000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: '<i class="ph-fill ph-check-circle" style="color: var(--success)"></i>',
    error: '<i class="ph-fill ph-x-circle" style="color: var(--danger)"></i>',
    warning: '<i class="ph-fill ph-warning" style="color: var(--warning)"></i>',
    info: '<i class="ph-fill ph-info"></i>'
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || '<i class="ph-fill ph-info"></i>'}</span>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" onclick="this.closest('.toast').remove()"><i class="ph ph-x"></i></button>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

// Init all
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  initScrollAnimations();
  initCounterAnimations();
  initCountdowns();
  initChartAnimation();
  initSmoothScroll();
});
