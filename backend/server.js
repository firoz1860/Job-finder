require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./lib/passportConfig");
const cors = require("cors");
const fs = require("fs");

const app = express();

// 📁 Ensure upload directories exist
["./public", "./public/resume", "./public/profile"].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

// 🌐 Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passportConfig.initialize());

// 📦 Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/host", require("./routes/downloadRoutes"));

// 🛠️ Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.message);
  res.status(400).json({ error: "Invalid JSON body." });
});

// 🌍 MongoDB Connection
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/jobPortal";
console.log("🌐 DB_URL seen by server:", process.env.DB_URL);

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");

    // 🧠 Log which DB you're connected to
    console.log(`📦 Using database: ${mongoose.connection.name}`);

    const PORT = process.env.PORT || 4444;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });





// require("dotenv").config();
// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const passportConfig = require("./lib/passportConfig");
// const cors = require("cors");
// const fs = require("fs");

// const app = express();

// // Initialize directories
// ["./public", "./public/resume", "./public/profile"].forEach(dir => {
//   if (!fs.existsSync(dir)) fs.mkdirSync(dir);
// });

// // Middleware setup
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(passportConfig.initialize());

// // Routes
// app.use("/auth", require("./routes/authRoutes"));
// app.use("/api", require("./routes/apiRoutes"));
// app.use("/upload", require("./routes/uploadRoutes"));
// app.use("/host", require("./routes/downloadRoutes"));


// app.use((err, req, res, next) => {
//   console.error('Unhandled Error:', err.message);
//   res.status(400).json({ error: "Invalid JSON body." });
// });

// // MongoDB Connection and Server Start
// mongoose.connect(process.env.DB_URL || "mongodb://localhost:27017/test", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log("✅ Connected to MongoDB");

//   const PORT = process.env.PORT || 4444;
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running at port ${PORT}`);
//   });
// })
// .catch((err) => {
//   console.error("❌ MongoDB connection failed:", err.message);
// });







// require("dotenv").config();
// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const passportConfig = require("./lib/passportConfig");
// const cors = require("cors");
// const fs = require("fs");


// // MongoDB
// // mongoose
// //   .connect("mongodb://localhost:27017/jobPortal", {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //     useCreateIndex: true,
// //     useFindAndModify: false,
// //   })
// //   .then((res) => console.log("Connected to DB"))
// //   .catch((err) => console.log(err));

// // initialising directories
// if (!fs.existsSync("./public")) {
//   fs.mkdirSync("./public");
// }
// if (!fs.existsSync("./public/resume")) {
//   fs.mkdirSync("./public/resume");
// }
// if (!fs.existsSync("./public/profile")) {
//   fs.mkdirSync("./public/profile");
// }

// const app = express();
// // const port = 4444;

// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// // Setting up middlewares
// app.use(cors());
// app.use(express.json());
// app.use(passportConfig.initialize());

// // Routing
// app.use("/auth", require("./routes/authRoutes"));
// app.use("/api", require("./routes/apiRoutes"));
// app.use("/upload", require("./routes/uploadRoutes"));
// app.use("/host", require("./routes/downloadRoutes"));

// // app.listen(port, () => {
// //   console.log(`Server started on port ${port}!`);
// // });

// app.listen(process.env.PORT, () => {
//   console.log(`Server running at port ${process.env.PORT}`);
// });
