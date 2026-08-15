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
