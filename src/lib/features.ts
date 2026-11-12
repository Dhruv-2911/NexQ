/**
 * What this build of iA-ASR shows and runs.
 *
 * The first release is a realtime transcription tool. The other features stay in
 * the code, switched off here: turning one back on restores its screens, settings,
 * shortcuts and background work together.
 */
export const FEATURES = {
  /**
   * AI assistance: answers and AI modes, Ask, question detection and Auto-Answer,
   * scenarios, context documents (RAG), LLM and Claude CLI settings, the AI call
   * log, and meeting summaries, action items and Ask-the-meeting.
   */
  ai: false,
  /** Speaker stats, the speaker timeline and naming speakers. */
  speakers: false,
  /** Bookmarking moments during a meeting and reviewing them afterwards. */
  bookmarks: false,
  /** Offering to start a meeting when Zoom, Teams or Meet opens. */
  meetingDetection: false,
  /** Checking for and installing updates. Needs an update server in tauri.conf.json. */
  updates: false,
} as const;

export type Feature = keyof typeof FEATURES;
