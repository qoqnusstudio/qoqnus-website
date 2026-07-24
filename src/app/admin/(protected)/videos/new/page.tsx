import VideoForm from "@/components/admin/VideoForm";
import { createVideo } from "@/lib/actions/videos";

export default function NewVideoPage() {
  return (
    <div>
      <h1 className="mb-8 text-3xl text-ivory">ویدیوی جدید</h1>
      <VideoForm action={createVideo} submitLabel="ایجاد ویدیو" />
    </div>
  );
}
