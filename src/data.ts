/**
 * Demo data for the Hands Off Editor UI. Every literal here is lifted from the
 * design mock so the screens render exactly what was designed. No backend yet —
 * when one lands, these shapes are the contract to fill.
 *
 * Framework-free on purpose: the React Native app ships a copy of this file.
 */

export type Clip = {
  title: string;
  len: string;
  score: string;
  cap: string;
  alts: string[];
};

export const clips: Clip[] = [
  {
    title: "Why we said no to $4M in revenue",
    len: "0:44",
    score: "9.4",
    cap: "four million dollars in signed intent — GONE",
    alts: [
      "We turned down $4M. Here is why.",
      "The $4M pipeline we deleted on purpose",
    ],
  },
  {
    title: '"I fired myself from my own startup"',
    len: "0:38",
    score: "9.1",
    cap: "so I fired myself — from my OWN company",
    alts: [
      "The day I fired myself",
      "I was the bottleneck. So I quit my own job.",
    ],
  },
  {
    title: "The hire that almost killed the company",
    len: "0:52",
    score: "8.8",
    cap: "one wrong hire nearly ENDED us",
    alts: [
      "One hire. Eleven months of damage.",
      "How a single hire nearly ended us",
    ],
  },
  {
    title: "Nobody tells you this about seed rounds",
    len: "0:41",
    score: "8.6",
    cap: "nobody warns you about THIS part of seed",
    alts: [
      "The seed round nobody warns you about",
      "What your investors will not say out loud",
    ],
  },
  {
    title: "The spreadsheet that changed everything",
    len: "0:57",
    score: "8.2",
    cap: "one spreadsheet changed the whole company",
    alts: [
      "A spreadsheet saved our company",
      "The one model we should have built sooner",
    ],
  },
  {
    title: "How we cut burn by 60% in six weeks",
    len: "0:36",
    score: "7.9",
    cap: "we cut burn 60% in SIX weeks",
    alts: ["60% less burn, six weeks flat", "The six-week burn reset"],
  },
  {
    title: "Our worst launch, in detail",
    len: "0:48",
    score: "7.5",
    cap: "our worst launch, in painful detail",
    alts: [
      "The launch that flopped, step by step",
      "Everything we got wrong on launch day",
    ],
  },
  {
    title: "What I would tell 24-year-old me",
    len: "0:33",
    score: "7.2",
    cap: "what I would tell 24-year-old me",
    alts: ["Advice for my 24-year-old self", "If I could start over at 24"],
  },
  {
    title: "The customer call that reset the roadmap",
    len: "0:51",
    score: "6.8",
    cap: "one call RESET the entire roadmap",
    alts: [
      "The call that killed our roadmap",
      "One customer changed everything we build",
    ],
  },
  {
    title: "On hiring your first ten people",
    len: "0:45",
    score: "6.4",
    cap: "your first ten hires decide everything",
    alts: [
      "Your first ten hires are the company",
      "How to hire the first ten",
    ],
  },
];

/** A score at or above this reads as "high confidence" and tints mint. */
export const HIGH_SCORE = 8.5;

export const captionLines = [
  { t: "0:00", text: "We were three weeks from running out of money.", on: true },
  { t: "0:04", text: "And the board wanted me to raise a bridge.", on: true },
  { t: "0:08", text: "I said no. Everyone thought I had lost it.", on: true },
  { t: "0:13", text: "Because the problem was never the runway —", on: false },
  { t: "0:17", text: "it was that we were selling to the wrong people.", on: false },
  { t: "0:22", text: "So we cut the enterprise pipeline. All of it.", on: false },
  { t: "0:27", text: "Four million dollars in signed intent, gone.", on: false },
  { t: "0:32", text: "Six weeks later we were default alive.", on: false },
];

export const recentProjects = [
  {
    title: "Founder Pod — Ep. 42 with Marcus Ade",
    dur: "1:42:08",
    clips: 10,
    when: "2h ago",
    status: "ready" as const,
  },
  {
    title: "Q3 All-Hands recording",
    dur: "54:20",
    clips: 6,
    when: "yesterday",
    status: "ready" as const,
  },
  {
    title: "Webinar — Retention teardown",
    dur: "1:08:44",
    clips: 0,
    when: "just now",
    status: "scoring" as const,
  },
];

export const projectRows = [
  {
    title: "Founder Pod — Ep. 42 with Marcus Ade",
    src: "youtube.com · 4K",
    dur: "1:42:08",
    clips: 10,
    score: "9.4",
    when: "2h ago",
  },
  {
    title: "Q3 All-Hands recording",
    src: "upload · 1080p",
    dur: "54:20",
    clips: 6,
    score: "8.7",
    when: "yesterday",
  },
  {
    title: "Webinar — Retention teardown",
    src: "zoom cloud",
    dur: "1:08:44",
    clips: 9,
    score: "8.1",
    when: "3 days ago",
  },
  {
    title: "Marcus solo — pricing rant",
    src: "upload · 4K",
    dur: "22:11",
    clips: 5,
    score: "9.0",
    when: "5 days ago",
  },
  {
    title: "Customer story: Halcyon",
    src: "riverside",
    dur: "41:37",
    clips: 7,
    score: "7.8",
    when: "1 week ago",
  },
  {
    title: "Founder Pod — Ep. 41",
    src: "youtube.com · 4K",
    dur: "1:33:02",
    clips: 11,
    score: "8.9",
    when: "2 weeks ago",
  },
  {
    title: "Conference keynote — Lisbon",
    src: "upload · 1080p",
    dur: "38:55",
    clips: 4,
    score: "7.4",
    when: "3 weeks ago",
  },
];

