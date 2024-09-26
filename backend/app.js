require('dotenv').config();
const express = require('express');
const multer = require('multer');
const analyzeRoutes = require('./routes/analyzeRoutes');

const app = express();

// Middleware for file uploads
const upload = multer({ dest: 'uploads/' });

// Routes
app.use('/api/analyze', upload.single('resume'), analyzeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
