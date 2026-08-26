-- ===================================================
-- LUXE COMMERCE — CUSTOMER ACCOUNT & ADMIN OPS SCHEMA
-- ===================================================

-- 1. CUSTOMER ADDRESSES TABLE
CREATE TABLE IF NOT EXISTS public.customer_addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    address_type VARCHAR(50) DEFAULT 'Home' CHECK (address_type IN ('Home', 'Work', 'Other')),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. RETURNS TABLE
CREATE TABLE IF NOT EXISTS public.returns (
    id VARCHAR(100) PRIMARY KEY,
    order_id VARCHAR(255) NOT NULL,
    user_id UUID NOT NULL,
    status VARCHAR(50) DEFAULT 'Requested' CHECK (status IN ('Requested', 'Under Review', 'Approved', 'Rejected', 'Return In Transit', 'Received', 'Inspection', 'Refund Processing', 'Refunded', 'Closed')),
    reason VARCHAR(255) NOT NULL,
    description TEXT,
    evidence_images TEXT[],
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. RETURN ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.return_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    return_id VARCHAR(100) REFERENCES public.returns(id) ON DELETE CASCADE,
    product_id VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);

-- 4. REFUNDS TABLE
CREATE TABLE IF NOT EXISTS public.refunds (
    id VARCHAR(100) PRIMARY KEY,
    return_id VARCHAR(100) REFERENCES public.returns(id) ON DELETE SET NULL,
    order_id VARCHAR(255) NOT NULL,
    user_id UUID NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    type VARCHAR(50) DEFAULT 'Full' CHECK (type IN ('Full', 'Partial')),
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Processing', 'Completed', 'Failed')),
    method VARCHAR(50) DEFAULT 'Razorpay',
    gateway_refund_id VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id VARCHAR(255) NOT NULL,
    user_id UUID NOT NULL,
    order_id VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    text TEXT NOT NULL,
    photos TEXT[],
    is_verified_purchaser BOOLEAN DEFAULT TRUE,
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Published', 'Reported', 'Rejected')),
    helpful_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. BRAND SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.brand_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS SECURITY POLICIES
ALTER TABLE public.customer_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.returns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.refunds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_settings ENABLE ROW LEVEL SECURITY;

-- Customer RLS: Users can only manage their own addresses & returns
CREATE POLICY "Customer manage own addresses" ON public.customer_addresses FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Customer manage own returns" ON public.returns FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Customer manage own reviews" ON public.reviews FOR ALL USING (auth.uid() = user_id);

-- Public Read for Published Reviews & Brand Settings
CREATE POLICY "Public read published reviews" ON public.reviews FOR SELECT USING (status = 'Published');
CREATE POLICY "Public read brand settings" ON public.brand_settings FOR SELECT USING (true);

-- Admin Full Access Policies
CREATE POLICY "Admin manage all addresses" ON public.customer_addresses FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin' OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admin manage all returns" ON public.returns FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin' OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admin manage all refunds" ON public.refunds FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin' OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admin manage all reviews" ON public.reviews FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin' OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admin manage brand settings" ON public.brand_settings FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin' OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
