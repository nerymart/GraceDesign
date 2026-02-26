-- Tablas para GraceBoaco Database

-- 1. Categorías Principales
CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    link TEXT,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Subcategorías
CREATE TABLE IF NOT EXISTS subcategories (
    id TEXT PRIMARY KEY,
    category_id TEXT REFERENCES categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Catálogo de Diseños (Galería interna)
CREATE TABLE IF NOT EXISTS catalog_items (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT, -- ID de la subcategoría
    images JSONB DEFAULT '[]',
    peso TEXT,
    medida TEXT,
    precio_diseno TEXT,
    dimensiones TEXT,
    badge TEXT,
    badge_class TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Productos / Accesorios Disponibles
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT,
    price NUMERIC,
    price_str TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Servicios
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    image TEXT,
    description TEXT,
    features JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Trabajos Realizados
CREATE TABLE IF NOT EXISTS finished_works (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT,
    weight TEXT,
    size TEXT,
    metal TEXT,
    pearls TEXT,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Información de "Nosotros"
CREATE TABLE IF NOT EXISTS site_about (
    id INT PRIMARY KEY DEFAULT 1,
    title TEXT,
    description TEXT,
    images JSONB DEFAULT '[]',
    CHECK (id = 1)
);

-- 8. Tarjetas de Promoción
CREATE TABLE IF NOT EXISTS promo_cards (
    id SERIAL PRIMARY KEY,
    tagline TEXT,
    title TEXT,
    button_text TEXT,
    image_url TEXT,
    type TEXT, -- 'tall' o 'wide'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- POLÍTICAS DE SEGURIDAD (RLS) - Permite que cualquiera lea, pero solo tú edites
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE catalog_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE finished_works ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_about ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_cards ENABLE ROW LEVEL SECURITY;

-- Crear políticas de lectura pública
CREATE POLICY "Public Read Categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public Read Subcategories" ON subcategories FOR SELECT USING (true);
CREATE POLICY "Public Read Catalog" ON catalog_items FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON products FOR SELECT USING (true);
CREATE POLICY "Public Read Services" ON services FOR SELECT USING (true);
CREATE POLICY "Public Read Works" ON finished_works FOR SELECT USING (true);
CREATE POLICY "Public Read About" ON site_about FOR SELECT USING (true);
CREATE POLICY "Public All Promos" ON promo_cards FOR ALL USING (true);

-- 9. Ajustes del Sitio (Tasa de cambio)
CREATE TABLE IF NOT EXISTS site_settings (
    id TEXT PRIMARY KEY DEFAULT 'global',
    conversion_rate NUMERIC DEFAULT 36.5,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar seguridad
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public All Settings" ON site_settings FOR ALL USING (true);

-- Insertar configuración inicial
INSERT INTO site_settings (id, conversion_rate) 
VALUES ('global', 36.5)
ON CONFLICT (id) DO NOTHING;

-- Insertar datos iniciales de "Nosotros"
INSERT INTO site_about (id, title, description) 
VALUES (1, 'Creamos la joya de tus sueños', 'Utilizamos la última tecnología de impresión 3D y diseño CAD para materializar tus ideas más creativas.')
ON CONFLICT (id) DO NOTHING;
