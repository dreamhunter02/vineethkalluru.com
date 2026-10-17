---
layout: ../../layouts/Post.astro
title: "JARVIS on my desk: turning an ESP32 robot into a voice front end for Hermes"
summary: "Local speech, spoken progress, background agents and chimes. What broke on the way, and where it goes next."
date: 2026-10-17
image: /media/demo-poster.jpg
---

I wanted a voice agent on my desk that actually does things: checks my tasks, searches the web,
hands long jobs to background agents and tells me when they're done. I assumed it would mostly be
plumbing. It wasn't.

<video src="/media/jarvis-demo.mp4" poster="/media/demo-poster.jpg" controls playsinline preload="metadata"></video>

JARVIS Desk Bot turns an ESP-VoCat, a small ESP32-S3 desk robot, into a voice front end for a
[Hermes](https://github.com/NousResearch/hermes-agent) agent. You say "Jarvis", ask for something,
and it talks back while the agent works. The code is open source (MIT):
[github.com/dreamhunter02/jarvis-desk-bot](https://github.com/dreamhunter02/jarvis-desk-bot).

## The stack

- **Robot:** ESP-VoCat, with the wake word detected on the device (ESP-SR) and patched ESP-Brookesia firmware.
- **Speech, all local:** xiaozhi-server on a DGX Spark, with Parakeet for speech recognition and Kokoro for speech.
- **Agent:** Hermes, talking to any OpenAI-compatible endpoint. Today that's Nemotron 3.5 Super as the
  main model, DeepSeek V4.1 Flash for fallback and long-running goal agents, and MiMo V2.6 Flash for
  quick helpers.

The speech is local; the agent's model is hosted, for now. I tried a fully local agent, GLM 5.3 Flash
split across two DGX Sparks. It chatted fine, but its tool calls kept coming back as plain text
instead of real calls, and long jobs looped. A local model that reliably calls tools is the piece
I most want to solve.

## What broke along the way

**Silence kills voice.** A text agent can think for 30 seconds and nobody minds. On a speaker,
30 seconds of silence feels broken. Hermes emits an event for every tool it runs, so I turned those
into short spoken lines ("Checking your tasks.", "Searching the web.") plus a "Still working on it."
during long steps. The robot's eyes turn into spirals while it thinks.

**Models announce instead of acting.** With reasoning turned off, models would say "Let me search
for that" and end the turn without calling any tool. The robot heard the turn end and went back to
listening, as if it had answered. Low reasoning plus Hermes's tool-use enforcement fixed it: a web
search answer now takes about 9 seconds, a casual reply about 2.

**Sentence splitting.** xiaozhi-server splits replies on Chinese punctuation, so English came out in
long, choppy chunks. Splitting on English sentence ends lets the first sentence play while the rest
is still being generated.

**Language drift.** Some models occasionally slipped into Chinese mid-reply, so the provider filters
out Chinese characters before they reach the speech model.

**Long jobs vs. voice turns.** A voice turn has to end quickly, or you can't talk to the robot
while it works. So long work runs detached. Quick jobs go to *helpers* (up to about ten minutes).
Bigger ones go to *goal agents*: Hermes kanban cards that work for hours in their own session, and
ask out loud when they're blocked.

**The robot fell asleep mid-task.** The firmware put the robot to sleep ten seconds after I stopped
talking, even while the agent was still working. A small firmware patch keeps it awake until you
say "bye".

**Risky commands.** When Hermes's safety check holds a shell command for approval, the robot now
asks out loud, and your yes or no goes back to Hermes, which carries on with the same task.

## What it does now

- Wake and end chimes, so you know when it's listening and when it's done
- Spoken progress while the agent works
- Google Tasks and reminders by voice
- Background helpers and goal agents that report back when they finish
- Spoken approval before risky shell commands
- Stays in the conversation until you say "bye"

## What's next

The current pipeline is speech recognition → agent → speech. It works, but it has hard limits on
latency and turn-taking. ChatGPT's voice mode feels better because it listens and talks at the same
time. That's where I'm heading: full-duplex speech-to-speech in front, with a real agent behind it
that can use tools and, eventually, a computer.

If you've worked on full-duplex speech models, echo cancellation and barge-in on small devices, or
low-latency ESP32 audio, I'd love to hear from you: [@vineethkalluru](https://x.com/vineethkalluru).

*I work at NVIDIA; this is a personal project.*
