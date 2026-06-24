import React, { useEffect, useState } from "react";

// import axios from "axios";
import api from "../../api/axios";
import TestimonialCard from "./TestimonialCard";

import TestimonialForm from "./TestimonialForm";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // FETCH TESTIMONIALS
  const fetchTestimonials = async () => {
    try {
      const res = await api.get("/testimonials");
      setTestimonials(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // NEXT SLIDE
  const nextSlide = () => {
    if (currentIndex === testimonials.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // PREV SLIDE
  const prevSlide = () => {
    if (currentIndex === 0) {
      setCurrentIndex(testimonials.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // AUTO SLIDE
  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, testimonials]);

  return (
    <section className="py-10 sm:py-14 md:py-10 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        {/* TITLE */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold font-playfair text-gray-800">
            What Our Clients Say
          </h2>

          <p className="text-gray-500  mt-3">Real feedback from our clients</p>
        </div>

        {/* TESTIMONIAL CARD */}
        {testimonials.length > 0 && (
          <div className="relative">
            <TestimonialCard testimonial={testimonials[currentIndex]} />

            {/* BUTTONS */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={prevSlide}
                className="px-5 py-2 bg-orange-500 text-white rounded-lg"
              >
                Prev
              </button>

              <button
                onClick={nextSlide}
                className="px-5 py-2 bg-orange-500 text-white rounded-lg"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* FEEDBACK FORM */}
        <TestimonialForm fetchTestimonials={fetchTestimonials} />
      </div>
    </section>
  );
};

export default Testimonials;
