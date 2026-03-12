const pasos = [
  { id: "diseno", label: "Diseño" },
  { id: "produccion_prenda", label: "Producción" },
  { id: "personalizacion", label: "Estampado" },
  { id: "control_entrega", label: "Control de calidad " },
];

const storageKey = "dashboardOrders";
const sequenceKey = "dashboardOrderSeq";
const board = document.getElementById("board");
const form = document.getElementById("pedidoForm");
const productoSelect = document.getElementById("productoSelect");
const totalCantidadInput = document.getElementById("cantidadTotal");
const codigoInput = document.getElementById("codigoPedido");
const totalPedidos = document.getElementById("totalPedidos");
const ultimaActualizacion = document.getElementById("ultimaActualizacion");
const cardTemplate = document.getElementById("cardTemplate");
const toastSuccess = document.getElementById("toastSuccess");
const totalPrecio = document.getElementById("totalPrecio");
const pedidosTableBody = document.getElementById("pedidosTableBody");
const tableroTableBody = document.getElementById("tableroTableBody");
const pedidosSearch = document.getElementById("pedidosSearch");
const monthFilter = document.getElementById("monthFilter");
const dateFromInput = document.getElementById("dateFrom");
const dateToInput = document.getElementById("dateTo");
const exportCsvBtn = document.getElementById("exportCsv");
const exportPdfSidebar = document.getElementById("exportPdfSidebar");
const clearFiltersBtn = document.getElementById("clearFilters");
const summaryCount = document.getElementById("summaryCount");
const summaryTotal = document.getElementById("summaryTotal");
const summaryAvg = document.getElementById("summaryAvg");
const loadMoreBtn = document.getElementById("loadMorePedidos");
const appRoot = document.querySelector(".app");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarStateKey = "dashboardSidebarCollapsed";
const undoToast = document.getElementById("undoToast");
const undoActionBtn = document.getElementById("undoActionBtn");
const loadDemoBtn = document.getElementById("loadDemoOrders");
let toastTimer = null;
let undoTimer = null;
let undoAction = null;
let lastAnimatedId = null;
const pedidosState = {
  search: "",
  month: "",
  dateFrom: "",
  dateTo: "",
  sortKey: "fecha",
  sortDir: "asc",
  pageSize: 6,
  visibleCount: 6,
};

