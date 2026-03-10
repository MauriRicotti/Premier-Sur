// ═══════════════════════════════════════════════════════════════════
// CATÁLOGO - DATOS DE PRODUCTOS
// ═══════════════════════════════════════════════════════════════════

const productsData = [
  {
    id: 1,
    title: "Conjunto Fútbol Azul/Naranja",
    category: "futbol",
    image: "../assets/Productos/584405139_18020913800787778_7229598298872701147_n.webp",
    description: "Diseño dinámico con detalles en naranja",
    style: "moderno",
    features: ["Transpirable", "Ergonómico"]
  },
  {
    id: 2,
    title: "Conjunto Azul Marino",
    category: "futbol",
    image: "../assets/Productos/584622330_18020913872787778_2984332393380680425_n.webp",
    description: "Estilo clásico con estrellas doradas",
    style: "clasico",
    features: ["Premium", "Resistente"]
  },
  {
    id: 3,
    title: "Conjunto Griego Azul/Amarillo",
    category: "voley",
    image: "../assets/Productos/587605614_18020913896787778_8287935366397675098_n.webp",
    description: "Diseño con patrón griego distintivo",
    style: "moderno",
    features: ["Distintivo", "Confortable"]
  },
  {
    id: 4,
    title: "Conjunto Fútbol Personalizado",
    category: "futbol",
    image: "../assets/Productos/583894400_18020913605787778_8086942876133700660_n.webp",
    description: "Diseño exclusivo con detalles especiales",
    style: "deportivo",
    features: ["Personalizable", "Premium"]
  },
  {
    id: 5,
    title: "Uniforme Básquet Moderno",
    category: "basquet",
    image: "../assets/Productos/583984630_18020913410787778_1029991910318949219_n.webp",
    description: "Corte ergonómico de alto rendimiento",
    style: "deportivo",
    features: ["Ergonómico", "Alto Rendimiento"]
  },
  {
    id: 6,
    title: "Conjunto Voley Premium",
    category: "voley",
    image: "../assets/Productos/584323780_18020913770787778_8447651840960342685_n.webp",
    description: "Tela transpirable y resistente",
    style: "premium",
    features: ["Premium", "Transpirable"]
  },
  {
    id: 7,
    title: "Conjunto Fútbol Azul/Naranja",
    category: "futbol",
    image: "../assets/Productos/584405139_18020913800787778_7229598298872701147_n.webp",
    description: "Diseño dinámico con detalles en naranja",
    style: "moderno",
    features: ["Transpirable", "Ergonómico"]
  },
  {
    id: 8,
    title: "Conjunto Azul Marino",
    category: "futbol",
    image: "../assets/Productos/584622330_18020913872787778_2984332393380680425_n.webp",
    description: "Estilo clásico con estrellas doradas",
    style: "clasico",
    features: ["Premium", "Resistente"]
  },
  {
    id: 9,
    title: "Conjunto Griego Azul/Amarillo",
    category: "voley",
    image: "../assets/Productos/587605614_18020913896787778_8287935366397675098_n.webp",
    description: "Diseño con patrón griego distintivo",
    style: "moderno",
    features: ["Distintivo", "Confortable"]
  },
  {
    id: 10,
    title: "Conjunto Fútbol Personalizado",
    category: "futbol",
    image: "../assets/Productos/583894400_18020913605787778_8086942876133700660_n.webp",
    description: "Diseño exclusivo con detalles especiales",
    style: "deportivo",
    features: ["Personalizable", "Premium"]
  },
  {
    id: 11,
    title: "Uniforme Básquet Moderno",
    category: "basquet",
    image: "../assets/Productos/583984630_18020913410787778_1029991910318949219_n.webp",
    description: "Corte ergonómico de alto rendimiento",
    style: "deportivo",
    features: ["Ergonómico", "Alto Rendimiento"]
  },
  {
    id: 12,
    title: "Conjunto Voley Premium",
    category: "voley",
    image: "../assets/Productos/584323780_18020913770787778_8447651840960342685_n.webp",
    description: "Tela transpirable y resistente",
    style: "premium",
    features: ["Premium", "Transpirable"]
  },
  {
    id: 13,
    title: "Conjunto Fútbol Azul/Naranja",
    category: "futbol",
    image: "../assets/Productos/584405139_18020913800787778_7229598298872701147_n.webp",
    description: "Diseño dinámico con detalles en naranja",
    style: "moderno",
    features: ["Transpirable", "Ergonómico"]
  },
  {
    id: 14,
    title: "Conjunto Azul Marino",
    category: "futbol",
    image: "../assets/Productos/584622330_18020913872787778_2984332393380680425_n.webp",
    description: "Estilo clásico con estrellas doradas",
    style: "clasico",
    features: ["Premium", "Resistente"]
  },
  {
    id: 15,
    title: "Conjunto Griego Azul/Amarillo",
    category: "voley",
    image: "../assets/Productos/587605614_18020913896787778_8287935366397675098_n.webp",
    description: "Diseño con patrón griego distintivo",
    style: "moderno",
    features: ["Distintivo", "Confortable"]
  },
  {
    id: 16,
    title: "Conjunto Fútbol Personalizado",
    category: "futbol",
    image: "../assets/Productos/583894400_18020913605787778_8086942876133700660_n.webp",
    description: "Diseño exclusivo con detalles especiales",
    style: "deportivo",
    features: ["Personalizable", "Premium"]
  },
  {
    id: 17,
    title: "Uniforme Básquet Moderno",
    category: "basquet",
    image: "../assets/Productos/583984630_18020913410787778_1029991910318949219_n.webp",
    description: "Corte ergonómico de alto rendimiento",
    style: "deportivo",
    features: ["Ergonómico", "Alto Rendimiento"]
  },
  {
    id: 18,
    title: "Conjunto Voley Premium",
    category: "voley",
    image: "../assets/Productos/584323780_18020913770787778_8447651840960342685_n.webp",
    description: "Tela transpirable y resistente",
    style: "premium",
    features: ["Premium", "Transpirable"]
  },
  {
    id: 19,
    title: "Conjunto Fútbol Azul/Naranja",
    category: "futbol",
    image: "../assets/Productos/584405139_18020913800787778_7229598298872701147_n.webp",
    description: "Diseño dinámico con detalles en naranja",
    style: "moderno",
    features: ["Transpirable", "Ergonómico"]
  },
  {
    id: 20,
    title: "Conjunto Azul Marino",
    category: "futbol",
    image: "../assets/Productos/584622330_18020913872787778_2984332393380680425_n.webp",
    description: "Estilo clásico con estrellas doradas",
    style: "clasico",
    features: ["Premium", "Resistente"]
  },
  {
    id: 21,
    title: "Conjunto Griego Azul/Amarillo",
    category: "voley",
    image: "../assets/Productos/587605614_18020913896787778_8287935366397675098_n.webp",
    description: "Diseño con patrón griego distintivo",
    style: "moderno",
    features: ["Distintivo", "Confortable"]
  },
  {
    id: 22,
    title: "Conjunto Fútbol Personalizado",
    category: "futbol",
    image: "../assets/Productos/583894400_18020913605787778_8086942876133700660_n.webp",
    description: "Diseño exclusivo con detalles especiales",
    style: "deportivo",
    features: ["Personalizable", "Premium"]
  },
  {
    id: 23,
    title: "Uniforme Básquet Moderno",
    category: "basquet",
    image: "../assets/Productos/583984630_18020913410787778_1029991910318949219_n.webp",
    description: "Corte ergonómico de alto rendimiento",
    style: "deportivo",
    features: ["Ergonómico", "Alto Rendimiento"]
  },
  {
    id: 24,
    title: "Conjunto Voley Premium",
    category: "voley",
    image: "../assets/Productos/584323780_18020913770787778_8447651840960342685_n.webp",
    description: "Tela transpirable y resistente",
    style: "premium",
    features: ["Premium", "Transpirable"]
  }
];

