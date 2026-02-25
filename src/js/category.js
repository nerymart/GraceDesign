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

    // Datos simulados (Mock data) para las subcategorías extendidas
    const productsData = {
        // --- GRADUACIÓN ---
        'bachiller-dama': [
            { img: 'https://images.unsplash.com/photo-1605100804763-247f6793148e?auto=format&fit=crop&q=80&w=500', title: 'Anillo Elegance Oro', price: '$350', badge: 'NUEVO', peso: '4.5g', medida: '6-8', dims: '12mm x 12mm' },
            { img: 'https://images.unsplash.com/photo-1599643478514-4a5202336336?auto=format&fit=crop&q=80&w=500', title: 'Bachiller Zafiro Dama', price: '$420', peso: '5.2g', medida: '7', dims: '15mm x 15mm' }
        ],
        'bachiller-caballero': [
            { img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=500', title: 'Sello Imperial Bachiller', price: '$450', badge: 'VENDIDO', badgeClass: 'badge-sold-out' },
            { img: 'https://images.unsplash.com/photo-1635391108269-00a8aa0aa37e?auto=format&fit=crop&q=80&w=500', title: 'Plata Ónix Caballero', price: '$290' }
        ],
        'carreras-dama': [
            { img: 'https://images.unsplash.com/photo-1604382354936-07c5d0ba4bea?auto=format&fit=crop&q=80&w=500', title: 'Anillo Profesional Medicina', price: '$520' },
            { img: 'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&q=80&w=500', title: 'Carreras Oro Rosado', price: '$480' }
        ],
        'carreras-caballero': [
            { img: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&q=80&w=500', title: 'Anillo Ingeniero Titanio', price: '$490', badge: 'POPULAR' },
            { img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=500', title: 'Derecho Clásico Oro', price: '$550' }
        ],
        'sexto-dama': [
            { img: 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?auto=format&fit=crop&q=80&w=500', title: '6to Grado Dama Corazón', price: '$120' }
        ],
        'sexto-caballero': [
            { img: 'https://images.unsplash.com/photo-1604382354936-07c5d0ba4bea?auto=format&fit=crop&q=80&w=500', title: '6to Grado Caballero Plata', price: '$150' }
        ],
        'preescolar-dama': [
            { img: 'https://images.unsplash.com/photo-1599643478514-4a5202336336?auto=format&fit=crop&q=80&w=500', title: 'Preescolar Niña Estrellas', price: '$95' }
        ],
        'preescolar-caballero': [
            { img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=500', title: 'Preescolar Niño 10K', price: '$80' }
        ],

        // --- BODAS & COMPROMISO ---
        // --- BODAS & COMPROMISO ---
        'bodas-compromiso': [
            { img: 'https://images.unsplash.com/photo-1605100804763-247f6793148e?auto=format&fit=crop&q=80&w=500', title: 'Solitario Diamante Corte Princesa', price: '$1,200', badge: 'PREMIUM', peso: '6.2g', medida: '7', dims: '6mm piedra' },
            { img: 'https://images.unsplash.com/photo-1599643478514-4a5202336336?auto=format&fit=crop&q=80&w=500', title: 'Halo Diamante Oro Blanco', price: '$1,450', peso: '7.5g', medida: '6.5', dims: '8mm halo' },
            { img: 'https://images.unsplash.com/photo-1604382354936-07c5d0ba4bea?auto=format&fit=crop&q=80&w=500', title: 'Solitario Zirconia Clásico', price: '$450', peso: '5.0g', medida: '8', dims: '5mm piedra' },
            { img: 'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&q=80&w=500', title: 'Vintage Rose Zirconia', price: '$380', peso: '4.8g', medida: '7', dims: '6mm flor' }
        ],
        'bodas-alianzas': [
            { img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=500', title: 'Alianza Clásica 18K', price: '$600', badge: 'POPULAR', peso: '8.0g', medida: '9', dims: '4mm ancho' },
            { img: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&q=80&w=500', title: 'Banda Texturizada Oro Amarillo', price: '$720', peso: '9.5g', medida: '10', dims: '5mm ancho' },
            { img: 'https://images.unsplash.com/photo-1635391108269-00a8aa0aa37e?auto=format&fit=crop&q=80&w=500', title: 'Alianza Plata Esterlina', price: '$150', peso: '6.0g', medida: '8', dims: '4mm ancho' },
            { img: 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?auto=format&fit=crop&q=80&w=500', title: 'Set Nupcial Diamantes Dúo', price: '$1,800', badge: 'SET', peso: '12.0g', medida: '7', dims: 'Set 2 anillos' }
        ],

        // --- JOYAS EXTRANJERAS ---
        'ext-pulseras-dama': [
            { img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=500', title: 'Pulsera Tenis Diamantes', price: '$850', badge: 'ITALIA', peso: '8.5g', medida: '18cm', dims: '3mm diamantes' }
        ],
        'ext-pulseras-caballero': [
            { img: 'https://images.unsplash.com/photo-1599643478514-4a5202336336?auto=format&fit=crop&q=80&w=500', title: 'Esclava Cubana 18K', price: '$1,200', peso: '22.0g', medida: '21cm', dims: '8mm ancho' }
        ],
        'ext-pulseras-nino': [
            { img: 'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&q=80&w=500', title: 'Pulsera Identidad Italiana', price: '$180', peso: '4.2g', medida: '15cm', dims: 'Plate 20mm' }
        ],
        'ext-cadenas-dama': [
            { img: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&q=80&w=500', title: 'Gargantilla Cartier Fina', price: '$350', peso: '10.5g', medida: '45cm', dims: '2.5mm ancho' }
        ],
        'ext-cadenas-caballero': [
            { img: 'https://images.unsplash.com/photo-1605100804763-247f6793148e?auto=format&fit=crop&q=80&w=500', title: 'Cadena Lomo Corvina', price: '$900', badge: 'PREMIUM', peso: '45.0g', medida: '60cm', dims: '6mm ancho' }
        ],
        'ext-cadenas-nino': [
            { img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=500', title: 'Cadena Fígaro Delgada', price: '$220', peso: '8.0g', medida: '40cm', dims: '2mm ancho' }
        ],
        'ext-anillos-dama': [
            { img: 'https://images.unsplash.com/photo-1604382354936-07c5d0ba4bea?auto=format&fit=crop&q=80&w=500', title: 'Anillo Cocktail Rubí', price: '$650' }
        ],
        'ext-anillos-caballero': [
            { img: 'https://images.unsplash.com/photo-1544391697-71c841e06fa5?auto=format&fit=crop&q=80&w=500', title: 'Sello Ónix Importado', price: '$480' }
        ],
        'ext-anillos-nino': [
            { img: 'https://images.unsplash.com/photo-1635391108269-00a8aa0aa37e?auto=format&fit=crop&q=80&w=500', title: 'Anillo Inicial Esmalte', price: '$120' }
        ],
        'ext-dijes-dama': [
            { img: 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?auto=format&fit=crop&q=80&w=500', title: 'Medalla Virgen Finamente Grabada', price: '$290' }
        ],
        'ext-dijes-caballero': [
            { img: 'https://images.unsplash.com/photo-1629853906663-95f70a2a4e40?auto=format&fit=crop&q=80&w=500', title: 'Cruz Bizantina Oro 18K', price: '$340' }
        ],
        'ext-dijes-nino': [
            { img: 'https://images.unsplash.com/photo-1605100804763-247f6793148e?auto=format&fit=crop&q=80&w=500', title: 'Dije Angelito Bicolor', price: '$150' }
        ],
        'ext-aretes': [
            { img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=500', title: 'Arracadas Tubulares Italianas', price: '$420', badge: 'NUEVO' },
            { img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=500', title: 'Broquel Diamante Corte', price: '$280' },
            { img: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&q=80&w=500', title: 'Topos Bolita Oro 14k', price: '$90' }
        ],

        // --- JOYAS NACIONALES ---
        'nac-pulseras-dama': [
            { img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=500', title: 'Pulsera Tejida Filigrana', price: '$210', badge: 'ARTESANO', peso: '5.5g', medida: '18cm', dims: 'Bolas 4mm' }
        ],
        'nac-pulseras-caballero': [
            { img: 'https://images.unsplash.com/photo-1629853906663-95f70a2a4e40?auto=format&fit=crop&q=80&w=500', title: 'Esclava Tejido Nacional', price: '$350', badge: 'HECHO A MANO' }
        ],
        'nac-pulseras-nino': [
            { img: 'https://images.unsplash.com/photo-1544391697-71c841e06fa5?auto=format&fit=crop&q=80&w=500', title: 'Esclava Identidad Infantil', price: '$120' }
        ],
        'nac-cadenas-dama': [
            { img: 'https://images.unsplash.com/photo-1605100804763-247f6793148e?auto=format&fit=crop&q=80&w=500', title: 'Cadena Fina Oro 10K', price: '$180' }
        ],
        'nac-cadenas-caballero': [
            { img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=500', title: 'Cadena Tejido Cordón', price: '$450' }
        ],
        'nac-cadenas-nino': [
            { img: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&q=80&w=500', title: 'Cadena Infantil Oro 10K', price: '$110' }
        ],
        'nac-anillos-dama': [
            { img: 'https://images.unsplash.com/photo-1629853906663-95f70a2a4e40?auto=format&fit=crop&q=80&w=500', title: 'Anillo Diseño Nacional', price: '$280', badge: 'LOCAL' }
        ],
        'nac-anillos-caballero': [
            { img: 'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&q=80&w=500', title: 'Sello Nicaragüense Oro', price: '$400' }
        ],
        'nac-anillos-nino': [
            { img: 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?auto=format&fit=crop&q=80&w=500', title: 'Anillo Inicial Niño 10K', price: '$90' }
        ],
        'nac-dijes-dama': [
            { img: 'https://images.unsplash.com/photo-1604382354936-07c5d0ba4bea?auto=format&fit=crop&q=80&w=500', title: 'Dije Escudo de Nicaragua', price: '$150' }
        ],
        'nac-dijes-caballero': [
            { img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=500', title: 'Dije Cruz Tradicional', price: '$200' }
        ],
        'nac-dijes-nino': [
            { img: 'https://images.unsplash.com/photo-1635391108269-00a8aa0aa37e?auto=format&fit=crop&q=80&w=500', title: 'Medalla Angelito Oro', price: '$120' }
        ],
        'nac-aretes': [
            { img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=500', title: 'Aretes Filigrana Oro', price: '$180', badge: 'ARTESANO' }
        ],

        // --- PERSONALIZACION 3D ---
        'p3d-tejidos': [
            { img: 'https://images.unsplash.com/photo-1599643478514-4a5202336336?auto=format&fit=crop&q=80&w=500', title: 'Pulsera Tejido Cubano Digno 3D', price: '$940', badge: 'A MEDIDA', peso: '25.5g', medida: 'Largo 21cm', dims: '10mm ancho' },
            { img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=500', title: 'Candado Macizo Grabado Laser', price: '$400', peso: '12.0g', medida: 'Standard', dims: '20mm x 25mm' }
        ],
        'p3d-mesa': [
            { img: 'https://images.unsplash.com/photo-1605100804763-247f6793148e?auto=format&fit=crop&q=80&w=500', title: 'Sello Mesa Cuadrado Zirconias', price: '$720', peso: '15.0g', medida: '10', dims: '18mm mesa' },
            { img: 'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&q=80&w=500', title: 'Anillo Mesa Oval Monograma', price: '$650', peso: '14.2g', medida: '11', dims: '20mm x 15mm mesa' }
        ],
        'p3d-dijes': [
            { img: 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?auto=format&fit=crop&q=80&w=500', title: 'Dije Escudo Familiar 3D', price: '$580' }
        ],
        'p3d-alfabeto': [
            { img: 'https://images.unsplash.com/photo-1604382354936-07c5d0ba4bea?auto=format&fit=crop&q=80&w=500', title: 'Inicial "A" Calada', price: '$120' }
        ],
        'p3d-variado': [
            { img: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&q=80&w=500', title: 'Diseño Abstracto Fluid', price: '$350' }
        ],
        'p3d-15': [
            { img: 'https://images.unsplash.com/photo-1635391108269-00a8aa0aa37e?auto=format&fit=crop&q=80&w=500', title: 'Anillo Quinceañera Corona 3D', price: '$400', badge: '15 AÑOS' }
        ],
        'p3d-figura': [
            { img: 'https://images.unsplash.com/photo-1605100804763-247f6793148e?auto=format&fit=crop&q=80&w=500', title: 'Anillo Silueta Animal (Perro)', price: '$220' }
        ],
        'p3d-dijes-alfa': [
            { img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=500', title: 'Dije Iniciales Entrelazadas', price: '$290' }
        ],
        'p3d-comp-finos': [
            { img: 'https://images.unsplash.com/photo-1599643478514-4a5202336336?auto=format&fit=crop&q=80&w=500', title: 'Compromiso Micro-Pavé', price: '$1,200', badge: 'PREMIUM' }
        ],
        'p3d-casuales': [
            { img: 'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&q=80&w=500', title: 'Churumbela Casual Uso Diario', price: '$180' }
        ]
    };

    // Función para renderizar el HTML de los productos
    const renderProducts = (category) => {
        const siteDataProducts = siteData.catalogItems ? siteData.catalogItems.filter(item => item.category === category) : [];
        const mappedSiteData = siteDataProducts.map(item => ({
            img: item.images ? item.images[0] : item.image,
            title: item.name,
            price: item.precioDiseno || item.priceStr || item.price || '',
            peso: item.peso,
            medida: item.medida,
            dims: item.dimensiones,
            badge: item.badge || '',
            badgeClass: item.badgeClass || ''
        }));

        const hardcodedProducts = productsData[category] || [];
        const products = [...mappedSiteData, ...hardcodedProducts];

        productGrid.innerHTML = ''; // Limpiar grid

        if (products.length === 0) {
            productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888; font-size: 1.2rem; margin-top: 2rem;">No hay productos disponibles en esta categoría.</p>';
            return;
        }

        products.forEach(prod => {
            const badgeHTML = prod.badge ? `<span class="product-badge ${prod.badgeClass || 'badge-sale'}">${prod.badge}</span>` : '';

            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image-container">
                    <img src="${prod.img}" alt="${prod.title}" class="product-image">
                    ${badgeHTML}
                </div>
                <div class="product-details">
                    <h3>${prod.title}</h3>
                    <div class="price-container">
                        <span class="current-price">${prod.price}</span>
                    </div>
                </div>
            `;

            // Evento para abrir el modal
            card.addEventListener('click', () => {
                openJewelryModal(prod);
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
