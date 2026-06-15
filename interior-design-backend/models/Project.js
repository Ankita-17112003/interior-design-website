const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    src: { type: String, default: "" },          // Cloudinary image URL
    type: {
      type: String,
      enum: ["image", "youtube"],               // video removed, youtube added
      required: true,
    },
    youtubeUrl: { type: String, default: "" },  // YouTube link
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);