// ═══════════════════════════════════════════════════════════════════
// UTILIDADES
// ═══════════════════════════════════════════════════════════════════

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function debounce(fn, delay = 180) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// ═══════════════════════════════════════════════════════════════════
// ESTADO DEL CATÁLOGO
// ═══════════════════════════════════════════════════════════════════

let catalogState = {
  viewMode: "grid",
  searchQuery: "",
  filters: {
    sport: ["todos"],
    style: []
  },
  currentPage: 1,
  itemsPerPage: 8
};
const randomizedProducts = shuffleArray(productsData);

// ═══════════════════════════════════════════════════════════════════
// INICIALIZACIÓN
// ═══════════════════════════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", () => {
  initializeCatalog();
  initializeMenuHamburguesa();
  renderProducts();
});

// ═══════════════════════════════════════════════════════════════════
// FUNCIONES PRINCIPALES
// ═══════════════════════════════════════════════════════════════════

function initializeCatalog() {
  // Búsqueda
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    const onSearchInput = debounce((e) => {
      catalogState.searchQuery = e.target.value.toLowerCase();
      renderProducts();
    });
    searchInput.addEventListener("input", onSearchInput);
  }

  // Cambio de vista
  const viewBtns = document.querySelectorAll(".view-btn");
  viewBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      viewBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      catalogState.viewMode = btn.dataset.view;
      renderProducts();
    });
  });

  // Filtros por deporte (ELIMINADOS - Sidebar de filtros removido)
  // const sportCheckboxes = document.querySelectorAll('input[name="sport"]');
  // sportCheckboxes.forEach((checkbox) => {
  //   checkbox.addEventListener("change", () => {
  //     updateSportFilters();
  //     renderProducts();
  //   });
  // });

  // Filtros por estilo (ELIMINADOS - Sidebar de filtros removido)
  // const styleCheckboxes = document.querySelectorAll('input[name="style"]');
  // styleCheckboxes.forEach((checkbox) => {
  //   checkbox.addEventListener("change", () => {
  //     updateStyleFilters();
  //     renderProducts();
  //   });
  // });

  // Limpiar filtros (ELIMINADOS - Sidebar de filtros removido)
  // const clearBtn = document.getElementById("clearFilters");
  // if (clearBtn) {
  //   clearBtn.addEventListener("click", clearAllFilters);
  // }
}

