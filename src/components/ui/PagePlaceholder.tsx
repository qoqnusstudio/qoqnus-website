type PagePlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

// Temporary scaffold placeholder — replaced with the real designed
// section/page content in the next phase of the project.
export default function PagePlaceholder({
  eyebrow,
  title,
  description,
}: PagePlaceholderProps) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-32 text-center">
      <p className="text-xs tracking-[0.3em] text-gold-500">{eyebrow}</p>
      <h1 className="mt-4 font-serif text-4xl text-ivory sm:text-5xl">
        {title}
      </h1>
      <p className="mt-6 text-sm leading-8 text-ivory/60">{description}</p>
    </section>
  );
}
