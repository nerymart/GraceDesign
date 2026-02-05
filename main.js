// --- DYNAMIC DATA MANAGEMENT ---
let siteData = {
  about: {
    title: "Creamos la joya de tus sueños",
    desc: "Utilizamos la última tecnología de impresión 3D y diseño CAD para materializar tus ideas más creativas. Desde el boceto inicial hasta la pieza final en oro o plata.",
    images: ["/service-repair.png", "/service-polishing.png"]
  },
  services: [
    { title: "Reparación de Joyas", image: "/service-repair.png", desc: "Restauramos el brillo y la estructura de tus piezas favoritas." },
    { title: "Limpieza y Pulido", image: "/service-polishing.png", desc: "Servicio profesional para que tus joyas luzcan como nuevas." },
    { title: "Diseño Personalizado", image: "https://images.unsplash.com/photo-1589128777078-ce9e1906c86a?q=80&w=600", desc: "Creamos piezas únicas a tu medida con tecnología 3D." },
    { title: "Valuación", image: "https://images.unsplash.com/photo-1617038224558-2854c900642f?q=80&w=600", desc: "Certificación y avalúo profesional de tus prendas." }
  ],
  products: [],
  catalogItems: [
    { id: 101, name: "Anillo de Boda Real", category: "boda", images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600"], peso: "6.2g", medida: "8", precioDiseno: "$750", dimensiones: "4mm ancho" },
    { id: 102, name: "Anillo Compromiso Eterno", category: "compromiso", images: ["https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600"], peso: "4.8g", medida: "6", precioDiseno: "$1,200", dimensiones: "2mm base" }
  ],
  finishedWorks: []
};

function loadStorage() {
  const saved = localStorage.getItem('joyeriaGraceData');
  if (saved) {
    siteData = JSON.parse(saved);
  }

  // Ensure finishedWorks is populated if missing or empty
  if (!siteData.finishedWorks || siteData.finishedWorks.length === 0) {
    siteData.finishedWorks = [];
    const workTypes = ["Anillo", "Pulsera", "Cadena", "Dije", "Aretes"];
    const metals = ["Oro 14k", "Oro 18k", "Plata .925", "Platino"];
    const images = [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600",
      "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=600",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600",
      "https://images.unsplash.com/photo-1589128777078-ce9e1906c86a?q=80&w=600",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600"
    ];
    for (let i = 0; i < 25; i++) {
      siteData.finishedWorks.push({
        id: 200 + i,
        name: `${workTypes[i % workTypes.length]} Realizado ${i + 1}`,
        type: workTypes[i % workTypes.length],
        weight: `${(Math.random() * 10 + 2).toFixed(1)}g`,
        size: i % 2 === 0 ? "18cm" : "Medida 7",
        metal: metals[i % metals.length],
        pearls: i % 3 === 0 ? "4 Perlas cultivadas" : "Sin perlas",
        image: images[i % images.length] + `&random=${i}`
      });
    }
    saveStorage();
  }

  if (!saved) {
    const baseProducts = [
      { name: "Anillo de Oro", type: "Anillo", price: 15000, img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600" },
      { name: "Collar de Plata", type: "Collar", price: 2500, img: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=600" }
    ];
    for (let i = 0; i < 16; i++) {
      const base = baseProducts[i % baseProducts.length];
      siteData.products.push({
        id: i + 1,
        name: base.name,
        price: base.price + (i * 100),
        priceStr: `$${(base.price + (i * 100)).toLocaleString()}`,
        image: base.img,
        desc: `Pieza única diseñada a medida.`
      });
    }
    saveStorage();
  }
}

function saveStorage() {
  localStorage.setItem('joyeriaGraceData', JSON.stringify(siteData));
}

loadStorage();

const products = siteData.products;

// Render Services from siteData
const servicesContainer = document.getElementById('services-list');
function renderServices() {
  if (!servicesContainer) return;
  servicesContainer.innerHTML = '';
  siteData.services.forEach((service) => {
    const card = document.createElement("div");
    card.className = "service-card";
    card.innerHTML = `
        <img src="${service.image}" alt="${service.title}">
        <div class="service-info">
          <h3>${service.title}</h3>
          <p>${service.desc}</p>
        </div>
      `;
    servicesContainer.appendChild(card);
  });
}
renderServices();

// Update About Section from siteData
function updateAboutSection() {
  const subtitle = document.querySelector('.custom-info h3');
  const desc = document.querySelector('.custom-info p');
  if (subtitle) subtitle.textContent = siteData.about.title;
  if (desc) desc.textContent = siteData.about.desc;
}
updateAboutSection();

// Render Products Logic
const productsContainer = document.getElementById("products-list");
const viewMoreBtn = document.getElementById("view-more-btn");
let productsShown = 8;

function renderProducts() {
  if (!productsContainer) return;
  const content = [];
  content.push(`
    <div class="feature-card tall">
      <span class="tagline">Joyas con Alma</span>
      <h2>Piezas atemporales hechas para brillar.</h2>
      <button class="feature-btn">Explorar Accesorios</button>
      <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600" class="feature-decor" alt="Decor">
    </div>
  `);

  const visibleProducts = products.slice(0, productsShown);
  visibleProducts.forEach((product, index) => {
    if (index === 7) {
      content.push(`
        <div class="feature-card wide">
          <span class="tagline">Detalles que Enamoran</span>
          <h2>Cada accesorio cuenta una historia única.</h2>
          <button class="feature-btn">Ver Más</button>
        </div>
      `);
    }

    content.push(`
      <div class="product-card">
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" class="product-image" data-id="${product.id}">
        </div>
        <div class="product-details">
          <h3>${product.name}</h3>
          <div class="price-container">
            <span class="current-price">${product.priceStr}</span>
          </div>
          <button class="btn btn-outline add-to-cart-quick" data-id="${product.id}">
             <ion-icon name="cart-outline"></ion-icon>
          </button>
        </div>
      </div>
    `);
  });

  productsContainer.innerHTML = content.join('');
  attachModalListeners();

  if (viewMoreBtn) {
    viewMoreBtn.style.display = productsShown >= products.length ? "none" : "block";
  }
}

if (viewMoreBtn) {
  viewMoreBtn.addEventListener("click", () => {
    productsShown += 8;
    renderProducts();
  });
}

// --- CART LOGIC ---
const cart = [];
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const openCartBtn = document.getElementById("cart-btn");
const closeCartBtn = document.getElementById("close-cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

function updateCartUI() {
  if (cartCount) cartCount.textContent = cart.length;
  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p style="text-align: center;">Tu carrito está vacío.</p>`;
    cartTotalEl.textContent = "$0 MXN";
  } else {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price;
      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.innerHTML = `
        <div class="cart-item-info">
             <span class="cart-item-name">${item.name}</span>
             <span class="cart-item-price">${item.priceStr}</span>
        </div>
        <button class="remove-item" data-index="${index}">&times;</button>
      `;
      cartItemsContainer.appendChild(itemEl);
    });
    cartTotalEl.textContent = `$${total.toLocaleString()} MXN`;

    document.querySelectorAll(".remove-item").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.target.dataset.index);
        cart.splice(idx, 1);
        updateCartUI();
      });
    });
  }
}

function addToCart(product) {
  cart.push(product);
  updateCartUI();
  if (cartCount) {
    cartCount.style.transform = "scale(1.2)";
    setTimeout(() => cartCount.style.transform = "scale(1)", 200);
  }
}

if (openCartBtn) openCartBtn.addEventListener("click", () => cartModal.showModal());
if (closeCartBtn) closeCartBtn.addEventListener("click", () => cartModal.close());

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) return;
    const phone = "523312345678";
    let message = "Hola, me interesa comprar:\n" + cart.map(i => `- ${i.name} (${i.priceStr})`).join("\n");
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  });
}

// --- CATALOG LOGIC ---
const catalogModal = document.getElementById("catalog-modal");
const openCatalogBtn = document.getElementById("open-catalog-btn");
const openCatalogBtn3d = document.getElementById("open-catalog-btn-3d");
const closeCatalogBtn = document.getElementById("close-catalog-modal");
const catalogGrid = document.getElementById("catalog-grid");

const categories = [
  { id: "boda", name: "Anillos de Boda", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400" },
  { id: "compromiso", name: "Anillos de Compromiso", img: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=400" },
  { id: "graduacion", name: "Anillos de Graduación", img: "https://images.unsplash.com/photo-1617038224558-2854c900642f?q=80&w=400" },
  { id: "cadenas", name: "Cadenas", img: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=400" },
  { id: "casuales", name: "Anillos Casuales", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400" },
  { id: "chapas", name: "Chapas", img: "https://images.unsplash.com/photo-1589128777078-ce9e1906c86a?q=80&w=400" },
  { id: "dijes", name: "Dijes", img: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=400" }
];

function setCatalogContent(html, isGrid = true) {
  if (!catalogGrid) return;
  catalogGrid.innerHTML = html;
  catalogGrid.style.display = isGrid ? "grid" : "block";
  if (isGrid) {
    catalogGrid.style.gridTemplateColumns = "repeat(auto-fill, minmax(200px, 1fr))";
    catalogGrid.style.gap = "1rem";
  } else {
    catalogGrid.style.gridTemplateColumns = "none";
  }
}

function showCategories() {
  const title = document.querySelector("#catalog-modal h2");
  if (title) title.textContent = "Tipos de Prenda";
  let html = categories.map(cat => `
        <div class="category-card" data-cat="${cat.id}" style="background-image: url('${cat.img}')">
            <div class="category-overlay"><h3>${cat.name}</h3></div>
        </div>
    `).join("");
  setCatalogContent(html);
  document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => showGallery(card.dataset.cat));
  });
}

function showGallery(categoryId) {
  const cat = categories.find(c => c.id === categoryId);
  const title = document.querySelector("#catalog-modal h2");
  if (title) title.textContent = cat.name;

  const items = siteData.catalogItems.filter(i => i.category === categoryId);
  let html = `
    <button class="back-btn" id="width-auto-back"><ion-icon name="arrow-back-outline"></ion-icon> Volver a Categorías</button>
    <div class="gallery-grid-internal">
  `;

  if (items.length === 0) {
    html += `<p style="grid-column: 1/-1; text-align: center; color: gray;">No hay diseños disponibles en esta categoría por el momento.</p>`;
  } else {
    items.forEach(item => {
      html += `
        <div class="catalog-item-card" data-id="${item.id}">
            <div class="item-img-container">
                <img src="${item.images[0]}" alt="${item.name}">
            </div>
            <div class="item-info">
                <h4>${item.name}</h4>
                <p class="item-price-small">Desde ${item.precioDiseno}</p>
            </div>
        </div>
      `;
    });
  }

  html += `
    </div>
    <div style="text-align: center; margin-top: 2rem;">
        <button class="btn btn-outline" id="view-more-catalog">Ver más diseños</button>
    </div>
  `;

  setCatalogContent(html, false);
  document.getElementById("width-auto-back").addEventListener("click", showCategories);

  document.querySelectorAll(".catalog-item-card").forEach(card => {
    card.addEventListener("click", () => {
      const itemId = parseInt(card.dataset.id);
      const item = siteData.catalogItems.find(i => i.id === itemId);
      if (item) showItemDetails(item);
    });
  });
}

function showItemDetails(item) {
  const title = document.querySelector("#catalog-modal h2");
  if (title) title.textContent = "Detalles del Diseño";

  let carouselHtml = `
    <div class="details-carousel">
        <div class="carousel-images-container">
            ${item.images.map((img, idx) => `
                <img src="${img}" class="carousel-img ${idx === 0 ? 'active' : ''}" data-index="${idx}">
            `).join('')}
        </div>
        ${item.images.length > 1 ? `
            <button class="carousel-ctrl prev" id="detail-prev"><ion-icon name="chevron-back"></ion-icon></button>
            <button class="carousel-ctrl next" id="detail-next"><ion-icon name="chevron-forward"></ion-icon></button>
        ` : ''}
    </div>
  `;

  const phone = "523312345678";
  const message = `Hola, me interesa adquirir este diseño: ${item.name} (Ref: ${item.id}).`;
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  let html = `
    <button class="back-btn" id="back-to-gallery"><ion-icon name="arrow-back-outline"></ion-icon> Volver a la Galería</button>
    <div class="item-details-layout">
        <div class="details-visual">
            ${carouselHtml}
        </div>
        <div class="details-specs">
            <h3>${item.name}</h3>
            <div class="specs-grid">
                <div class="spec-item"><strong>Peso:</strong> <span>${item.peso}</span></div>
                <div class="spec-item"><strong>Medida:</strong> <span>${item.medida}</span></div>
                <div class="spec-item"><strong>Precio de Diseño:</strong> <span>${item.precioDiseno}</span></div>
                <div class="spec-item"><strong>Dimensiones:</strong> <span>${item.dimensiones || 'N/A'}</span></div>
            </div>
            <button class="btn btn-wa-adquirir" onclick="window.open('${waUrl}', '_blank')">
                <ion-icon name="logo-whatsapp"></ion-icon> Adquirir Diseño
            </button>
        </div>
    </div>
  `;

  setCatalogContent(html, false);
  document.getElementById("back-to-gallery").addEventListener("click", () => showGallery(item.category));

  if (item.images.length > 1) {
    let currentIdx = 0;
    const images = document.querySelectorAll(".carousel-img");
    const update = (newIdx) => {
      images.forEach(img => img.classList.remove('active'));
      images[newIdx].classList.add('active');
      currentIdx = newIdx;
    };
    document.getElementById("detail-prev").addEventListener("click", () => {
      update(currentIdx === 0 ? item.images.length - 1 : currentIdx - 1);
    });
    document.getElementById("detail-next").addEventListener("click", () => {
      update(currentIdx === item.images.length - 1 ? 0 : currentIdx + 1);
    });
  }
}

if (openCatalogBtn) openCatalogBtn.addEventListener("click", () => { catalogModal.showModal(); showCategories(); });
if (openCatalogBtn3d) openCatalogBtn3d.addEventListener("click", () => { catalogModal.showModal(); showCategories(); });
if (closeCatalogBtn) closeCatalogBtn.addEventListener("click", () => catalogModal.close());

// --- PRODUCT MODAL ---
const modal = document.getElementById('product-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalPrice = document.getElementById('modal-price');

function attachModalListeners() {
  document.querySelectorAll('.product-image').forEach(img => {
    img.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      const p = products.find(p => p.id === id);
      if (p && modal) {
        modalImg.src = p.image;
        modalTitle.textContent = p.name;
        modalDesc.textContent = p.desc;
        modalPrice.textContent = p.priceStr;
        modal.showModal();
      }
    });
  });
  document.querySelectorAll('.add-to-cart-quick').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.dataset.id);
      const p = products.find(p => p.id === id);
      if (p) addToCart(p);
    });
  });
}
if (closeModalBtn) closeModalBtn.addEventListener('click', () => modal.close());

// --- ADMIN LOGIC (PROFESSIONAL REVISITED) ---
window.currentAdminSection = 'nosotros';

function initAdmin() {
  const loginModal = document.getElementById('login-modal');
  const adminDashboard = document.getElementById('admin-dashboard');
  const openLoginBtn = document.getElementById('open-login-btn');
  const closeLoginBtn = document.getElementById('close-login-modal');
  const loginForm = document.getElementById('login-form');

  if (openLoginBtn) openLoginBtn.onclick = (e) => { e.preventDefault(); loginModal.showModal(); };
  if (closeLoginBtn) closeLoginBtn.onclick = () => loginModal.close();

  if (loginForm) {
    loginForm.onsubmit = (e) => {
      e.preventDefault();
      const user = document.getElementById('login-user').value;
      const pass = document.getElementById('login-pass').value;
      if (user === 'nerys' && pass === 'Estudiante*1') {
        loginModal.close();
        adminDashboard.classList.add('active');
        window.renderAdminSection();
      } else alert('Usuario o contraseña incorrectos');
    };
  }

  // Handle Logout & Close outside delegation just in case
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) logoutBtn.onclick = () => { location.reload(); };

  const closeAdminBtn = document.getElementById('close-admin-btn');
  if (closeAdminBtn) closeAdminBtn.onclick = () => { adminDashboard.classList.remove('active'); };

  // Sidebar delegate
  const sidebar = document.querySelector('.admin-sidebar');
  if (sidebar) {
    sidebar.onclick = (e) => {
      const btn = e.target.closest('.nav-item');
      if (!btn || !btn.dataset.section) return;

      console.log('Admin Nav Clicked:', btn.dataset.section);

      document.querySelectorAll('.admin-sidebar .nav-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      window.currentAdminSection = btn.dataset.section;
      window.renderAdminSection();
    };
  }

  // Initial render IF dashboard is open (for direct reloads/state keep)
  if (adminDashboard && adminDashboard.classList.contains('active')) {
    window.renderAdminSection();
  }
}

window.renderAdminSection = function () {
  const adminContent = document.getElementById('admin-content');
  if (!adminContent) {
    console.error('Admin content container not found!');
    return;
  }

  console.log('Rendering Admin Section:', window.currentAdminSection);
  adminContent.innerHTML = '';

  const sectionTitle = {
    'nosotros': 'Sección Nosotros',
    'servicios': 'Servicios Disponibles',
    'productos': 'Productos / Accesorios',
    'catalogo': 'Catálogo de Diseños'
  }[window.currentAdminSection];

  adminContent.innerHTML = `
    <div class="admin-header">
      <h4>${sectionTitle}</h4>
      ${window.currentAdminSection !== 'nosotros' ? `<button class="btn" onclick="window.showForm('${window.currentAdminSection}')">+ Agregar Nuevo</button>` : ''}
    </div>
    <div id="admin-list-container"></div>
    <div id="admin-form-container"></div>
  `;

  window.renderList();
};

initAdmin();

window.renderList = function () {
  const listContainer = document.getElementById('admin-list-container');
  if (!listContainer) return;
  listContainer.innerHTML = '';

  const section = window.currentAdminSection;

  if (section === 'nosotros') {
    listContainer.innerHTML = `
      <div class="admin-section-card">
        <h6>Información de la Sección</h6>
        <p class="section-subtitle">Edita los textos principales de la sección Nosotros y 3D.</p>
        <div class="form-group">
          <label>Título Principal</label>
          <input type="text" id="a-about-t" value="${siteData.about.title}">
        </div>
        <div class="form-group">
          <label>Descripción / Bio</label>
          <textarea id="a-about-d" class="admin-textarea">${siteData.about.desc}</textarea>
        </div>
        <div style="margin-top:2rem;">
            <button class="admin-save-btn" onclick="window.saveNosotros()">Guardar Cambios</button>
        </div>
      </div>
    `;
    return;
  }

  const items = {
    'servicios': siteData.services,
    'productos': siteData.products,
    'catalogo': siteData.catalogItems
  }[window.currentAdminSection];

  const html = items.map((item, i) => `
    <div class="admin-item-row">
      <img src="${(item.image || (item.images ? item.images[0] : ''))}" alt="">
      <div class="admin-item-info">
        <strong>${item.name || item.title}</strong>
        <small>${item.priceStr || item.category || 'Categoría: Servicio'}</small>
      </div>
      <div class="admin-item-status">
        <span class="badge">Visto en la web</span>
      </div>
      <div class="action-btns">
        <button class="btn-icon btn-edit" onclick="window.showForm('${window.currentAdminSection}', ${i})"><ion-icon name="create-outline"></ion-icon></button>
        <button class="btn-icon btn-delete" onclick="window.deleteItem('${window.currentAdminSection}', ${i})"><ion-icon name="trash-outline"></ion-icon></button>
      </div>
    </div>
  `).join('');

  listContainer.innerHTML = `<div class="admin-table">${html}</div>`;
}

window.showForm = (type, index = null) => {
  const isEdit = index !== null;
  const listContainer = document.getElementById('admin-list-container');
  const items = siteData[type === 'catalogo' ? 'catalogItems' : type];
  const item = isEdit ? items[index] : {};

  listContainer.style.display = 'none';
  const header = document.querySelector('.admin-header');
  if (header) header.style.display = 'none';

  const formContainer = document.getElementById('admin-form-container');

  let content = '';
  if (type === 'servicios') {
    content = `
      <div class="admin-section-card">
        <h6>Información Básica</h6>
        <p class="section-subtitle">Datos principales del servicio.</p>
        <div class="admin-inputs-grid">
            <div class="form-group">
                <label>Título del Servicio</label>
                <input type="text" id="edit-title" value="${item.title || ''}" placeholder="Ej. Limpieza de Joyas">
            </div>
            <div class="form-group">
                <label>URL de la Imagen</label>
                <input type="text" id="edit-image" value="${item.image || ''}" placeholder="https://...">
            </div>
            <div class="form-group full-width">
                <label>Descripción Detallada</label>
                <textarea id="edit-desc" class="admin-textarea" placeholder="Describe el servicio...">${item.desc || ''}</textarea>
            </div>
        </div>
      </div>
    `;
  } else if (type === 'productos') {
    content = `
      <div class="admin-section-card">
        <h6>Información del Producto</h6>
        <p class="section-subtitle">Datos principales que aparecerán en la tienda.</p>
        <div class="admin-inputs-grid">
            <div class="form-group">
                <label>Nombre del Accesorio</label>
                <input type="text" id="edit-name" value="${item.name || ''}" placeholder="Ej. Collar de Plata Elegante">
            </div>
            <div class="form-group">
                <label>URL de Imagen</label>
                <input type="text" id="edit-image" value="${item.image || ''}" placeholder="https://...">
            </div>
        </div>
      </div>
      <div class="admin-section-card">
        <h6>Precio e Inventario</h6>
        <div class="admin-inputs-grid">
            <div class="form-group">
                <label>Precio Actual (MXN)</label>
                <input type="number" id="edit-price" value="${item.price || 0}">
            </div>
        </div>
      </div>
    `;
  } else if (type === 'catalogo') {
    content = `
        <div class="admin-section-card">
            <h6>Especificaciones del Diseño</h6>
            <p class="section-subtitle">Detalles técnicos del diseño en el catálogo.</p>
            <div class="admin-inputs-grid">
                <div class="form-group">
                    <label>Nombre del Diseño</label>
                    <input type="text" id="edit-name" value="${item.name || ''}">
                </div>
                <div class="form-group">
                    <label>Categoría</label>
                    <select id="edit-category">
                        <option value="boda" ${item.category === 'boda' ? 'selected' : ''}>Anillos de Boda</option>
                        <option value="compromiso" ${item.category === 'compromiso' ? 'selected' : ''}>Anillos de Compromiso</option>
                        <option value="graduacion" ${item.category === 'graduacion' ? 'selected' : ''}>Graduación</option>
                        <option value="cadenas" ${item.category === 'cadenas' ? 'selected' : ''}>Cadenas</option>
                        <option value="casuales" ${item.category === 'casuales' ? 'selected' : ''}>Anillos Casuales</option>
                        <option value="chapas" ${item.category === 'chapas' ? 'selected' : ''}>Chapas</option>
                        <option value="dijes" ${item.category === 'dijes' ? 'selected' : ''}>Dijes</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Peso Estimado</label>
                    <input type="text" id="edit-peso" value="${item.peso || ''}" placeholder="Ej. 6.2g">
                </div>
                <div class="form-group">
                    <label>Medida Sugerida</label>
                    <input type="text" id="edit-medida" value="${item.medida || ''}" placeholder="Ej. 8">
                </div>
                <div class="form-group">
                    <label>Precio de Diseño / Referencial</label>
                    <input type="text" id="edit-precioDiseno" value="${item.precioDiseno || ''}" placeholder="Ej. $750">
                </div>
                <div class="form-group">
                    <label>Dimensiones / Ancho</label>
                    <input type="text" id="edit-dimensiones" value="${item.dimensiones || ''}" placeholder="Ej. 4mm">
                </div>
            </div>
        </div>
        <div class="admin-section-card">
            <h6>Galería de Imágenes</h6>
            <div class="admin-inputs-grid">
                <div class="form-group">
                    <label>URL Imagen Principal</label>
                    <input type="text" id="edit-img1" value="${item.images ? item.images[0] : ''}">
                </div>
                <div class="form-group">
                    <label>URL Imagen Secundaria (Opcional)</label>
                    <input type="text" id="edit-img2" value="${(item.images && item.images[1]) ? item.images[1] : ''}">
                </div>
            </div>
        </div>
    `;
  }

  formContainer.innerHTML = `
    <button class="admin-back-btn" onclick="window.cancelEdit()">
        <ion-icon name="arrow-back-outline"></ion-icon> Cancelar y volver
    </button>
    <div class="admin-header" style="margin-bottom: 2rem;">
        <h4>${isEdit ? 'Editar Registro' : 'Nuevo Registro'}</h4>
    </div>
    ${content}
    <div style="display:flex; gap:1.5rem; margin-bottom: 5rem;">
        <button class="admin-save-btn" onclick="window.saveItem('${type}', ${index})" style="width: auto; min-width: 200px;">
            <ion-icon name="save-outline"></ion-icon> Guardar Registro
        </button>
    </div>
  `;
};

window.cancelEdit = () => {
  renderAdminSection();
};

window.saveNosotros = () => {
  siteData.about.title = document.getElementById('a-about-t').value;
  siteData.about.desc = document.getElementById('a-about-d').value;
  saveStorage();
  alert('Sección Nosotros actualizada correctamente');
  location.reload();
};

window.saveItem = (type, index) => {
  const isEdit = index !== null;
  const items = siteData[type === 'catalogo' ? 'catalogItems' : type];

  let newItem = isEdit ? { ...items[index] } : { id: Date.now() };

  if (type === 'servicios') {
    newItem.title = document.getElementById('edit-title').value;
    newItem.image = document.getElementById('edit-image').value;
    newItem.desc = document.getElementById('edit-desc').value;
  } else if (type === 'productos') {
    newItem.name = document.getElementById('edit-name').value;
    newItem.image = document.getElementById('edit-image').value;
    newItem.price = parseInt(document.getElementById('edit-price').value);
    newItem.priceStr = `$${newItem.price.toLocaleString()}`;
    newItem.desc = newItem.desc || 'Pieza exclusiva.';
  } else if (type === 'catalogo') {
    newItem.name = document.getElementById('edit-name').value;
    newItem.category = document.getElementById('edit-category').value;
    const img1 = document.getElementById('edit-img1').value;
    const img2 = document.getElementById('edit-img2').value;
    newItem.images = [img1];
    if (img2) newItem.images.push(img2);
    newItem.peso = document.getElementById('edit-peso').value;
    newItem.medida = document.getElementById('edit-medida').value;
    newItem.precioDiseno = document.getElementById('edit-precioDiseno').value;
    newItem.dimensiones = document.getElementById('edit-dimensiones').value;
  }

  if (isEdit) {
    items[index] = newItem;
  } else {
    items.push(newItem);
  }

  saveStorage();
  alert('Guardado con éxito');
  location.reload();
};

window.deleteItem = (type, index) => {
  if (confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
    const items = siteData[type === 'catalogo' ? 'catalogItems' : type];
    items.splice(index, 1);
    saveStorage();
    alert('Eliminado con éxito');
    location.reload();
  }
};

// --- DRAWER ---
document.addEventListener('click', (e) => {
  if (e.target.closest('.mobile-menu-btn')) document.getElementById('filter-drawer').classList.add('active');
  if (e.target.closest('#close-filter-drawer') || e.target.closest('.drawer-link')) document.getElementById('filter-drawer').classList.remove('active');
});

// --- HEADER SLIDER LOGIC ---
function initHeaderSlider() {
  const slides = document.querySelectorAll('.header-slider .slide');
  const dots = document.querySelectorAll('.dot');
  if (slides.length === 0) return;

  let currentSlide = 0;
  const slideInterval = 5000; // 5 segundos
  let autoSlide = setInterval(nextSlide, slideInterval);

  function updateDots(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
  }

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    updateDots(currentSlide);
    resetTimer();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function resetTimer() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, slideInterval);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadStorage();
  initHeaderSlider();
  renderProducts();
  renderFinishedWorks();
  initEngagementSlider();
});

function initEngagementSlider() {
  const slides = document.querySelectorAll('.eng-slide');
  let currentSlide = 0;
  if (slides.length === 0) return;

  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 5000);

  const pdfBtn = document.getElementById("view-engagement-pdf");
  const pdfModal = document.getElementById("pdf-modal");
  const pdfFrame = document.getElementById("pdf-frame");
  const closePdfBtn = document.getElementById("close-pdf-modal");

  if (pdfBtn && pdfModal && pdfFrame) {
    pdfBtn.addEventListener("click", () => {
      // #toolbar=0&navpanes=0&scrollbar=0 discourages some download/print controls in many browsers
      pdfFrame.src = "/pdf/catalogo.pdf#toolbar=0&navpanes=0";
      pdfModal.showModal();
    });
  }

  if (closePdfBtn && pdfModal) {
    closePdfBtn.addEventListener("click", () => {
      pdfModal.close();
      pdfFrame.src = ""; // Clear src to stop loading/processing when closed
    });
  }
}

// --- FINISHED WORKS LOGIC ---
const viewMoreWorksBtn = document.getElementById("view-more-works-btn");
const workModal = document.getElementById("work-detail-modal");
const closeWorkModal = document.getElementById("close-work-modal");
let worksShown = 8;

function renderFinishedWorks() {
  const worksContainer = document.getElementById("works-grid");
  const showcaseContainer = document.getElementById("works-showcase");
  if (!worksContainer || !showcaseContainer) return;

  const works = siteData.finishedWorks;

  // Render Showcase (Top 4)
  const showcaseWorks = works.slice(0, 4);
  showcaseContainer.innerHTML = showcaseWorks.map(work => `
    <div class="showcase-item work-card" data-id="${work.id}">
      <img src="${work.image}" alt="${work.name}">
    </div>
  `).join('');

  // Render Main Gallery (from 5 onwards)
  const visibleWorks = works.slice(4, worksShown + 4);
  worksContainer.innerHTML = visibleWorks.map(work => `
    <div class="work-card" data-id="${work.id}">
      <img src="${work.image}" alt="${work.name}">
      <div class="work-card-overlay">
        <span>Ver Detalles</span>
      </div>
    </div>
  `).join('');

  if (viewMoreWorksBtn) {
    viewMoreWorksBtn.style.display = (worksShown + 4) >= works.length ? "none" : "block";
  }

  // Scroll logic for new button
  const scrollBtn = document.getElementById("scroll-to-gallery");
  if (scrollBtn) {
    scrollBtn.onclick = () => {
      worksContainer.scrollIntoView({ behavior: 'smooth' });
    };
  }

  attachWorkListeners();
}

function attachWorkListeners() {
  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id);
      const work = siteData.finishedWorks.find(w => w.id === id);
      if (work) showWorkDetails(work);
    });
  });
}

function showWorkDetails(work) {
  if (!workModal) return;

  document.getElementById("work-modal-img").src = work.image;
  document.getElementById("work-modal-title").textContent = work.name;
  document.getElementById("work-spec-type").textContent = work.type;
  document.getElementById("work-spec-weight").textContent = work.weight;
  document.getElementById("work-spec-size").textContent = work.size;
  document.getElementById("work-spec-metal").textContent = work.metal;
  document.getElementById("work-spec-pearls").textContent = work.pearls;

  const phone = "523312345678";
  const message = `Hola, me interesa cotizar esta prenda realizada: ${work.name} (ID: ${work.id})`;
  document.getElementById("work-quote-btn").onclick = () => {
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  workModal.showModal();
}

if (viewMoreWorksBtn) {
  viewMoreWorksBtn.addEventListener("click", () => {
    worksShown += 8;
    renderFinishedWorks();
  });
}

if (closeWorkModal) closeWorkModal.addEventListener("click", () => workModal.close());
