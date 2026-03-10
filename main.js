// ═══════════════════════════════════════════════════════════════════
// FOG ANIMADO EN EL HERO SECTION
// ═══════════════════════════════════════════════════════════════════

window.addEventListener('load', () => {
  VANTA.FOG({
    el: '#vanta-waves',
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    highlightColor: 0x2d2d2d,
    midtoneColor: 0x1a1a1a,
    lowlightColor: 0x0a0a0a,
    baseColor: 0x0a0a0a,
    speed: 2.8,
  });
});

// ═══════════════════════════════════════════════════════════════════
// BANNER ANIMADO
// ═══════════════════════════════════════════════════════════════════

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
  
  if (!particlesContainer) return;

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

if (menuHamburguesa && navLinksMobile) {
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
