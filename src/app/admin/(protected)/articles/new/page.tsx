import ArticleForm from "@/components/admin/ArticleForm";
import { createArticle } from "@/lib/actions/articles";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="mb-8 text-3xl text-ivory">مقاله جدید</h1>
      <ArticleForm action={createArticle} submitLabel="ایجاد مقاله" />
    </div>
  );
}
