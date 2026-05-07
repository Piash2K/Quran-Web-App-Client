import { SurahListItem } from "@/lib/types";
import Link from "next/link";


interface SurahListSidebarProps {
  surahs: SurahListItem[];
  currentSurahId: number;
}

export default function SurahListSidebar({ surahs, currentSurahId }: SurahListSidebarProps) {
  return (
    <aside
      className="w-64 bg-neutral-900 text-white h-full flex flex-col border-r border-neutral-800"
      style={{ minWidth: 256 }}
    >
      <div className="p-4 font-bold text-lg border-b border-neutral-800">Surah</div>
      <div
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-700 scrollbar-track-neutral-900"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#a16207 #171717' }}
      >
        {surahs.map((surah) => (
          <Link
            key={surah.surahNumber}
            href={`/surah/${surah.surahNumber}`}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors rounded-lg mb-1 ${currentSurahId === surah.surahNumber ? "bg-yellow-700 text-white" : "hover:bg-neutral-800"}`}
            aria-current={currentSurahId === surah.surahNumber ? "page" : undefined}
          >
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-yellow-800 text-white font-bold text-sm">
              {surah.surahNumber}
            </span>
            <div className="flex-1">
              <div className="font-semibold text-base">{surah.englishName}</div>
              <div className="text-xs text-yellow-200">{surah.arabicName}</div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
