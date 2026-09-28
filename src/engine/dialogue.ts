import type { Choice, Line } from "./types";
import type { StageAudio } from "./audio";
import type { StoryState } from "./state";

export class Dialogue {
  constructor(
    private readonly root: HTMLElement,
    private readonly audio: StageAudio,
    private readonly state: StoryState,
  ) {}

  async play(lines: Line[]): Promise<void> {
    this.root.classList.add("dialogue--visible");
    for (const line of lines) {
      const choice = await this.show(line);
      if (choice?.response) {
        for (const response of choice.response) await this.show(response);
      }
    }
    this.root.classList.remove("dialogue--visible");
    this.root.replaceChildren();
  }

  private show(line: Line): Promise<Choice | undefined> {
    if (line.sound) this.audio.play(line.sound);
    this.root.replaceChildren();
    if (line.speaker) {
      const speaker = document.createElement("div");
      speaker.className = "dialogue__speaker";
      speaker.textContent = line.speaker;
      this.root.append(speaker);
    }
    const text = document.createElement("p");
    text.className = line.aside ? "dialogue__text dialogue__text--aside" : "dialogue__text";
    text.textContent = line.text;
    this.root.append(text);

    return new Promise((resolve) => {
      const actions = document.createElement("div");
      actions.className = "dialogue__actions";
      if (line.choices) {
        line.choices.forEach((choice) =>
          actions.append(this.choiceButton(choice, resolve)),
        );
      } else {
        const next = document.createElement("button");
        next.className = "dialogue__next";
        next.textContent = "Continue";
        next.addEventListener("click", () => {
          this.audio.play("click", 0.22);
          resolve(undefined);
        });
        actions.append(next);
      }
      this.root.append(actions);
      actions.querySelector<HTMLElement>("button")?.focus();
    });
  }

  private choiceButton(
    choice: Choice,
    resolve: (choice: Choice) => void,
  ): HTMLButtonElement {
    const button = document.createElement("button");
    button.className = "dialogue__choice";
    button.textContent = choice.text;
    button.addEventListener("click", () => {
      this.audio.play("click", 0.22);
      if (choice.memory) {
        this.state.remember(choice.memory.key, choice.memory.value);
      }
      resolve(choice);
    });
    return button;
  }
}
