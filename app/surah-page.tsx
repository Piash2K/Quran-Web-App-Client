"use client";


import { SurahCard } from "@/components/surah-card";
import { SITE_NAME } from "@/lib/constants";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { SurahListItem } from "@/lib/types";
import Pagination from "./pagination";


type SearchResultItem = {
  surahNumber: number;
  englishName: string;
  arabicName: string;
  ayahNumber: number;
  arabic: string;
  translation: string;
};
type SurahPageProps = {
  surahs: SurahListItem[];
  hasError: boolean;
};

const CARDS_PER_PAGE = 9;

const SEARCH_API = process.env.NEXT_PUBLIC_API_BASE_URL
  ? process.env.NEXT_PUBLIC_API_BASE_URL + "/search"
  : "https://quran-web-app-server.vercel.app/search";


// Wrapper for Suspense boundary
export default function SurahPageWrapper(props: SurahPageProps) {
  return (
    <Suspense fallback={<div className="py-12 text-center">Loading...</div>}>
      <SurahPageClient {...props} />
    </Suspense>
  );
}

// Client component with hooks

function SurahPageClient({ surahs, hasError }: SurahPageProps) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResultItem[] | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Always get page param, but reset to 1 on search
  const pageParam = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(1);


  // Remove setCurrentPage(1) from effect. Instead, reset page in search input handler.

  // --- SEARCH LOGIC ---
  let surahsToShow = surahs;
  let ayahMatchesBySurah: Record<number, SearchResultItem[]> = {};
  if (search.trim()) {
    // Surah name search (case-insensitive, partial match)
    const searchLower = search.trim().toLowerCase();
    const surahNameMatches = surahs.filter(surah =>
      surah.englishName.toLowerCase().includes(searchLower) ||
      surah.arabicName.replace(/\s/g, "").includes(search.replace(/\s/g, ""))
    ).map(surah => surah.surahNumber);

    if (searchResults) {
      ayahMatchesBySurah = searchResults.reduce((acc, item) => {
        if (!acc[item.surahNumber]) acc[item.surahNumber] = [];
        acc[item.surahNumber].push(item);
        return acc;
      }, {} as Record<number, SearchResultItem[]>);
    }

    // Show surahs that match by name or have ayah matches
    surahsToShow = surahs.filter(surah =>
      surahNameMatches.includes(surah.surahNumber) ||
      (searchResults && ayahMatchesBySurah[surah.surahNumber])
    );
  }
  const totalPages = Math.ceil(surahsToShow.length / CARDS_PER_PAGE);

  // Always paginate from currentPage state (reset to 1 on search)
  const paginatedSurahs = surahsToShow.slice(
    ((search.trim() ? currentPage : (pageParam ? Math.max(1, parseInt(pageParam, 10) || 1) : 1)) - 1) * CARDS_PER_PAGE,
    ((search.trim() ? currentPage : (pageParam ? Math.max(1, parseInt(pageParam, 10) || 1) : 1))) * CARDS_PER_PAGE
  );

  // Only fetch search results if search is not empty
  useEffect(() => {
    let ignore = false;
    if (!search.trim()) {
      return;
    }
    Promise.resolve().then(() => setSearchLoading(true));
    fetch(`${SEARCH_API}?q=${encodeURIComponent(search)}`)
      .then(res => {
        if (!res.ok) throw new Error("Search failed");
        return res.json();
      })
      .then(data => {
        if (!ignore) {
          setSearchResults(data.data as SearchResultItem[]);
        }
      })
      .catch(() => {
        if (!ignore) setSearchResults([]);
      })
      .finally(() => {
        if (!ignore) setSearchLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [search]);



  return (
    <main className="flex-1 pb-16 pt-0 md:pb-24">
      <header className="header-glass sticky top-0 z-20 border-b backdrop-blur-xl">
        <div className="app-container flex min-h-20 items-center gap-4 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="logo-badge flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold text-white">
              {"\u0642"}
            </div>
            <p className="brand-title font-semibold leading-none hidden md:block">
              {SITE_NAME}
            </p>
          </div>



          {/* Search bar for desktop */}
          <div className="ml-auto hidden flex-1 justify-center md:flex">
            <form
              onSubmit={e => e.preventDefault()}
              className="search-shell flex w-full max-w-112.5 items-center gap-3 rounded-2xl px-4 py-3 bg-white border border-yellow-200 shadow"
              role="search"
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
              <input
                type="text"
                className="flex-1 bg-transparent outline-none text-base px-2"
                placeholder="Search ayahs or surah..."
                value={search}
                onChange={e => {
                  const value = e.target.value;
                  setSearch(value);
                  setCurrentPage(1);
                  if (searchParams.get("page") !== "1" && value.trim()) {
                    router.push("?page=1");
                  }
                  if (!value.trim()) {
                    setSearchResults(null);
                    setSearchLoading(false);
                  }
                }}
                aria-label="Search ayahs or surah"
              />
              {search && (
                <button
                  type="button"
                  className="ml-2 text-yellow-700 hover:text-yellow-900"
                  onClick={() => {
                    setSearch("");
                    setCurrentPage(1);
                    setSearchResults(null);
                    setSearchLoading(false);
                    if (searchParams.get("page") !== "1") {
                      router.push("?page=1");
                    }
                  }}
                  aria-label="Clear search"
                >
                  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5"><path d="M6 6l8 8M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                </button>
              )}
            </form>
          </div>

          {/* Compact search bar for mobile */}
          <div className="w-full flex md:hidden mt-2">
            <form
              onSubmit={e => e.preventDefault()}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1 bg-white border border-yellow-200 shadow"
              role="search"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5 text-yellow-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                type="text"
                className="flex-1 bg-transparent outline-none text-sm px-1"
                placeholder="Search..."
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                  if (searchParams.get("page") !== "1" && e.target.value.trim()) {
                    router.push("?page=1");
                  }
                }}
                aria-label="Search ayahs or surah"
              />
              {search && (
                <button
                  type="button"
                  className="ml-1 text-yellow-700 hover:text-yellow-900"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4"><path d="M6 6l8 8M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                </button>
              )}
            </form>
          </div>


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
          <>
            <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {searchLoading ? (
                <div className="col-span-full text-center text-yellow-700 py-12 text-lg">Searching...</div>
              ) : paginatedSurahs.length === 0 ? (
                <div className="col-span-full text-center text-yellow-700 py-12 text-lg">No surah or ayah found.</div>
              ) : (
                paginatedSurahs.map((surah) => (
                  <div key={surah.surahNumber}>
                    <SurahCard surah={surah} />
                    {search.trim() && ayahMatchesBySurah[surah.surahNumber] && (
                      <div className="mt-2 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                        <div className="font-semibold text-yellow-800 mb-1 text-sm">Matching Ayahs:</div>
                        <ul className="space-y-1">
                          {ayahMatchesBySurah[surah.surahNumber].map(match => (
                            <li key={match.ayahNumber} className="text-sm">
                              <span className="font-arabic-amiri text-lg mr-2">{match.arabic}</span>
                              <span className="text-gray-700">{match.translation}</span>
                              <span className="ml-2 text-yellow-700">(Ayah {match.ayahNumber})</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))
              )}
            </section>
            <Pagination
              currentPage={search.trim() ? currentPage : (pageParam ? Math.max(1, parseInt(pageParam, 10) || 1) : 1)}
              totalPages={totalPages}
              onPageChange={(page: number) => {
                if (search.trim()) {
                  setCurrentPage(page);
                } else {
                  router.push(`?page=${page}`);
                }
              }}
            />
          </>
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
