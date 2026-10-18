---
layout: ../../layouts/Post.astro
title: "FinanceHarness: My experiments with building a dedicated agentic retrieval harness for finance tasks"
summary: "FinanceHarness got into RL4LLM-Agents at ICAIF. How a better room, not a bigger model, took a 4B agent from 37% to 67% on FinanceBench, and where it still falls over."
date: 2026-10-17T18:00:00Z
image: /media/financeharness/trajectories.png
---

Some days are just amazing. This was one of them:

![Notification of Paper Status: Accept. Financeharness: Engineering a Finance Retrieval Harness for Search Agents Powered by Sub-10B Models, accepted at the RL4LLM-Agents workshop of the 7th International Conference on AI in Finance](/media/financeharness/acceptance.webp)

Our paper, **Financeharness: Engineering a Finance Retrieval Harness for Search Agents Powered by
Sub-10B Models**, got into the RL4LLM-Agents workshop at the 7th International Conference on AI in
Finance. This was an independent side project I worked on. A lot of evenings, and a stubborn belief that small models deserve better tools.

Here's the story, including the parts that didn't work.

## TL;DR

- Small open models (under 10B parameters) are great to deploy, but they're terrible at long,
  messy research tasks like "find this number in a company's annual report".
- Instead of fine-tuning them, we rebuilt the **environment** they work in: a harness that tracks
  evidence, remembers where the agent has been, and refuses answers without receipts.
- Same Qwen3.5-4B, same weights: **55 → 100 correct out of 150** FinanceBench questions, with
  **half the tool calls**.
- The same harness, untouched, works across model sizes: 59–81% correct for Qwen3.5-4B,
  Qwen3.5-9B and GLM 5.3 Flash.
- The big remaining failure isn't wrong answers. It's agents that **find the evidence and then never
  answer**.

## The problem: a lookup that isn't a lookup

Take a question like *"What is Activision Blizzard's three-year average of capex as a share of
revenue?"* It sounds like a lookup. It's actually six decisions in a trench coat: pick the right
company, the right filing, the right fiscal years, the right table, read the units correctly, and do
the arithmetic. Each step can fail on its own.

Big models paper over this by holding a huge trajectory in context. A 4B model can't. It forgets
what it already searched, which pages it read, and which text supports its answer. So it does what
any of us would do with no memory: it searches again. And again.

## The idea: fix the room, not the model

I didn't touch the weights. I built Financeharness around three rules:

1. **Discovery is not evidence.** Search results are just *candidate locations*. Only actually
   reading the source text produces a **receipt**: the exact text the agent saw, pinned to a
   document, page and offsets.
