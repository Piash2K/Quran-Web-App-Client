
// Fetch a single surah by ID (for ayat page)


import { QuranSurah } from "@/lib/types";
export async function getSurahById(id: string): Promise<QuranSurah> {
  // The endpoint returns { data: surah }
  const res = await fetchFromApi<{ data: QuranSurah }>(`/surahs/${id}`, {
    cache: "no-store",
  });
  return res.data;
}


import { ApiListResponse } from "@/lib/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://quran-web-app-server.vercel.app";

async function fetchFromApi<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, options);

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getSurahs() {
  const res = await fetchFromApi<unknown>("/surahs", {
    cache: "no-store",
  });
  return (res as ApiListResponse<unknown>).data;
}