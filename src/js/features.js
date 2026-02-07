import { updateLanguage } from './ui.js';

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
        closePdfBtn.onclick = () => pdfModal.close();
    }
}

export function initGlobalFeatures() {
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
