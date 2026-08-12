import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Reveal from "@/components/ui/Reveal";
import { getEmbedUrlFromAnyUrl } from "@/lib/video";

type CustomSectionProps = {
  section: {
    title: string;
    content: string;
    coverImage: string | null;
    embedUrl: string | null;
  };
  showTitle?: boolean;
};

// Renders one admin-authored Section block. Used both to interleave
// optional sections between a page's fixed components, and as the
// full body of a standalone /[slug] section page (where the page
// itself renders the <h1> and passes showTitle={false}).
export default function CustomSection({
  section,
  showTitle = true,
}: CustomSectionProps) {
  const embedUrl = section.embedUrl
    ? getEmbedUrlFromAnyUrl(section.embedUrl)
    : null;

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        {section.coverImage && (
          <Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={section.coverImage}
              alt={section.title}
              className="mb-10 h-72 w-full rounded-lg object-cover"
            />
          </Reveal>
        )}
        <Reveal delay={0.1}>
          {showTitle && (
            <h2 className="text-center text-3xl text-ivory sm:text-4xl">
              {section.title}
            </h2>
          )}
          {embedUrl && (
            <div className="mt-8 aspect-video overflow-hidden rounded-lg border border-gold-500/10">
              <iframe
                src={embedUrl}
                title={section.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
          <div className="prose prose-invert mx-auto mt-8 max-w-none leading-8 text-ivory/80 prose-headings:text-ivory prose-a:text-gold-500 prose-strong:text-ivory">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {section.content}
            </ReactMarkdown>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
