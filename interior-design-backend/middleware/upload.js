const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video/");

    return {
      folder: "interior-projects",
      resource_type: isVideo ? "video" : "image",

      allowed_formats: isVideo
        ? ["mp4", "mov", "webm"]
        : ["jpg", "jpeg", "png", "webp"],

      // Image optimization
      ...(isVideo
        ? {}
        : {
            transformation: [
              {
                width: 1600,
                crop: "limit",
                quality: "auto",
                fetch_format: "auto",
              },
            ],
          }),
    };
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only image/video allowed"), false);
    }
  },
});

module.exports = upload;