# Audio Setup

iA-ASR captures two audio channels and transcribes each one separately. This guide covers choosing devices, how system audio capture works, and fixing common audio problems.

## How the two channels work

- **You**: your microphone.
- **Them**: the audio playing through an output device (WASAPI loopback on Windows, a Core Audio tap on macOS 14.2 and later). This is the other people on the call.

Each channel has its own source device, speech-to-text provider, mute button and level meter. Keeping them apart gives clean "You" and "Them" lines in the transcript.

## Choose your devices

Open **Settings > Audio & Devices**. The page has a **You** panel and a **Them / Room** panel.

1. In **You**, set **Source** to your microphone (under **Microphones**).
2. In **Them**, set **Source** to the output device your meeting app plays through (under **Speakers / Output**). If you're not sure, use the device that's marked **(Default)**, or the headset you hear the call in.
3. Under **Speech to Text** in each panel, pick a provider. See [Speech-to-Text Providers](stt-providers.md).
4. Check the level bar under each **Source**: it should move when you speak, and when the other side speaks or any sound plays.

Other parts of the page:

- **Presets** apply a ready-made pair of devices and providers in one click. **Free** uses Web Speech for you and Parakeet TDT for the other side (download the Parakeet TDT model first). **Best Quality** uses Deepgram for the other side and needs a Deepgram API key.
- **STT Language** sets the language you speak. It's the same setting as **Language** in **STT Providers**.
- **Live Monitor** shows the level of every input and output device at once. Use it to find which device is actually receiving sound. The refresh button reloads the device list after you plug something in.
- **Audio Sessions** lists apps that are playing audio. Click **Use** next to one to set the **Them** source to the device that app plays through.
- **Record to file** saves meeting audio as a WAV file. You can also turn recording on in the **Start Meeting** dialog (**Record Audio**).

Any audio interface can appear twice, once as an input and once as an output with the same name. Pick the input for **You** and the output for **Them**.

## System audio capture

iA-ASR records whatever plays through the **Them** output device: Zoom, Teams, Meet, a browser, or any other app. No virtual audio cable is needed.

- **Windows 10 and 11**: native WASAPI loopback.
- **macOS 14.2 and later**: a native Core Audio tap on the selected output. Allow iA-ASR to record system audio in **System Settings > Privacy & Security**, and reopen iA-ASR if macOS asks you to.
- **Older macOS**: capturing an output isn't available. You can select a virtual loopback device that appears as an input instead.

Headphones work fine: iA-ASR captures the audio stream itself, not the sound in the room.

## Echo cancellation

If you use speakers, your microphone also hears the other side, and their words can show up under "You". **Echo cancellation** (in **Audio & Devices**, on by default) removes the sound played through the **Them** output from your microphone before it's transcribed. It only appears when **Them** is an output device.

Headphones avoid the problem entirely and are the most reliable fix.

## In-person meetings

Choose **In-Person** in the **Start Meeting** dialog when everyone is in one room. iA-ASR then transcribes the room through the **Them / Room** channel and doesn't start a "You" provider at all.

1. In **Audio & Devices**, set the **Them / Room** source to the microphone that hears the room.
2. Pick a provider for **Them / Room**.

With Deepgram or Azure Speech, a **Speaker Diarization** switch appears. It separates speakers in in-person mode.

## Transcription on macOS

Audio capture and speech recognition are separate. Choose a provider for each channel:

- **Parakeet TDT** (local): download the model once in **STT Providers**, then select it for both You and Them. It needs no API key.
- **Cloud providers**: add the API key in **STT Providers** before you start a meeting.
- **Web Speech** depends on the system's speech service and may fail with `service-not-allowed` on macOS.

## Recording

When recording is on, iA-ASR saves the meeting audio as WAV in the `recordings` folder of the app data directory:

- Windows: `%APPDATA%\com.ia-asr.desktop\recordings\`
- macOS: `~/Library/Application Support/com.ia-asr.desktop/recordings/`

Open the meeting from the dashboard to play it back next to the transcript. Muting a channel stops its transcription but not the recording.

## Common problems

### "Them" shows no sound

1. Make sure the **Them** source is the device your meeting app plays through. Check the app's own audio settings, and **Settings > System > Sound** (Windows) or **System Settings > Sound > Output** (macOS).
2. Look at **Live Monitor** or **Audio Sessions** to see which device the call is playing on.
3. On macOS, check the system audio recording permission in **System Settings > Privacy & Security**.
4. If a meeting fails to start capture, read the error message. iA-ASR doesn't silently switch to the microphone when an output can't be opened.

### Your microphone is too quiet

1. Raise the input volume in **Settings > System > Sound > Input** (Windows) or **System Settings > Sound > Input** (macOS).
2. If the volume is already at maximum, check the microphone's own gain control.
3. Move closer to the microphone, or use a headset.

### The other side appears under "You", or you appear under "Them"

- Keep **Echo cancellation** on.
- Use headphones.
- Make sure **You** is an input and **Them** is an output. Choosing the same microphone for both duplicates every line.
- Turn on echo cancellation in your meeting app as well.

### Wrong device after plugging something in

Windows and macOS can change the default device when you connect a headset. Open **Audio & Devices**, click the refresh button in **Live Monitor**, and check both sources again.

### Audio stops during long meetings

- Stop the computer from sleeping during the meeting.
- For USB audio devices on Windows, turn off USB selective suspend in Power Options.
- If capture doesn't recover, end the meeting and start a new one.

## Tips

- Check both level bars before an important meeting.
- Use headphones on calls.
- Mute a channel when you want to pause its transcription without ending the meeting.

## Next steps

- [Speech-to-Text Providers](stt-providers.md): choose a provider for each channel
- [Troubleshooting](troubleshooting.md): transcription, overlay and log collection
