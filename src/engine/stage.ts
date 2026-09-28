import { StageAudio } from "./audio";
import { Dialogue } from "./dialogue";
import { StoryState } from "./state";
import type { Hotspot, Scene, StagePoint } from "./types";

const wait = (milliseconds: number) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

export class Stage {
  private readonly state = new StoryState();
  private readonly audio = new StageAudio();
  private readonly stage: HTMLElement;
  private readonly hotspotLayer: HTMLElement;
  private readonly spotlight: HTMLElement;
  private readonly character: HTMLElement;
  private readonly dialogue: Dialogue;
  private readonly closeup: HTMLImageElement;
  private readonly focusLayer: HTMLElement;
  private readonly focusFrame: HTMLElement;
  private readonly checklist: HTMLElement;
  private readonly begin: HTMLButtonElement;
  private readonly curtain: HTMLElement;
  private readonly nextScene: HTMLButtonElement;
  private busy = false;
  private scene?: Scene;
  private scenes: Scene[] = [];
  private sceneIndex = 0;

  constructor(private readonly root: HTMLElement) {
    root.innerHTML = this.markup();
    this.stage = this.required(".stage");
    this.hotspotLayer = this.required(".hotspots");
    this.spotlight = this.required(".spotlight");
    this.character = this.required(".character");
    this.closeup = this.required<HTMLImageElement>(".closeup");
    this.focusLayer = this.required(".focus-layer");
    this.focusFrame = this.required(".focus-frame");
    this.checklist = this.required(".round-list");
    this.begin = this.required<HTMLButtonElement>(".curtain__begin");
    this.curtain = this.required(".curtain");
    this.nextScene = this.required<HTMLButtonElement>(".ending__next");
    this.dialogue = new Dialogue(
      this.required(".dialogue"),
      this.audio,
      this.state,
    );
    this.wireControls();
  }

  load(scenes: Scene[]): void {
    if (scenes.length === 0) throw new Error("Station 4 requires at least one scene.");
    this.scenes = scenes;
    this.sceneIndex = 0;
    this.loadScene(scenes[0]);
  }

  private loadScene(scene: Scene): void {
    this.scene = scene;
    this.state.beginScene();
    this.required(".scene-title").textContent = scene.title;
    this.required(".scene-subtitle").textContent = scene.subtitle;
    this.required(".round__title").textContent = scene.roundTitle ?? "MAINTENANCE ROUND";
    this.stage.classList.toggle("stage--fault", Boolean(scene.faultIndicator));
    this.required(".ending").classList.remove("ending--visible");
    this.renderHotspots(scene.hotspots);
    this.renderChecklist();
  }

  private wireControls(): void {
    this.begin.addEventListener("click", async () => {
      if (!this.scene) return;
      this.audio.startAmbience();
      this.audio.play("clack", 0.25);
      this.curtain.classList.add("curtain--open");
      await wait(700);
      await this.dialogue.play(this.scene.intro);
      this.setDeskWorking(true);
      this.setHint("Move the pointer through the room. Listen for what answers.");
    });
    this.required<HTMLButtonElement>(".sound-toggle").addEventListener(
      "click",
      (event) => {
        const muted = this.audio.toggleMute();
        (event.currentTarget as HTMLButtonElement).textContent = muted
          ? "Sound off"
          : "Sound on";
      },
    );
    this.required<HTMLButtonElement>(".restart").addEventListener("click", () =>
      window.location.reload(),
    );
    this.nextScene.addEventListener("click", () => void this.advanceScene());
  }

  private async advanceScene(): Promise<void> {
    const next = this.scenes[this.sceneIndex + 1];
    if (!next) return;
    this.busy = true;
    this.nextScene.disabled = true;
    this.required(".ending").classList.remove("ending--visible");
    this.dark();
    await wait(500);
    this.sceneIndex += 1;
    this.loadScene(next);
    this.setDeskWorking(true);
    this.setHint("The next shift begins.");
    await wait(450);
    await this.dialogue.play(next.intro);
    this.setHint("Move the pointer through the room. Listen for what answers.");
    this.busy = false;
    this.nextScene.disabled = false;
    this.setHotspotsDisabled(false);
  }

