import React from "react";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const FeaturedDestination = () => {
  const { rooms, navigate } = useAppContext();

  return (
    rooms.length > 0 && (
      <div className="px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
        <Title
          title="Featured Destinations"
          subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-20 auto-rows-fr items-stretch">
          {rooms.slice(0, 4).map((room, index) => (
            <div key={room._id} className="h-full">
              <HotelCard room={room} index={index} />
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            navigate("/rooms");
            scrollTo(0, 0);
          }}
          className="my-16 px-4 py-2 text-sm font-medium border border-gray-300 
             rounded bg-white hover:bg-gray-50 transition-all cursor-pointer mx-auto block"
        >
          View All Destinations
        </button>
      </div>
    )
  );
};

export default FeaturedDestination;
