"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  GATE_COOKIE_NAME,
  createGateToken,
  gateCookieOptions,
  getSitePassword,
  isGateEnabled,
  passwordsMatch,
} from "@/lib/gate";

export type UnlockState = {
  error: string | null;
};

export async function unlockPicnic(
  _prev: UnlockState,
  formData: FormData,
): Promise<UnlockState> {
  if (!isGateEnabled()) {
    redirect("/");
  }

  const provided = String(formData.get("password") ?? "");
  const expected = getSitePassword();

  if (!passwordsMatch(provided, expected)) {
    return { error: "That passphrase isn’t right" };
  }

  const jar = await cookies();
  jar.set(GATE_COOKIE_NAME, createGateToken(expected), gateCookieOptions());
  redirect("/");
}
