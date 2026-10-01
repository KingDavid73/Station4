import type { SoundId } from "./types";
import { machines, type MachineId } from "./machines";

const paths: Record<SoundId, string> = {
  beep: "/audio/beep.mp3", clack: "/audio/clack.mp3", clank: "/audio/clank.mp3",
  click: "/audio/click.mp3", steam: "/audio/steam.mp3", ticker: "/audio/ticker.mp3",
};
type Atmosphere = "old" | "modern" | "harmony" | "silent";

/** Original procedural score: the music belongs to the machinery. */
export class StageAudio {
  #muted = false;
  #active = new Set<HTMLAudioElement>();
  #context?: AudioContext;
  #master?: GainNode;
  #noise?: AudioBuffer;
  #timer?: number;
  #mode: Atmosphere = "old";
  #fault = false;
  #focus?: MachineId;
  #sacrificed = false;
  #envelopes = new Set<GainNode>();

  get muted(): boolean { return this.#muted; }

  startAmbience(): void {
    if (!this.#context) {
      this.#context = new AudioContext();
      this.#master = this.#context.createGain();
      this.#master.gain.value = this.#muted ? 0 : .65;
      this.#master.connect(this.#context.destination);
      this.#noise = this.#context.createBuffer(1, this.#context.sampleRate * 2, this.#context.sampleRate);
      const data = this.#noise.getChannelData(0);
      let seed = 73;
      for (let i = 0; i < data.length; i++) {
        seed = (seed * 16807) % 2147483647;
        data[i] = (seed / 2147483647 * 2 - 1) * .45;
      }
    }
    void this.#context.resume().then(() => this.cycle()).catch(() => undefined);
    if (!this.#timer) {
      this.#timer = window.setInterval(() => this.cycle(), 6400);
    }
  }

  setAtmosphere(mode: Atmosphere, fault = false): void {
    if (this.#context) for (const gain of this.#envelopes) {
      gain.gain.cancelScheduledValues(this.#context.currentTime);
      gain.gain.setTargetAtTime(0, this.#context.currentTime, .06);
    }
    this.#mode = mode; this.#fault = fault; this.#focus = undefined;
    if (mode === "old") this.#sacrificed = false;
    if (this.#timer) {
      window.clearInterval(this.#timer);
      this.cycle();
      this.#timer = window.setInterval(() => this.cycle(), 6400);
    }
  }
  focus(id?: MachineId): void { this.#focus = id; }
  repair(): void { this.#fault = false; }
  sacrifice(): void { this.#sacrificed = true; }

  private cycle(): void {
    const ctx = this.#context;
    if (!ctx || ctx.state !== "running" || this.#mode === "silent") return;
    const t = ctx.currentTime + .04;
    if (this.#mode === "modern") {
      this.tone(t, 6.3, 82.4, 82.4, .008, 0, "sine");
      this.air(t, 6.3, 1600, .012, 0);
      return;
    }
    const harmony = this.#mode === "harmony";
    if (!this.#sacrificed) this.phrase("jerry", t, .38);
    this.phrase("mike", t + (harmony ? 0 : .24), .36);
    this.phrase("linda", t + (harmony ? 0 : .53), .34);
    this.air(t, 6.2, 220, .018, .55);
    this.tone(t, 6.2, 55, 55, harmony ? .022 : .013, -.2, "sine");
    this.tone(t, 6.2, 82.4, 82.4, harmony ? .018 : .008, .2, "sine");
    if (harmony) this.tone(t, 6.2, 110, 110, .01, 0, "sine");
  }

  voice(id: MachineId): void {
    if (!this.#context || this.#mode === "silent") return;
    this.phrase(id, this.#context.currentTime + .03, .7);
  }

  private phrase(id: MachineId, t: number, level: number): void {
    if (this.#sacrificed && id === "jerry") return;
    const p = machines[id].x;
    const a = level * (this.#focus && this.#focus !== id ? .25 : 1);
    if (id === "jerry") {
      this.air(t, .16, 2100, .1 * a, p);
      this.tone(t + .18, .68, 185, 174, .045 * a, p, "sawtooth");
      this.tone(t + .95, .28, 880, 880, .035 * a, p, "sine");
    } else if (id === "mike") {
      this.tone(t, .5, 110, 110, .065 * a, p, "triangle");
      this.tone(t + .5, .6, 220, 440, .045 * a, p, "sine");
      if (!this.#fault) this.air(t + 1.14, .055, 850, .26 * a, p);
    } else {
      this.tone(t, .32, 330, 360, .026 * a, p, "sine");
      this.tone(t + .32, .72, 165, 165, .04 * a, p, "triangle");
      this.air(t + 1.07, .42, 1250, .065 * a, p);
    }
  }

  private envelope(t: number, duration: number, volume: number, pan: number): GainNode {
    const ctx = this.#context!;
    const gain = ctx.createGain();
    const panner = ctx.createStereoPanner(); panner.pan.value = pan;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(volume, t + Math.min(.08, duration * .2));
    gain.gain.setValueAtTime(volume, t + duration * .65);
    gain.gain.linearRampToValueAtTime(0, t + duration);
    gain.connect(panner); panner.connect(this.#master!);
    this.#envelopes.add(gain);
    window.setTimeout(() => { gain.disconnect(); panner.disconnect(); this.#envelopes.delete(gain); }, (t - ctx.currentTime + duration + .2) * 1000);
    return gain;
  }

  private tone(t: number, d: number, from: number, to: number, volume: number, pan: number, type: OscillatorType): void {
    const ctx = this.#context!;
    const osc = ctx.createOscillator(); osc.type = type;
    osc.frequency.setValueAtTime(from, t);
    osc.frequency.exponentialRampToValueAtTime(to, t + d);
    const filter = ctx.createBiquadFilter(); filter.type = "lowpass"; filter.frequency.value = 1100;
    osc.connect(filter); filter.connect(this.envelope(t, d, volume, pan));
    osc.onended = () => { osc.disconnect(); filter.disconnect(); };
    osc.start(t); osc.stop(t + d);
  }

  private air(t: number, d: number, frequency: number, volume: number, pan: number): void {
    const ctx = this.#context!;
    const source = ctx.createBufferSource(); source.buffer = this.#noise!;
    const filter = ctx.createBiquadFilter(); filter.type = "bandpass"; filter.frequency.value = frequency; filter.Q.value = .8;
    source.connect(filter); filter.connect(this.envelope(t, d, volume, pan));
    source.onended = () => { source.disconnect(); filter.disconnect(); };
    source.start(t); source.stop(t + d);
  }

  play(id: SoundId, volume = .28): void {
    if (this.#muted) return;
    const audio = new Audio(paths[id]); audio.volume = volume;
    this.#active.add(audio);
    audio.addEventListener("ended", () => this.#active.delete(audio), { once: true });
    void audio.play().catch(() => this.#active.delete(audio));
  }

  toggleMute(): boolean {
    this.#muted = !this.#muted;
    if (this.#master && this.#context) this.#master.gain.setTargetAtTime(this.#muted ? 0 : .65, this.#context.currentTime, .08);
    for (const audio of this.#active) audio.muted = this.#muted;
    return this.#muted;
  }
}