2. **State is managed, not requested.** The harness keeps a receipt ledger and a working memory
   (what's been searched, what failed, which pages were read) and packs a small, bounded view of them
   into every prompt. The model never has to call a "memory" tool.
3. **Submissions are validated.** The final answer is only accepted if every citation points to a
   receipt the agent really collected. No receipt, no answer.

![Financeharness architecture: the policy LLM calls discovery, inspection and submission tools through a router; the harness keeps working memory and a receipt ledger and packs a bounded view into each prompt; evaluation happens offline](/media/financeharness/architecture.png)

A few choices I'm proud of for being boring:

- **No vector database, no embeddings, no pre-indexing.** The agent searches raw PDFs with BM25 and
  grep. Adding a filing means dropping in a PDF. (Keyword search turns out to be [surprisingly
  enough](https://arxiv.org/abs/2602.23368) for agents.)
- **No calculator.** Arithmetic stays the model's job. Spoiler: it was rarely the problem.
- **Six tools total:**

| Tool | What it returns | Creates a receipt? |
|---|---|---|
| `bm25_search` | Ranked candidate pages | No |
| `search_tables` | Candidate table pages | No |
| `grep_document` | Exact matches in a document | Yes |
| `read` | A window of source text | Yes |
| `read_table` | Page text around a table | Yes |
| `finish` | Checks the answer schema and citations | No |

## My favorite failure: 48 searches for a file that doesn't exist

Back to Activision Blizzard. With only minimal tools (search, grep, finish), the 4B model searched
for the FY2017 and FY2018 annual reports. The search kept returning the FY2019 report, which
already contains all three years. The model's own reasoning, verbatim:

> "The search is returning the 2019 10-K document. I need to find the actual 2017 and 2018 10-K
> filings."

Then it searched for them **48 more times**. It never opened a single page. Fifty calls, no answer,
reward zero.

Same model, full harness: its year-filtered searches came back empty, the harness logged them as
failed paths in working memory, and on the next turn the model changed strategy. It searched for the
income statement and cash-flow statement, read two pages, and submitted the correct **1.9%** with
citations. Nine calls.

![The same Qwen3.5-4B on the same question: the minimal harness searches 48 times and runs out of calls; the full harness reads two statement pages and submits the correct answer in nine calls](/media/financeharness/two-harnesses.png)

Nothing about the model changed. It just finally had a memory of its own dead ends.

## Results

Every arm ran all 150 questions of the public FinanceBench release (600 episodes in all), with one
LLM judge, blinded to which harness produced each answer.

**Same model, different harness (Qwen3.5-4B):**

| | Minimal harness | Full harness | Change |
|---|---|---|---|
| Correct answers | 55 (37%) | **100 (67%)** | +45 |
| Mean reward | 0.41 | **0.67** | +64% |
| Accepted answers | 68 (45%) | **114 (76%)** | +46 |
| Tool calls (mean / median) | 28.2 / 21 | **14.8 / 7** | −48% |
| Hit the 50-call cap | 68 | **24** | −44 |
| Tokens per episode | 233k | **104k** | −55% |

Better *and* cheaper, which almost never happens. Question by question, the harness fixed 52
answers and broke 7 (McNemar p < 10⁻⁸).

This is my favorite figure in the paper. Every row is one question, every cell one tool call. On the
left, the minimal agent: a wall of blue searches slamming into the 50-call cap. On the right, the
same model with the harness: a few searches, a couple of reads, done.

![Every Qwen3.5-4B trajectory on all 150 questions: with minimal tools almost half the episodes search until the 50-call cap; with the full harness most finish within 10 calls; the harness fixes 52 questions and breaks 7](/media/financeharness/trajectories.png)

**Same harness, different models:**

| | Qwen3.5-4B | Qwen3.5-9B | GLM 5.3 Flash |
|---|---|---|---|
| Correct answers | 100 (67%) | 89 (59%) | **121 (81%)** |
| Accepted answers | 114 (76%) | 94 (63%) | **141 (94%)** |
| Tool calls (mean) | 14.8 | 11.7 | **7.7** |

No per-model tuning. And yes, the 4B beat the 9B, which I'll get to.

## Where it still falls over: they find it, but don't finish

Accuracy tells you how often an agent is right, not where it goes wrong. So in a follow-up analysis
we placed every episode at the *first* stage where it broke: finding the filing, opening it, reading
the right page, answering, submitting. Because every read leaves a receipt, most of this needs no
judge at all.

The picture was not what I expected:

![Where each episode first fails, by model, and answer rate against accuracy-when-answering: models differ far more in how often they answer than in how accurate their answers are](/media/financeharness/failure-stages.png)

- **Retrieval is basically solved.** Every main model surfaced the right filing for 97% of questions.
- **The biggest failure is no answer at all.** For Qwen3.5-4B, 29 of its 50 misses were unanswered,
  and in 19 of those the agent had *already read the page with the answer*.
- **Answering, not accuracy, separates the models.** When they do answer, Qwen3.5-4B and GLM are
  about equally accurate (83% vs 85%). GLM wins because it answers more often (95% vs 81%).

And they fail to finish in two very different ways:

![Why questions go unanswered: Qwen models over-search until the 50-call cap; Qwen3.5-9B, Gemini and LFM run out of completion tokens or stop without calling finish](/media/financeharness/no-answer.png)

- **Over-searching.** One agent read the correct page of American Express's 10-K on its third call,
  then went looking for registered debt securities that don't exist (the right answer was "none").
  45 searches later, it hit the cap. Some agents just can't take "it's not there" for an answer.
- **Truncation.** Qwen3.5-9B tends to think until it runs out of its 1,024-token response budget.
  In one episode it read the exact AMD table it needed, then emitted an empty message. That's most of
  why the 9B trails the 4B.

A few other humbling things:

- **Arithmetic was almost never the problem.** No calculator, and only 3 arithmetic mistakes among 64
  wrong answers. The real errors were semantic: the wrong line item or entity (16) and misreading the
  evidence (16).
- **Sometimes the benchmark is wrong too.** 16 "wrong" answers involved references the judge flagged
  as wrong or ambiguous.
- **Tool calling can be the whole game.** LFM2.5-8B-A1B found correct answers it never submitted,
  because it rarely called `finish`.

The lesson for me: **invest in commitment, not more retrieval.** Tell the agent when its ledger
already holds enough evidence, force a best-effort answer before the budget runs out, and give
thinking its own budget.

## Honest caveats

- One seed per arm. The question-by-question comparison is our strongest evidence.
- An LLM judge (Claude), not FinanceBench's human graders. Same judge for every arm, but it's still
  not human review.
- The minimal-vs-full comparison changes several things at once, so it measures the whole harness,
  not any single piece. Ablations are next.
- Benchmark questions may have leaked into pretraining. Filing QA isn't live market research.

## What's next: training inside the harness

Everything so far uses frozen weights. Next, we train *inside* the harness: start from Qwen3.5-4B,
generate source-backed questions from filings outside the test set, and optimize with GRPO. The
failure analysis tells us what to reward: make unanswered episodes costly, and give credit for
committing once the evidence is in hand. A reward that only pays for correct, submitted answers can
be gamed by searching longer, and we've already watched our agents try.

Thanks to the RL4LLM-Agents reviewers. If you're
building search agents on small models, I'd love to compare notes. DM me on
[X](https://x.com/vineethkalluru).
