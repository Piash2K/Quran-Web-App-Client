import React from "react";

interface SettingsSidebarProps {
  arabicFont: string;
  setArabicFont: (font: string) => void;
  arabicFontSize: number;
  setArabicFontSize: (size: number) => void;
  translationFontSize: number;
  setTranslationFontSize: (size: number) => void;
}

const arabicFontOptions = [
  { label: "Amiri", value: "font-arabic-amiri" },
  { label: "Scheherazade", value: "font-arabic-scheherazade" },
];

export default function SettingsSidebar({
  arabicFont,
  setArabicFont,
  arabicFontSize,
  setArabicFontSize,
  translationFontSize,
  setTranslationFontSize,
}: SettingsSidebarProps) {
  return (
    <aside className="w-72 bg-neutral-900 text-white h-full flex flex-col border-l border-neutral-800 p-6 overflow-y-auto">
      <div className="mb-6">
        <label className="block font-semibold mb-2">Arabic Font</label>
        <div className="flex gap-3">
          {arabicFontOptions.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all duration-150 ${
                arabicFont === opt.value
                  ? "border-yellow-500 bg-yellow-50 text-yellow-900 shadow"
                  : "border-gray-200 bg-white text-gray-700"
              }`}
            >
              <input
                type="radio"
                name="arabicFont"
                value={opt.value}
                checked={arabicFont === opt.value}
                onChange={() => setArabicFont(opt.value)}
                className="accent-yellow-500"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-2">Arabic Font Size</label>
        <div className="flex gap-2">
          {[1, 2, 3].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setArabicFontSize(size)}
              className={`px-3 py-1 rounded-lg border font-semibold transition-all duration-150 ${
                arabicFontSize === size
                  ? "border-yellow-500 bg-yellow-100 text-yellow-900 shadow"
                  : "border-gray-200 bg-white text-gray-700"
              }`}
              aria-pressed={arabicFontSize === size}
            >
              {size === 1 ? "XL" : size === 2 ? "2XL" : "3XL"}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-2">Translation Font Size</label>
        <div className="flex gap-2">
          {[1, 2, 3].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setTranslationFontSize(size)}
              className={`px-3 py-1 rounded-lg border font-semibold transition-all duration-150 ${
                translationFontSize === size
                  ? "border-yellow-500 bg-yellow-100 text-yellow-900 shadow"
                  : "border-gray-200 bg-white text-gray-700"
              }`}
              aria-pressed={translationFontSize === size}
            >
              {size === 1 ? "Base" : size === 2 ? "LG" : "XL"}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8 p-4 bg-yellow-50 text-yellow-900 rounded-lg">
        <div className="font-bold mb-1">Help spread the knowledge of Islam</div>
        <div className="text-sm mb-2">
          Your regular support helps us reach our religious brothers and sisters with the message of Islam. Join our mission and be part of the big change.
        </div>
        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-2 transition">Support Us</button>
      </div>
    </aside>
  );
}
