const { analyzeResume } = require('../services/openAiService');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const analyzeResumeController = async (req, res) => {
    try {
        const resumeFile = req.file; // The uploaded resume file
        // console.log(resumeFile);
        console.log(resumeFile.path);
        // console.log(resumeFile.filename);
        const pdfPath = resumeFile.path;

        let resumeText = '';
        
        fs.readFile(pdfPath, (err, dataBuffer) => {
            if (err) {
              console.error('Error reading PDF:', err);
              return;
            }
          
            // Parse the PDF
            pdfParse(dataBuffer)
              .then(data => {
                // Extracted text from PDF
                resumeText = data.text;
          
                // Log or use the extracted text
                // console.log(resumeText);
              })
              .catch(error => {
                console.error('Error parsing PDF:', error);
              });
          });
        
        // convert the resume file to text

        


        const jobDescription = req.body.jobDescription; // Job description text
        console.log(jobDescription);

        // Assuming resume is a text file or extracted text from the PDF
        // resumeText = "Extracted text from resume"; // Placeholder

        // Call OpenAI service to analyze resume and JD
        const result = await analyzeResume(resumeText, jobDescription);
        
        // res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error analyzing resume');
    }
};

module.exports = { analyzeResumeController };
