const speech = require('@google-cloud/speech');
const fs = require('fs');

const speechToText = async (req, res, next) => {
    try {
        const client = new speech.SpeechClient();

        if (!req.file) {
            return res.status(400).json({ error: 'No audio file provided' });
        }

        const audioBytes = fs.readFileSync(req.file.path).toString('base64');

        // Configure the request
        const audio = {
            content: audioBytes,
        };
        
        const config = {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: 'en-US',
        };

        const request = {
            audio: audio,
            config: config,
        };

        // Detects speech in the audio file
        const [response] = await client.recognize(request);
        const transcription = response.results
            .map(result => result.alternatives[0].transcript)
            .join('\n');

        // Add transcription to request object
        req.transcription = transcription;
        
        next();
    } catch (error) {
        console.error('Speech to text error:', error);
        res.status(500).json({ error: 'Error processing speech to text' });
    }
};

module.exports = speechToText;