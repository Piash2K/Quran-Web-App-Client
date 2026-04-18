"use client";

import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  // Helper to generate page numbers for mobile (show prev, current, next, first, last, ellipsis)
  function getPageNumbers() {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage > 2) pages.push(1);
      if (currentPage > 3) pages.push('...');
      if (currentPage > 1) pages.push(currentPage - 1);
      pages.push(currentPage);
      if (currentPage < totalPages) pages.push(currentPage + 1);
      if (currentPage < totalPages - 2) pages.push('...');
      if (currentPage < totalPages - 1) pages.push(totalPages);
    }
    return pages;
  }

  return (
    <nav className="flex justify-center mt-8">
      {/* Desktop: show all pages, Mobile: show condensed */}
      <ul className="hidden sm:flex space-x-2">
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
      <ul className="flex sm:hidden space-x-1">
        {/* Prev button */}
        <li>
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className="px-2 py-1 rounded-lg border text-xs font-medium transition-colors duration-200 bg-white text-yellow-700 border-yellow-300 hover:bg-yellow-100"
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            &lt;
          </button>
        </li>
        {getPageNumbers().map((page, idx) =>
          typeof page === 'number' ? (
            <li key={page}>
              <button
                type="button"
                onClick={() => onPageChange(page)}
                className={`px-2 py-1 rounded-lg border text-xs font-medium transition-colors duration-200 ${currentPage === page ? "bg-yellow-600 text-white border-yellow-600" : "bg-white text-yellow-700 border-yellow-300 hover:bg-yellow-100"}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            </li>
          ) : (
            <li key={"ellipsis-" + idx} className="flex items-center px-0.5">…</li>
          )
        )}
        {/* Next button */}
        <li>
          <button
            type="button"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className="px-2 py-1 rounded-lg border text-xs font-medium transition-colors duration-200 bg-white text-yellow-700 border-yellow-300 hover:bg-yellow-100"
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
}