import React from "react";
import Title from "./Title";
import { testimonials } from "../assets/assets";
import StarRating from "./StarRating";

const Testimonial = () => {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-24 bg-gradient-to-b from-white to-[#F5F5FF]">
      
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto">
        <Title
          title="What Our Guests Say"
          subTitle="Discover why travelers consistently choose our platform for secure bookings, premium stays, and seamless experiences."
        />
      </div>

      {/* Testimonials Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-gray-100"
          >
            {/* User Info */}
            <div className="flex items-center gap-4">
              <img
                className="w-14 h-14 rounded-full object-cover border-2 border-indigo-100"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="font-playfair text-lg text-gray-800">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-500">
                  {testimonial.address}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="mt-4">
              <StarRating rating={testimonial.rating} />
            </div>

            {/* Review */}
            <p className="text-gray-600 mt-6 leading-relaxed text-sm">
              “{testimonial.review}”
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
