import * as THREE from "https://unpkg.com/three@0.161.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.161.0/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "https://unpkg.com/three@0.161.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://unpkg.com/three@0.161.0/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "https://unpkg.com/three@0.161.0/examples/jsm/postprocessing/UnrealBloomPass.js";
import { FilmPass } from "https://unpkg.com/three@0.161.0/examples/jsm/postprocessing/FilmPass.js";
import { BufferGeometryUtils } from "https://unpkg.com/three@0.161.0/examples/jsm/utils/BufferGeometryUtils.js";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const cases = [
  {
    title: "Поставка и внедрение оборудования",
    summary: "Сжали сроки с 21 до 12 дней. Ноль претензий на приёмке.",
    result: "Все этапы прошли без замечаний, проект закрыт актами в срок.",
    tags: ["#логистика", "#время"],
    image: "assets/images/placeholder.svg"
  },
  {
    title: "Сервис и монтаж",
    summary: "Работали в действующем объекте без остановки процесса. 0 инцидентов.",
    result: "Персонал заказчика продолжил работу без простоев, сервисное окно выдержано.",
    tags: ["#монтаж", "#безопасность"],
    image: "assets/images/placeholder.svg"
  },
  {
    title: "Срочный проект «вчера»",
    summary: "Запуск за 48 часов. Документы и отгрузка — в срок.",
    result: "Закрыли критический запрос, избежали штрафов и простоя площадки.",
    tags: ["#экстренно", "#сроки"],
    image: "assets/images/placeholder.svg"
  },
  {
    title: "Модернизация линии",
    summary: "Полный демонтаж старого оборудования и запуск обновлённого контура.",
    result: "Сэкономили клиенту 18% бюджета за счёт оптимизации логистики.",
    tags: ["#инжиниринг", "#экономия"],
    image: "assets/images/placeholder.svg"
  },
  {
    title: "Диспетчеризация сервисной сети",
    summary: "Внедрили цифровой контроль и прозрачную отчётность.",
    result: "Сократили время реакции на заявки до 30 минут по всей сети.",
    tags: ["#цифровизация", "#контроль"],
    image: "assets/images/placeholder.svg"
  },
  {
    title: "Контроль качества поставок",
    summary: "Выстроили многоступенчатый контроль: входной, промежуточный и финальный.",
    result: "Снижение рекламаций до статистической погрешности.",
    tags: ["#качество", "#процессы"],
    image: "assets/images/placeholder.svg"
  }
];

function setupPreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("is-hidden");
    }, 600);
  });
}

