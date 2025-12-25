import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // ✅ USE RAW BODY
    const payload = req.body.toString("utf8");

    const evt = whook.verify(payload, headers);

    const { data, type } = evt;

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: `${data.first_name ?? ""} ${data.last_name ?? ""}`,
      image: data.image_url,
    };

    if (type === "user.created") {
      await User.create(userData);
    }

    if (type === "user.updated") {
      await User.findByIdAndUpdate(data.id, userData);
    }

    if (type === "user.deleted") {
      await User.findByIdAndDelete(data.id);
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(400).json({ success: false });
  }
};

export default clerkWebhooks;
