"use client";

export default function DeleteButton({
  action,
  confirmMessage = "حذف شود؟",
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="text-sm text-red-400 transition-colors hover:text-red-300"
      >
        حذف
      </button>
    </form>
  );
}
