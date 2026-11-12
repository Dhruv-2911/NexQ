import { useCallback, useMemo } from "react";
import { RotateCcw, Keyboard } from "lucide-react";
import {
  useConfigStore,
  DEFAULT_HOTKEYS,
  DEFAULT_STEALTH_SHORTCUT,
  DEFAULT_ASSIST_SHORTCUT,
} from "../stores/configStore";
import { showToast } from "../stores/toastStore";
import { FEATURES } from "../lib/features";
import { CONFIGURABLE_HOTKEYS, shortcutsInUse, type ShortcutOwnerId } from "../lib/appShortcuts";
import { formatShortcut } from "../lib/shortcutLabel";
import { ShortcutButton } from "./ShortcutButton";

/** Keys that work inside the overlay during a meeting. They can't be changed. */
function meetingKeys(): Array<{ keys: string; action: string }> {
  return [
    { keys: "Esc", action: "Close panels and settings" },
    { keys: "M", action: "Mute or unmute your microphone" },
    { keys: formatShortcut("Ctrl+Shift+L"), action: "Dev Log" },
    ...(FEATURES.speakers ? [{ keys: "S", action: "Speaker stats" }] : []),
    ...(FEATURES.bookmarks
      ? [
          { keys: "B", action: "Bookmark this moment" },
          { keys: "K", action: "Bookmarks panel" },
        ]
      : []),
    ...(FEATURES.ai
      ? [
          { keys: "Space", action: "AI Assist" },
          { keys: "1", action: "What to Say" },
          { keys: "2", action: "Shorten" },
          { keys: "3", action: "Follow-Up" },
          { keys: "4", action: "Recap" },
          { keys: "5", action: "Ask a question" },
        ]
      : []),
  ];
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-2.5">
      <span className="text-xs text-foreground/80">{label}</span>
      {children}
    </div>
  );
}

export function HotkeySettings() {
  const hotkeys = useConfigStore((s) => s.hotkeys);
  const setHotkeys = useConfigStore((s) => s.setHotkeys);
  const stealthShortcut = useConfigStore((s) => s.stealthShortcut);
  const setStealthShortcut = useConfigStore((s) => s.setStealthShortcut);
  const assistShortcut = useConfigStore((s) => s.assistShortcut);
  const setAssistShortcut = useConfigStore((s) => s.setAssistShortcut);

  const inUseExcept = useMemo(() => {
    const settings = { hotkeys, stealthShortcut, assistShortcut };
    return (id: ShortcutOwnerId) => shortcutsInUse(settings, id);
  }, [hotkeys, stealthShortcut, assistShortcut]);

  const handleResetDefaults = useCallback(() => {
    setHotkeys(DEFAULT_HOTKEYS);
    setStealthShortcut(DEFAULT_STEALTH_SHORTCUT);
    if (FEATURES.ai) setAssistShortcut(DEFAULT_ASSIST_SHORTCUT);
    showToast("Shortcuts reset to defaults", "info");
  }, [setHotkeys, setStealthShortcut, setAssistShortcut]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-border/30 bg-card/50 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Keyboard className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-primary/80">
              Keyboard Shortcuts
            </h3>
          </div>
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 rounded-lg border border-border/50 bg-secondary/30 px-3 py-2 text-xs font-medium text-muted-foreground transition-all duration-150 hover:bg-secondary hover:text-foreground hover:-translate-y-px active:translate-y-px active:scale-[0.97] cursor-pointer"
            aria-label="Reset all shortcuts to defaults"
          >
            <RotateCcw className="h-3 w-3" />
            Reset to Defaults
          </button>
        </div>

        <p className="mt-2 text-xs text-muted-foreground">
          These work from any app. Click a shortcut, then press the new key combination; Escape cancels.
        </p>
      </div>

      {/* Global shortcuts: changeable */}
      <div className="divide-y divide-border/20 overflow-hidden rounded-xl border border-border/30 bg-card/50">
        {CONFIGURABLE_HOTKEYS.map(({ id, label }) => (
          <Row key={id} label={label}>
            <ShortcutButton
              value={hotkeys[id]}
              defaultValue={DEFAULT_HOTKEYS[id]}
              onChange={(accel) => setHotkeys({ ...hotkeys, [id]: accel })}
              others={inUseExcept(id)}
            />
          </Row>
        ))}
        <Row label="Hide from screen share">
          <ShortcutButton
            value={stealthShortcut}
            defaultValue={DEFAULT_STEALTH_SHORTCUT}
            onChange={setStealthShortcut}
            others={inUseExcept("stealth")}
          />
        </Row>
        {FEATURES.ai && (
          <Row label="Assist from any app">
            <ShortcutButton
              value={assistShortcut}
              defaultValue={DEFAULT_ASSIST_SHORTCUT}
              onChange={setAssistShortcut}
              others={inUseExcept("assist")}
            />
          </Row>
        )}
      </div>

      {/* In-meeting keys: fixed */}
      <div className="rounded-xl border border-border/30 bg-card/50">
        <div className="border-b border-border/20 px-4 py-3">
          <h4 className="text-xs font-semibold text-foreground/80">During a meeting</h4>
          <p className="mt-0.5 text-meta text-muted-foreground">
            In the overlay, while you're not typing. These can't be changed.
          </p>
        </div>
        <div className="divide-y divide-border/20">
          {meetingKeys().map(({ keys, action }) => (
            <Row key={keys} label={action}>
              <kbd className="rounded-lg bg-secondary/60 px-2.5 py-1 font-mono text-xs text-foreground">{keys}</kbd>
            </Row>
          ))}
        </div>
      </div>
    </div>
  );
}
