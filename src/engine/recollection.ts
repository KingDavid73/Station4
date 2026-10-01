import type { Line } from "./types";

export function lineText(line: Line, memories: Record<string, string>): string {
  const remembered = line.recollection && memories[line.recollection.key];
  return (remembered && line.recollection?.versions[remembered]) || line.text;
}
