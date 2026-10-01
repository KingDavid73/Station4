import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { sceneOne } from "./sceneOne";
import { sceneTwo } from "./sceneTwo";
import { modernScene, finalScene, nightScene, morningScene } from "./laterScenes";
import { lineText } from "../engine/recollection";
import { machines } from "../engine/machines";
import type { Line } from "../engine/types";

const scenes = [sceneOne, sceneTwo, modernScene, finalScene, nightScene, morningScene];
function flatten(lines: Line[]): Line[] {
  return lines.flatMap(line => [line, ...flatten(line.choices?.flatMap(c => c.response ?? []) ?? [])]);
}

describe("complete stage play", () => {
  it("keeps the career count and resets for the successor", () => {
    expect(scenes.slice(0, 4).map(s => s.subtitle.match(/DAY ([\d,]+)/)?.[1])).toEqual(["9,997", "9,998", "9,999", "10,000"]);
    expect(morningScene.subtitle).toContain("DAY 1");
  });
  it("keeps every choice local and gives each at least two response beats", () => {
    for (const scene of scenes) for (const hotspot of scene.hotspots) {
      const choices = flatten(hotspot.lines).flatMap(l => l.choices ?? []);
      expect(choices.length).toBeGreaterThanOrEqual(3);
      expect(choices.every(c => (c.response?.length ?? 0) >= 2)).toBe(true);
      expect(choices.every(c => !flatten(c.response ?? []).some(l => l.cue))).toBe(true);
    }
  });
  it("uses canonical IPA on every machine voice line", () => {
    for (const scene of scenes) for (const line of flatten([...scene.intro, ...scene.outro, ...scene.hotspots.flatMap(h => h.lines)])) {
      if (line.voice) expect([machines[line.voice].ipa, machines.mike.broken]).toContain(line.text);
    }
  });
  it("has all referenced artwork locally", () => {
    for (const scene of scenes) {
      if (scene.room) expect(existsSync(`public${scene.room}`)).toBe(true);
      for (const h of scene.hotspots) expect(existsSync(`public${h.closeup}`)).toBe(true);
    }
  });
  it("clears the ordinary fault but does not falsely award harmony", () => {
    const mike = sceneTwo.hotspots.find(h => h.clearsFault)!;
    expect(mike.lines.some(l => l.cue === "repair")).toBe(true);
    expect(mike.lines.some(l => l.cue === "harmony")).toBe(false);
    expect(finalScene.outro.map(l => l.cue).filter(Boolean)).toEqual(["sacrifice", "leave"]);
    expect(nightScene.intro[0].cue).toBe("harmony");
    expect(morningScene.intro.some(l => l.cue === "shutdown")).toBe(true);
  });
  it("recalls prior interpretations but gracefully defaults without them", () => {
    const line = sceneTwo.hotspots[0].lines.find(l => l.recollection)!;
    expect(lineText(line, {})).toBe(line.text);
    expect(lineText(line, {search_language: "the inherited name"})).toContain("swallow");
    expect(lineText(line, {search_language: "the failing sound"})).toContain("video");
    expect(lineText(line, {search_language: "unrecognized"})).toBe(line.text);
  });
});
