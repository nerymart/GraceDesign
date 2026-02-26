import { updateLanguage, openProductModal, openWorkModal, openJewelryModal } from './ui.js';
import { siteData } from './data.js';

export function initSearch() {
    const containers = document.querySelectorAll('.search-results-container');

    containers.forEach(container => {
        const searchInput = container.querySelector('.main-search-input');
        const resultsDropdown = container.querySelector('.search-results-dropdown');
        const searchBtn = container.querySelector('.search-btn');

        if (!searchInput || !resultsDropdown) return;

        const performSearch = () => {
            const query = searchInput.value.toLowerCase().trim();
            if (query.length < 2) {
                resultsDropdown.classList.remove('active');
                return;
            }

            // 1. Search in productos
            const prodResults = siteData.productos.filter(p =>
                p.name.toLowerCase().includes(query) ||
                (p.desc && p.desc.toLowerCase().includes(query))
            ).map(p => ({ ...p, type: 'product' }));

            // 2. Search in catalogItems
            const catalogResults = siteData.catalogItems.filter(item =>
                item.name.toLowerCase().includes(query) ||
                (item.category && item.category.toLowerCase().includes(query))
            ).map(item => ({ ...item, type: 'catalog' }));

            // 3. Search in Categories & Subcategories (NEW)
            const sectionResults = [];
            siteData.categories.forEach(cat => {
                // Main category match
                if (cat.name.toLowerCase().includes(query)) {
                    sectionResults.push({
                        name: cat.name,
                        type: 'section',
                        link: cat.link,
                        image: cat.image,
                        label: 'VER SECCIÓN'
                    });
                }
                // Subcategory match
                cat.subCategories.forEach(sub => {
                    if (sub.name.toLowerCase().includes(query)) {
                        sectionResults.push({
                            name: sub.name,
                            type: 'section',
                            link: `${cat.link}?subcat=${sub.id}`,
                            image: cat.image, // Use category image as placeholder
                            label: 'IR A SECCIÓN'
                        });
                    }
                });
            });

            // Combine and limit (prioritize sections, then products)
            const allResults = [...sectionResults, ...prodResults, ...catalogResults].slice(0, 10);

            renderSearchResults(allResults);
        };

        const renderSearchResults = (results) => {
            resultsDropdown.innerHTML = '';
            if (results.length === 0) {
                resultsDropdown.innerHTML = '<div class="no-results">No se encontraron piezas con ese nombre.</div>';
            } else {
                results.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'search-result-item';

                    let categoryLabel = '';
                    let actionLabel = '';

                    if (item.type === 'section') {
                        categoryLabel = item.label || 'SECCIÓN';
                        div.classList.add('section-result');
                    } else {
                        categoryLabel = item.type === 'product' ? 'Disponible' : (item.category || 'Catálogo');
                    }

                    const img = item.image || (item.images ? item.images[0] : '');

                    div.innerHTML = `
                        <img src="${img}" class="search-result-img" alt="${item.name}">
                        <div class="search-result-info">
                            <h4>${item.name}</h4>
                            <p>${categoryLabel.toUpperCase()}</p>
                        </div>
                        ${item.type === 'section' ? '<ion-icon name="arrow-forward-outline" class="section-arrow"></ion-icon>' : ''}
                    `;

                    div.onclick = () => {
                        if (item.type === 'section') {
                            window.location.href = item.link;
                        } else if (item.type === 'product') {
                            openProductModal(item);
                        } else {
                            openJewelryModal(item);
                        }
                        resultsDropdown.classList.remove('active');
                        searchInput.value = '';
                    };
                    resultsDropdown.appendChild(div);
                });
            }
            resultsDropdown.classList.add('active');
        };

        searchInput.addEventListener('input', performSearch);
        if (searchBtn) searchBtn.addEventListener('click', performSearch);
    });

    // Hide dropdown on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-results-container')) {
            document.querySelectorAll('.search-results-dropdown').forEach(d => d.classList.remove('active'));
        }
    });
}

export function initDrawer() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.mobile-menu-btn')) {
            const drawer = document.getElementById('filter-drawer');
            if (drawer) drawer.classList.add('active');
        }
        if (e.target.closest('#close-filter-drawer') || e.target.closest('.drawer-link')) {
            const drawer = document.getElementById('filter-drawer');
            if (drawer) drawer.classList.remove('active');
        }
    });
}

export function initHeaderSlider() {
    const slides = document.querySelectorAll('.header-slider .slide');
    const dots = document.querySelectorAll('.dot');
    if (slides.length === 0) return;
    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }, 5000);
}

