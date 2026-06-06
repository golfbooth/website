import type { ReactNode } from "react";

// A root layout is required even though the real <html>/<body> live in
// app/[locale]/layout.tsx. This passes children through.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
