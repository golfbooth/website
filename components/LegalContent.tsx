type Section = { heading: string; paragraphs: string[] };

type Props = {
  title: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
  sections: Section[];
};

export function LegalContent({ title, lastUpdatedLabel, lastUpdated, sections }: Props) {
  return (
    <article className="container-page py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-muted">
          {lastUpdatedLabel}: {lastUpdated}
        </p>
        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-xl font-semibold uppercase tracking-tight">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
