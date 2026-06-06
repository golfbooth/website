import { useTranslations } from "next-intl";

export function TrustBar() {
  const t = useTranslations("trust");
  const items = t.raw("items") as string[];

  return (
    <section className="border-b border-border bg-surface">
      <div className="container-page grid grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
        {items.map((item) => (
          <div
            key={item}
            className="px-4 py-6 text-center text-sm font-semibold uppercase tracking-wide text-muted"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
