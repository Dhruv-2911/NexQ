import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { HotkeySettings } from "./HotkeySettings";
import { useConfigStore, DEFAULT_HOTKEYS } from "../stores/configStore";

afterEach(() => {
  cleanup();
  useConfigStore.setState({ hotkeys: DEFAULT_HOTKEYS });
});

describe("Settings › Hotkeys", () => {
  it("saves a new Start / End Meeting shortcut", () => {
    render(<HotkeySettings />);
    fireEvent.click(screen.getByRole("button", { name: "Change shortcut, currently Ctrl+M" }));
    fireEvent.keyDown(window, { key: "k", code: "KeyK", ctrlKey: true, shiftKey: true });
    expect(useConfigStore.getState().hotkeys.start_end_meeting).toBe("CmdOrCtrl+Shift+K");
  });

  it("refuses a key another action already uses", () => {
    render(<HotkeySettings />);
    fireEvent.click(screen.getByRole("button", { name: "Change shortcut, currently Ctrl+M" }));
    fireEvent.keyDown(window, { key: "b", code: "KeyB", ctrlKey: true });
    expect(useConfigStore.getState().hotkeys.start_end_meeting).toBe("CmdOrCtrl+M");
  });

  it("lists the fixed meeting keys, without AI ones while AI assistance is off", () => {
    render(<HotkeySettings />);
    expect(screen.getByText("Mute or unmute your microphone")).toBeTruthy();
    expect(screen.queryByText("AI Assist")).toBeNull();
    expect(screen.queryByText("Assist from any app")).toBeNull();
  });
});
