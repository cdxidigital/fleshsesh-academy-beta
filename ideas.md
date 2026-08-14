# fleshsesh academy — Design Direction

## Three Possible Directions

| Theme Name | Very Brief Intro | Probability |
| --- | --- | --- |
| Rose Lacquer Learning House | A low-key, editorial academy experience where glossy rose-pink sculpture and champagne metal turn adult learning into an intentional private ritual. It feels closer to a contemporary cultural institution than a conventional course catalogue. | 0.07 |
| Clinical Aperture | A bright, precise and calm health-information environment built around soft ivory, mineral blue and modern editorial diagrams. It foregrounds clarity and evidence above atmosphere. | 0.04 |
| Velvet Index | A library-like platform using ink-black paper, sharp red annotation marks and archival photography to make a curriculum feel collected and considered. It favours a literary, slightly underground tone. | 0.09 |

## Chosen Direction: Rose Lacquer Learning House

### Design Movement

**Contemporary beauty editorial meets private members’ learning salon.** The interface takes its cues from the supplied fleshsesh academy mark: deep obsidian ground, glossy rose and ruby material, and a restrained champagne-gold ceremonial detail. It is designed as a credible adult education experience, never as a nightlife or erotic-entertainment site.

### Core Principles

1. **Agency before spectacle.** Privacy, content control, accessible choices and safety guidance are surfaced before promotional language.
2. **Editorial hierarchy.** Large, deliberate typography and asymmetric composition distinguish academic pathways from generic card grids.
3. **Sensual material, disciplined content.** Rose-lacquer colour, warm metal and light-reflecting surfaces give the brand character; clinical, consent-centred copy and clear boundaries preserve trust.
4. **Soft confidence.** Interaction and language feel calm, direct and non-judgmental, with no pressure to disclose or enrol impulsively.

### Color Philosophy

Obsidian creates privacy and visual quiet. Rose-pink introduces vitality, intimacy and brand recognition without relying on overt imagery. A controlled champagne-gold line signals knowledge, craft and achievement. Ivory is reserved for readable long-form information and reflection surfaces. The palette uses contrast as a safety and accessibility mechanism rather than decoration.

### Layout Paradigm

The platform uses a **stage-and-index** composition rather than a centered marketing page: a compact left brand rail, a large content stage, and a right-side contextual information strip at desktop widths. Sections unfold as editorial spreads with offset content, not uniform card rows. On mobile, the rail collapses into a compact top bar and course routes become stacked panels.

### Signature Elements

1. A **rose-to-ruby lacquer gradient rule**, used sparingly on progress and active states.
2. **Champagne-gold index numbers** and fine lines that structure navigation, modules and milestones.
3. A **soft optical halo** around focal brand objects, echoing the supplied logo’s gloss without visual noise.

### Interaction Philosophy

Interactions should reward deliberation: clear confirmation states, transparent labels, privacy-sensitive choices, and pauses before sensitive content. Hover reveals feel like sliding an archive card open, while age confirmation reads as an intentional threshold rather than a barrier. Keyboard focus remains prominent and calm.

### Animation

Use short, low-amplitude transitions only. Cards lift by 2–3px and gold rules extend on hover; drawers and the age gateway fade and settle from 0.96 scale using a pronounced ease-out. Progress fills move linearly. Disable decorative movement for reduced-motion users. No continuous pulsing or nightclub-style movement.

### Typography System

**Cormorant Garamond** serves as the expressive display face: high-contrast, literary and ceremonial for headlines and course titles. **DM Sans** is the pragmatic reading face for navigation, educational copy and data. Eyebrows and course codes are all-caps DM Sans with expanded tracking. Display scale is intentionally dramatic; body copy remains generous, compact and accessible.

### Brand Essence

**fleshsesh academy is an adult-only, consent-centred learning house for people seeking thoughtful sexual-wellness education without shame or spectacle.**

**Personality:** discerning, affirming, composed.

### Brand Voice

