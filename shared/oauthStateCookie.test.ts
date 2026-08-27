import { describe, expect, it } from "vitest";
import { OAUTH_STATE_COOKIE, OAUTH_STATE_COOKIE_DEV, getOAuthStateCookieName } from "./const";

describe("OAuth state cookie names", () => {
  it("uses the host-prefixed nonce cookie only in secure contexts", () => {
    expect(getOAuthStateCookieName(true)).toBe(OAUTH_STATE_COOKIE);
  });

  it("uses a separate host-only fallback name for local HTTP development", () => {
    expect(getOAuthStateCookieName(false)).toBe(OAUTH_STATE_COOKIE_DEV);
  });
});
