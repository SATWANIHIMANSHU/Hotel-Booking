import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js";


// API to create a new room for a hotel
export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const auth = req.auth();

    if (!auth || !auth.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const hotel = await Hotel.findOne({ owner: auth.userId });
    if (!hotel) {
      return res.status(404).json({ success: false, message: "Hotel Not Found" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });

    const images = await Promise.all(uploadImages);

    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: Number(pricePerNight),
      amenities: JSON.parse(amenities),
      images,
    });

    res.status(201).json({
      success: true,
      message: "Room Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to get all rooms of a hotel
export const getRooms = async(req,res)=>{
    try {
    const rooms = await Room.find({isAvailable:true}).populate({
        path:"hotel",
        populate:{
            path:"owner",
            select: "image"
        }
    }).sort({createdAt:-1});

    res.status(200).json({
  success: true,
  rooms,
});

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

// API to get all rooms for a specific hotel
export const getOwnerRooms = async (req, res) => {
  try {
    const auth = req.auth();
    if (!auth || !auth.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const hotelData = await Hotel.findOne({ owner: auth.userId });
    if (!hotelData) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    const rooms = await Room.find({ hotel: hotelData._id }).populate("hotel");

    res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to get all rooms of a hotel
export const toggleRoomAvailability = async (req, res) => {
  try {
    const auth = req.auth();
    if (!auth || !auth.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { roomId } = req.body;

    const roomData = await Room.findById(roomId);
    if (!roomData) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();

    res.status(200).json({
      success: true,
      message: "Room Availability Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
