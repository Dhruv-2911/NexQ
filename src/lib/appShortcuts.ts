import type { HotkeyConfig } from "./types";
import { FEATURES } from "./features";

/** Global shortcuts the user can change in Settings › Hotkeys. */
export const CONFIGURABLE_HOTKEYS = [
  { id: "start_end_meeting", label: "Start / End Meeting" },
  { id: "show_hide", label: "Show / Hide Overlay" },
  { id: "open_settings", label: "Open Settings" },
] as const satisfies ReadonlyArray<{ id: keyof HotkeyConfig; label: string }>;

/** In-window shortcuts that can't be changed. */
const FIXED_SHORTCUTS: Record<string, string> = {
  "Ctrl+Shift+L": "Dev Log",
  "Ctrl+Shift+D": "Demo mode",
};

/** Who owns which shortcut: a configurable hotkey id, "stealth" or "assist". */
export type ShortcutOwnerId = (typeof CONFIGURABLE_HOTKEYS)[number]["id"] | "stealth" | "assist";

interface ShortcutSettings {
  hotkeys: HotkeyConfig;
  stealthShortcut: string;
  assistShortcut: string;
}

/**
 * Every shortcut iA-ASR uses, as accelerator → action, leaving out `except`
 * (the one being changed, which may keep its own key).
 */
export function shortcutsInUse(s: ShortcutSettings, except?: ShortcutOwnerId): Record<string, string> {
  const owned: Array<[ShortcutOwnerId, string, string]> = [
    ...CONFIGURABLE_HOTKEYS.map((h): [ShortcutOwnerId, string, string] => [h.id, s.hotkeys[h.id], h.label]),
    ["stealth", s.stealthShortcut, "Hide from screen share"],
  ];
  if (FEATURES.ai) owned.push(["assist", s.assistShortcut, "Assist"]);
  const inUse: Record<string, string> = { ...FIXED_SHORTCUTS };
  for (const [id, accel, label] of owned) {
    if (id !== except && accel) inUse[accel] = label;
  }
  return inUse;
}
