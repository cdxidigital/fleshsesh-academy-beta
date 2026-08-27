# fleshsesh | academy platform audit

## Scope and evidence

This audit reviews the deployed application architecture, route reachability, type safety, automated regression coverage, production build output, visible public and safeguarded surfaces, media presentation, and privacy boundaries. It does not simulate Stripe payments, authenticated learner activity, live personal-device operations, or personal disclosure.

## Baseline status

| Area | Evidence | Status |
| --- | --- | --- |
| Static health | `pnpm check`, `pnpm test`, and bounded-heap production build completed successfully. | Pass |
| Automated coverage | 29 test files and 73 tests completed successfully. | Pass |
| Production delivery | Build produces lazy route chunks and distinct React, data, and UI vendor chunks. | Pass after repair |
| Public routes | Home, Learning Atlas, focused mission, campus, classroom, and care surfaces rendered. | Pass |
| Safeguarded routes | No-data member preview and non-live Arena readiness surface rendered with stated boundaries. | Pass |
| Real-session checks | OAuth, Stripe checkout/webhook, protected completion, badge/archive state, and true interactive mobile interactions require consenting real sessions. | Deferred—not simulated |

## Verified repairs

The build initially warned that the initial bundle was 633.66 kB after minification. Explicit React/routing, data, and UI vendor chunks reduced the initial entry bundle to 485.89 kB, retained existing route-level lazy loading, and preserved type and regression results.

Desktop review found that the care-navigation wordmark had notably less visual authority than the rest of the eCampus system. Its header scale and ceremonial spacing were increased across desktop and mobile while preserving the care directory’s emergency and external-resource boundaries. The updated 390px view remains legible without clipping the eCampus-home or care-navigation labels.

The audit identified a local-development OAuth problem: host-prefixed secure cookies are correctly rejected by browsers when accessed through plain HTTP. OAuth now uses the host-prefixed state nonce only on HTTPS, and a separate host-only `SameSite=Lax` nonce in local HTTP contexts. The server chooses the matching name from the forwarded secure request context, retains strict state-to-cookie nonce comparison, and clears the corresponding nonce after use. Two targeted regression tests cover the secure and local cookie-name selection.

Preview parsing on Home, Learning, Orientation, Campus, Facility, Member, Achievement Archive, and Arena routes now guards browser-global access before reading location search values. The global skip control now identifies the visible non-loading main landmark, clears a stale prior landmark ID, and makes the active landmark programmatically focusable. Care-directory external links now use `noopener noreferrer`.

The dependency audit initially reported 72 production advisories. A failed attempt to remove Axios and Streamdown showed that they remain required by the OAuth SDK and retained chat component, so both were restored. Narrow dependency upgrades moved Axios to 1.20.0, Streamdown to 1.6.11, Express to 4.22.2, Drizzle ORM to 0.45.2, Nanoid to 5.1.16, and forced Lodash 4.18.1 for the Recharts path. The final production audit completed with no advisory records.

Post-repair browser inspection confirmed the focused FSH 101 mission route renders its stable native stage links and no longer trips the prior `hrefForStage` error boundary. The rendered skip control resolves to `#main-content`, and the active route main landmark is assigned the expected stable target. The sandbox click driver did not move the visual viewport after activating the compact skip anchor, but the anchor and deterministic target are present; this remains a browser-automation limitation rather than a learner-session result.

Final desktop review covered the homepage, pathway-first Atlas, focused mission, member no-data preview, Orientation, Campus, care directory, and Arena readiness reference. Final 390px review covered the homepage, Atlas, focused mission, member no-data preview, care directory, and Arena. The mobile care header initially crowded its full utility labels around the centered lockup; it now uses compact `eCampus` and `Care` labels below the small breakpoint, while retaining full accessible labels and the full desktop wording. The corrected header, route surfaces, age gateway, and media controls rendered without clipping or error boundaries.

## Visual and flow observations

The public entry, campus, classroom, care directory, and non-live Arena reference all render with readable editorial hierarchy and explicit safeguards. The pathway-first Atlas correctly avoids exposing filters and course grids before a deliberate browse action. The focused mission’s transition and narrated walkthrough controls display as optional, transcript-backed media, with no autoplay or listener history.

The forced adult-gateway preview rendered a visible 18+ confirmation threshold before eCampus entry at desktop and 390px mobile widths. The checkbox, entry action, adult-learning purpose, and local-only confirmation note remain readable and viewport-anchored; protected content is not shown in this forced preview. No gateway defect was identified.

The no-data member preview deliberately shows no simulated enrolment, progress, reward, or identity data. Its complete course grid is visually dense by design because it represents the full private curriculum; it is not treated as a proof of authenticated learner states.

## Remaining external acceptance requirements

The following remain intentionally open because completing them without a claimed sandbox or consenting user would fabricate payment or learner data: Stripe sandbox checkout and webhook fulfilment; authenticated lesson-completion, reward, certificate-readiness, and achievement-archive states; true interactive mobile click-through and mobile keyboard-focus checks. These are covered by the existing launch acceptance runbook.
