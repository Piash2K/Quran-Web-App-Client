interface SettingsSidebarProps {
  arabicFont: string;
  setArabicFont: (font: string) => void;
  arabicFontSize: number;
  setArabicFontSize: (size: number) => void;
  translationFontSize: number;
  setTranslationFontSize: (size: number) => void;
  showTranslation: boolean;
  setShowTranslation: (show: boolean) => void;
  className?: string;
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
  showTranslation,
  setShowTranslation,
  className,
}: SettingsSidebarProps) {
  return (
    <aside className={`scrollbar-hide h-full overflow-y-auto rounded-3xl border border-border bg-surface-strong p-4 text-foreground shadow-sm ${className ?? ""}`}>
      <div className="mb-4 grid grid-cols-2 gap-1 rounded-2xl bg-surface-soft p-1 text-sm font-medium text-muted">
        <button
          type="button"
          className={`rounded-xl px-3 py-2 transition ${
            showTranslation ? "bg-surface-strong text-foreground shadow-sm" : "hover:text-foreground"
          }`}
          onClick={() => setShowTranslation(true)}
        >
          Translation
        </button>
        <button
          type="button"
          className={`rounded-xl px-3 py-2 transition ${
            !showTranslation ? "bg-surface-strong text-foreground shadow-sm" : "hover:text-foreground"
          }`}
          onClick={() => setShowTranslation(false)}
        >
          Reading
        </button>
      </div>

      <div className="mb-3 rounded-2xl border border-border bg-surface p-4">
        <h3 className="text-sm font-semibold">Font Settings</h3>

        <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-muted">
          Arabic Font Size <span className="float-right text-accent-strong">{arabicFontSize}</span>
        </label>
        <input
          type="range"
          min={28}
          max={56}
          value={arabicFontSize}
          onChange={(event) => setArabicFontSize(Number(event.target.value))}
          className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-surface-soft accent-accent"
        />

        <label className="mt-5 block text-xs font-semibold uppercase tracking-wide text-muted">
          Translation Size <span className="float-right text-accent-strong">{translationFontSize}</span>
        </label>
        <input
          type="range"
          min={16}
          max={34}
          value={translationFontSize}
          onChange={(event) => setTranslationFontSize(Number(event.target.value))}
          disabled={!showTranslation}
          className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-surface-soft accent-accent disabled:opacity-50"
        />

        <label className="mt-5 block text-xs font-semibold uppercase tracking-wide text-muted">
          Arabic Font Face
        </label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {arabicFontOptions.map((opt) => (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
                arabicFont === opt.value
                  ? "border-border-strong bg-surface-soft text-foreground"
                  : "border-border bg-surface-strong text-muted"
              }`}
            >
              <input
                type="radio"
                name="arabicFont"
                value={opt.value}
                checked={arabicFont === opt.value}
                onChange={() => setArabicFont(opt.value)}
                className="accent-accent"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface-soft p-4">
        <div className="mb-1 text-base font-bold">Help spread the knowledge of Islam</div>
        <div className="mb-3 text-sm text-muted">
          Your regular support helps us reach our religious brothers and sisters with the message of Islam. Join our mission and be part of the big change.
        </div>
        <button className="w-full rounded-xl bg-accent px-4 py-2 font-bold text-white transition hover:bg-accent-strong">
          Support Us
        </button>
      </div>
    </aside>
  );
}
