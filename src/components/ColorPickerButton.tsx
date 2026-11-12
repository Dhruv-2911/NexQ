import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

/** Light pastels: readable on the dark theme. */
const DARK_PALETTE = [
  { name: "White", value: "#e4e4e7" },
  { name: "Warm", value: "#d6d3d1" },
  { name: "Snow", value: "#f8fafc" },
  { name: "Cyan", value: "#67e8f9" },
  { name: "Sky", value: "#7dd3fc" },
  { name: "Amber", value: "#fbbf24" },
  { name: "Orange", value: "#fb923c" },
  { name: "Emerald", value: "#6ee7b7" },
  { name: "Lime", value: "#a3e635" },
  { name: "Rose", value: "#fda4af" },
  { name: "Pink", value: "#f9a8d4" },
  { name: "Lavender", value: "#c4b5fd" },
  { name: "Indigo", value: "#a5b4fc" },
  { name: "Peach", value: "#fdba74" },
  { name: "Teal", value: "#5eead4" },
];

/** Deep shades of the same colors: readable on the light theme. */
const LIGHT_PALETTE = [
  { name: "Ink", value: "#27272a" },
  { name: "Stone", value: "#44403c" },
  { name: "Slate", value: "#0f172a" },
  { name: "Cyan", value: "#0e7490" },
  { name: "Sky", value: "#0369a1" },
  { name: "Amber", value: "#b45309" },
  { name: "Orange", value: "#c2410c" },
  { name: "Emerald", value: "#047857" },
  { name: "Lime", value: "#4d7c0f" },
  { name: "Rose", value: "#be123c" },
  { name: "Pink", value: "#be185d" },
  { name: "Lavender", value: "#6d28d9" },
  { name: "Indigo", value: "#4338ca" },
  { name: "Peach", value: "#9a3412" },
  { name: "Teal", value: "#0f766e" },
];

interface ColorPickerButtonProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  /** A color that follows the light/dark theme (a CSS `var(...)`), offered as "Match theme". */
  themeValue?: string;
}

export function ColorPickerButton({ value, onChange, label, themeValue }: ColorPickerButtonProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node) &&
          btnRef.current && !btnRef.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleOpen = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({ x: rect.left + rect.width / 2, y: rect.top });
    }
    setOpen(!open);
  };

  const palette = document.documentElement.classList.contains("dark") ? DARK_PALETTE : LIGHT_PALETTE;
  const swatchRing = (selected: boolean) =>
    selected
      ? "ring-[1.5px] ring-foreground/60 ring-offset-[2px] ring-offset-popover"
      : "hover:brightness-110 hover:ring-1 hover:ring-foreground/25 hover:ring-offset-1 hover:ring-offset-popover";

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleOpen}
        className="flex items-center gap-1 rounded-md px-1.5 py-1 hover:bg-accent/50 transition-colors cursor-pointer"
        title={label || "Pick color"}
      >
        <div
          className="h-3.5 w-3.5 rounded border border-border"
          style={{ backgroundColor: value }}
        />
        <svg className="h-2 w-2 text-muted-foreground/35" viewBox="0 0 12 12" fill="none">
          <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && createPortal(
        <div
          ref={ref}
          className="fixed z-[9999] rounded-lg border border-border bg-popover p-2.5 text-popover-foreground shadow-2xl"
          style={{
            left: `${Math.max(90, Math.min(pos.x - 90, window.innerWidth - 195))}px`,
            top: `${Math.max(8, pos.y - (themeValue ? 215 : 185))}px`,
          }}
        >
          {themeValue && (
            <button
              onClick={() => { onChange(themeValue); setOpen(false); }}
              className="mb-2 flex w-full items-center gap-2 rounded-md px-1 py-1 text-[0.65rem] text-foreground/70 hover:bg-accent/50 cursor-pointer"
            >
              <span
                className={`h-[18px] w-[18px] shrink-0 rounded-[5px] border border-border ${swatchRing(value === themeValue)}`}
                style={{ backgroundColor: themeValue }}
              />
              Match theme
            </button>
          )}

          {/* Color grid — 5x3, no scale transforms */}
          <div className="grid grid-cols-5 gap-[7px]">
            {palette.map((c) => (
              <button
                key={c.value}
                onClick={() => { onChange(c.value); setOpen(false); }}
                className={`h-[22px] w-[22px] rounded-[5px] transition-all duration-100 cursor-pointer ${swatchRing(value === c.value)}`}
                style={{ backgroundColor: c.value }}
                title={c.name}
              />
            ))}
          </div>

          {/* Hex input */}
          <div className="mt-2 flex items-center gap-1.5 border-t border-border/60 pt-2">
            <div
              className="h-3.5 w-3.5 rounded-[3px] border border-border shrink-0"
              style={{ backgroundColor: value }}
            />
            <span className="text-[0.6rem] text-muted-foreground/60 font-mono">#</span>
            <input
              type="text"
              value={value.startsWith("#") ? value.slice(1) : ""}
              onChange={(e) => {
                const hex = e.target.value.replace('#', '');
                if (/^[0-9a-fA-F]{0,6}$/.test(hex)) {
                  if (hex.length === 6) onChange(`#${hex}`);
                }
              }}
              className="w-14 bg-transparent text-[0.6rem] text-foreground/60 outline-none font-mono tracking-wider"
              maxLength={6}
              placeholder="custom"
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
