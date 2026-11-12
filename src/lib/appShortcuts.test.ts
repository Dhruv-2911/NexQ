import { describe, expect, it } from "vitest";
import { shortcutsInUse } from "./appShortcuts";
import { DEFAULT_HOTKEYS } from "../stores/configStore";

const settings = { hotkeys: DEFAULT_HOTKEYS, stealthShortcut: "CmdOrCtrl+Shift+H", assistShortcut: "CmdOrCtrl+Shift+Space" };

describe("shortcutsInUse", () => {
  it("lists every shortcut but the one being changed", () => {
    const forMeeting = shortcutsInUse(settings, "start_end_meeting");
    expect(forMeeting["CmdOrCtrl+M"]).toBeUndefined();
    expect(forMeeting["CmdOrCtrl+B"]).toBe("Show / Hide Overlay");
    expect(forMeeting["CmdOrCtrl+,"]).toBe("Open Settings");
    expect(forMeeting["CmdOrCtrl+Shift+H"]).toBe("Hide from screen share");
    expect(forMeeting["Ctrl+Shift+L"]).toBe("Dev Log");

    expect(shortcutsInUse(settings, "stealth")["CmdOrCtrl+Shift+H"]).toBeUndefined();
  });

  it("follows a changed binding", () => {
    const changed = { ...settings, hotkeys: { ...DEFAULT_HOTKEYS, show_hide: "CmdOrCtrl+Shift+B" } };
    const inUse = shortcutsInUse(changed, "stealth");
    expect(inUse["CmdOrCtrl+Shift+B"]).toBe("Show / Hide Overlay");
    expect(inUse["CmdOrCtrl+B"]).toBeUndefined();
  });

  it("leaves out the Assist shortcut while AI assistance is off", () => {
    expect(Object.values(shortcutsInUse(settings))).not.toContain("Assist");
  });
});
