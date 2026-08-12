import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteVideo } from "@/lib/actions/videos";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminVideosPage() {
  const videos = await prisma.video.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-ivory">ویدیوها</h1>
        <Link
          href="/admin/videos/new"
          className="rounded-md bg-gold-500 px-4 py-2 text-sm font-medium text-maroon-950 hover:opacity-90"
        >
          ویدیوی جدید
        </Link>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {videos.length === 0 && (
          <p className="text-sm text-ivory/60">هنوز ویدیویی ثبت نشده است.</p>
        )}
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex items-center justify-between rounded-lg border border-gold-500/10 bg-black/30 p-4"
          >
            <div>
              <p className="text-ivory">{video.title}</p>
              <p className="mt-1 text-xs text-ivory/50">
                {video.published ? "منتشرشده" : "پیش‌نویس"} ·{""}
                {video.platform === "YOUTUBE" ? "یوتیوب" : "آپارات"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/videos/${video.id}`}
                className="text-sm text-gold-500 hover:opacity-80"
              >
                ویرایش
              </Link>
              <DeleteButton
                action={deleteVideo.bind(null, video.id)}
                confirmMessage="این ویدیو حذف شود؟"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
