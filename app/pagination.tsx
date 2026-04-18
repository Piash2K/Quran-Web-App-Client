"use client";

import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => onPageChange(i + 1)}
              className={`px-4 py-2 rounded-lg border text-base font-medium transition-colors duration-200 ${currentPage === i + 1 ? "bg-yellow-600 text-white border-yellow-600" : "bg-white text-yellow-700 border-yellow-300 hover:bg-yellow-100"}`}
              aria-current={currentPage === i + 1 ? "page" : undefined}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}