  private renderHotspots(hotspots: Hotspot[]): void {
    this.hotspotLayer.replaceChildren();
    for (const hotspot of hotspots) {
      const button = document.createElement("button");
      button.className = "hotspot";
      button.dataset.id = hotspot.id;
      button.setAttribute("aria-label", hotspot.label);
      Object.assign(button.style, {
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
        width: `${hotspot.width}%`,
        height: `${hotspot.height}%`,
      });
      const label = document.createElement("span");
      label.textContent = hotspot.label;
      button.append(label);
      button.addEventListener("pointerenter", () => {
        if (!this.busy) this.light(hotspot);
      });
      button.addEventListener("pointerleave", () => {
        if (!this.busy) this.dark();
      });
      button.addEventListener("focus", () => {
        if (!this.busy) this.light(hotspot);
      });
      button.addEventListener("blur", () => {
        if (!this.busy) this.dark();
      });
      button.addEventListener("click", () => void this.interact(hotspot, button));
      this.hotspotLayer.append(button);
    }
  }

  private async interact(
    hotspot: Hotspot,
    button: HTMLButtonElement,
  ): Promise<void> {
    if (this.busy) return;
    this.busy = true;
    this.setDeskWorking(false);
    this.light(hotspot);
    this.setHotspotsDisabled(true);
    this.setHint(hotspot.label);
    await this.walk(hotspot.walkTo);
    if (hotspot.focusEffect) {
      this.character.classList.add("character--machine-working");
      this.audio.play("clack", 0.25);
      await wait(1400);
    } else if (hotspot.id === "desk") {
      this.setDeskWorking(true);
    }
    this.closeup.src = hotspot.closeup;
    this.closeup.alt = `${hotspot.label}, inspected at close range`;
    this.focusFrame.dataset.effect = hotspot.focusEffect ?? "object";
    this.focusLayer.classList.toggle("focus-layer--machine", Boolean(hotspot.focusEffect));
    this.focusLayer.classList.add("focus-layer--visible");
    await this.dialogue.play(hotspot.lines);
    this.focusLayer.classList.remove("focus-layer--visible");
    if (hotspot.clearsFault) this.stage.classList.remove("stage--fault");
    this.character.classList.remove("character--machine-working");
    this.setDeskWorking(false);
    this.state.complete(hotspot.id);
    button.classList.add("hotspot--complete");
    button.querySelector("span")?.setAttribute("data-complete", "✓");
    this.renderChecklist();
    await this.walk({ x: 14, y: 2 });
    this.setDeskWorking(true);
    this.dark();
    this.busy = false;
    this.setHotspotsDisabled(false);

    if (this.scene && this.state.completedCount === this.scene.hotspots.length) {
      await wait(300);
      this.busy = true;
      this.light({ ...hotspot, x: 4, y: 28, width: 23, height: 45 });
      await this.dialogue.play(this.scene.outro);
      this.setHint(`${this.scene.roundTitle ?? "Maintenance round"} complete.`);
      const ending = this.scene.ending ?? {
        title: "SHIFT COMPLETE",
        text: "The room settles into its imperfect rhythm.",
      };
      this.required(".ending strong").textContent = ending.title;
      this.required(".ending span").textContent = ending.text;
      const hasNext = this.sceneIndex < this.scenes.length - 1;
      this.nextScene.textContent = ending.nextLabel ?? "Begin next shift";
      this.nextScene.hidden = !hasNext;
      this.required(".ending").classList.add("ending--visible");
    } else {
      this.setHint("He returns to the desk. The room keeps talking.");
    }
  }

