# Personal-Device Connectivity Boundary

The Esports Arena UI is an **architecture and consent preview**, not a live device connector. It does not pair, enumerate, command, or retain information about any personal device. This constraint is deliberate: provider credentials, developer approval, and a separately reviewed integration layer are required before live controls can be offered.

| Control area | Required production boundary |
| --- | --- |
| Adult access | Reconfirm 18+ eligibility at the point of pairing, even when the member has already passed the eCampus gateway. |
| Consent | Require affirmative confirmation that participation is voluntary, that the person controls the device, and that consent can be withdrawn without penalty. |
| Data minimisation | Keep provider tokens and pairing credentials server-side, scoped to one active session, and do not store device identifiers, settings, event streams, or inferred activity. |
| Tournament design | Use opt-in lobbies, time-boxed sessions, default-off participation, clear withdrawal routes, and no ranking or reward based on personal disclosures. |
| Emergency stop | Expose a persistent stop action that first issues the provider stop command and then destroys the active session. It must not depend on a moderator or match state. |
| Compatibility | Treat Lovense, We-Vibe, and other providers as separate adapters behind a shared consent gateway. Never embed a provider developer token in the browser. |

Lovense’s current standard integrations require users to pair through Lovense Remote and provide web-oriented SDK, HTTPS, and socket options. Its socket documentation explicitly requires developer tokens to remain server-side. [1] [2]

> The next implementation step requires a confirmed partner/developer integration and secure credentials. Until then, the academy must present the UI as an inactive preview rather than imply that it can control hardware.

## References

[1]: https://developer.lovense.com/docs/standard-solutions "Lovense Standard Solutions"
[2]: https://developer.lovense.com/docs/standard-solutions/socket-api "Lovense Standard Socket API"
