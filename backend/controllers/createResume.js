const createResume = (req, res) => {
    try {
        console.log('Received form data:', req.body);

        // const { name, email, message } = req.body;

        // Process the form data here (e.g., store in the database)
        
        res.status(200).json({ success: true, message: 'Form data received successfully' });
    } catch (error) {
        console.error('Error processing form data:', error);
        res.status(500).json({ success: false, message: 'Error processing form data', error });
    }
};

module.exports = { createResume };
