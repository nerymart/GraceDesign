import '../css/category.css';
import { siteData } from './data.js';
import { openJewelryModal, initJewelryModalListeners } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos
    const tabBtns = document.querySelectorAll('.tab-btn');
    const categoryTitle = document.getElementById('current-category-title');
    const productGrid = document.querySelector('.products-grid');

    if (!tabBtns.length || !categoryTitle || !productGrid) return;

    // Inicializar listeners del modal una sola vez
    initJewelryModalListeners();

    // Función para renderizar productos por subcategoría
    const renderProducts = (category) => {
        const products = siteData.catalogItems ? siteData.catalogItems.filter(item => item.category === category) : [];

        productGrid.innerHTML = ''; // Limpiar grid

        if (products.length === 0) {
            productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888; font-size: 1.2rem; margin-top: 2rem;">No hay productos disponibles en esta categoría.</p>';
            return;
        }

        products.forEach(prod => {
            const prodImg = prod.images ? prod.images[0] : (prod.image || '');
            const badgeHTML = prod.badge ? `<span class="product-badge ${prod.badgeClass || 'badge-sale'}">${prod.badge}</span>` : '';

            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image-container">
                    <img src="${prodImg}" alt="${prod.name || prod.title}" class="product-image">
                    ${badgeHTML}
                </div>
                <div class="product-details">
                    <h3>${prod.name || prod.title}</h3>
                    <div class="price-container">
                        <span class="current-price">${prod.precioDiseno || prod.priceStr || prod.price || ''}</span>
                    </div>
                </div>
            `;

            // Evento para abrir el modal (ahora usando la función global de ui.js)
            card.addEventListener('click', () => {
                openJewelryModal(prod);
            });

            productGrid.appendChild(card);
        });
    };

    // --- LÓGICA DE NAVEGACIÓN Y FILTROS ---

    // Manejador de clics en dropdown toggles
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            const parentTab = this.parentElement;

            if (parentTab.classList.contains('active')) {
                parentTab.classList.remove('active');
            } else {
                document.querySelectorAll('.dropdown-tab').forEach(tab => tab.classList.remove('active'));
                parentTab.classList.add('active');
            }
        });
    });

    // Cerrar dropdown si se hace click fuera
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-tab').forEach(tab => tab.classList.remove('active'));
    });

    // Manejador de clics en botones de subcategoría (data-target)
    const filterBtns = document.querySelectorAll('.tab-btn[data-target]');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();

            document.querySelectorAll('.dropdown-toggle').forEach(t => t.classList.remove('selected'));
            filterBtns.forEach(b => b.classList.remove('active'));

            btn.classList.add('active');

            const dropdownTab = btn.closest('.dropdown-tab');
            let parentToggle = null;
            if (dropdownTab) {
                parentToggle = dropdownTab.querySelector('.dropdown-toggle');
                if (parentToggle) parentToggle.classList.add('selected');
                dropdownTab.classList.remove('active');
            }

            const target = btn.getAttribute('data-target');

            // Actualizar Título
            if (parentToggle) {
                categoryTitle.textContent = parentToggle.textContent.trim() + ' - ' + btn.textContent;
            } else {
                categoryTitle.textContent = btn.textContent;
            }

            // Mapear títulos específicos (ej. Bodas)
            const titlesMap = {
                'bodas-compromiso': 'Anillos Compromiso - Con Diamante',
                'bodas-alianzas': 'Anillos de Boda'
            };
            if (titlesMap[target]) categoryTitle.textContent = titlesMap[target];

            // Renderizar con fade
            productGrid.style.opacity = '0';
            setTimeout(() => {
                renderProducts(target);
                productGrid.style.opacity = '1';
            }, 200);
        });
    });

    // --- LÓGICA DE INICIO (GALERÍA POR DEFECTO) ---

    const initDefaultGallery = (retries = 0) => {
        const path = window.location.pathname;
        let mainCategory = '';

        if (path.includes('graduacion')) mainCategory = 'graduacion';
        else if (path.includes('bodas')) mainCategory = 'bodas';
        else if (path.includes('nacionales')) mainCategory = 'nacionales';
        else if (path.includes('extranjera')) mainCategory = 'extranjera';
        else if (path.includes('personalizacion')) mainCategory = 'personalizacion';

        // Wait for siteData to be populated (Supabase response)
        if ((!siteData.catalogItems || siteData.catalogItems.length === 0) && retries < 30) {
            setTimeout(() => initDefaultGallery(retries + 1), 100);
            return;
        }

        const initialActive = document.querySelector('.tab-btn.active[data-target]');

        if (initialActive) {
            initialActive.click();
        } else if (mainCategory) {
            const categoryData = siteData.categories.find(c => c.id === mainCategory);
            const allCategorySubcats = categoryData?.subCategories.map(s => s.id) || [];

            categoryTitle.textContent = 'Colección Completa';

            const allProducts = siteData.catalogItems ? siteData.catalogItems.filter(item =>
                item.category === mainCategory || allCategorySubcats.includes(item.category)
            ) : [];

            productGrid.innerHTML = '';
            if (allProducts.length === 0) {
                productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888; font-size: 1.2rem; margin-top: 2rem;">No hay productos disponibles.</p>';
            } else {
                allProducts.forEach(prod => {
                    const prodImg = prod.images ? prod.images[0] : (prod.image || '');
                    const card = document.createElement('div');
                    card.className = 'product-card';
                    card.innerHTML = `
                        <div class="product-image-container">
                            <img src="${prodImg}" alt="${prod.name}" class="product-image">
                        </div>
                        <div class="product-details">
                            <h3>${prod.name}</h3>
                            <div class="price-container">
                                <span class="current-price">${prod.precioDiseno || ''}</span>
                            </div>
                        </div>
                    `;
                    card.onclick = () => openJewelryModal(prod);
                    productGrid.appendChild(card);
                });
            }
        }
    };

    setTimeout(initDefaultGallery, 100);
});
