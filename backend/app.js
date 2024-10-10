require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const analyzeRoutes = require('./routes/analyzeRoutes');
const formRoutes = require('./routes/formRoutes');

const app = express();
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data

app.use(cors({
    // origin: 'https://nexcarrier.onrender.com/', // Ensure this matches your frontend URL
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware for file uploads
const upload = multer({ dest: 'uploads/' });

// Routes
app.use('/api/analyze', upload.single('resume'), analyzeRoutes);
app.use('/api/form', formRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
