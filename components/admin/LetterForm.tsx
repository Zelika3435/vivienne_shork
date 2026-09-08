"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import {
  createLetterAction,
  updateLetterAction,
  type LetterActionState,
} from "@/app/admin/actions";
import { DeleteLetterButton } from "@/components/admin/DeleteLetterButton";
import { LetterSheet } from "@/components/reader/LetterSheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  letterFormSchema,
  slugifyLabel,
  type LetterFormValues,
} from "@/lib/letter-form";

const fieldClass =
  "min-h-11 rounded-2xl border-wicker bg-kraft px-4 text-base text-ink";

type LetterFormProps =
  | {
      mode: "create";
      defaultSortOrder: number;
    }
  | {
      mode: "edit";
      id: string;
      slug: string;
      defaults: LetterFormValues;
    };

export function LetterForm(props: LetterFormProps) {
  const isEdit = props.mode === "edit";
  const [state, setState] = useState<LetterActionState>({ error: null });
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const slugTouched = useRef(isEdit);

  const form = useForm<LetterFormValues>({
    resolver: zodResolver(letterFormSchema),
    defaultValues: isEdit
      ? props.defaults
      : {
          label: "",
          slug: "",
          body: "",
          published: false,
          sort_order: props.defaultSortOrder,
          written_at: "",
        },
  });

  const label = form.watch("label");
  const slug = form.watch("slug");
  const body = form.watch("body");
  const writtenAt = form.watch("written_at");
  const originalSlug = isEdit ? props.slug : "";

  useEffect(() => {
    if (slugTouched.current) {
      return;
    }
    form.setValue("slug", slugifyLabel(label), { shouldValidate: false });
  }, [form, label]);

  function onValid(values: LetterFormValues) {
    const data = new FormData();
    data.set("label", values.label);
    data.set("slug", values.slug);
    data.set("body", values.body);
    data.set("sort_order", String(values.sort_order));
    data.set("written_at", values.written_at ?? "");
    if (values.published) {
      data.set("published", "on");
    }

    startTransition(async () => {
      const result = isEdit
        ? await updateLetterAction(props.id, { error: null }, data)
        : await createLetterAction({ error: null }, data);
      setState(result);
      if (!result.error) {
        router.push("/admin");
        router.refresh();
      }
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <form
        onSubmit={form.handleSubmit(onValid)}
        className="flex flex-col gap-5"
        noValidate
      >
        <Field
          id="letter-label"
          label="Label"
          error={form.formState.errors.label?.message}
        >
          <Input
            id="letter-label"
            className={fieldClass}
            disabled={pending}
            {...form.register("label")}
          />
        </Field>

        <Field
          id="letter-slug"
          label="Slug"
          error={form.formState.errors.slug?.message}
        >
          <Input
            id="letter-slug"
            className={fieldClass}
            disabled={pending}
            {...form.register("slug", {
              onChange: () => {
                slugTouched.current = true;
              },
            })}
          />
          {isEdit ? (
            <p className="mt-1.5 font-sans text-sm text-ink-soft">
              {slug !== originalSlug
                ? "Changing the slug changes the public URL."
                : "Changing the slug will change the public URL."}
            </p>
          ) : null}
        </Field>

        <Field
          id="letter-body"
          label="Letter"
          error={form.formState.errors.body?.message}
        >
          <Textarea
            id="letter-body"
            rows={14}
            className="min-h-48 rounded-2xl border-wicker bg-kraft px-4 py-3 text-base text-ink"
            disabled={pending}
            {...form.register("body")}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            id="letter-sort"
            label="Sort order"
            error={form.formState.errors.sort_order?.message}
          >
            <Input
              id="letter-sort"
              type="number"
              className={fieldClass}
              disabled={pending}
              {...form.register("sort_order", { valueAsNumber: true })}
            />
          </Field>
          <Field
            id="letter-written"
            label="Written on"
            error={form.formState.errors.written_at?.message}
          >
            <Input
              id="letter-written"
              type="date"
              className={fieldClass}
              disabled={pending}
              {...form.register("written_at")}
            />
          </Field>
        </div>

        <Controller
          control={form.control}
          name="published"
          render={({ field }) => (
            <div className="flex min-h-11 items-center gap-3">
              <Checkbox
                id="letter-published"
                checked={field.value}
                disabled={pending}
                onCheckedChange={(checked) => field.onChange(checked === true)}
                className="size-5 rounded-md border-wicker"
              />
              <Label htmlFor="letter-published" className="text-base text-ink">
                Published
              </Label>
            </div>
          )}
        />
        {form.formState.errors.published?.message ? (
          <p className="font-sans text-sm font-semibold text-strawberry">
            {form.formState.errors.published.message}
          </p>
        ) : null}

        {state.error ? (
          <p className="font-sans text-sm font-semibold text-strawberry" role="alert">
            {state.error}
          </p>
        ) : null}
        {state.success ? (
          <p className="font-sans text-sm font-semibold text-sage-deep" role="status">
            Saved.
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            type="submit"
            disabled={pending}
            className="min-h-11 rounded-full bg-sage px-5 text-base font-semibold text-cream hover:bg-sage-deep"
          >
            {pending ? "Saving…" : "Save"}
          </Button>
          {isEdit ? <DeleteLetterButton id={props.id} slug={props.slug} /> : null}
        </div>
      </form>

      <section className="flex flex-col gap-3">
        <h2 className="font-sans text-sm font-semibold text-ink-soft">
          Preview
        </h2>
        <LetterSheet
          label={label.trim() || "Read this when…"}
          body={body}
          writtenAt={writtenAt || null}
        />
      </section>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-ink">
        {label}
      </Label>
      {children}
      {error ? (
        <p className="font-sans text-sm font-semibold text-strawberry">{error}</p>
      ) : null}
    </div>
  );
}
