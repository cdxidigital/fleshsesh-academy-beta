# Campus Validation Notes

The production campus route preserves the existing 18+ gateway boundary. In development only, `?preview=academy` mirrors the homepage preview state so the facility route can be visually assessed without writing synthetic learner data or weakening the deployed access guard.

At desktop size, the campus page presents four distinctly illustrated facility cards, a selected-world detail panel, and a consent-first esports interface. The page uses a calm eClinic room, dark-academia law library, candid residence setting, and neon esports venue to keep facility roles immediately legible without explicit imagery.

The Esports Arena intentionally labels its current interface as a non-live preview. Its disabled connection posture, four affirmative consent statements, data-minimisation language, and always-available emergency-stop control are visible before a future provider bridge could be proposed.

## Facility Learning Paths

The learning catalogue now accepts a facility route state. `facility=eclinic` displays FSH 103, FSH 105, FSH 202, and FSH 301; `facility=esports` displays FSH 206, FSH 302, and FSH 403. Each pathway preserves its filter while a learner opens a unit and returns to the catalogue.

Desktop validation confirmed the eClinic path renders only its four mapped care-navigation units. Mobile validation confirmed the Esports Arena path renders only its three mapped digital-safety and adult-consent units with headings, record status, cards, and course actions remaining readable at 390px wide.

## Interactive Development Checks

The desktop journey was exercised from the eCampus homepage through the Campus entry point, into the Esports Arena, and onward to `/learn?facility=esports&preview=academy`. The filtered pathway correctly displayed only FSH 206, FSH 302, and FSH 403, and its Campus Facilities return preserved development-only age-access state. The production paths do not carry the preview query and continue to rely on the existing browser-local age confirmation.

Within the Esports Arena, all four affirmative consent statements were selected before the local lobby could enter its `ready` state. The local preview then reached its `paused` state, while the emergency-stop and disconnect controls both retained the explicit message that no real provider or personal device was connected. The browser's development preview ribbon overlaps the lower control row at this viewport, so the start and pause handlers were exercised directly through the rendered DOM; this does not change production behaviour or trigger a hardware action.

The responsive pass used 390×844 full-page captures for both the Campus route and facility-filtered learning routes. All four facility image cards stack clearly, the selected facility retains a readable image and course-pathway action, and the tournament consent and local-lobby controls remain visible as a single vertical flow. The interactive browser environment cannot resize its viewport, so responsive interaction was evaluated by combining the desktop click-through journey with the mobile rendered-state captures.

## Dedicated Facility Rooms

The Law Library room validated at desktop size as a complete editorial learning journey: its cinematic library hero, three learning modes, private prompt selector, four mapped courses, Professor Linh Patel handoff, and three adjacent-room cards are all visible and readable. The Residence Life room validated at 390px wide as a single-column experience: its room note, communication/reparation/belonging studio cards, prompt lens, four-course list, faculty handoff, and onward room navigation remain legible and have no clipped controls. All room copy retains adult-only, non-explicit, non-disclosive safeguards.

Each mapped course card now opens its precise unit detail while preserving the facility filter in the learning route. The Law Library’s FSH 102 deep link was verified at desktop size: it opens the correct enrolment-gated unit and its return control remains labelled “Law Library pathway.”

Facility faculty handoffs now carry the selected lecturer into the existing AI faculty studio. The Residence Life Amara Williams handoff was verified with `faculty=amara`: the faculty view presented Amara’s selected scope, teaching prompts, and correctly labelled educational question field rather than defaulting to another lecturer.

The Esports Arena room now offers a direct handoff to the pre-existing, non-live tournament lobby. The anchored route selected Esports as the active facility and settled on the consent-first session protocol, including its four acknowledgements, emergency stop, pause and disconnect controls, and the explicit notice that no provider or personal device is connected.

## Visual Redesign Validation

The redesigned protected unit view was checked through the existing development-only lesson preview at desktop and 390px mobile widths. The teaching sequence, current module, non-disclosure practice, knowledge check, completion action, unit progress, and reward boundary are visible without creating learner data or weakening production enrolment gates.

The redesigned adult gateway was also checked at desktop and 390px mobile widths through the development-only age-gate preview. The desktop form pairs the clear adult-learning confirmation with an editorial Residence Life visual panel; the mobile layout keeps the same confirmation and explanatory copy in a readable single-column form, with both confirmation and leave actions reachable.

The new route-discovery orientation was rendered at desktop and 390px mobile widths. Its four visual learning conversations, non-disclosure framing, faculty/clinical boundary language, and no-storage notice remain visible and readable. The next check exercises the selected-route handoff to the mapped facility and learning collection.

During the first interactive route selection attempt, the click focused and scrolled the digital-confidence card but the selected-route panel did not update. This interaction state requires correction before the facility and filtered-catalogue handoff is accepted.

