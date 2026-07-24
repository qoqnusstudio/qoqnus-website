# QOQNUS Media Studio — وب‌سایت رسمی

وب‌سایت کامل استودیو ققنوس: فرانت‌اند طراحی‌شده با هویت زرشکی-طلایی برند،
انیمیشن‌های اسکرول، و پنل ادمین کامل (لاگین امن + مدیریت مقالات/پروژه‌ها/
ویدیوها) که مستقیماً روی همان دیتابیسی می‌نویسد که سایت عمومی از آن می‌خواند.

## تکنولوژی‌ها

- **Next.js 16** (App Router, TypeScript, Turbopack, Server Actions)
- **Tailwind CSS v4** (پیکربندی CSS-first، توکن‌های رنگ برند در `globals.css`)
- **Framer Motion** (انیمیشن fade-in هنگام اسکرول روی تمام بخش‌ها)
- **Prisma 7 + SQLite/libSQL** (با درایور آداپتر `@prisma/adapter-libsql`؛ محلی یک
  فایل ساده است، در پروداکشن به Turso وصل می‌شود)
- **jose + bcryptjs** (سشن JWT امضاشده + هش پسورد ادمین)
- **react-markdown** (رندر محتوای مقالات نوشته‌شده در پنل ادمین)

## نصب و راه‌اندازی

```bash
# ۱) نصب پکیج‌ها
npm install

# ۲) ساخت فایل .env از روی نمونه
cp .env.example .env
```

سپس مقادیر `.env` را پر کنید:

```bash
# هش پسورد ادمین را بسازید (پسورد واقعی هرگز به‌صورت متن‌ساده ذخیره نمی‌شود)
npm run hash-password -- "پسورد-دلخواه-شما"
# مقدار خروجی (base64) را دقیقاً همون‌طور که هست در ADMIN_PASSWORD_HASH
# داخل .env قرار دهید — چون هش bcrypt خام شامل کاراکتر $ است و اگر مستقیم
# در .env گذاشته بشه، لودر Next.js اون رو با syntax جایگزینی متغیر اشتباه
# می‌گیره و خراب می‌کنه؛ به همین دلیل base64 شده

# یک secret تصادفی برای امضای کوکی سشن ادمین بسازید
openssl rand -hex 32
# مقدار خروجی را در SESSION_SECRET داخل .env قرار دهید
```

```bash
# ۳) اجرای مایگریشن و ساخت دیتابیس SQLite محلی
npx prisma migrate dev

# ۴) اجرای سرور توسعه
npm run dev
```

سایت روی `http://localhost:3000` و پنل ادمین روی `http://localhost:3000/admin`
بالا می‌آید (با نام‌کاربری/رمزی که در `.env` تنظیم کردید).

### دستورات مفید Prisma

```bash
npx prisma studio       # مشاهده/ویرایش دستی داده‌ها با رابط گرافیکی
npm run db:migrate      # اجرای مایگریشن جدید بعد از تغییر schema.prisma
npm run db:studio       # میان‌بر برای prisma studio
```

## ساختار پوشه‌ها

```
qoqnus-website/
├── .claude/settings.json      # اجازه‌ی npm install/dev/prisma بدون پرسش، ممنوعیت خواندن .env
├── .env.example               # نمونه متغیرهای محیطی
├── prisma/
│   ├── schema.prisma           # مدل‌های Article, Project, Video
│   └── migrations/             # تاریخچه مایگریشن‌ها
├── prisma.config.ts            # پیکربندی اتصال Prisma 7 (DATABASE_URL)
├── scripts/
│   └── hash-password.ts        # تولید bcrypt hash (base64) برای پسورد ادمین
├── public/
│   ├── images/                 # تصاویر پروژه‌ها + عکس بنیان‌گذار (founder.jpg)
│   └── fonts/                  # فونت‌های سفارشی (در صورت نیاز)
├── src/
│   ├── app/
│   │   ├── layout.tsx           # layout ریشه: فونت‌ها، RTL، Header/Footer
│   │   ├── globals.css          # توکن‌های رنگ برند + انیمیشن ذرات هیرو
│   │   ├── page.tsx              # صفحه اصلی (هیرو، درباره، ماموریت، خدمات، ...)
│   │   ├── about/page.tsx        # درباره ما (کامل)
│   │   ├── philosophy/page.tsx   # فلسفه ما (کامل)
│   │   ├── founder/page.tsx      # بنیان‌گذار (کامل)
│   │   ├── contact/page.tsx      # تماس (کامل)
│   │   ├── projects/
│   │   │   ├── page.tsx           # گرید پروژه‌ها (از دیتابیس)
│   │   │   └── [slug]/page.tsx    # جزئیات یک پروژه
│   │   ├── articles/
│   │   │   ├── page.tsx           # فهرست مقالات (از دیتابیس)
│   │   │   └── [slug]/page.tsx    # مطالعه یک مقاله (Markdown)
│   │   ├── videos/page.tsx       # گرید ویدیوها (Embed یوتیوب/آپارات)
│   │   └── admin/
│   │       ├── login/page.tsx     # فرم ورود ادمین
│   │       └── (protected)/       # همه‌ی مسیرهای زیر این گروه محافظت‌شده‌اند
│   │           ├── layout.tsx      # بررسی سشن + ریدایرکت به لاگین
│   │           ├── page.tsx        # داشبورد (تعداد مقالات/پروژه‌ها/ویدیوها)
│   │           ├── articles/       # لیست + فرم ایجاد/ویرایش مقاله
│   │           ├── projects/       # لیست + فرم ایجاد/ویرایش پروژه
│   │           └── videos/         # لیست + فرم ایجاد/ویرایش ویدیو
│   ├── components/
│   │   ├── layout/               # Header (ناوبری) + Footer (لینک‌های واقعی)
│   │   ├── sections/              # Hero, About, Mission, Services, ProjectsPreview, ...
│   │   ├── admin/                 # فرم‌ها و دکمه حذف پنل ادمین
│   │   ├── icons/                 # آیکون‌های SVG دست‌ساز (بدون ایموجی)
│   │   └── ui/                    # Reveal (انیمیشن اسکرول), SectionHeading, ...
│   ├── lib/
│   │   ├── prisma.ts              # نمونه singleton PrismaClient
│   │   ├── auth.ts                # صدور/بررسی سشن JWT + مقایسه پسورد
│   │   ├── actions/                # Server Actionهای auth و CRUD
│   │   ├── validations.ts         # اسکیمای zod برای فرم‌ها
│   │   ├── nav.ts                 # منبع واحد لینک‌های ناوبری
│   │   └── video.ts               # تبدیل لینک یوتیوب/آپارات به Embed URL
│   └── generated/prisma/          # (auto-generated, در گیت نیست)
└── package.json
```

