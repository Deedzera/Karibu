/* ---- Countdown Timer Component ---- */

class CountdownTimer {
  constructor(element, targetDate) {
    this.element = element;
    this.targetDate = new Date(targetDate).getTime();
    this.daysEl = element.querySelector('[data-days]');
    this.hoursEl = element.querySelector('[data-hours]');
    this.minutesEl = element.querySelector('[data-minutes]');
    this.secondsEl = element.querySelector('[data-seconds]');
    this.interval = null;
    this.urgentThreshold = 2 * 60 * 60 * 1000; // 2 hours
    this.start();
  }

  start() {
    this.update();
    this.interval = setInterval(() => this.update(), 1000);
  }

  update() {
    const now = Date.now();
    const diff = this.targetDate - now;

    if (diff <= 0) {
      this.stop();
      this.element.classList.add('expired');
      if (this.daysEl) this.daysEl.textContent = '00';
      if (this.hoursEl) this.hoursEl.textContent = '00';
      if (this.minutesEl) this.minutesEl.textContent = '00';
      if (this.secondsEl) this.secondsEl.textContent = '00';
      return;
    }

    // Add urgency class when < 2h
    if (diff <= this.urgentThreshold) {
      this.element.classList.add('urgent');
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (this.daysEl) this.daysEl.textContent = String(days).padStart(2, '0');
    if (this.hoursEl) this.hoursEl.textContent = String(hours).padStart(2, '0');
    if (this.minutesEl) this.minutesEl.textContent = String(minutes).padStart(2, '0');
    if (this.secondsEl) this.secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

// Auto-init countdowns on page load
function initCountdowns() {
  document.querySelectorAll('[data-countdown]').forEach(el => {
    const target = el.getAttribute('data-countdown');
    if (target) {
      new CountdownTimer(el, target);
    }
  });
}

document.addEventListener('DOMContentLoaded', initCountdowns);
