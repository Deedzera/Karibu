/* ============================================
   KARIBU — Admin Dashboard JS
   Chart.js initialization + Sparklines
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  initSparklines();
  initCharts();
  initSectionAnimations();
});

/* ---- Sparkline SVG Generator ---- */
function initSparklines() {
  const sparklineConfigs = [
    {
      id: "sparkline-users",
      data: [1180, 1195, 1210, 1220, 1245, 1260, 1284],
      color: "#a78bfa",
    },
    {
      id: "sparkline-volume",
      data: [32, 35, 38, 40, 41, 43, 45.2],
      color: "#34B86A",
    },
    {
      id: "sparkline-revenue",
      data: [1.8, 2.0, 2.1, 2.3, 2.4, 2.6, 2.8],
      color: "#E8913A",
    },
    { id: "sparkline-disputes", data: [5, 4, 3, 3, 2, 2, 2], color: "#E5A832" },
  ];

  sparklineConfigs.forEach((cfg) => {
    const el = document.getElementById(cfg.id);
    if (!el) return;

    const w = 100,
      h = 40,
      pad = 4;
    const min = Math.min(...cfg.data);
    const max = Math.max(...cfg.data);
    const range = max - min || 1;

    const points = cfg.data.map((v, i) => {
      const x = pad + (i / (cfg.data.length - 1)) * (w - pad * 2);
      const y = h - pad - ((v - min) / range) * (h - pad * 2);
      return `${x},${y}`;
    });

    el.innerHTML = `
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-${cfg.id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${cfg.color}" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="${cfg.color}" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <polygon
          points="${pad},${h} ${points.join(" ")} ${w - pad},${h}"
          fill="url(#grad-${cfg.id})"
        />
        <polyline
          points="${points.join(" ")}"
          fill="none"
          stroke="${cfg.color}"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    `;
  });
}

/* ---- Chart.js Initialization ---- */
function initCharts() {
  if (typeof Chart === "undefined") return;

  // Global defaults for dark theme
  Chart.defaults.color = "#5A7A90";
  Chart.defaults.borderColor = "rgba(42, 63, 82, 0.4)";
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.font.size = 11;
  Chart.defaults.plugins.legend.display = false;
  Chart.defaults.plugins.tooltip.backgroundColor = "#1E3040";
  Chart.defaults.plugins.tooltip.titleColor = "#F0F4F8";
  Chart.defaults.plugins.tooltip.bodyColor = "#8BA4B8";
  Chart.defaults.plugins.tooltip.borderColor = "#2A3F52";
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.padding = 10;
  Chart.defaults.plugins.tooltip.cornerRadius = 8;
  Chart.defaults.plugins.tooltip.displayColors = false;

  initTransactionVolumeChart();
  initRevenueTrendChart();
  initMarketplaceActivityChart();
}

/* Chart A — Transaction Volume (30 days, area chart) */
function initTransactionVolumeChart() {
  const ctx = document.getElementById("chartTransactionVolume");
  if (!ctx) return;

  const labels = generateDayLabels(30);
  const data = [
    42, 48, 55, 50, 62, 58, 70, 75, 68, 80, 85, 78, 92, 88, 95, 102, 98, 110,
    105, 115, 120, 112, 128, 135, 130, 142, 148, 155, 160, 168,
  ];

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          data,
          borderColor: "#E8913A",
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: "#E8913A",
          tension: 0.4,
          fill: true,
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx: c, chartArea } = chart;
            if (!chartArea) return "transparent";
            const gradient = c.createLinearGradient(
              0,
              chartArea.top,
              0,
              chartArea.bottom,
            );
            gradient.addColorStop(0, "rgba(232, 145, 58, 0.2)");
            gradient.addColorStop(1, "rgba(232, 145, 58, 0)");
            return gradient;
          },
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { display: false },
          ticks: { maxTicksLimit: 7 },
        },
        y: {
          grid: { color: "rgba(42, 63, 82, 0.3)" },
          ticks: { maxTicksLimit: 5 },
          beginAtZero: true,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            title: (items) => `Dia ${items[0].label}`,
            label: (item) => `${item.raw} transacções`,
          },
        },
      },
    },
  });
}

/* Chart B — Revenue Trend (line chart with gradient) */
function initRevenueTrendChart() {
  const ctx = document.getElementById("chartRevenueTrend");
  if (!ctx) return;

  const labels = generateDayLabels(30);
  const data = [
    58, 62, 70, 65, 78, 82, 88, 92, 85, 95, 100, 105, 98, 112, 118, 125, 120,
    130, 138, 142, 135, 148, 155, 160, 158, 165, 172, 178, 185, 192,
  ];

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          data,
          borderColor: "#34B86A",
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: "#34B86A",
          tension: 0.4,
          fill: true,
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx: c, chartArea } = chart;
            if (!chartArea) return "transparent";
            const gradient = c.createLinearGradient(
              0,
              chartArea.top,
              0,
              chartArea.bottom,
            );
            gradient.addColorStop(0, "rgba(52, 184, 106, 0.2)");
            gradient.addColorStop(1, "rgba(52, 184, 106, 0)");
            return gradient;
          },
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { display: false },
          ticks: { maxTicksLimit: 7 },
        },
        y: {
          grid: { color: "rgba(42, 63, 82, 0.3)" },
          ticks: {
            maxTicksLimit: 5,
            callback: (v) => `${v}K Kz`,
          },
          beginAtZero: true,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            title: (items) => `Dia ${items[0].label}`,
            label: (item) => `${item.raw}K Kz receita`,
          },
        },
      },
    },
  });
}

/* Chart C — Marketplace Activity (grouped bar chart) */
function initMarketplaceActivityChart() {
  const ctx = document.getElementById("chartMarketplaceActivity");
  if (!ctx) return;

  const labels = ["Sem 1", "Sem 2", "Sem 3", "Sem 4"];

  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Novos Utilizadores",
          data: [35, 42, 38, 52],
          backgroundColor: "rgba(167, 139, 250, 0.7)",
          borderRadius: 4,
          borderSkipped: false,
        },
        {
          label: "Novos Fornecedores",
          data: [8, 12, 10, 15],
          backgroundColor: "rgba(232, 145, 58, 0.7)",
          borderRadius: 4,
          borderSkipped: false,
        },
        {
          label: "Transacções Completas",
          data: [28, 35, 32, 45],
          backgroundColor: "rgba(52, 184, 106, 0.7)",
          borderRadius: 4,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            padding: 16,
            font: { size: 11 },
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
        },
        y: {
          grid: { color: "rgba(42, 63, 82, 0.3)" },
          ticks: { maxTicksLimit: 5 },
          beginAtZero: true,
        },
      },
    },
  });
}

/* ---- Section Fade-In Animations ---- */
function initSectionAnimations() {
  const sections = document.querySelectorAll(".admin-section-animate");
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.05,
      rootMargin: "0px 0px -20px 0px",
    },
  );

  sections.forEach((el, i) => {
    el.style.transitionDelay = `${i * 60}ms`;
    observer.observe(el);
  });
}

/* ---- Helper: Generate day labels ---- */
function generateDayLabels(count) {
  const labels = [];
  const now = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    labels.push(`${d.getDate()}/${d.getMonth() + 1}`);
  }
  return labels;
}
