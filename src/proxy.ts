import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const demoAdminSession = request.cookies.get("luxe_admin_session")?.value === "true";
  const demoCustomerSession = request.cookies.get("luxe_customer_session")?.value === "true";

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fbtiigdfglailzjzfryp.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_NrN-9kbsmd1rVsBC-ssJng_3GgnliIZ",
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();
  const path = url.pathname;

  const isSupabaseAdmin = !!user && (
    user.user_metadata?.role === "admin" ||
    user.email?.includes("admin") ||
    user.email === "merchant@luxe.com" ||
    user.email?.includes("selby.thomas")
  );

  const isUserAdmin = demoAdminSession || isSupabaseAdmin;
  const isAuthenticated = !!user || demoAdminSession || demoCustomerSession;

  // 1. PUBLIC ROUTE: /admin/login must ALWAYS render cleanly for unauthenticated users
  if (path === "/admin/login") {
    if (isUserAdmin) {
      // Already authenticated as Admin -> redirect to /admin/orders
      const redirectParam = url.searchParams.get("redirect");
      url.pathname = redirectParam || "/admin/orders";
      url.searchParams.delete("redirect");
      return NextResponse.redirect(url);
    }
    // Unauthenticated or customer -> render /admin/login freely
    return response;
  }

  // 2. PROTECTED ADMIN ROUTES: /admin/* (e.g. /admin/orders, /admin/products)
  if (path.startsWith("/admin")) {
    if (!isAuthenticated) {
      url.pathname = "/admin/login";
      url.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    if (!isUserAdmin) {
      // Authenticated as Customer -> 403 Forbidden / Redirect to customer dashboard
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  // 3. PROTECTED CUSTOMER ROUTE: /dashboard/*
  if (path.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      url.pathname = "/login";
      url.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  // 4. CUSTOMER LOGIN & REGISTER PAGES: /login, /register
  if ((path === "/login" || path === "/register") && isAuthenticated) {
    const redirectParam = url.searchParams.get("redirect");
    if (redirectParam && redirectParam !== "/login" && redirectParam !== "/admin/login") {
      url.pathname = redirectParam;
      url.searchParams.delete("redirect");
      return NextResponse.redirect(url);
    }

    url.pathname = isUserAdmin ? "/admin/orders" : "/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/login", "/register"],
};