Headlines are candid and intelligent; CTAs make a specific, low-pressure promise; microcopy explains the boundary or benefit in plain language. Avoid generic welcome language, breathless claims, and anything that suggests diagnosis or personalized clinical advice.

> “Learn the language of your boundaries.”

> “Choose your route. Keep your privacy.”

### Wordmark & Logo

Use the supplied fleshsesh academy emblem as the primary identity asset, accompanied by a restrained typographic wordmark in Cormorant Garamond and letter-spaced DM Sans. The abstract rose-lacquer icon remains visible at a meaningful size in the navigation and age gateway.

### Signature Brand Color

**Lacquer Rose — #EE6F9A.** A dense, glossy pink used only for primary actions, progress, and moments of entry.

## Implementation Notes

- The reference URL currently resolves to a protected Vercel login screen. The rebuild therefore follows the supplied academy mark and curriculum guide as the accessible ground truth, while retaining the requested dark, rose-and-gold visual character.
- The age gateway establishes 18+ access with a clear leave option, stores only a browser-local acknowledgement, and provides a short educational/safeguarding notice.
- The public build presents educational content only, with no explicit visuals, solicitations, medical diagnosis or unverified accreditation claims.

## Verification Notes

The age gateway was visually reviewed at 1440×900 and 390×844. At desktop, the two-panel threshold preserves clear legal confirmation, readable contrast and a distinct visual entry moment. At mobile, the gateway collapses to a single-column form without clipped text or inaccessible controls; the decorative panel intentionally disappears to retain the essential confirmation path.

The curriculum expansion and automated lecturer studio were reviewed at desktop and mobile preview sizes. The course atlas remains legible with level tabs condensed into a four-column mobile selector, while all 21 guide-mapped courses and six certification tracks stack without horizontal overflow. The lecturer studio retains its selection state, scoped prompts and compact support-route treatment on narrow screens.

The completed course atlas now exposes a clear guide-derived learning outcome for each level, directly beneath the selected level’s purpose. The resulting panel maintains readable contrast and clear hierarchy in both desktop and mobile full-page verification; its compact stacked treatment preserves the learning outcome without displacing course detail or creating overflow.

The final cinematic UX pass was reviewed at 1440×900 and 390×844. The desktop hero now gives the supplied wordmark a dedicated, larger brand stage, while active navigation cues identify the learner’s current section. On mobile, the wordmark remains prominent without crowding the compact icon-only header; the quick-navigation bar supplies direct route access and the interface preserves reduced-motion-safe transitions.

The final accessibility pass confirms the compact mobile home control is intentionally icon-only with an explicit “Back to top” accessible label. The page-load cinematic fade now runs only when a user has not requested reduced motion; desktop and mobile visual checks retain the composed editorial hierarchy without any visible layout regression.

The member expansion replaces the deferred access placeholders with an OAuth-backed private learning record. The user-facing academy film is a compact, browser-compatible ambient layer that remains unavailable until the local 18+ confirmation is accepted. Browser inspection identified and resolved a CSS containing-block issue in which page-shell transform motion placed the fixed age gate below the viewport; the cinematic shell now fades by opacity only, keeping the adult-access card correctly viewport-anchored.

Final responsive checks confirm that the hero’s ambient film retains text contrast at both desktop and mobile breakpoints, while the mobile member dashboard preserves a clear progress summary and course route hierarchy. The strengthened age gate is confirmed as a true viewport-level modal after the shell-motion correction; TypeScript checks and all seven automated tests pass.

Post-fix inspection measured the adult-access card at 194.9px–905.1px within a 1100px viewport, confirming that it is viewport-anchored rather than inheriting the page height. The mobile gateway presents a single-column, touch-friendly confirmation flow; its age statement, confirmation control and clearly disabled entry action remain legible without horizontal overflow.

The final automated suite now includes the protected learner-progress router contract: it verifies that an authenticated caller loads only its own records and that an atlas course step is saved with the authenticated user identifier. The full suite passes with nine tests. A real account-specific OAuth save-and-reload remains deliberately pending until an authenticated browser session is supplied, avoiding fabricated learner progress data.
