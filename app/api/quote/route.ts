import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

type Payload = Record<string, string>;

const FIELDS = [
  "name",
  "company",
  "email",
  "phone",
  "eventDate",
  "eventLocation",
  "eventType",
  "guestCount",
  "setting",
  "message",
] as const;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Spam: honeypot must be empty, and the form must take a human a moment.
  if (body.company_website) {
    return NextResponse.json({ ok: true });
  }
  const elapsed = Number(body.elapsedMs ?? 0);
  if (elapsed > 0 && elapsed < 1500) {
    return NextResponse.json({ ok: true });
  }

  const required = ["name", "email", "phone", "eventDate", "eventLocation", "eventType", "setting"];
  for (const field of required) {
    if (!String(body[field] ?? "").trim()) {
      return NextResponse.json({ error: `Missing field: ${field}` }, { status: 422 });
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email))) {
    return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  }

  const rows = FIELDS.filter((f) => body[f])
    .map(
      (f) =>
        `<tr><td style="padding:6px 12px;font-weight:600;text-transform:capitalize">${f}</td><td style="padding:6px 12px">${escapeHtml(String(body[f]))}</td></tr>`,
    )
    .join("");

  const adminHtml = `
    <h2>New quote request — ${site.name}</h2>
    <table style="border-collapse:collapse">${rows}</table>
  `;

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.QUOTE_FROM_EMAIL ?? `${site.name} <info@${site.domain}>`;

  if (!apiKey) {
    // No email provider configured yet — log so nothing is lost in dev.
    console.warn("[quote] RESEND_API_KEY not set. Submission:", body);
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: fromEmail,
      to: site.email,
      replyTo: String(body.email),
      subject: `New quote request — ${body.name}`,
      html: adminHtml,
    });

    await resend.emails.send({
      from: fromEmail,
      to: String(body.email),
      subject: `We received your request — ${site.name}`,
      html: `
        <p>Hi ${escapeHtml(String(body.name))},</p>
        <p>Thanks for reaching out to ${site.name}! We received your event details and will get back to you with a custom quote, usually within one business day.</p>
        <p>If it's urgent, call us at ${site.phone}.</p>
        <p>— ${site.name}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[quote] Email send failed:", error);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }
}
