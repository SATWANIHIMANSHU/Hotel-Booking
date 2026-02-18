import Stripe from "stripe";
import Booking from "../models/Booking.js";

// API TO HANDLE STRIPE WEBHOOKS

export const stripeWebhooks = async (req, res) => {

    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    const sig = req.headers["stripe-signature"];   // ✅ FIXED

    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.log("Webhook signature error:", error.message);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    console.log("Event Type:", event.type);  // 🔥 Helpful log

    // Handle the event
    if (event.type === "payment_intent.succeeded") {

        const paymentIntent = event.data.object;

        console.log("PaymentIntent ID:", paymentIntent.id);

        // Get checkout session using payment_intent ID
        const sessions = await stripeInstance.checkout.sessions.list({
            payment_intent: paymentIntent.id,
        });

        if (!sessions.data.length) {
            console.log("No checkout session found");
            return res.json({ received: true });
        }

        const session = sessions.data[0];

        const bookingId = session.metadata?.bookingId;

        if (!bookingId) {
            console.log("bookingId not found in metadata");
            return res.json({ received: true });
        }

        await Booking.findByIdAndUpdate(
            bookingId,
            { isPaid: true, paymentMethod: "Stripe" }
        );

        console.log("Booking updated successfully:", bookingId);
    }
    else {
        console.log("Unhandled event type:", event.type);
    }

    res.json({ received: true });
};
