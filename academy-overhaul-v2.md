# fleshsesh | academy v2 overhaul

## Product direction

Turn the academy from a cinematic course catalogue into a **private adult-learning platform** where the learner always knows:

1. where they are;
2. what they will learn next;
3. why it matters;
4. what it costs;
5. what is saved privately;
6. where education ends and qualified care begins.

The visual world remains dark, cinematic and recognisably fleshsesh, but the learning interface becomes calmer, clearer and more app-like once a learner enters a course.

---

## 1. Curriculum architecture

### Replace the four-level "depth ladder" with four learning schools

| School | Purpose | Learner promise |
|---|---|---|
| **101 · Foundations** | Body, consent, communication, health and respect | Understand the essentials without shame or jargon. |
| **201 · Everyday Practice** | Health navigation, relationships, pleasure, inclusion and digital life | Turn knowledge into safer conversations and practical decisions. |
| **301 · Deeper Study** | Ethics, advocacy, education, kink literacy and service design | Analyse complexity, evidence and context. |
| **401 · Advanced Portfolio** | Facilitation, evaluation, AI, community practice and synthesis | Build an evidence-aware portfolio of learning without implying professional accreditation. |

The numbers indicate learning depth, **not professional qualification or clinical authority**.

### New learning spine

Every course follows:

**ORIENT → LEARN → PRACTISE → CHECK → REFLECT → NEXT**

Each lesson is 6–12 minutes, with an expected unit completion time shown as a range rather than a fixed promise.

### Lesson anatomy

Every module contains:

- **Objective**: one measurable learner outcome.
- **Core lesson**: 400–800 words or 4–8 minutes of narration.
- **Visual explainer**: diagram, timeline, comparison or scenario card.
- **Practice**: fictional scenario by default.
- **Knowledge check**: 2–4 questions.
- **Takeaway**: one thing worth remembering.
- **Support boundary**: when to consult a qualified service.
- **Next step**: continue, revisit or save for later.

### Assessment model

Remove the feeling of an exam-heavy LMS. Use progressive mastery instead:

- **Check** = understand the concept.
- **Apply** = use it in a fictional scenario.
- **Reflect** = optional private reflection.
- **Synthesis** = compare, critique or design.

Do not require disclosure of sexual, health, relationship or identity information.

### Curriculum progression

#### 101 · Foundations

- FSH 101 · Body Literacy
- FSH 102 · Consent, Boundaries & Communication
- FSH 103 · Sexual Health, Hygiene & Self-Care
- FSH 104 · Relationships, Identity & Respect
- FSH 105 · STI & HIV Prevention Essentials

**Suggested completion outcome:** Foundations learner recognition.

#### 201 · Everyday Practice

- FSH 201 · Contraception & Family Planning
- FSH 202 · STI Testing, Treatment & Care Navigation
- FSH 203 · Pleasure, Intimacy & Sexual Communication
- FSH 204 · Relationship Dynamics & Conflict Repair
- FSH 205 · LGBTQ+ Inclusive Sexual Health
- FSH 206 · Digital Intimacy, Privacy & Safety
- FSH 207 · Sexual Wellness & Mental Health

**Suggested completion outcome:** Applied learning recognition.

#### 301 · Deeper Study

- FSH 301 · Reproductive Health, Fertility & Life Planning
- FSH 302 · Kink Education, Negotiation & Safety
- FSH 303 · Communication for Educators & Advocates
- FSH 304 · Sexual Rights, Ethics, Power & Social Context
- FSH 305 · Inclusive Service & Curriculum Design

**Suggested completion outcome:** Deeper study recognition.

#### 401 · Advanced Portfolio

- FSH 401 · Advanced Advocacy & Community Practice
- FSH 402 · Advanced Consent & Relationship Facilitation
- FSH 403 · Evidence, Evaluation & AI in Sexual Education
- FSH 404 · Capstone: Sexual Wellness Education Portfolio

**Suggested completion outcome:** Advanced portfolio recognition.

### Curriculum quality rules

Every course must pass these checks before publication:

- current evidence/source note exists;
- Australian English is used consistently;
- educational vs clinical/legal boundaries are explicit;
- inclusive language is used;
- no learner disclosure is required;
- no explicit sexual imagery is required;
- scenario content is adult-only and non-exploitative;
- AI-generated explanations are labelled as educational guidance;
- emergency/support routes are available where relevant;
- assessment measures the stated objective.

