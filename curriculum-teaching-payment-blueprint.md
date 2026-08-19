# fleshsesh | academy — curriculum, teaching & payment blueprint

## Source basis and implementation boundary

This blueprint translates the uploaded research report and pasted content into an **individual-focused adult eCampus** model. It adopts the report’s useful learning-design recommendations—short lessons, explicit objectives, immediate formative feedback, transparent pricing, and accessible AI guidance—while retaining the platform’s existing safeguards. It does **not** introduce mandatory disclosure, coercive streak mechanics, public leaderboards, diagnostic health guidance, professional credentials, or claims of accreditation.

| Design area | Source-informed decision | Platform boundary |
|---|---|---|
| Curriculum | Retain the existing four-level atlas, but present every unit as a sequence of short, focused learning steps. | Learning is for individuals; advanced content does not confer clinical, legal, professional, or regulated authority. |
| Teaching | Every step has one focus, a plain-language explanation, an optional fictional scenario, and a short knowledge check. | Learners can choose a non-disclosure practice route; AI never requires personal sexual, health, or relationship details. |
| Feedback | Keep immediate, supportive completion feedback and existing XP/badges tied to learning steps. | No public ranking, pressure-based streaks, token economy, or rewards for disclosure or sensitive-content time. |
| AI | Use the existing Tutor, Student Services, Health Advisor, and Special Guests roles to explain, orient, and refer. | Health Advisor is educational only; it does not diagnose, treat, prescribe, or replace urgent or professional care. |
| Access & payment | Keep a transparent one-time AUD unit purchase as the launch payment product. | A paid enrolment unlocks the exact unit after confirmed Stripe fulfilment; no subscription is represented as active until it is built and tested. |

## The learner journey

The journey should be visible as a simple sequence:

> **Choose a topic → take a short learning step → practise privately → check understanding → decide the next unit.**

The current curriculum levels express different depths of individual learning rather than professional standing.

| Level | Learner purpose | Teaching pattern | End-of-level outcome |
|---|---|---|---|
| 101 — Foundations | Build body, consent, relationship, and health-service literacy. | Short plain-language steps and myth-checks. | Make more informed personal choices and know when to seek qualified support. |
| 201 — Applied learning | Explore specific topics in more depth. | Guided fictional scenarios and practical communication tools. | Use safer language, questions, and support-navigation plans. |
| 301 — Deeper study | Examine complex contexts, ethics, and evidence. | Source comparison, structured reflection, and inclusive case work. | Develop a deeper, evidence-aware perspective for personal learning or bounded peer discussion. |
| 401 — Advanced exploration | Study systems, evidence, and community context. | Longer synthesis and evaluation activities. | Complete a personal learning portfolio without representing professional competence. |

## Teaching model for every unit

Each existing unit will retain its six to eight teaching modules, but each module should follow a consistent microlearning rhythm of approximately **5–10 minutes**.

1. **One thing to understand.** A direct objective states what the learner can explain, recognise, compare, or prepare.
2. **Explore.** A brief, evidence-aware explanation uses inclusive language and distinguishes education from individual advice.
3. **Practise privately.** A fictional scenario or non-disclosure alternative lets the learner apply the idea without sharing personal details.
4. **Check.** A short knowledge check reinforces learning with supportive, non-shaming feedback.
5. **Continue or pause.** The learner may return later, revisit a step, ask an AI tutor for a general explanation, or choose the next module.

## Payment model for launch

The research supports flexible payment options. For the current, individually focused academy, the launch model should remain intentionally simple and truthful.

| Product | Access | Launch status | Payment rule |
|---|---|---|---|
| First look | A non-recorded public orientation and selected free teaching preview. | To implement next. | No payment, account, progress, or personal data required. |
| Individual unit | One protected course with all microlearning steps and private progress record. | Existing payment product. | One-time AUD payment at the displayed level-based price after authenticated checkout. |
| Foundations collection | A transparent discounted collection of 101 units for learners who want a broad starting point. | Product definition only; no checkout until implemented and Stripe tested. | One payment should create the relevant individual course enrolments only after fulfilment. |
| All-access subscription | Library access billed monthly or annually. | Deferred. | Requires an explicit Stripe subscription implementation, cancellation terms, and sandbox validation before it can be offered. |

Existing individual-unit price bands already sit within the report’s suggested broad range for one-time course purchases:

| Curriculum depth | Current displayed unit price | What the learner receives |
|---|---:|---|
| 101 | AUD 49 | Six guided foundation steps, private learning record after enrolment, and course-completion recognition. |
| 201 | AUD 59 | Applied topic unit with guided scenarios and safe support boundaries. |
| 301 | AUD 69 | Deeper evidence and context learning. |
| 401 | AUD 79 | Advanced exploration with explicit non-professional boundary. |

## Explicit exclusions

The following report recommendations are intentionally **not** adopted at launch because they conflict with the platform’s privacy, safety, or scope boundaries:

- Public leaderboards, social feeds, mandatory quests, and loss-framed streak pressure.
- Tokens redeemable for merchandise or external rewards.
- Personalisation that profiles sexual, health, relationship, or identity information.
- Challenge exams, portfolio recognition, proctoring, external credit, formal certificates, micro-credentials, or Open Badges represented as regulated credentials.
- Micropayments for hints or AI guidance.
- Any health, legal, or clinical diagnosis, treatment, prescription, or claim of professional authority.

## Implementation priority

1. Add consistent short-step duration and objective labels to existing teaching modules.
2. Add a public, non-recorded first-look preview of the teaching rhythm.
3. Keep one-time individual-unit checkout live as the only transactional product until the Stripe test sandbox is claimed and real-session validation is complete.
4. Define Foundations collection enrolment rules and price only after a schema, fulfilment, and cancellation review.
