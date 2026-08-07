# Production Deployment Guide

## 1. Vercel Deployment (Frontend & Edge API)

1. Connect your GitHub repository to Vercel.
2. Select **Next.js** framework preset.
3. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
4. Click **Deploy**.

## 2. Supabase Deployment (Database & Storage)

1. Create a project on [Supabase.com](https://supabase.com).
2. Go to **SQL Editor** and execute `supabase/schema.sql`.
3. Enable Email/Password Auth under **Authentication -> Providers**.

## 3. Razorpay & Shiprocket Setup

1. Copy your Live Key ID & Key Secret from [Razorpay Dashboard](https://dashboard.razorpay.com).
2. Enter API credentials in `src/lib/services/shiprocket.ts` for automated AWB shipment generation.
