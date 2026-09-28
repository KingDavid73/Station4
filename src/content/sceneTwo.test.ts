import { describe, expect, it } from "vitest";
import { sceneTwo } from "./sceneTwo";

describe("scene two", () => {
  it("contains a framed choice in every interaction", () => {
    expect(sceneTwo.hotspots).toHaveLength(5);
    expect(
      sceneTwo.hotspots.every((hotspot) =>
        hotspot.lines.some((line) =>
          line.choices?.every((choice) => (choice.response?.length ?? 0) > 0),
        ),
      ),
    ).toBe(true);
  });

  it("contains one ordinary fault that can be cleared", () => {
    expect(sceneTwo.faultIndicator).toBe(true);
    expect(sceneTwo.hotspots.filter((hotspot) => hotspot.clearsFault)).toHaveLength(1);
  });
});
