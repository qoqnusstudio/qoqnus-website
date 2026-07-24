import PagePlaceholder from "@/components/ui/PagePlaceholder";

// Real login form + session cookie issuance (checked against
// ADMIN_USERNAME / ADMIN_PASSWORD_HASH) lands in the next phase.
export default function AdminLoginPage() {
  return (
    <PagePlaceholder
      eyebrow="پنل ادمین"
      title="ورود مدیر"
      description="فرم ورود امن ادمین در فاز بعدی این‌جا تکمیل می‌شود."
    />
  );
}