function updateSportFilters() {
  const checkboxes = document.querySelectorAll('input[name="sport"]:checked');
  catalogState.filters.sport = Array.from(checkboxes).map((cb) => cb.value);

  if (catalogState.filters.sport.length === 0) {
    catalogState.filters.sport = ["todos"];
    document.querySelector('input[value="todos"]').checked = true;
  } else if (
    catalogState.filters.sport.includes("todos") &&
    catalogState.filters.sport.length > 1
  ) {
    catalogState.filters.sport = catalogState.filters.sport.filter(
      (s) => s !== "todos"
    );
    document.querySelector('input[value="todos"]').checked = false;
  }
}

function updateStyleFilters() {
  const checkboxes = document.querySelectorAll('input[name="style"]:checked');
  catalogState.filters.style = Array.from(checkboxes).map((cb) => cb.value);
}

function clearAllFilters() {
  // Reset checkboxes
  document.querySelectorAll('input[name="sport"]').forEach((cb) => {
    cb.checked = cb.value === "todos";
  });
  document.querySelectorAll('input[name="style"]').forEach((cb) => {
    cb.checked = false;
  });

  // Reset estado
  catalogState.filters = {
    sport: ["todos"],
    style: []
  };
  catalogState.searchQuery = "";

  // Reset input
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.value = "";
  }

  renderProducts();
}

