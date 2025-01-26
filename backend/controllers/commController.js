const service = require('../services/groupdiscussion');
const {speech2text} = require('../middleware/speech2text');

const commController = async (req, res) => {
    try {
        console.log('Received form data:', req.body);
        const speechData = req.body;
        let data;

        try {
            data = await speech2text(speechData);
            console.log('Data:', data);
        } catch (error) {
            console.error('Error in speech to text conversion:', error);
            throw error;
        }
    
        const modifiedData = await service(data); 
        console.log('Modified Data', modifiedData);
    
        res.status(200).json({ success: true, message: 'Data received successfully', modifiedData });
    } catch (error) {
        console.error('Error processing form data:', error);
        res.status(500).json({ success: false, message: 'Error processing data', error });
    }
    };

module.exports = commController;