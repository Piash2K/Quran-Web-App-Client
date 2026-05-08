"use client";
import type { SurahListItem, QuranVerse } from "@/lib/types";
import { useState, useEffect } from "react";
import SurahListSidebar from "@/components/SurahListSidebar";
import SettingsSidebar from "@/components/SettingsSidebar";
import { getSurahs } from "@/lib/api";
import { SITE_NAME } from "@/lib/constants";

type SurahAyatPageProps = {
  surah: SurahListItem;
  ayat: QuranVerse[];
};


export default function SurahAyatPage({ surah, ayat }: SurahAyatPageProps) {
  const [arabicFont, setArabicFont] = useState("font-arabic-amiri");
  const [arabicFontSize, setArabicFontSize] = useState(42);
  const [translationFontSize, setTranslationFontSize] = useState(24);
  const [showTranslation, setShowTranslation] = useState(true);
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
      const storedShowTranslation = localStorage.getItem("quran_show_translation");
      Promise.resolve().then(() => {
        if (storedFont) setArabicFont(storedFont);

        if (storedArabicSize) {
          const parsedArabic = Number(storedArabicSize);
          const arabicFallbackMap: Record<number, number> = { 1: 34, 2: 42, 3: 50 };
          setArabicFontSize(parsedArabic <= 3 ? arabicFallbackMap[parsedArabic] : parsedArabic);
        }

        if (storedTransSize) {
          const parsedTranslation = Number(storedTransSize);
          const translationFallbackMap: Record<number, number> = { 1: 20, 2: 24, 3: 28 };
          setTranslationFontSize(parsedTranslation <= 3 ? translationFallbackMap[parsedTranslation] : parsedTranslation);
        }

        if (storedShowTranslation) {
          setShowTranslation(storedShowTranslation === "true");
        }
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("quran_arabic_font", arabicFont);
      localStorage.setItem("quran_arabic_font_size", arabicFontSize.toString());
      localStorage.setItem("quran_translation_font_size", translationFontSize.toString());
      localStorage.setItem("quran_show_translation", showTranslation.toString());
    }
  }, [arabicFont, arabicFontSize, translationFontSize, showTranslation]);

  return (
    <main className="pb-8 pt-3 md:pt-4">
      <div className="app-container">
        <section className="panel h-[calc(100vh-1.25rem)] overflow-hidden rounded-4xl">
          <header className="header-glass flex items-center justify-between border-b border-border px-4 py-3 md:px-6">
            <div className="min-w-0">
              <p className="text-lg font-semibold text-accent-strong md:text-2xl">{SITE_NAME}</p>
              <p className="text-xs text-muted md:text-sm">Read, Study, and Learn The Quran</p>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-accent-strong"
                aria-label="Search"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </button>
              <button
                type="button"
                className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-strong"
              >
                Support Us
              </button>
            </div>
          </header>

          <div className="grid h-[calc(100%-4.2rem)] grid-cols-1 md:grid-cols-12">
            <aside className="hidden border-r border-border p-3 md:col-span-3 md:block md:h-full md:overflow-y-auto">
              <SurahListSidebar surahs={surahList} currentSurahId={surah.surahNumber} />
            </aside>

            <section className="scrollbar-hide min-h-0 overflow-y-auto border-border md:col-span-6 md:border-x" style={{ WebkitOverflowScrolling: "touch" }}>
              <div className="px-4 pb-24 pt-6 md:px-8">
                <div className="border-b border-border pb-6 text-center">
                  <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{surah.englishName}</h1>
                  <p className="mt-2 text-sm text-muted">Ayah-{surah.ayahCount}</p>
                </div>

                <div className="mt-3 space-y-0">
                  {ayat.map((ayah: QuranVerse, idx: number) => (
                    <article
                      key={ayah.id || idx}
                      className="grid grid-cols-[40px_1fr] gap-4 border-b border-border py-7"
                    >
                      <div className="space-y-3 text-muted">
                        <p className="text-xs font-semibold text-accent-strong">{surah.surahNumber}:{idx + 1}</p>
                        <button type="button" aria-label="Play verse" className="block transition hover:text-accent-strong">
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="9,7 18,12 9,17" />
                          </svg>
                        </button>
                        <button type="button" aria-label="Bookmark verse" className="block transition hover:text-accent-strong">
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 4h12v16l-6-4-6 4V4z" />
                          </svg>
                        </button>
                      </div>

                      <div>
                        <p
                          dir="rtl"
                          className={`${arabicFont} leading-[2.15] text-foreground`}
                          style={{ fontSize: `${arabicFontSize}px` }}
                        >
                          {ayah.arabic}
                        </p>

                        {showTranslation ? (
                          <p
                            className="mt-4 leading-relaxed text-muted"
                            style={{ fontSize: `${translationFontSize}px` }}
                          >
                            {ayah.translation}
                          </p>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <aside className="hidden border-l border-border p-3 md:col-span-3 md:block md:h-full md:overflow-y-auto">
              <SettingsSidebar
                arabicFont={arabicFont}
                setArabicFont={setArabicFont}
                arabicFontSize={arabicFontSize}
                setArabicFontSize={setArabicFontSize}
                translationFontSize={translationFontSize}
                setTranslationFontSize={setTranslationFontSize}
                showTranslation={showTranslation}
                setShowTranslation={setShowTranslation}
              />
            </aside>

            <div className="space-y-4 border-t border-border p-4 md:hidden">
              <details className="rounded-2xl border border-border bg-surface-strong p-3">
                <summary className="cursor-pointer text-sm font-semibold">Surah List</summary>
                <div className="mt-3 h-72 overflow-y-auto">
                  <SurahListSidebar surahs={surahList} currentSurahId={surah.surahNumber} className="border-0 p-0 shadow-none" />
                </div>
              </details>

              <details className="rounded-2xl border border-border bg-surface-strong p-3">
                <summary className="cursor-pointer text-sm font-semibold">Reading Settings</summary>
                <div className="mt-3">
                  <SettingsSidebar
                    arabicFont={arabicFont}
                    setArabicFont={setArabicFont}
                    arabicFontSize={arabicFontSize}
                    setArabicFontSize={setArabicFontSize}
                    translationFontSize={translationFontSize}
                    setTranslationFontSize={setTranslationFontSize}
                    showTranslation={showTranslation}
                    setShowTranslation={setShowTranslation}
                    className="border-0 p-0 shadow-none"
                  />
                </div>
              </details>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
