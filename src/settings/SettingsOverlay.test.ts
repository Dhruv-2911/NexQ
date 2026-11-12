import { describe, expect, it } from "vitest";
import { visibleTabGroups } from "./SettingsOverlay";
import { FEATURES } from "../lib/features";

const allOff = { ai: false, speakers: false, bookmarks: false, meetingDetection: false, updates: false };

describe("Settings tabs", () => {
  it("without AI assistance, show only meeting, transcription and system settings", () => {
    expect(visibleTabGroups(allOff)).toEqual([
      { label: "Meeting", tabs: ["Audio & Devices", "Noise Presets"] },
      { label: "Transcription", tabs: ["STT Providers", "Confidence", "Translation"] },
      { label: "System", tabs: ["Hotkeys", "General", "About"] },
    ]);
  });

  it("with AI assistance, bring back the LLM and AI tabs", () => {
    const intelligence = visibleTabGroups({ ...allOff, ai: true }).find((g) => g.label === "Intelligence");
    expect(intelligence?.tabs).toEqual(["LLM Providers", "AI Actions", "Context Strategy", "AI Scenarios"]);
  });

  it("this build ships with every hidden feature off", () => {
    expect(FEATURES).toEqual(allOff);
  });
});
