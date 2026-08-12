import type { Metadata } from "next";
import { Vazirmatn, Cormorant_Garamond } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const heading = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "QOQNUS Media Studio | استودیو ققنوس",
  description:
    "استودیو رسانه‌ای QOQNUS — پیوند اندیشه، رسانه و تصویر در افق تمدن اسلامی.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${heading.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-maroon-950 text-ivory">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
