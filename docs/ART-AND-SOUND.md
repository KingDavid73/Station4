# Story-coherence pass

The machines' purpose stays unnamed. Their retirement causes no external
emergency. The modern technician is competent, not a villain; he preserves the
notes, follows the assessment, and simply does not read the old room's music.
The old technician's sacrifice and outcome are fixed. Choices alter how he
remembers people, labor, and habits, not which machine survives.

## Original procedural sound design

`src/engine/audio.ts` uses Web Audio oscillators, filtered deterministic noise,
soft envelopes, and stereo panning. No external music, voices, cloned voices,
or generated speech are used. Existing CC0 recordings are limited to physical
actions (clicks, screws, moving components, bleeding a line).

| Machine | Approximate heard syllables | Mechanical sources |
| --- | --- | --- |
| Jerry | `[dʒ · ɛɹː · i]` | Gate chuff, rough bearing/capstan, index tone |
| Mike | `[mː · aɪ · k]` | Transformer, sweeping oscillator, dry timing contact |
| Linda | `[lɪ · nː · də̤]` | Intake whistle, fan drone, soft valve release |

These are perceptual associations, not acoustically synthesized human phonemes.
Mike's fault removes the last contact: `[mː · aɪ …]`. Circle and square are
separate indicators: absence of an ordinary fault does not establish perfect
agreement. The old room's onsets drift; the night scene aligns the surviving
parts to one measure, with a quiet harmonic underpinning. Jerry stays silent
after donation. There is no victory cue. Shutdown fades scheduled nodes as well
as preventing subsequent cycles. Mute covers samples and synthesis.

## Graphics

- Existing old room, desk, cabinet and character art is retained.
- Reel layers now use circular CSS windows onto the actual cabinet artwork,
  rather than unrelated translucent wheel illustrations. Overlay coordinates
  use each image's natural aspect ratio.
- Modern room/operator assets were reused from `assets/generated/modern-station`.
- Retirement cake/cups reuse cells of the existing final-day prop sheet.
- `public/assets/station4/timing-panel-v1.png` is a new built-in imagegen asset,
  generated with `public/assets/station4/mainframe-b.png` as a visual reference.
  Original preserved in the Codex generated-images directory; copied into the
  project. No API key or external image API was used.

### Timing panel prompt

Create a game asset: close-up front view of the timing control panel from the
reference vintage industrial mainframe. Match its painterly muted brown
oxidized steel, warm dim amber lamps, worn screw heads, theatrical chiaroscuro,
slightly simplified geometry. Landscape 3:2 composition, panel fills frame,
dark surround. Three rows of old removable timing cards on left, two prominent
UNLIT indicator windows at upper right: one square lens and one round lens,
dark smoked glass; keep these at horizontal positions 72 percent and 84 percent
and vertical 27 percent of image so game can overlay red square and green circle.
Small analog timing meter and adjustment knob below, cable sockets, pencil wear
but no legible words or labels. No people, no glowing red or green, no modern
screen. Purpose remains unknowable. This is a new detailed close-up of the
middle machine, not a whole cabinet.

Actual generated lens coordinates differ from the requested positions. CSS was
aligned to the inspected result, not the prompt's proposed coordinates.
