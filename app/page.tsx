import type { Metadata } from "next";
import { SurahCard } from "@/components/surah-card";
import { SITE_NAME } from "@/lib/constants";
import { getSurahs } from "@/lib/api";
import { SurahListItem } from "@/lib/types";

export const metadata: Metadata = {
  title: "Surah Directory",
};

export default async function Home() {
  let surahs: SurahListItem[] = [];
  let hasError = false;

  try {
    surahs = await getSurahs();
  } catch {
    hasError = true;
  }

  return (
    <main className="flex-1 pb-16 pt-0 md:pb-24">
      <header className="header-glass sticky top-0 z-20 border-b backdrop-blur-xl">
        <div className="app-container flex min-h-20 items-center gap-4 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="logo-badge flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold text-white">
              {"\u0642"}
            </div>
            <p className="brand-title font-semibold leading-none">
              {SITE_NAME}
            </p>
          </div>

          <div className="ml-auto hidden flex-1 justify-center md:flex">
            <div
              id="search-shortcut"
              className="search-shell flex w-full max-w-112.5 items-center gap-3 rounded-2xl px-4 py-3"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="search-icon h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <span className="text-sm">Search ayahs...</span>
            </div>
          </div>

          <button
            type="button"
            aria-label="Settings"
            className="settings-button ml-2 inline-flex h-10 w-10 items-center justify-center rounded-xl transition"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82L4.21 7.2a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </div>
      </header>

      <div className="app-container">
        <section className="hero-glow hero-shell relative overflow-hidden px-4 py-8 text-center md:px-8 md:py-12">
          <div className="relative space-y-4">
            <p className="hero-kicker text-xs font-semibold uppercase">
              Surah Directory
            </p>
            <h1 className="hero-title font-display text-5xl font-semibold leading-none tracking-tight md:text-7xl">
              The Holy Qur&apos;an
            </h1>
            <p className="hero-copy mx-auto max-w-2xl text-lg leading-8">
              Explore all 114 surahs with Arabic names, English names, and ayah
              counts in a refined reading-first layout.
            </p>
          </div>
        </section>

        {hasError ? (
          <section className="status-panel panel px-5 py-8 text-center text-sm leading-7 md:px-8 md:text-base">
            The frontend could not load the surah list from the backend API.
          </section>
        ) : (
          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {surahs.map((surah) => (
              <SurahCard key={surah.surahNumber} surah={surah} />
            ))}
          </section>
        )}

        <section className="status-note px-5 py-6 text-center text-sm leading-7 md:text-base">
          {hasError
            ? "Start the backend first, then refresh the page."
            : `${surahs.length} surahs loaded from your backend API.`}
        </section>
      </div>
    </main>
  );
}