The corrected route-discovery interaction was then exercised with the digital-confidence lens. It selected the Esports Arena without storing a profile, displayed FSH 206 and FSH 302 as the first mapped units, and handed off to `/learn?facility=esports&preview=academy`. The resulting filtered catalogue correctly displayed FSH 206, FSH 302, and FSH 403. The same orientation card system was visually validated at desktop and 390px mobile widths.

The browser automation’s index click and coordinate click on the large orientation cards did not dispatch the expected state update, although the same rendered button handler updated state when invoked by the browser DOM. This is documented as an automation-control limitation rather than accepted direct-click validation; the actual user-facing route remains visually and structurally intact, and true mobile click-through remains an explicit pending acceptance check.

The selected orientation route is now URL-addressable. Loading `orientation?route=esports&preview=academy` reliably restores the Esports Arena hero, selected card state, mapped-unit summary, and both handoff actions without relying on transient client state.

The private syllabus shelf was rendered at desktop and 390px mobile widths with the selected Esports route. The browser-local course-code boundary, no-account/no-enrolment/no-progress messaging, three save controls, and empty shelf state remain visible and readable. Functional save/remove persistence is the next acceptance check.

The browser automation’s direct click on the visible “Save FSH 206” control did not update the rendered state, matching the previously documented development-preview click-dispatch limitation. This remains a test-environment constraint; direct shelf persistence is verified separately through its rendered state and browser-local storage boundary.

The rendered FSH 206 save action was then exercised in the development browser. After state settled, the control became “Remove FSH 206” and the private shelf showed the corresponding course card. The visible shelf continues to state that it is browser-local only and does not create a member, enrolment, progress, reward, or completion record.

The companion remove action was exercised and restored the empty shelf plus “Save FSH 206” control. The shelf therefore adds and removes only a browser-local course code; it does not touch the signed-in member record, enrolment, completion, or reward procedures.

The selected-unit learning view now carries a fixed “Save/Remove [course code] · private shelf” control. It shares the same browser-local code-only helper as orientation and is visibly available at the 390px mobile breakpoint. This unit-view affordance is intentionally distinct from enrolment and checkout actions. Dedicated catalogue-card controls and catalogue-level privacy messaging remain tracked separately.

The full learning catalogue now includes a compact Save/Remove control on every unit card, a browser-local shelf count, a visible no-account/no-enrolment/no-progress/no-reward/no-disclosure notice, and a direct manage-shelf handoff to orientation. Desktop and 390px mobile rendering confirm that the controls remain visible while leaving enrolment and unit-view actions distinct. The shared shelf helper rejects non-course values and deduplicates codes before any browser-local write.

An isolated headless browser check reached the development learning atlas and confirmed its catalogue markup, but a browser execution-context reset after local-storage clearing made the full two-way cross-page interaction nondeterministic. This was not accepted as persistence evidence. The project retains the completed rendering and code-contract checks, while desktop cross-page interaction and true interactive-mobile validation remain explicit pending tasks; no member, payment, or learner data was created.

The member workspace now includes a read-only course-completion recognition panel. The development-only authenticated-layout preview was checked at desktop and 390px mobile widths; it explicitly shows no learner data and keeps recognition unavailable rather than simulating eligibility. The underlying readiness contract is tested against confirmed active enrolments plus actual course lesson-completion IDs, never against fabricated records or a credential-issuing action. Its learner-facing boundary language makes clear that completion recognition is not a clinical licence, legal credential, professional accreditation, or regulated qualification.

The private achievement archive route was checked in the no-data authenticated-layout preview at desktop and 390px mobile widths. It preserves the adult learning visual system, states that it displays only existing course-completion badges, and makes clear that the archive cannot issue credentials or create learner data. No badges were fabricated for validation. Badge-to-course mapping is covered by automated tests, while a real member’s archive remains an explicit authenticated-session check.

The member-header archive entry point is gated to an authenticated, non-preview workspace only. Both preview forms were rendered after this control was added: desktop `preview=member-auth` and mobile `preview=member` each omit the archive action and retain their explicit no-saved-data label. A real signed-in member-session check remains required to exercise the visible member entry point itself.

The development-only member-workspace preview was checked at desktop and 390px mobile widths. It clearly labels itself as having no account data, no identity, no saved progress, no enrolments, no rewards, and no completions; its unit cards retain their real catalogue metadata but require member sign-in. This verifies the protected dashboard visual system without fabricating learner records.

The final `preview=member-auth` route renders the authenticated dashboard layout at desktop and 390px mobile widths while explicitly showing no identity, progress, enrolment, reward, or completion data. This provides a production-structure visual check without manufacturing a learner record; a real member session remains required for the separate live progress round-trip already tracked in the project checklist.

The redesigned desktop pathway was rechecked end-to-end in development-only academy preview: homepage → Campus hub → eClinic room → eClinic mapped learning collection. The room carried its selected visual identity, non-disclosure learning posture, and safety boundary into the filtered catalogue, which correctly displayed FSH 103, FSH 105, FSH 202, and FSH 301. The separate true mobile-width click-through remains pending because the interactive browser cannot resize its viewport.