const formatDate = (value) => {
  if (!value) return "Sin fecha";
  const date = new Date(value);
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatTimestamp = (value) => {
  if (!value) return "—";
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

const loadOrders = () => {
  try {
    const orders = JSON.parse(localStorage.getItem(storageKey)) || [];
    const validSteps = new Set([...pasos.map((step) => step.id), "finalizado"]);
    return orders.map((order) => ({
      ...order,
      estado: validSteps.has(order.estado) ? order.estado : pasos[0].id,
    }));
  } catch (error) {
    return [];
  }
};

const getNextCode = () => {
  const current = Number(localStorage.getItem(sequenceKey) || 0) + 1;
  localStorage.setItem(sequenceKey, String(current));
  return `PS-${String(current).padStart(6, "0")}`;
};

const setNewCodigo = () => {
  if (codigoInput) {
    codigoInput.value = getNextCode();
  }
};

function getSelectedProductos() {
  if (!productoSelect) return [];
  const checks = productoSelect.querySelectorAll('input[type="checkbox"]:checked');
  return Array.from(checks).map((opt) => opt.value);
}

const saveOrders = (orders) => {
  localStorage.setItem(storageKey, JSON.stringify(orders));
  ultimaActualizacion.textContent = formatTimestamp(Date.now());
  const activos = orders.filter((order) => order.estado !== "finalizado");
  totalPedidos.textContent = activos.length;
};

const buildColumn = (step, orders) => {
  const column = document.createElement("div");
  column.className = "board-column";
  column.dataset.step = step.id;
  column.addEventListener("dragover", (event) => {
    event.preventDefault();
    column.classList.add("is-drag-over");
  });
  column.addEventListener("dragleave", () => {
    column.classList.remove("is-drag-over");
  });
  column.addEventListener("drop", (event) => {
    event.preventDefault();
    column.classList.remove("is-drag-over");
    const orderId = event.dataTransfer?.getData("text/plain");
    if (orderId) {
      setOrderEstado(orderId, step.id);
    }
  });

  const header = document.createElement("div");
  header.className = "column-header";

  const title = document.createElement("span");
  title.className = "column-title";
  title.textContent = step.label;

  const count = document.createElement("span");
  count.className = "column-count";
  count.textContent = `${orders.length} pedidos`;

  header.append(title, count);
  column.appendChild(header);

  if (orders.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "Sin pedidos en este paso.";
    column.appendChild(empty);
    return column;
  }

  orders.forEach((order) => {
    const card = cardTemplate.content.cloneNode(true);
    const cardRoot = card.querySelector(".pedido-card");

    cardRoot.dataset.id = order.id;
    cardRoot.draggable = true;
    if (order.id === lastAnimatedId) {
      cardRoot.classList.add("is-animate");
      cardRoot.addEventListener(
        "animationend",
        () => {
          cardRoot.classList.remove("is-animate");
        },
        { once: true }
      );
    }
    cardRoot.addEventListener("dragstart", (event) => {
      cardRoot.classList.add("is-dragging");
      event.dataTransfer?.setData("text/plain", order.id);
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
      }
    });
    cardRoot.addEventListener("dragend", () => {
      cardRoot.classList.remove("is-dragging");
    });
    card.querySelector(".pedido-title").textContent = order.cliente || "Sin cliente";
    const codigo = order.codigo || "Sin código";
    const codigoEl = card.querySelector(".pedido-subtitle");
    codigoEl.textContent = codigo;
    codigoEl.dataset.code = codigo;
    card.querySelector(".pedido-badge").textContent = order.cantidad
      ? `${order.cantidad} u.`
      : "Sin cantidad";

    const info = card.querySelector(".pedido-info");
    info.innerHTML = `
      <span>Pago: ${order.pago || "Sin info"}</span>
      <span>Fecha estimada: ${formatDate(order.fecha)}</span>
      <span>Creado: ${formatDate(order.createdAt)}</span>
    `;

    const notas = card.querySelector(".pedido-notas");
    notas.innerHTML = "";
    const productos = buildProductosNotas(order);
    if (productos.length > 0) {
      productos.forEach((line) => {
        const item = document.createElement("div");
        item.textContent = line;
        notas.appendChild(item);
      });
    }
    if (order.notas) {
      if (productos.length > 0) {
        const spacer = document.createElement("div");
        spacer.style.height = "6px";
        notas.appendChild(spacer);
      }
      const notaText = document.createElement("div");
      notaText.textContent = order.notas;
      notas.appendChild(notaText);
    }
    if (!order.notas && productos.length === 0) {
      notas.textContent = "Sin notas internas.";
    }

    cardRoot.addEventListener("click", (event) => {
      const action = event.target?.dataset?.action;
      if (!action) return;
      handleAction(order.id, action);
    });

    column.appendChild(card);
  });

  return column;
};

const buildProductosNotas = (order) => {
  if (!order || !order.cantidades) return [];
  const lines = [];
  const { musculosas = 0, camisetas = 0, shorts = 0 } = order.cantidades;
  if (musculosas > 0) lines.push(`Musculosas: ${musculosas}`);
  if (camisetas > 0) lines.push(`Camisetas: ${camisetas}`);
  if (shorts > 0) lines.push(`Shorts: ${shorts}`);
  return lines;
};

const getPasoLabel = (estado) => {
  if (estado === "finalizado") return "Finalizado";
  return pasos.find((step) => step.id === estado)?.label || "Sin estado";
};

const parseOrderDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const sortByNearestDate = (items) =>
  [...items].sort((a, b) => {
    const dateA = parseOrderDate(a.fecha);
    const dateB = parseOrderDate(b.fecha);
    if (dateA && dateB) return dateA.getTime() - dateB.getTime();
    if (dateA) return -1;
    if (dateB) return 1;
    const createdA = parseOrderDate(a.createdAt);
    const createdB = parseOrderDate(b.createdAt);
    if (createdA && createdB) return createdA.getTime() - createdB.getTime();
    return 0;
  });

const renderBoard = (orders) => {
  board.innerHTML = "";
  pasos.forEach((step) => {
    const stepOrders = orders.filter((order) => order.estado === step.id);
    board.appendChild(buildColumn(step, sortByNearestDate(stepOrders)));
  });
  lastAnimatedId = null;
};

const renderTableroTable = (orders) => {
  if (!tableroTableBody) return;
  const activos = orders.filter((order) => order.estado !== "finalizado");
  const sorted = sortByNearestDate(activos);
  tableroTableBody.innerHTML = "";
  if (sorted.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = '<td colspan="10" class="table-empty">No hay pedidos en el tablero.</td>';
    tableroTableBody.appendChild(row);
    return;
  }

  sorted.forEach((order) => {
    const row = document.createElement("tr");
    row.dataset.id = order.id;
    const pagoText = order.pago || "Sin info";
    const totalText = formatCurrency(calculateTotal(order));
    row.innerHTML = `
      <td>${order.codigo || "Sin código"}</td>
      <td>${order.cliente || "Sin cliente"}</td>
      <td><span class="status-pill">${getPasoLabel(order.estado)}</span></td>
      <td>${buildProductosNotas(order).join(", ") || order.producto || "Sin productos"}</td>
      <td>${getTotalCantidad(order) || "Sin cantidad"}</td>
      <td>${totalText}</td>
      <td><span class="payment-badge ${getPagoClass(pagoText)}">${pagoText}</span></td>
      <td>${formatDate(order.fecha)}</td>
      <td>${formatDate(order.createdAt)}</td>
      <td>
        <button class="btn small" data-action="finalize-table">Finalizar</button>
      </td>
    `;
    tableroTableBody.appendChild(row);
  });
};

const renderPedidosTable = (orders) => {
  if (!pedidosTableBody) return;
  const finalizados = orders.filter((order) => order.estado === "finalizado");
  const filtered = applyPedidosFilters(finalizados);
  const sorted = sortPedidos(filtered);
  const visible = sorted.slice(0, pedidosState.visibleCount);
  const MIN_ROWS = 6;

  renderPedidosSummary(filtered);
  pedidosTableBody.innerHTML = "";

  if (visible.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = '<td colspan="8" class="table-empty">No hay pedidos finalizados.</td>';
    pedidosTableBody.appendChild(row);
  } else {
    visible.forEach((order) => {
      const row = document.createElement("tr");
      row.dataset.id = order.id;
      row.innerHTML = `
        <td>${order.cliente || "Sin cliente"}</td>
        <td>${buildProductosNotas(order).join(", ") || order.producto || "Sin productos"}</td>
        <td>${getTotalCantidad(order) || "Sin cantidad"}</td>
        <td>${formatCurrency(calculateTotal(order))}</td>
        <td>${formatDate(order.fecha)}</td>
        <td>${formatDate(order.createdAt)}</td>
        <td>
          <button class="btn danger small" data-action="delete-table">Eliminar</button>
        </td>
      `;
      pedidosTableBody.appendChild(row);
    });
  }

  const currentRows = pedidosTableBody.querySelectorAll("tr").length;
  const targetRows = Math.max(MIN_ROWS, currentRows);
  for (let i = currentRows; i < targetRows; i += 1) {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML = "<td colspan=\"7\">&nbsp;</td>";
    pedidosTableBody.appendChild(emptyRow);
  }

  if (loadMoreBtn) {
    loadMoreBtn.style.display =
      sorted.length > pedidosState.visibleCount ? "inline-flex" : "none";
  }
};

const normalizeText = (value) =>
  String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

const getMonthKey = (date) => {
  if (!date) return "";
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${date.getFullYear()}-${month}`;
};

const applyPedidosFilters = (orders) => {
  const search = normalizeText(pedidosState.search);
  const month = pedidosState.month;
  const fromDate = parseOrderDate(pedidosState.dateFrom);
  const toDate = parseOrderDate(pedidosState.dateTo);
  return orders.filter((order) => {
    const matchesSearch =
      !search ||
      normalizeText(order.codigo).includes(search) ||
      normalizeText(order.cliente).includes(search) ||
      normalizeText(order.producto).includes(search);
    const fecha = parseOrderDate(order.fecha);
    const fallbackFecha = fecha || parseOrderDate(order.createdAt);
    const matchesMonth = !month || (fallbackFecha && getMonthKey(fallbackFecha) === month);
    const matchesFrom = !fromDate || (fecha && fecha >= fromDate);
    const matchesTo = !toDate || (fecha && fecha <= toDate);
    return matchesSearch && matchesMonth && matchesFrom && matchesTo;
  });
};

const sortPedidos = (orders) => {
  const { sortKey, sortDir } = pedidosState;
  const direction = sortDir === "asc" ? 1 : -1;
  return [...orders].sort((a, b) => {
    const compareText = (x, y) =>
      String(x || "").localeCompare(String(y || ""), "es", { sensitivity: "base" });
    const compareDates = (x, y) => {
      const dateA = parseOrderDate(x);
      const dateB = parseOrderDate(y);
      if (dateA && dateB) return dateA.getTime() - dateB.getTime();
      if (dateA) return -1;
      if (dateB) return 1;
      return 0;
    };
    let result = 0;
    switch (sortKey) {
      case "codigo":
        result = compareText(a.codigo, b.codigo);
        break;
      case "cliente":
        result = compareText(a.cliente, b.cliente);
        break;
      case "total":
        result = calculateTotal(a) - calculateTotal(b);
        break;
      case "pago":
        result = compareText(a.pago, b.pago);
        break;
      case "creado":
        result = compareDates(a.createdAt, b.createdAt);
        break;
      case "fecha":
      default:
        result = compareDates(a.fecha, b.fecha);
        break;
    }
    return result * direction;
  });
};

const renderPedidosSummary = (orders) => {
  if (!summaryCount || !summaryTotal || !summaryAvg) return;
  const count = orders.length;
  const total = orders.reduce((acc, order) => acc + calculateTotal(order), 0);
  const avg = count > 0 ? Math.round(total / count) : 0;
  summaryCount.textContent = count.toString();
  summaryTotal.textContent = formatCurrency(total);
  summaryAvg.textContent = formatCurrency(avg);
};

const getPagoClass = (value) => {
  const normalized = normalizeText(value);
  if (normalized.includes("pendiente")) return "pendiente";
  if (normalized.includes("señado") || normalized.includes("senado")) return "senado";
  if (normalized.includes("completo")) return "completo";
  return "pendiente";
};

const formatCurrency = (value) =>
  `$${Number(value || 0).toLocaleString("es-AR")}`;

const calculateTotal = (order) => {
  if (!order?.cantidades) return 0;
  const { camisetas = 0, musculosas = 0, shorts = 0 } = order.cantidades;
  return (camisetas + musculosas) * 14000 + shorts * 8000;
};

const getTotalCantidad = (order) => {
  if (!order) return 0;
  if (Number(order.cantidad) > 0) return Number(order.cantidad);
  const { camisetas = 0, musculosas = 0, shorts = 0 } = order.cantidades || {};
  return camisetas + musculosas + shorts;
};


const addOrder = (data) => {
  const orders = loadOrders();
  const newOrder = {
    id: crypto.randomUUID(),
    codigo: data.codigo,
    cliente: data.cliente.trim(),
    producto: data.producto.trim(),
    cantidad: data.cantidad,
    cantidades: data.cantidades,
    pago: data.pago || "Pendiente",
    fecha: data.fecha || "",
    notas: data.notas?.trim() || "",
    estado: data.estado,
    createdAt: new Date().toISOString(),
  };
  orders.unshift(newOrder);
  lastAnimatedId = newOrder.id;
  saveOrders(orders);
  renderBoard(orders);
  renderTableroTable(orders);
  renderPedidosTable(orders);
  showToast();
};

const buildProductoLabel = (cantidades) => {
  if (!cantidades) return "";
  const parts = [];
  if (cantidades.musculosas > 0) parts.push("Musculosas");
  if (cantidades.camisetas > 0) parts.push("Camisetas");
  if (cantidades.shorts > 0) parts.push("Shorts");
  return parts.join(", ");
};

const createDemoOrders = () => {
  const today = new Date();
  const daysFromNow = (n) => {
    const d = new Date(today);
    d.setDate(d.getDate() + n);
    return d.toISOString().split("T")[0];
  };
  const demo = [
    {
      cliente: "Club Aurora",
      cantidades: { camisetas: 12, musculosas: 8, shorts: 6 },
      pago: "Señado",
      fecha: daysFromNow(8),
      estado: "diseno",
    },
    {
      cliente: "Estrella del Sur",
      cantidades: { camisetas: 18, musculosas: 0, shorts: 10 },
      pago: "Pendiente",
      fecha: daysFromNow(14),
      estado: "produccion_prenda",
    },
    {
      cliente: "Unión del Parque",
      cantidades: { camisetas: 0, musculosas: 16, shorts: 12 },
      pago: "Pendiente",
      fecha: daysFromNow(20),
      estado: "personalizacion",
    },
    {
      cliente: "Atlético Rivadavia",
      cantidades: { camisetas: 22, musculosas: 10, shorts: 14 },
      pago: "Señado",
      fecha: daysFromNow(26),
      estado: "control_entrega",
    },
    {
      cliente: "San Martín FC",
      cantidades: { camisetas: 10, musculosas: 6, shorts: 0 },
      pago: "Pendiente",
      fecha: daysFromNow(11),
      estado: "diseno",
    },
  ];
  return demo.map((item, index) => ({
    id: crypto.randomUUID(),
    codigo: getNextCode(),
    cliente: item.cliente,
    producto: buildProductoLabel(item.cantidades),
    cantidad: getTotalCantidad({ cantidades: item.cantidades }),
    cantidades: item.cantidades,
    pago: item.pago,
    fecha: item.fecha,
    notas: "",
    estado: item.estado,
    createdAt: new Date(today.getTime() - index * 86400000).toISOString(),
  }));
};

const seedDemoOrders = () => {
  const existing = loadOrders();
  if (existing.length > 0) return;
  const seeded = createDemoOrders();
  saveOrders(seeded);
};

const setOrderEstado = (orderId, estado) => {
  const orders = loadOrders();
  const index = orders.findIndex((order) => order.id === orderId);
  if (index === -1) return;
  orders[index].estado = estado;
  lastAnimatedId = orderId;
  saveOrders(orders);
  renderBoard(orders);
  renderTableroTable(orders);
  renderPedidosTable(orders);
};

const deleteOrder = (orderId) => {
  const orders = loadOrders().filter((order) => order.id !== orderId);
  saveOrders(orders);
  renderBoard(orders);
  renderTableroTable(orders);
  renderPedidosTable(orders);
};

const deleteOrderWithUndo = (orderId) => {
  const orders = loadOrders();
  const index = orders.findIndex((order) => order.id === orderId);
  if (index === -1) return;
  const [removed] = orders.splice(index, 1);
  saveOrders(orders);
  renderBoard(orders);
  renderTableroTable(orders);
  renderPedidosTable(orders);
  showUndoToast("Pedido eliminado", () => {
    const next = loadOrders();
    next.splice(index, 0, removed);
    saveOrders(next);
    renderBoard(next);
    renderTableroTable(next);
    renderPedidosTable(next);
  });
};

const handleAction = (orderId, action) => {
  if (action === "finalize") finalizeOrderWithUndo(orderId);
  if (action === "delete") deleteOrderWithUndo(orderId);
  if (action === "copy") copyOrderCode(orderId);
};

const finalizeOrder = (orderId) => {
  setOrderEstado(orderId, "finalizado");
  showToast("Pedido finalizado");
};

const finalizeOrderWithUndo = (orderId) => {
  const orders = loadOrders();
  const index = orders.findIndex((order) => order.id === orderId);
  if (index === -1) return;
  const prevEstado = orders[index].estado;
  orders[index].estado = "finalizado";
  lastAnimatedId = orderId;
  saveOrders(orders);
  renderBoard(orders);
  renderTableroTable(orders);
  renderPedidosTable(orders);
  showUndoToast("Pedido finalizado", () => {
    const next = loadOrders();
    const item = next.find((order) => order.id === orderId);
    if (!item) return;
    item.estado = prevEstado;
    saveOrders(next);
    renderBoard(next);
    renderTableroTable(next);
    renderPedidosTable(next);
  });
};

const deleteOrderFromTable = (orderId) => {
  if (!orderId) return;
  deleteOrderWithUndo(orderId);
};


const copyOrderCode = async (orderId) => {
  const orders = loadOrders();
  const order = orders.find((item) => item.id === orderId);
  const code = order?.codigo;
  await copyText(code);
};

const copyText = async (code) => {
  if (!code) return;
  try {
    await navigator.clipboard.writeText(code);
    showToast("Código copiado");
  } catch (error) {
    const temp = document.createElement("input");
    temp.value = code;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
    showToast("Código copiado");
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const formData = new FormData(form);
  addOrder({
    codigo: formData.get("codigo"),
    cliente: formData.get("cliente"),
    producto: getSelectedProductos().join(", "),
    cantidad: Number(formData.get("cantidad")),
    cantidades: {
      musculosas: Number(formData.get("qtyMusculosas") || 0),
      camisetas: Number(formData.get("qtyCamisetas") || 0),
      shorts: Number(formData.get("qtyShorts") || 0),
    },
    pago: formData.get("pago"),
    fecha: formData.get("fecha"),
    notas: formData.get("notas"),
    estado: pasos[0].id,
  });
  form.reset();
  resetProductQuantities();
  setNewCodigo();
});

const showToast = (message = "Pedido agregado exitosamente") => {
  if (!toastSuccess) return;
  toastSuccess.textContent = message;
  toastSuccess.classList.add("is-visible");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastSuccess.classList.remove("is-visible");
  }, 2400);
};

const showUndoToast = (message, action) => {
  if (!undoToast || !undoActionBtn) return;
  const text = undoToast.querySelector(".toast-text");
  if (text) text.textContent = message;
  undoAction = action;
  undoToast.classList.add("is-visible");
  if (undoTimer) clearTimeout(undoTimer);
  undoTimer = setTimeout(() => {
    undoToast.classList.remove("is-visible");
    undoAction = null;
  }, 10000);
};

function resetProductQuantities() {
  if (!productoSelect) return;
  const checks = productoSelect.querySelectorAll('input[type="checkbox"]');
  checks.forEach((check) => {
    check.checked = false;
  });
  const qtyInputs = productoSelect.querySelectorAll('input[type="number"]');
  qtyInputs.forEach((input) => {
    input.value = "0";
    input.readOnly = true;
  });
  updateCantidadTotal();
  updateProductQuantityVisibility();
}

function updateCantidadTotal() {
  if (!totalCantidadInput || !productoSelect) return;
  const inputs = productoSelect.querySelectorAll('input[type="number"]');
  const total = Array.from(inputs).reduce((acc, input) => acc + Number(input.value || 0), 0);
  totalCantidadInput.value = total > 0 ? String(total) : "";
  updatePrecioTotal();
}

function updatePrecioTotal() {
  if (!totalPrecio || !productoSelect) return;
  const getValue = (name) =>
    Number(productoSelect.querySelector(`input[name="${name}"]`)?.value || 0);
  const camisetas = getValue("qtyCamisetas");
  const musculosas = getValue("qtyMusculosas");
  const shorts = getValue("qtyShorts");
  const total = (camisetas + musculosas) * 14000 + shorts * 8000;
  totalPrecio.textContent = `$${total.toLocaleString("es-AR")}`;
}

function updateProductQuantityVisibility() {
  if (!productoSelect) return;
  const labels = productoSelect.querySelectorAll(".product-item");
  labels.forEach((label) => {
    const check = label.querySelector('input[type="checkbox"]');
    const qty = label.querySelector('input[type="number"]');
    const isActive = Boolean(check && check.checked);
    label.classList.toggle("is-active", isActive);
    if (qty) {
      qty.readOnly = !isActive;
      if (!isActive) qty.value = "0";
    }
  });
  updatePrecioTotal();
}

const bootstrap = () => {
  seedDemoOrders();
  const orders = loadOrders();
  saveOrders(orders);
  renderBoard(orders);
  renderTableroTable(orders);
  renderPedidosTable(orders);
  setNewCodigo();
  resetProductQuantities();
};

bootstrap();

if (productoSelect) {
  const bindProductListeners = () => {
    const qtyInputs = productoSelect.querySelectorAll('input[type="number"]');
    const checks = productoSelect.querySelectorAll('input[type="checkbox"]');

    qtyInputs.forEach((input) => {
      input.addEventListener("focus", () => {
        const item = input.closest(".product-item");
        const check = item ? item.querySelector('input[type="checkbox"]') : null;
        if (input.value === "0") {
          input.value = "";
          updateCantidadTotal();
          updatePrecioTotal();
        }
        if (check) {
          check.checked = true;
        }
        updateProductQuantityVisibility();
      });

      input.addEventListener("input", () => {
        const item = input.closest(".product-item");
        const check = item ? item.querySelector('input[type="checkbox"]') : null;
        const value = Number(input.value || 0);
        if (check) {
          check.checked = value > 0;
        }
        updateProductQuantityVisibility();
        updateCantidadTotal();
      });
    });

    checks.forEach((check) => {
      check.addEventListener("change", () => {
        updateProductQuantityVisibility();
        updateCantidadTotal();
      });
    });

    const items = productoSelect.querySelectorAll(".product-item");
    items.forEach((item) => {
      item.addEventListener("click", (event) => {
        if (event.target && event.target.type === "number") return;
        const check = item.querySelector('input[type="checkbox"]');
        if (check) {
          check.checked = !check.checked;
        }
        updateProductQuantityVisibility();
        updateCantidadTotal();
      });
    });
  };

  bindProductListeners();
}

if (form) {
  form.addEventListener("reset", () => {
    setTimeout(() => {
      resetProductQuantities();
      setNewCodigo();
    }, 0);
  });
}

if (undoActionBtn) {
  undoActionBtn.addEventListener("click", () => {
    if (typeof undoAction === "function") {
      undoAction();
    }
    if (undoTimer) clearTimeout(undoTimer);
    undoToast?.classList.remove("is-visible");
    undoAction = null;
  });
}

if (loadDemoBtn) {
  loadDemoBtn.addEventListener("click", () => {
    const orders = loadOrders();
    const demoOrders = createDemoOrders();
    saveOrders([...demoOrders, ...orders]);
    renderBoard(loadOrders());
    renderTableroTable(loadOrders());
    renderPedidosTable(loadOrders());
    showToast("Demo cargada");
  });
}

const bindSidebarViews = () => {
  const links = document.querySelectorAll(".side-nav [data-view]");
  const panels = document.querySelectorAll(".view-panel");
  if (!links.length || !panels.length) return;

  panels.forEach((panel) => {
    if (!panel.classList.contains("is-hidden")) {
      panel.classList.add("is-visible");
    }
  });

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const view = link.dataset.view;
      links.forEach((item) => item.classList.toggle("is-active", item === link));
      panels.forEach((panel) => {
        const isTarget = panel.dataset.view === view;
        if (isTarget) {
          panel.classList.remove("is-hidden");
          requestAnimationFrame(() => {
            panel.classList.add("is-visible");
          });
        } else {
          panel.classList.remove("is-visible");
          panel.classList.add("is-hidden");
        }
      });
    });
  });
};

bindSidebarViews();

const applySidebarState = (collapsed) => {
  if (!appRoot) return;
  appRoot.classList.toggle("is-collapsed", collapsed);
  if (sidebarToggle) {
    sidebarToggle.setAttribute("aria-expanded", String(!collapsed));
    sidebarToggle.title = collapsed ? "Expandir sidebar" : "Contraer sidebar";
  }
};

if (sidebarToggle) {
  const stored = localStorage.getItem(sidebarStateKey);
  const initialCollapsed = stored === "true";
  applySidebarState(initialCollapsed);
  sidebarToggle.addEventListener("click", () => {
    const isCollapsed = appRoot?.classList.contains("is-collapsed");
    const next = !isCollapsed;
    applySidebarState(next);
    localStorage.setItem(sidebarStateKey, String(next));
  });
}

if (pedidosTableBody) {
  pedidosTableBody.addEventListener("click", (event) => {
    const btn = event.target?.closest?.("[data-action='delete-table']");
    if (!btn) return;
    const row = btn.closest("tr");
    deleteOrderFromTable(row?.dataset?.id);
  });
}

if (tableroTableBody) {
  tableroTableBody.addEventListener("click", (event) => {
    const btn = event.target?.closest?.("[data-action='finalize-table']");
    if (!btn) return;
    const row = btn.closest("tr");
    finalizeOrderWithUndo(row?.dataset?.id);
  });
}

const bindPedidosControls = () => {
  const headers = document.querySelectorAll(".orders-table thead th[data-sort]");
  const updateSortIndicators = () => {
    headers.forEach((th) => {
      th.classList.toggle("is-sorted", th.dataset.sort === pedidosState.sortKey);
    });
  };

  headers.forEach((th) => {
    th.addEventListener("click", () => {
      const key = th.dataset.sort;
      if (pedidosState.sortKey === key) {
        pedidosState.sortDir = pedidosState.sortDir === "asc" ? "desc" : "asc";
      } else {
        pedidosState.sortKey = key;
        pedidosState.sortDir = "asc";
      }
      updateSortIndicators();
      renderPedidosTable(loadOrders());
    });
  });

  if (pedidosSearch) {
    pedidosSearch.addEventListener("input", (event) => {
      pedidosState.search = event.target.value;
      pedidosState.visibleCount = pedidosState.pageSize;
      renderPedidosTable(loadOrders());
    });
  }

  if (monthFilter) {
    monthFilter.addEventListener("change", (event) => {
      pedidosState.month = event.target.value;
      pedidosState.visibleCount = pedidosState.pageSize;
      renderPedidosTable(loadOrders());
    });
  }

  if (dateFromInput) {
    dateFromInput.addEventListener("change", (event) => {
      pedidosState.dateFrom = event.target.value;
      pedidosState.visibleCount = pedidosState.pageSize;
      renderPedidosTable(loadOrders());
    });
  }

  if (dateToInput) {
    dateToInput.addEventListener("change", (event) => {
      pedidosState.dateTo = event.target.value;
      pedidosState.visibleCount = pedidosState.pageSize;
      renderPedidosTable(loadOrders());
    });
  }

  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", () => {
      pedidosState.search = "";
      pedidosState.month = "";
      pedidosState.dateFrom = "";
      pedidosState.dateTo = "";
      pedidosState.visibleCount = pedidosState.pageSize;
      if (pedidosSearch) pedidosSearch.value = "";
      if (monthFilter) monthFilter.value = "";
      if (dateFromInput) dateFromInput.value = "";
      if (dateToInput) dateToInput.value = "";
      renderPedidosTable(loadOrders());
    });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      pedidosState.visibleCount += pedidosState.pageSize;
      renderPedidosTable(loadOrders());
    });
  }

  if (exportCsvBtn) {
    exportCsvBtn.addEventListener("click", () => {
      const orders = loadOrders().filter((order) => order.estado === "finalizado");
      const filtered = applyPedidosFilters(orders);
      const rows = filtered.map((order) => ({
        codigo: order.codigo || "",
        cliente: order.cliente || "",
        producto: order.producto || "",
        cantidades: buildProductosNotas(order).join(", "),
        total: calculateTotal(order),
        pago: order.pago || "",
        fecha: order.fecha || "",
        creado: order.createdAt || "",
      }));
      const headers = [
        "codigo",
        "cliente",
        "producto",
        "cantidades",
        "total",
        "pago",
        "fecha",
        "creado",
      ];
      const csv = [
        headers.join(","),
        ...rows.map((row) =>
          headers
            .map((key) => `"${String(row[key]).replace(/"/g, '""')}"`)
            .join(",")
        ),
      ].join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "pedidos_finalizados.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  }

  if (exportPdfSidebar) {
    exportPdfSidebar.addEventListener("click", () => {
      const jsPDF = window.jspdf?.jsPDF;
      if (!jsPDF) {
        showToast("No se pudo generar el PDF.");
        return;
      }

      const orders = loadOrders();
      const activos = sortByNearestDate(orders.filter((order) => order.estado !== "finalizado"));
      const finalizados = applyPedidosFilters(
        orders.filter((order) => order.estado === "finalizado")
      );

      const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
      if (typeof doc.autoTable !== "function") {
        showToast("No se pudo generar el PDF.");
        return;
      }
      const left = 40;
      const right = 40;
      const lineGap = 16;
      let cursorY = 56;
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      const totalActivos = activos.length;
      const totalFinalizados = finalizados.length;
      const totalActivosMonto = activos.reduce((acc, order) => acc + calculateTotal(order), 0);
      const totalFinalizadosMonto = finalizados.reduce(
        (acc, order) => acc + calculateTotal(order),
        0
      );

      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("Reporte de pedidos | Premier Sur", left, cursorY);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      cursorY += lineGap;
      doc.text(`Generado: ${formatTimestamp(Date.now())}`, left, cursorY);
      cursorY += 12;
      doc.text(
        `Activos: ${totalActivos} | Finalizados: ${totalFinalizados}`,
        left,
        cursorY
      );
      cursorY += 12;
      doc.text(
        `Total activos: ${formatCurrency(totalActivosMonto)} | Total finalizados: ${formatCurrency(
          totalFinalizadosMonto
        )}`,
        left,
        cursorY
      );
      cursorY += 12;
      const filtrosTexto = [
        pedidosState.search ? `Búsqueda: ${pedidosState.search}` : null,
        pedidosState.month ? `Mes: ${pedidosState.month}` : null,
        pedidosState.dateFrom ? `Desde: ${formatDate(pedidosState.dateFrom)}` : null,
        pedidosState.dateTo ? `Hasta: ${formatDate(pedidosState.dateTo)}` : null,
      ]
        .filter(Boolean)
        .join(" | ");
      if (filtrosTexto) {
        doc.text(`Filtros finalizados: ${filtrosTexto}`, left, cursorY);
      }

      const tableStyles = {
        headStyles: { fillColor: [17, 111, 69], textColor: 255 },
        alternateRowStyles: { fillColor: [244, 247, 245] },
        styles: { fontSize: 9, cellPadding: 6, textColor: 25, valign: "middle" },
        theme: "striped",
        margin: { left, right },
        tableLineColor: [220, 224, 222],
        tableLineWidth: 0.5,
        didDrawPage: () => {
          doc.setFontSize(9);
          doc.setTextColor(120);
          const page = doc.internal.getNumberOfPages();
          doc.text(`Página ${page}`, pageWidth - right, pageHeight - 18, { align: "right" });
          doc.setTextColor(0);
        },
      };

      const addSectionTitle = (title) => {
        cursorY += 32;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(title, left, cursorY);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setDrawColor(220, 224, 222);
        doc.setLineWidth(0.6);
        doc.line(left, cursorY + 6, doc.internal.pageSize.getWidth() - right, cursorY + 6);
        cursorY += 14;
      };

      cursorY += 22;
      addSectionTitle("Activos en producción");
      doc.autoTable({
        ...tableStyles,
        startY: cursorY,
        head: [[
          "Código",
          "Cliente",
          "Estado",
          "Productos",
          "Cantidad total",
          "Pago",
          "Estado pago",
          "Fecha estimada",
          "Creado",
        ]],
        body: activos.map((order) => {
          const pagoText = order.pago || "Sin info";
          return [
            order.codigo || "Sin código",
            order.cliente || "Sin cliente",
            getPasoLabel(order.estado),
            buildProductosNotas(order).join(", ") || order.producto || "Sin productos",
            String(getTotalCantidad(order) || "Sin cantidad"),
            formatCurrency(calculateTotal(order)),
            pagoText,
            formatDate(order.fecha),
            formatDate(order.createdAt),
          ];
        }),
      });
      cursorY = doc.lastAutoTable.finalY || cursorY;

      cursorY += 16;
      addSectionTitle("Pedidos finalizados");
      doc.autoTable({
        ...tableStyles,
        startY: cursorY,
        head: [[
          "Código",
          "Cliente",
          "Productos",
          "Cantidad total",
          "Total",
          "Fecha estimada",
          "Creado",
        ]],
        body: finalizados.map((order) => [
          order.codigo || "Sin código",
          order.cliente || "Sin cliente",
          buildProductosNotas(order).join(", ") || order.producto || "Sin productos",
          String(getTotalCantidad(order) || "Sin cantidad"),
          formatCurrency(calculateTotal(order)),
          formatDate(order.fecha),
          formatDate(order.createdAt),
        ]),
      });

      const today = new Date();
      const dateTag = today.toLocaleDateString("en-CA");
      const fileName = `reporte_pedidos_${dateTag}.pdf`;
      doc.save(fileName);
    });
  }

  updateSortIndicators();
};

bindPedidosControls();
