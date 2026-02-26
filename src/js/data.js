export let siteData = {
    about: {
        title: "Creamos la joya de tus sueños",
        desc: "Utilizamos la última tecnología de impresión 3D y diseño CAD para materializar tus ideas más creativas. Desde el boceto inicial hasta la pieza final en oro o plata.",
        images: ["service-repair.png", "service-polishing.png"]
    },
    services: [
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
    products: [],
    catalogItems: [
        { id: 101, name: "Anillo de Boda Real", category: "boda", images: ["https://images.unsplash.com/photo-1605100804763-247f6793148e?q=80&w=600"], peso: "6.2g", medida: "8", precioDiseno: "$750", dimensiones: "4mm ancho" },
        { id: 102, name: "Anillo Compromiso Eterno", category: "compromiso", images: ["https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600"], peso: "4.8g", medida: "6", precioDiseno: "$1,200", dimensiones: "2mm base" },
        // --- GRADUACIÓN ---
        { id: 301, name: "Anillo Elegance Oro", category: "bachiller-dama", images: ["https://images.unsplash.com/photo-1605100804763-247f6793148e?auto=format&fit=crop&q=80&w=500"], peso: "4.5g", medida: "6-8", precioDiseno: "$350", badge: "NUEVO" },
        { id: 302, name: "Bachiller Zafiro Dama", category: "bachiller-dama", images: ["https://images.unsplash.com/photo-1599643478514-4a5202336336?auto=format&fit=crop&q=80&w=500"], peso: "5.2g", medida: "7", precioDiseno: "$420" },
        { id: 303, name: "Sello Imperial Bachiller", category: "bachiller-caballero", images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$450", badge: "VENDIDO", badgeClass: "badge-sold-out" },
        { id: 304, name: "Plata Ónix Caballero", category: "bachiller-caballero", images: ["https://images.unsplash.com/photo-1635391108269-00a8aa0aa37e?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$290" },
        { id: 305, name: "Anillo Profesional Medicina", category: "carreras-dama", images: ["https://images.unsplash.com/photo-1604382354936-07c5d0ba4bea?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$520" },
        { id: 306, name: "Carreras Oro Rosado", category: "carreras-dama", images: ["https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$480" },
        { id: 307, name: "Anillo Ingeniero Titanio", category: "carreras-caballero", images: ["https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$490", badge: "POPULAR" },
        { id: 308, name: "Derecho Clásico Oro", category: "carreras-caballero", images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$550" },
        { id: 309, name: "6to Grado Dama Corazón", category: "sexto-dama", images: ["https://images.unsplash.com/photo-1589674781759-c21c37956a44?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$120" },
        { id: 310, name: "6to Grado Caballero Plata", category: "sexto-caballero", images: ["https://images.unsplash.com/photo-1604382354936-07c5d0ba4bea?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$150" },
        { id: 311, name: "Preescolar Niña Estrellas", category: "preescolar-dama", images: ["https://images.unsplash.com/photo-1599643478514-4a5202336336?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$95" },
        { id: 312, name: "Preescolar Niño 10K", category: "preescolar-caballero", images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$80" },
        // --- BODAS & COMPROMISO ---
        { id: 401, name: "Solitario Diamante Corte Princesa", category: "bodas-compromiso", images: ["https://images.unsplash.com/photo-1605100804763-247f6793148e?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$1,200", badge: "PREMIUM", peso: "6.2g", medida: "7", dimensiones: "6mm piedra" },
        { id: 402, name: "Halo Diamante Oro Blanco", category: "bodas-compromiso", images: ["https://images.unsplash.com/photo-1599643478514-4a5202336336?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$1,450", peso: "7.5g", medida: "6.5", dimensiones: "8mm halo" },
        { id: 403, name: "Solitario Zirconia Clásico", category: "bodas-compromiso", images: ["https://images.unsplash.com/photo-1604382354936-07c5d0ba4bea?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$450", peso: "5.0g", medida: "8", dimensiones: "5mm piedra" },
        { id: 404, name: "Vintage Rose Zirconia", category: "bodas-compromiso", images: ["https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$380", peso: "4.8g", medida: "7", dimensiones: "6mm flor" },
        { id: 405, name: "Alianza Clásica 18K", category: "bodas-alianzas", images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$600", badge: "POPULAR", peso: "8.0g", medida: "9", dimensiones: "4mm ancho" },
        { id: 406, name: "Banda Texturizada Oro Amarillo", category: "bodas-alianzas", images: ["https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$720", peso: "9.5g", medida: "10", dimensiones: "5mm ancho" },
        { id: 407, name: "Alianza Plata Esterlina", category: "bodas-alianzas", images: ["https://images.unsplash.com/photo-1635391108269-00a8aa0aa37e?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$150", peso: "6.0g", medida: "8", dimensiones: "4mm ancho" },
        { id: 408, name: "Set Nupcial Diamantes Dúo", category: "bodas-alianzas", images: ["https://images.unsplash.com/photo-1589674781759-c21c37956a44?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$1,800", badge: "SET", peso: "12.0g", medida: "7", dimensiones: "Set 2 anillos" },
        // --- JOYAS EXTRANJERAS ---
        { id: 501, name: "Pulsera Tenis Diamantes", category: "ext-pulseras-dama", images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$850", badge: "ITALIA", peso: "8.5g", medida: "18cm", dimensiones: "3mm diamantes" },
        { id: 502, name: "Esclava Cubana 18K", category: "ext-pulseras-caballero", images: ["https://images.unsplash.com/photo-1599643478514-4a5202336336?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$1,200", peso: "22.0g", medida: "21cm", dimensiones: "8mm ancho" },
        { id: 503, name: "Pulsera Identidad Italiana", category: "ext-pulseras-nino", images: ["https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$180", peso: "4.2g", medida: "15cm", dimensiones: "Plate 20mm" },
        { id: 504, name: "Gargantilla Cartier Fina", category: "ext-cadenas-dama", images: ["https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$350", peso: "10.5g", medida: "45cm", dimensiones: "2.5mm ancho" },
        { id: 505, name: "Cadena Lomo Corvina", category: "ext-cadenas-caballero", images: ["https://images.unsplash.com/photo-1605100804763-247f6793148e?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$900", badge: "PREMIUM", peso: "45.0g", medida: "60cm", dimensiones: "6mm ancho" },
        { id: 506, name: "Cadena Fígaro Delgada", category: "ext-cadenas-nino", images: ["https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$220", peso: "8.0g", medida: "40cm", dimensiones: "2mm ancho" },
        { id: 507, name: "Anillo Cocktail Rubí", category: "ext-anillos-dama", images: ["https://images.unsplash.com/photo-1604382354936-07c5d0ba4bea?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$650" },
        { id: 508, name: "Sello Ónix Importado", category: "ext-anillos-caballero", images: ["https://images.unsplash.com/photo-1544391697-71c841e06fa5?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$480" },
        { id: 509, name: "Anillo Inicial Esmalte", category: "ext-anillos-nino", images: ["https://images.unsplash.com/photo-1635391108269-00a8aa0aa37e?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$120" },
        { id: 510, name: "Medalla Virgen Grabada", category: "ext-dijes-dama", images: ["https://images.unsplash.com/photo-1589674781759-c21c37956a44?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$290" },
        { id: 511, name: "Cruz Bizantina Oro 18K", category: "ext-dijes-caballero", images: ["https://images.unsplash.com/photo-1629853906663-95f70a2a4e40?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$340" },
        { id: 512, name: "Dije Angelito Bicolor", category: "ext-dijes-nino", images: ["https://images.unsplash.com/photo-1605100804763-247f6793148e?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$150" },
        { id: 513, name: "Arracadas Tubulares Italianas", category: "ext-aretes", images: ["https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$420", badge: "NUEVO" },
        { id: 514, name: "Broquel Diamante Corte", category: "ext-aretes", images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$280" },
        { id: 515, name: "Topos Bolita Oro 14k", category: "ext-aretes", images: ["https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$90" },
        // --- JOYAS NACIONALES ---
        { id: 601, name: "Pulsera Tejida Filigrana", category: "nac-pulseras-dama", images: ["https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$210", badge: "ARTESANO", peso: "5.5g", medida: "18cm", dimensiones: "Bolas 4mm" },
        { id: 602, name: "Esclava Tejido Nacional", category: "nac-pulseras-caballero", images: ["https://images.unsplash.com/photo-1629853906663-95f70a2a4e40?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$350", badge: "HECHO A MANO" },
        { id: 603, name: "Esclava Identidad Infantil", category: "nac-pulseras-nino", images: ["https://images.unsplash.com/photo-1544391697-71c841e06fa5?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$120" },
        { id: 604, name: "Cadena Fina Oro 10K", category: "nac-cadenas-dama", images: ["https://images.unsplash.com/photo-1605100804763-247f6793148e?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$180" },
        { id: 605, name: "Cadena Tejido Cordón", category: "nac-cadenas-caballero", images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$450" },
        { id: 606, name: "Cadena Infantil Oro 10K", category: "nac-cadenas-nino", images: ["https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$110" },
        { id: 607, name: "Anillo Diseño Nacional", category: "nac-anillos-dama", images: ["https://images.unsplash.com/photo-1629853906663-95f70a2a4e40?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$280", badge: "LOCAL" },
        { id: 608, name: "Sello Nicaragüense Oro", category: "nac-anillos-caballero", images: ["https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$400" },
        { id: 609, name: "Anillo Inicial Niño 10K", category: "nac-anillos-nino", images: ["https://images.unsplash.com/photo-1589674781759-c21c37956a44?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$90" },
        { id: 610, name: "Dije Escudo de Nicaragua", category: "nac-dijes-dama", images: ["https://images.unsplash.com/photo-1604382354936-07c5d0ba4bea?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$150" },
        { id: 611, name: "Dije Cruz Tradicional", category: "nac-dijes-caballero", images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$200" },
        { id: 612, name: "Medalla Angelito Oro", category: "nac-dijes-nino", images: ["https://images.unsplash.com/photo-1635391108269-00a8aa0aa37e?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$120" },
        { id: 613, name: "Aretes Filigrana Oro", category: "nac-aretes", images: ["https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$180", badge: "ARTESANO" },
        // --- PERSONALIZACION 3D ---
        { id: 701, name: "Pulsera Tejido Cubano Digno 3D", category: "p3d-tejidos", images: ["https://images.unsplash.com/photo-1599643478514-4a5202336336?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$940", badge: "A MEDIDA", peso: "25.5g", medida: "Largo 21cm", dimensiones: "10mm ancho" },
        { id: 702, name: "Candado Macizo Laser", category: "p3d-tejidos", images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$400", peso: "12.0g", dimensiones: "20mm x 25mm" },
        { id: 703, name: "Sello Mesa Cuadrado Zirconias", category: "p3d-mesa", images: ["https://images.unsplash.com/photo-1605100804763-247f6793148e?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$720", peso: "15.0g", medida: "10", dimensiones: "18mm mesa" },
        { id: 704, name: "Anillo Mesa Oval Monograma", category: "p3d-mesa", images: ["https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$650", peso: "14.2g", medida: "11", dimensiones: "20mm x 15mm mesa" },
        { id: 705, name: "Dije Escudo Familiar 3D", category: "p3d-dijes", images: ["https://images.unsplash.com/photo-1589674781759-c21c37956a44?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$580" },
        { id: 706, name: "Inicial 'A' Calada", category: "p3d-alfabeto", images: ["https://images.unsplash.com/photo-1604382354936-07c5d0ba4bea?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$120" },
        { id: 707, name: "Diseño Abstracto Fluid", category: "p3d-variado", images: ["https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$350" },
        { id: 708, name: "Anillo Quinceañera Corona 3D", category: "p3d-15", images: ["https://images.unsplash.com/photo-1635391108269-00a8aa0aa37e?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$400", badge: "15 AÑOS" },
        { id: 709, name: "Anillo Silueta Animal", category: "p3d-figura", images: ["https://images.unsplash.com/photo-1605100804763-247f6793148e?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$220" },
        { id: 710, name: "Dije Iniciales Entrelazadas", category: "p3d-dijes-alfa", images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$290" },
        { id: 711, name: "Compromiso Micro-Pavé", category: "p3d-comp-finos", images: ["https://images.unsplash.com/photo-1599643478514-4a5202336336?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$1,200", badge: "PREMIUM" },
        { id: 712, name: "Churumbela Casual Diario", category: "p3d-casuales", images: ["https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&q=80&w=500"], precioDiseno: "$180" }
    ],
    finishedWorks: [],
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
                { id: "p3d-tejidos", name: "Tejidos" },
                { id: "p3d-mesa", name: "Mesa" },
                { id: "p3d-dijes", name: "Dijes" },
                { id: "p3d-alfabeto", name: "Alfabeto" },
                { id: "p3d-variado", name: "Variado" },
                { id: "p3d-15", name: "15 Años" },
                { id: "p3d-figura", name: "Figuras" },
                { id: "p3d-dijes-alfa", name: "Dijes Alfabeto" },
                { id: "p3d-comp-finos", name: "Compromiso Fino" },
                { id: "p3d-casuales", name: "Casuales" }
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

export function loadStorage() {
    const saved = localStorage.getItem('joyeriaGraceData');
    if (saved) {
        const savedData = JSON.parse(saved);
        // Force refresh hardcoded sections while keeping dynamic data like products/cart
        siteData = {
            ...siteData, // Keeps new hardcoded services/about
            products: savedData.products || siteData.products,
            catalogItems: savedData.catalogItems || siteData.catalogItems,
            finishedWorks: savedData.finishedWorks || siteData.finishedWorks,
            categories: savedData.categories || siteData.categories
        };
    }

    // Ensure finishedWorks is populated if missing or empty
    if (!siteData.finishedWorks || siteData.finishedWorks.length === 0) {
        siteData.finishedWorks = [];
        const workTypes = ["Anillo", "Pulsera", "Cadena", "Dije", "Aretes"];
        const metals = ["Oro 14k", "Oro 18k", "Plata .925", "Platino"];
        const images = [
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600",
            "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=600",
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600",
            "https://images.unsplash.com/photo-1589128777078-ce9e1906c86a?q=80&w=600",
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600"
        ];
        for (let i = 0; i < 25; i++) {
            siteData.finishedWorks.push({
                id: 200 + i,
                name: `${workTypes[i % workTypes.length]} Realizado ${i + 1}`,
                type: workTypes[i % workTypes.length],
                weight: `${(Math.random() * 10 + 2).toFixed(1)}g`,
                size: i % 2 === 0 ? "18cm" : "Medida 7",
                metal: metals[i % metals.length],
                pearls: i % 3 === 0 ? "4 Perlas cultivadas" : "Sin perlas",
                image: images[i % images.length] + `&random=${i}`
            });
        }
    }

    if (!saved) {
        const baseProducts = [
            { name: "Anillo de Oro", type: "Anillo", price: 15000, img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600" },
            { name: "Collar de Plata", type: "Collar", price: 2500, img: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=600" }
        ];
        for (let i = 0; i < 16; i++) {
            const base = baseProducts[i % baseProducts.length];
            siteData.products.push({
                id: i + 1,
                name: base.name,
                price: base.price + (i * 100),
                priceStr: `$${(base.price + (i * 100)).toLocaleString()}`,
                image: base.img,
                desc: `Pieza única diseñada a medida.`
            });
        }
    }
}

export function saveStorage() {
    localStorage.setItem('joyeriaGraceData', JSON.stringify(siteData));
}
