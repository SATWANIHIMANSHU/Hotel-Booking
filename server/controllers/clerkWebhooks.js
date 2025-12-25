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

    const payload = whook.verify(req.body, headers);

    const { data, type } = payload;

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url,
      recentSearchedCities: [],
    };

    if (type === "user.created" || type === "user.updated") {
      await User.findByIdAndUpdate(data.id, userData, {
        upsert: true,
        new: true,
      });
    }

    if (type === "user.deleted") {
      await User.findByIdAndDelete(data.id);
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ success: false });
  }
};

export default clerkWebhooks;
