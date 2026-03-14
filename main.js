// ═══════════════════════════════════════════════════════════════════
// FOG ANIMADO EN EL HERO SECTION
// ═══════════════════════════════════════════════════════════════════

const shouldDisableHeavyEffects = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveDataEnabled = Boolean(navigator.connection && navigator.connection.saveData);
  const lowCoreCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
  const lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4;

  return prefersReducedMotion || saveDataEnabled || lowCoreCpu || lowMemory;
};

const optimizeImageLoading = () => {
  const images = document.querySelectorAll('img');
  images.forEach((image, index) => {
    if (!image.hasAttribute('decoding')) {
      image.decoding = 'async';
    }
    if (index > 1 && !image.hasAttribute('loading')) {
      image.loading = 'lazy';
    }
    if (index > 1 && !image.hasAttribute('fetchpriority')) {
      image.setAttribute('fetchpriority', 'low');
    }
  });
};

optimizeImageLoading();

// ═══════════════════════════════════════════════════════════════════
// BANNER ANIMADO
// ═══════════════════════════════════════════════════════════════════

const initHeroParallax = () => {
  const hero = document.querySelector('.hero');
  const leftJersey = document.querySelector('.hero-player-bg');
  const rightJersey = document.querySelector('.hero-player-bg-right');
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  if (!hero || !leftJersey || !rightJersey || isMobile || shouldDisableHeavyEffects()) return;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  let rafId = null;

  const updateParallax = () => {
    rafId = null;
    const rect = hero.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const heroMid = rect.top + rect.height / 2;
    const viewportMid = viewportHeight / 2;
    const distance = (heroMid - viewportMid) / viewportMid;
    const progress = clamp(distance, -1, 1);

    leftJersey.style.setProperty('--parallax-x', `${progress * -46}px`);
    leftJersey.style.setProperty('--parallax-y', `${progress * 34}px`);
    rightJersey.style.setProperty('--parallax-x', `${progress * 46}px`);
    rightJersey.style.setProperty('--parallax-y', `${progress * 52}px`);

  };

  const requestUpdate = () => {
    if (rafId) return;
    rafId = window.requestAnimationFrame(updateParallax);
  };

  updateParallax();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
};

initHeroParallax();

const bannerContenido = document.querySelector('.banner-contenido');
if (bannerContenido) {
  // Duplicar el contenido para efecto infinito sin reinicio
  const contenidoOriginal = bannerContenido.innerHTML;
  bannerContenido.innerHTML = contenidoOriginal + contenidoOriginal;
}

// ═══════════════════════════════════════════════════════════════════
// PARTÍCULAS EN EL HERO SECTION
// ═══════════════════════════════════════════════════════════════════

(async () => {
  const particlesContainer = document.getElementById('particles-hero');
  
  if (!particlesContainer || typeof window.tsParticles === 'undefined') return;

  // Inicializar tsParticles
  await tsParticles.load('particles-hero', {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: ['#6d9f7f', '#8db89c', '#5a8d6e'],
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: 0.5,
        random: {
          enable: true,
          minimumValue: 0.2,
        },
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0.2,
          sync: false,
        },
      },
      size: {
        value: {
          min: 1,
          max: 3,
        },
        random: {
          enable: true,
          minimumValue: 1,
        },
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 1,
          sync: false,
        },
      },
      move: {
        enable: true,
        speed: {
          min: 0.5,
          max: 2,
        },
        direction: 'none',
        random: true,
        straight: false,
        outModes: {
          default: 'out',
        },
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
      links: {
        enable: true,
        distance: 150,
        color: '#6d9f7f',
        opacity: 0.3,
        width: 1,
      },
    },
    fullScreen: {
      enable: false,
      zIndex: 1,
    },
    detectRetina: true,
    background: {
      color: 'transparent',
    },
  });
})();

// ═══════════════════════════════════════════════════════════════════
// FUNCIONALIDAD DEL MENÚ HAMBURGUESA
// ═══════════════════════════════════════════════════════════════════

const menuHamburguesa = document.getElementById('menuHamburguesa');
const navLinksMobile = document.getElementById('navLinksMobile');

