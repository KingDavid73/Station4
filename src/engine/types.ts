export type SoundId =
  | "beep"
  | "clack"
  | "clank"
  | "click"
  | "steam"
  | "ticker";

export interface Choice {
  text: string;
  memory?: { key: string; value: string };
  /** A local echo: choices frame this visit, then the scene reconverges. */
  response?: Line[];
}

export interface Line {
  speaker?: string;
  text: string;
  sound?: SoundId;
  choices?: Choice[];
  aside?: boolean;
  voice?: "jerry" | "mike" | "linda";
  cue?: "repair" | "harmony" | "shutdown" | "leave" | "sacrifice" | "operator-enter" | "operator-work" | "operator-leave";
  recollection?: { key: string; versions: Record<string, string> };
  duration?: number;
}

export interface StagePoint {
  x: number;
  y: number;
}

export interface Hotspot {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  walkTo: StagePoint;
  closeup: string;
  focusEffect?: "reels-3" | "reels-2" | "lights" | "fault-lights";
  clearsFault?: boolean;
  lines: Line[];
}

export interface SceneEnding {
  title: string;
  text: string;
  nextLabel?: string;
}

export interface Scene {
  id: string;
  title: string;
  subtitle: string;
  intro: Line[];
  hotspots: Hotspot[];
  outro: Line[];
  roundTitle?: string;
  faultIndicator?: boolean;
  ending?: SceneEnding;
  room?: string;
  atmosphere?: "old" | "modern" | "harmony" | "silent";
  character?: "technician" | "absent";
  tableau?: boolean;
  retirement?: boolean;
}

export interface StorySnapshot {
  completed: string[];
  memories: Record<string, string>;
}