// ═══════════════════════════════════════════════════════════════════
// FILTRADO Y BÚSQUEDA
// ═══════════════════════════════════════════════════════════════════

function getFilteredProducts() {
  return randomizedProducts.filter((product) => {
    // Filtro por deporte
    if (
      !catalogState.filters.sport.includes("todos") &&
      !catalogState.filters.sport.includes(product.category)
    ) {
      return false;
    }

    // Filtro por estilo
    if (
      catalogState.filters.style.length > 0 &&
      !catalogState.filters.style.includes(product.style)
    ) {
      return false;
    }

    // Búsqueda
    if (catalogState.searchQuery) {
      const query = catalogState.searchQuery;
      return (
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    return true;
  });
}

// ═══════════════════════════════════════════════════════════════════
// RENDERIZADO DE PRODUCTOS
// ═══════════════════════════════════════════════════════════════════

function renderProducts(resetPage = true) {
  const grid = document.getElementById("productsGrid");
  let filtered = getFilteredProducts();

  if (!grid) return;

  // Reset a página 1 solo si los filtros cambiaron
  if (resetPage) {
    catalogState.currentPage = 1;
  }

  // Actualizar contador
  const countElement = document.getElementById("productsCount");
  if (countElement) {
    const text = filtered.length === 1 ? "producto" : "productos";
    countElement.textContent = `${filtered.length} ${text}`;
  }

  // Vaciar grid
  grid.innerHTML = "";

  // Agregar clase de vista
  grid.classList.remove("list-view");
  if (catalogState.viewMode === "list") {
    grid.classList.add("list-view");
  }

  // Renderizar productos
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <i class="bi bi-search"></i>
        <h3>No se encontraron productos</h3>
        <p>Intenta con otros filtros o términos de búsqueda</p>
      </div>
    `;
    renderPagination(filtered);
    return;
  }

  // Calcular paginación
  const startIndex = (catalogState.currentPage - 1) * catalogState.itemsPerPage;
  const endIndex = startIndex + catalogState.itemsPerPage;
  const paginatedProducts = filtered.slice(startIndex, endIndex);

  paginatedProducts.forEach((product, index) => {
    const card = createProductCard(product, index);
    grid.appendChild(card);
  });

  // Renderizar paginación
  renderPagination(filtered);
}

function renderPagination(filtered) {
  const paginationContainer = document.getElementById("paginationContainer");
  if (!paginationContainer) return;

  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(filtered.length / catalogState.itemsPerPage);

  if (totalPages <= 1) return;

  // Botón anterior
  const prevBtn = document.createElement("button");
  prevBtn.className = "pagination-btn";
  prevBtn.innerHTML = '<i class="bi bi-chevron-left"></i>';
  prevBtn.disabled = catalogState.currentPage === 1;
  prevBtn.addEventListener("click", () => {
    if (catalogState.currentPage > 1) {
      catalogState.currentPage--;
      renderProducts(false);
    }
  });
  paginationContainer.appendChild(prevBtn);

  // Números de página
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.className = `pagination-btn ${i === catalogState.currentPage ? "active" : ""}`;
    pageBtn.textContent = i;
    pageBtn.addEventListener("click", () => {
      catalogState.currentPage = i;
      renderProducts(false);
    });
    paginationContainer.appendChild(pageBtn);
  }

  // Botón siguiente
  const nextBtn = document.createElement("button");
  nextBtn.className = "pagination-btn";
  nextBtn.innerHTML = '<i class="bi bi-chevron-right"></i>';
  nextBtn.disabled = catalogState.currentPage === totalPages;
  nextBtn.addEventListener("click", () => {
    if (catalogState.currentPage < totalPages) {
      catalogState.currentPage++;
      renderProducts(false);
    }
  });
  paginationContainer.appendChild(nextBtn);
}

function createProductCard(product, index) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.style.animationDelay = `${index * 0.05}s`;

  const categoryLabel = {
    futbol: "Fútbol",
    voley: "Voley",
    basquet: "Básquet"
  };

  const featuresHTML = product.features
    .map((feature) => `<span class="feature-tag">${feature}</span>`)
    .join("");

  card.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.title}" loading="lazy" />
    </div>
    <div class="product-info">
      <span class="product-category">${categoryLabel[product.category]}</span>
      <h3 class="product-title">${product.title}</h3>
      <p class="product-description">${product.description}</p>
      <div class="product-features">
        ${featuresHTML}
      </div>
      <div class="product-actions">
        <button class="btn-product-action" title="Ver detalles">
          <i class="bi bi-eye"></i> Ver
        </button>
        <button class="btn-product-action primary" title="Contactar">
          <i class="bi bi-whatsapp"></i> Cotizar
        </button>
      </div>
    </div>
  `;

  // Event listeners
  const viewBtn = card.querySelector(".btn-product-action:not(.primary)");
  const quoteBtn = card.querySelector(".btn-product-action.primary");

  if (viewBtn) {
    viewBtn.addEventListener("click", () => {
      showProductDetails(product);
    });
  }

  if (quoteBtn) {
    quoteBtn.addEventListener("click", () => {
      contactWhatsApp(product);
    });
  }

  return card;
}

// ═══════════════════════════════════════════════════════════════════
// MODALES Y ACCIONES
// ═══════════════════════════════════════════════════════════════════

function showProductDetails(product) {
  console.log("Ver detalles de:", product.title);
  // Aquí puedes agregar un modal o redirigir a una página de detalles
}

function contactWhatsApp(product) {
  const message = `Hola! Me interesa cotizar el siguiente producto: ${product.title}. ¿Podrías darme más información?`;
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
}

// ═══════════════════════════════════════════════════════════════════
// MENÚ HAMBURGUESA
// ═══════════════════════════════════════════════════════════════════

function initializeMenuHamburguesa() {
  const menuHamburguesa = document.getElementById("menuHamburguesa");
  const navLinksMobile = document.getElementById("navLinksMobile");

  if (menuHamburguesa && navLinksMobile) {
    if (menuHamburguesa.dataset.menuBound === "true") {
      return;
    }
    menuHamburguesa.dataset.menuBound = "true";

    const openMobileMenu = () => {
      menuHamburguesa.classList.add("active");
      menuHamburguesa.setAttribute("aria-expanded", "true");
      navLinksMobile.classList.add("active");
      document.body.classList.add("menu-open");
    };

    const closeMobileMenu = () => {
      menuHamburguesa.classList.remove("active");
      menuHamburguesa.setAttribute("aria-expanded", "false");
      navLinksMobile.classList.remove("active");
      document.body.classList.remove("menu-open");
    };

    menuHamburguesa.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = navLinksMobile.classList.contains("active");
      if (isOpen) {
        closeMobileMenu();
        return;
      }
      openMobileMenu();
    });

    const links = navLinksMobile.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileMenu();
      });
    });

    document.addEventListener("click", (event) => {
      if (!navLinksMobile.classList.contains("active")) return;
      if (event.target.closest(".navbar")) return;
      closeMobileMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    });
  }
}

// Fallback inmediato por si DOMContentLoaded ya pasó en algunos entornos
initializeMenuHamburguesa();

// Botón flotante: volver arriba
const catalogScrollTopBtn = document.getElementById("scrollTopBtn");
if (catalogScrollTopBtn && catalogScrollTopBtn.dataset.bound !== "true") {
  catalogScrollTopBtn.dataset.bound = "true";

  const updateScrollTopBtnVisibility = () => {
    const shouldShow = window.scrollY > 320;
    catalogScrollTopBtn.classList.toggle("visible", shouldShow);
  };

  updateScrollTopBtnVisibility();
  window.addEventListener("scroll", updateScrollTopBtnVisibility, { passive: true });

  catalogScrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
