import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const GATE_COOKIE_NAME = "picnic_gate";
export const GATE_MAX_AGE_SECONDS = 60 * 60 * 24 * 60;

const GATE_MAC_MESSAGE = "vivienne-shork-unlocked";

export function getSitePassword(): string {
  return process.env.SITE_PASSWORD ?? "";
}

export function isGateEnabled(): boolean {
  return getSitePassword().length > 0;
}

export function createGateToken(password: string): string {
  return createHmac("sha256", password).update(GATE_MAC_MESSAGE).digest("hex");
}

export function gateCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: GATE_MAX_AGE_SECONDS,
  };
}

export function passwordsMatch(provided: string, expected: string): boolean {
  return timingSafeEqualDigest(provided, expected);
}

export function gateTokensMatch(
  cookieValue: string | undefined,
  password: string,
): boolean {
  if (!cookieValue) {
    timingSafeEqualDigest("", createGateToken(password));
    return false;
  }

  return timingSafeEqualDigest(cookieValue, createGateToken(password));
}

function timingSafeEqualDigest(a: string, b: string): boolean {
  const digestA = createHash("sha256").update(a).digest();
  const digestB = createHash("sha256").update(b).digest();
  return timingSafeEqual(digestA, digestB);
}

export function isReaderPath(pathname: string): boolean {
  return pathname === "/" || pathname === "/letters" || pathname.startsWith("/letters/");
}
