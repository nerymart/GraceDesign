import { siteData } from './data.js';
import { addToCart } from './cart.js';

export let productsShown = 8;

export function renderServices() {
  const servicesContainer = document.getElementById('services-list');
  if (!servicesContainer) return;
  servicesContainer.innerHTML = '';
  siteData.services.forEach((service) => {
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
  content.push(`
    <div class="feature-card tall">
      <span class="tagline">Joyas con Alma</span>
      <h2>Piezas atemporales hechas para brillar.</h2>
      <button class="feature-btn">Explorar Accesorios</button>
      <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600" class="feature-decor" alt="Decor">
    </div>
  `);

  const visibleProducts = siteData.products.slice(0, productsShown);
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
  attachProductModalListeners();

  const viewMoreBtn = document.getElementById("view-more-btn");
  if (viewMoreBtn) {
    viewMoreBtn.style.display = productsShown >= siteData.products.length ? "none" : "block";
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
      const p = siteData.products.find(p => p.id === id);
      if (p) addToCart(p);
    };
  });
}

export function attachProductModalListeners() {
  const modal = document.getElementById('product-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalPrice = document.getElementById('modal-price');

  document.querySelectorAll('.product-image').forEach(img => {
    img.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      const p = siteData.products.find(p => p.id === id);
      if (p && modal) {
        modalImg.src = p.image;
        modalTitle.textContent = p.name;
        modalDesc.textContent = p.desc;
        modalPrice.textContent = p.priceStr;
        modal.showModal();
      }
    });
  });
}

export function initProductModalListeners() {
  const modal = document.getElementById('product-modal');
  const closeModalBtn = document.getElementById('close-modal');
  if (closeModalBtn && modal) closeModalBtn.addEventListener('click', () => modal.close());
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

function attachWorkListeners() {
  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', () => {
      const work = siteData.finishedWorks.find(w => w.id === parseInt(card.dataset.id));
      if (work) {
        document.getElementById("work-modal-img").src = work.image;
        document.getElementById("work-modal-title").textContent = work.name;
        document.getElementById("work-spec-type").textContent = work.type;
        document.getElementById("work-spec-weight").textContent = work.weight;
        document.getElementById("work-spec-size").textContent = work.size;
        document.getElementById("work-spec-metal").textContent = work.metal;
        document.getElementById("work-spec-pearls").textContent = work.pearls;
        document.getElementById("work-detail-modal").showModal();
      }
    });
  });
  const closeWorkModal = document.getElementById("close-work-modal");
  if (closeWorkModal) closeWorkModal.onclick = () => document.getElementById("work-detail-modal").close();
}

const translations = {
  ES: { "nav.services": "Servicios", "nav.products": "Disponible", "nav.about": "Nosotros", "search.placeholder": "Que deseas hoy?", "hero.title1": "Descubre la mejor", "hero.title2": "JOYERÍA", "hero.title3": "de nuestra colección" },
  EN: { "nav.services": "Services", "nav.products": "Available", "nav.about": "About Us", "search.placeholder": "What are you looking for?", "hero.title1": "Discover the best", "hero.title2": "JEWELRY", "hero.title3": "from our collection" }
};

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
