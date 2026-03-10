/* ============================================
   KARIBU — Welcome Onboarding Walkthrough
   Drag / Swipe / Keyboard navigation
   ============================================ */

(function () {
  "use strict";

  const slidesWrapper = document.getElementById("welcomeSlides");
  const slides = document.querySelectorAll(".welcome-slide");
  const dots = document.querySelectorAll(".welcome-dot");
  const nextBtn = document.getElementById("welcomeNext");
  const skipBtn = document.getElementById("welcomeSkip");
  const totalSlides = slides.length;

  let currentSlide = 0;
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let moveX = 0;
  const SWIPE_THRESHOLD = 50;

  // ------- Navigation -------

  function goTo(index) {
    if (index < 0 || index >= totalSlides) return;

    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    currentSlide = index;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");

    slidesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update button text
    if (currentSlide === totalSlides - 1) {
      nextBtn.innerHTML = 'Começar <i class="ph ph-arrow-right"></i>';
    } else {
      nextBtn.innerHTML = 'Seguinte <i class="ph ph-arrow-right"></i>';
    }

    // Hide skip on last slide
    skipBtn.style.opacity = currentSlide === totalSlides - 1 ? "0" : "1";
    skipBtn.style.pointerEvents = currentSlide === totalSlides - 1 ? "none" : "auto";
  }

  function next() {
    if (currentSlide === totalSlides - 1) {
      finish();
    } else {
      goTo(currentSlide + 1);
    }
  }

  function prev() {
    goTo(currentSlide - 1);
  }

  function finish() {
    // Store that onboarding was seen
    try {
      localStorage.setItem("karibu_onboarding_seen", "true");
    } catch (e) { /* silently fail */ }

    // Navigate to login
    window.location.href = "/pages/login.html";
  }

  // ------- Button Listeners -------

  nextBtn.addEventListener("click", next);
  skipBtn.addEventListener("click", finish);

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      goTo(parseInt(dot.dataset.slide));
    });
  });

  // ------- Mouse Drag -------

  slidesWrapper.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    currentX = startX;
    slidesWrapper.classList.add("grabbing");
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
    moveX = currentX - startX;
    const baseTranslate = -(currentSlide * 100);
    const dragPercent = (moveX / window.innerWidth) * 100;
    slidesWrapper.style.transform = `translateX(${baseTranslate + dragPercent}%)`;
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    slidesWrapper.classList.remove("grabbing");
    handleSwipeEnd();
  });

  // ------- Touch Swipe -------

  slidesWrapper.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    currentX = startX;
    slidesWrapper.classList.add("grabbing");
  }, { passive: true });

  slidesWrapper.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    moveX = currentX - startX;
    const baseTranslate = -(currentSlide * 100);
    const dragPercent = (moveX / window.innerWidth) * 100;
    slidesWrapper.style.transform = `translateX(${baseTranslate + dragPercent}%)`;
  }, { passive: true });

  slidesWrapper.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    slidesWrapper.classList.remove("grabbing");
    handleSwipeEnd();
  });

  function handleSwipeEnd() {
    moveX = currentX - startX;

    if (Math.abs(moveX) > SWIPE_THRESHOLD) {
      if (moveX < 0 && currentSlide < totalSlides - 1) {
        next();
      } else if (moveX > 0 && currentSlide > 0) {
        prev();
      } else {
        goTo(currentSlide); // snap back
      }
    } else {
      goTo(currentSlide); // snap back
    }

    moveX = 0;
  }

  // ------- Keyboard Navigation -------

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      next();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      prev();
    } else if (e.key === "Escape") {
      finish();
    }
  });

  // ------- Init -------

  // Mark first slide as active
  slides[0].classList.add("active");
  goTo(0);
})();
