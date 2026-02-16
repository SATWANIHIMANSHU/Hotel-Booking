import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
  try {
    console.log("🟡 Hotel API HIT");

    const authData = req.auth();
    console.log("🔐 req.auth() DATA:", authData);

    if (!authData || !authData.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const owner = authData.userId;
    const { name, address, contact, city } = req.body;

    // 1️⃣ Check if already registered
    const existingHotel = await Hotel.findOne({ owner });
    if (existingHotel) {
      return res.status(400).json({
        success: false,
        message: "Hotel Already Registered",
      });
    }

    // 2️⃣ Save hotel
    const hotel = await Hotel.create({
      name,
      address,
      contact,
      city,
      owner,
    });

    // 3️⃣ Update role
    await User.findByIdAndUpdate(owner, {
      role: "hotelOwner",
    });

    // 4️⃣ Success response
    res.status(201).json({
      success: true,
      message: "Hotel Registered Successfully",
      hotel,
    });

  } catch (error) {
    console.error("🔥 Hotel Registration Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