function drawGridBackground() {
  const canvas = document.getElementById("grid-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const resize = () => {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    renderGrid();
  };

  const renderGrid = () => {
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    const spacing = 80 * window.devicePixelRatio;
    ctx.strokeStyle = "rgba(0, 229, 255, 0.08)";
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  resize();
  window.addEventListener("resize", resize);
}

// Процедурный шлем. Заменить на реальный GLB в assets/models/ при наличии фирменного ассета.
function createHelmetGeometry() {
  const helmet = new THREE.LatheGeometry(
    Array.from({ length: 24 }, (_, i) => {
      const radius = 0.4 + Math.sin((i / 24) * Math.PI) * 0.2;
      const y = (i / 24) * 1.5;
      return new THREE.Vector2(radius, y);
    })
  );
  helmet.scale(1.2, 1.4, 1.2);

  const visor = new THREE.SphereGeometry(0.6, 32, 32, 0, Math.PI);
  visor.scale(1, 0.7, 1.2);
  visor.translate(0, 0.5, 0.35);

  const base = new THREE.CylinderGeometry(0.8, 0.9, 0.3, 24);
  base.translate(0, -0.9, 0);

  const merged = BufferGeometryUtils.mergeGeometries([helmet, visor, base], false);
  merged.computeVertexNormals();
  return merged;
}

function createNormalTexture(size = 64) {
  const data = new Uint8Array(size * size * 4);
  for (let i = 0; i < size * size; i++) {
    const stride = i * 4;
    data[stride] = 128 + Math.random() * 60;
    data[stride + 1] = 128 + Math.random() * 60;
    data[stride + 2] = 128 + Math.random() * 60;
    data[stride + 3] = 255;
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.needsUpdate = true;
  return texture;
}

function initHeroScene() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2("#02080f", 0.15);

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0.6, 3);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
  renderer.setClearColor(0x000000, 0);

  const controls = new OrbitControls(camera, canvas);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.maxPolarAngle = Math.PI / 2.4;
  controls.minPolarAngle = Math.PI / 3;

  const helmetGeometry = createHelmetGeometry();
  const helmetMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#cfd8e3"),
    metalness: 0.85,
    roughness: 0.3,
    envMapIntensity: 1.2,
    normalMap: createNormalTexture()
  });

  const helmet = new THREE.Mesh(helmetGeometry, helmetMaterial);
  helmet.castShadow = true;
  scene.add(helmet);

  const ringGeometry = new THREE.RingGeometry(1.2, 1.6, 64);
  const ringMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color("#00e5ff"), transparent: true, opacity: 0.32, side: THREE.DoubleSide });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = Math.PI / 2;
  scene.add(ring);

  const planeGeometry = new THREE.PlaneGeometry(6, 6);
  const planeMaterial = new THREE.MeshStandardMaterial({ color: "#0b1e2d", metalness: 0.8, roughness: 0.5, transparent: true, opacity: 0.55 });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -1.2;
  plane.receiveShadow = true;
  scene.add(plane);

  const particleCount = prefersReducedMotion ? 300 : 1200;
  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const radius = 4 * Math.random();
    const angle = Math.random() * Math.PI * 2;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
  }
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particleMaterial = new THREE.PointsMaterial({ color: new THREE.Color("#00e5ff"), size: 0.03, transparent: true, opacity: 0.65 });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  const ambient = new THREE.AmbientLight("#ffffff", 0.6);
  scene.add(ambient);
  const dirLight = new THREE.DirectionalLight("#ffffff", 1.8);
  dirLight.position.set(3, 4, 5);
  scene.add(dirLight);
  const spot = new THREE.SpotLight("#a855f7", 1.2, 12, Math.PI / 3, 0.6, 0.7);
  spot.position.set(-3, 2, -3);
  scene.add(spot);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  if (!prefersReducedMotion) {
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 1.2, 0.85, 0.2);
    const film = new FilmPass(0.35, 0.5, 2048, false);
    composer.addPass(bloom);
    composer.addPass(film);
  }

  const clock = new THREE.Clock();
  const pointer = new THREE.Vector2(0, 0);

  const resize = () => {
    const { clientWidth, clientHeight } = canvas;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight, false);
    composer.setSize(clientWidth, clientHeight);
  };

  const setCanvasSize = () => {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    resize();
  };

  setCanvasSize();
  window.addEventListener("resize", setCanvasSize);

  const onPointerMove = (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  window.addEventListener("pointermove", onPointerMove);

  const animate = () => {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();
    helmet.rotation.y += 0.005;
    helmet.rotation.y += pointer.x * 0.003;
    helmet.rotation.x = Math.sin(elapsed * 0.5) * 0.1;
    helmet.scale.setScalar(1 + Math.sin(elapsed * 1.8) * 0.015);
    ring.rotation.z = elapsed * 0.2;
    ring.material.opacity = 0.25 + Math.sin(elapsed * 2) * 0.08;
    particles.rotation.y = elapsed * 0.04;
    controls.update();
    composer.render();
  };

  animate();
}

function renderCases() {
  const grid = document.getElementById("cases-grid");
  if (!grid) return;
  grid.innerHTML = "";
  cases.forEach((item) => {
    const card = document.createElement("article");
    card.className = "case-card";
    card.tabIndex = 0;
    card.innerHTML = `
      <img src="${item.image}" alt="Заглушка кейса" />
      <div class="case-card__body">
        <h3 class="case-card__title">${item.title}</h3>
        <p class="case-card__summary">${item.summary}</p>
        <p class="case-card__result">${item.result}</p>
        <div class="case-card__tags">
          ${item.tags.map((tag) => `<span class="case-card__tag">${tag}</span>`).join("")}
        </div>
        <div class="cases__cta">
          <button class="button button--secondary" type="button">Подробнее</button>
        </div>
      </div>
    `;
    card.querySelector("button")?.addEventListener("click", () => openCaseDialog(item));
    card.addEventListener("keypress", (event) => {
      if (event.key === "Enter") openCaseDialog(item);
    });
    grid.appendChild(card);
  });
}

function openCaseDialog(item) {
  const dialog = document.getElementById("case-dialog");
  if (!dialog) return;
  dialog.classList.add("is-open");
  dialog.setAttribute("aria-hidden", "false");
  const image = document.getElementById("case-dialog-image");
  const title = document.getElementById("case-dialog-title");
  const summary = document.getElementById("case-dialog-summary");
  const result = document.getElementById("case-dialog-result");
  const tags = document.getElementById("case-dialog-tags");
  if (image) image.src = item.image;
  if (title) title.textContent = item.title;
  if (summary) summary.textContent = item.summary;
  if (result) result.textContent = item.result;
  if (tags) {
    tags.innerHTML = item.tags.map((tag) => `<span>${tag}</span>`).join("");
  }
}

