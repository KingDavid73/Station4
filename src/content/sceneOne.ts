import type { Scene } from "../engine/types";

const image = (name: string) => `/assets/station4/${name}.png`;

export const sceneOne: Scene = {
  id: "midday",
  title: "STATION 4",
  subtitle: "DAY 9,997 · 1:47 PM",
  roundTitle: "MIDDAY ROUND",
  ending: {
    title: "DAY 9,997",
    text: "The room settles into its imperfect rhythm.",
    nextLabel: "Begin day 9,998",
  },
  intro: [
    {
      text: "The room has been running longer than anyone currently employed by the department.",
      aside: true,
    },
    {
      text: "The technician has been here since eight. At 1:47, between one noise and the next, something changes.",
      aside: true,
      sound: "ticker",
    },
    {
      speaker: "TECHNICIAN",
      text: "No. That's new.",
    },
  ],
  hotspots: [
    {
      id: "desk",
      label: "Parts terminal",
      x: 2,
      y: 34,
      width: 26,
      height: 49,
      walkTo: { x: 14, y: 2 },
      closeup: image("desk"),
      lines: [
        {
          text: "Three listings since lunch. Two are mislabeled. One is a printer power supply photographed from a helpful angle.",
          aside: true,
          sound: "click",
        },
        {
          speaker: "TECHNICIAN",
          text: "You can search the number on the casing. That works, if the casing belongs to the part.",
        },
        {
          speaker: "TECHNICIAN",
          text: "Mostly I learned to search for—",
          choices: [
            {
              text: "—what the old men called it.",
              memory: { key: "search_language", value: "the inherited name" },
              response: [{ speaker: "TECHNICIAN", text: "Their names survive better than their catalogues." }],
            },
            {
              text: "—the noise it makes when it fails.",
              memory: { key: "search_language", value: "the failing sound" },
              response: [{ speaker: "TECHNICIAN", text: "A bad noise is usually more searchable than a part number." }],
            },
            {
              text: "—the machine it used to belong to.",
              memory: { key: "search_language", value: "the missing machine" },
              response: [{ speaker: "TECHNICIAN", text: "Sometimes the machine is gone, but somebody photographed its insides." }],
            },
          ],
        },
        {
          text: "He saves a county-auction listing for six untested timing relays. Shipping costs more than the box.",
          aside: true,
          sound: "click",
        },
        {
          speaker: "TECHNICIAN",
          text: "Maybe.",
        },
      ],
    },
    {
      id: "cabinet-a",
      label: "Tape bank",
      x: 28,
      y: 18,
      width: 18,
      height: 58,
      walkTo: { x: 34, y: 11 },
      closeup: image("mainframe-a"),
      focusEffect: "reels-3",
      lines: [
        {
          text: "[ǃɛ · ɹ̠˔ː · i]",
          aside: true,
          sound: "clack",
        },
        {
          speaker: "TECHNICIAN",
          text: "Easy, Jerry. I heard you the first time.",
        },
        {
          text: "The click is the tape gate. The long rhotic rasp is the capstan bearing. The high final tone means the index has been found. Together, they sound enough like Jerry that the name remained.",
          aside: true,
        },
        {
          speaker: "TECHNICIAN",
          text: "The man who showed me this said you diagnose these—",
          choices: [
            {
              text: "—by sound.",
              memory: { key: "first_lesson", value: "by sound" },
              response: [{ speaker: "TECHNICIAN", text: "He said a good ear gets there before the meter does." }],
            },
            {
              text: "—by touch.",
              memory: { key: "first_lesson", value: "by touch" },
              response: [{ speaker: "TECHNICIAN", text: "He never trusted a reading he couldn't feel through the casing." }],
            },
            {
              text: "—by waiting until they finish speaking.",
              memory: { key: "first_lesson", value: "by waiting" },
              response: [{ speaker: "TECHNICIAN", text: "That took him a long time to explain." }],
            },
          ],
        },
        {
          text: "A quarter turn on the tension screw. The missing beat returns.",
          aside: true,
          sound: "clack",
        },
        {
          speaker: "TECHNICIAN",
          text: "There. You were rushing.",
        },
      ],
    },
    {
      id: "cabinet-b",
      label: "Timing core",
      x: 45,
      y: 15,
      width: 20,
      height: 59,
      walkTo: { x: 51, y: 12 },
      closeup: image("mainframe-b"),
      focusEffect: "lights",
      lines: [
        {
          text: "[m̩ː · aɪ̯ · ǃ]",
          aside: true,
          sound: "ticker",
        },
        {
          speaker: "TECHNICIAN",
          text: "Mike, you've dropped the third again.",
        },
        {
          text: "The transformer supplies the syllabic hum. The timing oscillator rises through the diphthong. The final alveolar click is a relay closing. Mike has lost that last click.",
          aside: true,
          sound: "clank",
        },
        {
          speaker: "TECHNICIAN",
          text: "They said that when all three of you were right, the indicator would—",
          choices: [
            {
              text: "—turn green.",
              memory: { key: "green_circle", value: "a promised result" },
              response: [{ speaker: "TECHNICIAN", text: "A green circle. Like it was a promise somebody had made." }],
            },
            {
              text: "—stop asking.",
              memory: { key: "green_circle", value: "an end to the question" },
              response: [{ speaker: "TECHNICIAN", text: "As if the room would finally have nothing left to say." }],
            },
            {
              text: "—sound like nothing was wrong.",
              memory: { key: "green_circle", value: "perfect harmony" },
              response: [{ speaker: "TECHNICIAN", text: "No gaps. No correction. Just the way they intended it." }],
            },
          ],
        },
        {
          speaker: "TECHNICIAN",
          text: "Not today. But closer.",
          sound: "beep",
        },
      ],
    },
    {
      id: "cabinet-c",
      label: "Cooling stack",
      x: 64,
      y: 17,
      width: 18,
      height: 59,
      walkTo: { x: 68, y: 11 },
      closeup: image("mainframe-c"),
      focusEffect: "reels-2",
      lines: [
        {
          text: "[ɬ̩ː · ɪn · d̥ə̥]",
          aside: true,
          sound: "steam",
        },
        {
          speaker: "TECHNICIAN",
          text: "Linda.",
        },
        {
          text: "Air across the grille makes the lateral fricative. The fan supplies the nasal center. The pressure valve gives the breathy final release. Linda, if you have listened long enough.",
          aside: true,
        },
        {
          speaker: "TECHNICIAN",
          text: "She always ran—",
          choices: [
            {
              text: "—hot when it rained.",
              memory: { key: "linda_past", value: "weather-sensitive" },
              response: [{ speaker: "TECHNICIAN", text: "Every storm, like she could smell it before we could." }],
            },
            {
              text: "—quiet when people visited.",
              memory: { key: "linda_past", value: "shy around visitors" },
              response: [{ speaker: "TECHNICIAN", text: "She would settle down the moment an inspector came through." }],
            },
            {
              text: "—steadier than the others.",
              memory: { key: "linda_past", value: "the reliable one" },
              response: [{ speaker: "TECHNICIAN", text: "You could count on her, which isn't the same as being quiet." }],
            },
          ],
        },
        {
          text: "He bleeds the line until the hiss descends below hearing. The pressure needle stops trembling.",
          aside: true,
          sound: "steam",
        },
        {
          speaker: "TECHNICIAN",
          text: "Thank you.",
        },
      ],
    },
    {
      id: "parts",
      label: "Parts heap",
      x: 81,
      y: 46,
      width: 18,
      height: 37,
      walkTo: { x: 82, y: 3 },
      closeup: image("parts-pile"),
      lines: [
        {
          text: "Nothing here is garbage. Garbage is something whose use has ended.",
          aside: true,
          sound: "clank",
        },
        {
          text: "He finds a relay wrapped in a work order from 1989. The contact is burned black. Initials fill the margin.",
          aside: true,
        },
        {
          speaker: "TECHNICIAN",
          text: "I used to think this pile was—",
          choices: [
            {
              text: "—what they left me.",
              memory: { key: "parts_pile", value: "an inheritance" },
              response: [{ speaker: "TECHNICIAN", text: "An inheritance is just a problem with somebody else's handwriting." }],
            },
            {
              text: "—what they couldn't solve.",
              memory: { key: "parts_pile", value: "unfinished work" },
              response: [{ speaker: "TECHNICIAN", text: "Some of it only needed a person with one more afternoon." }],
            },
            {
              text: "—the department's memory.",
              memory: { key: "parts_pile", value: "a memory" },
              response: [{ speaker: "TECHNICIAN", text: "Memory takes up more floor space than you'd expect." }],
            },
          ],
        },
        {
          text: "The relay goes into his left pocket. The work order goes into his notebook.",
          aside: true,
        },
        {
          speaker: "TECHNICIAN",
          text: "Not the same thing.",
        },
      ],
    },
  ],
  outro: [
    {
      text: "For six seconds, the room almost finds a common measure.",
      aside: true,
      sound: "ticker",
    },
    {
      speaker: "TECHNICIAN",
      text: "I know. I heard it too.",
    },
    {
      text: "No indicator changes color.",
      aside: true,
    },
    {
      speaker: "TECHNICIAN",
      text: "All right. Keep talking.",
    },
  ],
};
