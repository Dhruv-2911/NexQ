import { describe, expect, it } from "vitest";
import { useConfigStore, THEME_TRANSCRIPT_COLOR, THEME_TRANSLATION_COLOR } from "./configStore";

describe("a fresh install", () => {
  it("starts in light mode with transcript colors that follow the theme", () => {
    const s = useConfigStore.getState();
    expect(s.theme).toBe("light");
    expect(s.transcriptTextColor).toBe(THEME_TRANSCRIPT_COLOR);
    expect(s.translationTextColor).toBe(THEME_TRANSLATION_COLOR);
  });
});
