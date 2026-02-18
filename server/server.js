import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import coonectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import statsRouter from "./routes/statsRoutes.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

connectDB();
coonectCloudinary();

const app = express();
app.use(cors());

// API to listen to stripe webhooks
app.post('/api/stripe',express.raw({type: "application/json"}),stripeWebhooks)

/* ✅ RAW BODY ONLY FOR CLERK */
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

/* ✅ JSON for ALL OTHER ROUTES */
app.use(express.json());
app.use(clerkMiddleware({
    authorizeRequest: true, 
  }));

app.get("/", (req, res) => {
  res.send("API is working fine");
});

app.use("/api/user",userRouter);
app.use("/api/stats", statsRouter);
app.use("/api/hotels",hotelRouter);
app.use("/api/rooms",roomRouter);
app.use("/api/bookings",bookingRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  

