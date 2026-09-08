type SetupNoticeProps = {
  error: string;
};

export function SetupNotice({ error }: SetupNoticeProps) {
  return (
    <section className="rounded-2xl border border-wicker bg-paper px-4 py-5">
      <p className="font-sans text-sm font-semibold text-ink">{error}</p>
      <ol className="mt-3 list-decimal space-y-1 pl-5 font-sans text-sm text-ink-soft">
        <li>Open the same Supabase project as your URL in .env</li>
        <li>SQL Editor → New query</li>
        <li>Paste the contents of supabase/setup.sql and Run</li>
        <li>Table Editor should show public.letters</li>
        <li>Reload this page</li>
      </ol>
    </section>
  );
}
