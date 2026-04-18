
"use client";


import { SurahListItem, QuranVerse } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";


interface SurahAyatPageProps {
  surah: SurahListItem;
  ayat: QuranVerse[];
}

export default function SurahAyatPage({ surah, ayat }: SurahAyatPageProps) {
  const [showSidebar, setShowSidebar] = useState(false);

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
        <aside className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-6">
          <button
            className="mb-4 text-yellow-700 hover:underline"
            onClick={() => setShowSidebar(false)}
          >
            Close
          </button>
          <div className="text-gray-700">Settings content here...</div>
        </aside>
      )}

      {/* Back to Surah List */}
      <div className="app-container mt-6">
        <Link href="/" className="inline-block mb-4 text-yellow-700 hover:underline">← Back to Surah List</Link>

        {/* Ayat List */}
        <div className="space-y-6">
          {ayat.map((ayah, idx) => (
            <div
              key={ayah.id || idx}
              className="p-5 rounded-xl border bg-white shadow-sm flex flex-col md:flex-row md:items-center gap-4"
            >
              <div className="flex-1">
                <div className="text-2xl font-arabic text-right text-gray-900 mb-2">{ayah.arabic}</div>
                <div className="text-base text-gray-700">{ayah.translation}</div>
              </div>
              <div className="text-yellow-700 font-semibold">{idx + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