---

# 2. Pricing overhaul

## New commercial model

Stop presenting four arbitrary prices as though level alone determines value. The learner buys **access to a learning unit**, with bundles reserved for future implementation.

### Live products

| Product | Price | Includes |
|---|---:|---|
| **First Look** | Free | One complete sample mission, no account required. |
| **Single Unit · 101** | **A$59** | Full unit, progress tracking, knowledge checks, completion recognition and private syllabus shelf. |
| **Single Unit · 201** | **A$79** | Full applied unit, scenarios, knowledge checks, progress and completion recognition. |
| **Single Unit · 301** | **A$99** | Full deeper-study unit, evidence/context activities and portfolio-ready artefacts. |
| **Single Unit · 401** | **A$129** | Full advanced unit, synthesis activities and portfolio artefacts. |

### Future products, display as "coming soon" only

| Product | Target price | Purpose |
|---|---:|---|
| **Foundations Pass** | A$199 | All five 101 units. |
| **Everyday Pass** | A$399 | All seven 201 units. |
| **Deep Study Pass** | A$399 | All five 301 units. |
| **Full Academy Pass** | A$899 | 101–401 catalogue access. |

These future products must not be connected to checkout until fulfilment, refund/cancellation handling and real Stripe sandbox validation exist.

### Pricing UX

Every paid unit card must answer five questions immediately:

**What is it? · Who is it for? · How long? · What will I learn? · What does it cost?**

Use one primary CTA:

> **Start with A$59**

or the correct price for the unit.

Do not use competing buttons such as Buy / Enrol / Start / Learn More in the same card.

---

# 3. New information architecture

## Public navigation

**HOME · EXPLORE · CAMPUS · CARE · ABOUT · SIGN IN**

Primary CTA: **Explore learning**

## Learner navigation

**TODAY · MY LEARNING · EXPLORE · SAVED · ACHIEVEMENTS · SUPPORT**

The learner dashboard should never feel like a marketing page.

---

# 4. UI/UX overhaul

## Design principle

**Cinematic outside. Calm inside.**

The public site can feel like entering a world. The lesson player should feel like opening a beautifully designed book.

### Public home

1. Full-bleed cinematic hero.
2. 18+ gateway.
3. One-sentence proposition.
4. Three entry choices: **Start free / Explore curriculum / Need support?**
5. Four learning-school cards.
6. Featured courses.
7. How learning works.
8. Faculty / AI guidance explanation.
9. Safety and privacy statement.
10. Footer.

### Explore page

Replace the current catalogue-first experience with:

**Hero → choose your goal → recommended school → course grid**

Goal chips:

- Understand my body
- Communicate better
- Look after my sexual health
- Navigate relationships
- Be safer online
- Explore identity and inclusion
- Study deeper
- Build an education portfolio

These are session-local filters, not profiling.

### Course detail

New structure:

```text
COURSE CODE       101
COURSE TITLE
Short promise

[ duration ] [ 6 lessons ] [ beginner ]

What you'll learn
• ...
• ...
• ...

Inside this unit
01 ─ Lesson
02 ─ Lesson
03 ─ Lesson
...

You do not need to share personal information.

A$59                 [ Start this unit ]
```

### Lesson player

Desktop:

```text
┌───────────────────────────────────────────────────────────────┐
│ fleshsesh | academy              FSH 101 · 03 / 06           │
├───────────────┬───────────────────────────────────────────────┤
│ COURSE        │ LESSON                                        │
│ 01 ✓          │ Objective                                    │
│ 02 ✓          │                                              │
│ 03 ●          │ Core learning content                        │
│ 04            │                                              │
│ 05            │ [ optional media ]                           │
│ 06            │                                              │
│               │ Practice                                     │
│ 72% complete  │ Knowledge check                              │
│               │                                              │
│               │ [ Mark complete & continue ]                 │
└───────────────┴───────────────────────────────────────────────┘
```

Mobile:

- sticky compact header;
- lesson progress bar;
- content first;
- collapsible lesson outline;
- fixed bottom Continue button;
- support action available without leaving lesson.

### Member dashboard

Replace metric-heavy dashboard behaviour with a **Now / Next / Saved** model.

Hero card:

