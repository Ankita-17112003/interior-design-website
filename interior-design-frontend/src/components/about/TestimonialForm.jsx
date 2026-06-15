import React, { useState } from "react";
import axios from "axios";
import { FaStar, FaUser, FaCity, FaCommentDots } from "react-icons/fa";
import Swal from "sweetalert2";

const TestimonialForm = ({ fetchTestimonials }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    rating: 5,
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Name Required",
        text: "Please enter your name",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    if (!formData.city.trim()) {
      Swal.fire({
        icon: "warning",
        title: "City Required",
        text: "Please enter your city",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    if (!formData.message.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Feedback Required",
        text: "Please write your feedback",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/testimonials", formData);

      await fetchTestimonials();

      // Success popup
      Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: "Your feedback has been submitted successfully.",
        confirmButtonColor: "#f97316",
        confirmButtonText: "Great!",
        timer: 3000,
        timerProgressBar: true,
      });

      // Reset form
      setFormData({
        name: "",
        city: "",
        rating: 5,
        message: "",
      });

      setShowForm(false);
    } catch (err) {
      console.log(err);
      
      // Error popup
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: err.response?.data?.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-6 sm:py-10 md:py-16 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* HEADING */}
        <div className="text-center mb-3 sm:mb-6">
          <h2 className="text-lg sm:text-2xl md:text-4xl font-bold text-gray-800 font-playfair">
            We value your feedback
          </h2>
        </div>

        {/* BUTTON */}
        <div className="text-center mb-3 sm:mb-4">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 sm:px-8 py-2 sm:py-3 rounded-full font-semibold active:scale-95 transition"
          >
            {showForm ? "Close Form" : "Give Feedback"}
          </button>
        </div>

        {/* FORM */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8">

            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>

              {/* NAME */}
              <div>
                <label className="text-gray-700 font-medium text-sm">
                  Your Name
                </label>
                <div className="flex items-center border rounded-xl px-3 py-2 mt-1">
                  <FaUser className="text-gray-400 mr-2" />
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full outline-none text-sm"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              {/* CITY */}
              <div>
                <label className="text-gray-700 font-medium text-sm">
                  Your City
                </label>
                <div className="flex items-center border rounded-xl px-3 py-2 mt-1">
                  <FaCity className="text-gray-400 mr-2" />
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full outline-none text-sm"
                    placeholder="Enter your city"
                    required
                  />
                </div>
              </div>

              {/* RATING */}
              <div>
                <label className="text-gray-700 font-medium text-sm">
                  Rating
                </label>
                <div className="flex items-center border rounded-xl px-3 py-2 mt-1">
                  <FaStar className="text-yellow-400 mr-2" />
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full outline-none text-sm bg-transparent"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5 stars)</option>
                    <option value="4">⭐⭐⭐⭐ (4 stars)</option>
                    <option value="3">⭐⭐⭐ (3 stars)</option>
                    <option value="2">⭐⭐ (2 stars)</option>
                    <option value="1">⭐ (1 star)</option>
                  </select>
                </div>
              </div>

              {/* MESSAGE */}
              <div>
                <label className="text-gray-700 font-medium text-sm">
                  Feedback
                </label>
                <div className="flex border rounded-xl px-3 py-2 mt-1">
                  <FaCommentDots className="text-gray-400 mr-2 mt-1" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full outline-none text-sm resize-none"
                    rows="3"
                    placeholder="Write feedback..."
                    required
                  />
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Feedback"}
              </button>

            </form>
          </div>
        )}

      </div>
    </section>
  );
};

export default TestimonialForm;