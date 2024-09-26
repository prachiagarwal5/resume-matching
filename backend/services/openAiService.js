const axios = require('axios');

const analyzeResume = async (resumeText, jobDescription) => {
    try {
        const prompt = `
        You are given an engineer's resume and a job description. 
        1. Extract skills, projects, and internships from the resume.
        2. Match those with the required skills, projects, and experiences in the job description.
        3. Provide a match score and list of missing skills.
        Resume: ${resumeText}
        Job Description: ${jobDescription}
        `;

        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 500
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const { data } = response;
        return {
            matches: data.choices[0].text
        };
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        throw new Error('OpenAI API error');
    }
};

module.exports = { analyzeResume };
