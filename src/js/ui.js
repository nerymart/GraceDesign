import { siteData, formatCurrency, setCurrency } from './data.js';
import { addToCart, updateCartUI } from './cart.js';

export let productsShown = 8;

export function renderCategories() {
  const container = document.getElementById('category-scroller');
  if (!container) return;

  if (siteData.categories) {
    container.innerHTML = siteData.categories.map(cat => `
      <a href="${cat.link}" class="cat-link with-img">
        <div class="cat-img-wrapper">
          <img src="${cat.image}" alt="${cat.name}">
        </div>
        <span class="cat-text">${cat.name}</span>
      </a>
    `).join('');
  }
}

export function renderServices() {
  const servicesContainer = document.getElementById('services-list');
  if (!servicesContainer) return;
  servicesContainer.innerHTML = '';
  siteData.servicios.forEach((service) => {
    const card = document.createElement("div");
    card.className = "service-card";

    // Generate feature list HTML
    const featuresHtml = service.features ? `
      <ul class="service-features-list">
        ${service.features.map(f => `
          <li>
            <ion-icon name="${f.icon}"></ion-icon>
            <span>${f.text}</span>
          </li>
        `).join('')}
      </ul>
    ` : '';

    card.innerHTML = `
        <div class="service-image-container">
          <img src="${service.image}" alt="${service.title}">
        </div>
        <div class="service-info">
          <h3>${service.title}</h3>
          <p class="service-main-desc">${service.desc}</p>
          ${featuresHtml}
        </div>
      `;
    servicesContainer.appendChild(card);
  });
}

export function updateAboutSection() {
  const subtitle = document.querySelector('.custom-info h3');
  const desc = document.querySelector('.custom-info p');
  if (subtitle) subtitle.textContent = siteData.about.title;
  if (desc) desc.textContent = siteData.about.desc;
}

export function renderProducts() {
  const productsContainer = document.getElementById("products-list");
  if (!productsContainer) return;
  const content = [];

  // Render main promo (tall) if exists
  const tallPromo = siteData.promos.find(p => p.type === 'tall');

  if (tallPromo) {
    content.push(`
      <div class="feature-card tall">
        <span class="tagline">${tallPromo.tagline}</span>
        <h2>${tallPromo.title}</h2>
        <img src="${tallPromo.image_url}" class="feature-decor promo-img-tall" alt="Promo">
      </div>
    `);
  }

  const visibleProducts = siteData.productos.slice(0, productsShown);
  visibleProducts.forEach((product, index) => {
    if (index === 7) {
      const widePromo = siteData.promos.find(p => p.type === 'wide');

      if (widePromo) {
        content.push(`
          <div class="feature-card wide">
            <span class="tagline">${widePromo.tagline}</span>
            <h2>${widePromo.title}</h2>
            <button class="feature-btn">${widePromo.button_text}</button>
          </div>
        `);
      }
    }

    content.push(`
      <div class="product-card">
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" class="product-image" data-id="${product.id}">
        </div>
        <div class="product-details">
          <h3>${product.name}</h3>
          <div class="price-container">
            <span class="current-price">${formatCurrency(product.price)}</span>
          </div>
          <button class="btn btn-outline add-to-cart-quick" data-id="${product.id}">
             <ion-icon name="cart-outline"></ion-icon>
          </button>
        </div>
      </div>
    `);
  });

  productsContainer.innerHTML = content.join('');
  attachProductModalListeners();

  const viewMoreBtn = document.getElementById("view-more-btn");
  if (viewMoreBtn) {
    viewMoreBtn.style.display = productsShown >= siteData.productos.length ? "none" : "block";
    // Avoid multiple listeners if called again
    viewMoreBtn.onclick = () => {
      productsShown += 8;
      renderProducts();
    };
  }

  // Quick add to cart buttons
  document.querySelectorAll('.add-to-cart-quick').forEach(btn => {
    btn.onclick = (e) => {
      const id = parseInt(e.currentTarget.dataset.id);
      const p = siteData.productos.find(p => p.id === id);
      if (p) addToCart(p);
    };
  });
}

