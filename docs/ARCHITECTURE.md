# System Architecture Documentation

## Architecture Overview

The LUXE Platform uses a **Feature-Driven Architecture** separating UI primitives, domain features, data services, and global hooks:

```text
src/
├── types/                # Strict domain interfaces (Product, Order, Auth, ERP)
├── lib/                  # Services & Utilities
│   ├── supabase/         # Client & Server SSR Supabase helpers
│   ├── payments/         # Razorpay checkout & signature verification
│   └── shipping/         # Shiprocket shipment creation & AWB tracking
├── components/
│   ├── ui/               # Atomic UI primitives (Button, Modal, Drawer, Toast, CountdownTimer)
│   ├── layout/           # Shared Navbar, Footer, MerchantSidebar
│   ├── common/           # Shared page wrappers
│   └── forms/            # Form controls
├── features/             # Domain Feature Modules
│   ├── auth/             # Authentication & AuthProvider
│   ├── products/         # Product catalog & admin inventory
│   ├── cart/             # Shopping cart state engine
│   ├── checkout/         # Multi-step checkout & payment processing
│   ├── orders/           # Order management & Shiprocket fulfillment
│   ├── analytics/        # Business intelligence & KPI metrics
│   ├── coupons/          # Coupon validation engine
│   ├── reviews/          # Customer reviews system
│   ├── wishlist/         # Wishlist state engine
│   └── storefront/       # Storefront Hero, Bento & Newsletter
└── app/                  # Next.js App Router Page Layouts
```

## Security & Protection Layers

1. **Route Middleware (`src/middleware.ts`)**: Guards `/admin/*` and `/dashboard/*` endpoints using Supabase session validation.
2. **Database Row Level Security (`supabase/schema.sql`)**: Enforces user ownership policies for `profiles`, `orders`, `cart_items`, `wishlist`, and `addresses`.
3. **Server-Side Payment Signature Verification**: Ensures Razorpay payments are validated via SHA-256 HMAC before marking orders as paid.
