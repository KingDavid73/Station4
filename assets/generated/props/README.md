# Station 4 prop atlases

Two 4×4 transparent PNG atlases generated for the browser stage engine. Each
sprite occupies one quarter of the atlas width and height. Rows and columns are
zero-indexed below.

## `station4-workroom-props.png`

| Row | Col 0 | Col 1 | Col 2 | Col 3 |
| --- | --- | --- | --- | --- |
| 0 | coffee mug | thermos | open notebook | technical binders |
| 1 | sticky notes | punch cards and ticker tape | open toolbox | screwdriver and pliers |
| 2 | coiled cable | timing relay | vacuum tubes | fuse tray |
| 3 | circuit board | tape spool | parts box | repair debris |

## `station4-final-day-props.png`

| Row | Col 0 | Col 1 | Col 2 | Col 3 |
| --- | --- | --- | --- | --- |
| 0 | folding table | folded chair | open chair | sheet cake |
| 1 | plates and forks | coffee urn | paper cups | string lights |
| 2 | balloons | gift bag | retirement card | party hat |
| 3 | tool cart | hand truck | dismantling bins | power strip and lockout tag |

The keyed source images are preserved in the sibling
`props-chroma-source/` directory. Production copies used by the web build live
under `public/assets/station4/`.

## Generation method

Generated with the built-in image-generation tool using the old Station 4 scene,
desk, and style-inspiration art as references. The prompt requested separated,
unlabelled objects on a uniform `#ff00ff` backing, matching the old room's muted
low-poly painterly palette. The backing was converted to alpha with the imagegen
skill's chroma-removal helper using a soft matte and color despill.
