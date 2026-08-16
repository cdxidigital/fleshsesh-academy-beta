# fleshsesh | academy — Launch Acceptance Runbook

## Purpose and operating boundary

This runbook covers the acceptance checks that cannot be completed in preview mode because they require a **consenting authenticated learner**, the owner-claimed **Stripe test sandbox**, or a **real mobile browser viewport**. It is intentionally designed to validate real platform behaviour without inventing learner activity, creating synthetic learner records, or collecting private disclosures.

> Use a consenting test participant and a purpose-created test account. Do not use an intimate personal history, intimate image, device identifier, or private relationship detail as test data.

| Acceptance area | Required condition | Do not do | Evidence to retain |
| --- | --- | --- | --- |
| Paid enrolment | Stripe test sandbox claimed by the owner | Run a live charge or use a personal payment method | Course code, timestamp, checkout-session outcome, no payment details |
| Learner progress | Consenting signed-in test member | Seed or impersonate learner records | Course code, visible progress state, timestamp |
| Recognition and archive | Same test member with actual completion activity | Create badges or readiness states directly in the database | Visible no-data/in-progress/ready state, source course code |
| Mobile pathways | A physical device or responsive interactive browser | Treat a static screenshot as click-through acceptance | Device/browser, route, completed destination |
| Arena readiness | Preview route only | Discover, pair, authenticate, control, or collect telemetry from any device | Destination URL and displayed non-live boundary |

## Preflight checks

Before beginning, confirm the deployed domain is the current checkpoint, the adult gateway appears before protected content, and the Stripe sandbox is in **test** mode. The participant should read the adult-learning purpose, give explicit consent to test the platform, and use the intended OAuth sign-in flow. The participant may stop the test at any point.

Create a simple acceptance log containing only a date/time, initials or a non-identifying tester label, route, course code, expected outcome, observed outcome, and pass/fail result. Do not record chat prompts, payment details, intimate activity, device data, or unrelated account information.

## 1. Stripe test enrolment and access control

1. With the sandbox claimed, sign into a purpose-created test learner account and confirm the member workspace initially has no fabricated course activity.
2. Open one public course unit, note its course code and test price, then choose the normal enrolment route.
3. Complete the sandbox checkout using the payment method and test process authorised in the Stripe dashboard. Do not use a live payment method.
4. Return to the academy and wait for the documented success/webhook flow to complete. Refresh once if needed; do not alter the database.
5. Confirm that only the purchased course becomes accessible to the signed-in test learner, while a different protected course remains gated.
6. Record the purchased course code and visible outcome. Exclude card numbers, payment IDs, billing details, and screenshots containing sensitive payment information.

**Pass condition:** the completed test checkout activates the matching course for the matching signed-in learner only; unrelated courses remain gated.

## 2. Actual lesson completion, progress, rewards, and recognition

1. Use the already enrolled test learner and complete one unit through its normal learning sequence. The learner may use ordinary, non-personal answers wherever the unit permits.
2. Confirm the member workspace reflects the recorded progress and any earned XP, streak, or badge state without exposing information from another learner.
3. Check the certificate-readiness panel at these natural milestones: no active enrolment, active but incomplete enrolment, and actual completion. Do not manufacture any of these states.
4. Open the achievement archive from the authenticated member workspace. Confirm it displays only existing earned course-completion badges and explains that it does not issue an accredited, clinical, legal, or professional credential.
5. Sign out, sign back in, and confirm only the test learner’s own progress and recognition state is shown.

**Pass condition:** progress, rewards, recognition readiness, and archive entries are derived only from the signed-in learner’s actual enrolment and completed learning activity.

## 3. True mobile interactive pathways

Use a real mobile browser or device simulator capable of dispatching normal touch events. Start from a fresh page load after confirming the local adult gateway.

| Path | Required interaction | Pass condition |
| --- | --- | --- |
| Homepage → Campus → Facility → Learning | Tap the public entry, select a room, then open its mapped collection | Each tap reaches the correct route and mapped course set without clipped controls |
| Orientation → Facility → Learning | Tap a native orientation lens and then the mapped-unit action | The selected route is retained in the URL and the filtered atlas opens correctly |
| Shelf persistence | Save and remove a course from both Orientation and Learning | Count, visible save/remove state, and code-only shelf content remain consistent across routes |
| Arena → Readiness | Tap `Review connector readiness` | The non-live reference opens; no device or provider operation begins |
| Keyboard/focus | Connect a hardware keyboard or accessibility keyboard where practical | Skip link becomes visible and targets the active main landmark |

**Pass condition:** all actions are usable at the mobile viewport with no overflow, obscured actions, accidental disclosure collection, or device operation.

## 4. Final safety and privacy confirmation

Before launch acceptance is marked complete, confirm that the following are still true in the deployed experience.

- The age gateway remains visible before protected learning, faculty, or media flows.
- The faculty guidance remains educational and directs clinical, crisis, coercion, severe symptom, and emergency topics toward appropriate human support.
- The browser-local syllabus shelf and recently viewed thread contain only validated course codes and can be cleared locally.
- The Arena readiness reference still prohibits discovery, pairing, provider authentication, telemetry, device control, and remote commands.
- No test required a personal disclosure, authentic private data, a real payment, or a connected device.

## Sign-off template

| Area | Tester label | Date/time | Result | Evidence location | Notes |
| --- | --- | --- | --- | --- | --- |
| Stripe test enrolment |  |  | Pass / Fail |  |  |
| Course access control |  |  | Pass / Fail |  |  |
| Lesson completion and progress |  |  | Pass / Fail |  |  |
| Recognition and archive |  |  | Pass / Fail |  |  |
| Mobile pathway and shelf |  |  | Pass / Fail |  |  |
| Mobile Arena readiness |  |  | Pass / Fail |  |  |
| Mobile skip-link focus |  |  | Pass / Fail |  |  |

Do not mark a deferred check as passed from preview screenshots alone. Record the first real-session or true-mobile outcome, then update `todo.md` and the validation notes with the result and any follow-up work.