export let currentModalProduct = null;

export function openProductModal(p) {
  const modal = document.getElementById('product-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalPrice = document.getElementById('modal-price');

  if (p && modal) {
    currentModalProduct = p;
    modalImg.src = p.image;
    modalTitle.textContent = p.name;
    modalDesc.textContent = p.desc;
    modalPrice.textContent = formatCurrency(p.price);
    modal.showModal();
  }
}

export function attachProductModalListeners() {
  document.querySelectorAll('.product-image').forEach(img => {
    img.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      const p = siteData.productos.find(p => p.id === id);
      openProductModal(p);
    });
  });
}

export function initProductModalListeners() {
  const modal = document.getElementById('product-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const buyBtn = document.getElementById('modal-buy-btn');
  const addCartBtn = document.getElementById('modal-add-cart-btn');

  if (!modal) return;

  const closeAction = () => {
    modal.close();
    document.body.style.overflow = '';
  };

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeAction);

  if (buyBtn) {
    buyBtn.addEventListener('click', () => {
      if (!currentModalProduct) return;
      const phone = "50585052032";
      let message = `Hola, me interesa comprar:\n- ${currentModalProduct.name} (${formatCurrency(currentModalProduct.price)})`;
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
    });
  }

  if (addCartBtn) {
    addCartBtn.addEventListener('click', () => {
      if (currentModalProduct) {
        addToCart(currentModalProduct);
        // Optional: Close modal or show feedback
        // closeAction(); 
      }
    });
  }

  // Close when clicking outside
  modal.addEventListener('click', (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeAction();
    }
  });
}

export function renderFinishedWorks() {
  const worksContainer = document.getElementById("works-grid");
  const showcaseContainer = document.getElementById("works-showcase");
  if (!worksContainer || !showcaseContainer) return;
  const works = siteData.finishedWorks;
  showcaseContainer.innerHTML = works.slice(0, 4).map(w => `<div class="showcase-item work-card" data-id="${w.id}"><img src="${w.image}"></div>`).join('');
  worksContainer.innerHTML = works.slice(4, 12).map(w => `<div class="work-card" data-id="${w.id}"><img src="${w.image}"><div class="work-card-overlay"><span>Detalles</span></div></div>`).join('');
  attachWorkListeners();
}

export let currentWorkModal = null;

export function openWorkModal(work) {
  if (work) {
    currentWorkModal = work;
    document.getElementById("work-modal-img").src = work.image;
    document.getElementById("work-modal-title").textContent = work.name;
    document.getElementById("work-spec-type").textContent = work.type;
    document.getElementById("work-spec-weight").textContent = work.weight;
    document.getElementById("work-spec-size").textContent = work.size;
    document.getElementById("work-spec-metal").textContent = work.metal;
    document.getElementById("work-spec-pearls").textContent = work.pearls;
    document.getElementById("work-detail-modal").showModal();
  }
}

function attachWorkListeners() {
  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', () => {
      const work = siteData.finishedWorks.find(w => w.id === parseInt(card.dataset.id));
      openWorkModal(work);
    });
  });

  const closeWorkModal = document.getElementById("close-work-modal");
  if (closeWorkModal) closeWorkModal.onclick = () => document.getElementById("work-detail-modal").close();

  const quoteBtn = document.getElementById("work-quote-btn");
  if (quoteBtn) {
    quoteBtn.onclick = () => {
      if (currentWorkModal) {
        const phone = "50585052032";
        const message = `Hola Grace Designs, me interesa cotizar un trabajo similar a: "${currentWorkModal.name}" (${currentWorkModal.type}). ¿Me podrían brindar más información?`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
      }
    };
  }
}

const translations = {
  ES: { "nav.services": "Servicios", "nav.products": "Disponible", "nav.about": "Nosotros", "search.placeholder": "Que deseas hoy?", "hero.title1": "Descubre la mejor", "hero.title2": "JOYERÍA", "hero.title3": "de nuestra colección" },
  EN: { "nav.services": "Services", "nav.products": "Available", "nav.about": "About Us", "search.placeholder": "What are you looking for?", "hero.title1": "Discover the best", "hero.title2": "JEWELRY", "hero.title3": "from our collection" }
};

