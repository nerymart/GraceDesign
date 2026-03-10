import { supabase } from './supabase.js';

export let siteData = {
    about: {
        title: "Creamos la joya de tus sueños",
        desc: "Utilizamos la última tecnología de impresión 3D y diseño CAD para materializar tus ideas más creativas. Desde el boceto inicial hasta la pieza final en oro o plata.",
        images: ["service-repair.png", "service-polishing.png"]
    },
    currentCurrency: 'USD',
    conversionRate: 36.5,
    servicios: [
        {
            title: "Reparación de Joyas",
            image: "service_jewelry.jpg",
            desc: "Expertos en devolverle la vida a tus piezas más queridas.",
            features: [
                { icon: "hammer-outline", text: "Soldadura láser de precisión" },
                { icon: "resize-outline", text: "Ajuste de talla y monturas" },
                { icon: "shield-checkmark-outline", text: "Reforzamiento de garras" }
            ]
        },
        {
            title: "Mantenimiento y Pulido",
            image: "service_repair.jpg",
            desc: "Brillo impecable para que tus joyas luzcan como nuevas.",
            features: [
                { icon: "sparkles-outline", text: "Limpieza ultrasónica profunda" },
                { icon: "star-outline", text: "Pulido acabado espejo" },
                { icon: "water-outline", text: "Rodinado y baños de oro" }
            ]
        },
        {
            title: "Diseño Personalizado 3D",
            image: "service_design.jpg",
            desc: "Materializamos tus ideas con tecnología de vanguardia.",
            features: [
                { icon: "cube-outline", text: "Modelado CAD de alta precisión" },
                { icon: "print-outline", text: "Prototipado en resina 3D" },
                { icon: "color-wand-outline", text: "Renderizado fotorrealista" }
            ]
        },
        {
            title: "Relojería de Alta Gama",
            image: "service_watch.jpg",
            desc: "Cuidado especializado para tus cronómetros de precisión.",
            features: [
                { icon: "watch-outline", text: "Mantenimiento preventivo" },
                { icon: "time-outline", text: "Calibración de maquinaria" },
                { icon: "build-outline", text: "Cambio de piezas originales" }
            ]
        }
    ],
    productos: [],
    catalogItems: [],
    finishedWorks: [],
    promos: [],
    categories: [
        {
            id: "graduacion",
            name: "GRADUACION",
            link: "./graduacion.html",
            image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600",
            subCategories: [
                { id: "bachiller-dama", name: "Bachiller - Dama" },
                { id: "bachiller-caballero", name: "Bachiller - Caballero" },
                { id: "carreras-dama", name: "Carreras - Dama" },
                { id: "carreras-caballero", name: "Carreras - Caballero" },
                { id: "sexto-dama", name: "6to Grado - Dama" },
                { id: "sexto-caballero", name: "6to Grado - Caballero" },
                { id: "preescolar-dama", name: "Preescolar - Dama" },
                { id: "preescolar-caballero", name: "Preescolar - Caballero" }
            ]
        },
        {
            id: "bodas",
            name: "COMPROMISO & BODAS",
            link: "./bodas.html",
            image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600",
            subCategories: [
                { id: "bodas-compromiso", name: "Compromiso" },
                { id: "bodas-alianzas", name: "Alianzas de Boda" }
            ]
        },
        {
            id: "personalizacion",
            name: "PERSONALIZACION 3D",
            link: "./personalizacion.html",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600",
            subCategories: [
                { id: "p3d-diseno", name: "Diseño 3D" },
                { id: "p3d-modelado", name: "Modelado 3D" },
                { id: "p3d-tejidos", name: "Tejidos & Candados" },
                { id: "p3d-mesa", name: "Anillos Mesa" },
                { id: "p3d-dijes", name: "Dijes" },
                { id: "p3d-alfabeto", name: "Alfabeto" },
                { id: "p3d-variado", name: "Anillos Variados" },
                { id: "p3d-15", name: "Anillos 15 Años" },
                { id: "p3d-figura", name: "Anillos con Figura" },
                { id: "p3d-dijes-alfa", name: "Dijes Alfabeto" },
                { id: "p3d-comp-finos", name: "Compromiso Finos" },
                { id: "p3d-casuales", name: "Anillos Casuales" }
            ]
        },
        {
            id: "extranjera",
            name: "JOYAS EXTRANJERAS",
            link: "./extranjera.html",
            image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=600",
            subCategories: [
                { id: "ext-pulseras-dama", name: "Pulseras Dama" },
                { id: "ext-pulseras-caballero", name: "Pulseras Caballero" },
                { id: "ext-pulseras-nino", name: "Pulseras Niño" },
                { id: "ext-cadenas-dama", name: "Cadenas Dama" },
                { id: "ext-cadenas-caballero", name: "Cadenas Caballero" },
                { id: "ext-cadenas-nino", name: "Cadenas Niño" },
                { id: "ext-anillos-dama", name: "Anillos Dama" },
                { id: "ext-anillos-caballero", name: "Anillos Caballero" },
                { id: "ext-anillos-nino", name: "Anillos Niño" },
                { id: "ext-dijes-dama", name: "Dijes Dama" },
                { id: "ext-dijes-caballero", name: "Dijes Caballero" },
                { id: "ext-dijes-nino", name: "Dijes Niño" },
                { id: "ext-aretes", name: "Aretes" }
            ]
        },
        {
            id: "nacionales",
            name: "JOYAS NACIONALES",
            link: "./nacionales.html",
            image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600",
            subCategories: [
                { id: "nac-pulseras-dama", name: "Pulseras Dama" },
                { id: "nac-pulseras-caballero", name: "Pulseras Caballero" },
                { id: "nac-pulseras-nino", name: "Pulseras Niño" },
                { id: "nac-cadenas-dama", name: "Cadenas Dama" },
                { id: "nac-cadenas-caballero", name: "Cadenas Caballero" },
                { id: "nac-cadenas-nino", name: "Cadenas Niño" },
                { id: "nac-anillos-dama", name: "Anillos Dama" },
                { id: "nac-anillos-caballero", name: "Anillos Caballero" },
                { id: "nac-anillos-nino", name: "Anillos Niño" },
                { id: "nac-dijes-dama", name: "Dijes Dama" },
                { id: "nac-dijes-caballero", name: "Dijes Caballero" },
                { id: "nac-dijes-nino", name: "Dijes Niño" },
                { id: "nac-aretes", name: "Aretes" }
            ]
        }
    ]
};

