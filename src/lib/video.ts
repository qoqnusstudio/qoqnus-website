export type VideoPlatform = "YOUTUBE" | "APARAT";

// Turns a stored YouTube/Aparat URL into a clean, privacy-friendly,
// minimal-branding embed URL for the front-end player.
export function getEmbedUrl(
  platform: VideoPlatform,
  url: string,
): string | null {
  try {
    if (platform === "YOUTUBE") {
      const id = extractYouTubeId(url);
      if (!id) return null;
      const params = new URLSearchParams({
        rel: "0",
        modestbranding: "1",
        color: "white",
      });
      return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
    }

    if (platform === "APARAT") {
      const id = extractAparatId(url);
      if (!id) return null;
      return `https://www.aparat.com/video/video/embed/videohash/${id}/vt/frame`;
    }
  } catch {
    return null;
  }

  return null;
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
    /(?:youtube\.com\/shorts\/)([\w-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function extractAparatId(url: string): string | null {
  const match = url.match(
    /aparat\.com\/(?:v\/|video\/video\/videohash\/)?([\w-]+)/,
  );
  return match ? match[1] : null;
}
