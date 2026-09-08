import { redirect } from "next/navigation";
import { isAllowlistedEmail } from "@/lib/admin-email";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

export { getAdminEmail, isAllowlistedEmail } from "@/lib/admin-email";

export async function getSessionUser(): Promise<User | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getAdminUser(): Promise<User | null> {
  const user = await getSessionUser();
  if (!user || !isAllowlistedEmail(user.email)) {
    return null;
  }
  return user;
}

export async function requireAdmin(): Promise<User> {
  const user = await getAdminUser();
  if (!user) {
    redirect("/admin/login");
  }
  return user;
}

export async function rejectIfNotAdmin(): Promise<
  { ok: true; user: User } | { ok: false; error: string }
> {
  const user = await getAdminUser();
  if (!user) {
    return { ok: false, error: "You need to log in first." };
  }
  return { ok: true, user };
}
