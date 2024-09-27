require('dotenv').config();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

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

        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama3-8b-8192", // Adjust the model if needed
        });
        
        // Log response to check the data structure
        console.log(response);
        
        const { choices } = response;
        if (choices && choices[0]?.message?.content) {
            console.log("Matched Skills:", choices[0].message.content);
            return {
                matches: choices[0].message.content,
            };
        } else {
            console.log("No matches found.");
            return {
                matches: "No matches found.",
            };
        }
    } catch (error) {
        console.error('Error calling Groq API:', error);
        throw new Error('Groq API error');
    }
};

module.exports = { analyzeResume };
