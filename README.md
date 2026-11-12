<div align="center">

<img src="src-tauri/icons/app-icon.png" alt="iA-ASR logo" width="96">

# iA-ASR

**Realtime transcription of both sides of your meetings.**

Windows 10 / 11 · macOS (Apple Silicon, beta)

</div>

iA-ASR runs on your desktop and transcribes a meeting while it happens. Your microphone is one channel ("You") and the call audio is the other ("Them"). Each channel has its own speech-to-text engine, so you can pair a local model with a cloud service. It works with Zoom, Teams, Meet or any other app, because it listens to your audio devices: no bot joins the call.

## Features

- **Two channels, two engines.** You and Them are captured and transcribed separately, each with its own provider and its own mute.
- **Live overlay.** An always-on-top transcript window during the meeting, with a timer and mute buttons.
- **Meeting history.** Every meeting is saved with its transcript. Search, star, filter, rename and delete meetings from the dashboard.
- **Export.** Save a transcript as Markdown, SRT subtitles or JSON.
- **Recording.** Optionally keep the meeting audio and play it back next to the transcript.
- **Translation.** Translate the live transcript or a past one with OPUS-MT (offline), Microsoft, Google or DeepL.
- **Hide from screen share.** Keeps iA-ASR out of screen shares and recordings, and off the taskbar (Windows) or the Dock (macOS) while it's on.
- **Local or cloud.** Run speech recognition entirely on your computer, or use a cloud provider with your own API key.

## Speech-to-text engines

| Engine | Runs | Notes |
|---|---|---|
| Web Speech | Built in | No setup; uses the WebView's speech service |
| Windows Speech | Local | Windows only, offline |
| Whisper.cpp | Local | Downloadable Whisper models, tiny to large-v3 |
| Parakeet TDT | Local | NVIDIA Parakeet through ONNX Runtime |
| ORT Streaming | Local | Streaming transducer through ONNX Runtime |
| Sherpa-ONNX | Local | Streaming transducer in a sidecar process |
| Deepgram | Cloud | Real-time streaming, including Flux |
| Groq Whisper | Cloud | Fast Whisper with a free tier |
| Whisper API | Cloud | OpenAI Whisper |
| Azure Speech | Cloud | Azure Cognitive Services |
| Cartesia | Cloud | Real-time streaming |

## Install

**Windows 10 / 11:** run the `x64-setup.exe` installer. The installer isn't code-signed yet, so SmartScreen may warn about an unrecognized app: click **More info → Run anyway**.

**macOS (Apple Silicon, beta):** drag **iA-ASR** into **Applications**. The beta isn't notarized, so clear the quarantine flag once, then grant microphone access when asked:

```bash
xattr -cr /Applications/iA-ASR.app
```

## Quick start

1. **Choose your devices** in Settings → Audio & Devices: your microphone for You, and the output device the call plays through for Them.
2. **Choose a speech engine** in Settings → STT Providers. Web Speech works with no setup; download a local model to work offline, or add a cloud provider's API key.
3. **Start a meeting** with <kbd>Ctrl</kbd>+<kbd>M</kbd> (<kbd>⌘</kbd><kbd>M</kbd> on macOS) and press it again to end it. <kbd>Ctrl</kbd>+<kbd>B</kbd> shows or hides the overlay.

Guides: [Getting started](docs/user-guide/getting-started.md) · [Audio setup](docs/user-guide/audio-setup.md) · [Speech-to-text providers](docs/user-guide/stt-providers.md) · [Configuration](docs/user-guide/configuration.md) · [Keyboard shortcuts](docs/user-guide/keyboard-shortcuts.md) · [Troubleshooting](docs/user-guide/troubleshooting.md)

## Privacy

- **Audio stays on your computer unless you choose a cloud provider.** With a local speech engine, iA-ASR works offline.
- **Your meetings stay on your disk:** transcripts, recordings and downloaded models live in the app data folder (`%APPDATA%\com.ia-asr.desktop` on Windows, `~/Library/Application Support/com.ia-asr.desktop` on macOS).
- **API keys go to the OS credential store:** Windows Credential Manager or the macOS Keychain.
- **No telemetry or analytics.** iA-ASR only talks to the providers you configure.

## Development

iA-ASR is a [Tauri 2](https://v2.tauri.app/) app: a Rust backend (tokio) and a React 18 + TypeScript frontend.

| | Windows | macOS (Apple Silicon) |
|---|---|---|
| Toolchain | [Node.js](https://nodejs.org/) 20+, [Rust](https://rustup.rs/) stable, [WebView2](https://developer.microsoft.com/microsoft-edge/webview2/) (ships with Windows 11) | Node.js 20+, Rust stable, Xcode Command Line Tools (`xcode-select --install`) |
| Native build tools | CMake, Ninja, LLVM: `winget install Kitware.CMake Ninja-build.Ninja LLVM.LLVM` | CMake: `brew install cmake` |

```bash
git clone <repository-url> ia-asr
cd ia-asr
npm install
npx tauri dev          # run the app with hot reload
```

| Task | Command |
|---|---|
| Frontend tests (Vitest) | `npm test` |
| Rust tests | `cargo test --lib` (in `src-tauri/`) |
| Type check | `npx tsc --noEmit` |
| Windows installer and portable zip | `npm run package:portable` (on Windows; see [DEVELOPMENT.md](docs/DEVELOPMENT.md#building-for-windows)) |
| macOS app and dmg | `./build-mac.sh` |

Some features are built but switched off in this release. `src/lib/features.ts` and `src-tauri/src/features.rs` list them; turn one on in both files to bring it back.

See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for setup details, debugging and logs, and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for how the pieces fit together.

## License

Copyright (c) 2026 InfoAnalytica. All rights reserved. See [LICENSE](LICENSE).

iA-ASR includes third-party software; its licenses and required notices are in [THIRD-PARTY-NOTICES.txt](THIRD-PARTY-NOTICES.txt) and ship with every copy.

## Acknowledgements

iA-ASR is built on
[Tauri](https://tauri.app/),
[React](https://react.dev/),
[whisper.cpp](https://github.com/ggerganov/whisper.cpp) and [whisper-rs](https://github.com/tazz4843/whisper-rs),
[ONNX Runtime](https://onnxruntime.ai/) and the [`ort`](https://github.com/pykeio/ort) crate,
[sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx),
[cpal](https://github.com/RustAudio/cpal),
[rusqlite](https://github.com/rusqlite/rusqlite),
[Zustand](https://github.com/pmndrs/zustand),
[Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/),
and [OPUS-MT](https://github.com/Helsinki-NLP/Opus-MT).