/** Weekly export counts; the last two weeks render in accent. */
export const weeklyExports = [12, 19, 14, 24, 21, 30, 26, 34, 29, 41, 36, 34];

export const topClips = [
  { title: "Why we said no to $4M in revenue", views: "412K", score: "9.4" },
  { title: '"I fired myself from my own startup"', views: "268K", score: "9.1" },
  { title: "The hire that almost killed the company", views: "190K", score: "8.8" },
  { title: "Nobody tells you this about seed rounds", views: "154K", score: "8.6" },
];

export type ExportStatus = "ready" | "rendering" | "expired";

export const exportHistory: {
  title: string;
  project: string;
  platform: string;
  spec: string;
  status: ExportStatus;
}[] = [
  {
    title: "Why we said no to $4M in revenue",
    project: "Founder Pod — Ep. 42",
    platform: "TikTok",
    spec: "1080×1920 · 24s",
    status: "ready",
  },
  {
    title: "Why we said no to $4M in revenue",
    project: "Founder Pod — Ep. 42",
    platform: "YouTube Shorts",
    spec: "2160×3840 · 44s",
    status: "ready",
  },
  {
    title: '"I fired myself from my own startup"',
    project: "Founder Pod — Ep. 42",
    platform: "Instagram Reels",
    spec: "1080×1920 · 38s",
    status: "rendering",
  },
  {
    title: "How we cut burn by 60%",
    project: "Q3 All-Hands recording",
    platform: "TikTok",
    spec: "1080×1920 · 36s",
    status: "ready",
  },
  {
    title: "The spreadsheet that changed everything",
    project: "Webinar — Retention teardown",
    platform: "Instagram Reels",
    spec: "1080×1920 · 57s",
    status: "ready",
  },
  {
    title: "On hiring your first ten people",
    project: "Founder Pod — Ep. 41",
    platform: "YouTube Shorts",
    spec: "1080×1920 · 45s",
    status: "expired",
  },
];

export const notifications = [
  {
    title: "Founder Pod — Ep. 42 is ready",
    body: "10 clips detected. Top score 9.4 — the highest in this workspace so far.",
    when: "2h",
    unread: true,
  },
  {
    title: "Render finished · YouTube Shorts",
    body: '"Why we said no to $4M in revenue" exported at 2160×3840.',
    when: "3h",
    unread: true,
  },
  {
    title: "Dev Anand commented on clip 4",
    body: '"Can we start this one two seconds later? The laugh lands better."',
    when: "5h",
    unread: true,
  },
  {
    title: "You are at 69% of your monthly minutes",
    body: "188 source minutes left. Your cycle resets on 17 August.",
    when: "1d",
    unread: false,
  },
  {
    title: "Instagram account reconnected",
    body: "Scheduling to @fieldnote is active again.",
    when: "2d",
    unread: false,
  },
  {
    title: "New caption style: Karaoke",
    body: "Word-by-word highlighting, tuned for fast speech. Try it on any clip.",
    when: "4d",
    unread: false,
  },
];

/** Processing pipeline stages, indexed by progress / 21. */
export const stages = [
  "Transcribing audio",
  "Separating speakers",
  "Scoring candidate moments",
  "Reframing to 9:16",
  "Writing captions and titles",
];

export function stageFor(progress: number) {
  return stages[Math.min(stages.length - 1, Math.floor(progress / 21))];
}

/** Deterministic pseudo-waveform — same shape every render, no hydration drift. */
export const waveform = Array.from(
  { length: 64 },
  (_, i) => 18 + Math.abs(Math.sin(i * 1.7)) * 62 + (i % 5) * 4,
);

export const miniWaveform = Array.from(
  { length: 34 },
  (_, i) => 22 + Math.abs(Math.cos(i * 1.3)) * 66,
);

/** Candidate-moment regions on the source timeline. */
export const timelineMarkers = [
  { left: "6%", width: "7%", selected: false },
  { left: "19%", width: "6%", selected: false },
  { left: "33%", width: "8%", selected: true },
  { left: "48%", width: "5%", selected: false },
  { left: "61%", width: "7%", selected: false },
  { left: "78%", width: "6%", selected: false },
  { left: "89%", width: "5%", selected: false },
];

export type Message = { who: "you" | "ai"; text: string };

export const initialChat: Message[] = [
  {
    who: "you",
    text: 'Trim clip 2 so it starts right on the "I fired myself" line.',
  },
  {
    who: "ai",
    text: "Moved the in-point to 41:12 — the clip now opens on the line and runs 38s. I also dropped the two seconds of dead air before it.",
  },
  { who: "you", text: "Make the captions more engaging." },
  {
    who: "ai",
    text: "Rewrote 14 caption groups with punchier line breaks and highlighted the emotional keyword in each. Preview updated.",
  },
];

export const quickPrompts = [
  "Make captions more engaging",
  "Find funnier moments",
  "Add zoom effects",
];

export const user = {
  name: "Ilana Ruiz",
  email: "ilana@fieldnote.co",
  role: "Head of Content · Fieldnote",
  workspace: "Fieldnote",
  plan: "Studio plan",
};

export const usage = {
  used: 412,
  total: 600,
  get percent() {
    return (this.used / this.total) * 100;
  },
};
