import { beforeEach, describe, expect, it, vi } from "vitest";

const { activateCourseEnrollment } = vi.hoisted(() => ({ activateCourseEnrollment: vi.fn() }));
vi.mock("./db", () => ({ activateCourseEnrollment }));

import { fulfilVerifiedStripeEvent } from "./commerce";

describe("Stripe course enrolment fulfilment", () => {
  beforeEach(() => vi.clearAllMocks());

  it("activates only the user and course linked by a completed checkout session", async () => {
    const result = await fulfilVerifiedStripeEvent({
      id: "evt_live_course_1",
      type: "checkout.session.completed",
      data: { object: { id: "cs_course_1", metadata: { user_id: "24", course_code: "FSH 101" }, payment_intent: "pi_course_1" } },
    } as never);

    expect(result).toEqual({ received: true });
    expect(activateCourseEnrollment).toHaveBeenCalledWith({ userId: 24, courseCode: "FSH 101", stripeCheckoutSessionId: "cs_course_1", stripePaymentIntentId: "pi_course_1" });
  });

  it("acknowledges Stripe verification events without creating enrolments", async () => {
    await expect(fulfilVerifiedStripeEvent({ id: "evt_test_verify", type: "checkout.session.completed", data: { object: {} } } as never)).resolves.toEqual({ verified: true });
    expect(activateCourseEnrollment).not.toHaveBeenCalled();
  });
});
