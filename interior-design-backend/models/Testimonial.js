const mongoose = require("mongoose");

const testimonialSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      rating: {
        type: Number,
        default: 5,
      },

      message: {
        type: String,
        required: true,
      },
    },

    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Testimonial",
  testimonialSchema
);