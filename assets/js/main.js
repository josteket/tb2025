import { stats, cases, featureFlags } from './data.js';
import { initThreeScene, disposeThreeScene } from './threeScene.js';
import { initScrollAnimations } from './animations.js';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function populateStats() {
  const container = document.querySelector('.stats-grid');
  if (!container) return;
  stats.forEach((item) => {
    const pill = document.createElement('article');
    pill.className = 'stat-pill';
    pill.innerHTML = `<strong>${item.value}</strong><span>${item.label}</span>`;
    container.appendChild(pill);
  });
}

function populateCases() {
  const grid = document.querySelector('.cases-grid');
  if (!grid) return;
  cases.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'case-card';
    card.setAttribute('role', 'listitem');
    card.innerHTML = `
      <div class="case-media">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
      </div>
      <div class="case-badge">Кейс</div>
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
      <ul class="case-tags">
        ${item.tags.map((tag) => `<li>${tag}</li>`).join('')}
      </ul>
      <button class="ghost-button" data-case="${item.title}">Подробнее</button>
    `;
    grid.appendChild(card);
  });
}

function setupModal() {
  const modal = document.getElementById('caseModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalSummary = document.getElementById('modalSummary');
  const modalResult = document.getElementById('modalResult');
  const modalTags = document.getElementById('modalTags');

  function openCase(title) {
    const item = cases.find((c) => c.title === title);
    if (!item) return;
    modalTitle.textContent = item.title;
    modalSummary.textContent = item.summary;
    modalResult.textContent = item.result;
    modalTags.innerHTML = item.tags.map((tag) => `<li>${tag}</li>`).join('');
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof HTMLElement) {
      if (target.matches('[data-case]')) {
        openCase(target.dataset.case);
      }
      if (target.hasAttribute('data-close')) {
        closeModal();
      }
    }
  });

  modal.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.hasAttribute('data-close')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });
}

function setupNavigation() {
  const header = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionMap = Array.from(navLinks).map((link) => ({
    link,
    id: link.getAttribute('href')
  }));

  function updateActiveLink() {
    const offset = window.innerHeight * 0.35;
    const fromTop = window.scrollY + offset;
    let currentId = '#hero';
    sectionMap.forEach(({ id }) => {
      const el = document.querySelector(id);
      if (!el) return;
      if (el.offsetTop <= fromTop) {
        currentId = id;
      }
    });
    navLinks.forEach((link) => {
      if (link.getAttribute('href') === currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function handleScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveLink();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.dataset.scrollTo) {
      event.preventDefault();
      const element = document.querySelector(target.dataset.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
}

function setupScrollProgress() {
  const button = document.getElementById('scrollTop');
  const indicator = button.querySelector('.progress-indicator');
  const circumference = 327;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    indicator.style.strokeDashoffset = `${circumference - circumference * progress}`;
    if (scrollTop > window.innerHeight * 0.5) {
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function setupCopyEmail() {
  const button = document.getElementById('copyEmail');
  if (!button) return;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('info@titans2059.ru');
      button.textContent = 'Скопировано!';
      setTimeout(() => {
        button.textContent = 'Скопировать email';
      }, 2000);
    } catch (error) {
      console.error('Clipboard error', error);
      button.textContent = 'Ошибка';
      setTimeout(() => {
        button.textContent = 'Скопировать email';
      }, 2000);
    }
  });
}

function setupPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      setTimeout(() => {
        preloader.remove();
      }, 800);
    }, 1200);
  });
}

function initCursorTrail() {
  if (!featureFlags.enableCursorTrail || prefersReducedMotion) return;
  const trailElements = [];
  const trailLength = 12;

  for (let i = 0; i < trailLength; i += 1) {
    const dot = document.createElement('span');
    dot.className = 'cursor-trail-dot';
    document.body.appendChild(dot);
    trailElements.push({ element: dot, x: 0, y: 0 });
  }

  let pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  window.addEventListener('pointermove', (event) => {
    pointer = { x: event.clientX, y: event.clientY };
  });

  function updateTrail() {
    trailElements.forEach((item, index) => {
      const next = trailElements[index - 1] || pointer;
      item.x += ((index === 0 ? pointer.x : next.x) - item.x) * 0.2;
      item.y += ((index === 0 ? pointer.y : next.y) - item.y) * 0.2;
      item.element.style.transform = `translate(${item.x}px, ${item.y}px)`;
      item.element.style.opacity = `${1 - index / trailLength}`;
    });
    requestAnimationFrame(updateTrail);
  }
  requestAnimationFrame(updateTrail);
}

function applyLowMotionFallback() {
  if (!prefersReducedMotion) return;
  document.body.classList.add('reduced-motion');
}

function init() {
  populateStats();
  populateCases();
  setupModal();
  setupNavigation();
  setupScrollProgress();
  setupCopyEmail();
  setupPreloader();
  initCursorTrail();
  applyLowMotionFallback();

  const cleanupThree = initThreeScene({ canvas: document.getElementById('heroCanvas'), flags: featureFlags });
  initScrollAnimations({ flags: featureFlags });

  window.addEventListener('beforeunload', () => {
    cleanupThree?.();
    disposeThreeScene();
  });
}

init();
