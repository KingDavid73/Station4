import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { StageAudio } from "./audio";

const nodes: { type: string; node: ReturnType<typeof node> }[] = [];
function param() { return { value: 0, setValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn(), setTargetAtTime: vi.fn(), cancelScheduledValues: vi.fn() }; }
function node() { return { gain: param(), frequency: param(), pan: param(), Q: param(), connect: vi.fn(), disconnect: vi.fn(), start: vi.fn(), stop: vi.fn(), type: "", buffer: undefined, onended: undefined }; }
function create(type: string) { const n = node(); nodes.push({ type, node: n }); return n; }
class Context {
  currentTime = 0; state = "running"; sampleRate = 800; destination = {};
  resume() { return Promise.resolve(); }
  createGain() { return create("gain"); }
  createStereoPanner() { return create("panner"); }
  createOscillator() { return create("oscillator"); }
  createBiquadFilter() { return create("filter"); }
  createBufferSource() { return create("noise"); }
  createBuffer() { return { getChannelData: () => new Float32Array(1600) }; }
}
beforeEach(() => {
  nodes.length = 0; vi.useFakeTimers();
  vi.stubGlobal("window", {setInterval, clearInterval, setTimeout});
  vi.stubGlobal("AudioContext", Context);
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

describe("machine score", () => {
  it("actually omits Mike's contact and restores it on repair", async () => {
    const audio = new StageAudio(); audio.setAtmosphere("old", true);
    audio.startAmbience(); await Promise.resolve();
    const count = () => nodes.filter(n => n.type === "noise").length;
    const before = count(); audio.voice("mike"); expect(count()).toBe(before);
    audio.repair(); audio.voice("mike"); expect(count()).toBe(before + 1);
  });
  it("keeps the donor silent during the final harmony", async () => {
    const audio = new StageAudio(); audio.startAmbience(); await Promise.resolve();
    audio.sacrifice(); audio.setAtmosphere("harmony");
    const before = nodes.length; audio.voice("jerry"); expect(nodes.length).toBe(before);
    audio.voice("linda"); expect(nodes.length).toBeGreaterThan(before);
  });
  it("fades already scheduled sources and schedules nothing after shutdown", async () => {
    const audio = new StageAudio(); audio.startAmbience(); await Promise.resolve();
    audio.setAtmosphere("silent");
    const envelopes = nodes.filter(n => n.type === "gain").slice(1);
    expect(envelopes.length).toBeGreaterThan(0);
    expect(envelopes.every(n => n.node.gain.cancelScheduledValues.mock.calls.length > 0)).toBe(true);
    const before = nodes.length; vi.advanceTimersByTime(20000);
    expect(nodes.length).toBe(before);
  });
  it("mutes and unmutes the entire synthesized mix", () => {
    const audio = new StageAudio(); audio.startAmbience();
    expect(audio.toggleMute()).toBe(true);
    expect(nodes[0].node.gain.setTargetAtTime).toHaveBeenLastCalledWith(0, 0, .08);
    expect(audio.toggleMute()).toBe(false);
    expect(nodes[0].node.gain.setTargetAtTime).toHaveBeenLastCalledWith(.65, 0, .08);
  });
});
