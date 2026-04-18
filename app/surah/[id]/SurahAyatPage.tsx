
"use client";


import type { SurahListItem, QuranVerse } from "@/lib/types";
import Link from "next/link";
import { useState, useEffect } from "react";

type SurahAyatPageProps = {
  surah: SurahListItem;
  ayat: QuranVerse[];
};


export default function SurahAyatPage({ surah, ayat }: SurahAyatPageProps) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [arabicFont, setArabicFont] = useState("font-arabic-amiri");
  const [arabicFontSize, setArabicFontSize] = useState(2);
  const [translationFontSize, setTranslationFontSize] = useState(1);

  // On mount, load settings from localStorage (client only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFont = localStorage.getItem("quran_arabic_font");
      const storedArabicSize = localStorage.getItem("quran_arabic_font_size");
      const storedTransSize = localStorage.getItem("quran_translation_font_size");
      // Batch all setState calls in a single microtask to avoid cascading renders
      Promise.resolve().then(() => {
        if (storedFont) setArabicFont(storedFont);
        if (storedArabicSize) setArabicFontSize(Number(storedArabicSize));
        if (storedTransSize) setTranslationFontSize(Number(storedTransSize));
      });
    }
  }, []);

  // Persist settings
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("quran_arabic_font", arabicFont);
      localStorage.setItem("quran_arabic_font_size", arabicFontSize.toString());
      localStorage.setItem("quran_translation_font_size", translationFontSize.toString());
    }
  }, [arabicFont, arabicFontSize, translationFontSize]);

  // Font options
  const arabicFontOptions = [
    { label: "Amiri", value: "font-arabic-amiri" },
    { label: "Scheherazade", value: "font-arabic-scheherazade" },
  ];

  // Font size classes
  const fontSizeClass = (base: string, size: number) => {
    const map: Record<number, string> = {
      1: base === "arabic" ? "text-xl" : "text-base",
      2: base === "arabic" ? "text-2xl" : "text-lg",
      3: base === "arabic" ? "text-3xl" : "text-xl",
    };
    return map[size] || map[2];
  };

  return (
    <main className="flex flex-col min-h-screen">
      {/* Surah Header */}
      <header className="bg-yellow-100 border-b px-4 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-yellow-800">{surah.englishName}</h1>
        </div>
        <button
          className="px-4 py-2 rounded-lg border border-yellow-400 bg-yellow-50 text-yellow-700 hover:bg-yellow-200"
          onClick={() => setShowSidebar((v) => !v)}
        >
          Settings
        </button>
      </header>

      {/* Settings Sidebar */}
      {showSidebar && (
        <aside className="fixed top-0 right-0 w-72 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto">
          <button
            className="mb-4 text-yellow-700 hover:underline"
            onClick={() => setShowSidebar(false)}
          >
            Close
          </button>
          <div className="mb-6">
            <label className="block font-semibold mb-2">Arabic Font</label>
            <div className="flex gap-3">
              {arabicFontOptions.map(opt => (
                <label key={opt.value} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all duration-150 ${arabicFont === opt.value ? 'border-yellow-500 bg-yellow-50 text-yellow-900 shadow' : 'border-gray-200 bg-white text-gray-700'}`}>
                  <input
                    type="radio"
                    name="arabicFont"
                    value={opt.value}
                    checked={arabicFont === opt.value}
                    onChange={() => setArabicFont(opt.value)}
                    className="accent-yellow-500"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label className="block font-semibold mb-2">Arabic Font Size</label>
            <div className="flex gap-2">
              {[1,2,3].map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setArabicFontSize(size)}
                  className={`px-3 py-1 rounded-lg border font-semibold transition-all duration-150 ${arabicFontSize === size ? 'border-yellow-500 bg-yellow-100 text-yellow-900 shadow' : 'border-gray-200 bg-white text-gray-700'}`}
                  aria-pressed={arabicFontSize === size}
                >
                  {size === 1 ? 'XL' : size === 2 ? '2XL' : '3XL'}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label className="block font-semibold mb-2">Translation Font Size</label>
            <div className="flex gap-2">
              {[1,2,3].map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setTranslationFontSize(size)}
                  className={`px-3 py-1 rounded-lg border font-semibold transition-all duration-150 ${translationFontSize === size ? 'border-yellow-500 bg-yellow-100 text-yellow-900 shadow' : 'border-gray-200 bg-white text-gray-700'}`}
                  aria-pressed={translationFontSize === size}
                >
                  {size === 1 ? 'Base' : size === 2 ? 'LG' : 'XL'}
                </button>
              ))}
            </div>
          </div>
        </aside>
      )}

      {/* Back to Surah List */}
      <div className="app-container mt-6">
        <Link href="/" className="inline-block mb-4 text-yellow-700 hover:underline">← Back to Surah List</Link>

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
    </main>
  );
}
