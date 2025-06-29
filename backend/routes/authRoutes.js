const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKeys");

const User = require("../db/User");
const JobApplicant = require("../db/JobApplicant");
const Recruiter = require("../db/Recruiter");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const data = req.body;
  console.log("🔐 Signup Body:", data);

  try {
    // 1. Save user credentials
    const user = new User({
      email: data.email,
      password: data.password,
      type: data.type,
    });

    await user.save();

    // 2. Save profile based on type
    let userDetails;

    if (user.type === "recruiter") {
      userDetails = new Recruiter({
        userId: user._id,
        name: data.name,
        contactNumber: data.contactNumber || "",
        bio: data.bio || "",
      });
    } else {
      userDetails = new JobApplicant({
        userId: user._id,
        name: data.name,
        education: data.education || [],
        skills: data.skills || [],
        rating: data.rating ?? -1,
        resume: data.resume || "",
        profile: data.profile || "",
      });
    }

    await userDetails.save();

    // 3. Generate JWT
    const token = jwt.sign({ _id: user._id, type: user.type }, authKeys.jwtSecretKey);
    res.json({ token, type: user.type });
  } catch (err) {
    console.error("❌ Signup Error:", err);
    res.status(400).json({ message: err.message || "Something went wrong." });
  }
});

// 🟢 Login route
router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json(info);
      }

      const token = jwt.sign({ _id: user._id, type: user.type }, authKeys.jwtSecretKey);
      return res.json({
        token,
        type: user.type,
      });
    }
  )(req, res, next);
});

module.exports = router;




// const express = require("express");
// const passport = require("passport");
// const jwt = require("jsonwebtoken");
// const authKeys = require("../lib/authKeys");

// const User = require("../db/User");
// const JobApplicant = require("../db/JobApplicant");
// const Recruiter = require("../db/Recruiter");

// const router = express.Router();

// router.post("/signup", async (req, res) => {
//   const data = req.body;
//   console.log("Signup Body:", data);

//   try {
//     const user = new User({
//       email: data.email,
//       password: data.password,
//       type: data.type,
//     });

//     await user.save();

//     let userDetails;

//     if (user.type === "recruiter") {
//       userDetails = new Recruiter({
//         userId: user._id,
//         name: data.name,
//         contactNumber: data.contactNumber,
//         bio: data.bio,
//       });
//     } else {
//       userDetails = new JobApplicant({
//         userId: user._id,
//         name: data.name,
//         education: data.education,
//         skills: data.skills,
//         rating: data.rating,
//         resume: data.resume,
//         profile: data.profile,
//       });
//     }

//     await userDetails.save();

//     const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
//     res.json({ token, type: user.type });
//   } catch (err) {
//     console.error("Signup Error:", err);
//     res.status(400).json({ error: err.message || err });
//   }
// });

// // router.post("/signup", (req, res) => {
// //   const data = req.body;
// //   let user = new User({
// //     email: data.email,
// //     password: data.password,
// //     type: data.type,
// //   });

// //   user
// //     .save()
// //     .then(() => {
// //       const userDetails =
// //         user.type == "recruiter"
// //           ? new Recruiter({
// //               userId: user._id,
// //               name: data.name,
// //               contactNumber: data.contactNumber,
// //               bio: data.bio,
// //             })
// //           : new JobApplicant({
// //               userId: user._id,
// //               name: data.name,
// //               education: data.education,
// //               skills: data.skills,
// //               rating: data.rating,
// //               resume: data.resume,
// //               profile: data.profile,
// //             });

// //       userDetails
// //         .save()
// //         .then(() => {
// //           // Token
// //           const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
// //           res.json({
// //             token: token,
// //             type: user.type,
// //           });
// //         })
// //         .catch((err) => {
// //           user
// //             .delete()
// //             .then(() => {
// //               res.status(400).json(err);
// //             })
// //             .catch((err) => {
// //               res.json({ error: err });
// //             });
// //           err;
// //         });
// //     })
// //     .catch((err) => {
// //       res.status(400).json(err);
// //     });
// // });

// router.post("/login", (req, res, next) => {
//   passport.authenticate(
//     "local",
//     { session: false },
//     function (err, user, info) {
//       if (err) {
//         return next(err);
//       }
//       if (!user) {
//         res.status(401).json(info);
//         return;
//       }
//       // Token
//       const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
//       res.json({
//         token: token,
//         type: user.type,
//       });
//     }
//   )(req, res, next);
// });

// module.exports = router;
