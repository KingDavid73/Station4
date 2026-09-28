import type { Scene } from "../engine/types";

const image = (name: string) => `/assets/station4/${name}.png`;

export const sceneTwo: Scene = {
  id: "red-square",
  title: "STATION 4",
  subtitle: "DAY 9,998 · 8:06 AM",
  roundTitle: "MORNING ROUND",
  faultIndicator: true,
  ending: {
    title: "DAY 9,998",
    text: "The red square is dark. It will probably return.",
  },
  intro: [
    {
      text: "At 8:06, one square on the timing core is already red.",
      aside: true,
      sound: "beep",
    },
    {
      speaker: "TECHNICIAN",
      text: "Morning. Yes, I see it.",
    },
    {
      text: "The square appears most mornings. Nothing outside the room is waiting on it. The failure belongs entirely to Station 4.",
      aside: true,
    },
  ],
  hotspots: [
    {
      id: "desk",
      label: "Modernization notice",
      x: 2,
      y: 34,
      width: 26,
      height: 49,
      walkTo: { x: 14, y: 2 },
      closeup: image("desk"),
      lines: [
        {
          text: "A message waits beneath the parts alerts: FINAL LEGACY SYSTEM MODERNIZATION — SITE ASSESSMENT.",
          aside: true,
          sound: "click",
        },
        {
          text: "The appointment is three days from now. No urgency flag. No explanation of what Station 4 does.",
          aside: true,
        },
        {
          speaker: "TECHNICIAN",
          text: "They call it modernization because—",
          choices: [
            {
              text: "—the new word arrives before the new machine.",
              memory: { key: "modernization", value: "a word that arrives first" },
              response: [{ speaker: "TECHNICIAN", text: "Sometimes years before." }],
            },
            {
              text: "—replacement sounds impolite.",
              memory: { key: "modernization", value: "a polite replacement" },
              response: [{ speaker: "TECHNICIAN", text: "Especially when the thing being replaced can hear you." }],
            },
            {
              text: "—you can put it on one line of an invoice.",
              memory: { key: "modernization", value: "an invoice category" },
              response: [{ speaker: "TECHNICIAN", text: "Removal, installation, disposal. Three lines, if they're honest." }],
            },
          ],
        },
        {
          text: "He marks the message unread and opens the morning fault log.",
          aside: true,
          sound: "click",
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
          text: "Jerry is fine. Jerry would like everyone to know that Jerry is fine.",
        },
        {
          text: "The reels hold their measure. A little oxide has gathered beneath the left guide.",
          aside: true,
        },
        {
          speaker: "TECHNICIAN",
          text: "A new system would—",
          choices: [
            {
              text: "—run quieter.",
              memory: { key: "new_system", value: "quieter" },
              response: [{ speaker: "TECHNICIAN", text: "Quiet isn't the same as healthy. It just gives you less warning." }],
            },
            {
              text: "—diagnose itself.",
              memory: { key: "new_system", value: "self-diagnosing" },
              response: [{ speaker: "TECHNICIAN", text: "Then it sends a code to someone who has never heard it run." }],
            },
            {
              text: "—replace this entire room.",
              memory: { key: "new_system", value: "room-sized replacement" },
              response: [{ speaker: "TECHNICIAN", text: "One cabinet. Maybe half of one." }],
            },
          ],
        },
        {
          text: "He cleans the guide. Jerry repeats the same sentence, with less grit in the middle.",
          aside: true,
          sound: "clack",
        },
      ],
    },
    {
      id: "cabinet-b",
      label: "Red square",
      x: 45,
      y: 15,
      width: 20,
      height: 59,
      walkTo: { x: 51, y: 12 },
      closeup: image("mainframe-b"),
      focusEffect: "fault-lights",
      clearsFault: true,
      lines: [
        {
          text: "[m̩ː · aɪ̯ · ]",
          aside: true,
          sound: "ticker",
        },
        {
          text: "Mike's final relay does not close. The missing click leaves a red square where the green circle ought to be.",
          aside: true,
        },
        {
          speaker: "TECHNICIAN",
          text: "It isn't broken. It's—",
          choices: [
            {
              text: "—late.",
              memory: { key: "daily_failure", value: "late" },
              response: [{ speaker: "TECHNICIAN", text: "Three milliseconds today. Better than yesterday." }],
            },
            {
              text: "—tired.",
              memory: { key: "daily_failure", value: "tired" },
              response: [{ speaker: "TECHNICIAN", text: "So am I. We still close the circuit." }],
            },
            {
              text: "—doing what it always does.",
              memory: { key: "daily_failure", value: "habitual" },
              response: [{ speaker: "TECHNICIAN", text: "Consistency is useful, even when it's the wrong kind." }],
            },
          ],
        },
        {
          text: "Power down. Count five. Reseat the third timing card. Power up. The ritual takes forty-two seconds.",
          aside: true,
          sound: "clank",
        },
        {
          text: "[m̩ː · aɪ̯ · ǃ]",
          aside: true,
          sound: "beep",
        },
        {
          speaker: "TECHNICIAN",
          text: "There you are.",
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
          text: "Linda's pressure is exactly where it was yesterday. Her intake temperature is one degree lower.",
          aside: true,
        },
        {
          speaker: "TECHNICIAN",
          text: "Reliable means—",
          choices: [
            {
              text: "—nothing changes.",
              memory: { key: "reliable", value: "unchanging" },
              response: [{ speaker: "TECHNICIAN", text: "Which is impossible, but useful to aim for." }],
            },
            {
              text: "—you know how it changes.",
              memory: { key: "reliable", value: "familiar change" },
              response: [{ speaker: "TECHNICIAN", text: "One degree with the weather. Two with the dust." }],
            },
            {
              text: "—it fails where you can reach it.",
              memory: { key: "reliable", value: "reachable failure" },
              response: [{ speaker: "TECHNICIAN", text: "And with screws you can still turn." }],
            },
          ],
        },
        {
          text: "He records the temperature and leaves the casing closed.",
          aside: true,
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
          text: "The spare timing card has a date in pencil: 4/12/91. Beneath it, another date has been erased.",
          aside: true,
          sound: "clank",
        },
        {
          speaker: "TECHNICIAN",
          text: "A modern part arrives—",
          choices: [
            {
              text: "—sealed.",
              memory: { key: "modern_part", value: "sealed" },
              response: [{ speaker: "TECHNICIAN", text: "If it fails, you replace the seal and everything behind it." }],
            },
            {
              text: "—identical.",
              memory: { key: "modern_part", value: "identical" },
              response: [{ speaker: "TECHNICIAN", text: "Until the revision number changes." }],
            },
            {
              text: "—with instructions.",
              memory: { key: "modern_part", value: "documented" },
              response: [{ speaker: "TECHNICIAN", text: "The instructions begin with a phone number." }],
            },
          ],
        },
        {
          text: "He returns the card to its shelf. It is not needed today.",
          aside: true,
        },
      ],
    },
  ],
  outro: [
    {
      text: "The three machines resume their old, imperfect measure.",
      aside: true,
      sound: "ticker",
    },
    {
      speaker: "TECHNICIAN",
      text: "Same time tomorrow.",
    },
    {
      text: "The red square is dark. The modernization notice remains unread.",
      aside: true,
    },
  ],
};
