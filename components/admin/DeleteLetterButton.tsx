"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteLetterAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { isOriginalCatalogSlug } from "@/lib/catalog";

type DeleteLetterButtonProps = {
  id: string;
  slug: string;
};

export function DeleteLetterButton({ id, slug }: DeleteLetterButtonProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const original = isOriginalCatalogSlug(slug);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="destructive"
            className="min-h-11 rounded-full px-4 text-base"
          />
        }
      >
        Delete this letter
      </DialogTrigger>
      <DialogContent className="rounded-2xl border border-wicker bg-paper text-ink sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-sans text-lg text-ink">
            Delete this letter?
          </DialogTitle>
          <DialogDescription className="font-sans text-sm text-ink-soft">
            {original
              ? "This is one of the original fifteen. Prefer unpublishing so the prompt can stay. Delete only if you mean it."
              : "This cannot be undone. Prefer unpublishing if you might want it later."}
          </DialogDescription>
        </DialogHeader>
        {error ? (
          <p className="font-sans text-sm font-semibold text-strawberry" role="alert">
            {error}
          </p>
        ) : null}
        <DialogFooter className="border-wicker bg-cream/80">
          <Button
            type="button"
            variant="outline"
            className="min-h-11 rounded-full border-wicker bg-paper text-ink"
            onClick={() => setOpen(false)}
            disabled={pending}
          >
            Keep it
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="min-h-11 rounded-full bg-strawberry/15 px-4 text-strawberry hover:bg-strawberry/25"
            disabled={pending}
            onClick={() => {
              setError(null);
              startTransition(async () => {
                const result = await deleteLetterAction(id);
                if (result?.error) {
                  setError(result.error);
                  return;
                }
                router.push("/admin");
              });
            }}
          >
            {pending ? "Deleting…" : "Delete this letter"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
