import Reveal from "@/components/ui/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  align?: "center" | "right";
};

export default function SectionHeading({
  eyebrow,
  title,
  align = "center",
}: SectionHeadingProps) {
  return (
    <Reveal className={align === "center" ? "text-center" : "text-right"}>
      <p className="text-xs tracking-[0.3em] text-gold-500">{eyebrow}</p>
      <h2 className="mt-4 text-3xl text-ivory sm:text-4xl">{title}</h2>
      <div
        className={`mt-5 h-px w-14 bg-gold-500/60 ${align === "center" ? "mx-auto" : ""}`}
      />
    </Reveal>
  );
}