if (menuHamburguesa && navLinksMobile && menuHamburguesa.dataset.menuBound !== 'true') {
  menuHamburguesa.dataset.menuBound = 'true';

  const openMobileMenu = () => {
    menuHamburguesa.classList.add('active');
    menuHamburguesa.setAttribute('aria-expanded', 'true');
    navLinksMobile.classList.add('active');
    document.body.classList.add('menu-open');
  };

  const closeMobileMenu = () => {
    menuHamburguesa.classList.remove('active');
    menuHamburguesa.setAttribute('aria-expanded', 'false');
    navLinksMobile.classList.remove('active');
    document.body.classList.remove('menu-open');
  };

  menuHamburguesa.addEventListener('click', () => {
    const isOpen = navLinksMobile.classList.contains('active');
    if (isOpen) {
      closeMobileMenu();
      return;
    }
    openMobileMenu();
  });

  // Cerrar menú cuando se hace click en un enlace
  const mobileLinks = navLinksMobile.querySelectorAll('a');
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Cerrar menú al hacer click fuera del navbar
  document.addEventListener('click', (event) => {
    if (!navLinksMobile.classList.contains('active')) return;
    if (event.target.closest('.navbar')) return;
    closeMobileMenu();
  });

  // Cerrar menú con tecla Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMobileMenu();
    }
  });

  // Si vuelve a desktop, asegurar estado cerrado
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
}

// ═══════════════════════════════════════════════════════════════════
// FUNCIONALIDAD DE FILTROS
// ═══════════════════════════════════════════════════════════════════
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Remover clase activa de todos los botones
    filterBtns.forEach((b) => b.classList.remove('active'));
    // Agregar clase activa al botón clickeado
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');
    // Filtrar productos
    productCards.forEach((card) => {
      if (filterValue === 'todos') {
        card.style.display = 'block';
      } else {
        const category = card.getAttribute('data-category');
        card.style.display = category === filterValue ? 'block' : 'none';
      }
    });
  });
});

// ═══════════════════════════════════════════════════════════════════
// FUNCIONALIDAD DE PREGUNTAS FRECUENTES - DOS COLUMNAS
// ═══════════════════════════════════════════════════════════════════

const faqQuestionBtns = document.querySelectorAll('.faq-question-btn');
const faqAnswerItems = document.querySelectorAll('.faq-answer-item');

faqQuestionBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const index = btn.getAttribute('data-index');

    // Remover clase activa de todos los botones y respuestas
    faqQuestionBtns.forEach((b) => b.classList.remove('active'));
    faqAnswerItems.forEach((item) => item.classList.remove('active'));

    // Agregar clase activa al botón y respuesta clickeado
    btn.classList.add('active');
    document.querySelector(`.faq-answer-item[data-index="${index}"]`).classList.add('active');
  });
});

