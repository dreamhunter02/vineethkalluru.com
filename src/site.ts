// Everything personal lives here: edit this file to change the intro, links and projects.


export const SITE = {
  name: "Vineeth Kalluru",
  title: "Vineeth Kalluru",
  description:
    "Vineeth Kalluru is an applied AI engineer taking LLMs and agents from POC to production: post-training, evals, inference and agent harnesses.",
  intro: "Hi, I'm Vineeth.",
  bio: "I'm an applied AI engineer who takes open models and agents from POC to production inside customer environments: data curation, post-training, evals, inference and agent harnesses. I've worked on TPUs at Google, a dataflow AI compiler at SambaNova, and enterprise GenAI at NVIDIA. I write about products bridging AI and the real world, and deeper research dives.",
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

export interface Entry {
  title: string;
  meta?: string; // venue, date, status
  href?: string;
  note?: string;
}

export const EXPERIENCE: Entry[] = [
  {
    title: "Senior Solutions Architect, Generative AI, NVIDIA",
    meta: "Nov 2023 - 2026",
    note: "Technical owner of GenAI adoption for 25+ Tier-1 enterprise software and industrial customers, plus Microsoft Azure and OpenAI. Highlights: Zoom on-prem AI Companion (GTC 2026), Cohesity Gaia architecture (GTC 2026 keynote), Nemotron 3 Nano behind Glean's production LLM router, NVIDIA technical lead for Azure's MLPerf Inference v4.0 submission, and the Nemotron-CC data pipeline in NeMo Curator.",
  },
  {
    title: "AI Engineer, Rudhira Biosciences",
    meta: "2026 - Present",
    note: "AI-driven neoantigen discovery platform for Lynch syndrome cancers on AWS HealthOmics.",
  },
  {
    title: "ML Accelerator Architect, Cloud TPU, Google",
    meta: "Jul 2022 - Nov 2023",
    note: "Performance analysis of Gemini workloads on TPU v6 and v7.",
  },
  {
    title: "Compiler / ML Systems Engineer (Team Lead), SambaNova Systems",
    meta: "Feb 2020 - Jul 2022",
    note: "Led a 7-engineer team shipping for-loop and RNN support in a dataflow compiler: about 4x faster online inference and 5x faster LSTM training vs. A100.",
  },
];

export const PUBLICATIONS: Entry[] = [
  { title: "Between Weights and Workflows: Executable Graph Contracts for Bounded Enterprise Agents", meta: "IEEE ICA 2026, Kumamoto. Accepted (oral), first author" },
  { title: "The Coherence Trap: Layer-Decomposed Failure-Mode Discovery in a Deployed Agentic LLM System", meta: "IEEE ISSRE 2026 Industry Track. Presented, first author" },
  { title: "The Agentic Data Platform: A Contention Model and Reference Architecture for Multi-Agent Workloads on the Lakehouse", meta: "IEEE BigData 2026. Accepted, co-author" },
  { title: "Beyond the Blue Link: Empirical Evaluation of Generative Engine Optimization in Stochastic Retrieval Systems", meta: "ACM Hypertext 2026. Published, third author", href: "https://doi.org/10.1145/3800935.3830864" },
  { title: "Edit-Distance Links: A Hypertextual Reading of Conditional-Tokenization World Models", meta: "ACM Hypertext 2026. Published, third author", href: "https://doi.org/10.1145/3800935.3830861" },
  { title: "SkillOpt: Trajectory-Derived, Verifier-Grounded Compilation of LLM-Agent Skills", meta: "ACM CAIS 2026 Agent Skills Workshop", href: "https://openreview.net/forum?id=2ONrrPIFYi" },
  { title: "NVIDIA Nemotron Nano 2: An Accurate and Efficient Hybrid Mamba-Transformer Reasoning Model", meta: "arXiv 2025, co-author", href: "https://arxiv.org/abs/2508.14444" },
  { title: "Hardware Aware Neural Network Architectures using FbNet (HANNA)", meta: "arXiv 2019, first author", href: "https://arxiv.org/abs/1906.07214" },
];

export const TALKS: Entry[] = [
  { title: "Building Agent Harnesses to Match Frontier-Model Performance in RAG", meta: "O'Reilly AI Superstream, Jul 2026" },
  { title: "Building Observable and Scalable Multi-Agent Workflows for Asset Lifecycle Management", meta: "NVIDIA GTC 2026 full-day DLI workshop (co-instructor)", href: "https://www.nvidia.com/gtc/session-catalog/sessions/gtc26-dliw82268/" },
  { title: "Get From Pilot to Production the Quick, Easy, Optimized Way", meta: "Microsoft Ignite 2024", href: "https://www.youtube.com/watch?v=m9e1ItBramY" },
  { title: "Quickly deploy NVIDIA optimized generative AI on Azure AI Studio", meta: "Microsoft Build 2024", href: "https://www.youtube.com/watch?v=8jM7y4aQqag" },
  { title: "Inside Glean's Enterprise Agent Stack: Post-Training NVIDIA Nemotron and Engineering the Agent Harness", meta: "TechEquity AI Summit 2026, Nov 5 (with Glean)", href: "https://events.techequity-ai.org/session/LNind" },
];

export const SERVICE: Entry[] = [
  { title: "IEEE Senior Member", meta: "IEEE Computer Society Elevation Committee" },
  { title: "Program committee", meta: "IEEE ICA 2026; KDD 2026 AgenticSE and Agent4IR workshops" },
  { title: "Reviewer", meta: "IEEE TKDE; NeurIPS 2026 (ethics and workshops); ACM CAIS 2026; KDD 2026 workshops" },
  { title: "Technical reviewer", meta: "AI Agents: The Definitive Guide; Hands-On LLM Serving and Optimization (O'Reilly)" },
];
