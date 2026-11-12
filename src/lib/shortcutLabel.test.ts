import { describe, expect, it } from "vitest";
import { acceleratorFromEvent, formatShortcut, normalizeAccelerator, shortcutOwner } from "./shortcutLabel";

const press = (over: Partial<KeyboardEvent>) =>
  ({ key: "h", code: "KeyH", ctrlKey: false, metaKey: false, shiftKey: false, altKey: false, ...over }) as KeyboardEvent;

describe("formatShortcut", () => {
  it("reads as Ctrl on Windows and as symbols on macOS", () => {
    expect(formatShortcut("CmdOrCtrl+Shift+H", false)).toBe("Ctrl+Shift+H");
    expect(formatShortcut("CmdOrCtrl+Shift+H", true)).toBe("⌘⇧H");
    expect(formatShortcut("CmdOrCtrl+Ctrl+H", true)).toBe("⌘⌃H");
    expect(formatShortcut("CmdOrCtrl+Super+H", false)).toBe("Ctrl+Win+H");
  });
});

describe("acceleratorFromEvent", () => {
  it("Windows: Ctrl is primary, the Windows key stays separate", () => {
    expect(acceleratorFromEvent(press({ ctrlKey: true, shiftKey: true, key: "H" }), false)).toBe("CmdOrCtrl+Shift+H");
    expect(acceleratorFromEvent(press({ metaKey: true }), false)).toBe("Super+H");
    expect(acceleratorFromEvent(press({ ctrlKey: true, code: "Digit7", key: "7" }), false)).toBe("CmdOrCtrl+7");
    expect(acceleratorFromEvent(press({ ctrlKey: true, shiftKey: true, code: "Space", key: " " }), false)).toBe("CmdOrCtrl+Shift+Space");
  });

  it("macOS: Command is primary, Control stays separate", () => {
    expect(acceleratorFromEvent(press({ metaKey: true, altKey: true, key: "˙" }), true)).toBe("CmdOrCtrl+Alt+H");
    expect(acceleratorFromEvent(press({ ctrlKey: true }), true)).toBe("Ctrl+H");
    expect(acceleratorFromEvent(press({ ctrlKey: true, metaKey: true }), true)).toBe("CmdOrCtrl+Ctrl+H");
  });

  it("rejects lone modifiers, plain keys and unsupported keys", () => {
    expect(acceleratorFromEvent(press({ ctrlKey: true, key: "Control", code: "ControlLeft" }), false)).toBeNull();
    expect(acceleratorFromEvent(press({ shiftKey: true }), false)).toBeNull();
    expect(acceleratorFromEvent(press({ ctrlKey: true, key: "Enter", code: "Enter" }), false)).toBeNull();
  });
});

describe("shortcutOwner", () => {
  const inUse = { "CmdOrCtrl+M": "Start / End Meeting", "CmdOrCtrl+B": "Show / Hide Overlay" };

  it("matches equivalent spellings on each platform", () => {
    expect(normalizeAccelerator("shift+ctrl+h", false)).toBe("CmdOrCtrl+Shift+H");
    expect(shortcutOwner("Ctrl+M", inUse, false)).toBe("Start / End Meeting");
    expect(shortcutOwner("CommandOrControl+B", inUse, true)).toBe("Show / Hide Overlay");
    expect(shortcutOwner("Cmd+M", inUse, true)).toBe("Start / End Meeting");
    // Control+M on a Mac is not Command+M.
    expect(shortcutOwner("Ctrl+M", inUse, true)).toBeNull();
    expect(shortcutOwner("CmdOrCtrl+Shift+H", inUse, false)).toBeNull();
  });
});
