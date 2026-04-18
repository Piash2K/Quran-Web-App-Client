export type QuranVerse = {
  id: number;
  arabic: string;
  translation: string;
};

export type QuranSurah = {
  surahNumber: number;
  englishName: string;
  arabicName: string;
  ayahCount: number;
  verses: QuranVerse[];
};

export type SurahListItem = Omit<QuranSurah, "verses">;

export type ApiListResponse<T> = {
  total: number;
  data: T[];
};
