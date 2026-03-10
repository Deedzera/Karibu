/* ---- Karibu App — Global JS ---- */

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

// Intersection Observer for scroll animations
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.anim-on-scroll').forEach(el => {
    observer.observe(el);
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
});
