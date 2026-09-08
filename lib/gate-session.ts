import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  GATE_COOKIE_NAME,
  gateTokensMatch,
  getSitePassword,
  isGateEnabled,
} from "@/lib/gate";

export async function hasValidGateCookie(): Promise<boolean> {
  if (!isGateEnabled()) {
    return true;
  }

  const jar = await cookies();
  return gateTokensMatch(jar.get(GATE_COOKIE_NAME)?.value, getSitePassword());
}

export async function requireReaderAccess(): Promise<void> {
  if (await hasValidGateCookie()) {
    return;
  }

  redirect("/enter");
}
