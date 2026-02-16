import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import aboutHero from "../assets/About_Hero.jpg";
import aboutMain from "../assets/About_Main.jpg";

const About = () => {
    const {axios} = useAppContext();
 
    
  const [stats, setStats] = useState({
    totalRooms: 0,
    totalBookings: 0,
    totalHotels: 0,
    totalDestinations: 0,
  })

  const fetchStats = async () => {
    try {
      const { data } = await axios.get("/api/stats");
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    fetchStats();
  }, []);



  return (
    <div className="pt-20">

      {/* Hero Section */}
      <div
        className="h-[70vh] bg-cover bg-center flex items-center justify-center text-center px-6"
        style={{
          backgroundImage: `url(${aboutHero})`,
        }}
      >
        <div className="bg-black/50 p-8 rounded-xl">
          <h1 className="text-4xl md:text-6xl font-playfair text-white">
            Redefining the Way You Book Your Stay
          </h1>
          <p className="text-gray-200 mt-4 max-w-2xl">
            A seamless hotel booking & management platform built for travelers
            and hotel owners.
          </p>
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="px-6 md:px-16 lg:px-24 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-playfair text-gray-800 mb-6">
            Who We Are
          </h2>
          <p className="text-gray-600 leading-8">
            We are a modern hotel booking platform that connects travelers
            with verified hotels across destinations. Our system ensures
            real-time availability, secure booking, and instant email
            confirmations.
          </p>
          <p className="text-gray-600 leading-8 mt-4">
            At the same time, we empower hotel owners with powerful tools to
            manage rooms, track bookings, and monitor revenue.
          </p>
        </div>

        <img
          src={aboutMain}
          alt="hotel room"
          className="rounded-2xl shadow-xl"
        />
      </div>

      {/* Mission Section */}
      <div className="bg-[#F5F5FF]/60 py-20 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-playfair text-gray-800 mb-6">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-8 mb-10">
            To build a secure, transparent, and intelligent booking system
            that enhances travel experiences while simplifying hotel management.
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-gray-800 mb-2">
                Secure Booking
              </h3>
              <p className="text-sm text-gray-600">
                Token-based authentication & safe transactions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-gray-800 mb-2">
                Real-Time Availability
              </h3>
              <p className="text-sm text-gray-600">
                Smart date overlap logic prevents double booking.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-gray-800 mb-2">
                Owner Dashboard
              </h3>
              <p className="text-sm text-gray-600">
                Track bookings, toggle rooms & monitor revenue.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-gray-800 mb-2">
                Email Confirmation
              </h3>
              <p className="text-sm text-gray-600">
                Instant booking confirmation via Gmail SMTP.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 px-6 md:px-16 lg:px-24 text-center">
      <h2 className="text-4xl font-playfair text-gray-800 mb-10">
        Our Impact
      </h2>

      <div className="grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-5xl font-bold text-indigo-600">
            {stats.totalRooms}+
          </h3>
          <p className="text-gray-600 mt-2">Rooms Listed</p>
        </div>

        <div>
          <h3 className="text-5xl font-bold text-indigo-600">
            {stats.totalBookings}+
          </h3>
          <p className="text-gray-600 mt-2">Total Bookings</p>
        </div>

        <div>
          <h3 className="text-5xl font-bold text-indigo-600">
            {stats.totalHotels}+
          </h3>
          <p className="text-gray-600 mt-2">Hotels Registered</p>
        </div>

        <div>
          <h3 className="text-5xl font-bold text-indigo-600">
            {stats.totalDestinations}+
          </h3>
          <p className="text-gray-600 mt-2">Destinations</p>
        </div>
      </div>
    </div>
      {/* CTA Section */}
      <div className="bg-black text-white py-16 text-center">
        <h2 className="text-3xl font-playfair mb-4">
          Ready to Book Your Next Stay?
        </h2>
        <p className="text-gray-300 mb-6">
          Discover premium rooms and seamless booking experience today.
        </p>
        <a
          href="/rooms"
          className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition"
        >
          Explore Rooms
        </a>
      </div>

    </div>
  );
};

export default About;
