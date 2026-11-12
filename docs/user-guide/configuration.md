# Configuration

Open Settings with the gear icon on the dashboard or in the overlay, or press `Ctrl+,` (`Cmd+,` on macOS). Press `Esc` to close it. Changes are saved as you make them.

Settings has three groups:

| Group | Tabs |
|---|---|
| Meeting | Audio & Devices, Noise Presets |
| Transcription | STT Providers, Confidence, Translation |
| System | Hotkeys, General, About |

## Audio & Devices

Chooses the source device and speech-to-text provider for each channel, plus recording and echo cancellation. See [Audio Setup](audio-setup.md) for a full walkthrough.

- **Presets**: ready-made device and provider pairs, such as **Free** and **Best Quality**.
- **STT Language**: the language being spoken.
- **You** and **Them / Room** panels: **Source** and **Speech to Text** for each channel, with a live level bar.
- **Speaker Diarization**: appears with Deepgram or Azure Speech; separates speakers in in-person mode.
- **Record to file**: saves meeting audio as WAV.
- **Echo cancellation**: removes the other side's voice from your microphone. Appears when **Them** is an output device.
- **Live Monitor** and **Audio Sessions**: show which devices and apps are playing sound.

## Noise Presets

**Noise Environment** offers **Default**, **Quiet Office**, **Classroom**, **Conference Hall** and **Café / Open Space**, aimed at in-person meetings. In this build the choice is saved but doesn't change audio processing yet.

## STT Providers

Sets up each speech-to-text provider: API keys, model downloads, provider options, **Language** and **New Line Pause Duration**. See [Speech-to-Text Providers](stt-providers.md).

## Confidence

- **Highlight Low Confidence**: marks words the provider wasn't sure about in the live transcript. On by default.
- **Confidence Threshold**: words scoring below this are marked (default 70%).

## Translation

iA-ASR can translate the transcript, live or after the meeting.

**Provider.** Choose one: **OPUS-MT** (local, offline) under **Local & Offline**, or **Microsoft Translator**, **Google Translate** or **DeepL** under **Cloud Providers**. Then:

- **OPUS-MT**: download a language pair and activate it.
- **Cloud providers**: paste the key under **API Key** and click **Save & Test**. Microsoft Translator also needs an **Azure Region**. **Get a free API key** links to the provider's sign-up page.
- Click **Set _provider_ as Active Translation Provider**.

**Language.**

- **Target Language**: the language to translate into.
- **Source Language**: **Auto-detect (recommended)**, or the language being spoken.

**Behavior.**

- **Select-to-translate toolbar**: shows a **Translate** button when you select text in a transcript.
- **Show translations in post-meeting review**: shows the translation toolbar and saved translations when you open a past meeting.
- **Cache translations**: keeps translated text so the same text isn't translated twice.

**Using translation.**

- **During a meeting**: click **Translate** in the overlay header to translate new lines as they arrive. Choose **Inline** (under each line) or **Hover** (on mouse-over). **Translate All** translates the lines already in the transcript.
- **After a meeting**: open the meeting, hover over a line and click **Translate to** the target language. The bar at the bottom shows how many lines are translated, switches between **Inline** and **Hover**, and hides or shows translations. If you change the target language, a button retranslates the lines that are in the old language.

## Hotkeys

Change the global shortcuts: **Start / End Meeting**, **Show / Hide Overlay**, **Open Settings** and **Hide from screen share**. Click a shortcut, then press the new combination (it needs Ctrl, Alt or the Windows key; Cmd, Option or Control on macOS). Escape cancels. A combination another action already uses is refused. The new key works at once, and **Reset to Defaults** puts all of them back.

Below them, **During a meeting** lists the in-meeting keys, which can't be changed. See [Keyboard Shortcuts](keyboard-shortcuts.md).

## General

- **Theme**: **Light** (the default), **Dark** or **System**.
- **Hide from screen share**: keeps every iA-ASR window out of screen sharing, recordings and screenshots (Zoom, Teams, Meet, OBS and others) while it stays on your screen. While it's on, iA-ASR also has no taskbar button (Windows) or Dock icon (macOS); use the tray icon or `Ctrl+B` to get back to it. Requires Windows 10 version 2004 or later. On macOS 14 and later, some recorders that use ScreenCaptureKit can still capture the windows.
  - **Shortcut**: the key combination that turns it on and off from any app. The default is `Ctrl+Shift+H` (`Cmd+Shift+H` on macOS). Click it to record a new one.
- **Start on Login**: when on, iA-ASR starts a meeting as soon as the dashboard opens. It doesn't add iA-ASR to your system's startup apps.
- **Overlay Transparency**: how see-through the overlay background is. The eye button in the overlay header also cycles through levels.

**Data Directory** is shown, but in this build meetings and recordings always stay in the app data folder (see below).

## About

Shows the version and build details, and **Diagnostics**:

- **Open log folder** and **Copy recent log**: for sharing a log when you report a problem. See [Troubleshooting](troubleshooting.md#collecting-logs).
- **Verbose logging**: records more detail while you reproduce a problem. Turn it off afterwards.

## Where iA-ASR keeps your data

| | Windows | macOS |
|---|---|---|
| Meetings, transcripts, downloaded models, recordings | `%APPDATA%\com.ia-asr.desktop\` | `~/Library/Application Support/com.ia-asr.desktop/` |
| Log files | `%LOCALAPPDATA%\com.ia-asr.desktop\logs\` | `~/Library/Logs/com.ia-asr.desktop/` |
| API keys | Windows Credential Manager | Keychain |

API keys are never written to settings files or the meeting database.
