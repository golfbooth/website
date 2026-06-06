type Section = { heading: string; paragraphs: string[] };

export function SEOContentSection({ sections }: { sections: Section[] }) {
  return (
    <section className="container-page py-14 sm:py-20">
      <div className="mx-auto max-w-3xl space-y-12">
        {sections.map((section) => (
          <div key={section.heading}>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
              {section.heading}
            </h2>
            <div className="mt-4 space-y-4">
              {section.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
