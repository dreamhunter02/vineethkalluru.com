// Everything personal lives here: edit this file to change the theme, intro, links and projects.

// One of: "paper" | "midnight" | "studio" | "terminal" (see src/styles/global.css)
export const THEME = "studio";

export const SITE = {
  name: "Vineeth Kalluru",
  title: "Vineeth Kalluru",
  description:
    "Vineeth Kalluru is an applied AI engineer working on post-training, evals and voice agents.",
  intro: "Hi, I'm Vineeth.",
  bio: "Applied AI engineer working on post-training, evals and voice agents. Lately: an ESP32 robot that talks to my AI agent.",
  chat: "Wanna chat? DM me on X.",
  url: "https://vineethkalluru.com",
  github: "https://github.com/dreamhunter02",
  x: "https://x.com/vineethkalluru",
  linkedin: "", // e.g. "https://www.linkedin.com/in/your-handle"; the footer icon appears once set
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