export function initEngagementSlider() {
    const slides = document.querySelectorAll('.eng-slide');
    let currentSlide = 0;
    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }
}

export function initPdfViewer() {
    const pdfBtn = document.getElementById("view-engagement-pdf");
    const pdfModal = document.getElementById("pdf-modal");
    const closePdfBtn = document.getElementById("close-pdf-modal");
    const viewerContainer = document.getElementById("pdf-viewer-container");
    if (pdfBtn && pdfModal && viewerContainer) {
        pdfBtn.addEventListener("click", () => {
            pdfModal.showModal();
            viewerContainer.innerHTML = '<p style="color:white; text-align:center; padding:2rem;">Cargando catálogo...</p>';

            // Base path for deployment vs local dev
            const base = window.location.pathname.includes('/GraceDesign/') ? '/GraceDesign/' : '/';
            const pdfPath = base + 'pdf/catalogo.pdf';

            if (window.pdfjsLib) {
                // Configure Worker
                window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

                window.pdfjsLib.getDocument(pdfPath).promise.then(pdf => {
                    viewerContainer.innerHTML = '';
                    for (let i = 1; i <= pdf.numPages; i++) {
                        pdf.getPage(i).then(page => {
                            const canvas = document.createElement('canvas');
                            canvas.style.display = 'block';
                            canvas.style.margin = '0 auto 20px';
                            canvas.style.maxWidth = '100%';
                            canvas.style.height = 'auto';
                            canvas.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';

                            viewerContainer.appendChild(canvas);

                            const viewport = page.getViewport({ scale: 1.5 });
                            const context = canvas.getContext('2d');
                            canvas.height = viewport.height;
                            canvas.width = viewport.width;

                            page.render({ canvasContext: context, viewport: viewport });
                        });
                    }
                }).catch(err => {
                    console.error("Error loading PDF:", err);
                    viewerContainer.innerHTML = `<p style="color:white; text-align:center; padding:2rem;">Error al cargar el PDF: ${err.message}</p>`;
                });
            } else {
                viewerContainer.innerHTML = '<p style="color:white; text-align:center; padding:2rem;">Error: Librería PDF no cargada.</p>';
            }
        });
        if (closePdfBtn) closePdfBtn.onclick = () => pdfModal.close();
    }
}

export function initCategoryNavArrows() {
    const container = document.querySelector('.category-container');
    const prevBtn = document.getElementById('cat-prev');
    const nextBtn = document.getElementById('cat-next');

    if (container && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            container.scrollBy({ left: -200, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            container.scrollBy({ left: 200, behavior: 'smooth' });
        });

        // Optional: Hide arrows if not scrollable
        const toggleArrows = () => {
            prevBtn.style.opacity = container.scrollLeft <= 5 ? '0.3' : '1';
            nextBtn.style.opacity = (container.scrollLeft + container.clientWidth >= container.scrollWidth - 5) ? '0.3' : '1';
        };

        container.addEventListener('scroll', toggleArrows);
        window.addEventListener('resize', toggleArrows);
        setTimeout(toggleArrows, 500); // Initial check
    }
}

export function initServicesCarousel() {
    const container = document.getElementById('services-list');
    const prevBtn = document.getElementById('prev-service');
    const nextBtn = document.getElementById('next-service');

    if (container && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            container.scrollBy({ left: -320, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            container.scrollBy({ left: 320, behavior: 'smooth' });
        });
    }
}

export function initGlobalFeatures() {
    initCategoryNavArrows();
    initServicesCarousel();
    const themeToggles = document.querySelectorAll('.theme-toggle');
    if (themeToggles.length > 0) {
        if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');
        themeToggles.forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
            });
        });
    }
    const langBtns = document.querySelectorAll('.lang-btn');
    if (langBtns.length > 0) {
        let currentLang = localStorage.getItem('lang') || 'ES';
        if (currentLang === 'EN') updateLanguage('EN');
        langBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currentLang = currentLang === 'ES' ? 'EN' : 'ES';
                localStorage.setItem('lang', currentLang);
                const flag = currentLang === 'EN' ? '<span class="flag-icon">🇺🇸</span> EN <ion-icon name="caret-down-outline"></ion-icon>' : '<span class="flag-icon">🇪🇸</span> ES <ion-icon name="caret-down-outline"></ion-icon>';
                document.querySelectorAll('.lang-btn').forEach(b => b.innerHTML = flag);
                updateLanguage(currentLang);
            });
        });
    }
}
