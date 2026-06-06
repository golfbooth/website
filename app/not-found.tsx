import Link from "next/link";
import { inter, oswald } from "@/lib/fonts";
import "./globals.css";

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="mx-auto max-w-xl px-6 text-center">
          <p className="font-display text-6xl font-bold text-accent">404</p>
          <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight">
            Page not found
          </h1>
          <p className="mt-4 text-muted">
            The page you&apos;re looking for doesn&apos;t exist or has moved.
          </p>
          <Link
            href="/en"
            className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white"
          >
            Back to Home
          </Link>
        </div>
      </body>
    </html>
  );
}
