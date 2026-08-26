-- ===================================================
-- LUXE COMMERCE — PRODUCT DISCOVERY & PDP SCHEMA
-- ===================================================

-- 1. PRODUCT VARIANTS TABLE
CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id VARCHAR(255) NOT NULL,
    sku VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    color VARCHAR(100),
    size VARCHAR(50),
    material VARCHAR(100),
    price NUMERIC(10, 2) NOT NULL,
    compare_at_price NUMERIC(10, 2),
    stock INT NOT NULL DEFAULT 0,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PRODUCT SPECIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.product_specifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id VARCHAR(255) NOT NULL UNIQUE,
    material VARCHAR(255),
    finish VARCHAR(255),
    dimensions VARCHAR(255),
    weight VARCHAR(100),
    country_of_origin VARCHAR(100) DEFAULT 'India',
    care_instructions TEXT,
    brand_story TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRODUCT QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS public.product_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id VARCHAR(255) NOT NULL,
    user_id UUID,
    customer_name VARCHAR(255) NOT NULL,
    question TEXT NOT NULL,
    answer TEXT,
    answered_by VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Published' CHECK (status IN ('Pending', 'Published', 'Rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS SECURITY POLICIES
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read product variants" ON public.product_variants FOR SELECT USING (true);
CREATE POLICY "Public read product specifications" ON public.product_specifications FOR SELECT USING (true);
CREATE POLICY "Public read product questions" ON public.product_questions FOR SELECT USING (status = 'Published');

CREATE POLICY "Admin manage product variants" ON public.product_variants FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin' OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admin manage product specifications" ON public.product_specifications FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin' OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admin manage product questions" ON public.product_questions FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin' OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
