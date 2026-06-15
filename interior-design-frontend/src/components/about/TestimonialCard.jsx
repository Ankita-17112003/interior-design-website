import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const TestimonialCard = ({ testimonial }) => {
  const stars = Math.floor(testimonial.rating || 5);

  return (
    <div
      className="relative w-full max-w-sm mx-auto bg-white rounded-2xl p-5 shadow-md border border-gray-100
      transition-all duration-500 ease-in-out
      hover:-translate-y-3 hover:scale-[1.03]
      hover:shadow-2xl hover:shadow-orange-100
      group animate-float"
    >

      {/* TOP BAR */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-t-2xl" />

      {/* QUOTE ICON */}
      <FaQuoteLeft className="absolute top-4 left-4 text-orange-100 text-3xl transition duration-500 group-hover:scale-110" />

      {/* AVATAR */}
      <div className="flex justify-center">
        <div className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center text-lg font-bold shadow-md border-2 border-white
        transition duration-500 group-hover:rotate-6 group-hover:scale-110">
          {testimonial.name?.charAt(0)?.toUpperCase()}
        </div>
      </div>

      {/* NAME */}
      <h3 className="mt-3 text-base font-semibold text-center text-gray-800">
        {testimonial.name}
      </h3>

      {/* CITY */}
      <p className="text-center text-gray-500 text-xs">
        {testimonial.city}
      </p>

      {/* STARS */}
      <div className="flex justify-center mt-2 gap-1">
        {[...Array(stars)].map((_, i) => (
          <FaStar
            key={i}
            className="text-yellow-400 text-xs transition group-hover:scale-110"
          />
        ))}
      </div>

      {/* MESSAGE */}
      <p className="text-center mt-3 text-gray-600 text-sm italic line-clamp-3">
        “{testimonial.message}”
      </p>
    </div>
  );
};

export default TestimonialCard;