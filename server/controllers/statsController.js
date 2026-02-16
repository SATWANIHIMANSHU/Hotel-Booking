import Room from "../models/Room.js";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";

export const getStats = async (req, res) => {
  try {
    const totalRooms = await Room.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalHotels = await Hotel.countDocuments();

    // Unique cities
    const cities = await Hotel.distinct("city");

    res.status(200).json({
      success: true,
      stats: {
        totalRooms,
        totalBookings,
        totalHotels,
        totalDestinations: cities.length,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
