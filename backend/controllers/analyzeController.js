const { analyzeResume } = require('../services/openAiService');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const analyzeResumeController = async (req, res) => {
    try {
        const resumeFile = req.file; // The uploaded resume file
        const pdfPath = resumeFile.path;

        // Convert the resume PDF file to text
        const dataBuffer = fs.readFileSync(pdfPath);
        const pdfData = await pdfParse(dataBuffer); // Extract text from PDF

        const resumeText = pdfData.text; // Extracted text from resume
        const jobDescription = req.body.jobDescription; // Job description text

        // Log the job description and resume for debugging
        console.log("Job Description:", jobDescription);
        console.log("Resume Text:", resumeText);
        console.log("_________________________________________________________________");

        // Call the OpenAI (Groq) service to analyze resume and job description
        const result = await analyzeResume(resumeText, jobDescription);

        // Send the analysis result as JSON response
        res.json(result);
    } catch (error) {
        console.error('Error analyzing resume:', error);
        res.status(500).send('Error analyzing resume');
    }
};

module.exports = { analyzeResumeController };
