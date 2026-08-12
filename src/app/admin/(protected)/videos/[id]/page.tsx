import { notFound } from "next/navigation";
import VideoForm from "@/components/admin/VideoForm";
import { updateVideo } from "@/lib/actions/videos";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditVideoPage({ params }: Props) {
  const { id } = await params;
  const video = await prisma.video.findUnique({ where: { id } });

  if (!video) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl text-ivory">ویرایش ویدیو</h1>
      <VideoForm
        action={updateVideo.bind(null, video.id)}
        defaultValues={video}
        submitLabel="ذخیره تغییرات"
      />
    </div>
  );
}