## پنل ادمین

آدرس ورود: `/admin/login` — با `ADMIN_USERNAME` و پسوردی که برایش هش ساختید.
بعد از ورود می‌توانید مقالات (Markdown)، پروژه‌ها (با تصویر/ویدیوی کاور) و
ویدیوها (فقط لینک یوتیوب/آپارات، بدون آپلود فایل) را ایجاد، ویرایش، حذف و
منتشر/پیش‌نویس کنید. هر تغییر بلافاصله (بدون build یا ری‌استارت) روی صفحات
عمومی سایت (`/articles`, `/projects`, `/videos`) قابل مشاهده است — همه از یک
دیتابیس مشترک می‌خوانند و هر Server Action بعد از ذخیره مسیرهای مرتبط را
`revalidatePath` می‌کند.

## نکته درباره‌ی فونت‌ها

`Vazirmatn` برای تمام متن فارسی، و `Cormorant Garamond` فقط برای وردمارک
لاتین `QOQNUS` در هدر استفاده می‌شود (چون این فونت سریف گلیف فارسی ندارد).
انتخاب نهایی فونت سریف وردمارک را می‌توان بعداً با نمونه‌های بیشتر (مثل
Marcellus یا Playfair Display) تغییر داد.

## نکته درباره‌ی عکس بنیان‌گذار

تا زمانی که فایل واقعی در مسیر `public/images/founder.jpg` قرار نگیرد،
به‌جای عکس یک مونوگرام طلایی («ح») نمایش داده می‌شود (نه ایموجی). به‌محض
اضافه‌کردن فایل با همین نام، در بخش بنیان‌گذار صفحه اصلی و صفحه `/founder`
به‌طور خودکار جایگزین می‌شود.

## دیپلوی روی Vercel یا Netlify (با دیتابیس Turso)

فایل SQLite محلی روی هاستینگ سرورلس مثل Vercel پایدار نیست، پس برای
پروداکشن به یک دیتابیس libSQL ابری (Turso) وصل می‌شویم — کد از قبل برای
هر دو حالت (فایل محلی / Turso) از یک آداپتر یکسان استفاده می‌کند، فقط
مقدار `DATABASE_URL` فرق می‌کند.

1. یک اکانت رایگان (بدون کارت اعتباری) در [turso.tech](https://turso.tech)
   بسازید و از داشبورد وب یک دیتابیس جدید ایجاد کنید.
2. از همان داشبورد، **Database URL** (به‌شکل `libsql://...turso.io`) و یک
   **Auth Token** بگیرید.
3. مایگریشن‌ها را روی همان دیتابیس Turso اجرا کنید (موتور migrate خود
   Prisma فقط فایل SQLite محلی را می‌فهمد، نه پروتکل ریموت Turso را — به
   همین دلیل یک اسکریپت کوچک این کار را با کلاینت JS انجام می‌دهد):
   ```bash
   DATABASE_URL="libsql://..." DATABASE_AUTH_TOKEN="..." npm run db:turso:migrate
   ```
4. در [vercel.com/new](https://vercel.com/new) یا
   [app.netlify.com/start](https://app.netlify.com/start) با گیت‌هاب وارد
   شوید و ریپوی `qoqnus-website` را Import کنید (نیازی به نصب چیزی روی
   سیستم نیست؛ هر دو پلتفرم Next.js App Router و Server Actions را کامل
   پشتیبانی می‌کنند).
5. در تنظیمات Environment Variables پروژه، همین متغیرها را ست کنید:
   `DATABASE_URL`, `DATABASE_AUTH_TOKEN` (مقادیر Turso)، و
   `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET` (طبق بخش نصب
   بالا).
6. Deploy بزنید. برای هر Pull Request هم یک لینک Preview جدا خودکار
   ساخته می‌شود.

## نکته امنیتی

یک advisory سطح‌بالا مربوط به نسخه‌های فعلی toolchain (Next.js 16 /
Prisma 7، هر دو به‌تازگی منتشر شده‌اند) در `npm audit` دیده می‌شود که فقط به
ابزارهای build/dev مربوط است، نه به کد اجرایی سایت؛ راه‌حل npm (`--force`)
باعث دان‌گرید شکننده‌ی Next.js می‌شود و اعمال نشد. با هر پچ جدید این پکیج‌ها
دوباره بررسی می‌شود.
