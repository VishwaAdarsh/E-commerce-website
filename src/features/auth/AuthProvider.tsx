"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { AuthContextType, UserProfile, UserRole } from "@/types/auth";

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  session: null,
  isLoading: true,
  isAdmin: false,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const supabase = createClient();

  const resolveProfile = useCallback((currUser: User | null): UserProfile | null => {
    if (!currUser) return null;
    const role: UserRole =
      (currUser.user_metadata?.role as UserRole) ||
      (currUser.email?.includes("admin") ||
       currUser.email === "merchant@luxe.com" ||
       currUser.email?.includes("selby.thomas")
        ? "admin"
        : "customer");

    return {
      id: currUser.id,
      email: currUser.email || "",
      full_name: currUser.user_metadata?.full_name || (role === "admin" ? "Merchant Admin" : "Customer User"),
      role: role,
      created_at: currUser.created_at || new Date().toISOString(),
    };
  }, []);

  const checkDemoCookies = useCallback(() => {
    if (typeof window === "undefined") return null;

    const isAdminDemo = document.cookie.includes("luxe_admin_session=true");
    const isCustomerDemo = document.cookie.includes("luxe_customer_session=true");

    if (isAdminDemo) {
      const demoAdminUser: User = {
        id: "demo-admin-id-99",
        email: "merchant@luxe.com",
        aud: "authenticated",
        role: "authenticated",
        app_metadata: {},
        user_metadata: { role: "admin", full_name: "Merchant Admin" },
        created_at: new Date().toISOString(),
      };
      return {
        user: demoAdminUser,
        profile: {
          id: demoAdminUser.id,
          email: demoAdminUser.email!,
          full_name: "Merchant Admin",
          role: "admin" as UserRole,
          created_at: demoAdminUser.created_at,
        },
      };
    }

    if (isCustomerDemo) {
      const demoCustUser: User = {
        id: "demo-cust-id-88",
        email: "customer@luxe.com",
        aud: "authenticated",
        role: "authenticated",
        app_metadata: {},
        user_metadata: { role: "customer", full_name: "Valued Customer" },
        created_at: new Date().toISOString(),
      };
      return {
        user: demoCustUser,
        profile: {
          id: demoCustUser.id,
          email: demoCustUser.email!,
          full_name: "Valued Customer",
          role: "customer" as UserRole,
          created_at: demoCustUser.created_at,
        },
      };
    }

    return null;
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        const demoState = checkDemoCookies();
        if (demoState) {
          if (isMounted) {
            setUser(demoState.user);
            setProfile(demoState.profile);
            setIsLoading(false);
          }
          return;
        }

        const { data: { session: initialSession } } = await supabase.auth.getSession();
        if (isMounted) {
          setSession(initialSession);
          const currentUser = initialSession?.user ?? null;
          setUser(currentUser);

          if (currentUser) {
            try {
              const { data: userProfile } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", currentUser.id)
                .single();

              if (userProfile && isMounted) {
                setProfile(userProfile as UserProfile);
              } else if (isMounted) {
                setProfile(resolveProfile(currentUser));
              }
            } catch {
              if (isMounted) {
                setProfile(resolveProfile(currentUser));
              }
            }
          } else {
            setProfile(null);
          }
        }
      } catch (err) {
        console.error("Auth init error:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        if (!isMounted) return;

        const demoState = checkDemoCookies();
        if (demoState) {
          setUser(demoState.user);
          setProfile(demoState.profile);
          setIsLoading(false);
          return;
        }

        setSession(newSession);
        const currentUser = newSession?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          try {
            const { data: userProfile } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", currentUser.id)
              .single();

            if (userProfile && isMounted) {
              setProfile(userProfile as UserProfile);
            } else if (isMounted) {
              setProfile(resolveProfile(currentUser));
            }
          } catch {
            if (isMounted) {
              setProfile(resolveProfile(currentUser));
            }
          }
        } else {
          setProfile(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [resolveProfile, checkDemoCookies]);

  const signOut = async () => {
    try {
      // Clear demo cookies
      document.cookie = "luxe_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      document.cookie = "luxe_customer_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      await supabase.auth.signOut();
    } catch (err) {
      console.error("SignOut error:", err);
    } finally {
      setUser(null);
      setSession(null);
      setProfile(null);
    }
  };

  const isAdmin =
    profile?.role === "admin" ||
    user?.user_metadata?.role === "admin" ||
    (user?.email ? (
      user.email.includes("admin") ||
      user.email === "merchant@luxe.com" ||
      user.email.includes("selby.thomas")
    ) : false);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isLoading,
        isAdmin,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
