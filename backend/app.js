// require("dotenv").config();
// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");
// const analyzeRoutes = require("./routes/analyzeRoutes");
// const formRoutes = require("./routes/formRoutes");

// const app = express();
// app.use(express.json({ limit: "50mb" })); // To parse JSON request bodies
// app.use(express.urlencoded({ extended: true, limit: "50mb" })); // To parse URL-encoded data

// app.use(
//   cors({
//     // origin: 'https://nexcarrier.onrender.com/', // Ensure this matches your frontend URL
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// // File filter to accept only PDFs
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "application/pdf") {
//     cb(null, true);
//   } else {
//     cb(new Error("Only PDF files are allowed!"), false);
//   }
// };

// // Middleware for file uploads
// // const upload = multer({ dest: 'uploads/' });
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB limit per file
//     files: 20, // Maximum 20 files at once
//   },
// });

// // Ensure upload and output directories exist
// const fs = require("fs");
// const uploadDir = path.join(__dirname, "uploads");
// const outputDir = path.join(__dirname, "output");

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// if (!fs.existsSync(outputDir)) {
//   fs.mkdirSync(outputDir);
// }

// // Error handling middleware for multer
// app.use((error, req, res, next) => {
//   if (error instanceof multer.MulterError) {
//     if (error.code === "LIMIT_FILE_SIZE") {
//       return res.status(400).json({
//         error: "File size is too large. Max limit is 10MB",
//       });
//     }
//     if (error.code === "LIMIT_FILE_COUNT") {
//       return res.status(400).json({
//         error: "Too many files. Max limit is 20 files",
//       });
//     }
//   }
//   next(error);
// });

// // Routes
// app.use("/api/analyze", analyzeRoutes);
// app.use("/api/form", formRoutes);

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`Upload directory: ${uploadDir}`);
// });

// // Cleanup function for temporary files
// const cleanup = () => {
//   // Clean uploads directory
//   if (fs.existsSync(uploadDir)) {
//     fs.readdirSync(uploadDir).forEach((file) => {
//       const filePath = path.join(uploadDir, file);
//       fs.unlinkSync(filePath);
//     });
//   }
// };

// // Graceful shutdown
// process.on("SIGINT", () => {
//   cleanup();
//   process.exit();
// });

// process.on("SIGTERM", () => {
//   cleanup();
//   process.exit();
// });

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path"); // Correct import for path
const fs = require("fs"); // Separate import for fs
const analyzeRoutes = require("./routes/analyzeRoutes");
const formRoutes = require("./routes/formRoutes");

const app = express();

// Increase payload size limit for large files
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Ensure required directories exist
const uploadDir = path.join(__dirname, "uploads");
const outputDir = path.join(__dirname, "output");

[uploadDir, outputDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
});

// Routes
app.use("/api/analyze", analyzeRoutes);
app.use("/api/form", formRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Upload directory: ${uploadDir}`);
  console.log(`Output directory: ${outputDir}`);
});

// Cleanup function
const cleanup = () => {
  [uploadDir, outputDir].forEach((dir) => {
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir).forEach((file) => {
        fs.unlinkSync(path.join(dir, file));
      });
    }
  });
};

// Cleanup on server shutdown
["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, () => {
    cleanup();
    process.exit();
  });
});
