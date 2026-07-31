import '../css/category.css';
import { siteData, formatCurrency, loadCategoryItems } from './data.js';
import { openJewelryModal, initJewelryModalListeners } from './ui.js';
import { addToCart } from './cart.js';
import initialLikesData from '../data/likes.json';

function getCategoryItemBaseLikes(id) {
    const numericId = typeof id === 'number' ? id : String(id).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    if (initialLikesData && initialLikesData.items && initialLikesData.items[numericId]) {
        return initialLikesData.items[numericId];
    }
    return ((numericId * 13 + 29) % 65) + 25;
}

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
        const baseTitle = categoryTitle.getAttribute('data-base-title') || categoryTitle.textContent.trim();

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

            // Handle price formatting & numeric price
            let displayPrice = '';
            let numericPrice = 0;
            if (prod.price !== undefined && prod.price !== null) {
                numericPrice = prod.price;
                displayPrice = formatCurrency(prod.price);
            } else if (prod.precioDiseno) {
                if (!isNaN(parseFloat(prod.precioDiseno)) && isFinite(prod.precioDiseno)) {
                    numericPrice = parseFloat(prod.precioDiseno);
                    displayPrice = formatCurrency(numericPrice);
                } else {
                    numericPrice = parseFloat(String(prod.precioDiseno).replace(/[^0-9.]/g, '')) || 0;
                    displayPrice = prod.precioDiseno;
                }
            }

            const itemId = prod.id || prod.name;
            const workLikeId = `cat_${itemId}`;
            const isLiked = localStorage.getItem(`grace_like_${workLikeId}`) === 'true';
            const baseLikes = getCategoryItemBaseLikes(itemId);
            const count = baseLikes + (isLiked ? 1 : 0);

            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image-container">
                    <img src="${prodImg}" alt="${prod.name || prod.title}" class="product-image">
                    ${badgeHTML}
                    <div class="card-action-bar">
                        <button class="work-like-btn ${isLiked ? 'liked' : ''}" data-like-id="${workLikeId}" aria-label="Dar Me Gusta">
                            <div class="like-btn-left">
                                <ion-icon name="${isLiked ? 'heart' : 'heart-outline'}"></ion-icon>
                                <span>Likes</span>
                            </div>
                            <div class="like-btn-divider"></div>
                            <span class="like-count">${count}</span>
                        </button>
                        <button class="work-cart-icon-btn" aria-label="Agregar al Carrito" title="Agregar al Carrito">
                            <ion-icon name="cart-outline"></ion-icon>
                        </button>
                    </div>
                </div>
                <div class="product-details">
                    <h3>${prod.name || prod.title}</h3>
                    <div class="price-container">
                        <span class="current-price">${displayPrice}</span>
                    </div>
                </div>
            `;

            // Like button click
            const likeBtn = card.querySelector('.work-like-btn');
            if (likeBtn) {
                likeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const currentlyLiked = localStorage.getItem(`grace_like_${workLikeId}`) === 'true';
                    const newLikedState = !currentlyLiked;
                    localStorage.setItem(`grace_like_${workLikeId}`, newLikedState);

                    const newCount = baseLikes + (newLikedState ? 1 : 0);
                    likeBtn.classList.toggle('liked', newLikedState);
                    const icon = likeBtn.querySelector('ion-icon');
                    if (icon) icon.setAttribute('name', newLikedState ? 'heart' : 'heart-outline');
                    const countEl = likeBtn.querySelector('.like-count');
                    if (countEl) countEl.textContent = newCount;
                });
            }

            // Cart icon button click
            const cartBtn = card.querySelector('.work-cart-icon-btn');
            if (cartBtn) {
                cartBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    addToCart({
                        id: prod.id,
                        name: prod.name || prod.title,
                        price: numericPrice,
                        image: prodImg
                    });

                    // Add visual feedback
                    cartBtn.classList.add('added');
                    const iconEl = cartBtn.querySelector('ion-icon');
                    if (iconEl) iconEl.setAttribute('name', 'checkmark-circle');

                    setTimeout(() => {
                        cartBtn.classList.remove('added');
                        if (iconEl) iconEl.setAttribute('name', 'cart-outline');
                    }, 1500);
                });
            }

            // Click on card opens jewelry modal
            card.addEventListener('click', (e) => {
                if (e.target.closest('.work-like-btn') || e.target.closest('.work-cart-icon-btn')) return;
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

    // Función para mezclar array aleatoriamente (Fisher-Yates)
    const shuffleArray = (arr) => {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Función para cargar y renderizar productos por subcategoría desde Supabase
    const renderProducts = async (category) => {
        // Mostrar indicador de carga
        productGrid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:#aaa;padding:3rem;font-size:1.1rem;">Cargando diseños...</p>';
        productGrid.style.opacity = '1';

        let categoriesToFetch;
        if (category === 'p3d-diseno' || category === 'p3d-modelado') {
            const p3dCatData = siteData.categories ? siteData.categories.find(c => c.id === 'personalizacion') : null;
            categoriesToFetch = p3dCatData ? p3dCatData.subCategories.map(s => s.id) : [category];
        } else {
            categoriesToFetch = [category];
        }

        const items = await loadCategoryItems(categoriesToFetch);
        currentCategoryProducts = shuffleArray(items);
        currentDisplayLimit = 50;
        renderGridItems();
    };

    // --- LÓGICA DE NAVEGACIÓN Y FILTROS ---

    // Manejador de clics en dropdown toggles
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const tabsContainer = document.querySelector('.tabs-container');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            const parentTab = this.parentElement;
            const wasActive = parentTab.classList.contains('active');

            // 1. Close ALL first
            document.querySelectorAll('.dropdown-tab').forEach(tab => tab.classList.remove('active'));
            if (tabsContainer) tabsContainer.classList.remove('dropdown-open');

            // 2. If it wasn't active, open it
            if (!wasActive) {
                parentTab.classList.add('active');
                if (tabsContainer) tabsContainer.classList.add('dropdown-open');
            }
        });
    });

    // Cerrar dropdown si se hace click fuera
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-tab').forEach(tab => tab.classList.remove('active'));
        if (tabsContainer) tabsContainer.classList.remove('dropdown-open');
    });

    // Manejador de clics en botones de subcategoría (data-target)
    const filterBtns = document.querySelectorAll('.tab-btn[data-target]');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isSubTab = btn.classList.contains('sub-tab-btn');
            const wasActive = btn.classList.contains('active');

            // Reset all
            document.querySelectorAll('.dropdown-toggle').forEach(t => t.classList.remove('selected'));
            filterBtns.forEach(b => b.classList.remove('active'));

            const dropdownTab = btn.closest('.dropdown-tab');

            // --- IMMEDIATE FOLDING LOGIC ---
            // When a sub-option is clicked, we fold the menu and show all buttons again
            if (isSubTab) {
                if (dropdownTab) {
                    dropdownTab.classList.remove('active');
                    if (tabsContainer) tabsContainer.classList.remove('dropdown-open');
                }
                // No adding 'active' here if we want to "reset" the visual state
                // or keep it if we want the red color to persist (behind the fold)
            }

            btn.classList.add('active');

            let parentToggle = null;
            if (dropdownTab) {
                parentToggle = dropdownTab.querySelector('.dropdown-toggle');
                if (parentToggle) parentToggle.classList.add('selected');

                // For safety, ensure it folds on desktop too (already handled by block above)
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
            let currentTitle = '';
            if (parentToggle) {
                currentTitle = parentToggle.textContent.trim() + ' - ' + btn.textContent;
            } else {
                currentTitle = btn.textContent;
            }
            categoryTitle.textContent = currentTitle;
            categoryTitle.setAttribute('data-base-title', currentTitle);

            // Mapear títulos específicos (ej. Bodas)
            const titlesMap = {
                'bodas-compromiso': 'Anillos Compromiso - Con Diamante',
                'bodas-alianzas': 'Anillos de Boda'
            };
            if (titlesMap[target]) categoryTitle.textContent = titlesMap[target];


            // Renderizar con fade
            productGrid.style.opacity = '0';
            setTimeout(async () => {
                await renderProducts(target);
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

        // Esperar a que las categorías estén cargadas (loadStorage ya las trae)
        if ((!siteData.categories || siteData.categories.length === 0) && retries < 30) {
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
            const allCats = [mainCategory, ...allCategorySubcats];

            categoryTitle.textContent = 'Colección Completa';
            categoryTitle.setAttribute('data-base-title', 'Colección Completa');

            productGrid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:#aaa;padding:3rem;font-size:1.1rem;">Cargando diseños...</p>';
            loadCategoryItems(allCats).then(items => {
                currentCategoryProducts = shuffleArray(items);
                currentDisplayLimit = 50;
                renderGridItems();
            });
        }
    };

    setTimeout(initDefaultGallery, 100);
});
