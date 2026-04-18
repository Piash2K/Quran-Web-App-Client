import { getSurahById, getSurahs } from "@/lib/api";
import SurahAyatPage from "./SurahAyatPage";
import { notFound } from "next/navigation";
import { SurahListItem, QuranVerse } from "@/lib/types";

export async function generateStaticParams() {
  const surahs = (await getSurahs()) as SurahListItem[];
  const params = surahs.map((surah) => ({ id: surah.surahNumber.toString() }));
  console.log("Static params generated for surah pages:", params);
  return params;
}

export default async function Page(props: { params: { id: string } }) {
  const params = await props.params;
  const surahId = params.id;
  let surah: SurahListItem | null = null;
  let ayat: QuranVerse[] = [];
  let hasError = false;

  try {
    const result = await getSurahById(surahId);
    surah = {
      surahNumber: result.surahNumber,
      englishName: result.englishName,
      arabicName: result.arabicName,
      ayahCount: result.ayahCount,
    };
    ayat = Array.isArray(result.verses) ? result.verses : [];
  } catch {
    hasError = true;
  }

  if (!surah || hasError) return notFound();

  return <SurahAyatPage surah={surah} ayat={ayat} />;
}