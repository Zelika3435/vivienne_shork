"use client";

import { useActionState } from "react";
import { loginAdmin, type LoginState } from "@/app/admin/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: LoginState = { error: null };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAdmin, initialState);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="admin-email" className="text-ink">
          Email
        </Label>
        <Input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          disabled={pending}
          className="min-h-11 rounded-2xl border-wicker bg-kraft px-4 text-base text-ink"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="admin-password" className="text-ink">
          Password
        </Label>
        <Input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={pending}
          className="min-h-11 rounded-2xl border-wicker bg-kraft px-4 text-base text-ink"
        />
      </div>
      {state.error ? (
        <p className="font-sans text-sm font-semibold text-strawberry" role="alert">
          {state.error}
        </p>
      ) : null}
      <Button
        type="submit"
        disabled={pending}
        className="min-h-11 rounded-full bg-sage text-base font-semibold text-cream hover:bg-sage-deep"
      >
        {pending ? "Opening…" : "Log in"}
      </Button>
    </form>
  );
}
