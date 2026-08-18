import { redirect } from "next/navigation";
import { getForumSession } from "@/lib/forum-auth";
import NewTopicForm from "@/components/forum/NewTopicForm";

export default async function NewTopicPage() {
  const session = await getForumSession();
  if (!session) {
    redirect("/forum/login");
  }

  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl text-ivory">موضوع جدید</h1>
        <NewTopicForm />
      </div>
    </section>
  );
}
