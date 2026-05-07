"use client";
import type { SurahListItem, QuranVerse } from "@/lib/types";
import { useState, useEffect } from "react";
import SurahListSidebar from "@/components/SurahListSidebar";
import SettingsSidebar from "@/components/SettingsSidebar";
import { getSurahs } from "@/lib/api";

type SurahAyatPageProps = {
  surah: SurahListItem;
  ayat: QuranVerse[];
};


export default function SurahAyatPage({ surah, ayat }: SurahAyatPageProps) {
  const [arabicFont, setArabicFont] = useState("font-arabic-amiri");
  const [arabicFontSize, setArabicFontSize] = useState(2);
  const [translationFontSize, setTranslationFontSize] = useState(1);
  const [surahList, setSurahList] = useState<SurahListItem[]>([]);

  useEffect(() => {
    // Load surah list for sidebar
    getSurahs().then((data) => {
      setSurahList(Array.isArray(data) ? (data as SurahListItem[]) : []);
    });
    // Load settings from localStorage
    if (typeof window !== "undefined") {
      const storedFont = localStorage.getItem("quran_arabic_font");
      const storedArabicSize = localStorage.getItem("quran_arabic_font_size");
      const storedTransSize = localStorage.getItem("quran_translation_font_size");
      Promise.resolve().then(() => {
        if (storedFont) setArabicFont(storedFont);
        if (storedArabicSize) setArabicFontSize(Number(storedArabicSize));
        if (storedTransSize) setTranslationFontSize(Number(storedTransSize));
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("quran_arabic_font", arabicFont);
      localStorage.setItem("quran_arabic_font_size", arabicFontSize.toString());
      localStorage.setItem("quran_translation_font_size", translationFontSize.toString());
    }
  }, [arabicFont, arabicFontSize, translationFontSize]);

  const fontSizeClass = (base: string, size: number) => {
    const map: Record<number, string> = {
      1: base === "arabic" ? "text-xl" : "text-base",
      2: base === "arabic" ? "text-2xl" : "text-lg",
      3: base === "arabic" ? "text-3xl" : "text-xl",
    };
    return map[size] || map[2];
  };

  return (
    <main className="flex min-h-screen bg-neutral-950">
      {/* Left Sidebar: Surah List */}
      <div className="hidden md:block h-full sticky top-0">
        <SurahListSidebar surahs={surahList} currentSurahId={surah.surahNumber} />
      </div>

      {/* Center: Surah Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-yellow-100 border-b px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-yellow-800">{surah.englishName}</h1>
          </div>
        </header>
        <div className="app-container mt-6">
          {/* Ayat List */}
          <div className="space-y-6">
            {ayat.map((ayah: QuranVerse, idx: number) => (
              <div
                key={ayah.id || idx}
                className="p-5 rounded-xl border bg-white shadow-sm flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="flex-1">
                  <div className={`${fontSizeClass("arabic", arabicFontSize)} ${arabicFont} text-right text-gray-900 mb-2`}>
                    {ayah.arabic}
                  </div>
                  <div className={`${fontSizeClass("translation", translationFontSize)} text-gray-700`}>
                    {ayah.translation}
                  </div>
                </div>
                <div className="text-yellow-700 font-semibold">{idx + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar: Settings */}
      <div className="hidden md:block h-full sticky top-0">
        <SettingsSidebar
          arabicFont={arabicFont}
          setArabicFont={setArabicFont}
          arabicFontSize={arabicFontSize}
          setArabicFontSize={setArabicFontSize}
          translationFontSize={translationFontSize}
          setTranslationFontSize={setTranslationFontSize}
        />
      </div>
    </main>
  );
}
