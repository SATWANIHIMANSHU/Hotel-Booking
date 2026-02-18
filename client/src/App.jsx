import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./components/RoomDetails";
import MyBookings from "./pages/MyBookings";
import HotelReg from "./components/HotelReg";
import Layout from "./pages/hotelOwner/Layout";
import Dashboard from "./pages/hotelOwner/Dashboard";
import AddRoom from "./pages/hotelOwner/AddRoom";
import ListRoom from "./pages/hotelOwner/ListRoom";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import About from "./pages/AboutUs";
import Destinations from "./components/Destinatiom";
import StaticPage from "./pages/StaticPage";
import { staticPages } from "./data/staticPagesData.jsx";
import Loader from "./components/Loader.jsx";

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  const { showHotelReg } = useAppContext();

  return (
    <div>
      <Toaster />
      {!isOwnerPath && <Navbar />}
      {showHotelReg && <HotelReg />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/loader/:nextUrl" element={<Loader />} />
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>

          
          {staticPages.map((page) => (
            <Route
              key={page.path}
              path={page.path}
              element={<StaticPage title={page.title} content={page.content} />}
            />
          ))}

        
          <Route
            path="*"
            element={
              <StaticPage
                title="404 - Page Not Found"
                content={<p>The page you are looking for does not exist.</p>}
              />
            }
          />
        </Routes>
      </div>
      {!isOwnerPath && <Footer />}
    </div>
  );
};

export default App;
