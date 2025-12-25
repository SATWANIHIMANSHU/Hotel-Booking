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

    // ✅ RAW BODY verification
    whook.verify(req.body.toString("utf8"), headers);

    const { data, type } = JSON.parse(req.body.toString("utf8"));

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: `${data.first_name} ${data.last_name}`,
      image: data.image_url,
    };

    switch (type) {
  case "user.created": {
    const userData = {
      _id: data.id,
      email: data.email_addresses?.[0]?.email_address || null,
      username: `${data.first_name || ""} ${data.last_name || ""}`,
      image: data.image_url || null,
    };
    await User.create(userData);
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

  case "user.deleted":
    await User.findByIdAndDelete(data.id);
    break;

  default:
    break;
}

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;
