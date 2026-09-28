# Station 4

A browser-first, single-screen interactive stage play. This baseline contains
the engine and the complete first scene: a midday maintenance round through an
old machine room.

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
- `public/assets/station4/` — staged artwork
- `public/audio/` — local CC0 sound palette and source record

Choices store interpretations of the technician's past. They do not gate or
branch scene events.
