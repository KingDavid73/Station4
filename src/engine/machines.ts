export type MachineId = "jerry" | "mike" | "linda";

/** Approximate heard syllables, not claims that machinery speaks human words. */
export const machines = {
  jerry: { name: "Jerry", ipa: "[dʒ · ɛɹː · i]", x: -.55,
    function: "Tape gate → rough capstan → high index tone" },
  mike: { name: "Mike", ipa: "[mː · aɪ · k]", broken: "[mː · aɪ …]", x: 0,
    function: "Transformer hum → sweeping oscillator → timing contact" },
  linda: { name: "Linda", ipa: "[lɪ · nː · də̤]", x: .55,
    function: "Intake whistle → fan drone → valve release" },
} as const;

export function machineForHotspot(id: string): MachineId | undefined {
  return ({ "cabinet-a": "jerry", "cabinet-b": "mike", "cabinet-c": "linda" } as Record<string, MachineId>)[id];
}
