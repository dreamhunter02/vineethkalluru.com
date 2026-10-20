// Everything personal lives here: edit this file to change the intro, links and projects.


export const SITE = {
  name: "Vineeth Kalluru",
  title: "Vineeth Kalluru",
  description:
    "Vineeth Kalluru is an applied AI engineer working on post-training, evals and voice agents.",
  intro: "Hi, I'm Vineeth.",
  bio: "I work as an Applied AI engineer helping enterprises deploy AI agents at scale - think data curation, post-training, evals yada yada.. I write about innovative products bridging AI and the real world, my thoughts on this space, and deeper research dives.",
  chat: "Wanna chat? DM me on X.",
  url: "https://vineethkalluru.com",
  github: "https://github.com/dreamhunter02",
  x: "https://x.com/vineethkalluru",
  linkedin: "https://www.linkedin.com/in/vineethkalluru",
};

export interface Project {
  title: string;
  tagline: string; // one line, always visible
  description: string; // shown when expanded
  progress: number; // 0-100
  github?: string;
  x?: string;
  image?: string;
}

export const PROJECTS: Project[] = [
  {
    title: "JARVIS Desk Bot",
    tagline: "An ESP32 desk robot as a voice front end for Hermes",
    description:
      "Turns an ESP-VoCat into a voice front end for a Hermes agent. Local speech (Parakeet + Kokoro), spoken progress while the agent works, background helpers and goal agents that report back, spoken approvals for risky commands, and wake/end chimes. MIT licensed. Next up: full-duplex speech-to-speech.",
    progress: 70,
    github: "https://github.com/dreamhunter02/jarvis-desk-bot",
    x: "https://x.com/vineethkalluru/status/2108388089731436546",
    image: "/media/jarvis-thumb.jpg",
  },
];
