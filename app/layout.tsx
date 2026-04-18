
import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import "./globals.css";

import { Noto_Naskh_Arabic, Amiri } from "next/font/google";

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-naskh",
  weight: ["400", "500", "600", "700"],
});
const amiri = Amiri({
  subsets: ["arabic"],
  variable: "--font-amiri",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full scroll-smooth antialiased ${notoNaskhArabic.variable} ${amiri.variable}`}>
      <body className="min-h-full bg-white text-neutral-900">
        <div className="relative flex min-h-screen flex-col">{children}</div>
      </body>
    </html>
  );
}
