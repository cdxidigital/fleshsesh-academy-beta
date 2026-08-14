import type { Express, Request, Response } from "express";
import express from "express";
import Stripe from "stripe";
import { getCourse } from "@shared/courseCatalog";
import * as db from "./db";

function stripeClient() {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) throw new Error("Stripe is not configured");
  return new Stripe(secret);
}

export async function createCourseCheckout(input: { userId: number; email?: string | null; name?: string | null; courseCode: string; origin: string }) {
  const course = getCourse(input.courseCode);
  if (!course) throw new Error("Unknown course");
  const stripe = stripeClient();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: input.email ?? undefined,
    client_reference_id: input.userId.toString(),
    allow_promotion_codes: true,
    metadata: {
      user_id: input.userId.toString(),
      course_code: course.code,
      customer_email: input.email ?? "",
      customer_name: input.name ?? "",
    },
    line_items: [{
      quantity: 1,
      price_data: {
        currency: course.currency,
        unit_amount: course.priceCents,
        product_data: {
          name: `${course.code} — ${course.title}`,
          description: `${course.hours} hour fleshsesh | academy learning unit`,
          metadata: { course_code: course.code },
        },
      },
    }],
    success_url: `${input.origin}/member?enrolment=success`,
    cancel_url: `${input.origin}/member?enrolment=cancelled`,
  });
  await db.recordPendingEnrollment({ userId: input.userId, courseCode: course.code, stripeCheckoutSessionId: session.id });
  if (!session.url) throw new Error("Stripe did not return a checkout URL");
  return { url: session.url };
}

export async function fulfilVerifiedStripeEvent(event: Stripe.Event) {
  if (event.id.startsWith("evt_test_")) return { verified: true } as const;
  if (event.type !== "checkout.session.completed") return { received: true } as const;
  const session = event.data.object as Stripe.Checkout.Session;
  const userId = Number(session.metadata?.user_id ?? session.client_reference_id);
  const courseCode = session.metadata?.course_code;
  if (Number.isSafeInteger(userId) && userId > 0 && courseCode) {
    await db.activateCourseEnrollment({
      userId,
      courseCode,
      stripeCheckoutSessionId: session.id,
      stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id,
    });
    console.log("[Stripe] Activated course enrolment", { eventId: event.id, userId, courseCode });
  }
  return { received: true } as const;
}

async function receiveStripeWebhook(req: Request, res: Response) {
  const signature = req.headers["stripe-signature"];
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || typeof signature !== "string") return res.status(400).json({ error: "Missing webhook signature" });
  let event: Stripe.Event;
  try {
    event = stripeClient().webhooks.constructEvent(req.body, signature, secret);
  } catch (error) {
    console.error("[Stripe] Signature verification failed", error);
    return res.status(400).json({ error: "Invalid signature" });
  }
  return res.json(await fulfilVerifiedStripeEvent(event));
}

export function registerStripeWebhook(app: Express) {
  app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), receiveStripeWebhook);
}
