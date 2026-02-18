import Stripe from "stripe";
import Booking from "../models/Booking.js";

export const stripeWebhooks = async (req, res) => {

    console.log("🔥 Stripe webhook route hit");

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const sig = req.headers['stripe-signature'];

    console.log("👉 Signature:", sig ? "Present" : "Missing");

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        console.log("✅ Event constructed successfully");
        console.log("📦 Event Type:", event.type);

    } catch (err) {
        console.log("❌ Webhook signature verification failed");
        console.log(err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Print full event object
    console.log("📄 Full Event Object:", JSON.stringify(event, null, 2));

    if (event.type === "checkout.session.completed") {

        console.log("🎉 Checkout session completed event detected");

        const session = event.data.object;

        console.log("📌 Session Metadata:", session.metadata);

        const bookingId = session.metadata?.bookingId;

        if (!bookingId) {
            console.log("❌ bookingId not found in metadata");
            return res.json({ received: true });
        }

        console.log("🔎 Booking ID from metadata:", bookingId);

        const updated = await Booking.findByIdAndUpdate(
            bookingId,
            { isPaid: true, paymentMethod: "Stripe" },
            { new: true }
        );

        if (updated) {
            console.log("✅ Booking updated successfully:", updated._id);
        } else {
            console.log("❌ Booking not found in database");
        }

    } else {
        console.log("⚠️ Unhandled event type:", event.type);
    }

    res.json({ received: true });
};
