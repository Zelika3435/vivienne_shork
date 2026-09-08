import { NextRequest } from "next/server";
import { isAllowlistedEmail } from "@/lib/admin-email";
import {
  GATE_COOKIE_NAME,
  gateTokensMatch,
  getSitePassword,
  isGateEnabled,
  isReaderPath,
} from "@/lib/gate";
import {
  redirectWithSession,
  updateSession,
} from "@/lib/supabase/update-session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { response, user } = await updateSession(request);
  const allowlisted = isAllowlistedEmail(user?.email);

  if (pathname.startsWith("/admin")) {
    const isLogin = pathname === "/admin/login";

    if (isLogin && allowlisted) {
      return redirectWithSession(new URL("/admin", request.url), response);
    }

    if (!isLogin && !allowlisted) {
      return redirectWithSession(new URL("/admin/login", request.url), response);
    }

    return response;
  }

  if (isGateEnabled() && isReaderPath(pathname)) {
    const token = request.cookies.get(GATE_COOKIE_NAME)?.value;
    if (!gateTokensMatch(token, getSitePassword())) {
      return redirectWithSession(new URL("/enter", request.url), response);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/|favicon\\.ico|robots\\.txt|.*\\.).*)",
  ],
};
