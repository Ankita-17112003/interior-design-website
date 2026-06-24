import React from "react";
import { FaStar } from "react-icons/fa";

const TestimonialCard = ({ testimonial }) => {
  const stars = Math.floor(testimonial.rating || 5);

  return (
    <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto bg-white rounded-xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-500 text-center overflow-hidden">

      {/* BACKGROUND QUOTE MARK */}
      <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-7xl text-orange-50 font-playfair select-none leading-none">
        "
      </span>

      {/* AVATAR */}
      <div className="relative w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center text-lg font-semibold shadow-md mb-4">
        {testimonial.name?.charAt(0)?.toUpperCase()}
      </div>

      {/* NAME */}
      <h3 className="text-base font-semibold text-gray-800 font-playfair">
        {testimonial.name}
      </h3>

      {/* CITY */}
      <p className="text-gray-400 text-xs mb-3">
        {testimonial.city}
      </p>

      {/* STARS */}
      <div className="flex justify-center gap-0.5 mb-4">
        {[...Array(stars)].map((_, i) => (
          <FaStar key={i} className="text-[#c8a97e] text-xs" />
        ))}
      </div>

      {/* DIVIDER */}
      <div className="w-10 h-[2px] bg-[#c8a97e] mx-auto mb-4" />

      {/* MESSAGE */}
      <p className="relative text-gray-600 text-sm leading-relaxed italic min-h-[60px] max-w-md mx-auto">
        {testimonial.message}
      </p>

    </div>
  );
};

export default TestimonialCard;