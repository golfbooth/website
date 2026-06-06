import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  secondary:
    "border border-border bg-transparent text-foreground hover:border-foreground hover:bg-surface",
};

type LinkButtonProps = {
  variant?: Variant;
  href: ComponentProps<typeof Link>["href"];
  className?: string;
  children: React.ReactNode;
};

export function CTAButton({
  variant = "primary",
  href,
  className = "",
  children,
}: LinkButtonProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

type AnchorButtonProps = {
  variant?: Variant;
  href: string;
  className?: string;
  children: React.ReactNode;
};

export function AnchorButton({
  variant = "secondary",
  href,
  className = "",
  children,
}: AnchorButtonProps) {
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </a>
  );
}
