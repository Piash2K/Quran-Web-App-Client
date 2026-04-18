import { SurahListItem } from "@/lib/types";
import Link from "next/link";

type SurahCardProps = {
  surah: SurahListItem;
};

export function SurahCard({ surah }: SurahCardProps) {
  return (
    <Link href={`/surah/${surah.surahNumber}`} className="block focus:outline-none" tabIndex={0} aria-label={`View details for ${surah.englishName}`}>
      <article className="premium-card panel group relative flex h-full flex-col justify-between overflow-hidden p-6 transition duration-300 hover:-translate-y-1 cursor-pointer">
        <div className="bg-linear-to-r absolute inset-x-0 top-0 h-px opacity-60" />

        <div className="flex items-start justify-between gap-4">
          <div className="premium-card-index flex h-12 w-12 items-center justify-center rounded-2xl text-base font-bold">
            {surah.surahNumber}
          </div>
          <div className="premium-card-meta rounded-full px-0 py-1 text-xs font-semibold uppercase">
            {surah.ayahCount} Ayahs
          </div>
        </div>

        <div className="mt-10 space-y-2">
          <h2 className="premium-card-title font-semibold tracking-tight transition">
            {surah.englishName}
          </h2>
          <p dir="rtl" className="premium-card-arabic font-arabic-amiri text-right">
            {surah.arabicName}
          </p>
        </div>

        <div className="premium-card-footer mt-8 border-t pt-5 text-sm">
          <div className="flex items-center justify-between">
            <span>Read surah details</span>
            <span className="premium-card-arrow text-lg transition duration-300 group-hover:translate-x-1">
              {">"}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
