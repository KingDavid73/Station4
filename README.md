# Station 4

A browser-first, single-screen interactive stage play about a technician's
last shifts in an old machine room. A complete first-draft arc is playable:
day 9,997, the recurring red square on day 9,998, a modern-station interlude,
day 10,000's retirement, unattended 4 AM harmony, and the successor's day 1.

## Run it

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local address Vite prints. A production build is generated with:

```powershell
npm.cmd run build
```

The contents of `dist/` are a standalone static web game. They can be hosted as
a website or wrapped later with Tauri for Windows/macOS/Linux app packaging.

## Structure

- `src/engine/` — reusable stage, dialogue, choice-memory, movement, and audio
- `src/content/sceneOne.ts` — all authored content and hotspot layout for scene 1
- `src/content/sceneTwo.ts` — daily fault, modernization, remembered answers
- `src/content/laterScenes.ts` — modern room, retirement, and epilogue
- `src/content/voice.ts` — shared layout and authoring helpers
- `src/engine/machines.ts` — machine names, approximate IPA, physical sound mapping
- `public/assets/station4/` — staged artwork
- `public/audio/` — local CC0 sound palette and source record

Choices store interpretations of the technician's past. They do not gate or
branch scene events. Each answer gets a several-line local response; selected
interpretations are recalled on later shifts. Visit order is free. Jerry is
always the donor, and the conclusion never changes.

## Sound and artwork

Headphones help with the quiet, spatially separated machine voices. The original
Web Audio score grows out of motors, gates, fan noise, and timing contacts, rather
than human speech or a conventional music track. IPA is an approximate rendering
of perceived syllables, not a literal transcription of spoken names. Mike's
missing final contact is omitted in both notation and sound; clearing the square
does not turn on the circle. At 4 AM, the surviving pair agree and Jerry's silence
becomes part of the measure. The green circle has no congratulatory text.

Existing CC0 effects remain in use for hand actions. Their sources are recorded
in `public/audio/SOURCES.md`. See `docs/ART-AND-SOUND.md` for asset provenance and
the timing-panel generation prompt. Noto Serif is used directly for IPA.

Run `npm.cmd test` and `npm.cmd run build` for content invariants and a production
build. The ending is still a first draft; the synthesized voices and reused
character sprites are intended for further art/audio direction, not realism.
