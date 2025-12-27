import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    // 1️⃣ Create webhook verifier
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // 2️⃣ Extract Clerk headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // 3️⃣ Verify webhook using RAW body
    const payload = req.body.toString("utf8");
    whook.verify(payload, headers);

    // 4️⃣ Parse event data
    const { data, type } = JSON.parse(payload);

    // 5️⃣ Handle events safely
    switch (type) {

      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address || null,
          username: `${data.first_name || ""} ${data.last_name || ""}`,
          image: data.image_url || null,
        };

        // 🔥 CHANGE: use UPSERT instead of CREATE
        await User.findByIdAndUpdate(
          data.id,
          userData,
          { upsert: true, new: true }
        );
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses?.[0]?.email_address || null,
          username: `${data.first_name || ""} ${data.last_name || ""}`,
          image: data.image_url || null,
        };

        await User.findByIdAndUpdate(data.id, userData);
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }

      default:
        break;
    }

    // 6️⃣ Tell Clerk "Webhook received successfully"
    res.status(200).json({ success: true });

  } catch (error) {
    console.error("Webhook error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;
