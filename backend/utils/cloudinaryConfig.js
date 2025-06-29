// utils/cloudinaryConfig.js
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "resumes",
    resource_type: "raw", // For PDF
    format: async () => "pdf",
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
     access_mode: "public",
  },
});

const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profiles",
    resource_type: "image",
    format: async (req, file) => "jpg",
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

module.exports = { cloudinary, resumeStorage, profileStorage };