// ────────────────────────────────────────────────────────────────────────────
// CAROUSEL DRAG (DESKTOP: click + drag like touch)
// ────────────────────────────────────────────────────────────────────────────
const carousels = document.querySelectorAll('.carousel');
carousels.forEach((carousel) => {
  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;
  let moved = false;
  let lastDragTime = 0;

  const onPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    isDragging = true;
    moved = false;
    startX = event.clientX;
    startScrollLeft = carousel.scrollLeft;
    carousel.dataset.prevScrollBehavior = carousel.style.scrollBehavior || '';
    carousel.style.scrollBehavior = 'auto';
    carousel.classList.add('is-dragging');
    carousel.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!isDragging) return;
    const deltaX = event.clientX - startX;
    if (Math.abs(deltaX) > 3) {
      moved = true;
    }
    carousel.scrollLeft = startScrollLeft - deltaX;
    if (moved) {
      event.preventDefault();
    }
  };

  const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    carousel.classList.remove('is-dragging');
    if (carousel.dataset.prevScrollBehavior !== undefined) {
      carousel.style.scrollBehavior = carousel.dataset.prevScrollBehavior;
      delete carousel.dataset.prevScrollBehavior;
    }
    if (moved) {
      lastDragTime = Date.now();
    }
  };

  carousel.addEventListener('pointerdown', onPointerDown);
  carousel.addEventListener('pointermove', onPointerMove);
  carousel.addEventListener('pointerup', endDrag);
  carousel.addEventListener('pointercancel', endDrag);
  carousel.addEventListener('pointerleave', endDrag);

  carousel.addEventListener('click', (event) => {
    if (Date.now() - lastDragTime < 250) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SEGUIMIENTO DE PEDIDOS
// ─────────────────────────────────────────────────────────────────────────────
const trackingForm = document.querySelector('.tracking-form');
if (trackingForm) {
  const trackingInput = trackingForm.querySelector('#trackingCode');
  const trackingBtn = trackingForm.querySelector('.tracking-btn');
  const trackingStepsList = document.querySelector('.tracking-steps-list');
  const trackingStatus = document.querySelector('.tracking-status');
  const trackingStepItems = document.querySelectorAll('.tracking-step');

  const normalizeCode = (value) => value.trim().toUpperCase();

  const mapEstadoToStep = (estado) => {
    switch (estado) {
      case 'contacto':
      case 'aprobacion':
      case 'diseno':
        return 'diseno';
      case 'produccion':
      case 'produccion_prenda':
        return 'produccion_prenda';
      case 'personalizacion':
        return 'personalizacion';
      case 'control':
      case 'control_entrega':
        return 'control_entrega';
      case 'finalizado':
        return 'finalizado';
      default:
        return null;
    }
  };

  const setStepsVisible = (visible) => {
    if (!trackingStepsList) return;
    trackingStepsList.classList.toggle('is-hidden', !visible);
  };

  const setActiveStep = (stepId) => {
    trackingStepItems.forEach((item) => {
      const isActive = stepId && item.dataset.step === stepId;
      item.classList.toggle('is-active', isActive);
      item.classList.toggle('is-dim', Boolean(stepId) && !isActive);
    });
  };

  const defaultTrackingMessage =
    'Colocá el código proporcionado por nuestro equipo de trabajo para seguir la producción de tu pedido.';

  const updateStatus = (message) => {
    if (!trackingStatus) return;
    trackingStatus.textContent = message;
  };

  const findOrderByCode = (code) => {
    if (!code) return null;
    try {
      const orders = JSON.parse(localStorage.getItem('dashboardOrders')) || [];
      return orders.find((order) => normalizeCode(order.codigo || '') === code) || null;
    } catch (error) {
      return null;
    }
  };

  const ensureDemoOrder = () => {
    try {
      const orders = JSON.parse(localStorage.getItem('dashboardOrders')) || [];
      const exists = orders.some(
        (order) => normalizeCode(order.codigo || '') === 'PS-000123'
      );
      if (exists) return;
      const demoOrder = {
        id: 'demo-ps-000123',
        codigo: 'PS-000123',
        cliente: 'Club Demo',
        producto: 'Camisetas',
        cantidad: 20,
        cantidades: { camisetas: 20, musculosas: 0, shorts: 0 },
        fecha: '',
        notas: 'Pedido de demostración para seguimiento.',
        estado: 'personalizacion',
        createdAt: new Date().toISOString(),
      };
      orders.unshift(demoOrder);
      localStorage.setItem('dashboardOrders', JSON.stringify(orders));
    } catch (error) {
      // No-op
    }
  };

  const handleTracking = () => {
    const code = normalizeCode(trackingInput?.value || '');
    if (!code) {
      setStepsVisible(false);
      setActiveStep(null);
      updateStatus(defaultTrackingMessage);
      return;
    }

    ensureDemoOrder();
    const order = findOrderByCode(code);
    if (!order) {
      setStepsVisible(false);
      setActiveStep(null);
      updateStatus('No encontramos ese código. Verificá y probá de nuevo.');
      return;
    }

    const stepId = mapEstadoToStep(order.estado);
    setStepsVisible(true);
    setActiveStep(stepId);

    const stepTitle = stepId
      ? document.querySelector(`.tracking-step[data-step="${stepId}"] h3`)?.textContent
      : null;

    updateStatus(
      stepTitle
        ? `Estado actual: ${stepTitle}`
        : 'Estamos actualizando tu estado. Consultanos por WhatsApp.'
    );
  };

  setStepsVisible(false);
  updateStatus(defaultTrackingMessage);

  trackingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleTracking();
  });

  if (trackingBtn) {
    trackingBtn.addEventListener('click', handleTracking);
  }
}

// ═══════════════════════════════════════════════════════════════════
// SCROLL SUAVE - BOTÓN BANNER CTA
// ═══════════════════════════════════════════════════════════════════

