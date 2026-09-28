import { describe, expect, it } from "vitest";
import { StoryState } from "./state";

describe("StoryState", () => {
  it("records a framing choice without changing completion", () => {
    const state = new StoryState();
    state.remember("first_lesson", "by waiting");
    expect(state.snapshot.memories.first_lesson).toBe("by waiting");
    expect(state.completedCount).toBe(0);
  });

  it("counts an interaction only once", () => {
    const state = new StoryState();
    state.complete("desk");
    state.complete("desk");
    expect(state.completedCount).toBe(1);
  });
});
