type Props = {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
};

export function SectionHeading({
  title,
  subtitle,
  centered = false,
  className = "",
}: Props) {
  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      <h2 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-3 text-base text-muted ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
