# Troubleshooting

Common problems and how to fix them. For setup details, see [Audio Setup](audio-setup.md) and [Speech-to-Text Providers](stt-providers.md).

Reporting a problem? Start with [Collecting logs](#collecting-logs).

## Installation

### Windows SmartScreen warning

Windows shows "Windows protected your PC" because the installer isn't code-signed yet. Click **More info**, then **Run anyway**.

### The installer doesn't start

- Make sure you're on 64-bit Windows 10 or 11.
- Check whether antivirus software blocked the installer.

### macOS says the app is damaged or can't be opened

The beta isn't notarized. Clear the quarantine flag once in Terminal, then open iA-ASR again:

```bash
xattr -cr /Applications/iA-ASR.app
```

## Audio

### Level meters don't move

1. Open **Settings > Audio & Devices** and check the **Source** for **You** and **Them**.
2. Watch **Live Monitor** to see which device actually receives sound.
3. Check that iA-ASR may use the microphone: **Settings > Privacy & security > Microphone** (Windows) or **System Settings > Privacy & Security** (macOS).
4. Check that neither channel is muted in the overlay.
5. End the meeting and start a new one to restart audio capture.

### No sound from the other side ("Them")

1. The **Them** source must be the output device your meeting app plays through. Check the meeting app's audio settings.
2. Make sure sound is actually playing on that device. **Audio Sessions** in **Audio & Devices** lists the apps playing audio; click **Use** to select the device one of them plays through.
3. On macOS 14.2 and later, allow system audio recording in **System Settings > Privacy & Security**. Older macOS versions can't capture an output device.
4. Try another output device if one doesn't work with loopback capture.

More fixes: [Audio Setup](audio-setup.md#common-problems).

### The other side's words appear under "You"

- Keep **Echo cancellation** on in **Audio & Devices** (on by default). It works when **Them** is an output device.
- Use headphones.
- Make sure **You** and **Them** use different devices: an input for You and an output for Them.

## Transcription problems

### No text appears

If a channel has had about 30 seconds of audio and no text, the overlay shows "No transcript from You" (or Them) with **Open Dev Log** and **Change provider** buttons.

1. **Don't use Web Speech or Windows Speech for "Them".** They only listen to a microphone and can't transcribe call audio. Use Parakeet TDT, Deepgram, Groq Whisper or another provider for the other side.
2. **Check the provider.** In **Settings > STT Providers**, select it and click **Test Connection** (local providers) or **Save & Test** (cloud providers).
3. **Local providers:** make sure a model is downloaded and active.
4. **Cloud providers:** check that the API key is valid, the account has credit, and your internet connection is stable.
5. **Rule out the audio:** switch "You" to Web Speech for a moment. If Web Speech works and your provider doesn't, the problem is the provider's setup.
6. **Read the Dev Log:** press `Ctrl+Shift+L` in the overlay, or click its terminal icon, to see STT connection messages and errors.

### Web Speech stops mid-meeting

- Web Speech can end its session on its own. End the meeting and start a new one.
- Don't change the "You" provider or device in the middle of a meeting while it uses Web Speech.
- Web Speech may need an internet connection, depending on the system. On macOS it may fail with `service-not-allowed`; use another provider there.

### Wrong language or poor accuracy in a language

- Set the language in **Settings > STT Providers > Language**, and choose a provider and model that support it (see [Language](stt-providers.md#language)).
- A language change applies when the provider reconnects: start a new meeting.

### Cartesia problems

- **Wrong words**: Cartesia transcribes only English, French, Hindi, Japanese and Spanish. **STT Providers** warns when the selected language isn't supported.
- **"Reconnecting" in the Dev Log**: if the connection drops, iA-ASR reconnects on its own (after 1, 2, 4 and 8 seconds, then every 15 seconds) and keeps the sentence in progress. Speech while offline isn't transcribed.
- **"Cartesia refused the API key or account"**: iA-ASR stops retrying. Check the key in **STT Providers** and your balance at [play.cartesia.ai](https://play.cartesia.ai/usage).
- **More credits than expected**: Cartesia bills every second of audio while a channel is unmuted, silence included. One channel uses about 10,800 credits per hour; both channels use about 21,600. Muting a channel closes its stream, so muted time costs nothing. In-person meetings don't start a "You" provider, so "You" uses no credits.

### Local models are slow or inaccurate

- Use Parakeet TDT 0.6B v3 for the best local accuracy, or Parakeet CTC 110M (English only) for speed.
- Parakeet TDT writes a line after a pause, or every 20 seconds or so of continuous speech, so some delay is normal.
- Close other CPU-heavy apps, or switch to a cloud provider.

## Overlay and windows

### The overlay doesn't appear

1. The overlay only appears during a meeting. Press `Ctrl+M` to start one.
2. Press `Ctrl+B` to bring it to the front.
3. Click the tray icon: during a meeting it brings back the overlay.

### I can't find iA-ASR

Closing the dashboard window hides iA-ASR rather than quitting it. With **Hide from screen share** on, it also has no taskbar button (Windows) or Dock icon (macOS). Click the tray icon (the menu bar on macOS), or press `Ctrl+B`.

### The overlay doesn't stay on top

The overlay is always on top, but some full-screen apps cover it. Run the meeting app in a window instead of full screen.

### The overlay is hard to read

Raise **Overlay Transparency** in **Settings > General**, or click the eye button in the overlay header.

## Translation

- **Nothing is translated**: check the active provider in **Settings > Translation**. Cloud providers need a key that passed **Save & Test**; OPUS-MT needs a downloaded, active language pair.
- **Past meetings show no translations**: turn on **Show translations in post-meeting review** in **Settings > Translation**.

## Performance

- **High CPU**: local speech-to-text models are the usual cause. Use a smaller model or a cloud provider.
- **Memory grows during very long meetings**: the transcript is kept in memory while the meeting runs. For sessions of several hours, end the meeting and start a new one now and then.

## Collecting logs

iA-ASR writes a log file on your computer. It records what the app did: audio devices opened, STT connections, errors, and how many transcript lines each side produced. It never contains your transcript text, and API keys are removed automatically.

### Copy the recent log

1. Open **Settings > About > Diagnostics**.
2. Click **Copy recent log** (the last 400 lines) and paste it into your report.

### Send the whole file

Click **Open log folder** in the same section and attach `ia-asr.log`. The folder is:

| Windows | macOS |
|---|---|
| `%LOCALAPPDATA%\com.ia-asr.desktop\logs\` | `~/Library/Logs/com.ia-asr.desktop/` |

Older logs are kept as `ia-asr.1.log` to `ia-asr.4.log`; each file is at most 4 MB.

### For hard-to-reproduce problems

1. Turn on **Verbose logging** in **Settings > About > Diagnostics**.
2. Reproduce the problem, for example by starting a meeting and talking for 30 seconds.
3. Copy the recent log or attach `ia-asr.log`, then turn verbose logging off again.

### During a meeting

The **Dev Log** shows the same STT and audio messages live: press `Ctrl+Shift+L` in the overlay, or click its terminal icon. A screenshot of it also helps.

Read a log before sharing it: file names, device names and provider error messages can appear in it.

## Where your data is

| | Windows | macOS |
|---|---|---|
| Meetings, transcripts, downloaded models, recordings | `%APPDATA%\com.ia-asr.desktop\` | `~/Library/Application Support/com.ia-asr.desktop/` |
| API keys | Windows Credential Manager | Keychain |

## More help

- [Getting Started](getting-started.md)
- [Audio Setup](audio-setup.md)
- [Speech-to-Text Providers](stt-providers.md)
- [Configuration](configuration.md)
- [Keyboard Shortcuts](keyboard-shortcuts.md)
