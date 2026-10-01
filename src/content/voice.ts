import type { Choice, Hotspot, Line } from "../engine/types";
import { machines, type MachineId } from "../engine/machines";

export const image = (name: string) => `/assets/station4/${name}.png`;
export const aside = (text: string, extra: Partial<Line> = {}): Line => ({ text, aside: true, ...extra });
export const say = (text: string, extra: Partial<Line> = {}): Line => ({ speaker: "TECHNICIAN", text, ...extra });
export const voice = (id: MachineId, broken = false): Line => aside(
  broken && id === "mike" ? machines.mike.broken : machines[id].ipa, { voice: id });
export const choice = (text: string, key: string, value: string, ...response: Line[]): Choice => ({
  text, memory: { key, value }, response,
});
export const locations: Record<string, Omit<Hotspot, "lines" | "label">> = {
  desk: { id: "desk", x: 2, y: 34, width: 26, height: 49, walkTo: { x: 14, y: 6.4 }, closeup: image("desk") },
  jerry: { id: "cabinet-a", x: 28, y: 18, width: 18, height: 58, walkTo: { x: 34, y: 11 }, closeup: image("mainframe-a"), focusEffect: "reels-3" },
  mike: { id: "cabinet-b", x: 45, y: 15, width: 20, height: 59, walkTo: { x: 51, y: 12 }, closeup: image("timing-panel-v1"), focusEffect: "lights" },
  linda: { id: "cabinet-c", x: 64, y: 17, width: 18, height: 59, walkTo: { x: 68, y: 11 }, closeup: image("mainframe-c"), focusEffect: "reels-2" },
  parts: { id: "parts", x: 81, y: 46, width: 18, height: 37, walkTo: { x: 82, y: 3 }, closeup: image("parts-pile") },
};
export const visit = (place: keyof typeof locations, label: string, lines: Line[], extra: Partial<Hotspot> = {}): Hotspot => ({ ...locations[place], label, lines, ...extra });
