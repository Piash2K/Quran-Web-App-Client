/* eslint-disable @typescript-eslint/no-explicit-any */

import { ApiListResponse } from "@/lib/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

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
  const res = await fetchFromApi<ApiListResponse<any>>("/surahs", {
    cache: "no-store",
  });

  return res.data;
}