> **Continue where you left off**
>
> FSH 102 · Boundary scripts
> 4 of 6 lessons complete
>
> **Continue →**

Below:

- Next recommended unit, based only on curriculum prerequisites and current enrolments.
- Saved syllabus.
- Recent achievements.
- Support resources.

No public leaderboard. No pressure streaks. No sensitive profiling.

---

# 5. Gamification v2

Keep the useful parts of the existing XP/badge architecture but make it mastery-led.

### XP

- lesson completed: 25 XP
- knowledge check: 10 XP
- practice completed: 15 XP
- unit completed: 100 XP
- capstone submitted: 250 XP

Do not reward time spent on sensitive content or personal disclosure.

### Badges

Use achievement language, not professional credentials:

- **body-literacy**
- **consent-communicator**
- **health-navigator**
- **inclusive-practice**
- **digital-intimacy-safety**
- **community-advocate**
- **curriculum-designer**

### Replace streaks with continuity

Use:

> **Learning rhythm: 3 sessions this month**

instead of:

> **Don't break your streak!**

A learner should never be punished for taking a break.

---

# 6. AI faculty UX

AI faculty should be presented as **learning companions**, not clinicians or therapists.

Primary actions:

- Explain this
- Give me an example
- Quiz me
- Help me compare
- Point me to a source
- Help me find support

Avoid an open-ended prompt being the dominant action on sensitive course pages.

When a question crosses into diagnosis, treatment, crisis, abuse or legal advice, the interface should switch from answer-first to **support-routing mode**.

---

# 7. Visual system

### Palette

- near-black blue-green base;
- warm ivory text;
- muted rose as emotional accent;
- champagne/gold for learning progression;
- restrained green for safe/completed states;
- red only for genuine warnings.

### Typography

- **Righteous** for the fleshsesh brand wordmark only.
- Editorial display face for major headings.
- Highly legible sans-serif for learning content.

### Components

Build a small academy-specific component language:

- `AcademyHeader`
- `SchoolCard`
- `CourseCard`
- `CourseMeta`
- `LearningProgress`
- `LessonOutline`
- `LessonStage`
- `PracticeCard`
- `KnowledgeCheck`
- `SupportBoundary`
- `CompletionPanel`
- `AchievementCard`
- `PriceBlock`
- `SavedToggle`

Prefer reusable variants over page-specific styling.

---

# 8. Accessibility

Target WCAG 2.2 AA behaviour throughout the learner experience.

Required:

- keyboard-visible focus;
- reduced-motion support;
- captions/transcripts for media;
- no autoplay audio;
- readable line length;
- touch targets >= 44px;
- semantic headings;
- persistent progress text in addition to visual progress;
- accessible form labels;
- error recovery that does not erase answers;
- mobile layouts tested at 320px, 390px and 430px.

---

# 9. Technical implementation sequence

### Phase A · Data

1. Update course pricing.
2. Add school metadata.
3. Add course duration range.
4. Add learner-facing learning outcomes.
5. Remove certification/professional implication language.
6. Add future bundle catalogue metadata without creating purchasable Stripe products.

### Phase B · UX

1. Rebuild Explore around learner goals.
2. Introduce SchoolCard and CourseCard.
3. Rebuild course detail.
4. Rebuild lesson player.
5. Rebuild member dashboard around Now / Next / Saved.
6. Reframe achievements as learning recognition.

### Phase C · Commerce

1. Keep single-unit Stripe checkout.
2. Update displayed unit prices.
3. Add bundle products only after sandbox validation.
4. Add clear purchase confirmation and refund/support route.

### Phase D · QA

Run:

- `pnpm check`
- `pnpm test`
- `pnpm build`
- keyboard navigation;
- reduced-motion;
- 320/390/430px mobile;
- desktop 1440px;
- authenticated learner session;
- Stripe sandbox checkout;
- webhook fulfilment;
- enrolment gate;
- lesson completion;
- reward/badge idempotency;
- no-data member preview.

---

# Definition of done

The overhaul is complete when a new adult learner can enter the academy, understand what it is in under 30 seconds, find a relevant starting point without disclosing personal information, understand the price before committing, purchase one unit, complete a lesson, understand their progress, pause safely, and return later without feeling lost.

The platform should feel less like a content warehouse and more like a **private learning house**.
