// --- CSS IMPORTS ---
import './css/variables.css';
import './css/components.css';
import './css/header.css';
import './css/sections.css';
import './css/modals.css';
import './css/admin.css';
import './css/dark-mode.css';

// --- HTML COMPONENT INJECTION ---
import headerPart from './parts/header.html?raw';
import heroPart from './parts/hero.html?raw';
import servicesPart from './parts/services.html?raw';
import productsPart from './parts/products.html?raw';
import finishedWorksPart from './parts/finished-works.html?raw';
import aboutPart from './parts/about.html?raw';
import contactPart from './parts/contact.html?raw';
import footerPart from './parts/footer.html?raw';
import modalsPart from './parts/modals.html?raw';

function injectComponents() {
  const parts = {
    'header-part': headerPart,
    'hero-part': heroPart,
    'services-part': servicesPart,
    'products-part': productsPart,
    'finished-works-part': finishedWorksPart,
    'about-part': aboutPart,
    'contact-part': contactPart,
    'footer-part': footerPart,
    'modals-part': modalsPart
  };

  for (const [id, html] of Object.entries(parts)) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }
}

// Run injection immediately
injectComponents();

// --- MODULE IMPORTS ---
import { loadStorage } from './js/data.js';
import {
  renderCategories,
  renderServices,
  updateAboutSection,
  renderProducts,
  renderFinishedWorks,
  initProductModalListeners,
  initWorkModalListeners,
  initGlobalUI
} from './js/ui.js';
import { initCartListeners } from './js/cart.js';
import { initCatalogListeners } from './js/catalog.js';
import { initAdmin } from './js/admin.js';
import {
  initDrawer,
  initHeaderSlider,
  initPdfViewer,
  initServicesCarousel,
  initGlobalFeatures,
  initSearch
} from './js/features.js';
import { initJewelryModalListeners } from './js/ui.js';

// --- BOOTSTRAP ---
async function bootstrap() {
  await loadStorage();
  renderCategories();
  renderServices();
  updateAboutSection();
  renderProducts();
  renderFinishedWorks();

  initCartListeners();
  initCatalogListeners();
  initProductModalListeners();
  initAdmin();
  initDrawer();
  initHeaderSlider();
  initPdfViewer();
  initServicesCarousel();
  initGlobalFeatures();
  initSearch();
  initJewelryModalListeners();
  initWorkModalListeners();
  initGlobalUI();
}

// Ensure bootstrap runs after DOM is ready and injection is processed
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(bootstrap, 50));
} else {
  setTimeout(bootstrap, 50);
}
