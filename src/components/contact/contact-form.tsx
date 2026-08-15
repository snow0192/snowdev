"use client";

import { useCallback, useState, type FormEvent } from "react";
import { Check, Loader2, Send } from "lucide-react";

import { useLanguage } from "@/i18n";

interface FormState {
  name: string;
  email: string;
  type: string;
  budget: string;
  message: string;
  website: string;
}

const INITIAL: FormState = {
  name: "",
  email: "",
  type: "project",
  budget: "",
  message: "",
  website: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const { dict } = useLanguage();
  const [values, setValues] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<"name" | "email" | "message", string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = useCallback(
    (key: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setValues((previous) => ({ ...previous, [key]: event.target.value }));
      if (key === "name" || key === "email" || key === "message") {
        setErrors((previous) => ({ ...previous, [key]: undefined }));
      }
    },
    [],
  );

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (values.website) return;

    const nextErrors: typeof errors = {};
    if (!values.name.trim()) nextErrors.name = dict.contact.required;
    if (!values.email.trim()) nextErrors.email = dict.contact.required;
    else if (!EMAIL_RE.test(values.email.trim())) nextErrors.email = dict.contact.invalidEmail;
    if (!values.message.trim()) nextErrors.message = dict.contact.required;
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          type: values.type,
          budget: values.budget || undefined,
          message: values.message.trim(),
          website: values.website,
        }),
      });
      if (!response.ok) throw new Error("request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div
        className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-line)] bg-surface p-10 text-center"
        role="status"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-line-strong)] bg-white text-black">
          <Check size={20} strokeWidth={2.5} />
        </span>
        <h3 className="mt-6 font-display text-2xl font-medium text-white">
          {dict.contact.successTitle}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          {dict.contact.successText}
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(INITIAL);
            setStatus("idle");
          }}
          className="mt-8 rounded-[var(--radius-xs)] border border-[var(--color-line)] px-5 py-2.5 font-mono text-xs tracking-wide text-white uppercase transition-colors duration-300 hover:border-[var(--color-line-strong)] hover:bg-white/[0.04]"
        >
          {dict.contact.again}
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full border-b border-[var(--color-line)] bg-transparent py-3 text-sm text-white placeholder:text-faint transition-colors duration-300 focus:border-white focus:outline-none";
  const labelClass =
    "mb-1 block font-mono text-[10px] tracking-[0.2em] text-faint uppercase";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex h-full flex-col gap-6 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-surface p-7 sm:p-9"
    >
      <div
        aria-hidden="true"
        className="absolute top-[-9999px] left-[-9999px]"
      >
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={set("website")}
          />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            {dict.contact.name}
          </label>
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={set("name")}
            placeholder={dict.contact.namePlaceholder}
            aria-invalid={Boolean(errors.name)}
            className={inputClass}
          />
          {errors.name && (
            <p className="mt-1.5 font-mono text-[10px] text-red-400">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="cf-email" className={labelClass}>
            {dict.contact.email}
          </label>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={set("email")}
            placeholder={dict.contact.emailPlaceholder}
            aria-invalid={Boolean(errors.email)}
            className={inputClass}
          />
          {errors.email && (
            <p className="mt-1.5 font-mono text-[10px] text-red-400">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-type" className={labelClass}>
            {dict.contact.type}
          </label>
          <select
            id="cf-type"
            value={values.type}
            onChange={set("type")}
            className={`${inputClass} appearance-none`}
          >
            {(Object.keys(dict.contact.typeOptions) as Array<keyof typeof dict.contact.typeOptions>).map(
              (key) => (
                <option key={key} value={key} className="bg-surface text-white">
                  {dict.contact.typeOptions[key]}
                </option>
              ),
            )}
          </select>
        </div>

        <div>
          <label htmlFor="cf-budget" className={labelClass}>
            {dict.contact.budget}
          </label>
          <select
            id="cf-budget"
            value={values.budget}
            onChange={set("budget")}
            className={`${inputClass} appearance-none`}
          >
            {(Object.keys(dict.contact.budgetOptions) as Array<keyof typeof dict.contact.budgetOptions>).map(
              (key) => (
                <option key={key} value={key} className="bg-surface text-white">
                  {dict.contact.budgetOptions[key]}
                </option>
              ),
            )}
          </select>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <label htmlFor="cf-message" className={labelClass}>
          {dict.contact.message}
        </label>
        <textarea
          id="cf-message"
          rows={5}
          value={values.message}
          onChange={set("message")}
          placeholder={dict.contact.messagePlaceholder}
          aria-invalid={Boolean(errors.message)}
          className={`${inputClass} resize-none`}
        />
        {errors.message && (
          <p className="mt-1.5 font-mono text-[10px] text-red-400">{errors.message}</p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="font-mono text-xs text-red-400">
          {dict.contact.sendError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex items-center justify-center gap-2 rounded-[var(--radius-xs)] bg-white px-6 py-3.5 text-sm font-medium text-black transition-all duration-300 ease-[var(--ease-out-expo)] hover:gap-3 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            {dict.contact.sending}
          </>
        ) : (
          <>
            {dict.contact.submit}
            <Send
              size={15}
              className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </>
        )}
      </button>
    </form>
  );
}