  private async walk(destination: StagePoint): Promise<void> {
    const current: StagePoint = {
      x: Number(this.character.dataset.x ?? 14),
      y: Number(this.character.dataset.y ?? 2),
    };
    const distance = Math.hypot(
      destination.x - current.x,
      (destination.y - current.y) * 1.65,
    );
    if (distance < 0.5) {
      await wait(220);
      return;
    }
    const duration = Math.min(4800, Math.max(1800, distance * 58));
    this.character.classList.add(
      destination.x >= current.x ? "character--right" : "character--left",
    );
    this.character.style.setProperty("--walk-duration", `${duration}ms`);
    this.character.style.setProperty(
      "--depth-scale",
      String(Math.max(0.9, 1 - destination.y * 0.0065)),
    );
    this.character.style.left = `${destination.x}%`;
    this.character.style.bottom = `${destination.y}%`;
    await wait(duration);
    this.character.dataset.x = String(destination.x);
    this.character.dataset.y = String(destination.y);
    this.character.classList.remove("character--right", "character--left");
  }

  private setDeskWorking(working: boolean): void {
    this.character.classList.toggle("character--working", working);
    if (working) this.character.style.bottom = "6.4%";
  }

  private light(hotspot: Pick<Hotspot, "x" | "y" | "width" | "height">): void {
    const x = hotspot.x + hotspot.width / 2;
    const y = hotspot.y + hotspot.height / 2;
    this.spotlight.style.setProperty("--spot-x", `${x}%`);
    this.spotlight.style.setProperty("--spot-y", `${y}%`);
    this.spotlight.classList.add("spotlight--on");
  }

  private dark(): void {
    this.spotlight.classList.remove("spotlight--on");
  }

  private renderChecklist(): void {
    if (!this.scene) return;
    this.checklist.replaceChildren(
      ...this.scene.hotspots.map((hotspot) => {
        const item = document.createElement("li");
        item.textContent = hotspot.label;
        if (this.state.isComplete(hotspot.id)) item.className = "complete";
        return item;
      }),
    );
  }

  private setHint(text: string): void {
    this.required(".stage-hint").textContent = text;
  }

  private setHotspotsDisabled(disabled: boolean): void {
    this.hotspotLayer
      .querySelectorAll<HTMLButtonElement>("button")
      .forEach((button) => (button.disabled = disabled));
  }

  private required<T extends HTMLElement = HTMLElement>(selector: string): T {
    const element = this.root.querySelector<T>(selector);
    if (!element) throw new Error(`Missing stage element: ${selector}`);
    return element;
  }

  private markup(): string {
    return `
      <section class="game-shell">
        <header class="hud">
          <div><div class="scene-title"></div><div class="scene-subtitle"></div></div>
          <div class="hud__controls">
            <button class="sound-toggle">Sound on</button>
            <button class="restart">Restart</button>
          </div>
        </header>
        <section class="stage" aria-label="Station 4 maintenance room">
          <img class="room" src="/assets/station4/room.png" alt="" />
          <span class="room-fault" aria-hidden="true"></span>
          <div
            class="character character--working"
            data-x="14"
            data-y="2"
            style="--depth-scale: .987; bottom: 6.4%"
            aria-label="The technician"
          ><div class="character__sprite"></div></div>
          <div class="hotspots"></div>
          <div class="spotlight"></div>
          <div class="focus-layer">
            <div class="focus-frame">
              <img class="closeup" alt="" />
              <div class="machine-effects" aria-hidden="true">
                <i class="reel reel--1"></i>
                <i class="reel reel--2"></i>
                <i class="reel reel--3"></i>
                <span class="lamp lamp--1"></span>
                <span class="lamp lamp--2"></span>
                <span class="lamp lamp--3"></span>
                <span class="lamp lamp--4"></span>
                <span class="lamp lamp--5"></span>
                <span class="lamp lamp--6"></span>
                <span class="fault-light"></span>
              </div>
            </div>
          </div>
          <div class="dialogue" aria-live="polite"></div>
          <div class="stage-hint">The shift has not begun.</div>
          <aside class="round">
            <div class="round__title">MIDDAY ROUND</div>
            <ul class="round-list"></ul>
          </aside>
          <div class="ending">
            <strong>SCENE ONE</strong>
            <span>The room settles into its imperfect rhythm.</span>
            <button class="ending__next" hidden>Begin next shift</button>
          </div>
        </section>
        <div class="curtain">
          <div class="curtain__card">
            <h1>STATION 4</h1>
            <button class="curtain__begin">Begin shift</button>
          </div>
        </div>
      </section>`;
  }
}
