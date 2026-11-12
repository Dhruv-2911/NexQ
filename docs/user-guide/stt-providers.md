# Speech-to-Text Providers

iA-ASR turns speech into text with a speech-to-text (STT) provider. Each channel ("You" and "Them") uses its own provider, so you can pair a free local model with a cloud service.

- **Set up providers** in **Settings > STT Providers**: API keys, model downloads and provider options.
- **Choose a provider for each channel** in **Settings > Audio & Devices**, under **Speech to Text** in the **You** and **Them** panels. During a meeting you can also click the You or Them provider in the status bar at the bottom of the window to switch.

Selecting a provider card in **STT Providers** also makes it the "You" provider. Check **Audio & Devices** afterwards if you meant to set it up for "Them".

## Provider overview

| Provider | Type | Needs | Notes |
|---|---|---|---|
| Web Speech | Built in | Nothing | Free. Works only with a microphone source, so it can't transcribe call audio. May fail on macOS. |
| Windows Speech | Built in (Windows) | Nothing | Free and offline. Works only with a microphone source, so it can't transcribe call audio. |
| Sherpa-ONNX | Local | Model download | Streaming and offline. |
| ORT Streaming | Local | Model download | Streaming and offline, GPU-accelerated. |
| Parakeet TDT | Local | Model download | The most accurate local option; multilingual. |
| Whisper.cpp | Local | Model download | Marked "Batch mode only": it isn't offered for live transcription. |
| Deepgram | Cloud | API key | Real-time streaming, high accuracy. |
| Groq Whisper | Cloud | API key | Fast Whisper with a free tier. |
| Whisper API | Cloud | OpenAI API key | OpenAI's hosted Whisper. |
| Azure Speech | Cloud | API key and region | Many languages. |
| Cartesia | Cloud | API key | Each line ends where the speaker finishes a thought. English, French, Hindi, Japanese, Spanish. |

Web Speech and Windows Speech can serve only one channel at a time. If you pick one for the second channel, it moves there and the first channel falls back to another available provider.

## Which one to choose

- **No setup**: Web Speech for "You". For "Them", use a local model or a cloud provider.
- **Free and private**: Parakeet TDT for both channels. The **Free** preset in **Audio & Devices** uses Web Speech for you and Parakeet TDT for the other side.
- **Best accuracy**: Deepgram (Nova 3) for "Them". The **Best Quality** preset sets this up.
- **Offline**: any local provider (Sherpa-ONNX, ORT Streaming, Parakeet TDT) once its model is downloaded.

Local models run on your computer and use noticeable CPU and memory. Cloud providers send audio to the provider and charge by usage, though some have free tiers.

## Local models

1. Open **Settings > STT Providers** and select **Sherpa-ONNX**, **ORT Streaming** or **Parakeet TDT**.
2. In the models panel, click **Download** next to a model. The first model you download becomes the active one; click **Activate** to switch to another.
3. Click **Test Connection** to check the provider.
4. Select the provider for a channel in **Audio & Devices**.

Parakeet TDT models:

- **Parakeet TDT 0.6B v3**: the most accurate, multilingual.
- **Parakeet CTC 110M**: smaller and faster, English only.

Parakeet TDT writes a line after a pause, or every 20 seconds or so of continuous speech. Processing adds a short delay, so an active level meter doesn't mean text will appear immediately.

## Cloud providers

1. Open **Settings > STT Providers** and select the provider.
2. Paste your API key and click **Save & Test**. The key is saved only if the test succeeds.
3. For **Azure Speech**, also enter your **Azure Region** (for example `eastus`).
4. Select the provider for a channel in **Audio & Devices**.

To remove a stored key, click **Clear**. Keys are kept in the operating system's credential store (Windows Credential Manager or the macOS Keychain), never in settings files.

| Provider | Where to get a key |
|---|---|
| Deepgram | [console.deepgram.com](https://console.deepgram.com) |
| Groq Whisper | [console.groq.com](https://console.groq.com) |
| Whisper API | [platform.openai.com](https://platform.openai.com) |
| Azure Speech | [portal.azure.com](https://portal.azure.com) (a Speech resource) |
| Cartesia | [play.cartesia.ai/keys](https://play.cartesia.ai/keys) |

### Deepgram

Deepgram's settings appear in **STT Providers** when it's selected:

- **Presets**: Default, Low Latency, High Accuracy, Meeting, Economy.
- **Model**: Nova 3 is the most accurate. **Flux** (English) and **Flux Multilingual** (English, Spanish, French, German, Hindi, Russian, Portuguese, Japanese, Italian and Dutch) detect when a speaker has finished, so a line ends at the end of each turn.
- **Features**: Smart Format, Interim Results, Punctuation, VAD Events, and **Endpointing** (the silence threshold).
- **Advanced Settings**: Tell remote speakers apart, Numerals, Profanity Filter, Dictation, Keyterm Prompting (words Deepgram should listen for, such as names and product terms).

Notes on Flux:

- Flux doesn't tell speakers apart, so in-person meetings show a single speaker.
- iA-ASR streams silence to Flux, which needs it to hear where a turn ends, so quiet time counts toward your Deepgram usage. Muting a channel closes its Flux stream, so muted time costs nothing.

### Groq Whisper

Choose **Whisper Large v3** or **Whisper Large v3 Turbo**, a preset (Default, Low Latency, High Accuracy, Verbose), and the **Batch Duration** (how much audio is collected before each request). **Advanced Settings** has Temperature, Response Format, Timestamp Granularities and Prompt.

### Cartesia

Cartesia's ink-2 model decides where each turn ends from what is being said, not only from pauses. There's nothing else to configure.

- It transcribes English, French, Hindi, Japanese and Spanish, and detects which one is spoken. **STT Providers** shows a warning if your selected language isn't one of them.
- Cartesia bills every second of audio it receives while a channel is unmuted, silence included: about 3 credits per second for each channel that uses it. Muting a channel closes its Cartesia stream, so muted time costs nothing.
- To halve the cost, use Cartesia for "Them" only and another provider for "You".

## Language

Set the language in **STT Providers > Language** (also shown as **STT Language** in **Audio & Devices**). Choose a provider and model that support it:

- **Vietnamese**: Deepgram Nova 3 or Azure Speech. The included Parakeet models don't support Vietnamese.
- **Russian and other non-English languages on Parakeet**: use Parakeet TDT 0.6B v3, not Parakeet CTC 110M.

A language change takes effect when the provider reconnects, so start a new meeting after changing it.

## New lines

**New Line Pause Duration** in **STT Providers** starts a new transcript line after this much silence (0.5 to 5.0 seconds). Lower values give more, shorter lines; higher values give longer paragraphs. It applies to all providers.

## Translation providers

Translation is separate from transcription. Choose a translation provider in **Settings > Translation**:

| Provider | Type | Needs |
|---|---|---|
| OPUS-MT | Local, offline | A model download for each language pair |
| Microsoft Translator | Cloud | API key and **Azure Region** |
| Google Translate | Cloud | API key |
| DeepL | Cloud | API key |

For OPUS-MT, download and activate a language pair. For a cloud provider, paste the key and click **Save & Test**. Then click **Set _provider_ as Active Translation Provider**. See [Configuration](configuration.md#translation) for languages and display options.

## Next steps

- [Audio Setup](audio-setup.md): devices for each channel
- [Configuration](configuration.md): every Settings tab
- [Troubleshooting](troubleshooting.md#transcription-problems): when no text appears
