import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const HotelCard = ({ room, index }) => {
  return (
    <Link
      to={`/rooms/${room._id}`}
      onClick={() => scrollTo(0, 0)}
      className="block h-full"
    >
      <div className="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-[0px_4px_4px_rgba(0,0,0,0.05)]">

        {/* Image */}
        <div className="relative w-full h-52">
          <img
            src={room.images[0]}
            alt={room.hotel.name}
            className="w-full h-full object-cover"
          />

          {index % 2 === 0 && (
            <p className="px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full">
              Best Seller
            </p>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-4">

          {/* Title + Rating */}
          <div className="flex items-center justify-between">
            <p className="font-playfair text-xl font-medium text-gray-800">
              {room.hotel.name}
            </p>

            <div className="flex items-center gap-1">
              <img src={assets.starIconFilled} alt="star-icon" className="h-4" />
              <span className="text-gray-700 text-sm">4.5</span>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-2 mt-2 min-h-[48px]">
            <img
              src={assets.locationIcon}
              alt="location-icon"
              className="h-4 w-4 mt-1"
            />
            <span className="text-gray-600 text-sm line-clamp-2">
              {room.hotel.address}
            </span>
          </div>

          {/* Price Section */}
          <div className="mt-auto flex items-center justify-between pt-4">
            <p>
              <span className="text-xl text-gray-800">₹{room.pricePerNight}</span>
              <span className="text-gray-500 text-sm"> / night</span>
            </p>

            <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-70 transition-all cursor-pointer">
              Book Now
            </button>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default HotelCard
