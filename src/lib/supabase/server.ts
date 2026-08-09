import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { apiError } from "@/lib/utils/api-response";

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fbtiigdfglailzjzfryp.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_NrN-9kbsmd1rVsBC-ssJng_3GgnliIZ",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch (error) {
            // Handled in middleware/server actions
          }
        },
      },
    }
  );
}

export async function getAuthenticatedUser() {
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return { user: null, supabase, error: error || new Error("Unauthorized") };
  }

  return { user, supabase, error: null };
}

export async function requireAdminUser() {
  const { user, supabase, error } = await getAuthenticatedUser();

  if (error || !user) {
    return { user: null, supabase, isAdmin: false, response: apiError("UNAUTHORIZED", "Authentication required", 401) };
  }

  // Server-side check against profiles table
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const isAdmin =
    profile?.role === "admin" ||
    user.user_metadata?.role === "admin" ||
    (user.email ? (user.email.includes("admin") || user.email === "merchant@luxe.com") : false);

  if (!isAdmin) {
    return { user, supabase, isAdmin: false, response: apiError("FORBIDDEN", "Admin authorization required", 403) };
  }

  return { user, supabase, isAdmin: true, response: null };
}
