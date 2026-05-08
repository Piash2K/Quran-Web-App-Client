import { SurahListItem } from "@/lib/types";
import Link from "next/link";
import { useMemo, useState } from "react";


interface SurahListSidebarProps {
  surahs: SurahListItem[];
  currentSurahId: number;
  className?: string;
}

export default function SurahListSidebar({
  surahs,
  currentSurahId,
  className,
}: SurahListSidebarProps) {
  const [search, setSearch] = useState("");

  const filteredSurahs = useMemo(() => {
    const searchValue = search.trim().toLowerCase();
    if (!searchValue) return surahs;

    return surahs.filter((surah) => {
      return (
        surah.englishName.toLowerCase().includes(searchValue) ||
        surah.arabicName.replace(/\s/g, "").includes(searchValue.replace(/\s/g, ""))
      );
    });
  }, [search, surahs]);

  return (
    <aside
      className={`h-full rounded-3xl border border-border bg-surface-strong p-3 text-foreground shadow-sm ${className ?? ""}`}
    >
      <div className="mb-3 grid grid-cols-3 gap-1 rounded-2xl bg-surface-soft p-1 text-sm font-medium text-muted">
        <button type="button" className="rounded-xl bg-surface-strong px-3 py-2 text-foreground shadow-sm">
          Surah
        </button>
        <button type="button" className="rounded-xl px-3 py-2 hover:text-foreground">
          Juz
        </button>
        <button type="button" className="rounded-xl px-3 py-2 hover:text-foreground">
          Page
        </button>
      </div>

      <div className="mb-3 flex items-center gap-2 rounded-2xl border border-border bg-surface px-3 py-2">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 text-muted"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          placeholder="Search surah"
          aria-label="Search surah"
        />
      </div>

      <div
        className="scrollbar-hide flex-1 overflow-y-auto pr-1"
      >
        {filteredSurahs.map((surah) => (
          <Link
            key={surah.surahNumber}
            href={`/surah/${surah.surahNumber}`}
            className={`mb-2 flex items-center gap-3 rounded-2xl border px-3 py-3 transition ${
              currentSurahId === surah.surahNumber
                ? "border-border-strong bg-surface-soft"
                : "border-transparent hover:border-border hover:bg-surface"
            }`}
            aria-current={currentSurahId === surah.surahNumber ? "page" : undefined}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
              {surah.surahNumber}
            </span>
            <div className="flex-1">
              <div className="text-sm font-semibold">{surah.englishName}</div>
              <div className="text-xs text-muted">
                {surah.ayahCount} ayahs
              </div>
            </div>
            <div className="font-arabic-amiri text-xl text-muted" dir="rtl">
              {surah.arabicName}
            </div>
          </Link>
        ))}

        {filteredSurahs.length === 0 ? (
          <p className="px-2 py-3 text-sm text-muted">No surah found.</p>
        ) : null}
      </div>
    </aside>
  );
}
