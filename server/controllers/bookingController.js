import Booking from "../models/Booking.js"
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import transporter from "../configs/nodeMailer.js";
import stripe from "stripe";
 

 // Function to Check Availability of Rooms


 const checkAvailabilty = async({checkInDate,checkOutDate,room}) =>{
          try {
            const bookings = await Booking.find({
                room,
                checkInDate : {$lt: checkOutDate},
                checkOutDate : {$gt: checkInDate},
            });
             const isAvailable = bookings.length === 0;
                  return isAvailable;
            } catch (error) {
            console.log(error.message);
          }
 }

// API to check availability of a room
// Post /api/bookings/checkavailability

export const checkAvailabiltyAPI = async(req,res) =>{
      try {
        const {checkInDate,checkOutDate,room} = req.body;
        const isAvailable = await checkAvailabilty({
             checkInDate,
             checkOutDate,
             room
        })
        res.json({success:true,isAvailable});
      } catch (error) {
        res.json({success:false,message:error.message});  
        
      }
}

// API to create a new booking
// Post /api/bookings/book

export const createBooking = async(req,res) =>{

    try {

        const {room,checkInDate,checkOutDate,guests} = req.body;
        const user = req.user._id;
        // Before creating a booking check if the room is available
        const isAvailable = await checkAvailabilty({
            checkInDate,
            checkOutDate,
            room
        })

        if(!isAvailable){
            return res.json({success:false,message:"Room is not available"});
        }
        
        //Get totalPrice from Room
        const roomData = await Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight;

        // Calculate totalPrice based on nights

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();  
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));    

        totalPrice *= nights;

            const booking = await Booking .create({
                
            user,
            room,
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        });


        await transporter.sendMail({
  from: `"QuickStay" <${process.env.EMAIL_USER}>`,
  to: req.user.email,
  subject: "Booking Confirmation - QuickStay",
  html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">QuickStay</h1>
        <p style="margin: 5px 0 0;">Booking Confirmation</p>
      </div>

      <!-- Body -->
      <div style="padding: 25px;">
        <h2 style="color: #333;">Hello ${req.user.username},</h2>
        <p style="color: #555; line-height: 1.6;">
          🎉 Your booking has been successfully confirmed! Here are your booking details:
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Booking ID:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking._id}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Hotel Name:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${roomData.hotel.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Check-In:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.checkInDate}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Check-Out:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.checkOutDate}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Guests:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.guests}</td>
          </tr>
          <tr>
            <td style="padding: 10px;"><strong>Total Price:</strong></td>
            <td style="padding: 10px; color: #16a34a; font-size: 18px;"><strong>${process.env.CURRENCY || '₹'}${booking.totalPrice}</strong></td>
          </tr>
        </table>

        <div style="text-align: center; margin-top: 30px;">
          <a href="http://localhost:5173/my-bookings"
            style="background: #2563eb; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            View My Bookings
          </a>
        </div>

        <p style="margin-top: 30px; color: #777; font-size: 14px;">
          If you have any questions, feel free to contact us.
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #f1f5f9; text-align: center; padding: 15px; font-size: 13px; color: #666;">
        © ${new Date().getFullYear()} QuickStay. All rights reserved.
      </div>

    </div>
  </div>
  `
});


        res.json({success:true,message :"Booking Created Successfully"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message :"Failed to Create Successfully"});
        
    }
}



// API to get all bookings of a user

// GET /api/bookings/user

export const getUserBooking = async(req,res) =>{
    try {
        const user = req.user._id;
        const bookings = await Booking.find({user}).populate("room hotel").sort({createdAt:-1});
        res.json({success:true,bookings});
    } catch (error) {
        console.log(error);
        res.json({success:false,message :"Failed to fetch bookings"});
    }
}

// Api to get hotel owners bookings
// GET /api/bookings/owner

export const getHotelBookings = async(req,res) =>{
   try {
     const hotel = await Hotel.findOne({owner:req.auth.userId});
    if (!hotel) {
        return res.json({ success: false, message: "No Hotel found " });
    }
    
    const bookings = await Booking.find({ hotel: hotel._id}).populate("room hotel user").sort({ createdAt: -1 });

    // Total Bookings

    const totalBookings = bookings.length;

    // Total Revenue

    const totalRevenue = bookings.reduce((acc,booking)=> acc + booking.totalPrice,0);

    res.json({ success: true, dashboardData: {bookings, totalBookings, totalRevenue} });

   } catch (error) {
       console.log(error);
        res.json({success:false,message :"Failed to fetch bookings"});
   }
}

export const stripePayment = async (req,res) =>{
     try {
       const {bookingId} = req.body; 

       const booking = await Booking.findById(bookingId);

       const roomData = await Room.findById(booking.room).populate('hotel');

       const totalPrice = booking.totalPrice;

       const {origin} = req.headers;

       const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

       const line_items = [
        {
          price_data:{
            currency:"inr",
            product_data:{
              name: roomData.hotel.name,
            },
            unit_amount:totalPrice * 100,
          },
          quantity:1,
        }
       ]

       // Create Checkout Session

       const session = await stripeInstance.checkout.sessions.create({
        line_items,
        mode : "payment",
        success_url: `${origin}/loader/my-bookings` ,
        cancel_url: `${origin}/my-bookings`,
        metadata:{
          bookingId,
        }
       })
       res.json({success:true,url:session.url});
     } catch (error) {
       res.json({success:false,message:"Payment Failed"});
     }
}