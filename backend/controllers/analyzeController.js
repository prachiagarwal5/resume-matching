const { analyzeResume } = require('../services/openAiService');

const analyzeResumeController = async (req, res) => {
    try {
        const resumeFile = req.file; // The uploaded resume file
        console.log(resumeFile);
        const jobDescription = req.body.jobDescription; // Job description text

        // Assuming resume is a text file or extracted text from the PDF
        const resumeText = "Extracted text from resume"; // Placeholder

        // Call OpenAI service to analyze resume and JD
        const result = await analyzeResume(resumeText, jobDescription);
        
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error analyzing resume');
    }
};

module.exports = { analyzeResumeController };
