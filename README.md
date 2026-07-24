# QOQNUS Media Studio — وب‌سایت رسمی

پایه‌ی فنی (Foundation) سایت استودیو ققنوس. این مرحله شامل اسکلت پروژه،
مسیرهای صفحات، و مدل‌های دیتابیس است. طراحی نهایی بخش‌ها (هیرو با ذرات
متحرک، انیمیشن‌های اسکرول، پنل ادمین کامل و ...) در فاز بعدی اضافه می‌شود.

## تکنولوژی‌ها

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** (پیکربندی CSS-first، توکن‌های رنگ برند در `globals.css`)
- **Framer Motion** (برای انیمیشن‌های اسکرول در فاز بعدی)
- **Prisma 7 + SQLite** (با درایور آداپتر `@prisma/adapter-better-sqlite3`)
- **jose + bcryptjs** (برای سشن و هش پسورد ادمین در فاز بعدی)
- **react-markdown** (برای رندر محتوای مقالات)

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
# مقدار خروجی را در ADMIN_PASSWORD_HASH داخل .env قرار دهید

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

سایت روی `http://localhost:3000` بالا می‌آید.

### دستورات مفید Prisma

```bash
npx prisma studio       # مشاهده/ویرایش دستی داده‌ها با رابط گرافیکی
npm run db:migrate      # اجرای مایگریشن جدید بعد از تغییر schema.prisma
npm run db:studio       # میان‌بر برای prisma studio
```

## ساختار پوشه‌ها

```
qoqnus-website/
├── .env.example              # نمونه متغیرهای محیطی
├── prisma/
│   ├── schema.prisma          # مدل‌های Article, Project, Video
│   └── migrations/            # تاریخچه مایگریشن‌ها
├── prisma.config.ts           # پیکربندی اتصال Prisma 7 (DATABASE_URL)
├── scripts/
│   └── hash-password.ts       # تولید bcrypt hash برای پسورد ادمین
├── public/
│   ├── images/                # تصاویر پروژه‌ها/بنیان‌گذار/لوگو
│   └── fonts/                 # فونت‌های سفارشی (در صورت نیاز)
├── src/
│   ├── app/
│   │   ├── layout.tsx          # layout ریشه: فونت‌ها، RTL، Header/Footer
│   │   ├── globals.css         # توکن‌های رنگ برند (زرشکی/طلایی) + Tailwind
│   │   ├── page.tsx             # صفحه اصلی (هیرو)
│   │   ├── about/page.tsx       # درباره ما
│   │   ├── philosophy/page.tsx  # فلسفه ما
│   │   ├── founder/page.tsx     # بنیان‌گذار
│   │   ├── contact/page.tsx     # تماس
│   │   ├── projects/
│   │   │   ├── page.tsx          # گرید پروژه‌ها (از دیتابیس)
│   │   │   └── [slug]/page.tsx   # جزئیات یک پروژه
│   │   ├── articles/
│   │   │   ├── page.tsx          # فهرست مقالات (از دیتابیس)
│   │   │   └── [slug]/page.tsx   # مطالعه یک مقاله (Markdown)
│   │   ├── videos/page.tsx      # گرید ویدیوها (Embed یوتیوب/آپارات)
│   │   └── admin/
│   │       ├── page.tsx          # داشبورد (placeholder — فاز بعدی)
│   │       └── login/page.tsx    # ورود ادمین (placeholder — فاز بعدی)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx        # هدر + ناوبری موبایل
│   │   │   └── Footer.tsx        # فوتر با لینک‌های واقعی
│   │   └── ui/
│   │       └── PagePlaceholder.tsx
│   ├── lib/
│   │   ├── prisma.ts             # نمونه singleton PrismaClient
│   │   ├── nav.ts                # منبع واحد لینک‌های ناوبری
│   │   └── video.ts              # تبدیل لینک یوتیوب/آپارات به Embed URL
│   └── generated/prisma/         # (auto-generated, در گیت نیست)
└── package.json
```

### آنچه در فاز بعدی ساخته می‌شود (پس از تایید این پایه)

- طراحی نهایی و کامل هر بخش هیرو/درباره/ماموریت/حوزه فعالیت/فلسفه/بنیان‌گذار
  با تایپوگرافی برند، افکت ذرات، و انیمیشن‌های اسکرول (Framer Motion)
- سیستم لاگین امن ادمین (بررسی `ADMIN_USERNAME` / `ADMIN_PASSWORD_HASH` و
  صدور کوکی سشن امضاشده با `jose`) + محافظت مسیرهای `/admin/*`
- فرم‌ها و جدول‌های مدیریت مقالات، پروژه‌ها و ویدیوها در پنل ادمین
  (Route Handlers زیر `src/app/api/admin/*`)
- پلیر ویدیوی حرفه‌ای برای Embed یوتیوب/آپارات (تابع `getEmbedUrl` در
  `src/lib/video.ts` از هم‌اکنون آماده است)
- آیکون‌های SVG یکدست برای بخش «حوزه فعالیت»
- دارایی‌های واقعی برند (لوگوی نهایی سیمرغ، عکس بنیان‌گذار) در `public/images`

## نکته درباره‌ی فونت‌ها

طبق گایدلاین، فعلاً `Vazirmatn` برای متن فارسی و `Cormorant Garamond` به‌عنوان
پیشنهاد اولیه برای سریف وردمارک لاتین `QOQNUS` تنظیم شده‌اند (در
`src/app/layout.tsx`). انتخاب نهایی فونت سریف وردمارک را می‌توان در فاز بعدی
با نمونه‌های بیشتر (مثل Marcellus یا Playfair Display) تایید یا تغییر داد.

## نکته امنیتی

یک advisory سطح‌بالا مربوط به نسخه‌های فعلی toolchain (Next.js 16 /
Prisma 7، هر دو به‌تازگی منتشر شده‌اند) در `npm audit` دیده می‌شود که فقط به
ابزارهای build/dev مربوط است، نه به کد اجرایی سایت؛ راه‌حل npm (`--force`)
باعث دان‌گرید شکننده‌ی Next.js می‌شود و اعمال نشد. با هر پچ جدید این پکیج‌ها
دوباره بررسی می‌شود.
