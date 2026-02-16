import React from "react";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/Appcontext";
import { useEffect,useState } from "react";

const RecommendedHotels = () => {

  const{rooms,searchedCities} = useAppContext();
  const [recommended, setRecommended] = useState([])

  const filterHotels = () =>{
    const filteredHotels = rooms.slice().filter(room => searchedCities.includes(room.hotel.city))

    setRecommended(filteredHotels);
  
  }

  useEffect(() => {
    filterHotels();
  }, [rooms,searchedCities])
  

  return recommended.length > 0 && (
    <div className="px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
      <Title
        title="Recommended Hotels"
        subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-20">
        {recommended.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>

    </div>
  );
};

export default RecommendedHotels;
