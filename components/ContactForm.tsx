"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

type Errors = Record<string, string>;

const eventTypeKeys = [
  "corporate",
  "tournament",
  "tradeShow",
  "activation",
  "fundraiser",
  "private",
  "festival",
  "other",
] as const;

const settingKeys = ["indoor", "outdoor", "covered"] as const;

export function ContactForm() {
  const t = useTranslations("form");
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const required = [
      "name",
      "email",
      "phone",
      "eventDate",
      "eventLocation",
      "eventType",
      "setting",
    ];
    for (const field of required) {
      if (!String(data.get(field) ?? "").trim()) {
        next[field] = t("validation.required");
      }
    }
    const email = String(data.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = t("validation.email");
    }
    const phone = String(data.get("phone") ?? "");
    if (phone && phone.replace(/\D/g, "").length < 10) {
      next.phone = t("validation.phone");
    }
    return next;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`);
      first?.focus();
      return;
    }

    const payload = Object.fromEntries(data.entries());
    payload.elapsedMs = String(Date.now() - mountedAt.current);

    setSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      router.push("/thank-you");
    } catch {
      setServerError(t("errorGeneric"));
      setSubmitting(false);
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted focus:border-foreground/40";
  const labelClass = "mb-1.5 block text-sm font-medium";

  function errorFor(name: string) {
    if (!errors[name]) return null;
    return <p className="mt-1 text-sm text-red-400">{errors[name]}</p>;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot: hidden from users, bots tend to fill it. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="name" className={labelClass}>
          {t("name")}
        </label>
        <input id="name" name="name" type="text" autoComplete="name" className={fieldClass} />
        {errorFor("name")}
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          {t("company")} <span className="text-muted">({t("optional")})</span>
        </label>
        <input id="company" name="company" type="text" autoComplete="organization" className={fieldClass} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>
            {t("email")}
          </label>
          <input id="email" name="email" type="email" autoComplete="email" className={fieldClass} />
          {errorFor("email")}
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            {t("phone")}
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
          {errorFor("phone")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="eventDate" className={labelClass}>
            {t("eventDate")}
          </label>
          <input id="eventDate" name="eventDate" type="date" className={fieldClass} />
          {errorFor("eventDate")}
        </div>
        <div>
          <label htmlFor="eventLocation" className={labelClass}>
            {t("eventLocation")}
          </label>
          <input id="eventLocation" name="eventLocation" type="text" className={fieldClass} />
          {errorFor("eventLocation")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="eventType" className={labelClass}>
            {t("eventType")}
          </label>
          <select id="eventType" name="eventType" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              {t("selectPlaceholder")}
            </option>
            {eventTypeKeys.map((k) => (
              <option key={k} value={t(`eventTypeOptions.${k}`)}>
                {t(`eventTypeOptions.${k}`)}
              </option>
            ))}
          </select>
          {errorFor("eventType")}
        </div>
        <div>
          <label htmlFor="setting" className={labelClass}>
            {t("setting")}
          </label>
          <select id="setting" name="setting" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              {t("selectPlaceholder")}
            </option>
            {settingKeys.map((k) => (
              <option key={k} value={t(`settingOptions.${k}`)}>
                {t(`settingOptions.${k}`)}
              </option>
            ))}
          </select>
          {errorFor("setting")}
        </div>
      </div>

      <div>
        <label htmlFor="guestCount" className={labelClass}>
          {t("guestCount")} <span className="text-muted">({t("optional")})</span>
        </label>
        <input id="guestCount" name="guestCount" type="number" min="0" inputMode="numeric" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {t("message")} <span className="text-muted">({t("optional")})</span>
        </label>
        <textarea id="message" name="message" rows={5} className={fieldClass} />
      </div>

      {serverError ? <p className="text-sm text-red-400">{serverError}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent-hover disabled:opacity-60 sm:w-auto"
      >
        {submitting ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
