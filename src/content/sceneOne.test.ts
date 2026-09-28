import { describe, expect, it } from "vitest";
import { sceneOne } from "./sceneOne";

describe("scene one", () => {
  it("has unique hotspot ids and framing choices", () => {
    const ids = sceneOne.hotspots.map(({ id }) => id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(
      sceneOne.hotspots.every((hotspot) =>
        hotspot.lines.some((line) => (line.choices?.length ?? 0) >= 3),
      ),
    ).toBe(true);
  });
});
