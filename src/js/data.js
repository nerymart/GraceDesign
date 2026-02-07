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
        { id: 101, name: "Anillo de Boda Real", category: "boda", images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600"], peso: "6.2g", medida: "8", precioDiseno: "$750", dimensiones: "4mm ancho" },
        { id: 102, name: "Anillo Compromiso Eterno", category: "compromiso", images: ["https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600"], peso: "4.8g", medida: "6", precioDiseno: "$1,200", dimensiones: "2mm base" }
    ],
    finishedWorks: []
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
            finishedWorks: savedData.finishedWorks || siteData.finishedWorks
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
