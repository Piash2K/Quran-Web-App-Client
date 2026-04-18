
import type { Metadata } from "next";
import SurahPage from "./surah-page";
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

  return <SurahPage surahs={surahs} hasError={hasError} />;
}

