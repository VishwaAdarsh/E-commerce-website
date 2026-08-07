# LUXE — Earth & Artifact E-Commerce Platform

LUXE is an enterprise-grade e-commerce application built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Supabase Auth, Razorpay Payments, and Shiprocket Logistics integration.

The visual interface adheres strictly to the **Earth & Artifact / Organic Modernism** design specification (`#845331` clay primary, `#faba90` warm peach accents, `#fff8f6` background, Inter typography).

---

## Technical Stack

- **Framework**: Next.js 14+ (App Router, Server Components)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Database & Auth**: Supabase (`@supabase/supabase-js`, `@supabase/ssr`)
- **Payments**: Razorpay Order SDK + HMAC SHA-256 Signature Verification
- **Logistics**: Shiprocket Shipment Creation & AWB Tracking
- **Animations & Utilities**: Framer Motion, Zod, Lucide React Icons

---

## Getting Started

### 1. Prerequisites
- Node.js 18+ or Node.js 20+
- npm or yarn

### 2. Environment Setup
Copy `.env.local` and set your credentials:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://fbtiigdfglailzjzfryp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
SHIPROCKET_EMAIL=your_shiprocket_email
SHIPROCKET_PASSWORD=your_shiprocket_password
```

### 3. Installation & Run
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build Verification
To compile the production bundle and check strict TypeScript validity:
```bash
npm run build
```
