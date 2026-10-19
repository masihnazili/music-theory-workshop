# Harmony Workshop · کارگاه هارمونی

Learn harmony and music theory through **hands-on practice**, Duolingo-style, using **piano** or **guitar**.

> A standalone HTML app with no server, complicated build process, or user account required. Your progress is stored locally in your browser.

## Languages

The app supports Persian and English. Use the language toggle in the app header to switch languages. Your choice is stored in `localStorage` under `hw-lang`. On your first visit, the app defaults to your browser's language.

## Features

- **10 units, 52 lessons, and over 560 exercises**, covering topics from notes and intervals to ii–V–I, secondary dominants, altered chords, key changes, and negative harmony.
- Simple, visual lessons with examples, piano-key visualizations, and guitar chord diagrams.
- Hands-on instrument practice for all 52 lessons, with separate piano and guitar paths.
- Microphone-based pitch detection using [Pitchy](https://github.com/ianprime0509/pitchy) and a built-in detector.
- MIDI controller support through Web MIDI in Chrome and Edge.
- **Piano Workshop** with 12 interactive lessons, sight-reading, and rhythm assessment.
- XP, daily streaks, mistake review, a placement test, and light and dark themes.
- Progress backup in JSON or text format and offline support through a Progressive Web App (PWA).

## Getting Started

```bash
git clone https://github.com/masihnazili/music-theory-workshop.git
cd music-theory-workshop
python3 -m http.server 8000
```

Open `http://localhost:8000` in your browser.

You can also open `index.html` directly. However, microphone access, MIDI, and offline features require the app to run over `https://` or `localhost`.

## Project Structure

```text
index.html            Generated build output and published file
src/template.html     Page template
src/style.css         Styles
src/app.js            Theory engine, lesson content, UI, audio, and Piano Workshop
src/practice.js       Instrument practice and guitar chord shapes
build.py              Builds index.html from src/
sw.js, manifest.*     PWA and offline support
tests/smoke.js        Playwright smoke test
docs/CONTENT.md       Guide to authoring lessons and exercises
```

After changing files in `src/`, rebuild and test the project:

```bash
python3 build.py
npm install
npm test
```

Run `npm install` only when dependencies need to be installed.

## GitHub Pages Deployment

The workflow in `.github/workflows/pages.yml` runs tests and deploys the site whenever changes are pushed to the `main` branch.

In your repository settings, select:

**Settings → Pages → Source → GitHub Actions**

## External Dependencies

| Resource | Source | License |
|---|---|---|
| Vazirmatn and JetBrains Mono fonts | Google Fonts | SIL OFL |
| Pitchy pitch-detection library | jsDelivr | 0BSD |
| Salamander Grand Piano v3 samples | tonejs.github.io / jsDelivr | CC BY 3.0 |

If Pitchy fails to load, the app falls back to its built-in pitch detector. If the piano samples are unavailable, a simpler synthesized sound is used instead.

## Known Limitations

- The microphone detector is monophonic. To identify chord notes, play them separately as an arpeggio.
- Precise rhythm assessment with a physical instrument, including audio latency, has not yet been fully tested.
- Progress is stored only in the current browser. Use the backup feature to transfer it elsewhere.
- `src/app.js` is large; splitting it into smaller modules is on the roadmap.

## Roadmap

- Simultaneous chord recognition using chroma features and FFT.
- Rhythm exercises with user taps and timing-accuracy measurement.
- Spaced repetition through a “Review Today” feature.
- Split `app.js` into content, engine, and UI modules.

## License

The project code is released under the MIT License; see `LICENSE`. The lesson content is original and is not copied from any specific book.

---

**[صفحهٔ فارسی · Persian Documentation](README.fa.md) · [Main README](README.md)**

## ❤️ Support Harmony Workshop

If Harmony Workshop helps you learn music, consider supporting its continued development and improvement. You can contribute using **USDT or Gram on the TON network**.

**TON Wallet Address:** `UQC526RDQM9f71hT7z2YJ8HD3Y7wUG-P8o3XwokWirLCYQPV`

> Please make sure you select the TON network and verify that the asset is supported by the receiving wallet before sending.
