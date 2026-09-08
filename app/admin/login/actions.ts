"use server";

import { redirect } from "next/navigation";
import { isAllowlistedEmail } from "@/lib/admin-email";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type LoginState = {
  error: string | null;
};

export async function loginAdmin(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase isn’t configured yet." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { error: "That email or password isn’t right." };
  }

  if (!isAllowlistedEmail(data.user.email)) {
    await supabase.auth.signOut();
    return { error: "This account isn’t allowed here." };
  }

  redirect("/admin");
}

export async function logoutAdmin(): Promise<void> {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login");
  }

  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
