"""Normalize generated walk poses into equal, stable sprite cells."""

from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets/generated/scene/station4-technician-walk-4frame-v2.png"
OUTPUT = ROOT / "assets/generated/scene/station4-technician-walk-4frame-v3.png"
DESK_SOURCE = ROOT / "assets/generated/scene/station4-technician-desk-4frame.png"
DESK_OUTPUT = ROOT / "assets/generated/scene/station4-technician-desk-4frame-v2.png"
OLD_SHEET = ROOT / "assets/generated/scene/station4-technician-spritesheet-4x4.png"
IDLE_OUTPUT = ROOT / "assets/generated/scene/station4-technician-idle.png"
MACHINE_WORK_OUTPUT = ROOT / "assets/generated/scene/station4-technician-machine-work.png"

CELL_WIDTH = 512
CUTS = (0, 560, 1000, 1400, 1983)


def alpha_bbox(image: Image.Image) -> tuple[int, int, int, int]:
    bbox = image.getchannel("A").getbbox()
    if bbox is None:
        raise ValueError("Sprite region contains no opaque pixels")
    return bbox


def normalize_atlas(
    source_path: Path,
    output_path: Path,
    cuts: tuple[int, int, int, int, int],
) -> None:
    source = Image.open(source_path).convert("RGBA")
    atlas = Image.new("RGBA", (CELL_WIDTH * 4, source.height), (0, 0, 0, 0))

    for index, (left, right) in enumerate(zip(cuts, cuts[1:])):
        region = source.crop((left, 0, right, source.height))
        bbox = alpha_bbox(region)
        sprite = region.crop(bbox)
        x = index * CELL_WIDTH + (CELL_WIDTH - sprite.width) // 2
        atlas.alpha_composite(sprite, (x, bbox[1]))

    atlas.save(output_path)


def extract_idle() -> None:
    sheet = Image.open(OLD_SHEET).convert("RGBA")
    cell = sheet.crop((0, 0, sheet.width // 4, sheet.height // 4))
    idle = cell.crop(alpha_bbox(cell))
    idle.save(IDLE_OUTPUT)


def extract_machine_work() -> None:
    """Reuse the unused rear-facing service row from the original technician sheet."""
    sheet = Image.open(OLD_SHEET).convert("RGBA")
    cell_width = sheet.width // 4
    cell_height = sheet.height // 4
    atlas = Image.new("RGBA", (CELL_WIDTH * 4, 793), (0, 0, 0, 0))

    for index in range(4):
        cell = sheet.crop(
            (
                index * cell_width,
                3 * cell_height,
                (index + 1) * cell_width,
                4 * cell_height,
            )
        )
        sprite = cell.crop(alpha_bbox(cell))
        scale = 620 / sprite.height
        sprite = sprite.resize(
            (round(sprite.width * scale), 620),
            Image.Resampling.LANCZOS,
        )
        x = index * CELL_WIDTH + (CELL_WIDTH - sprite.width) // 2
        atlas.alpha_composite(sprite, (x, 675 - sprite.height))

    atlas.save(MACHINE_WORK_OUTPUT)


if __name__ == "__main__":
    normalize_atlas(SOURCE, OUTPUT, CUTS)
    normalize_atlas(DESK_SOURCE, DESK_OUTPUT, (0, 464, 928, 1392, 1857))
    extract_idle()
    extract_machine_work()
