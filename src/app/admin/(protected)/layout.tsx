import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logout } from "@/lib/actions/auth";

const adminLinks = [
  { href: "/admin", label: "داشبورد" },
  { href: "/admin/articles", label: "مقالات" },
  { href: "/admin/projects", label: "پروژه‌ها" },
  { href: "/admin/videos", label: "ویدیوها" },
];

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl flex-col gap-8 px-6 py-10 lg:flex-row">
      <aside className="flex shrink-0 flex-col gap-2 lg:w-48">
        <nav className="flex gap-2 overflow-x-auto lg:flex-col">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-ivory/80 transition-colors hover:bg-gold-500/10 hover:text-gold-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <form action={logout} className="mt-4">
          <button
            type="submit"
            className="w-full rounded-md border border-gold-500/20 px-3 py-2 text-sm text-ivory/70 transition-colors hover:border-gold-500/40 hover:text-gold-500"
          >
            خروج
          </button>
        </form>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
