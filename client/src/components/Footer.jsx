import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.success("Successfully subscribed to newsletter!");
    setEmail("");
  };

  return (
    <div className="bg-[#F6F9FC] text-gray-500/80 pt-10 px-6 md:px-16 lg:px-24 xl:px-32">

      <div className="flex flex-wrap justify-between gap-12">

        {/* Logo & Description */}
        <div className="max-w-80">
          <img
            src={assets.logo}
            alt="logo"
            className="mb-4 h-8 md:h-9 invert opacity-80"
          />

          <p className="text-sm">
            Discover the world's most extraordinary places to stay,
            from boutique hotels to luxury villas and private islands.
          </p>

          <div className="flex items-center gap-3 mt-4">
            <img src={assets.instagramIcon} alt="instagram" className="w-6 cursor-pointer" />
            <img src={assets.facebookIcon} alt="facebook" className="w-6 cursor-pointer" />
            <img src={assets.twitterIcon} alt="twitter" className="w-6 cursor-pointer" />
            <img src={assets.linkendinIcon} alt="linkedin" className="w-6 cursor-pointer" />
          </div>
        </div>

        {/* COMPANY */}
        <div>
          <p className="font-playfair text-lg text-gray-800">COMPANY</p>

          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li><Link to="/about" className="hover:text-indigo-600 transition">About</Link></li>
            <li><Link to="/careers" className="hover:text-indigo-600 transition">Careers</Link></li>
            <li><Link to="/blog" className="hover:text-indigo-600 transition">Blog</Link></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <p className="font-playfair text-lg text-gray-800">SUPPORT</p>

          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li><Link to="/help-center" className="hover:text-indigo-600 transition">Help Center</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-600 transition">Contact Us</Link></li>
            <li><Link to="/cancellation-policy" className="hover:text-indigo-600 transition">Cancellation Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="max-w-80">
          <p className="font-playfair text-lg text-gray-800">STAY UPDATED</p>

          <p className="mt-3 text-sm">
            Subscribe to our newsletter for inspiration and special offers.
          </p>

          <form onSubmit={handleSubscribe} className="flex items-center mt-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white rounded-l border border-gray-300 h-9 px-3 outline-none w-full"
              placeholder="Your email"
            />

            <button
              type="submit"
              className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 transition h-9 w-10 rounded-r"
            >
              <img
                src={assets.arrowIcon}
                alt="arrow-icon"
                className="w-3.5 invert"
              />
            </button>
          </form>
        </div>

      </div>

      <hr className="border-gray-300 mt-10" />

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between py-6 text-sm">
        <p>
          © {new Date().getFullYear()} QuickStay. All rights reserved.
        </p>

        <ul className="flex items-center gap-6">
          <li><Link to="/privacy" className="hover:text-indigo-600 transition">Privacy</Link></li>
          <li><Link to="/terms" className="hover:text-indigo-600 transition">Terms</Link></li>
        </ul>
      </div>

    </div>
  );
};

export default Footer;
