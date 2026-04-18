
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
        <div className="relative flex min-h-screen flex-col">
          {children}
          <footer className="w-full border-t bg-yellow-50 py-6 mt-12">
            <div className="app-container flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-yellow-900">
              <span>&copy; {new Date().getFullYear()} Quran Web App</span>
              <span className="opacity-70">Made with <span className="text-yellow-600">&#10084;&#65039;</span> for the Ummah</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