export function openJewelryModal(product) {
  const jewelryModal = document.getElementById('jewelry-detail-modal');
  const modalImg = document.getElementById('jewelry-modal-img');
  const modalTitle = document.getElementById('jewelry-modal-title');
  const specWeight = document.getElementById('jewelry-spec-weight');
  const specSize = document.getElementById('jewelry-spec-size');
  const specPrice = document.getElementById('jewelry-spec-price');
  const specDims = document.getElementById('jewelry-spec-dims');
  const jewelryBuyBtn = document.getElementById('jewelry-buy-btn');

  if (!jewelryModal) return;

  modalImg.src = product.img || product.image || (product.images ? product.images[0] : '');
  modalTitle.textContent = product.title || product.name || 'Sin Título';
  specWeight.textContent = product.peso || 'N/A';
  specSize.textContent = product.medida || 'A medida';

  // Dynamic price for jewelry modal
  const basePrice = parseFloat(product.price || product.precioDiseno || 0);
  specPrice.textContent = basePrice > 0 ? formatCurrency(basePrice) : 'Por cotizar';

  specDims.textContent = product.dims || product.dimensiones || 'Variado';

  // Configurar Link de WhatsApp
  const phoneNumber = '50588673708';
  const message = `Hola Grace Designs, me interesa adquirir el diseño "${product.title || product.name}" que vi en la galería web. ¿Me podrían brindar más detalles?`;
  jewelryBuyBtn.onclick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  jewelryModal.showModal();
  document.body.style.overflow = 'hidden';
}

// Ensure jewelry modal closing logic is global
export function initJewelryModalListeners() {
  const jewelryModal = document.getElementById('jewelry-detail-modal');
  const closeJewelryBtn = document.getElementById('close-jewelry-modal');
  const backToGalleryBtn = document.getElementById('back-to-gallery-btn');

  if (!jewelryModal) return;

  const closeModal = () => {
    jewelryModal.close();
    document.body.style.overflow = '';
  };

  if (closeJewelryBtn) closeJewelryBtn.addEventListener('click', closeModal);
  if (backToGalleryBtn) backToGalleryBtn.addEventListener('click', closeModal);

  jewelryModal.addEventListener('click', (e) => {
    const dialogDimensions = jewelryModal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeModal();
    }
  });
}

export function updateLanguage(lang) {
  const t = translations[lang]; if (!t) return;
  const setText = (sel, k) => { const el = document.querySelector(sel); if (el) el.textContent = t[k]; };
  setText('.primary-nav a[href="#services"]', 'nav.services');
  setText('.primary-nav a[href="#products"]', 'nav.products');
  setText('.primary-nav a[href="#about"]', 'nav.about');
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.placeholder = t['search.placeholder'];
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) heroTitle.innerHTML = `${t['hero.title1']}<br><span class="italic-text">${t['hero.title2']}</span><br>${t['hero.title3']}`;
}

// Inicializar selectores globales (Moneda)
export function initGlobalUI() {
  const currencyBtn = document.getElementById('currency-toggle');
  const symbolSpan = document.getElementById('current-currency-symbol');
  const textSpan = document.getElementById('current-currency-text');

  const updateHeader = () => {
    if (symbolSpan) symbolSpan.textContent = siteData.currentCurrency === 'USD' ? '$' : 'C$';
    if (textSpan) textSpan.textContent = siteData.currentCurrency;
  };

  if (currencyBtn) {
    currencyBtn.onclick = () => {
      const newCurr = siteData.currentCurrency === 'USD' ? 'NIO' : 'USD';
      setCurrency(newCurr);
    };
  }

  document.addEventListener('currencyChanged', () => {
    updateHeader();
    renderProducts();
    updateCartUI();
  });

  updateHeader();
}
