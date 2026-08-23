# 🏨 Hotel Booking

A modern full-stack hotel booking platform that allows users to explore hotels, view available rooms, make reservations, and manage their bookings through a responsive web interface.

The project is built using **React and Vite on the frontend** and **Node.js, Express, and MongoDB on the backend**, with Clerk for authentication, Cloudinary for image management, Stripe for payments, and Nodemailer for email functionality.

---

## ✨ Features

### 👤 User Features

* User registration and authentication
* Secure login using Clerk
* Browse available hotels
* View hotel details
* Explore available rooms
* Check room availability
* Make hotel reservations
* Manage bookings
* View booking information
* Responsive user interface

### 🏨 Hotel & Room Management

* Hotel management
* Room management
* Room availability tracking
* Hotel and room image management
* Cloudinary integration for image storage

### 💳 Payments

* Stripe payment integration
* Secure payment processing
* Booking payment workflow

### 📧 Email & Notifications

* Email functionality using Nodemailer
* Booking-related communication

### 📊 Admin / Management

* Booking management
* Hotel and room management
* Statistics and dashboard-related functionality

---

# 🛠️ Tech Stack

## Frontend

* React 19
* Vite
* Tailwind CSS 4
* React Router DOM
* Axios
* Clerk React
* React Hot Toast
* JavaScript

The frontend dependencies and scripts are defined in `client/package.json`.

## Backend

* Node.js
* Express 5
* MongoDB
* Mongoose
* Clerk Express
* Cloudinary
* Stripe
* Nodemailer
* Multer
* CORS
* dotenv

The backend uses a modular structure with controllers, models, routes, middleware and configuration files.

---

# 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │       User           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │      + Vite           │
                    │                      │
                    │  • Hotel Search      │
                    │  • Hotel Details     │
                    │  • Booking UI        │
                    │  • User Dashboard    │
                    └──────────┬───────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Express Backend    │
                    │      Node.js         │
                    │                      │
                    │  • Controllers       │
                    │  • Routes            │
                    │  • Middleware        │
                    │  • Models            │
                    └───────┬───────┬──────┘
                            │       │
               ┌────────────┘       └─────────────┐
               ▼                                  ▼
       ┌───────────────┐                  ┌───────────────┐
       │    MongoDB    │                  │ External APIs │
       │   / Mongoose  │                  │               │
       └───────────────┘                  │ • Clerk       │
                                          │ • Stripe      │
                                          │ • Cloudinary  │
                                          │ • Nodemailer  │
                                          └───────────────┘
```

---

# 📁 Project Structure

```text
Hotel-Booking/
│
├── client/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js
│
├── server/
│   │
│   ├── configs/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── vercel.json
│
└── .gitignore
```

The repository currently follows this client/server structure, with frontend source separated into components, context, data and pages, while the backend contains controllers, middleware, models, routes and configs.

---

# ⚙️ Getting Started

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB
* Git

You will also need accounts/configuration for the services used by the application:

* Clerk
* MongoDB
* Cloudinary
* Stripe

---

# 🚀 Installation

## 1. Clone the Repository

```bash
git clone https://github.com/SATWANIHIMANSHU/Hotel-Booking.git
cd Hotel-Booking
```

---

# 🔹 Frontend Setup

Navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `client` directory.

Example:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=your_backend_url
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🔹 Backend Setup

Open a new terminal and navigate to:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` directory.

Example:

```env
MONGODB_URI=your_mongodb_connection_string

CLERK_SECRET_KEY=your_clerk_secret_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key

SMTP_USER=your_email
SMTP_PASSWORD=your_email_password

PORT=3000
```

> The exact variable names should match the environment variables used by your local configuration files.

Start the backend:

```bash
npm run server
```

For a production-style start:

```bash
npm start
```

The backend scripts are defined in the server's `package.json`.

---

# 🔐 Authentication

The application uses **Clerk** for authentication.

Clerk is integrated on both sides of the application:

```text
React Client
     │
     ▼
Clerk Authentication
     │
     ▼
Authenticated User
     │
     ▼
Express Backend
     │
     ▼
Protected Resources
```

This allows authenticated users to securely access booking-related functionality.

---

# 💳 Stripe Payment Integration

The application integrates **Stripe** for payment processing.

The payment flow is:

