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

  const isAuthenticated = !!user || demoAdminSession || demoCustomerSession;
  const isUserAdmin = demoAdminSession || (user && (
    user.user_metadata?.role === "admin" ||
    user.email?.includes("admin") ||
    user.email === "merchant@luxe.com" ||
    user.email?.includes("selby.thomas")
  ));

  const url = request.nextUrl.clone();

  // 1. Protected Admin Routes (/admin/*)
  if (url.pathname.startsWith("/admin") && url.pathname !== "/admin/login") {
    if (!isAuthenticated) {
      url.pathname = "/admin/login";
      url.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    if (!isUserAdmin) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  // 2. Protected Customer Dashboard Route (/dashboard/*)
  if (url.pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      url.pathname = "/login";
      url.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  // 3. Login / Register Page Redirects for Authenticated Users
  if ((url.pathname === "/login" || url.pathname === "/register" || url.pathname === "/admin/login") && isAuthenticated) {
    const redirectParam = request.nextUrl.searchParams.get("redirect");
    if (redirectParam && redirectParam !== "/login" && redirectParam !== "/admin/login") {
      url.pathname = redirectParam;
      url.searchParams.delete("redirect");
      return NextResponse.redirect(url);
    }

    if (url.pathname === "/admin/login" && isUserAdmin) {
      url.pathname = "/admin/orders";
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/login", "/register"],
};
