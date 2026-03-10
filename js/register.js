/* ============================================
   KARIBU — Registration Wizard Logic
   Multi-step navigation, validation, carousel
   ============================================ */

(function () {
  "use strict";

  const TOTAL_STEPS = 3;
  let currentStep = 0;

  // DOM references
  const body = document.getElementById("wizardBody");
  const steps = body.querySelectorAll(".wizard-step-content");
  const indicators = document.querySelectorAll(".wizard-step-indicator");
  const progressFill = document.getElementById("wizardProgressFill");
  const backBtn = document.getElementById("wizardBack");
  const nextBtn = document.getElementById("wizardNext");

  // ------- Step Navigation -------

  function updateUI() {
    // Progress bar
    const pct = ((currentStep + 1) / TOTAL_STEPS) * 100;
    progressFill.style.width = pct + "%";

    // Step indicators
    indicators.forEach((ind, i) => {
      ind.classList.remove("active", "completed");
      if (i < currentStep) ind.classList.add("completed");
      if (i === currentStep) ind.classList.add("active");

      // Replace number with check on completed
      const circle = ind.querySelector(".wizard-step-circle");
      circle.innerHTML = i < currentStep ? '<i class="ph ph-check"></i>' : (i + 1);
    });

    // Back button visibility
    backBtn.style.visibility = currentStep === 0 ? "hidden" : "visible";

    // Next button text
    if (currentStep === TOTAL_STEPS - 1) {
      nextBtn.innerHTML = 'Criar Conta <i class="ph ph-check-circle"></i>';
      nextBtn.setAttribute("type", "submit");
    } else {
      nextBtn.innerHTML = 'Continuar <i class="ph ph-arrow-right"></i>';
      nextBtn.setAttribute("type", "button");
    }
  }

  function showStep(index, direction) {
    if (index === currentStep) return;

    const prevStep = steps[currentStep];
    const nextStepEl = steps[index];
    const exitDir = direction === "forward" ? "-60px" : "60px";
    const enterDir = direction === "forward" ? "60px" : "-60px";

    // 1. Animate previous step OUT
    prevStep.style.transition = "opacity 0.25s ease, transform 0.25s ease";
    prevStep.style.transform = "translateX(" + exitDir + ")";
    prevStep.style.opacity = "0";

    setTimeout(function () {
      // 2. Hide previous step
      prevStep.classList.remove("active");
      prevStep.style.transition = "";
      prevStep.style.transform = "";
      prevStep.style.opacity = "";

      // 3. Prepare next step entry position (before making visible)
      nextStepEl.style.transition = "none";
      nextStepEl.style.transform = "translateX(" + enterDir + ")";
      nextStepEl.style.opacity = "0";
      nextStepEl.classList.add("active");

      // 4. Force reflow so the initial position is painted
      void nextStepEl.offsetWidth;

      // 5. Animate next step IN
      nextStepEl.style.transition = "opacity 0.35s ease, transform 0.35s ease";
      nextStepEl.style.transform = "translateX(0)";
      nextStepEl.style.opacity = "1";

      // 6. Update state
      currentStep = index;
      updateUI();

      // 7. Clean up inline styles after animation ends
      setTimeout(function () {
        nextStepEl.style.transition = "";
        nextStepEl.style.transform = "";
        nextStepEl.style.opacity = "";
      }, 400);

      // 8. Focus first input
      var firstInput = nextStepEl.querySelector("input, select");
      if (firstInput) setTimeout(function () { firstInput.focus(); }, 400);
    }, 280);
  }

  // ------- Validation -------

  function validateCurrentStep() {
    const step = steps[currentStep];
    const inputs = step.querySelectorAll("input[required], select[required]");
    let valid = true;

    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        valid = false;
        input.classList.add("form-input-error");
        // shake animation
        input.style.animation = "none";
        void input.offsetWidth;
        input.style.animation = "shakeInput 0.4s ease-out";
      } else {
        input.classList.remove("form-input-error");
      }
    });

    return valid;
  }

  // Shake animation for invalid inputs
  const shakeStyle = document.createElement("style");
  shakeStyle.textContent = `
    @keyframes shakeInput {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-6px); }
      40% { transform: translateX(6px); }
      60% { transform: translateX(-4px); }
      80% { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(shakeStyle);

  // Remove error styling on input
  document.querySelectorAll(".form-input").forEach((input) => {
    input.addEventListener("input", () => {
      input.classList.remove("form-input-error");
    });
  });

  // ------- Public API (exposed to window) -------

  window.wizardNextStep = function () {
    if (!validateCurrentStep()) return;

    if (currentStep < TOTAL_STEPS - 1) {
      showStep(currentStep + 1, "forward");
    } else {
      // Final step — submit
      handleRegister();
    }
  };

  window.wizardPrev = function () {
    if (currentStep > 0) {
      showStep(currentStep - 1, "backward");
    }
  };

  // ------- Password -------

  window.togglePassword = function (id, btn) {
    const input = document.getElementById(id);
    if (input.type === "password") {
      input.type = "text";
      btn.innerHTML = '<i class="ph ph-eye-slash"></i>';
    } else {
      input.type = "password";
      btn.innerHTML = '<i class="ph ph-eye"></i>';
    }
  };

  window.checkPasswordStrength = function (password) {
    const bars = [
      document.getElementById("str1"),
      document.getElementById("str2"),
      document.getElementById("str3"),
      document.getElementById("str4"),
    ];
    const text = document.getElementById("strText");
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = ["", "weak", "medium", "strong", "strong"];
    const labels = ["", "Fraca", "Razoável", "Forte", "Muito Forte"];
    const colors = [
      "",
      "var(--danger)",
      "var(--warning)",
      "var(--success)",
      "var(--success)",
    ];

    bars.forEach((bar, i) => {
      bar.className = "password-strength-bar";
      if (i < strength) bar.classList.add(levels[strength]);
    });

    text.textContent = password.length > 0 ? labels[strength] : "";
    text.style.color = colors[strength];
  };

  // ------- Submit -------

  window.handleRegister = function (e) {
    if (e) e.preventDefault();

    // Validate password match on final step
    const pw = document.getElementById("regPassword").value;
    const pwConfirm = document.getElementById("regPasswordConfirm").value;

    if (pw !== pwConfirm) {
      const confirmInput = document.getElementById("regPasswordConfirm");
      confirmInput.classList.add("form-input-error");
      confirmInput.style.animation = "none";
      void confirmInput.offsetWidth;
      confirmInput.style.animation = "shakeInput 0.4s ease-out";
      return;
    }

    alert("Registo simulado com sucesso! (Integração Supabase em breve)");
  };

  // ------- Showcase Carousel -------

  const slides = document.querySelectorAll(".showcase-slide");
  const dots = document.querySelectorAll(".showcase-dot");

  if (slides.length) {
    let slideIndex = 0;
    let slideInterval;

    function goToSlide(index) {
      slides[slideIndex].classList.remove("active");
      dots[slideIndex].classList.remove("active");
      slideIndex = (index + slides.length) % slides.length;
      slides[slideIndex].classList.add("active");
      dots[slideIndex].classList.add("active");
    }

    function startSlideshow() {
      slideInterval = setInterval(() => goToSlide(slideIndex + 1), 5000);
    }

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        clearInterval(slideInterval);
        goToSlide(parseInt(dot.dataset.slide));
        startSlideshow();
      });
    });

    startSlideshow();
  }

  // ------- Keyboard Navigation -------

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.tagName !== "BUTTON" && e.target.tagName !== "A") {
      e.preventDefault();
      window.wizardNextStep();
    }
  });

  // Initialize
  updateUI();
})();