// Scroll suave al hacer click en el botón del banner
const bannerCtaBtn = document.querySelector('.banner-cta-btn');
if (bannerCtaBtn) {
  bannerCtaBtn.addEventListener('click', () => {
    const contactoSection = document.querySelector('#contacto');
    if (contactoSection) {
      contactoSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ═══════════════════════════════════════════════════════════════════
// BOTÓN PEDIR COTIZACIÓN - NAVBAR
// ═══════════════════════════════════════════════════════════════════

// Botón "Pedir Cotización" en el navbar
const navbarBtnCotizacion = document.querySelector('.navbar .btn-primary');
if (navbarBtnCotizacion) {
  navbarBtnCotizacion.addEventListener('click', () => {
    const cotizacionSection = document.querySelector('#cotizacion');
    if (cotizacionSection) {
      cotizacionSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Botón "Pedir Cotización" en el menú móvil
const mobileBtnCotizacion = document.querySelector('.btn-primary-mobile');
if (mobileBtnCotizacion) {
  mobileBtnCotizacion.addEventListener('click', (e) => {
    e.preventDefault();
    const cotizacionSection = document.querySelector('#cotizacion');
    if (cotizacionSection) {
      cotizacionSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ═══════════════════════════════════════════════════════════════════
// FUNCIONALIDAD DE PESTAÑAS DE TALLES
// ═══════════════════════════════════════════════════════════════════

const tallesTabs = document.querySelectorAll('.talles-tab');
const tallesContents = document.querySelectorAll('.talles-content');

tallesTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const tabName = tab.getAttribute('data-tab');
    
    // Remover clase activa de todas las pestañas
    tallesTabs.forEach((t) => t.classList.remove('active'));
    tallesContents.forEach((content) => content.classList.remove('active'));
    
    // Agregar clase activa a la pestaña clickeada
    tab.classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');
  });
});

// Botón flotante: volver arriba
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
  const updateScrollTopBtnVisibility = () => {
    const shouldShow = window.scrollY > 320;
    scrollTopBtn.classList.toggle('visible', shouldShow);
  };

  updateScrollTopBtnVisibility();
  window.addEventListener('scroll', updateScrollTopBtnVisibility, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ═══════════════════════════════════════════════════════════════════
// BARRA DE PROGRESO
// ═══════════════════════════════════════════════════════════════════
const initProgressBar = () => {
  const progressBar = document.getElementById('progressBar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = window.scrollY;
    const scrollPercent = windowHeight > 0 ? (scrolled / windowHeight) * 100 : 0;
    progressBar.style.width = scrollPercent + '%';
  }, { passive: true });
};

initProgressBar();

// Acceso al dashboard con Ctrl + Shift + D
const dashboardModal = document.getElementById('dashboardModal');
const dashboardAccessForm = document.getElementById('dashboardAccessForm');
const dashboardPasswordInput = document.getElementById('dashboardPassword');
const dashboardModalError = document.getElementById('dashboardModalError');

const isEditableTarget = (target) =>
  target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

const openDashboardModal = () => {
  if (!dashboardModal) return;
  dashboardModal.classList.add('is-active');
  dashboardModal.setAttribute('aria-hidden', 'false');
  if (dashboardModalError) dashboardModalError.textContent = '';
  if (dashboardPasswordInput) {
    dashboardPasswordInput.value = '';
    dashboardPasswordInput.focus();
  }
};

const closeDashboardModal = () => {
  if (!dashboardModal) return;
  dashboardModal.classList.remove('is-active');
  dashboardModal.setAttribute('aria-hidden', 'true');
};

document.addEventListener('keydown', (event) => {
  if (isEditableTarget(event.target)) return;
  const isShortcut = event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'd';
  if (!isShortcut) return;
  event.preventDefault();
  openDashboardModal();
});

if (dashboardModal) {
  dashboardModal.addEventListener('click', (event) => {
    if (event.target.hasAttribute('data-modal-close')) {
      closeDashboardModal();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeDashboardModal();
  }
});

if (dashboardAccessForm) {
  dashboardAccessForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const password = dashboardPasswordInput ? dashboardPasswordInput.value.trim() : '';
    if (password === '1234') {
      window.location.href = 'dashboard/index.html';
      return;
    }
    if (dashboardModalError) {
      dashboardModalError.textContent = 'Contraseña incorrecta. Intentá de nuevo.';
    }
    if (dashboardPasswordInput) {
      dashboardPasswordInput.focus();
      dashboardPasswordInput.select();
    }
  });
}