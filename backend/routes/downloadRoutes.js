const express = require("express");
const JobApplicant = require("../db/JobApplicant");

const router = express.Router();

// GET /host/resume/<applicantId>
router.get("/resume/:applicantId", async (req, res) => {
  try {
    const applicant = await JobApplicant.findById(req.params.applicantId);
    if (!applicant?.resume) return res.status(404).json({ message: "Resume not found" });

    res.redirect(applicant.resume);                    // 302 to Cloudinary
  } catch (err) {
    console.error("Resume redirect error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /host/profile/<applicantId>
router.get("/profile/:applicantId", async (req, res) => {
  try {
    const applicant = await JobApplicant.findById(req.params.applicantId);
    if (!applicant?.profile) return res.status(404).json({ message: "Profile not found" });

    res.redirect(applicant.profile);
  } catch (err) {
    console.error("Profile redirect error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;





// const express = require("express");
// const JobApplicant = require("../db/JobApplicant"); // or your actual schema
// const User = require("../db/User");

// const router = express.Router();

// router.get("/resume/:applicants", async (req, res) => {
//   try {
//     const applicant = await JobApplicant.findById(req.params.applicantId);
//     if (!applicant || !applicant.resumeURL) {
//       return res.status(404).json({ message: "Resume not found" });
//     }

//     return res.redirect(applicant.resumeURL);
//   } catch (err) {
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// router.get("/profile/:userId", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user || !user.profileURL) {
//       return res.status(404).json({ message: "Profile image not found" });
//     }

//     return res.redirect(user.profileURL);
//   } catch (err) {
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;





// const express = require("express");
// const fs = require("fs");
// const path = require("path");

// const router = express.Router();

// router.get("/resume/:file", (req, res) => {
//   const address = path.join(__dirname, `../public/resume/${req.params.file}`);
//   fs.access(address, fs.F_OK, (err) => {
//     if (err) {
//       res.status(404).json({
//         message: "File not found",
//       });
//       return;
//     }
//     res.sendFile(address);
//   });
// });

// router.get("/profile/:file", (req, res) => {
//   const address = path.join(__dirname, `../public/profile/${req.params.file}`);
//   fs.access(address, fs.F_OK, (err) => {
//     if (err) {
//       res.status(404).json({
//         message: "File not found",
//       });
//       return;
//     }
//     res.sendFile(address);
//   });
// });

// module.exports = router;
