//! The backend half of `src/lib/features.ts`: what this build runs on its own.
//! Keep the two in step when turning a feature back on.

/// AI assistance. While off, startup doesn't probe Ollama for models and the
/// tray has no "Copy AI answer / action items / summary" items.
pub const AI: bool = false;

/// Offering to start a meeting when Zoom, Teams or Meet opens. While off, the
/// detection thread never starts, so no prompt window can appear.
pub const MEETING_DETECTION: bool = false;
