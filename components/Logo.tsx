import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — ${site.descriptor}`}
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src="/brand/logo.png"
        alt={site.name}
        width={3760}
        height={780}
        priority
        className="logo-blend h-8 w-auto sm:h-9"
      />
    </Link>
  );
}
