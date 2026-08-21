import fs from "node:fs";
import path from "node:path";

const PHOTO_RELATIVE_PATH = "/images/founder.jpg";

function hasFounderPhoto(): boolean {
  const absolutePath = path.join(process.cwd(), "public", PHOTO_RELATIVE_PATH);
  return fs.existsSync(absolutePath);
}

export default function FounderPortrait({ size = 160 }: { size?: number }) {
  const hasPhoto = hasFounderPhoto();

  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full border-4 border-gold-500/25 bg-gradient-to-br from-gold-500/20 to-maroon-800 shadow-[inset_0_0_0_1px_rgba(212,175,55,0.15)]"
      style={{ width: size, height: size }}
    >
      {hasPhoto ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PHOTO_RELATIVE_PATH}
            alt="حیدر صادقیان"
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_36px_14px_rgba(72,18,29,0.85)]" />
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-gold-500" style={{ fontSize: size * 0.4 }}>
            ح
          </span>
        </div>
      )}
    </div>
  );
}
