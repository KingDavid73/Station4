import type { StorySnapshot } from "./types";

const emptySnapshot = (): StorySnapshot => ({ completed: [], memories: {} });

export class StoryState {
  #snapshot: StorySnapshot = emptySnapshot();

  complete(id: string): void {
    if (!this.#snapshot.completed.includes(id)) {
      this.#snapshot.completed.push(id);
    }
  }

  remember(key: string, value: string): void {
    this.#snapshot.memories[key] = value;
  }

  isComplete(id: string): boolean {
    return this.#snapshot.completed.includes(id);
  }

  get completedCount(): number {
    return this.#snapshot.completed.length;
  }

  get snapshot(): StorySnapshot {
    return structuredClone(this.#snapshot);
  }

  reset(): void {
    this.#snapshot = emptySnapshot();
  }

  beginScene(): void {
    this.#snapshot.completed = [];
  }
}
