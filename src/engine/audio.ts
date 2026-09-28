import type { SoundId } from "./types";

const paths: Record<SoundId | "hum", string> = {
  hum: "/audio/hum.mp3",
  beep: "/audio/beep.mp3",
  clack: "/audio/clack.mp3",
  clank: "/audio/clank.mp3",
  click: "/audio/click.mp3",
  steam: "/audio/steam.mp3",
  ticker: "/audio/ticker.mp3",
};

export class StageAudio {
  #muted = false;
  #ambience?: HTMLAudioElement;
  #active = new Set<HTMLAudioElement>();

  get muted(): boolean {
    return this.#muted;
  }

  startAmbience(): void {
    if (this.#ambience) return;
    this.#ambience = new Audio(paths.hum);
    this.#ambience.loop = true;
    this.#ambience.volume = 0.18;
    void this.#ambience.play().catch(() => undefined);
  }

  play(id: SoundId, volume = 0.42): void {
    if (this.#muted) return;
    const audio = new Audio(paths[id]);
    audio.volume = volume;
    this.#active.add(audio);
    audio.addEventListener("ended", () => this.#active.delete(audio), {
      once: true,
    });
    void audio.play().catch(() => this.#active.delete(audio));
  }

  toggleMute(): boolean {
    this.#muted = !this.#muted;
    if (this.#ambience) this.#ambience.muted = this.#muted;
    for (const audio of this.#active) audio.muted = this.#muted;
    return this.#muted;
  }
}
