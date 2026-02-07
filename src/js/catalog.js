import { siteData } from './data.js';

export const categories = [
    { id: "boda", name: "Anillos de Boda", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400" },
    { id: "compromiso", name: "Anillos de Compromiso", img: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=400" },
    { id: "graduacion", name: "Anillos de Graduación", img: "https://images.unsplash.com/photo-1617038224558-2854c900642f?q=80&w=400" },
    { id: "cadenas", name: "Cadenas", img: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=400" },
    { id: "casuales", name: "Anillos Casuales", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400" },
    { id: "chapas", name: "Chapas", img: "https://images.unsplash.com/photo-1589128777078-ce9e1906c86a?q=80&w=400" },
    { id: "dijes", name: "Dijes", img: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=400" }
];

export function setCatalogContent(html, isGrid = true) {
    const catalogGrid = document.getElementById("catalog-grid");
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

export function showCategories() {
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

export function showGallery(categoryId) {
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

export function showItemDetails(item) {
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

export function initCatalogListeners() {
    const catalogModal = document.getElementById("catalog-modal");
    const openCatalogBtn = document.getElementById("open-catalog-btn");
    const openCatalogBtn3d = document.getElementById("open-catalog-btn-3d");
    const closeCatalogBtn = document.getElementById("close-catalog-modal");

    if (openCatalogBtn) openCatalogBtn.addEventListener("click", () => { catalogModal.showModal(); showCategories(); });
    if (openCatalogBtn3d) openCatalogBtn3d.addEventListener("click", () => { catalogModal.showModal(); showCategories(); });
    if (closeCatalogBtn) closeCatalogBtn.addEventListener("click", () => catalogModal.close());
}
