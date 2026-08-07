-- LUXE / Earth & Artifact Database Schema - Phase 3 Product Catalog

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- User Profiles Table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  role text default 'customer' check (role in ('customer', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Brands Table
create table if not exists public.brands (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  logo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Categories Table
create table if not exists public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  slug text not null unique,
  description text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Products Table
create table if not exists public.products (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  sku text unique not null,
  price numeric(10, 2) not null check (price >= 0),
  compare_at_price numeric(10, 2),
  category_id uuid references public.categories(id) on delete set null,
  brand_id uuid references public.brands(id) on delete set null,
  stock integer default 0 check (stock >= 0),
  status text default 'ACTIVE' check (status in ('ACTIVE', 'LOW STOCK', 'DRAFT', 'ARCHIVED')),
  rating numeric(2, 1) default 5.0,
  is_new boolean default false,
  is_bestseller boolean default false,
  description text,
  specifications jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Product Images Table
create table if not exists public.product_images (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  image_url text not null,
  alt_text text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Product Variants Table
create table if not exists public.product_variants (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  title text not null,
  sku text unique not null,
  price numeric(10, 2) not null,
  stock integer default 0,
  options jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Product Tags Table
create table if not exists public.product_tags (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  tag_name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(product_id, tag_name)
);

-- Inventory Management Table
create table if not exists public.inventory (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  variant_id uuid references public.product_variants(id) on delete cascade,
  current_stock integer default 0 check (current_stock >= 0),
  low_stock_threshold integer default 10,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for Fast Query Performance
create index if not exists idx_products_category on public.products(category_id);
create index if not exists idx_products_status on public.products(status);
create index if not exists idx_products_sku on public.products(sku);
create index if not exists idx_product_images_product on public.product_images(product_id);
create index if not exists idx_product_variants_product on public.product_variants(product_id);

-- RLS Policies
alter table public.brands enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_tags enable row level security;
alter table public.inventory enable row level security;

-- Public Select Policies
create policy "Brands are viewable by everyone" on public.brands for select using (true);
create policy "Categories are viewable by everyone" on public.categories for select using (true);
create policy "Products are viewable by everyone" on public.products for select using (true);
create policy "Product images are viewable by everyone" on public.product_images for select using (true);
create policy "Product variants are viewable by everyone" on public.product_variants for select using (true);

-- Admin Mutation Policies
create policy "Admins manage products" on public.products for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
