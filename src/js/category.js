import '../css/category.css';
import { siteData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos
    const tabBtns = document.querySelectorAll('.tab-btn');
    const categoryTitle = document.getElementById('current-category-title');
    // Búsqueda dinámica para que funcione tanto en graduacion.html como en bodas.html, etc.
    const productGrid = document.querySelector('.products-grid');

    // Referencias al nuevo modal
    const jewelryModal = document.getElementById('jewelry-detail-modal');
    const closeJewelryBtn = document.getElementById('close-jewelry-modal');
    const backToGalleryBtn = document.getElementById('back-to-gallery-btn');
    const jewelryBuyBtn = document.getElementById('jewelry-buy-btn');

    // Elementos internos del modal
    const modalImg = document.getElementById('jewelry-modal-img');
    const modalTitle = document.getElementById('jewelry-modal-title');
    const specWeight = document.getElementById('jewelry-spec-weight');
    const specSize = document.getElementById('jewelry-spec-size');
    const specPrice = document.getElementById('jewelry-spec-price');
    const specDims = document.getElementById('jewelry-spec-dims');

    if (!tabBtns.length || !categoryTitle || !productGrid || !jewelryModal) return;

    // Updated renderProducts to use siteData.catalogItems
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

            // Evento para abrir el modal
            card.addEventListener('click', () => {
                openJewelryModal({
                    img: prodImg,
                    title: prod.name || prod.title,
                    peso: prod.peso,
                    medida: prod.medida,
                    price: prod.precioDiseno || prod.priceStr || prod.price || '',
                    dims: prod.dimensiones || prod.dims
                });
            });

            productGrid.appendChild(card);
        });
    };

    const openJewelryModal = (product) => {
        modalImg.src = product.img;
        modalTitle.textContent = product.title;
        specWeight.textContent = product.peso || 'N/A';
        specSize.textContent = product.medida || 'A medida';
        specPrice.textContent = product.price;
        specDims.textContent = product.dims || 'Variado';

        // Configurar Link de WhatsApp
        const phoneNumber = '50588673708'; // Nerys real number if possible, or placeholder
        const message = `Hola Grace Designs, me interesa adquirir el diseño "${product.title}" que vi en la galería web. ¿Me podrían brindar más detalles?`;
        jewelryBuyBtn.onclick = () => {
            window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
        };

        jewelryModal.showModal();
        document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
    };

    const closeJewelryModal = () => {
        jewelryModal.close();
        document.body.style.overflow = '';
    };

    closeJewelryBtn.addEventListener('click', closeJewelryModal);
    backToGalleryBtn.addEventListener('click', closeJewelryModal);

    // Cerrar al hacer click en el backdrop
    jewelryModal.addEventListener('click', (e) => {
        const dialogDimensions = jewelryModal.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            closeJewelryModal();
        }
    });

    // Manejador de clics en dropdown toggles (cerrando los otros)
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            const parentTab = this.parentElement;

            // Si ya está activo, lo cerramos
            if (parentTab.classList.contains('active')) {
                parentTab.classList.remove('active');
            } else {
                // Cerrar todos los demás primero
                document.querySelectorAll('.dropdown-tab').forEach(tab => tab.classList.remove('active'));
                // Abrir el clickeado
                parentTab.classList.add('active');
            }
        });
    });

    // Cerrar dropdown si se hace click fuera
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-tab').forEach(tab => tab.classList.remove('active'));
    });

    // Manejador de clics en botones con data-target (secciones de filtro)
    const filterBtns = document.querySelectorAll('.tab-btn[data-target]');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();

            // Quitar clase activa visual de todos los dropdown-toggles padre
            document.querySelectorAll('.dropdown-toggle').forEach(t => t.classList.remove('selected'));
            // Quitar clase activa de todos los botones de filtro
            filterBtns.forEach(b => b.classList.remove('active'));

            // Añadir activo al clickeado
            btn.classList.add('active');

            // Marcar visualmente al padre directo como "selected" si está dentro de un dropdown
            const dropdownTab = btn.closest('.dropdown-tab');
            let parentToggle = null;
            if (dropdownTab) {
                parentToggle = dropdownTab.querySelector('.dropdown-toggle');
                if (parentToggle) parentToggle.classList.add('selected');

                // Cerrar el menú principal al seleccionar
                dropdownTab.classList.remove('active');
            }

            const target = btn.getAttribute('data-target');

            // Cambiar título (ejemplo: Anillos Bachiller - Para Dama)
            if (parentToggle) {
                const parentText = parentToggle.textContent.trim();
                categoryTitle.textContent = parentText + ' - ' + btn.textContent;
            } else {
                categoryTitle.textContent = btn.textContent;
            }

            // Mapear manualmente títulos específicos para bodas.html
            const titlesMap = {
                'bodas-compromiso': 'Anillos Compromiso - Con Diamante',
                'bodas-alianzas': 'Anillos de Boda'
            };

            if (titlesMap[target]) {
                categoryTitle.textContent = titlesMap[target];
            }

            // Renderizar con fade
            productGrid.style.opacity = '0';
            setTimeout(() => {
                renderProducts(target);
                productGrid.style.opacity = '1';
            }, 200);
        });
    });

    // Iniciar renderizando el tab por defecto
    setTimeout(() => {
        const initialActive = document.querySelector('.tab-btn.active[data-target]');
        if (initialActive) {
            // Trigger un clic sintético para inicializar todo correctamente
            initialActive.click();
        } else {
            // Fallback genérico por si se entra sin un tab activo configurado
            const firstTab = document.querySelector('.tab-btn[data-target]');
            if (firstTab) firstTab.click();
        }
    }, 100);
});
