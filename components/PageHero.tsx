type Props = {
  title: string;
  subtitle?: string;
};

export function PageHero({ title, subtitle }: Props) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="container-page py-14 sm:py-20">
        <h1 className="max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-lg text-muted">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}
