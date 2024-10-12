const { generateResume } = require('../services/createResume');

const createResume = async (req, res) => {
    try {
        // Log incoming request body to check the data
        console.log('Received form data:', req.body);

        // Extract form data from request
        const formData = req.body;

        // Check if formData is valid
        if (!formData || Object.keys(formData).length === 0) {
            throw new Error('Form data is missing or empty');
        }

        // Send the formData to generateResume function
        const resume = await generateResume(formData);

        // Log the generated resume
        console.log('Generated resume:', resume);

        // If resume is undefined or empty, return an error response
        if (!resume) {
            throw new Error('Failed to generate resume');
        }

        // Send success response with the generated resume
        res.status(200).json({ success: true, message: 'Resume generated successfully', resume });
    } catch (error) {
        console.error('Error processing form data:', error.message);
        res.status(500).json({ success: false, message: 'Error processing form data', error: error.message });
    }
};

module.exports = { createResume };
