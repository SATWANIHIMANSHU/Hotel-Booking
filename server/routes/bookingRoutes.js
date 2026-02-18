import express from 'express';
import { checkAvailabiltyAPI, createBooking, getHotelBookings, getUserBooking, stripePayment } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';
import e from 'express';



const bookingRouter = express.Router();

bookingRouter.post('/check-availabilty',checkAvailabiltyAPI);
bookingRouter.post('/book',protect,createBooking);
bookingRouter.get('/user',protect,getUserBooking);
bookingRouter.get('/hotel',protect,getHotelBookings);
bookingRouter.post('/stripe-payment',protect,stripePayment);

export default bookingRouter;