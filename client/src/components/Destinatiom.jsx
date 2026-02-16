import React from "react";
import { useAppContext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";
import { cityData } from "../data/cities";

const Destinations = () => {
  const { rooms } = useAppContext();
  const navigate = useNavigate();

  if (!rooms) {
    return (
      <div className="pt-40 text-center text-gray-600 text-lg">
        Loading destinations...
      </div>
    );
  }

  // Count rooms per city
  const cityMap = {};
  rooms.forEach((room) => {
    const city = room.hotel?.city;
    if (!city) return;
    cityMap[city] = (cityMap[city] || 0) + 1;
  });

  const destinations = Object.keys(cityMap)
    .map((city) => ({
      city,
      count: cityMap[city],
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="pt-24 pb-24">

      {/* 🔥 Hero Section */}
      <div className="relative py-24 px-6 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-b from-indigo-50 via-white to-white text-center">

  <div className="max-w-3xl mx-auto">
    <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gray-800 leading-tight">
      Explore Luxury Destinations
    </h1>

    <p className="mt-6 text-gray-600 text-lg leading-relaxed">
      Discover handpicked cities offering premium stays,
      unforgettable experiences, and world-class hospitality.
    </p>

        </div>
      </div>

      {/* 🔥 Destination Grid */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

          {destinations.map((item, index) => {
            const cityInfo = cityData.find(
              (c) => c.name === item.city
            );

            return (
              <div
                key={index}
                onClick={() =>
                  navigate(`/rooms?destination=${item.city}`)
                }
                className="relative h-72 rounded-3xl overflow-hidden cursor-pointer group shadow-xl"
              >
                {/* Image */}
                <img
                  src={cityInfo?.image}
                  alt={item.city}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Badge for Top Destination */}
                {index === 0 && (
                  <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                    Top Destination
                  </div>
                )}

                {/* Content */}
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-3xl font-playfair font-semibold">
                    {item.city}
                  </h3>
                  <p className="text-sm text-gray-200 mt-1">
                    {item.count} Premium Stays
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* 🔥 Call To Action Section */}
      <div className="mt-8 flex justify-center gap-4">
      <button
        onClick={() => navigate("/rooms")}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full transition"
      >
        Browse All Rooms
      </button>

      <button
        onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
        className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-full hover:bg-indigo-50 transition"
      >
        View Destinations
      </button>
      </div>

    </div>
  );
};

export default Destinations;
