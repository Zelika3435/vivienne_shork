export function getAdminEmail(): string {
  return (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
}

export function isAllowlistedEmail(email: string | null | undefined): boolean {
  const allowed = getAdminEmail();
  if (!allowed || !email) {
    return false;
  }
  return email.trim().toLowerCase() === allowed;
}
