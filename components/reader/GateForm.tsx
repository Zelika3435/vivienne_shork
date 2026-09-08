"use client";

import { useActionState } from "react";
import { unlockPicnic, type UnlockState } from "@/app/enter/actions";

const initialState: UnlockState = { error: null };

export function GateForm() {
  const [state, formAction, pending] = useActionState(unlockPicnic, initialState);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-3">
      <label className="sr-only" htmlFor="passphrase">
        Passphrase
      </label>
      <input
        id="passphrase"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        disabled={pending}
        className="min-h-11 w-full rounded-2xl border border-wicker bg-kraft px-4 font-sans text-base text-ink placeholder:text-ink-soft disabled:opacity-70"
        placeholder="Passphrase"
      />
      {state.error ? (
        <p className="font-sans text-sm font-semibold text-strawberry" role="alert">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-sage px-5 font-sans text-base font-semibold text-cream transition-colors duration-150 hover:bg-sage-deep disabled:opacity-70"
      >
        Come in
      </button>
    </form>
  );
}