function setupDialog() {
  const dialog = document.getElementById("case-dialog");
  if (!dialog) return;
  const closeElements = dialog.querySelectorAll("[data-dialog-close]");
  closeElements.forEach((el) => {
    el.addEventListener("click", () => closeDialog());
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDialog();
  });
}

function closeDialog() {
  const dialog = document.getElementById("case-dialog");
  if (!dialog) return;
  dialog.classList.remove("is-open");
  dialog.setAttribute("aria-hidden", "true");
}

function setupSmoothScroll() {
  const buttons = document.querySelectorAll("[data-scroll-target]");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const target = button.getAttribute("data-scroll-target");
      if (!target) return;
      const el = document.querySelector(target);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  });
}

function setupScrollTop() {
  const btn = document.getElementById("scroll-top");
  if (!btn) return;
  const progress = btn.querySelector(".scroll-top__progress");
  const pathLength = 2 * Math.PI * 20;
  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = docHeight > 0 ? scrollTop / docHeight : 0;
    if (progress) {
      progress.style.strokeDasharray = `${pathLength}`;
      progress.style.strokeDashoffset = `${pathLength * (1 - ratio)}`;
    }
    if (scrollTop > 200) {
      btn.classList.add("is-visible");
    } else {
      btn.classList.remove("is-visible");
    }
  };
  window.addEventListener("scroll", update);
  update();
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}

function setupCounters() {
  const stats = document.querySelectorAll(".stat");
  if (!stats.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = Number(el.getAttribute("data-counter"));
          const valueEl = el.querySelector(".stat__value");
          if (!valueEl || valueEl.dataset.animated === "true") return;
          valueEl.dataset.animated = "true";
          const duration = prefersReducedMotion ? 0 : 1200;
          const start = performance.now();
          const animate = (now) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = prefersReducedMotion ? 1 : 1 - Math.pow(1 - progress, 3);
            valueEl.textContent = Math.floor(target * eased).toString();
            if (progress < 1) requestAnimationFrame(animate);
            else valueEl.textContent = target.toString();
          };
          requestAnimationFrame(animate);
        }
      });
    },
    { threshold: 0.4 }
  );
  stats.forEach((stat) => observer.observe(stat));
}

function setupCopyEmail() {
  const copyBtn = document.getElementById("copy-email");
  if (!copyBtn) return;
  copyBtn.addEventListener("click", async () => {
    const email = copyBtn.getAttribute("data-email");
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      copyBtn.textContent = "Скопировано";
      setTimeout(() => {
        copyBtn.textContent = "Скопировать email";
      }, 1500);
    } catch (error) {
      console.warn("Clipboard unavailable", error);
    }
  });
}

function setupHeader() {
  const header = document.querySelector(".site-header");
  const navLinks = document.querySelectorAll(".site-nav__link");
  if (!header) return;
  const update = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 50);
    const fromTop = window.scrollY + 120;
    navLinks.forEach((link) => {
      const section = document.querySelector(link.getAttribute("href"));
      if (!section) return;
      const offsetTop = section.offsetTop;
      const offsetBottom = offsetTop + section.offsetHeight;
      const isActive = fromTop >= offsetTop && fromTop < offsetBottom;
      link.classList.toggle("is-active", isActive);
    });
  };
  window.addEventListener("scroll", update);
  update();
}

function setupCursorTrail() {
  if (prefersReducedMotion || window.innerWidth < 768) return;
  const layer = document.getElementById("cursor-trail");
  if (!layer) return;
  let lastSpawn = 0;
  window.addEventListener("pointermove", (event) => {
    const now = performance.now();
    if (now - lastSpawn < 30) return;
    lastSpawn = now;
    const dot = document.createElement("span");
    dot.className = "cursor-trail__dot";
    dot.style.left = `${event.clientX}px`;
    dot.style.top = `${event.clientY}px`;
    layer.appendChild(dot);
    setTimeout(() => dot.remove(), 800);
  });
}

function setupGsapAnimations() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined" || prefersReducedMotion) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray(".section-heading").forEach((heading) => {
    gsap.from(heading, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: heading,
        start: "top 85%"
      }
    });
  });
  gsap.utils.toArray(".case-card").forEach((card, i) => {
    gsap.from(card, {
      y: 80,
      opacity: 0,
      rotateX: -8,
      duration: 1,
      delay: i * 0.08,
      ease: "power4.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%"
      }
    });
  });
  gsap.to("body", {
    backgroundPosition: "0px 200px, 0px -200px",
    ease: "none",
    scrollTrigger: {
      scrub: true
    }
  });
}

setupPreloader();
drawGridBackground();
renderCases();
setupDialog();
setupSmoothScroll();
setupScrollTop();
setupCounters();
setupCopyEmail();
setupHeader();
setupCursorTrail();
setupGsapAnimations();
initHeroScene();
