type SetupNoticeProps = {
  error: string;
};

const PIN_SQL = `alter table public.letters
  add column if not exists pinned boolean not null default false;

notify pgrst, 'reload schema';`;

export function SetupNotice({ error }: SetupNoticeProps) {
  const needsPinColumn = error.toLowerCase().includes("pinned");

  return (
    <section className="rounded-2xl border border-wicker bg-paper px-4 py-5">
      <p className="font-sans text-sm font-semibold text-ink">{error}</p>
      {needsPinColumn ? (
        <pre className="mt-3 overflow-x-auto rounded-2xl border border-wicker bg-kraft px-4 py-3 font-sans text-sm text-ink">
          {PIN_SQL}
        </pre>
      ) : null}
      <ol className="mt-3 list-decimal space-y-1 pl-5 font-sans text-sm text-ink-soft">
        <li>Open the same Supabase project as your URL in .env</li>
        <li>SQL Editor → New query</li>
        <li>
          {needsPinColumn
            ? "Paste the SQL above and Run"
            : "Paste the contents of supabase/setup.sql and Run"}
        </li>
        <li>Table Editor should show public.letters</li>
        <li>Reload this page</li>
      </ol>
    </section>
  );
}
