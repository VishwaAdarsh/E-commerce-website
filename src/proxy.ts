import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

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

  // 1. Protected Admin Routes (/admin/*)
  if (url.pathname.startsWith("/admin") && url.pathname !== "/admin/login") {
    if (!user) {
      url.pathname = "/admin/login";
      url.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    // Role check for admin
    const role =
      user.user_metadata?.role ||
      (user.email?.includes("admin") || user.email === "merchant@luxe.com" ? "admin" : "customer");

    if (role !== "admin") {
      // Non-admin attempting to access admin routes -> redirect to customer dashboard
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  // 2. Protected Customer Dashboard Route (/dashboard/*)
  if (url.pathname.startsWith("/dashboard")) {
    if (!user) {
      url.pathname = "/login";
      url.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  // 3. Login / Register Page Redirects for Authenticated Users
  if ((url.pathname === "/login" || url.pathname === "/register") && user) {
    const role =
      user.user_metadata?.role ||
      (user.email?.includes("admin") || user.email === "merchant@luxe.com" ? "admin" : "customer");
    
    // Check if there is an explicit redirect query parameter (e.g. /login?redirect=/checkout)
    const redirectParam = request.nextUrl.searchParams.get("redirect");
    if (redirectParam && redirectParam !== "/login" && redirectParam !== "/admin/login") {
      url.pathname = redirectParam;
      url.searchParams.delete("redirect");
      return NextResponse.redirect(url);
    }

    url.pathname = role === "admin" ? "/admin/orders" : "/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/login", "/register"],
};
