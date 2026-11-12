# Getting Started with iA-ASR

iA-ASR transcribes both sides of a meeting in real time. It captures two channels:

- **You**: your microphone.
- **Them**: the audio your computer plays, which is the other people on the call.

Each channel has its own speech-to-text (STT) provider and its own mute. iA-ASR listens to your audio devices, so it works with Zoom, Teams, Meet or any other app, and no bot joins the call.

## System requirements

- **Windows 10 or 11** (64-bit). **Hide from screen share** needs Windows 10 version 2004 or later.
- **macOS on Apple Silicon** (beta). Capturing the other side's audio needs macOS 14.2 or later.
- A microphone.
- An internet connection for cloud STT providers. Local providers work offline once their model is downloaded, but use more CPU and memory.

## Install

### Windows

1. Run the `x64-setup.exe` installer you were given. It installs for your user account only, so it doesn't need administrator rights.
2. The installer isn't code-signed yet, so Windows SmartScreen may show "Windows protected your PC". Click **More info**, then **Run anyway**.

### macOS (beta)

1. Drag **iA-ASR** into **Applications**.
2. The beta isn't notarized. Clear the quarantine flag once in Terminal:
   ```bash
   xattr -cr /Applications/iA-ASR.app
   ```
3. When macOS asks, allow microphone and system audio recording access. You can change both later in **System Settings > Privacy & Security**.

To build iA-ASR from source instead, see [DEVELOPMENT.md](../DEVELOPMENT.md).

## First launch

A short setup wizard opens with four steps: **Welcome**, **Audio**, **STT** and **Ready**.

- **Audio**: choose the source for each channel. **Smart Detect Sources** scans your devices and suggests a microphone for You and an output for Them.
- **STT**: choose a speech-to-text provider for each channel.
- **Ready**: click **Start Meeting** to begin right away, or **Go to Launcher** to open the dashboard.

You can change every choice later in Settings, so it's fine to click **Skip**.

iA-ASR keeps running in the system tray (the menu bar on macOS). Closing the dashboard window hides iA-ASR instead of quitting; use **Quit iA-ASR** in the tray menu to exit.

## Set up audio and transcription

1. Open Settings with the gear icon or `Ctrl+,` (`Cmd+,` on macOS), then choose **Audio & Devices**.
2. In the **You** panel, set **Source** to your microphone.
3. In the **Them** panel, set **Source** to the output device your meeting app plays through (under **Speakers / Output**).
4. For each panel, pick a provider under **Speech to Text**.

For a free setup, click the **Free** preset at the top of **Audio & Devices**. It uses Web Speech for you and Parakeet TDT for the other side. Parakeet TDT is a local model: download it first in **Settings > STT Providers > Parakeet TDT**.

To use a cloud provider such as Deepgram, open **Settings > STT Providers**, select the provider, paste your API key and click **Save & Test**.

More detail: [Audio Setup](audio-setup.md) and [Speech-to-Text Providers](stt-providers.md).

## Run a meeting

1. Click **Start Meeting** on the dashboard. In the dialog:
   - **Online** (mic + system audio) transcribes you and the other side separately.
   - **In-Person** (mic only, shared room) transcribes everyone through one room microphone.
   - **Record Audio** saves the meeting audio so you can play it back later.
   - **Remember these settings for next time** shows your saved choices with a single **Start Meeting** button next time. Click **Change settings** to pick again, or **Forget** to clear them.
2. Click **Start Meeting**. `Ctrl+M` (`Cmd+M` on macOS) also starts a meeting, without the dialog, using the audio mode you used last.
3. The overlay window opens and stays on top of other windows. It shows the live transcript of both channels, a timer, and buttons to mute you or them, translate, open the Dev Log, hide iA-ASR from screen share, change transparency, open Settings and minimize.
4. To end the meeting, click **End** in the overlay or press `Ctrl+M` again. The meeting is saved automatically.

Muting a channel stops its transcription. It doesn't stop the recording.

## Review past meetings

The dashboard lists your meetings on the left. Use **Search meetings...** to find one, and the filters **All**, **Starred**, **Online** and **In-Person** to narrow the list. Hover over a meeting to star, rename or delete it.

Click a meeting to open its **Transcript**:

- `Ctrl+F` searches the transcript.
- **Duration**, **Words** and **Pace** appear under the title. **Words** counts each Chinese character and Japanese kana separately, since those languages don't put spaces between words. Other text, including Korean, is counted by whitespace-separated words.
- Hover over a line and click **Translate to** a language to translate it. See [Configuration](configuration.md#translation).
- If the meeting was recorded, a player at the bottom plays the audio.
- **Export** saves the transcript as **Markdown**, **SRT Subtitles** or **JSON**.

## Next steps

- [Audio Setup](audio-setup.md): devices, system audio capture and echo
- [Speech-to-Text Providers](stt-providers.md): choosing and setting up providers
- [Configuration](configuration.md): every Settings tab
- [Keyboard Shortcuts](keyboard-shortcuts.md)
- [Troubleshooting](troubleshooting.md)