```text
Select Hotel
     │
     ▼
Select Room
     │
     ▼
Choose Booking Details
     │
     ▼
Create Booking
     │
     ▼
Stripe Payment
     │
     ▼
Payment Confirmation
     │
     ▼
Booking Completed
```

Stripe is included as a backend dependency and is used as part of the booking/payment workflow.

---

# ☁️ Cloudinary

Cloudinary is used for managing hotel and room images.

```text
Image Upload
     │
     ▼
Backend
     │
     ▼
Cloudinary
     │
     ▼
Image URL
     │
     ▼
MongoDB / Application
     │
     ▼
React Frontend
```

The backend includes Cloudinary and Multer for handling image uploads.

---

# 📧 Email Notifications

Nodemailer is integrated into the backend for email functionality.

This can be used for sending booking-related emails and other application notifications.

---

# 🧩 Backend Architecture

The backend follows a modular structure:

```text
server/
│
├── configs/
│       └── Application configuration
│
├── controllers/
│       ├── bookingController.js
│       ├── clerkWebhooks.js
│       ├── hotelController.js
│       ├── roomController.js
│       ├── statsController.js
│       ├── stripeWebhooks.js
│       └── userController.js
│
├── middleware/
│       └── Authentication / request middleware
│
├── models/
│       └── MongoDB models
│
├── routes/
│       └── API routes
│
└── server.js
```

The repository currently includes controllers for bookings, hotels, rooms, users, statistics, Clerk webhooks and Stripe webhooks.

---

# 🖥️ Frontend Architecture

The React application is organized into reusable sections:

```text
src/
│
├── assets/
├── components/
├── context/
├── data/
├── pages/
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

This structure separates reusable UI components, application state/context, static data and page-level components.

---

# 📱 Responsive Design

The frontend is designed using **Tailwind CSS**, allowing the interface to adapt across different screen sizes.

The project uses Tailwind CSS 4 through the Vite integration.

---

# 🌐 Deployment

The repository includes Vercel configuration for both the client and server applications.

```text
Frontend
   │
   ▼
Vercel

Backend
   │
   ▼
Vercel
```

The repository currently lists a deployed backend URL in the GitHub project information.

---

# 🔒 Environment Variables

Environment files contain sensitive information such as:

* Database credentials
* Clerk keys
* Cloudinary credentials
* Stripe secret keys
* Email credentials

**Never commit your actual `.env` files to GitHub.**

Use environment variables locally and configure production secrets through your deployment platform.

---

# 🧪 Available Scripts

## Frontend

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run lint
```

Runs ESLint.

```bash
npm run preview
```

Previews the production build locally.

These scripts are defined in the frontend `package.json`.

## Backend

```bash
npm run server
```

Starts the server using Nodemon.

```bash
npm start
```

Starts the Node.js server normally.

These scripts are defined in the backend `package.json`.

---

# 🔮 Future Improvements

* [ ] Add hotel reviews and ratings
* [ ] Improve search and filtering
* [ ] Add advanced booking history
* [ ] Add cancellation and refund workflow
* [ ] Improve admin dashboard
* [ ] Add automated tests
* [ ] Add CI/CD pipeline
* [ ] Improve error handling
* [ ] Add better booking analytics
* [ ] Improve accessibility
* [ ] Add more payment options
* [ ] Add mobile-focused UI improvements

---

# 📚 Learning Outcomes

This project helped demonstrate practical experience with:

* Full-stack JavaScript development
* React component architecture
* REST API development
* Node.js and Express
* MongoDB and Mongoose
* Authentication with Clerk
* Payment integration with Stripe
* Cloud image storage
* Email services
* API communication using Axios
* Environment variable management
* Frontend/backend deployment
* Git and GitHub workflow

---

# 🤝 Contributing

Contributions and suggestions are welcome.

### Create a branch

```bash
git checkout -b feature/your-feature
```

### Make your changes

```bash
git add .
git commit -m "Add your feature"
```

### Push your branch

```bash
git push origin feature/your-feature
```

Then create a Pull Request.

---

# 👨‍💻 Author

**Himanshu Satwani**

GitHub: [SATWANIHIMANSHU](https://github.com/SATWANIHIMANSHU)

---

# ⭐ Project

If you found this project useful or interesting, consider giving the repository a ⭐.

**Repository:**
https://github.com/SATWANIHIMANSHU/Hotel-Booking