export async function loadStorage() {
    try {
        console.log('Intentando cargar datos de Supabase...');
        const [
            { data: about },
            { data: servicios, error: sErr },
            { data: productos },
            { data: catalogItems },
            { data: finishedWorks },
            { data: categories },
            { data: subcategories },
            { data: promos },
            { data: settings }
        ] = await Promise.all([
            supabase.from('site_about').select('*').single(),
            supabase.from('services').select('*'),
            supabase.from('products').select('*'),
            supabase.from('catalog_items').select('*'),
            supabase.from('finished_works').select('*'),
            supabase.from('categories').select('*'),
            supabase.from('subcategories').select('*'),
            supabase.from('promo_cards').select('*'),
            supabase.from('site_settings').select('*').eq('id', 'global').single()
        ]);

        // Verificamos si realmente hay datos en la nube antes de sobreescribir los locales
        if (about && about.title) {
            siteData.about = {
                title: about.title,
                desc: about.description,
                images: about.images || siteData.about.images
            };
        }
        if (servicios && servicios.length > 0) siteData.servicios = servicios;
        if (productos && productos.length > 0) siteData.productos = productos;
        if (catalogItems && catalogItems.length > 0) siteData.catalogItems = catalogItems.map(i => ({ ...i, precioDiseno: i.precio_diseno, images: i.images || [] }));
        if (finishedWorks && finishedWorks.length > 0) siteData.finishedWorks = finishedWorks;
        if (promos && promos.length > 0) siteData.promos = promos;

        if (settings) {
            siteData.conversionRate = settings.conversion_rate;
            console.log('Tasa de cambio cargada exitosamente:', settings.conversion_rate);
        } else {
            console.warn('Configuración "global" no encontrada en site_settings. Usando tasa por defecto:', siteData.conversionRate);
        }

        if (categories && categories.length > 0) {
            siteData.categories = categories.map(cat => ({
                ...cat,
                subCategories: subcategories ? subcategories.filter(sub => sub.category_id === cat.id) : []
            }));
        }

        console.log('Sincronización con Supabase exitosa.');
    } catch (error) {
        console.error('Error detallado al sincronizar con Supabase:', error);
        console.warn('Usando datos locales por defecto (tablas vacías o error de conexión).');
    }
}

export async function saveStorage() {
    console.log('Supabase Mode: Los datos se guardan directamente en la nube desde el admin.');
}

// Helper para obtener el precio con formato según la moneda actual
export function formatCurrency(priceInUSD) {
    if (siteData.currentCurrency === 'NIO') {
        const priceNIO = priceInUSD * siteData.conversionRate;
        return `C$ ${priceNIO.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    return `$ ${priceInUSD.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

// Cambiar moneda y disparar evento de actualización
export function setCurrency(currency) {
    siteData.currentCurrency = currency;
    localStorage.setItem('grace_currency', currency);
    document.dispatchEvent(new CustomEvent('currencyChanged', { detail: { currency } }));
}

// Inicializar moneda desde localStorage
const savedCurrency = localStorage.getItem('grace_currency');
if (savedCurrency) {
    siteData.currentCurrency = savedCurrency;
}
