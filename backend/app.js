require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const analyzeRoutes = require('./routes/analyzeRoutes');

const app = express();

app.use(cors({
    // origin: 'https://nexcarrier.onrender.com/', // Ensure this matches your frontend URL
    origin: 'https://resume-matching-frontend.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware for file uploads
const upload = multer({ dest: 'uploads/' });

// Routes
app.use('/api/analyze', upload.single('resume'), analyzeRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
