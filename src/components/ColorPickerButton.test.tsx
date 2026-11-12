import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ColorPickerButton } from "./ColorPickerButton";

afterEach(() => {
  cleanup();
  document.documentElement.classList.remove("dark", "light");
});

function openPicker(value: string, onChange = vi.fn()) {
  render(<ColorPickerButton value={value} onChange={onChange} label="Text color" themeValue="var(--transcript-text)" />);
  fireEvent.click(screen.getByTitle("Text color"));
  return onChange;
}

describe("ColorPickerButton", () => {
  it("offers deep colors on the light theme and light ones on the dark theme", () => {
    document.documentElement.classList.add("light");
    openPicker("var(--transcript-text)");
    expect(screen.getByTitle("Ink")).toBeTruthy();
    expect(screen.queryByTitle("White")).toBeNull();
    cleanup();

    document.documentElement.classList.add("dark");
    openPicker("var(--transcript-text)");
    expect(screen.getByTitle("White")).toBeTruthy();
    expect(screen.queryByTitle("Ink")).toBeNull();
  });

  it("goes back to the theme's color with Match theme", () => {
    const onChange = openPicker("#be123c");
    fireEvent.click(screen.getByText("Match theme"));
    expect(onChange).toHaveBeenCalledWith("var(--transcript-text)");
  });

  it("shows a hex code only for a fixed color", () => {
    openPicker("var(--transcript-text)");
    expect((screen.getByPlaceholderText("custom") as HTMLInputElement).value).toBe("");
    cleanup();
    openPicker("#be123c");
    expect((screen.getByPlaceholderText("custom") as HTMLInputElement).value).toBe("be123c");
  });
});
