import axios from "axios";
import { createContext, use, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {useUser,useAuth} from "@clerk/clerk-react"
import { useState,useEffect } from "react";
import {toast} from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const navigate = useNavigate();

  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();

  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSearchedCities] = useState([]);
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () =>{
    try {
      const {data} = await axios.get('/api/rooms')

      setRooms(data.rooms);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const fetchUser = async () => {
    try {
      const token = await getToken({ skipCache: true });
      if (!token) return;

      const { data } = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsOwner(data.role === "hotelOwner");
      setSearchedCities(data.recentSearchedCities || []);
    } catch (error) {
      if (error.response?.status !== 401) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchUser();
    }
  }, [isLoaded, isSignedIn]);


  useEffect(() => {
       fetchRooms();
  }, [])
  
  return (
    <AppContext.Provider
      value={{
        currency,
        navigate,
        user,
        getToken,
        isOwner,
        setIsOwner,
        showHotelReg,
        setShowHotelReg,
        axios,
        searchedCities,
        setSearchedCities,
        rooms,
        setRooms
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


export const useAppContext = () => useContext(AppContext);