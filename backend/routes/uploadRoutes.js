const express  = require("express");
const multer   = require("multer");
const jwtAuth  = require("../lib/jwtAuth");          
const { resumeStorage, profileStorage } = require("../utils/cloudinaryConfig");
const JobApplicant = require("../db/JobApplicant");

const router = express.Router();

// =========== Resume ===========
router.post(
  "/resume",
  jwtAuth,                                
  multer({ storage: resumeStorage }).single("file"),
  async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "Invalid file" });

    try {
      
      await JobApplicant.findOneAndUpdate(
        { userId: req.user._id },
        { resume: req.file.path },
        { new: true, upsert: false }
      );

      res.json({ message: "Resume uploaded", url: req.file.path });
    } catch (err) {
      console.error("Error saving resume URL:", err);
      res.status(500).json({ message: "DB error" });
    }
  }
);

// =========== Profile photo ===========
router.post(
  "/profile",
  jwtAuth,
  multer({ storage: profileStorage }).single("file"),
  async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "Invalid file" });

    try {
      await JobApplicant.findOneAndUpdate(
        { userId: req.user._id },
        { profile: req.file.path },
        { new: true, upsert: false }
      );

      res.json({ message: "Profile photo uploaded", url: req.file.path });
    } catch (err) {
      console.error("Error saving profile URL:", err);
      res.status(500).json({ message: "DB error" });
    }
  }
);

module.exports = router;




// const express = require("express");
// const multer = require("multer");
// const { resumeStorage, profileStorage } = require("../utils/cloudinaryConfig");

// const uploadResume = multer({ storage: resumeStorage });
// const uploadProfile = multer({ storage: profileStorage });

// const router = express.Router();

// router.post("/resume", uploadResume.single("file"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "Invalid format" });
//   }

//   res.status(200).json({
//     message: "Resume uploaded successfully",
//     url: req.file.path, // Cloudinary URL
//   });
// });

// router.post("/profile", uploadProfile.single("file"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "Invalid format" });
//   }

//   res.status(200).json({
//     message: "Profile image uploaded successfully",
//     url: req.file.path, // Cloudinary URL
//   });
// });

// module.exports = router;





// const express = require("express");
// const multer = require("multer");
// const fs = require("fs");
// const { v4: uuidv4 } = require("uuid");
// const { promisify } = require("util");

// const pipeline = promisify(require("stream").pipeline);

// const router = express.Router();

// const upload = multer();

// router.post("/resume", upload.single("file"), (req, res) => {
//   const { file } = req;
//   if (file.detectedFileExtension != ".pdf") {
//     res.status(400).json({
//       message: "Invalid format",
//     });
//   } else {
//     const filename = `${uuidv4()}${file.detectedFileExtension}`;

//     pipeline(
//       file.stream,
//       fs.createWriteStream(`${__dirname}/../public/resume/${filename}`)
//     )
//       .then(() => {
//         res.send({
//           message: "File uploaded successfully",
//           url: `/host/resume/${filename}`,
//         });
//       })
//       .catch((err) => {
//         res.status(400).json({
//           message: "Error while uploading",
//         });
//       });
//   }
// });

// router.post("/profile", upload.single("file"), (req, res) => {
//   const { file } = req;
//   if (
//     file.detectedFileExtension != ".jpg" &&
//     file.detectedFileExtension != ".png"
//   ) {
//     res.status(400).json({
//       message: "Invalid format",
//     });
//   } else {
//     const filename = `${uuidv4()}${file.detectedFileExtension}`;

//     pipeline(
//       file.stream,
//       fs.createWriteStream(`${__dirname}/../public/profile/${filename}`)
//     )
//       .then(() => {
//         res.send({
//           message: "Profile image uploaded successfully",
//           url: `/host/profile/${filename}`,
//         });
//       })
//       .catch((err) => {
//         res.status(400).json({
//           message: "Error while uploading",
//         });
//       });
//   }
// });

// module.exports = router;
