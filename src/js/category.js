import '../css/category.css';
import { siteData, formatCurrency } from './data.js';
import { openJewelryModal, initJewelryModalListeners } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos
    const tabBtns = document.querySelectorAll('.tab-btn');
    const categoryTitle = document.getElementById('current-category-title');
    const productGrid = document.querySelector('.products-grid');

    if (!tabBtns.length || !categoryTitle || !productGrid) return;

    // Inicializar listeners del modal una sola vez
    initJewelryModalListeners();

    // -- PAGINATION LOGIC --
    let currentCategoryProducts = [];
    let currentDisplayLimit = 50;

    // Listen for currency changes to re-render prices
    document.addEventListener('currencyChanged', () => {
        if (currentCategoryProducts.length > 0) {
            renderGridItems();
        }
    });

    const renderGridItems = () => {
        // Actualizar contador dinámico con diseño profesional
        const baseTitle = categoryTitle.getAttribute('data-base-title') || categoryTitle.textContent.split(' (')[0].trim();
        if (!categoryTitle.hasAttribute('data-base-title')) {
            categoryTitle.setAttribute('data-base-title', baseTitle);
        }

        categoryTitle.innerHTML = `
            <span class="title-text">${baseTitle}</span>
            <span class="title-badge">${currentCategoryProducts.length} DISEÑOS</span>
        `;

        productGrid.innerHTML = ''; // Limpiar grid

        if (currentCategoryProducts.length === 0) {
            productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888; font-size: 1.2rem; margin-top: 2rem;">No hay productos disponibles.</p>';
            return;
        }

        const itemsToShow = currentCategoryProducts.slice(0, currentDisplayLimit);

        itemsToShow.forEach(prod => {
            const prodImg = prod.images ? prod.images[0] : (prod.image || '');
            const badgeHTML = prod.badge ? `<span class="product-badge ${prod.badgeClass || 'badge-sale'}">${prod.badge}</span>` : '';

            // Handle price formatting
            let displayPrice = '';
            if (prod.price !== undefined && prod.price !== null) {
                displayPrice = formatCurrency(prod.price);
            } else if (prod.precioDiseno) {
                // Determine if it's already formatted or just a number
                if (!isNaN(parseFloat(prod.precioDiseno)) && isFinite(prod.precioDiseno)) {
                    displayPrice = formatCurrency(parseFloat(prod.precioDiseno));
                } else {
                    displayPrice = prod.precioDiseno;
                }
            }

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
                        <span class="current-price">${displayPrice}</span>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                openJewelryModal(prod);
            });

            productGrid.appendChild(card);
        });

        // "Load More" Button Logic
        const existingBtnContainer = document.getElementById('category-load-more-container');
        if (existingBtnContainer) {
            existingBtnContainer.remove();
        }

        if (currentCategoryProducts.length > currentDisplayLimit) {
            const btnContainer = document.createElement('div');
            btnContainer.id = 'category-load-more-container';
            btnContainer.style.cssText = 'grid-column: 1/-1; text-align: center; margin-top: 2rem; margin-bottom: 2rem;';

            const loadMoreBtn = document.createElement('button');
            loadMoreBtn.className = 'btn btn-outline';
            loadMoreBtn.innerHTML = 'Ver Más Diseños';

            loadMoreBtn.onclick = () => {
                currentDisplayLimit += 50;
                renderGridItems();
            };

            btnContainer.appendChild(loadMoreBtn);
            productGrid.appendChild(btnContainer);
        }
    };

    // Función para renderizar productos por subcategoría
    const renderProducts = (category) => {
        if (category === 'p3d-diseno' || category === 'p3d-modelado') {
            const p3dCatData = siteData.categories ? siteData.categories.find(c => c.id === 'personalizacion') : null;
            const p3dSubcats = p3dCatData ? p3dCatData.subCategories.map(s => s.id) : [];
            currentCategoryProducts = siteData.catalogItems ? siteData.catalogItems.filter(item =>
                item.category === 'personalizacion' || p3dSubcats.includes(item.category)
            ) : [];
        } else {
            currentCategoryProducts = siteData.catalogItems ? siteData.catalogItems.filter(item => item.category === category) : [];
        }

        currentDisplayLimit = 50; // Reset limit on category change
        renderGridItems();
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

            // --- P3D VISIBILITY LOGIC ---
            const p3dViews = document.querySelectorAll('.p3d-view');
            if (p3dViews.length > 0) {
                p3dViews.forEach(v => v.classList.remove('active'));

                if (target === 'p3d-diseno') {
                    document.getElementById('p3d-diseno')?.classList.add('active');
                    document.getElementById('p3d-modelado')?.classList.add('active');
                }
                document.getElementById('p3d-products-section')?.classList.add('active');
            }

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

        // Check for deep-linking via URL parameters (?subcat=...)
        const urlParams = new URLSearchParams(window.location.search);
        const subcatParam = urlParams.get('subcat');

        if (subcatParam) {
            const targetBtn = document.querySelector(`.tab-btn[data-target="${subcatParam}"]`);
            if (targetBtn) {
                targetBtn.click();
                return; // Let the click handler handle rendering
            }
        }

        const initialActive = document.querySelector('.tab-btn.active[data-target]');

        if (initialActive) {
            initialActive.click();
        } else if (mainCategory) {
            const categoryData = siteData.categories.find(c => c.id === mainCategory);
            const allCategorySubcats = categoryData?.subCategories.map(s => s.id) || [];

            categoryTitle.textContent = 'Colección Completa';

            currentCategoryProducts = siteData.catalogItems ? siteData.catalogItems.filter(item =>
                item.category === mainCategory || allCategorySubcats.includes(item.category)
            ) : [];
            currentDisplayLimit = 50; // Reset limit
            renderGridItems();
        }
    };

    setTimeout(initDefaultGallery, 100);
});
